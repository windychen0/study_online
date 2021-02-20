import { createRouter, createWebHashHistory } from 'vue-router'

export const history = createWebHashHistory()
export const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: '/login',
      name: "Login",
      component: () => import('./views/Login.vue')
    },
    {
      path: '/home',
      name: "Home",
      component: () => import('./views/Home.vue')
    },
    {
      path: '/play',
      name: "Play",
      component: () => import('./views/Play.vue')
    },
    {
      path: '/search',
      name: "Search",
      component: () => import('./views/Search_res.vue')
    }
  ]
})
