<template>
  <div>
    <RecommendList
      :popularPlaylist="popularPlaylist"
      :swiperList="swiperList"
      @selectItem="selectItem"
      @imgLoad="imgLoad"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import { getBanner, getPlaylist } from "@/api/recommend";
import RecommendList from "./components/RecommendList.vue";

export default {
  name: "recommend",
  components: {
    RecommendList,
  },
  data() {
    return {
      popularPlaylist: [],
      swiperList: [],
      checkloaded: false,
    };
  },
  created() {
    this.getPlaylist();
    this.getBanner();
  },
  methods: {
    // 热门歌单推荐数据获取
    async getPlaylist() {
      const { code, playlists } = await getPlaylist();
      if (code === 200) {
        this.popularPlaylist = playlists;
      }
    },
    // 获取轮播图
    async getBanner() {
      const { code, banners } = await getBanner();
      if (code === 200) {
        this.swiperList = banners;
      }
    },
    selectItem(item) {
      const { id, name, coverImgUrl: picUrl } = item;
      this.$router.push({
        path: "/recommendHotDetail",
        query: {
          id,
          name,
          picUrl,
        },
      });
    },
    imgLoad() {
      if (!this.checkloaded) {
        this.checkloaded = true;
        this.$children[0].$refs.scroll.refresh();
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
