<template>
  <div class="list-view-container">
    <scroll
      class="list-view"
      ref="listView"
      :data="singerList"
      :listenScroll="listenScroll"
      :probeType="probeType"
      @scroll="scroll"
    >
      <ul class="singer-list">
        <li class="singer-item" v-for="(item,index) in singerList" :key="index" ref="singerItem">
          <h2 class="title">{{item.title}}</h2>
          <ul>
            <li
              class="singer-group"
              v-for="(singerItem,singerIndex) in item.items"
              :key="singerIndex"
              @click="slectItem(singerItem)"
            >
              <img class="icon-singer" v-lazy="singerItem.picUrl" />
              <span class="name">{{singerItem.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-shortcut" @touchstart="shortcutTouchStart">
        <ul>
          <li
            class="letter"
            :class="{'letter-active':currentIndex == index}"
            v-for="(shortcutItem,index) in shortcut"
            :key="index"
            :data-index="index"
          >{{shortcutItem}}</li>
        </ul>
      </div>
      <div class="loading-wrapper" v-if="!singerList.length">
        <loading title="载入中..."></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/Scroll";
import Loading from "@/components/Loading";
export default {
  components: {
    Scroll,
    Loading,
  },
  props: {
    singerList: {
      type: Array,
    },
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: 0,
    };
  },
  watch: {
    singerList() {
      this.$nextTick(() => {
        this.calculateHeight();
      });
    },
    scrollY(newVal) {
      const height = this.rightHeight;
      // 解决当往上滑动时，对应的字母索引不对
      if (newVal > 0) {
        this.currentIndex = 0;
        return;
      }
      // 中间滚动
      for (let i = 0; i < height.length - 1; i++) {
        if (-newVal >= height[i] && -newVal < height[i + 1]) {
          this.currentIndex = i;
          console.log(this.currentIndex, "---");
          return;
        }
      }
      // 当划到最下面时，对应的索引字母改变
      this.currentIndex = height.length - 1;
    },
  },
  computed: {
    // 字母索引表数据
    shortcut() {
      return this.singerList.map((item) => {
        return item.title.substr(0, 1);
      });
    },
  },
  mounted() {
    this.refresh();
  },
  created() {
    this.listenScroll = true;
    this.probeType = 3;
  },
  methods: {
    // 计算各个列表的高度
    calculateHeight() {
      this.rightHeight = [];
      let lis = this.$refs.singerItem;
      lis.forEach((item) => {
        this.rightHeight.push(item.offsetTop);
      });
    },
    shortcutTouchStart(e) {
      let anchorIndex = e.target.getAttribute("data-index");
      this.scrollY = -this.rightHeight[anchorIndex];
      this.MyScrollTo(anchorIndex);
    },
    MyScrollTo(index) {
      if (!index) {
        return;
      }
      this.$refs.listView.scrollToElement(this.$refs.singerItem[index], 0);
    },
    refresh() {
      this.$refs.listView.refresh();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    slectItem(item) {
      this.$emit("selectItem", item);
    },
  },
};
</script>

<style scoped lang="scss">
.list-view-container {
  position: fixed;
  top: 90px;
  width: 100%;
  bottom: 0;
  .list-view {
    position: relative;
    height: 100%;
    overflow: hidden;
    .singer-item {
      padding-bottom: 20px;
      .title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        background: #333;
      }
      .singer-group {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .icon-singer {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .name {
          color: rgba(255, 255, 255, 0.5);
          margin-left: 20px;
          font-size: 14px;
        }
      }
    }
    .list-shortcut {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      text-align: center;
      padding: 20px 0;
      border-radius: 10px;
      background: #000;
      color: rgba(255, 255, 255, 0.5);
      font-size: 12px;
    }
    .letter-active {
      color: #ffcd32;
    }
  }
}
.loading-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}
</style>