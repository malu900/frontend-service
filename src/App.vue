<script>
// import { useStore } from 'vuex'
import NavDrawer from './components/NavDrawer.vue'
export default {
  name: 'App',
  components: {
    NavDrawer
    // NavTrends: () => import('./components/NavTrends.vue'),
  },
  setup() {
    // const store = useStore()
  }
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <nav-drawer></nav-drawer>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
