const API_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=";
const API_KEY = "demo";

const initStockData = {
  ticker: "",
  date: "",
  price: 0,
  stockHistory: []
};

const state = {
    stockData: {}
};

const mutations = {
    SET_STOCK_DATA(state, { stocks }) {
      if (!state.stockData) {
        state.stockData[cityId] = { ...initStockData };
      }
      state.stockData.price = stocks.price;
      state.stockData.stockHistory.push({
        date: new Date(),
        price: stocks.price
      });
      state.stockData.date = stocks.date;
      state.stockData.ticker = stocks.ticker;
      //state.stockData.icon = stocks.icon;
    }
};  

const actions = {
  async fetchStockData({ commit }) {
    try {
      const response = await fetch(
        `${API_URL}${API_KEY}`
      );
      const responseData = await response.json();
      console.log(responseData);
      const stockData = {
        ticker: responseData.["Meta Data"]
        //date: responseData.weather[0].description,
        //price: responseData.weather[0].main,
      };
      commit("SET_STOCK_DATA", { stocks: stockData });
    } catch (e) {
        console.log('error pulling stock API in stocks.js')
    } 
  }
};




const getters = {
    stocks(state) {
      return state.stockData;
    }
  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  };