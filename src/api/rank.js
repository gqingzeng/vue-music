import request from '../utils/request'

// 获取所有榜单
export function getRankList(params){
  return request({
    url:'/toplist/detail',
    method:'get',
    params,
  })
}

// // 获取所有榜单
// export function getRankList(params){
//   return request({
//     url:'/toplist',
//     method:'get',
//     params,
//   })
// }

// 获取歌单详情
export function getSongList(params){
  return request({
    url:'/playlist/detail',
    method:'get',
    params
  })
}