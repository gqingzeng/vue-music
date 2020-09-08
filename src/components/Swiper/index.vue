<template>
  <div class="swiper-wrapper" ref="swiper">
    <div class="swiper-content" ref="swiperContent">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        :class="{active:currentPageIndex === index}"
        v-for="(item,index) in dotsLength"
        :key="index"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
BScroll.use(Slide);
export default {
  props: {
    click: {
      type: Boolean,
      default: true,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 4000,
    },
  },
  data() {
    return {
      children: [],
      dotsLength: 0,
      currentPageIndex: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.setSwiperWidth();
      this.initDots();
      this.initScroll();
    });
    window.addEventListener("resize", () => {
      this.swiper.refresh();
    });
  },
  beforeDestroy() {
    this.swiper.destroy();
  },
  methods: {
    // 设置轮播的宽度
    setSwiperWidth() {
      this.children = this.$refs.swiperContent.children;
      let swiperWidth = this.$refs.swiper.clientWidth;
      let width = 0;
      for (let child of this.children) {
        child.style.width = swiperWidth + "px";
        width += swiperWidth;
      }
      this.$refs.swiperContent.style.width = width + "px";
    },
    // 滚动初始化
    initScroll() {
      if (this.swiper) {
        return;
      }
      this.swiper = new BScroll(this.$refs.swiper, {
        probeType: 2,
        click: this.click,
        scrollX: true,
        scrollY: false,
        momentum: false,
        bounce: false,
        useTransition: true,
        stopPropagation: true,
        tap:true,
        slide: {
          loop: this.loop,
          autoplay: this.autoPlay,
          interval: this.interval,
          threshold: 0.3,
        },
      });
      this.swiper.on("slideWillChange", (page) => {
        this.currentPageIndex = page.pageX;
      });
    },
    // 小圆点长度
    initDots() {
      this.dotsLength = this.children.length;
    },
  },
};
</script>

<style scoped lang="scss">
.swiper {
  &-wrapper {
    position: relative;
  }
  &-content {
    display: flex;
    height: 100%;
    & a,
    & img {
      width: 100%;
    }
  }
}

.dots {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 3px;
    background: rgba(238, 238, 238, 0.5);
    &.active {
      background: rgba(255, 255, 255, 1);
    }
  }
}
</style>