<template>
  <div>
    <div class="row">
      <WeatherCard v-for="cityId in cities" :cityId="cityId" />
    </div>
    <div class="row">
      <div class="col-12">
        <ChartCard
          :key="weatherForecast.length"
          :title="'Temperature (°C)'"
          sub-title="24 Hours performance"
          :chart-data="graphData.data"
          :chart-options="graphData.options"
        >
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> City 1
            <i class="fa fa-circle text-danger"></i> City 2
            <i class="fa fa-circle text-warning"></i> City 3
          </div>
        </ChartCard>
      </div>
    </div>
  </div>
</template>

<script>
import { ChartCard } from "@/components";
import { mapGetters, mapActions } from "vuex";
import WeatherCard from "@/components/custom/WeatherCard";
export default {
  name: "WeatherContainer",
  created() {
    this.fetchForecast();
  },
  computed: {
    ...mapGetters(["weather", "cities", "weatherForecast"]),
    graphData() {
      return {
        data: {
          labels: this.weatherForecast.map((hourlyData) => hourlyData.date.getHours()).filter((value, index) => { return index < 24 }),
          series: [
            this.weatherForecast.map((hourlyData) => hourlyData.temperature).filter((value, index) => { return index < 24 })
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
  methods: {
    ...mapActions(["fetchForecast"])
  },
  components: {
    WeatherCard,
    ChartCard
  }
};
</script>
