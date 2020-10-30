import request from '../utils/request'

// 热门歌手
export function getSingers(params){
  return request({
    url:'/top/artists?offset=0&limit=100',
    method:'get',
    params,
  })
}

// 获取歌手单曲
export function getArtists(params){
  return request({
    url:'/artists',
    method:'get',
    params,
  })
}