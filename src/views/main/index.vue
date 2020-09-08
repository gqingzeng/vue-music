<template>
  <div id="main">
    <m-header></m-header>
    <tab :tabItems="tabItems" :value-key="name"></tab>
    <router-view />
  </div>
</template>

<script>
import MHeader from "@/views/header/index";
import Tab from "@/components/Tab/index";
export default {
  components: {
    MHeader,
    Tab,
  },
  data() {
    return {
      tabItems: [
        {
          id: 0,
          name: "推荐",
          path: "/recommend",
        },
        {
          id: 1,
          name: "歌手",
          path: "/singer",
        },
        {
          id: 2,
          name: "排行",
          path: "/rank",
        },
        {
          id: 3,
          name: "搜索",
          path: "/search",
        },
      ],
      name: "name",
    };
  },
};
</script>

<style></style>

