<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-container" :data="discList">
      <div class="recommend-content">
        <div v-if="swiperList.length">
          <swiper>
            <div v-for="(swiperItem,index) in swiperList" :key="index">
              <a :href="swiperItem.url">
                <img class="needsclick" :src="swiperItem.imageUrl" @load="imgLoad" />
              </a>
            </div>
          </swiper>
        </div>
        <div class="recommend-list">
          <h2 class="recommend-title">热门歌单推荐</h2>
          <ul class="list">
            <li class="item" @click="selectItem(item)" v-for="item in discList" :key="item.id">
              <div class="icon">
                <img class="icon-left" v-lazy="item.coverImgUrl" />
              </div>
              <div class="music-content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.tags.join(' | ')}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-wrapper" v-if="!discList.length">
        <loading title="载入中..."></loading>
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
  components: {
    Swiper,
    Scroll,
    Loading,
  },
  data() {
    return {
      discList: [],
      swiperList: [],
    };
  },
  created() {
    this.getPlaylist();
    this.getBanner();
  },
  mounted() {},
  methods: {
    async getPlaylist() {
      let res = await getPlaylist();
      console.log(res.playlists);
      if (res.code === 200) {
        this.discList = res.playlists;
        }
      }
    },
    async getBanner() {
      let res = await getBanner();
      if (res.code === 200) {
        this.swiperList = res.banners;
      }
    },
    selectItem(item) {
      console.log(item);
    },
    imgLoad() {
      if (!this.checkloaded) {
        this.checkloaded = true;
        this.$refs.scroll.refresh();
      }
    }
  }

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