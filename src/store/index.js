import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as getters from './getters'
import { playMode } from '../common/playerConfig'
import * as actions from './actions'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    singer:{},
    playing:false,// 播放状态
    fullScreen:false,// 是否全屏
    playList:[], // 播放列表
    sequenceList:[], //顺序列表
    mode:playMode.sequence, // 播放模式
    currentIndex: -1,//当前播放的索引
  },
  mutations,
  getters,
  actions
})
export default store