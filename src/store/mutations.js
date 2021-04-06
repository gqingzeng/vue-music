import * as type from './mutationType'

const mutations = {
  [type.SET_SINGER](state,singer){
    state.singer = singer
  },
  [type.SET_PLAYING_STATE](state,flag){
    state.playing = flag
  },
  [type.SET_FULL_SCREEN](state,flag){
    state.fullScreen = flag
  },
  [type.SET_PLAYLIST](state,list){
    state.playList = list
  },
  [type.SET_SEQUENCELIST](state,list){
    state.sequenceList = list
  },
  [type.SET_PLAY_MODE](state,mode){
    state.mode = mode
  },
  [type.SET_CURRENTINDEX](state,index){
    state.currentIndex = index
  },

}

export default mutations