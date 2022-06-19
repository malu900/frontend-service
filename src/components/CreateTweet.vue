<template>
  <v-card class="mx-auto" fluid elevation="4" style="width: 100%">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="message"
              :rules="messageRules"
              :counter="10"
              label="Message"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="warning" @click="save"> Reset Validation </v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue'

export default {
  name: 'CreateTweet',
  inject: ['$axios'],
  props: {
    updateList: {
      type: Function,
      default: () => console.warn('method not assigned.')
    }
  },
  data: () => ({
    message: '',
    valid: true,
    auth0: undefined,
    messageRules: [
      (v) => !!v || 'Message is required',
      (v) =>
        (v && v.length >= 10) || 'Message  must be greater than 10 characters',
      (v) =>
        (v && v.length <= 160) || 'Message  must be less than 160 characters'
    ]
  }),

  created() {
    // const auth0 = useAuth0()
    this.auth0 = useAuth0()
    // console.log(this.auth0.user)
  },
  // watch: {
  //   tweet() {
  //     console.log(this.tweet)
  //   }
  // },
  methods: {
    validate() {
      this.$refs.form.validate()
      console.log(this.valid)
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async save() {
      const token = await this.auth0.getAccessTokenSilently()
      // const userId
      let config = {
        headers: {
          authorization: 'Bearer ' + token
        }
      }
      if (this.valid) {
        const baseURI = 'http://localhost:9080/api/v1/post'
        this.$axios
          .post(
            baseURI,
            {
              message: this.message,
              userId: this.auth0.user.sub,
              emailAdress: this.auth0.user.email
            },
            config
          )
          .then((res) => {
            this.$emit('updateList', res.data)
          })
      } else {
        console.log('not', this.validate())
      }
      this.resetValidation()
      this.reset()
    },
    async fetchUsers() {
      const baseURI = 'http://localhost:9080/api/v1/post'
      this.$axios.get(baseURI, { message: this.message }).then((result) => {
        const { data } = result
        if (data) this.tweets = data
      })
    }
  }
}
</script>

<style></style>
