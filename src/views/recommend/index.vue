<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-container" :data="popularPlaylist">
      <div class="recommend-content">
        <div v-if="swiperList.length">
          <swiper :show-dots="true">
            <div v-for="(swiperItem, index) in swiperList" :key="index">
              <a :href="swiperItem.url">
                <img :src="swiperItem.imageUrl" @load="imgLoad" />
              </a>
            </div>
          </swiper>
        </div>
        <div class="recommend-list">
          <h2 class="recommend-title">热门歌单推荐</h2>
          <ul class="list">
            <li
              class="item"
              @click="selectItem(item)"
              v-for="item in popularPlaylist"
              :key="item.id"
            >
              <div class="icon">
                <img class="icon-left" v-lazy="item.coverImgUrl" />
              </div>
              <div class="music-content">
                <h2 class="name">{{ item.name }}</h2>
                <p class="desc">{{ item.tags.join(" | ") }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-wrapper" v-if="!popularPlaylist.length">
        <Loading />
      </div>
    </scroll>
  </div>
</template>

<script>
import { getBanner, getPlaylist } from "@/api/recommend";

import Swiper from "@/components/Swiper/index";
import Scroll from "@/components/Scroll/index";
import Loading from "@/components/Loading/index";

export default {
  name: "recommend",
  components: {
    Swiper,
    Scroll,
    Loading,
  },
  data() {
    return {
      popularPlaylist: [],
      swiperList: [],
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
        this.$refs.scroll.refresh();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.recommend {
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  &-container {
    height: 100%;
    overflow: hidden;
  }
  &-title {
    height: 65px;
    line-height: 65px;
    font-size: 14px;
    text-align: center;
    color: #ffcd32;
  }
  .list .item {
    display: flex;
    align-items: center;
    padding: 0 20px 20px 20px;
    .icon {
      margin-right: 20px;
      &-left {
        width: 60px;
        height: 60px;
      }
    }
    .music-content {
      color: #fff;
      .name {
        font-size: 14px;
        margin-bottom: 10px;
      }
      .desc {
        font-size: 14px;
        opacity: 0.3;
      }
    }
  }
}
.loading-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}
</style>
