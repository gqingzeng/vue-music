<template>
  <div class="play-container" v-show="playList.length > 0">
    <!-- 全屏播放器 -->
    <div class="normal-player" v-show="fullScreen">
      <div class="top">
        <img class="back" src="../../assets/img/arrow-down.png" />
        <h1 class="title">萨达开始加大数据库的速度是   的撒大苏打</h1>
        <h2 class="subtitle">aa</h2>
      </div>
      <div class="middle">
        <div class="cd">
          <img src="../../assets/logo.png" />
        </div>
        <div>歌词</div>
      </div>
      <div class="bottom"></div>
    </div>
    <!-- mini播放器 -->
    <div class="mini-player" v-show="!fullScreen">
      <div class="mini-img">
        <img class="pic" src="../../assets/logo.png" />
      </div>
      <div class="mini-desc">
        <div class="song-name">天外来物</div>
        <div class="author">薛之谦</div>
      </div>
      <div class="mini-control" @click="changePlayer">
        <i :class="['iconfont', musicBtnIndex == 0 ? 'icon-bofang' : 'icon-zanting']"></i>
      </div>
      <div class="mini-control">
        <i class="iconfont icon-bofangliebiao"></i>
      </div>
    </div>
    <!-- <audio ref="audio" :src="playInfo.musicList[index]"></audio>
    <button @click="pre">上一首</button>
    <button @click="play">播放/暂停</button>
    <button @click="next">下一首</button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      playInfo: {
        imgUrl: "",
        currentMusic: "",
        musicList: [],
        musicBtn: {
          0: "icon-bofang",
          1: "icon-zanting",
        },
      },
      musicBtnIndex: 0,
      list: [
        "https://music.163.com/song/media/outer/url?id=450424527.mp3",
        "https://music.163.com/song/media/outer/url?id=557581284.mp3",
        "https://music.163.com/song/media/outer/url?id=452986458.mp3",
      ],
      index: 0,
    };
  },
  computed: {
    ...mapGetters(["fullScreen", "playList"]),
  },
  methods: {
    pre() {
      this.index = this.index - 1;
      if (this.index < 0) {
        this.index = this.list.length - 1;
      }
      console.log(this.index);
      console.log(this.list[this.index]);
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    play() {},
    next() {},
    changePlayer() {
      console.log("aaa");
      if (this.musicBtnIndex == 0) {
        this.musicBtnIndex = 1;
      } else {
        this.musicBtnIndex = 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.normal-player {
  position: relative;
  .background {
    position: absolute;
    top: 0;
    width: 100%;
    opacity: 0;
  }
  .top {
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      padding: 9px;
      width: 22px;
    }
    .title {
      margin: 0 auto;
      width: 70%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
    }
    .subtitle {
      text-align: center;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .middle {
    position: fixed;
    top: 0;
    width: 100%;
    border: 1px solid black;
    .cd {
      position: absolute;
      top: 0;
    }
  }
}

.play-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: #fff;
}
.mini {
  &-player {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: #333;
  }
  &-img .pic {
    width: 45px;
    height: 45px;
    padding: 0 10px 0 20px;
    border-radius: 50%;
  }
  &-desc {
    flex: 1;
    overflow: hidden;
    .song-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
    }
    .author {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(255, 255, 255, 0.3);
    }
  }
  &-control {
    padding: 0 5px;
    .iconfont {
      font-size: 40px;
      color: #ffcd32;
    }
    .icon-bofang {
      font-size: 35px;
    }
    .icon-zanting {
      font-size: 35px;
    }
  }
}
</style>
