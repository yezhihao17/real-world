import { request } from '@/plugins/request'

// 全部文章列表
export const fetchArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 喜欢文章列表
export const fetchFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 点赞文章
export const fetchArticleFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 删除文章点赞
export const deleteArticleFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const fetchArticleDetail = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const fetchArticleComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 删除文章评论
export const deleteArticleComment = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}

// 发布文章评论
export const submitArticleComment = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}

// 发布新文章
export const submitArticle = data => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}
