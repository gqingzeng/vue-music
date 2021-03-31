<template>
  <transition name="slide">
    <MusicList :musicList="musicList" v-if="musicList.length"/>
  </transition>
</template>

<script>
import MusicList from "../components/MusicList";

import { getSongList } from "@/api/rank";

export default {
  name: "rankList",
  components: {
    MusicList,
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
