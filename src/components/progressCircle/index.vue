<template>
  <div class="progress-circle-container">
    <svg
      :width="width"
      :height="width"
      version="1.1"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="progress-background"
        cx="50"
        cy="50"
        r="50"
        stroke="rgba(255, 205, 50, 0.5)"
        fill="transparent"
      />
      <circle
        class="progress-circle"
        cx="50"
        cy="50"
        r="50"
        stroke="yellow"
        fill="transparent"
        :stroke-dasharray="dasharray"
        :stroke-dashoffset="dashoffset"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "progress-circle",
  props: {
    width: {
      type: Number,
      default: 32,
    },
    percent: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    dasharray() {
      return Math.PI * 100;
    },
    dashoffset() {
      return (1 - this.percent) * this.dasharray;
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.progress-circle-container {
  position: relative;
  svg {
    stroke-width: 8;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .progress-background {
    transform-origin: center;
    transform: scale(0.95);
  }
  .progress-circle {
    transform-origin: center;
    transform: scale(0.95) rotate(-90deg);
  }
}
</style>
