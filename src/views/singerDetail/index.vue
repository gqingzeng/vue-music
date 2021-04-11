<template>
  <transition name="slide">
    <MusicList :musicList="musicList" v-if="musicList.length" />
  </transition>
</template>

<script>
import { getArtists } from "@/api/singer";
import { getSongUrl } from "@/api/player";

import MusicList from "../components/MusicList";

export default {
  name: "singerDetail",
  components: {
    MusicList,
  },
  data() {
    return {
      id: this.$route.query.id,
      musicList: [],
    };
  },
  created() {
    this.getArtists();
  },
  methods: {
    async getArtists() {
      const { id } = this;
      const params = { id };
      const { code, hotSongs } = await getArtists(params);
      if (code === 200) {
        this.musicList = this.normalData(hotSongs);
      }
    },
    normalData(data) {
      return data.map((item) => {
        const { id, name: songName } = item;
        const url = getSongUrl(id);
        const { picUrl } = item.al;
        const singer = item.ar[0].name;
        const fullName = `${songName}-${singer}`;
        return {
          id,
          url,
          singer,
          songName,
          fullName,
          picUrl,
        };
      });
    },
  },
};
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
