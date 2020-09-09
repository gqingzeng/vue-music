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
    listenScroll: {
      type: Boolean,
      default: false,
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
      if (this.listenScroll) {
        let _this = this;
        this.scroll.on("scroll", (pos) => {
          _this.$emit("scroll", pos);
        });
      }
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
    scrollTo(){
      this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
    },
    scrollToElement(){
      this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
    }
  },
};
</script>

<style scoped lang="scss">
</style>