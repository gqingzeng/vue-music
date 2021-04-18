import * as type from './mutationType'
import {
  playMode
} from "@/common/playerConfig";
import {
  shuffle
} from "@/utils/utils";

function findCurrentIndex(list, currentSong) {
  return list.findIndex((item) => item.id === currentSong.id)
}

export const setectPlay = ({
  commit,
  state
}, {
  list,
  index
}) => {
  commit(type.SET_SEQUENCELIST, list)
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    commit(type.SET_PLAYLIST, randomList)
    index = findCurrentIndex(randomList, list[index])
  } else {
    commit(type.SET_PLAYLIST, list)
  }
  commit(type.SET_CURRENTINDEX, index)
  commit(type.SET_FULL_SCREEN, true)
  commit(type.SET_PLAYING_STATE, true)
}

export const randomPlay = ({
  commit
}, {
  list
}) => {
  commit(type.SET_PLAY_MODE, playMode.random)
  commit(type.SET_SEQUENCELIST, list)
  const randomList = shuffle(list)
  commit(type.SET_PLAYLIST, randomList)
  commit(type.SET_CURRENTINDEX, 0)
  commit(type.SET_FULL_SCREEN, true)
  commit(type.SET_PLAYING_STATE, true)
}

export const insetSong = ({
  commit,
  state
}, song) => {
  let playList = state.playList.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  const currentSong = playList[currentIndex];
  let index = findCurrentIndex(playList, song)
  currentIndex++
  playList.splice(currentIndex, 0, song);
  if (index > -1) {
    if (currentIndex > index) {
      playList.splice(index, 1)
      currentIndex--
    } else {
      playList.splice(index + 1, 1)
    }
  }

  let currentSequenceIndex = findCurrentIndex(sequenceList, currentSong)
  currentSequenceIndex++
  let sequenceIndex = findCurrentIndex(sequenceList, song)
  sequenceList.splice(currentSequenceIndex, 0, song)
  if (sequenceIndex > -1) {
    if (currentSequenceIndex > sequenceIndex) {
      sequenceList.splice(sequenceIndex, 1)
    } else {
      sequenceList.splice(sequenceIndex + 1, 1)
    }
  }
  commit(type.SET_PLAYLIST, playList)
  commit(type.SET_SEQUENCELIST, sequenceList)
  commit(type.SET_CURRENTINDEX, currentIndex)
  commit(type.SET_FULL_SCREEN, true)
  commit(type.SET_PLAYING_STATE, true)

}

export const deleteSong = ({
  commit,
  state
}, song) => {
  let playList = state.playList.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  let index = findCurrentIndex(playList, song)
  playList.splice(index, 1)
  let sequenceIndex = findCurrentIndex(sequenceList, song)
  sequenceList.splice(sequenceIndex, 1)
  if (currentIndex > index || currentIndex === playList.length) {
    currentIndex--
  }
  commit(type.SET_PLAYLIST, playList)
  commit(type.SET_SEQUENCELIST, sequenceList)
  commit(type.SET_CURRENTINDEX, currentIndex)
  if (!playList.length) {
    commit(type.SET_PLAYING_STATE, false)
  }
}

export const deleteAllSong = ({commit}) => {
  commit(type.SET_PLAYLIST, [])
  commit(type.SET_SEQUENCELIST, [])
  commit(type.SET_CURRENTINDEX, -1)
  commit(type.SET_PLAYING_STATE, false)
}