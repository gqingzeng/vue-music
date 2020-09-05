<template>
  <div class="loading">
    <img class="icon-loading" src="@/assets/img/loading/loading.gif" />
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.loading {
  text-align: center;
  .icon-loading {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: baseline;
  }
  .desc {
    color: rgba(255, 255, 255, 0.5);
    line-height: 20px;
    font-size: 12px;
  }
}
</style>