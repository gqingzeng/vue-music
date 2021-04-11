<template>
  <div class="play-container" v-show="playList.length > 0">
    <!-- 全屏播放器 -->
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.picUrl" />
      </div>
      <div class="head-player">
        <i class="iconfont icon-xiajiantou" @click="backHandler"></i>
        <h3 class="title">{{ currentSong.songName }}</h3>
        <h2 class="subtitle">{{ currentSong.singer }}</h2>
      </div>
      <div class="middle" @click="togglePage">
        <div class="middle-left" v-show="!showLyric">
          <div class="middle-img">
            <div :class="[playing ? 'play' : 'play pause', 'img']">
              <img :src="currentSong.picUrl" />
            </div>
          </div>
          <div class="lyri-wrapper">{{ playLyric }}</div>
        </div>
        <scroll
          ref="lyricScroll"
          class="middle-right scroll-container"
          :data="lyrs"
          v-show="showLyric"
        >
          <ul>
            <li
              ref="scroll"
              :class="[
                currentLyricIndex === index ? 'hightLightFont' : 'normal',
                lyrs.length === 1 ? 'lyrsHeight' : '',
              ]"
              v-for="(item, index) in lyrs"
              :key="index"
            >
              {{ item.lyr }}
            </li>
          </ul>
        </scroll>
      </div>
      <div class="bottom">
        <!-- <div class="dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div> -->
        <div class="progress-wrapper">
          <div class="time-left">{{ formateTime }}</div>
          <div class="progress">
            <Progress :percent="percent" @toggleProgress="toggleProgress" />
          </div>
          <div class="time-right">{{ formateDuration }}</div>
        </div>
        <div class="operators">
          <div>
            <i @click="togglePlayMode" :class="['iconfont', iconMode]"></i>
          </div>
          <div>
            <i @click="prevHandler" class="iconfont icon-48shangyishou"></i>
          </div>
          <div>
            <i
              @click="togglePlay"
              :class="['iconfont', playing ? 'icon-zanting' : 'icon-bofang']"
            ></i>
          </div>
          <div>
            <i @click="nextHandler" class="iconfont icon-49xiayishou"></i>
          </div>
          <div>
            <i class="iconfont icon-shoucang"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- mini播放器 -->
    <div class="mini-player" v-show="!fullScreen" @click="openPlayer">
      <div :class="[playing ? 'play' : 'play pause', 'mini-img']">
        <img class="pic" :src="currentSong.picUrl" />
      </div>
      <div class="mini-desc">
        <div class="common song-name">
          {{ currentSong.songName }}
        </div>
        <div class="common author">{{ currentSong.singer }}</div>
      </div>
      <div class="mini-control">
        <progress-circle :percent="percent">
          <i
            @click.stop="togglePlay"
            :class="['iconfont', playing ? 'icon-zanting' : 'icon-bofang', 'icon-mini']"
          ></i>
        </progress-circle>
      </div>
      <div class="mini-control">
        <i class="iconfont icon-bofangliebiao"></i>
      </div>
    </div>
    <audio
      ref="audio"
      :src="currentSong.url"
      @canplay="canplay"
      @error="error"
      @timeupdate="timeupdate"
      @ended="ended"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getTime, shuffle, getTimeFormate } from "@/utils/utils";
import { playMode } from "@/common/playerConfig";
import { getLyric } from "@/api/player";

import Scroll from "@/components/Scroll/index";
import Progress from "../progress/index";
import progressCircle from "../progressCircle/index";

