import {SETSINGER} from './mutationType'

export default {
  [SETSINGER](state,singer){
    state.singer = singer
  }
}