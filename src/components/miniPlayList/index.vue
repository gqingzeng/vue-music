<template>
  <transition name="fade">
    <div class="container" @click.stop="closeDialog">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <i @click="toggleMiniPlayMode" :class="['iconfont', iconMode]"></i>
          <div class="title">{{ getPlayModeName }}</div>
          <i @click="delAll" class="iconfont icon-shanchu1"></i>
        </div>
        <scroll ref="scroll" class="list-content" :data="list">
          <ul>
            <li
              v-for="(item, index) in list"
              :key="index"
              @click="selectMiniItem(item, index)"
            >
              <i :class="['current', 'iconfont', getIcon(item)]"></i>
              <span class="text">{{ item.fullName }}</span>
              <i class="iconfont icon-shoucang"></i>
              <i @click.stop="deleteSong(item)" class="iconfont icon-shanchu11"></i>
            </li>
          </ul>
        </scroll>
        <div class="list-bottom" @click="closeDialog">
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from "@/components/Scroll/index";

import { mapGetters } from "vuex";
import { playMode } from "@/common/playerConfig";

export default {
  components: {
    Scroll,
  },
  props: {
    list: {
      type: Array,
      default() {
        return ["aaa"];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["mode", "currentSong"]),
    iconMode() {
      return this.mode === playMode.sequence
        ? "icon-liebiaoxunhuan"
        : this.mode === playMode.loop
        ? "icon-danquxunhuan"
        : "icon-suijibofang";
    },
    getPlayModeName() {
      if (this.mode === playMode.sequence) {
        return "顺序播放";
      } else if (this.mode === playMode.loop) {
        return "单曲循环";
      } else {
        return "随机播放";
      }
    },
  },
  methods: {
    getIcon(item) {
      if (this.currentSong.id === item.id) {
        return "icon-bofang";
      }
      return "";
    },
    toggleMiniPlayMode() {
      this.$emit("toggleMiniPlayMode");
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    delAll() {
      this.$emit("delAll");
    },
    selectMiniItem(item, index) {
      this.$emit("selectMiniItem", item, index);
    },
    deleteSong(item){
      this.$emit('deleteSong',item)
    }
  },
};
</script>

<style scoped lang="scss">
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  .list-wrapper {
    position: absolute;
    top: 40%;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #333;
    color: rgba(255, 255, 255, 0.5);
    .list-header {
      display: flex;
      align-items: center;
      margin: 10px 20px;
      .iconfont {
        font-size: 28px;
        color: #ffcd32;
      }
      .icon-shanchu1 {
        font-size: 20px;
        color: rgba(255, 255, 255, 0.5);
      }
      .title {
        width: 100%;
        margin-left: 5px;
      }
    }
    .list-content {
      padding: 0 30px 0 20px;
      height: 290px;
      overflow: hidden;
      ul li {
        display: flex;
        align-items: center;
        height: 40px;
        .current {
          width: 20px;
          margin-right: 10px;
        }
        .text {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .icon-shoucang,
        .icon-shanchu11,
        .icon-bofang {
          color: #ffcd32;
        }
        .icon-shoucang {
          margin-right: 15px;
        }
      }
    }
    .list-bottom {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      text-align: center;
      line-height: 50px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
      background: #222;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
  .list-wrapper {
    transition: all 0.3s;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  .list-wrapper {
    transform: translate3d(0, 100%, 0);
  }
}
</style>
