<template>
  <div class="rank-container">
    <transition name="slide-fade">
      <MusicList :musicList="musicList" />
    </transition>
    <div class="loading-wrapper" v-show="!musicList.length">
      <Loading title="载入中..." />
    </div>
  </div>
</template>

<script>
import MusicList from "../components/MusicList";
import Loading from "@/components/Loading/index";

import { getSongList } from "@/api/rank";
export default {
  name: "rankList",
  components: {
    MusicList,
    Loading,
  },
  data() {
    return {
      id: "",
      musicList: [],
    };
  },
  created() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this._getSongList();
  },
  methods: {
    async _getSongList() {
      const res = await getSongList({
        id: this.id,
      });
      this.musicList = this.handleData(res.playlist.tracks);
      console.log(res);
    },
    handleData(data) {
      const arr = [];
      data.forEach((item) => {
        arr.push({
          id:item.id,
          songName: item.name,
          fullName: `${item.name}-${item.ar[0].name}`,
        });
      });
      return arr;
    },
  },
};
</script>

<style scoped lang="scss">
.rank-container{
  position: absolute;
  top: 0;
  width: 100%;
}
.loading-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  padding-top: 80%;
  transform: translate(-50%);
}
</style>