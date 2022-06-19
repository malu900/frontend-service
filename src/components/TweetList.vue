<script>
import CreateTweet from './CreateTweet.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { mgmt_api } from '../constants/constants'
// import { reactive } from '@vue/reactivity'

export default {
  namme: 'TweetList',
  components: {
    CreateTweet
  },
  inject: ['$axios'],
  data: () => ({
    tweets: [],
    auth0: undefined,
    isAuthenticated: false
  }),
  async created() {
    this.fetchTweets()
    this.auth0 = useAuth0()
    this.isAuthenticated = this.auth0.isAuthenticated
  },
  // watch: {
  //   tweets() {
  //     this.tweets.forEach((tweet) => {
  //       tweet.user = {}
  //       const baseURI = 'https://dev-3z8rggnx.eu.auth0.com/api/v2/users'
  //       let config = {
  //         headers: {
  //           authorization: 'Bearer ' + mgmt_api
  //         }
  //       }
  //       const user = this.$axios.get(`${baseURI}/${tweet.userId}`, config)

  //       console.log(user)
  //     })
  //   }
  // },

  methods: {
    fetchTweets() {
      const baseURI = 'http://localhost:9080/api/v1/post'
      this.$axios.get(baseURI).then((result) => {
        const { data } = result
        // const tweets = []
        if (data) {
          result.data.forEach((tweet) => {
            this.getUsers(tweet.userId).then((res) => {
              tweet.user = {}
              Object.assign(tweet.user, res)
            })
          })

          this.tweets = result.data
        }
      })
    },

    async getUsers(userId) {
      const baseURI = 'https://dev-3z8rggnx.eu.auth0.com/api/v2/users'
      let config = {
        headers: {
          authorization: 'Bearer ' + mgmt_api
        }
      }
      const res = await this.$axios
        .get(`${baseURI}/${userId}`, config)
        .then((res) => {
          return res
        })
      return res.data
    },
    updateList(e) {
      this.tweets.push(e)
    },
    sentiment(msg) {
      switch (msg) {
        case 'LABEL_0':
          return 'mdi-emoticon-sad-outline'
        case 'LABEL_1':
          return 'mdi-emoticon-neutral-outline'
        case 'LABEL_2':
          return 'mdi-emoticon-happy-outline'
      }
    }
  }
}
</script>
<template>
  <v-row fluid>
    <v-col cols="12" v-if="auth0.isAuthenticated && tweets">
      <create-tweet @updateList="updateList"> </create-tweet>
    </v-col>
    <v-col cols="12" md="12" v-for="(tweet, index) in tweets" :key="index">
      <v-card elevation="2">
        {{ tweet.message }}
        <v-icon
          v-if="tweet.sentiment !== null || tweet.sentiment !== 'undefined'"
        >
          {{ sentiment(tweet.sentiment) }}
          {{ tweet.user }}
        </v-icon>
        <v-icon v-if="tweet.sentiment === null">
          mdi-emoticon-neutral-outline
        </v-icon>
      </v-card>
    </v-col>
  </v-row>
</template>
<style></style>
