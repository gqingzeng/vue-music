import * as type from './mutationType'

export const setectPlay = ({commit},{list,index}) =>{
  commit(type.SET_SEQUENCELIST,list)
  commit(type.SET_PLAYLIST,list)
  commit(type.SET_CURRENTINDEX,index)
  commit(type.SET_FULL_SCREEN,true)
  commit(type.SET_PLAYING_STATE,true)
}