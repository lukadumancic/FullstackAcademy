<template>
  <div>
    <div class="row">
      <StockCard v-for="ticker in stocksWatching" :ticker="ticker" />
    </div>
     <!--LINE CHART-->
    <div class="row">
      <div class="col-12">
        <ChartCard
          v-if="graphData.data.labels.length"
          :title="'Stocks'"
          sub-title="Last Market Price"
          :chart-data="graphData.data"
          :chart-options="graphData.options"
        >
          <span slot="footer">
            <i class="ti-reload"></i> Updated now
          </span>
          <div slot="legend">    
            <i class="fa fa-circle text-info"></i> Stock 1
            <i class="fa fa-circle text-danger"></i> Stock 2
            <i class="fa fa-circle text-warning"></i> Stock 3
          </div>
        </ChartCard>
      </div>
    </div>
    <!--PIE CHART 1-->
    <div class="col-md-6 col-12">
      <ChartCard
        v-if="pieData.preferencesChart.data.labels.length"
        :title="'Stocks Watching'"
        :sub-title="'Todays stock prices'"
        :chart-data="pieData.preferencesChart.dataNow"
        chart-type="Pie"
      >
        <span slot="footer">
          <i class="ti-timer"></i> Updated now</span
        >
        <div slot="legend">
        </div>
      </ChartCard>
    </div>
    <!--PIE CHART 2-->
    <div class="col-md-6 col-12">
      <ChartCard
        v-if="pieData.preferencesChart.data.labels.length"
        :title="'Stock Watching - 30 Days Prior'"
        :sub-title="'Stock prices 30 days prior'"
        :chart-data="pieData.preferencesChart.dataPrior"
        chart-type="Pie"
      >
        <span slot="footer">
          <i class="ti-timer"></i> Updated now</span
        >
        <div slot="legend">
        </div>
      </ChartCard>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ChartCard from "@/components/Cards/ChartCard";
import StockCard from "@/components/custom/StockCard";
export default {
  name: "StockContainer",
  created() {
    this.fetchHistoryData("FB");
  },
  computed: {
    ...mapGetters(["stocks", "stocksWatching", "stockHistory"]),
    // LINE CHART DATA
    graphData() {
      const labels = Object.keys(this.stockHistory)
        .filter((value, index) => {
          return index < 30;
        })
        .reverse();
      return {
        data: {
          labels: labels.map(label => label.substring(8)),
          series: [
            labels.map(label =>
              parseFloat(this.stockHistory[label]["4. close"])
            ),
            labels.map(label =>
              parseFloat(this.stockHistory[label]["3. low"])
            ),
            labels.map(label =>
              parseFloat(this.stockHistory[label]["2. high"])
            )
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      };
    },
  // PIE CHART DATA
  pieData() {
    const priorMonth = Object.keys(this.stockHistory)
        .filter((value, index) => {
          return index == 30;
        });
    return {
      preferencesChart: {
        dataNow: {
          labels: this.stocksWatching,
          series: [this.stocks.FB.price, this.stocks.IBM.price ]
        },
        dataPrior: {
          labels: this.stocksWatching,
          series: [
            priorMonth.map(label =>
              parseFloat(this.stockHistory[label]["4. close"])
            ),
            priorMonth.map(label =>
              parseFloat(this.stockHistory[label]["4. close"])
            )
          ]
        },
        options: {}
      }
    };
  },
  },
  methods: {
    ...mapActions(["fetchHistoryData"])
  },
  components: {
    StockCard,
    ChartCard
  }
};
</script>
