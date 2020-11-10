import Vue from 'vue'
import dayjs from 'dayjs'

// 注册全局过略器
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
