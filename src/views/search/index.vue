<template>
  <div class="container">
    <div class="search-container">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="搜索歌曲、歌手" v-model="searchValue" />
      <i class="iconfont icon-shanchu" v-show="searchValue" @click="clearInput"></i>
    </div>
    <SearchResult
      v-if="!searchValue"
      :searchList="searchList"
      :historyList="searchHistoryList"
      :isShowHistory="getShowHistory"
      @hotClickHandler="hotClickHandler"
      @delAllHistoryHandler="delAllHistoryHandler"
      @delHistoryItemHandler="delHistoryItemHandler"
      @selectSearchHistory="selectSearchHistory"
    ></SearchResult>
    <SuggestList
      v-else
      :sugestList="sugestList"
      :title="title"
      :showNoResult="showNoResult"
      :showLoadImg="showLoadImg"
      @suggestItem="suggestItem"
      @scrollToEnd="scrollToEnd"
    ></SuggestList>
  </div>
</template>

<script>
import { getHotSearch, searchQuery } from "@/api/search";
import { getSong } from "@/api/singer";
import { getSongUrl } from "@/api/player";
import { debounce } from "@/utils/utils";

import { mapGetters, mapActions, mapMutations } from "vuex";

import SuggestList from "../components/SuggestList";
import SearchResult from "./components/SearchResult";

export default {
  name: "search",

  components: {
    SuggestList,
    SearchResult,
  },
  data() {
    return {
      searchValue: "",
      searchList: [],
      isShowHistory: false,
      sugestList: [],
      page: 1,
      limit: 30,
      hasMore: true,
      title: "",
      showLoadImg: true,
      showNoResult: false,
    };
  },
  computed: {
    ...mapGetters(["fullScreen", "searchHistoryList"]),
    getShowHistory() {
      if (this.searchHistoryList.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.getHotSearch();
  },
  watch: {
    searchValue: debounce(function (newValue) {
      this.page = 1;
      this.title = "";
      this.sugestList = [];
      this.showLoadImg = true;
      this.showNoResult = false;
      if (newValue !== "") {
        this.searchQuery();
      }
    }, 400),
  },
  methods: {
    ...mapActions(["insetSong"]),
    ...mapMutations({
      setSearchHistory: "SET_SEARCHHISTORYLIST",
      delSearchHistory: "DEL_SEARCHHISTORYLIST",
      delAllSearchHistory: "DELALL_SEARCHHISTORYLIST",
    }),
    // 热门搜索
    async getHotSearch() {
      const { code, result } = await getHotSearch();
      if (code === 200) {
        console.log("result", result);
        this.searchList = result.hots;
      }
    },
    hotClickHandler(item) {
      console.log("item", item);
      const { first } = item;
      this.searchValue = first;
    },
    // 输入框清空
    clearInput() {
      this.searchValue = "";
    },
    delAllHistoryHandler() {
      this.delAllSearchHistory();
    },
    delHistoryItemHandler(index) {
      this.delSearchHistory(index);
      if (!this.searchHistoryList.length) {
        this.$refs.scroll.refresh();
      }
    },
    selectSearchHistory(item){
      this.searchValue = item;
    },
    // 搜索
    async searchQuery() {
      const { searchValue: keywords, page: offset, limit } = this;
      const params = {
        keywords,
        offset,
        limit,
      };
      console.log("params", params);
      const { code, result } = await searchQuery(params);
      console.log("code", code);
      console.log("result", result);
      this.page += limit;
      if (code === 200) {
        if (result?.hasMore === undefined) {
          this.showLoadImg = false;
          this.showNoResult = true;
        } else {
          this.hasMore = result.hasMore;
          this.sugestList = this.sugestList.concat(result.songs);
          if (!result.hasMore) {
            this.showLoadImg = false;
            this.title = "到底啦~";
            return;
          }
        }
      }
    },
    async suggestItem(item) {
      console.log("item1", item);
      const ids = item.id;
      const params = { ids };
      const { code, songs } = await getSong(params);
      if (code === 200) {
        const song = this.handleSong(songs);
        console.log("song", song);
        this.insetSong(song);
      }
      this.setSearchHistory(item.name);
    },
    handleSong(songs) {
      const { id, name: songName, ar } = songs[0];
      const url = getSongUrl(id);
      const singer = songs[0].ar[0].name;
      const { picUrl } = songs[0].al;
      return {
        id,
        url,
        songName,
        singer,
        picUrl,
        fullName: `${songName}-${ar[0].name}`,
      };
    },
    scrollToEnd() {
      console.log(this.page);
      if (this.searchValue !== "" && this.hasMore) {
        console.log("aaaa");
        this.searchQuery();
      }
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
</style>
