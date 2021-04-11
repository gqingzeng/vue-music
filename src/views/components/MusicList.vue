<template>
  <div class="music-list">
    <div class="music-list-top">
      <i class="iconfont icon-zuojiantou" @click="back"></i>
      <h2 class="title">{{ title }}</h2>
    </div>

    <div class="music-list-image" :style="bgStyle" ref="bgImage">
      <div class="playBtn" v-show="musicList.length" @click="randomPlayHandle">
        <img class="icon-play" src="@/assets/img/play.png" />
        <span class="text">随机播放全部</span>
      </div>
      <div class="filter"></div>
    </div>

    <scroll class="song-list-wrapper" :data="musicList" ref="songList">
      <SongList :songList="musicList" @selectSong="selectSong" />
    </scroll>
    <div class="loading-wrapper" v-show="!musicList.length">
      <Loading title="载入中..." />
    </div>
  </div>
</template>

<script>
import SongList from "views/components/SongList";
import Scroll from "@/components/Scroll";
import Loading from "@/components/Loading/index";

import { mapActions } from "vuex";
import { PlayListMixin } from "@/common/mixin";

export default {
  name: "MusicList",
  mixins: [PlayListMixin],
  components: {
    SongList,
    Loading,
    Scroll,
  },
  props: {
    musicList: {
      type: Array,
    },
  },
  data() {
    return {
      title: this.$route.query.name,
      picUrl: this.$route.query.picUrl,
    };
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.picUrl})`;
    },
  },
  methods: {
    ...mapActions(["setectPlay", "randomPlay"]),
    // 歌曲列表项
    selectSong(item, index) {
      this.setectPlay({
        list: this.musicList,
        index,
      });
      console.log(item);
      console.log("index", index);
    },
    back() {
      this.$router.go(-1);
    },
    randomPlayHandle() {
      this.randomPlay({ list: this.musicList });
    },
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? "60px" : "";
      this.$refs.songList.$el.style.bottom = bottom;
      this.$refs.songList.refresh();
    },
  },
};
</script>

<style scoped lang="scss">
.music-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #222;
}
.song-list-wrapper {
  position: fixed;
  top: 40%;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.music-list-top {
  display: flex;
  position: absolute;
  z-index: 9;
  align-items: center;
  height: 40px;
  width: 100%;

  .icon-zuojiantou {
    position: relative;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 24px;
    color: #ffcd32;
    z-index: 9;
  }
  .title {
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    width: 50%;
    text-align: center;
    font-size: 18px;
    color: #fff;
  }
}
.music-list-image {
  position: relative;
  width: 100%;
  padding-top: 70%;
  background-size: cover;
  .playBtn {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #ffcd32;
    border-radius: 100px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    .icon-play {
      height: 16px;
      width: 16px;
      margin-right: 10px;
    }
    .text {
      color: #ffcd32;
      font-size: 12px;
    }
  }
  .filter {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: 70%;
    background: rgba(0, 0, 0, 0.5);
  }
}
.loading-wrapper {
  position: absolute;
  left: 50%;
  padding-top: 50%;
  transform: translate(-50%);
}
</style>
