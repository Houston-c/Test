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
  },{
    path: '/adddemo',
    name: 'adddemo',
    component: () => import('../views/test1/addData.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router