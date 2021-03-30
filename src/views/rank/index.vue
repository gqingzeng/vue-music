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
              >{{ trackIndex + 1 }}{{ trackItem.first }}-{{
                trackItem.second
              }}</span
            >
          </li>
          <!-- <li class="song-item" v-for="(trackItem,trackIndex) in item.tracks" :key="trackIndex">        
            <span class="desc">{{trackIndex + 1}} - {{trackItem.name}}</span>
          </li> -->
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>

import { getRankList } from "@/api/rank";
// import {getRankList, getSongList} from '@/api/rank'

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
      let res = await getRankList();
      this.rankList = res.list.slice(0, 4);
    },
    enterClick(item) {
      console.log(item);
      this.$router.push({
        path: "/rankDetail",
        query: {
          id: item.id,
          name:item.name,
          picUrl:item.coverImgUrl
        },
      });
    
    },

    //  async _getRankList(){
    //    let res = await getRankList();
    //    console.log(res);
    //    if(res.code === 200){
    //      this.rankList = this.handleData(res.list);
    //      console.log(this.rankList);
    //      this.rankList.forEach((item,index) =>{
    //        this._getSongList(item.id,index)
    //      })
    //    }
    //   },
    //   handleData(arrList){
    //    return arrList.map(item =>{
    //        const coverImgUrl = item.coverImgUrl;
    //        const id = item.id;
    //       return {coverImgUrl,id}
    //     })
    //   },
    //   async _getSongList(id,index){
    //     let res = await getSongList({
    //       id:id
    //     })
    //     console.log(res);
    //     this.$set(this.rankList[index],'tracks',res.playlist.tracks.slice(0,3))
    //     console.log(this.rankList);
    //   }
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