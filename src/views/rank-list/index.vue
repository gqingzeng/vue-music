<template>
  <div class="container">
    <music-list :musicList = "musicList" ></music-list>
  </div>
</template>

<script>
import MusicList from "../components/MusicList";

import {getSongList} from '@/api/rank'
export default {
  name:"rankList",
  components: {
    MusicList,
  },
  data(){
   return {
     id:"",
     musicList:[]
   }
  },
  created(){
    this.id = this.$route.query.id;
    console.log(this.id);
    this._getSongList()
  },
  methods:{
   async _getSongList(){
      const res = await getSongList({
        id:this.id
      })
      this.musicList = this.handleData(res.playlist.tracks)
      console.log(res);
    },
    handleData(data){
      const arr = [];
      data.forEach((item) => {
        arr.push({
          songName:item.name
        })
      });
      return arr
    }
  }
}
</script>

<style scoped lang="scss">

</style>