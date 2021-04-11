import * as type from './mutationType'
import {
  playMode
} from "@/common/playerConfig";
import {
  shuffle
} from "@/utils/utils";

function findCurrentIndex(list, currentSong) {
  return list.findIndex((item) => item.id === currentSong.id)}

export const setectPlay = ({commit,state}, {list,index}) => {
  commit(type.SET_SEQUENCELIST, list)
  if(state.mode === playMode.random){
    const randomList = shuffle(list)
    commit(type.SET_PLAYLIST, randomList)
    index = findCurrentIndex(randomList,list[index])
  }else{
    commit(type.SET_PLAYLIST, list)
  }
  commit(type.SET_CURRENTINDEX, index)
  commit(type.SET_FULL_SCREEN, true)
  commit(type.SET_PLAYING_STATE, true)
}

export const randomPlay = ({commit}, {list}) => {
  commit(type.SET_PLAY_MODE, playMode.random)
  commit(type.SET_SEQUENCELIST, list)
  const randomList = shuffle(list)
  commit(type.SET_PLAYLIST, randomList)
  commit(type.SET_CURRENTINDEX, 0)
  commit(type.SET_FULL_SCREEN, true)
  commit(type.SET_PLAYING_STATE, true)
}