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
      <div class="middle">
        <div class="middle-left">
          <div class="middle-img">
            <div :class="[playing ? 'play' : 'play pause', 'img']">
              <img :src="currentSong.picUrl" />
            </div>
          </div>
          <div class="lyri-wrapper">歌词</div>
        </div>
        <div class="middle-right"></div>
      </div>
      <div class="bottom">
        <div class="dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="progress-wrapper">
          <div class="time-left">{{ formateTime }}</div>
          <div class="progress">
            <Progress :percent="percent" @trggleProgress="trggleProgress"/>
          </div>
          <div class="time-right">{{ formateDuration }}</div>
        </div>
        <div class="operators">
          <div>
            <i class="iconfont icon-suijibofang"></i>
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
        <i
          @click.stop="togglePlay"
          :class="['iconfont', playing ? 'icon-zanting' : 'icon-bofang']"
        ></i>
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
import { getTime } from "@/utils/utils";

import Progress from "../progress/index";

export default {
  components: {
    Progress,
  },
  data() {
    return {
      songReady: false,
      duration: "",
      currentTime: "",
    };
  },
  computed: {
    formateTime() {
      return getTime(this.currentTime);
    },
    formateDuration() {
      return getTime(this.duration);
    },
    percent() {
      return this.currentTime / this.duration;
    },
    ...mapGetters(["fullScreen", "playList", "currentSong", "playing", "currentIndex"]),
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        const audio = this.$refs.audio;
        audio.play();
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
    backHandler() {
      this.setFullScreen(false);
    },
    openPlayer() {
      this.setFullScreen(true);
    },
    // 上一首
    prevHandler() {
      if (!this.songReady) {
        return;
      }
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
      if (!this.songReady) {
        return;
      }
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
      console.log("error");
      this.songReady = true;
      
    },
    // 获取当前时间
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
    },
    // 音频结束
    ended() {
      this.nextHandler();
    },
    // 进度条
    trggleProgress(percent){
      this.$refs.audio.currentTime = percent * this.duration;
      if (!this.playing) {
        this.togglePlay();
      }
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENTINDEX",
    }),
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
  border: 1px solid #fff;
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
  }
}

.play {
  animation: rotate 10s linear infinite;
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
