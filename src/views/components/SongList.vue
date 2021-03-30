<template>
  <div class="song-list-container">
    <ul>
      <li
        class="song-list"
        v-for="(item, index) in songList"
        :key="index"
        @click="selectSong(item,index)"
      >
        <div class="rank-wrapper" v-show="showIcon">
          <span class="rank" :style="getStyle(index)">{{ index + 1 }}</span>
        </div>
        <div class="content">
          <h2 class="name">{{ item.songName }}</h2>
          <p class="desc">{{ item.fullName }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SongList",
  props: {
    songList: {
      type: Array,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    getStyle(index) {
      if (index < 3) {
        return `color:#ffcd32`;
      } else {
        return `color: rgba(255, 255, 255, 0.5);`;
      }
    },
    selectSong(item,index) {
      this.$emit('selectSong',item,index)
    },
  },
};
</script>

<style scoped lang="scss">
.song-list-container {
  padding: 20px 30px;
}
.song-list {
  display: flex;
  height: 64px;
  align-items: center;
  font-size: 14px;
  .rank-wrapper {
    font-size: 14px;
    width: 25px;
    height: 25px;
    line-height: 25px;
    margin-right: 30px;
    text-align: center;
  }
  .content {
    width: 80%;
    .name {
      color: #fff;
      font-size: 14px;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .desc {
      color: rgba(255, 255, 255, 0.5);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>