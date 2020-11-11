import Vue from "vue";
const API_KEY = "IXCPLS60VADF35UA";

function apiUrl(ticker) {
  return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`;
}

const initStockData = {
  ticker: "",
  date: "",
  price: 0,
  stockHistory: []
};

const state = {
  stocksWatching: ["FB", "IBM"],
  stockData: {
    FB: {
      ticker: "",
      date: "",
      price: 0,
      stockHistory: []
    },
    IBM: {
      ticker: "",
      date: "",
      price: 0,
      stockHistory: []
    }
  }
};

const mutations = {
  SET_STOCK_DATA(state, stock) {
    if (!state.stockData[stock.ticker]) {
      state.stockData[stock.ticker] = { ...initStockData };
    }
    state.stockData[stock.ticker].price = stock.price;
    state.stockData[stock.ticker].date = stock.date;
    state.stockData[stock.ticker].ticker = stock.ticker;
    state.stockData[stock.ticker].stockHistory.push({
      date: new Date(),
      price: stock.price
    });
    Vue.set(state.stockData, stock.ticker, state.stockData[stock.ticker]);
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
      const responseData = await response.json();
      const lastRefreshed = responseData["Meta Data"]["3. Last Refreshed"];
      const lastClosedPrice = parseFloat(
        responseData["Time Series (Daily)"][lastRefreshed]["4. close"]
      );
      const stock = {
        ticker: responseData["Meta Data"]["2. Symbol"],
        price: lastClosedPrice,
        date: lastRefreshed
      };
      commit("SET_STOCK_DATA", stock);
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
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
