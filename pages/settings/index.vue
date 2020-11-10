<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="submit">
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" v-model="myUser.image">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="myUser.username">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="myUser.bio"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="myUser.email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="myUser.password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" :disabled="submiting">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'

export default {
  name: 'Settings',
  asyncData ({ store }) {
    const { user } = store.state
    let myUser = {
      username: '',
      image: '',
      bio: '',
      password: '',
      email: ''
    }
    for (let key in myUser) {
      myUser[key] = user[key]
    }

    return {
      myUser
    }
  },
  data () {
    return {
      submiting: false
    }
  },
  methods: {
    async submit () {
      this.submiting = true
      try {
        const { data } = await updateUserInfo({
          user: this.myUser
        })
        const { user } = data

        this.$store.commit('setUser', user)

        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
      this.submiting = false
    }
  },
  middleware: 'authenticated'
}
</script>

<style>

</style>
