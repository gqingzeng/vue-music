<template>
  <div class="listview">
    <ul class="singer-list">
      <li class="singer-item" v-for="(item,index) in singerList" :key="index">
        <h2 class="title">{{item.title}}</h2>
        <ul>
          <li
            class="singer-group"
            v-for="(singerItem,singerIndex) in item.items"
            :key="singerIndex"
          >
            <img class="icon-singer" :src="singerItem.picUrl" alt />
            <span class="name">{{singerItem.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    singerList: {
      type: Array,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.listview {
  .singer-item{
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
}
</style>