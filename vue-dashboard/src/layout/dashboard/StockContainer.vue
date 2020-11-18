<template>
  <div>
    <div class="row">
      <StockCard v-for="ticker in stocksWatching" :ticker="ticker" />
    </div>
    <div class="row">
      <div class="col-12">
        <ChartCard
          :key="stocks.FB.stockHistory.date.length"
          :title="'Stocks'"
          sub-title="Last Market Price"
          :chart-data="graphData.data"
          :chart-options="graphData.options"
        >
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Stock 1
            <i class="fa fa-circle text-danger"></i> Stock 2
            <i class="fa fa-circle text-warning"></i> Stock 3
          </div>
        </ChartCard>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import ChartCard from '@/components/Cards/ChartCard';
import StockCard from '@/components/custom/StockCard';
export default {
  name: "StockContainer",
  computed: {
      ...mapGetters(['stocks', 'stocksWatching']),
      graphData() {
      return {
        data: {
          labels: this.stocks.FB.stockHistory.price,
          series: [
            this.stocks.FB.stockHistory.date
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      }
    }
  },
  components: {
      StockCard,
      ChartCard
  }
};
</script>
