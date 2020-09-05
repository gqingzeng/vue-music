import request from '../utils/request'

export function getSingers(params){
  return request({
    // url:'/artist/list?type=-1&area=-1&limit=100',
    url:'/top/artists?offset=0&limit=300',
    params,
  })
}