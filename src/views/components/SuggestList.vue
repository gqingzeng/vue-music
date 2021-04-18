<template>
  <scroll
    ref="scroll"
    class="suggest-container"
    :data="sugestList"
    :pullup="true"
    @scrollToEnd="scrollToEnd"
  >
    <ul>
      <li v-for="(item, index) in sugestList" :key="index">
        <div class="list" @click="suggestItem(item)">
          <i class="iconfont icon-duomeitiicon-"></i>
          <p class="name">{{ item.name }} -{{ item.artists[0].name }}</p>
        </div>
      </li>
      <Loading :title="title" :showLoadImg="showLoadImg" />
    </ul>
    <div class="result-wrapper">
      <NoResult v-show="showNoResult"></NoResult>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/Scroll/index";
import Loading from "@/components/Loading/index";
import NoResult from "@/components/NoResult/index";

import { PlayListMixin } from "@/common/mixin";

export default {
  name: "SuggestList",
  mixins: [PlayListMixin],
  components: {
    Scroll,
    Loading,
    NoResult,
  },
  props: {
    sugestList: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: "",
    },
    showLoadImg: {
      type: Boolean,
      default: true,
    },
    showNoResult: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    suggestItem(item) {
      this.$emit("suggestItem", item);
    },
    scrollToEnd() {
      this.$emit("scrollToEnd");
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
.suggest-container {
  position: fixed;
  top: 178px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .list {
    display: flex;
    margin: 0 20px;
    line-height: 36px;
    color: rgba(255, 255, 255, 0.3);
    .name {
      padding-left: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .result-wrapper {
    position: absolute;
    top: 50%;
    bottom: 0px;
    transform: translate(-50%, -50%);
    left: 50%;
  }
}
</style>
