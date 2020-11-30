import apiService from "../../services/apiService";

const state = {
    token: '123',
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
  async login({ commit }, user) {
    const data = await apiService.fetch('http://localhost:3000/api/login', 'POST');
    const token = data.token;
    apiService.setToken(token);
    // commit('ADD_USER', user);
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
      return state.token !== null
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
