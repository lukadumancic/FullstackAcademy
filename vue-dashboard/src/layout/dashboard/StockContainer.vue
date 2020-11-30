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
          <span slot="footer"> <i class="ti-reload"></i> Updated now </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Stock 1
            <i class="fa fa-circle text-danger"></i> Stock 2
            <i class="fa fa-circle text-warning"></i> Stock 3
          </div>
        </ChartCard>
      </div>
    </div>
    <!--PIE CHART 1-->
    <div class="row">
      <div class="col-md-6 col-12">
        <ChartCard
          v-if="pieData"
          :title="'Stock Porfolio'"
          :sub-title="'Todays porfolio value'"
          :chart-data="pieData.data"
          chart-type="Pie"
        >
          <span slot="footer"> <i class="ti-timer"></i> Updated now</span>
          <div slot="legend">
            <span v-for="(label, index) in pieData.data.labels">
              <i :class="'fa fa-circle ' + legendClasses[index]"></i>
              <span>{{ label }}</span>
            </span>
          </div>
        </ChartCard>
      </div>
      <!--PIE CHART 2-->
      <div class="col-md-6 col-12">
        <ChartCard
          v-if="pieData"
          :title="'Stock Watching - 30 Days Prior'"
          :sub-title="'Stock prices 30 days prior'"
          :chart-data="pieData.dataPrior"
          chart-type="Pie"
        >
          <span slot="footer"> <i class="ti-timer"></i> Updated now</span>
          <div slot="legend">
            <span v-for="(label, index) in pieData.dataPrior.labels">
              <i :class="'fa fa-circle ' + legendClasses[index]"></i>
              <span>{{ label }}</span>
            </span>
          </div>
        </ChartCard>
      </div>
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
    this.legendClasses = [
      "text-info",
      "text-warning",
      "text-danger",
      "text-success"
    ];
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
            labels.map(label => parseFloat(this.stockHistory[label]["3. low"])),
            labels.map(label => parseFloat(this.stockHistory[label]["2. high"]))
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
      if (
        this.stocksWatching.filter(ticker => this.stocks[ticker].price > 0)
          .length !== this.stocksWatching.length
      ) {
        return null;
      }

      return {
        data: {
          labels: this.stocksWatching,
          series: this.stocksWatching.map(ticker => this.stocks[ticker].price)
        },
        dataPrior: {
          labels: this.stocksWatching,
          series: this.stocksWatching.map(
            ticker => this.stocks[ticker].price30daysAgo
          )
        },
        options: {}
      };
    }
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
