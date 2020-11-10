export default {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除原本得路由设置
      routes.splice(0)

      // 重新设置
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            {
              path: '',
              name: 'home',
              component: resolve(__dirname, 'pages/home')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile')
            }
          ]
        }
      ])
    }
  },

  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}
