import { request } from '@/plugins/request'

// 获取 tags 列表
export const fetchTags = params => {
  return request({
    method: 'GET',
    url: '/api/tags',
    params
  })
}
