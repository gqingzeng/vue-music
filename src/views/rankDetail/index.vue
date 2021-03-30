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
      musicList: [],
    };
  },
  created() {
    this._getSongList();
  },
  methods: {
    async _getSongList() {
      const { id } = this.$route.query;
      const params = { id };
      const { code, playlist } = await getSongList(params);
      if (code === 200) {
        this.musicList = this.handleData(playlist.tracks);
      }
    },
    handleData(data) {
      return data.map((item) => {
        const { id, name: songName, ar } = item;
        return {
          id,
          songName,
          fullName: `${songName}-${ar[0].name}`,
        };
      });
    },
  },
};
</script>

<style scoped lang="scss">
.rank-container {
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
