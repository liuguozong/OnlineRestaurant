import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7f336fe6 = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages_about_index" */))
const _7ebba132 = () => interopDefault(import('..\\pages\\activity\\index.vue' /* webpackChunkName: "pages_activity_index" */))
const _56d054b9 = () => interopDefault(import('..\\pages\\coach\\index.vue' /* webpackChunkName: "pages_coach_index" */))
const _45e1f0d8 = () => interopDefault(import('..\\pages\\comment\\index.vue' /* webpackChunkName: "pages_comment_index" */))
const _bef6e7ae = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages_inspire" */))
const _533fe062 = () => interopDefault(import('..\\pages\\menu\\index.vue' /* webpackChunkName: "pages_menu_index" */))
const _6203f2ec = () => interopDefault(import('..\\pages\\person\\index.vue' /* webpackChunkName: "pages_person_index" */))
const _862ea7be = () => interopDefault(import('..\\pages\\photo\\index.vue' /* webpackChunkName: "pages_photo_index" */))
const _59ce2fb4 = () => interopDefault(import('..\\pages\\menu\\minute.vue' /* webpackChunkName: "pages_menu_minute" */))
const _22776fcc = () => interopDefault(import('..\\pages\\activity\\_id.vue' /* webpackChunkName: "pages_activity__id" */))
const _1a09f03e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _7f336fe6,
    name: "about"
  }, {
    path: "/activity",
    component: _7ebba132,
    name: "activity"
  }, {
    path: "/coach",
    component: _56d054b9,
    name: "coach"
  }, {
    path: "/comment",
    component: _45e1f0d8,
    name: "comment"
  }, {
    path: "/inspire",
    component: _bef6e7ae,
    name: "inspire"
  }, {
    path: "/menu",
    component: _533fe062,
    name: "menu"
  }, {
    path: "/person",
    component: _6203f2ec,
    name: "person"
  }, {
    path: "/photo",
    component: _862ea7be,
    name: "photo"
  }, {
    path: "/menu/minute",
    component: _59ce2fb4,
    name: "menu-minute"
  }, {
    path: "/activity/:id",
    component: _22776fcc,
    name: "activity-id"
  }, {
    path: "/",
    component: _1a09f03e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
