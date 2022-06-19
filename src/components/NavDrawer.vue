<script>
import { useAuth0 } from '@auth0/auth0-vue'
// import { watch } from 'vue'
export default {
  name: 'NavDrawer',
  setup() {
    const auth0 = useAuth0()
    const login = () => {
      auth0.loginWithRedirect()
    }
    const logout = () =>
      auth0.logout({
        returnTo: window.location.origin
      })
    return {
      isAuthenticated: auth0.isAuthenticated,
      isLoading: auth0.isLoading,
      user: auth0.user,
      login,
      logout
    }
  }
}
</script>
<template>
  <v-card class="mx-auto">
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-container v-if="isAuthenticated">
            <v-list-item-title>
              {{ user.nickname }}
            </v-list-item-title>
            <v-list-item-subtitle> {{ user.email }} </v-list-item-subtitle>
          </v-container>
        </v-list-item-content>
      </v-list-item>
      <v-container>
        <v-list>
          <v-list-item>
            <router-link to="/">Home</router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/tweets">Tweets</router-link>
          </v-list-item>
        </v-list>
        <v-list v-if="isAuthenticated">
          <v-list-item>
            <router-link to="/profile">Profile</router-link>
          </v-list-item>
        </v-list>
      </v-container>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-container v-if="isAuthenticated">
            <v-btn @click="logout">Logout</v-btn>
          </v-container>
          <v-container v-if="!isAuthenticated && !isLoading">
            <v-btn @click="login">Log in</v-btn>
          </v-container>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </v-card>
</template>
<style></style>
