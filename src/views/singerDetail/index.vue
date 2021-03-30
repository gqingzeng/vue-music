<template>
  <div class="singer-container">
    <MusicList :musicList="musicList" />
    <div class="loading-wrapper" v-show="!musicList.length">
      <Loading title="载入中..." />
    </div>
  </div>
</template>

<script>
import { getArtists } from "@/api/singer";

import MusicList from "../components/MusicList";
import Loading from "@/components/Loading/index";

export default {
  name: "singerDetail",
  components: {
    MusicList,
    Loading,
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
        console.log(hotSongs);
        this.musicList = this.normalData(hotSongs);
        console.log(this.musicList);
      }
    },
    normalData(data) {
      return data.map((item) => {
        const { id, name: songName } = item;
        const singer = item.ar[0].name;
        const fullName = `${songName}-${singer}`;
        return {
          id,
          songName,
          fullName,
        };
      });
    },
  },
};
</script>

<style scoped lang="scss">
.singer-container {
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
