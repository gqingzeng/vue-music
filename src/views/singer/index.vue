<template>
  <div class="container">
    <list-view :singerList="singers"></list-view>
  </div>
</template>

<script>
import ListView from "./components/ListView";
import { getSingers } from "@/api/singer";
const pinyin = require("pinyin");
export default {
  components: {
    ListView,
  },
  data() {
    return {
      singers: [
        {
          title: "热门",
          items: [
            {
              picUrl: "",
              name: "薛之谦",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.getSingers();
  },
  methods: {
    async getSingers() {
      let res = await getSingers();
      let singerGroup = res.artists;
      // 新增首字母到数组中
      singerGroup.map((item) => {
        let letter = pinyin(item.name[0], {
          style: pinyin.STYLE_FIRST_LETTER,
        });
        item.initials = letter[0][0].toUpperCase();
      });

      this.singers = this.normalSinger(singerGroup);
    },
    normalSinger(list) {
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
      console.log(obj);
      return hot.concat(ret);
    },
  },
};
</script>

<style scoped lang="scss">
</style>