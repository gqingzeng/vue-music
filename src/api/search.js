import request from '../utils/request'

// 搜索
export function searchQuery(params) {
  return request({
    url: "/search",
    params,
    methods: 'get'
  })
}


// 热门搜索
export function getHotSearch() {
  return request({
    url: '/search/hot',
    method: 'get',
  })
}