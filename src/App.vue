<template>
  <div id="app">
    <MyHeader />
    <Tab :tabItems="tabItems" value-key="name" />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <MyPlayer />
  </div>
</template>

<script>
import Tab from "@/components/Tab/index";
import MyHeader from "@/views/header/index";
import MyPlayer from "@/components/player/index";

export default {
  name: "musicMain",
  components: {
    Tab,
    MyHeader,
    MyPlayer,
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
    };
  },
};
</script>

<style>
body {
  background: #222;
}
</style>
