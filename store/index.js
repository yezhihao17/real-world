const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  // 设置用户信息
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let user = null

    // 判断请求头上是否有 cookie
    if (req.headers.cookie) {
      let cookies = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(cookies.user)
      } catch (e) {
        // 没有 user 的 cookie
      }
    }

    commit('setUser', user)
  }
}
