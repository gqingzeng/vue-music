<template>
  <div class="header-container">
    <h1 class="title">VMusic</h1>
    <img class="icon-mine" src="@/assets/img/icon-mine.png"/>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.header-container {
  height: 44px;
  .title {
    display: inline-block;
    width: 100%;
    color: #ffcd32;
    font-size: 18px;
    font-weight: 400;
    line-height: 44px;
    text-align: center;
  }
  .icon-mine {
    width: 20px;
    height: 20px;
    padding: 12px;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>