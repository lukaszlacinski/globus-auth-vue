import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: function () {
      return import('../views/Home.vue')
    }
  },
  {
    path: '/auth/callback',
    name: 'Callback',
    component: function () {
      return import('../views/Callback.vue')
    }
  },
  {
    path: '/auth/silent-renew',
    name: 'SilentRenew',
    component: function () {
      return import('../views/SilentRenew.vue')
    }
  },
  {
    path: '/auth/logout',
    name: 'Logout',
    component: function () {
      return import('../views/Logout.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
