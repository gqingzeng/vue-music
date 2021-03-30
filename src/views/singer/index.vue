<template>
  <div class="singer">
    <ListView :singerList="singers" @selectItem="selectSingerItem" />
  </div>
</template>

<script>
import ListView from "./components/ListView";

import { getSingers } from "@/api/singer";

const pinyin = require("pinyin");

export default {
  name: "singer",
  components: {
    ListView,
  },
  data() {
    return {
      singers: [],
    };
  },
  created() {
    this.getSingers();
  },
  methods: {
    async getSingers() {
      const { code, artists } = await getSingers();
      if (code === 200) {
        // 新增首字母到数组中
        artists.forEach((item) => {
          const letter = pinyin(item.name[0], {
            style: pinyin.STYLE_FIRST_LETTER,
          }).flat();
          item.initials = letter[0].toUpperCase();
        });
        this.singers = this.normalSinger(artists);
      }
    },
    normalSinger(list) {
      const obj = {
        hot: {
          title: "热门",
          items: [],
        },
      };
      list.forEach((item, index) => {
        const { id, name, picUrl } = item;
        // 取前10名歌手作为热门
        if (index < 10) {
          obj.hot.items.push({
            id,
            name,
            picUrl,
          });
        }
        const key = item.initials.toUpperCase();
        if (!obj[key]) {
          obj[key] = {
            title: key,
            items: [],
          };
        }
        obj[key].items.push({
          id,
          name,
          picUrl,
        });
      });
      const hot = [];
      const ret = [];
      for (let key in obj) {
        const value = obj[key];
        if (value.title.match(/[A-Z]/)) {
          ret.push(value);
        } else if (value.title === "热门") {
          hot.push(value);
        }
      }
      // 按字母顺序排序
      ret.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      return hot.concat(ret);
    },
    selectSingerItem(item) {
      console.log(item);
      const { id, name, picUrl } = item;
      this.$router.push({
        path: "/singerDetail",
        query: {
          id,
          name,
          picUrl,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
