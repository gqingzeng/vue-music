<template>
  <div class="recommend-hot-container">
    <MusicList :musicList="musicList" />
    <div class="loading-wrapper" v-show="!musicList.length">
      <Loading />
    </div>
  </div>
</template>

<script>
import { getSongList } from "@/api/rank";

import Loading from "@/components/Loading/index";
import MusicList from "../components/MusicList";

export default {
  name: "recommendHotDetail",
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
    handleData(musicList) {
      return musicList.map((item) => {
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
.recommend-hot-container {
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
