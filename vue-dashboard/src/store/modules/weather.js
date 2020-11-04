const API_URL = 'https://api.openweathermap.org';
const API_KEY = 'c7c7e873b79cc2d2a756f17fb00849ab';
const CITY_ID = 5132143;

const state = {
    temperature: 0,
    description: '',
    type: '',
    icon: '',
    temperatureHistory: []
};

const mutations = {
  SET_TEMPERATURE(state, temperature) {
    state.temperature = temperature;
    state.temperatureHistory.push({
        date: new Date(),
        temperature
    })
  },
  SET_DESCRIPTION(state, description) {
    state.description = description;
  },
  SET_TYPE(state, type) {
    state.type = type;
  },
  SET_ICON(state, icon) {
    state.icon = icon;
  },
};

const actions = {
    async fetchWeatherData({ commit }) {
        const response = await fetch(`${API_URL}/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}`);
        const responseData = await response.json();
        commit('SET_TEMPERATURE', Math.round(responseData.main.temp - 273.15));
        commit('SET_DESCRIPTION', responseData.weather[0].description);
        commit('SET_TYPE', responseData.weather[0].main);
        commit('SET_ICON', `${API_URL}/img/w/${responseData.weather[0].icon}.png`);
    }
};

const getters = {
  weather(state) {
    return state;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
