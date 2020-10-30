<template>
  <div class="music-list">
    <div class="music-list-top">
      <img @click="back" class="icon-back" src="@/assets/img/back.png" alt />
      <h2 class="title">{{singer.name}}</h2>
    </div>

    <div class="music-list-image" :style="bgStyle" ref="bgImage">
      <div class="playBtn" @click="randomPlay">
        <img class="icon-play" src="@/assets/img/play.png" />
        <span class="text">随机播放全部</span>
      </div>
      <div class="filter"></div>
    </div>

    <div class="song-list-wrapper">
      <scroll class="song-list" :data="musicList" ref="songList">
        <song-list :songList="musicList"></song-list>
      </scroll>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SongList from "views/components/SongList";
import Scroll from "@/components/Scroll";
export default {
  name:"MusicList",
  components: {
    SongList,
    Scroll,
  },
  props: {
    musicList: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  computed: {
    bgStyle() {
      if(this.singer.picUrl){
        return `background-image:url(${this.singer.picUrl})`
      }else{
        return `background-image:url(${this.singer.coverImgUrl})`
      }
    },
    ...mapGetters(["singer"]),
  },
  created() {},
  mounted() {

  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    randomPlay() {},
  },
};
</script>

<style scoped lang="scss">
.song-list-wrapper {
  position: fixed;
  top: 0;
  padding-top: 70%;
  bottom: 0;
  width: 100%;
  .song-list {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
}
.music-list-top {
  display: flex;
  position: absolute;
  z-index: 9;
  align-items: center;
  height: 40px;
  width: 100%;

  .icon-back {
    width: 22px;
    height: 22px;
    padding-left: 10px;
  }
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
</style>