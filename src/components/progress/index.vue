<template>
  <div class="progress-container" ref="progressContainer" @click="progressClick">
    <div ref="progress" class="progress"></div>
    <div
      ref="circle"
      class="circle"
      @touchstart.prevent="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      touchData: {},
    };
  },
  watch: {
    percent(newValue) {
      if (!this.touchData.initated) {
        const width = this.$refs.progressContainer.clientWidth;
        const offsetWidth = width * newValue;
        this.setStyle(offsetWidth);
      }
    },
  },
  methods: {
    touchstart(e) {
      console.log("aaaa");
      this.touchData.initated = true;
      // 开始触摸时距左侧的偏移距离
      this.touchData.offsetStartX = e.touches[0].pageX;
      // 进度条移动距离
      this.touchData.progressWidth = this.$refs.progress.clientWidth;
    },
    touchmove(e) {
      const progressContainerWidth = this.$refs.progressContainer.clientWidth;
      // 触摸时移动的距离
      const delX = e.touches[0].pageX - this.touchData.offsetStartX;
      // 触摸时进度条移动的总距离(该范围最大值为progress的宽度，最小值为0)
      let offsetWidth = delX + this.touchData.progressWidth;
      offsetWidth = Math.min(progressContainerWidth, Math.max(0, offsetWidth));
      this.setStyle(offsetWidth);
    },
    touchend() {
      this.touchData.initated = false;
      this.toggleProgress();
    },
    toggleProgress() {
      const totalWidth = this.$refs.progressContainer.clientWidth;
      const percent = this.$refs.progress.clientWidth / totalWidth;
      this.$emit("toggleProgress", percent);
    },
    progressClick(e) {
      this.setStyle(e.offsetX);
      this.toggleProgress();
    },
    setStyle(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.circle.style.transform = `translateX(${offsetWidth}px)`;
    },
  },
};
</script>

<style scoped lang="scss">
.progress-container {
  position: relative;
  height: 4px;
  width: 100%;
  .progress {
    position: absolute;
    height: 100%;
    background: #ffcd32;
    border-radius: 20px;
  }
  .circle {
    position: absolute;
    left: -6px;
    top: -4px;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
  }
}
</style>
