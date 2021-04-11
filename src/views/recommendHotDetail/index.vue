<template>
  <transition name="slide">
    <MusicList :musicList="musicList" v-if="musicList.length" />
  </transition>
</template>

<script>
import { getSongList } from "@/api/rank";
import { getSongUrl } from "@/api/player";

import MusicList from "../components/MusicList";

export default {
  name: "recommendHotDetail",
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
    handleData(musicList) {
      return musicList.map((item) => {
        const { id, name: songName, ar } = item;
        const url = getSongUrl(id);
        const singer = item.ar[0].name;
        const { picUrl } = item.al;
        return {
          id,
          url,
          songName,
          singer,
          picUrl,
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
