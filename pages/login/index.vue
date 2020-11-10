<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign up' : 'Sign in' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template
              v-for="(messages, field) in error"
            >
              <li
                v-for="message in messages"
                :key="message"
              >{{ field }} {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="submit">
            <fieldset class="form-group" v-if="!isLogin">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      error: {}
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async submit () {
      try {
        const loginIn = this.isLogin
          ? login
          : register
        const { data } = await loginIn({
          user: this.user
        })

        // 设置 store
        this.$store.commit('setUser', data.user)

        // 设置 cookie
        Cookie.set('user', data.user)

        // 跳转首页
        this.$router.push('/')
      } catch (err) {
        this.error = err.response.data.errors
      }
    }
  },
  middleware: 'notAuthenticated'
}
</script>

<style>

</style>
