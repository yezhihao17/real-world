<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <author-mate :article="article" />

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
          <!-- <p>
          Web development technologies have evolved at an incredible clip over the past few years.
          </p>
          <h2 id="introducing-ionic">Introducing RealWorld.</h2>
          <p>It's a great solution for learning how other frameworks work.</p> -->
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <author-mate :article="article" />
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <article-comments
            :author="article.author"
            :comments="comments"
            @postComment="postComment"
            @deleteComment="deleteComment"
          />
          
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import {
  fetchArticleDetail,
  fetchArticleComments,
  submitArticleComment,
  deleteArticleComment
} from '@/api/articles'
import AuthorMate from './components/author-mate'
import ArticleComments from './components/article-comments'
import MarkdownIt from 'markdown-it'
import { mapState } from 'vuex'

export default {
  name: 'Article',
  head () {
    return {
      title: `${this.article.title} - Realworld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  },
  async asyncData ({ params, store }) {
    const { user } = store.state
    // 获取文章数据
    const { data } = await fetchArticleDetail(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)

    // 获取评论数据
    const commentsData = await fetchArticleComments(params.slug)
    let { comments } = commentsData.data
    comments = comments.map(comment => {
      // 设置是否可以删除评论
      if (user && comment.author.username === user.username) {
        comment.deletable = true
      } else {
        comment.deletable = false
      }
      return comment
    })

    return {
      article,
      comments
    }
  },
  components: {
    AuthorMate,
    ArticleComments
  },
  methods: {
    // 发布评论
    async postComment (params) {
      const { data } = await submitArticleComment(this.article.slug, params)
      const { comment } = data
      this.comments.unshift(comment)
    },

    // 删除评论
    async deleteComment ({ id }) {
      const index = this.comments.findIndex(comment => comment.id === id)
      const { data } = await deleteArticleComment(this.article.slug, id)
      this.comments.splice(index, 1)
    }
  }
}
</script>

<style>

</style>
