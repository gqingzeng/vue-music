<template>
  <div class="scroll-wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Bscroll from "@better-scroll/core";

export default {
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    click: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    },
  },
  mounted() {
    this.initScroll();
  },
  beforeDestroy() {
    this.scroll.destroy();
  },
  methods: {
    initScroll() {
      if (this.scroll) {
        return;
      }
      this.scroll = new Bscroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
      });
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style scoped lang="scss">
</style>