import auth from "@/auth";

const state = {
  user: null,
  business: null
};

const getters = {
  user: state => state.user,
  isLoggedIn: state => state.user !== null,
  business: state => state.business
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },
  setBusiness: (state, business) => {
    state.business = business;
  }
};

const actions = {
  setCurrentUser: ({ commit }) => {
    commit("setUser", auth.user());
  },
  setCurrentBusiness: ({ commit }, business) => {
    commit("setBusiness", business);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
