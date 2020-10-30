import request from '@/utils/request'

// 轮播图
export function getBanner(params){
  return request({
    url:'/banner',
    params
  })
}

// 热门歌单
export function getPlaylist(params){
  return request({
    url:'/top/playlist?limit=30&order=hot',
    params
  })
}

