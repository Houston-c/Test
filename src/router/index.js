import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }, {
    path: '/activex',
    name: 'activex',
    component: () => import('../views/test1/activeX.vue')
  }, {
    path: '/demo',
    name: 'demo',
    component: () => import('../views/test1/demo.vue')
  }, {
    path: '/adddemo',
    name: 'adddemo',
    component: () => import('../views/test1/addData.vue')
  }, {
    path: '/uploadImg',
    name: 'uploadImg',
    component: () => import('../views/test2/upload.vue')
  },
  {
    path: '/drag',
    name: 'drag',
    component: () => import('../views/test2/drag.vue')
  },
  {
    path: '/popMenu',
    name: 'popMenu',
    component: () => import('../views/test2/popMenu.vue')
  },
  {
    path: '/drag2',
    name: 'drag2',
    component: () => import('../views/test2/drag2.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router