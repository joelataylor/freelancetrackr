import auth from '@/auth'

const state = {
  user: null,
  business: null
}

const getters = {
  user: state => state.user,
  isLoggedIn: state => state.user !== null,
  business: state => state.business
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  setBusiness: (state, business) => {
    state.business = business
  },
  logUserOut: state => {
    auth.logout()
    state.user = null
    state.business = null
  }
}

const actions = {
  setCurrentUser: ({ commit }, user) => {
    commit('setUser', user)
  },
  setCurrentBusiness: ({ commit }, business) => {
    commit('setBusiness', business)
  },
  logUserOut: ({ commit }) => {
    commit('logUserOut')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
