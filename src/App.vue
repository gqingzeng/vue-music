<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <MyPlayer />
    
  </div>
</template>

<script>
import MyPlayer from "@/components/player/index";

export default {
  name: "musicMain",
  components: {
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

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
