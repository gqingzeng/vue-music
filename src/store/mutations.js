import * as type from './mutationType'

const mutations = {
  [type.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [type.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [type.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [type.SET_PLAYLIST](state, list) {
    state.playList = list
  },
  [type.SET_SEQUENCELIST](state, list) {
    state.sequenceList = list
  },
  [type.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [type.SET_CURRENTINDEX](state, index) {
    state.currentIndex = index
  },
  [type.SET_SEARCHHISTORYLIST](state, search) {
    state.searchHistoryList = state.searchHistoryList.filter(item => item !== search)
    state.searchHistoryList.unshift(search)
  },
  [type.DEL_SEARCHHISTORYLIST](state, index) {
    state.searchHistoryList.splice(index, 1)
  },
  [type.DELALL_SEARCHHISTORYLIST](state) {
    state.searchHistoryList = []
  },
  [type.SET_FAVORITELIST](state, favoriteItem) {
    let index = state.favoriteList.findIndex(item => item.id === favoriteItem.id)
    if(index < 0 ){
      state.favoriteList.push(favoriteItem)
    }
  },
  [type.DEL_FAVORITELIST](state, index) {
    state.favoriteList.splice(index, 1)
  },

}

export default mutations