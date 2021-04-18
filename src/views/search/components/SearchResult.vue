<template>
  <div class="container">
    <scroll ref="scroll" class="shortcut-wrapper" :data="searchList">
      <div>
        <div class="hot-search-wrapper">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              class="item"
              v-for="(item, index) in searchList"
              :key="index"
              @click="hotClickHandler(item)"
            >
              <span>{{ item.first }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history-wrapper">
          <div class="search-head" v-show="isShowHistory">
            <span>搜索历史</span>
            <i class="iconfont icon-shanchu1" @click="delAllHistoryHandler"></i>
          </div>
          <ul>
            <li
              class="search-list"
              v-for="(historyItem, historyIndex) in historyList"
              :key="historyIndex"
              @click="selectSearchHistory(historyItem)"
            >
              <span>{{ historyItem }}</span>
              <i
                class="iconfont icon-shanchu11"
                @click.stop="delHistoryItemHandler(historyIndex)"
              ></i>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/Scroll/index";

import { PlayListMixin } from "@/common/mixin";

export default {
  mixins: [PlayListMixin],
  components: {
    Scroll,
  },
  props: {
    searchList: {
      type: Array,
      default() {
        return [];
      },
    },
    historyList: {
      type: Array,
      default() {
        return [];
      },
    },
    isShowHistory: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    hotClickHandler(item) {
      this.$emit("hotClickHandler", item);
    },
    delAllHistoryHandler() {
      this.$emit("delAllHistoryHandler");
    },
    delHistoryItemHandler(index) {
      this.$emit("delHistoryItemHandler", index);
    },
    selectSearchHistory(item){
      this.$emit("selectSearchHistory",item)
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
.shortcut-wrapper {
  position: fixed;
  top: 178px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.hot-search-wrapper {
  margin: 0 20px 20px 20px;
  .item {
    display: inline-block;
    padding: 3px 7px;
    margin: 0 10px 10px 0;
    border-radius: 6px;
    background: #333;
    color: rgba(255, 255, 255, 0.3);
  }
}
.search-history-wrapper {
  margin: 0 20px;
  .search-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }
  .icon-shanchu1 {
    font-size: 12px;
  }
  .search-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    color: rgba(255, 255, 255, 0.5);
  }
}

.title {
  margin-bottom: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
</style>
