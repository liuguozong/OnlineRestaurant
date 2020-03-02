import request from '@/utils/request'

// 获取全部菜品
export function meunList(data) {
  return request({
    url: '/menus',
    method: 'get',
    data
  })
}
// 获取菜品信息
export function menudata(id, data) {
  return request({
    url: `/menus/${id}`,
    method: 'get',
    data
  })
}
// 修改菜品信息
export function menuedit(id, data) {
  return request({
    url: `/menus/${id}`,
    method: 'put',
    data
  })
}
// 删除菜品信息
export function menuremove(id,) {
  return request({
    url: `/menus/${id}`,
    method: 'delete'
  })
}
// 新增菜品信息
export function menuadd(data) {
  return request({
    url: `/menus`,
    method: 'post',
    data
  })
}
export function term(data) {
  return request({
    url: `/menus/term`,
    method: 'gat',
    data
  })
}
