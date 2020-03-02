import request from '@/utils/request'

// 获取全部订单
export function orderList(data) {
  return request({
    url: '/orders',
    method: 'get',
    data
  })
}
// 获取订单信息
export function orderdata(id, data) {
  return request({
    url: `/orders/${id}`,
    method: 'get',
    data
  })
}
// 修改订单信息
export function orderedit(id, data) {
  return request({
    url: `/orders/${id}`,
    method: 'put',
    data
  })
}
// 删除订单信息
export function orderremove(id,) {
  return request({
    url: `/orders/${id}`,
    method: 'delete'
  })
}
export function ordereadd(data) {
  return request({
    url: `/orders`,
    method: 'post',
    data
  })
}
//  新建订单详情
export function detailedadd(data) {
  return request({
    url: `/detaileds`,
    method: 'post',
    data
  })
}
export function detaileddit(id, data) {
  return request({
    url: `/detaileds/${id}`,
    method: 'put',
    data
  })
}
