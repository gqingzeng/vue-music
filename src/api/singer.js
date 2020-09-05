import request from '../utils/request'

export function getSingers(params){
  return request({
    url:'/top/artists?offset=0&limit=300',
    params,
  })
}