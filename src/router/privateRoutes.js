import { authGuard } from '@auth0/auth0-vue'

export default [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/Profile.vue'),
    beforeEnter: authGuard
  }
]
