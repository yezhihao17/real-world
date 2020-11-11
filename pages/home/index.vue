<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
        <p>This is yzh project.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'Your_Feed'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'Your_Feed'
                    }
                  }"
                  exact
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'Global_Feed' && !tag
                  }"
                  :to="{
                    name: 'home'
                  }"
                  exact
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tag
                  }"
                  :to="{
                    name: 'home'
                  }"
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('ddd MMM DD YYYY') }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited
                }"
                @click="taggle(article)"
                :disabled="!article.favoritable"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
            >
              <h1 v-html="article.title"></h1>
              <p v-html="article.description"></p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="aTag in article.tagList"
                  :key="aTag"
                >{{ aTag }}</li>
              </ul>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab
                    }
                  }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="item in tags"
                :key="item"
                class="tag-pill"
                :class="{
                  'tag-default': tag !== item
                }"
                :to="{
                  name: 'home',
                  query: {
                    tag: item
                  }
                }"
              >
                {{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fetchArticles,
  fetchFeedArticles,
  fetchArticleFavorite,
  deleteArticleFavorite
} from '@/api/articles'
import { fetchTags } from '@/api/tags'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  async asyncData({ query }) {
    const tag = query.tag
    const tab = query.tab || 'Global_Feed'
    const page = Number.parseInt(query.page || 1)
    const limit = 20

    const loadData = tab === 'Global_Feed'
      ? fetchArticles
      : fetchFeedArticles

    const [articlesData, tagsData] = await Promise.all([
      loadData({
        tag,
        limit,
        offset: (page - 1) * limit
      }),
      fetchTags()
    ])

    let { articlesCount, articles } = articlesData.data
    const { tags } = tagsData.data
    const totalPage = Math.ceil(articlesCount / limit)
    articles = articles.map(article => {
      article.favoritable = true
      return article
    })

    return {
      articles,
      tag,
      tab,
      limit,
      page,
      totalPage,
      tags
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 点赞或者取消点赞
    async taggle (article) {
      article.favoritable = false
      if (article.favorited) {
        await deleteArticleFavorite(article.slug)
        article.favorited = false
        article.favoritesCount--
      } else {
        await fetchArticleFavorite(article.slug)
        article.favorited = true
        article.favoritesCount++
      }
      article.favoritable = true
    }
  }
}
</script>

<style></style>
