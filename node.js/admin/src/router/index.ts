import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CourseList from '../views/courses/CourseList.vue'
import CourseEdit from '../views/courses/CourseEdit.vue'

Vue.use(VueRouter)

const routes :RouteConfig[]= [//赋值一个路由数组值，代码有提示//
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
        {name:'Home',path: '/', component: Home},
        {name:'course-list',path: '/courses/list', component: CourseList},
        {name:'course-edit',path: '/courses/edit/:id', component: CourseEdit,props:true},
        {name:'course-create',path: '/courses/create', component: CourseEdit},
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
