import request from '../utils/request'

// 拼接音乐url
export function getSongUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3 `
}

// 获取歌词
export function getLyric(params) {
  return request({
    url: '/lyric',
    method: 'get',
    params
  })
}