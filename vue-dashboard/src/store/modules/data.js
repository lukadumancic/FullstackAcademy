const state = {
  funds: 10000,
};

const mutations = {
  ADD_FUNDS(state, funds) {
    state.funds += funds;
  },
};

const actions = {
  addFunds({ commit }, funds) {
    commit('ADD_FUNDS', funds);
  }
};

const getters = {
  funds(state) {
    return state.funds;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
