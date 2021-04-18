<template>
  <div class="scroll-wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Bscroll from "@better-scroll/core";

export default {
  name: "Scroll",
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
    pullup: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
    },
  },
  data() {
    return {
      scroll: null,
    };
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
      if(this.pullup){
        this.scroll.on("scrollEnd", () => {
          if(this.scroll.y < this.scroll.maxScrollY + 50){
            this.$emit("scrollToEnd");
          }
        });
      }
    },
    disable() {
      this.scroll.disable();
    },
    enable() {
      this.scroll.enable();
    },
    refresh() {
      this.scroll.refresh();
    },
    scrollTo(...arg) {
      this.scroll.scrollTo(...arg);
    },
    scrollToElement(...arg) {
      this.scroll.scrollToElement(...arg);
    },
  },
};
</script>

<style scoped lang="scss"></style>
