<template>
  <div class="header-container">
    <h1 class="title">VMusic</h1>
    <i class="iconfont icon-liebiao" @click="personClick"></i>
  </div>
</template>

<script>
export default {
  name: "musicHeader",
  data() {
    return {};
  },
  methods: {
    personClick() {
      console.log("个人中心");
    },
  },
};
</script>

<style scoped lang="scss">
.header-container {
  position: relative;
  height: 44px;
  color: #ffcd32;
  .title {
    display: inline-block;
    width: 100%;
    font-size: 18px;
    font-weight: 400;
    line-height: 44px;
    text-align: center;
  }
  .icon-liebiao {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 24px;
  }
}
</style>
