<template>
  <scroll ref="scroll" class="recommend" :data="popularPlaylist">
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
</template>

<script>
import Swiper from "@/components/Swiper/index";
import Scroll from "@/components/Scroll/index";
import Loading from "@/components/Loading/index";

import { mapGetters } from "vuex";
import { PlayListMixin } from "@/common/mixin";

export default {
  mixins: [PlayListMixin],
  components: {
    Swiper,
    Scroll,
    Loading,
  },
  props: {
    popularPlaylist: {
      type: Array,
      default() {
        return [];
      },
    },
    swiperList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["fullScreen", "playList"]),
  },
  methods: {
    selectItem(item) {
      this.$emit("selectItem", item);
    },
    imgLoad() {
      this.$emit("imgLoad");
    },
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? "60px" : "";
      this.$refs.scroll.$el.style.bottom = bottom;
      this.$refs.scroll.refresh();
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
  overflow: hidden;
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
