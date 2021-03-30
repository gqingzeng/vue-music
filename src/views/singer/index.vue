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
        // this.singers[23].items.push(
        //   {
        //     id: 1030001,
        //     name: "周深",
        //     picUrl:
        //       "https://p1.music.126.net/ddFj3yFd0VifrxbenUL4kA==/109951165048013094.jpg",
        //   },
        //   {
        //     id: 1030001,
        //     name: "周深",
        //     picUrl:
        //       "https://p1.music.126.net/ddFj3yFd0VifrxbenUL4kA==/109951165048013094.jpg",
        //   },
        //   {
        //     id: 1030001,
        //     name: "周深",
        //     picUrl:
        //       "https://p1.music.126.net/ddFj3yFd0VifrxbenUL4kA==/109951165048013094.jpg",
        //   }
        // );
      }
    },
    normalSinger(list) {
      console.log("list",list);
      let obj = {
        hot: {
          title: "热门",
          items: [],
        },
      };
      list.forEach((item, index) => {
        if (index < 10) {
          obj.hot.items.push({
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
          });
        }
        let key = item.initials.toUpperCase();
        if (!obj[key]) {
          obj[key] = {
            title: key,
            items: [],
          };
        }
        obj[key].items.push({
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
        });
      });
      let hot = [];
      let ret = [];
      for (let key in obj) {
        let value = obj[key];
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
      // console.log(obj);
      return hot.concat(ret);
    },
    selectSingerItem(item) {
      console.log(item);
      this.$router.push({
        path: "/singerDetail",
        query: {
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
