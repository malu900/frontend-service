import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import '@mdi/font/css/materialdesignicons.css'
// import Vuetify from 'vuetify/lib/framework'
import { loadFonts } from './plugins/webfontloader'
import { createAuth0 } from '@auth0/auth0-vue'
import { domain, client_id as client_id } from '../auth_config.json'
import axios from 'axios'

loadFonts()
createApp(App)
  .use(router)
  .use(
    createAuth0({
      domain,
      client_id,
      redirect_uri: window.location.origin,
      audience: 'https://kwtr-auth.example.com',
      cacheLocation: 'localstorage'
    })
  )
  .use(store)
  .provide('$axios', axios)
  .use(vuetify)
  .mount('#app')
// app.config.globalProperties.$axios = axios

// new Vuetify({
//   icons: {
//     iconfont: 'mdi' // default - only for display purposes
//   }
// })
