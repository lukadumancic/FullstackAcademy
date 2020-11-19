<template>
  <div>
    <div class="row">
      <StockCard v-for="ticker in stocksWatching" :ticker="ticker" />
    </div>
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
