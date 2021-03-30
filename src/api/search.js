import request from '../utils/request'

// 热门搜索
export function getHotSearch(){
  return request({
    url:'/search/hot',
    method:'get',
  })
}
