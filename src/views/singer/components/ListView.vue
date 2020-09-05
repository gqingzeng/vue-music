<template>
  <div class="listview"></div>
</template>

<script>
import { getSingers } from "@/api/singer";
export default {
  data() {
    return {};
  },
  created(){
    this.getSingers();
  },
  methods:{
    async getSingers(){
      let res = await getSingers();
      console.log(res);
    }
  }
};
</script>

<style scoped lang="scss">
</style>