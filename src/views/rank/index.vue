<template>
  <div class="rank">
    <ul>
      <li class="rank-item" v-for="(item, index) in rankList" :key="index">
        <div class="icon-left">
          <img :src="item.coverImgUrl" />
        </div>
        <ul class="song-list">
          <li
            class="song-item"
            v-for="(trackItem, trackIndex) in item.tracks"
            :key="trackIndex"
            @click="enterClick(item)"
          >
            <span class="desc"
              >{{ trackIndex + 1 }}{{ trackItem.first }}-{{ trackItem.second }}</span
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { getRankList } from "@/api/rank";

export default {
  data() {
    return {
      rankList: [],
    };
  },
  created() {
    this._getRankList();
  },
  methods: {
    async _getRankList() {
      const { code, list } = await getRankList();
      if (code === 200) {
        this.rankList = list.slice(0, 4);
      }
    },
    enterClick(item) {
      console.log(item);
      const { id, name, coverImgUrl: picUrl } = item;
      this.$router.push({
        path: "/rankDetail",
        query: {
          id,
          name,
          picUrl,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.rank-item {
  display: flex;
  margin: 0 20px;
  padding-top: 20px;
  height: 100px;
  overflow: hidden;
  &:last-child {
    padding-bottom: 20px;
  }
  .icon-left {
    img {
      width: 100px;
      height: 100px;
    }
  }
  .song-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    width: 100%;
    height: 100px;
    font-size: 14px;
    background: #333;
    color: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    .song-item {
      display: flex;
      line-height: 26px;
      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
