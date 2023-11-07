import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/news/page/:page',
      name: 'news-page',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/boxscore/:id',
      name: 'boxscore',
      component: () => import('../views/BoxScoreView.vue')
    }
  ]
})

export default router
