<template>
  <div class="col-xs-12 col-md-8 offset-md-2">

    <form class="card comment-form" @submit.prevent="postComment">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" maxlength="200" v-model="commentContent"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" :disabled="posting">
        Post Comment
        </button>
      </div>
    </form>
    
    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.updatedAt | date('ddd MMM DD YYYY') }}</span>
        <button
          class="btn btn-sm btn-outline-secondary"
          @click="deleteComment(comment.id)"
          v-if="comment.deletable"
        >
          删除
        </button>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ArticleComments',
  data () {
    return {
      commentContent: '', // 评论内容
      posting: false // 判断是否可以发送评论
    }
  },
  props: {
    author: {
      type: Object,
      default: {}
    },
    comments: {
      type: Array,
      default: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 发布评论
    async postComment () {
      const comment = {
        comment: {
          body: this.commentContent
        }
      }
      this.$emit('postComment', comment)
    },
    // 删除评论
    async deleteComment (id) {
      this.$emit('deleteComment', { id })
    }
  }
}
</script>

<style>

</style>
