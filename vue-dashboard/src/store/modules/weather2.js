const API_URL = 'https://api.openweathermap.org';
const API_KEY = 'c7c7e873b79cc2d2a756f17fb00849ab';
const CITY_ID = 3186886;

const state = {
    temperature: 0,
    description: '',
    type: '',
    icon: '',
    temperatureHistory: []
};

const mutations = {
  SET_TEMPERATURE2(state, temperature) {
    state.temperature = temperature;
    state.temperatureHistory.push({
        date: new Date(),
        temperature
    })
  },
  SET_DESCRIPTION2(state, description) {
    state.description = description;
  },
  SET_TYPE2(state, type) {
    state.type = type;
  },
  SET_ICON2(state, icon) {
    state.icon = icon;
  },
};

const actions = {
  async fetchWeatherData2({ commit }) {
      const response = await fetch(`${API_URL}/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}`);
      const responseData = await response.json();
      commit('SET_TEMPERATURE2', Math.round(responseData.main.temp - 273.15));
      commit('SET_DESCRIPTION2', responseData.weather[0].description);
      commit('SET_TYPE2', responseData.weather[0].main);
      commit('SET_ICON2', `${API_URL}/img/w/${responseData.weather[0].icon}.png`);
  }
};

const getters = {
  weather2(state) {
    return state;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
