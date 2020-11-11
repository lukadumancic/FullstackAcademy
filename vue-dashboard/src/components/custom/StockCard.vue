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

export default {
    name: 'StockCard',
    props: ['ticker'],
    created() {
        this.fetchStockData(this.ticker);
    },
    computed: {
        ...mapGetters(['getStockByTicker']),
        stockData() {
            return this.getStockByTicker(this.ticker);
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