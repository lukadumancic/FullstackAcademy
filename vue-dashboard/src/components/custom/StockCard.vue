<template>
    <BasicCard 
        :cardType=" 'Stocks' "
        :subtitle="stockData.ticker"
        :description="stockData.date"
        :title="'$' + stockData.price"
        :icon="''"
    />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BasicCard from './BasicCard';

const initStockData = {
  ticker: "",
  date: "",
  price: 0,
  stockHistory: []
};

export default {
    name: 'StockCard',
    props: ['ticker'],
    created() {
        this.fetchStockData(this.ticker);
    },
    computed: {
        ...mapGetters(['stocks']),
        stockData() {
            if (!this.stocks || !this.stocks[this.ticker]) {           // if API pull in stocks.js doesn't work, intiailize the stock data
                return initStockData;
            }
            return this.stocks[this.ticker];
        }
    },
    methods: {
        ...mapActions(['fetchStockData']),
    },
    components: {
        BasicCard
    }
}
</script>