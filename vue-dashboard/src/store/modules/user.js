const state = {
    isLoggedIn: false,
    userData: {}
};

const mutations = {
  ADD_USER(state, userData) {
    state.userData = userData;
  },
  REMOVE_USER(state) {
    state.userData = {};
  }
};

const actions = {
  login({ commit }, user) {
    // TODO
    commit('ADD_USER', user);
  },
  logout({ commit }) {
    commit('REMOVE_USER');
  }
};

const getters = {
  userData(state) {
    return state.userData;
  },
  isLoggedIn(state) {
      return state.isLoggedIn
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
