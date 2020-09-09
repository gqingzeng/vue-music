import request from '@/utils/request'

export function getBanner(params){
  return request({
    url:'/banner',
    params
  })
}

export function getPlaylist(params){
  return request({
    url:'/top/playlist?limit=30&order=hot',
    params
  })
}