export default {
  components: {
    Scroll,
    Progress,
    progressCircle,
  },
  data() {
    return {
      songReady: false,
      duration: "",
      currentTime: "",
      lyrs: [],
      LyricTop: [],
      currentLyricIndex: 0,
      showLyric: false,
      playLyric: "",
    };
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "playList",
      "currentSong",
      "playing",
      "currentIndex",
      "mode",
      "sequenceList",
    ]),
    formateTime() {
      return getTime(this.currentTime);
    },
    formateDuration() {
      return getTime(this.duration);
    },
    percent() {
      return this.currentTime / this.duration;
    },
    iconMode() {
      return this.mode === playMode.sequence
        ? "icon-liebiaoxunhuan"
        : this.mode === playMode.loop
        ? "icon-danquxunhuan"
        : "icon-suijibofang";
    },
  },
  watch: {
    currentSong(newValue, oldValue) {
      if (newValue.id === oldValue.id) {
        return;
      }
      this.$nextTick(() => {
        this.$refs.lyricScroll.scrollTop = 0;
        const audio = this.$refs.audio;
        audio.play();
        this._getLyric();
      });
    },
    playing(newValue) {
      this.$nextTick(() => {
        const audio = this.$refs.audio;
        newValue ? audio.play() : audio.pause();
      });
    },
  },
  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENTINDEX",
      setPlayMode: "SET_PLAY_MODE",
      setPlayList: "SET_PLAYLIST",
    }),
    backHandler() {
      this.setFullScreen(false);
    },
    openPlayer() {
      this.setFullScreen(true);
    },
    // 播放方式切换
    togglePlayMode() {
      const currentMode = (this.mode + 1) % 3;
      this.setPlayMode(currentMode);
      let list = null;
      // 若是随机播放方式，则对顺序列表进行打乱
      if (currentMode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    // 歌曲列表修改时，其索引值也需改变
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    // 上一首
    prevHandler() {
      if (!this.songReady) return;
      this.$refs.audio.currentTime = 0;
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playList.length - 1;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlay();
      }
      this.songReady = false;
    },
    // 播放
    togglePlay() {
      this.setPlayingState(!this.playing);
    },
    // 下一首
    nextHandler() {
      if (!this.songReady) return;
      this.$refs.audio.currentTime = 0;
      let index = this.currentIndex + 1;
      if (index === this.playList.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlay();
      }
      this.songReady = false;
    },
    // 当音频可以播放时
    canplay() {
      this.songReady = true;
      this.duration = this.$refs.audio.duration;
    },
    // 当音频发生错误时
    error() {
      console.log("无法播放");
      this.songReady = true;
    },
    // 获取当前时间
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
      this.getCurrentLyrsIndex();
    },
    getCurrentLyrsIndex() {
      const index = this.lyrs.findIndex((item, index) => {
        if (index < this.lyrs.length - 1) {
          return (
            item.time <= this.currentTime && this.lyrs[index + 1].time > this.currentTime
          );
        } else {
          return true;
        }
      });
      this.currentLyricIndex = index;
      this.scrollTo(index);
      this.playLyric = this.lyrs[index].lyr;
    },
    // 音频结束
    ended() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.nextHandler();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    // 进度条
    toggleProgress(percent) {
      this.$refs.audio.currentTime = percent * this.duration;
      if (!this.playing) {
        this.togglePlay();
      }
    },
    // 获取歌词
    async _getLyric() {
      const { id } = this.currentSong;
      const params = { id };
      const res = await getLyric(params);
      console.log("res", res);
      if (res.code === 200) {
        let reg = /\[(.*)\](.*)\n/gim;
        let result;
        this.lyrs = [];
        if (res?.lrc?.lyric) {
          while ((result = reg.exec(res.lrc.lyric))) {
            this.lyrs.push({ time: getTimeFormate(result[1]), lyr: result[2].trim() });
          }
        } else {
          this.lyrs.push({ time: 0, lyr: "此歌曲为没有填词的纯音乐，请您欣赏" });
        }
        this.$nextTick(() => {
          this.LyricTop = Array.from(this.$refs.scroll);
        });
      }
    },
    scrollTo(index) {
      const length = this.lyrs.length - 5;
      if (index < 5) {
        this.$refs.lyricScroll.scrollTo(0, 0);
      } else if (index >= length) {
        this.$refs.lyricScroll.scrollToElement(this.LyricTop[index], 1000);
      } else {
        this.$refs.lyricScroll.scrollToElement(this.LyricTop[index - 5], 1000);
      }
    },
    togglePage() {
      this.showLyric = !this.showLyric;
      this.$nextTick(()=>{
        this.$refs.lyricScroll.refresh()
      })
      this.getCurrentLyrsIndex();
    },
  },
};
</script>

<style scoped lang="scss">
.normal-player {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: #222;
}
.background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0.6;
  filter: blur(20px);
  img {
    width: 100%;
    height: 100%;
  }
}
.head-player {
  position: relative;
  height: 40px;
  width: 100%;
  margin-bottom: 35px;
  color: #fff;
  .iconfont {
    position: absolute;
    left: 3%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    color: #ffcd32;
  }
  .title {
    width: 70%;
    margin: 0 auto;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .subtitle {
    text-align: center;
    line-height: 20px;
    font-size: 14px;
  }
}
.middle {
  position: relative;
  width: 100%;
  height: 66%;
  text-align: center;
  .middle-left {
    margin: 0 auto;
    .img {
      box-sizing: border-box;
      width: 265px;
      height: 265px;
      margin: 0 auto;
      text-align: center;
      border-radius: 50%;
      border: 10px solid rgba(255, 255, 255, 0.1);
      img {
        border-radius: 50%;
        width: 100%;
      }
    }
    .lyri-wrapper {
      margin-top: 20px;
      color: #fff;
    }
  }
  .middle-right {
    position: fixed;
    top: 90px;
    bottom: 23%;
    width: 100%;
    overflow: hidden;
    .hightLightFont {
      color: #fff;
      line-height: 32px;
    }
    .normal {
      color: #fff;
      opacity: 0.5;
      line-height: 32px;
    }
    .lyrsHeight {
      padding-top: 50%;
    }
  }
}
.bottom {
  width: 100%;
  .progress-wrapper {
    height: 30px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    text-align: center;
    color: #fff;
    .time-left,
    .time-right {
      flex: 0.2;
    }
    .progress {
      height: 4px;
      flex: 1;
      background: #fff;
      border-radius: 20px;
    }
  }
  .operators {
    display: flex;
    align-items: center;
    div {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
  .iconfont {
    color: #ffcd32;
    font-size: 30px;
  }
  .icon-zanting,
  .icon-bofang {
    font-size: 40px;
  }
}
.dots {
  text-align: center;
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 10px 10px 10px;
    border-radius: 50%;
    margin-right: 3px;
    background: rgba(238, 238, 238, 0.5);
    &.active {
      background: rgba(255, 255, 255, 1);
    }
  }
}

.mini-player {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 10px;
  height: 60px;
  background: #333;
  .mini-img {
    width: 45px;
    height: 45px;
    margin-right: 5px;
    .pic {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .mini-desc {
    flex: 1;
    overflow: hidden;
    .common {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .song-name {
      margin-bottom: 2px;
      color: #fff;
    }
    .author {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.3);
    }
  }
  .iconfont {
    font-size: 30px;
    color: #ffcd32;
    padding: 0 5px;
    opacity: 0.5;
  }
}

.play {
  animation: rotate 20s linear infinite;
}
.pause {
  animation-play-state: paused;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
