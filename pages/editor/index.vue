<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">

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
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control form-control-lg" placeholder="Article Title" minlength="1" v-model="article.title">
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="What's this article about?" minlength="1" v-model="article.description">
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" minlength="1" v-model="article.body"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" :disabled="submiting">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { submitArticle } from '@/api/articles'

export default {
  name: 'Editor',
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      error: {},
      submiting: false // 判断是否正在提交
    }
  },
  methods: {
    async submit () {
      this.submiting = true
      try {
        const { data } = await submitArticle(this.article)

        this.$router.push('/')
      } catch (err) {
        this.error = err.response.data.errors
      }
      this.submiting = false
    }
  },
  middleware: 'authenticated'
}
</script>

<style>

</style>
