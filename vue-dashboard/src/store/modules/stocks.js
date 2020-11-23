import Vue from "vue";
import dummyStockData from "../../assets/dummyStockData";
const API_KEY = "0I5LPFJMZJXT0EXF";

function apiUrl(ticker) {
  return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`;
}

const initStockData = {
  ticker: "",
  date: "",
  price: 0,
};

const state = {
  stocksWatching: ["FB", "IBM"],
  stockData: {
    FB: {
      ticker: "",
      date: "",
      price: 0,
    },
    IBM: {
      ticker: "",
      date: "",
      price: 0
    }
  },
  stockHistory: []
};

const mutations = {
  SET_STOCK_DATA(state, stock) {
    if (!state.stockData[stock.ticker]) {
      state.stockData[stock.ticker] = { ...initStockData };
    }
    state.stockData[stock.ticker].price = stock.price;
    state.stockData[stock.ticker].date = stock.date;
    state.stockData[stock.ticker].ticker = stock.ticker;
    Vue.set(state.stockData, stock.ticker, state.stockData[stock.ticker]);
  },
  SET_STOCK_HISTORY(state, stockHistory) {
    state.stockHistory = stockHistory;
  },
  ADD_STOCK_TO_LIST(state, ticker) {
    if (state.stocksWatching.includes(ticker)) {
      return;
    }
    state.stocksWatching.push(ticker);
    Vue.set(state.stockData, ticker, { ...initStockData, ticker });
  },
  REMOVE_STOCK_FROM_LIST(state, ticker) {
    if (!state.stocksWatching.includes(ticker)) {
      return;
    }
    state.stocksWatching.splice(state.stocksWatching.indexOf(ticker), 1);
  }
};

const actions = {
  async fetchStockData({ commit }, ticker) {
    try {
      const response = await fetch(apiUrl(ticker));
      let responseData = await response.json();
      if (responseData["Note"]) {
        responseData = dummyStockData;
      }
      const lastRefreshed = responseData["Meta Data"]["3. Last Refreshed"];
      const lastClosedPrice = parseFloat(
        responseData["Time Series (Daily)"][lastRefreshed]["4. close"]
      );
      const stock = {
        ticker,
        price: lastClosedPrice,
        date: lastRefreshed
      };
      commit("SET_STOCK_DATA", stock);
    } catch (e) {
      console.log(e);
    }
  },
  async fetchHistoryData({ commit }, ticker) {
    try {
      const response = await fetch(apiUrl(ticker));
      const responseData = await response.json();
      commit("SET_STOCK_HISTORY", responseData["Time Series (Daily)"]);
    } catch (e) {
      console.log(e);
    }
  },
  addStockToList({ commit }, ticker) {
    commit("ADD_STOCK_TO_LIST", ticker);
  },
  removeStockFromList({ commit }, ticker) {
    commit("REMOVE_STOCK_FROM_LIST", ticker);
  }
};

const getters = {
  stocks(state) {
    return state.stockData;
  },
  getStockByTicker(state) {
    return ticker => {
      return state.stockData[ticker];
    };
  },
  stocksWatching(state) {
    return state.stocksWatching;
  },
  stockHistory(state) {
    return state.stockHistory;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
