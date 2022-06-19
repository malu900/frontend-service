import { createRouter, createWebHistory } from 'vue-router'
import publicRoutes from './publicRoutes'
import privateRoutes from './privateRoutes'

const routes = [...publicRoutes, ...privateRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
