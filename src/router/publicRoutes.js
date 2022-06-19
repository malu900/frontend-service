export default [
  {
    path: '/tweets',
    name: 'tweets',
    component: () => import('../components/TweetList.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  }
]
