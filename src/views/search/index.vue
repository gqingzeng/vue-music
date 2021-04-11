<template>
  <div class="container">
    <div class="search-container">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="搜索歌曲、歌手" v-model="searchValue" />
      <i
        class="iconfont icon-shanchu"
        v-show="searchValue"
        @click="delSearchValueHandler"
      ></i>
    </div>
    <scroll ref="scroll" class="shortcut-wrapper" :data="searchList">
      <div>
        <div class="hot-search-wrapper">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="(item, index) in searchList" :key="index">
              <span @click="hotClickHandler(item)">{{ item.first }}</span>
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
            >
              <span>{{ historyItem }}</span>
              <i
                class="iconfont icon-shanchu11"
                @click="delHistoryItemHandler(historyIndex)"
              ></i>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getHotSearch } from "@/api/search";
import { mapGetters } from "vuex";
import { PlayListMixin } from "@/common/mixin";

import Scroll from "@/components/Scroll/index";

export default {
  name: "search",
  mixins: [PlayListMixin],
  components: {
    Scroll,
  },
  data() {
    return {
      searchValue: "",
      searchList: [],
      historyList: [
        "我们的歌",
        "冰雪奇缘2",
        "张杰",
        "桥边姑娘",
        "星辰大海",
        "我们的歌",
        "冰雪奇缘2",
        "张杰",
        "桥边姑娘",
        "星辰大海",
      ],
      isShowHistory: true,
    };
  },
  computed: {
    ...mapGetters(["fullScreen"]),
  },
  created() {
    this.getHotSearch();
  },
  watch: {
    searchValue: function (newValue) {
      console.log(newValue);
    },
  },
  methods: {
    // 热门搜索
    async getHotSearch() {
      const { code, result } = await getHotSearch();
      if (code === 200) {
        this.searchList = result.hots;
      }
    },
    hotClickHandler(item) {
      const { first } = item;
      this.searchValue = first;
    },
    // 输入框清空
    delSearchValueHandler() {
      this.searchValue = "";
    },
    delAllHistoryHandler() {
      this.isShowHistory = false;
      this.historyList = [];
    },
    delHistoryItemHandler(index) {
      const { historyList } = this;
      historyList.splice(index, 1);
      if (!historyList.length) {
        this.isShowHistory = false;
        this.$refs.scroll.refresh();
      }
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
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  padding: 0 10px;
  border-radius: 6px;
  height: 40px;
  background: #333;
  .icon-sousuo,
  .icon-shanchu {
    font-size: 15px;
  }
  input {
    width: 100%;
    height: 100%;
    line-height: 18px;
    padding: 0 5px;
    color: #fff;
    outline: none;
  }
}
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
