<template>
    <BasicCard 
        :subtitle="callStockJavaScript.ticker"
        :description="callStockJavaScript.date"
        :title="callStockJavaScript.price"
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
    created() {
        this.fetchStockData();
    },
    computed: {
        ...mapGetters(['stocks']),
        callStockJavaScript() {
            if (!this.stocks) {           // if API pull in stocks.js doesn't work, intiailize the stock data
                return initStockData;
            }
            return this.stocks;
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