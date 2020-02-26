import request from '@/utils/request'

export function login(data) {
  return request({
    url: `auth/login`,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'auth/userinfo',
    method: 'post',
    token
  })
}

export function logout(token) {
  return request({
    url: 'auth/logout',
    method: 'post',
    token
  })
}
// 获取全部用户信息
export function userList(data) {
  return request({
    url: '/users',
    method: 'get',
    data
  })
}
// 获取用户信息
export function userdata(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'get',
    data
  })
}
// 修改用户信息
export function upedit(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data
  })
}
// 删除用户信息
export function upremove(id,) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}
