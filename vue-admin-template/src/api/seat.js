import request from '@/utils/request'

// 获取座位
export function seatList(query) {
  return request({
    url: '/seats',
    method: 'get',
    params: query
  })
}
// 获取座位信息
export function seatdata(id, data) {
  return request({
    url: `/seats/${id}`,
    method: 'get',
    data
  })
}
// 修改座位信息
export function seatedit(id, data) {
  return request({
    url: `/seats/${id}`,
    method: 'put',
    data
  })
}
// 删除座位
export function seatremove(id,) {
  return request({
    url: `/seats/${id}`,
    method: 'delete'
  })
}
export function seateadd(data) {
  return request({
    url: `/seats`,
    method: 'post',
    data
  })
}
