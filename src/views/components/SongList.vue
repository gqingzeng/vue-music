<template>
  <div class="song-list-container">
    <ul>
      <li class="song-list" v-for="(item,index) in songList" :key="index">
        <div class="rank-wrapper" v-show="showIcon">
          <span class="rank" :style="getStyle(index)">{{index + 1}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{item.songName}}</h2>
          <p class="desc">{{getDesc(item.songName)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name:"SongList",
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
  computed: {
    ...mapGetters(["singer"]),
  },
  methods: {
    getStyle(index) {
      if (index < 3) {
        return `color:#ffcd32`;
      } else {
        return `color: rgba(255, 255, 255, 0.5);`;
      }
    },
    getDesc(songName) {
      return `${this.singer.name} - ${songName}`;
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