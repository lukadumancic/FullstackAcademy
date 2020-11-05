const API_URL = "https://api.openweathermap.org";
const API_KEY = "c7c7e873b79cc2d2a756f17fb00849ab";

const initWeatherData = {
  temperature: 0,
  description: "",
  type: "",
  icon: "",
  temperatureHistory: []
};

const state = {
  cityIds: [5132143, 3186886],
  weatherData: {}
};

const mutations = {
  SET_WEATHER_DATA(state, { weather, cityId }) {
    if (!state.weatherData[cityId]) {
      state.weatherData[cityId] = { ...initWeatherData };
    }
    state.weatherData[cityId].temperature = weather.temperature;
    state.weatherData[cityId].temperatureHistory.push({
      date: new Date(),
      temperature: weather.temperature
    });
    state.weatherData[cityId].description = weather.description;
    state.weatherData[cityId].type = weather.type;
    state.weatherData[cityId].icon = weather.icon;
  }
};

const actions = {
  async fetchWeatherData({ commit }, cityId) {
    try {
      const response = await fetch(
        `${API_URL}/data/2.5/weather?id=${cityId}&appid=${API_KEY}`
      );
      const responseData = await response.json();
      const weatherData = {
        temperature: Math.round(responseData.main.temp - 273.15),
        description: responseData.weather[0].description,
        type: responseData.weather[0].main,
        icon: `${API_URL}/img/w/${responseData.weather[0].icon}.png`
      };
      commit("SET_WEATHER_DATA", { cityId, weather: weatherData });
    } catch (e) {}
  }
};

const getters = {
  weather(state) {
    return state.weatherData;
  },
  cities(state) {
    return state.cityIds;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
