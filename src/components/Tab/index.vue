<template>
  <div class="tab-container">
    <div class="tab-list">
      <div class="tab-item-wrapper" v-for="(item, index) in tabItems" :key="index">
        <span ref="tab" class="tab-item" @click="clickTab(item, index)">{{
          item[valueKey]
        }}</span>
      </div>
    </div>
    <div class="line" :style="tabSize[tabIndex]"></div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    tabItems: {
      type: Array,
      required: true,
    },
    // 选项对象中，选项文字对应的键名
    valueKey: {
      type: String,
    },
  },
  data() {
    return {
      tabIndex: 0,
      tabSize: [],
    };
  },
  mounted() {
    this.initTabLine();
  },
  methods: {
    // 点击tab,显示对应的内容
    clickTab(item, index) {
      this.tabIndex = index;
      const { path } = item;
      // 解决再次点击时报错
      if (this.$route.path !== path) {
        this.$router.push({
          path,
        });
      }
    },
    // 初始化tab下划线的宽度和水平偏移量
    initTabLine() {
      const tabItem = this.$refs.tab;
      this.tabSize = tabItem.map((item) => {
        const { offsetWidth, offsetLeft } = item;
        return {
          width: `${offsetWidth}px`,
          transform: `translateX(${offsetLeft}px)`,
        };
      });
      this.getCurrentIndex();
    },
    getCurrentIndex() {
      this.tabItems.forEach((item, index) => {
        if (item.path === this.$route.path) {
          this.tabIndex = index;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.tab-container {
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  .tab-list {
    display: flex;
    .tab-item-wrapper {
      text-align: center;
      flex: 1;
      .tab-item {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
.line {
  position: absolute;
  height: 2px;
  background: #ffcd32;
  transition: all 0.3s ease-out;
}
</style>
