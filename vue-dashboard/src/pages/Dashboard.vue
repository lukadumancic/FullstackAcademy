<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-xl-3">
        <stats-card>
          <div
            class="icon-big text-center"
            :class="`icon-warning`"
            slot="header"
          >
            <img v-if="weather.icon" :src="weather.icon" />
          </div>
          <div class="numbers" slot="content">
            <p>{{ weather.type }}</p>
            {{ weather.temperature }}°C
          </div>
          <div class="stats" slot="footer">
            <i class="ti-reload"></i> {{ weather.description }}
          </div>
        </stats-card>
      </div>
      <div class="col-md-6 col-xl-3">
        <stats-card>
          <div
            class="icon-big text-center"
            :class="`icon-warning`"
            slot="header"
          >
            <img v-if="weather.icon" :src="weather.icon" />
          </div>
          <div class="numbers" slot="content">
            <p>{{ weather.type }}</p>
            {{ weather.temperature }}°C
          </div>
          <div class="stats" slot="footer">
            <i class="ti-reload"></i> {{ weather.description }}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">
      <div class="col-12">
        <chart-card
          :key="weather.temperatureHistory.length"
          :title="'Users behavior'"
          sub-title="24 Hours performance"
          :chart-data="weatherData"
          :chart-options="weatherDataOptions"
        >
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card
          title="Email Statistics"
          sub-title="Last campaign performance"
          :chart-data="preferencesChart.data"
          chart-type="Pie"
        >
          <span slot="footer">
            <i class="ti-timer"></i> Campaign set 2 days ago</span
          >
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Bounce
            <i class="fa fa-circle text-warning"></i> Unsubscribe
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card
          title="2015 Sales"
          sub-title="All products including Taxes"
          :chart-data="activityChart.data"
          :chart-options="activityChart.options"
        >
          <span slot="footer">
            <i class="ti-check"></i> Data information certified
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Tesla Model S
            <i class="fa fa-circle text-warning"></i> BMW 5 Series
          </div>
        </chart-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { StatsCard, ChartCard } from "@/components";
import Chartist from "chartist";
import moment from 'moment';

export default {
  components: {
    StatsCard,
    ChartCard
  },
  created() {
    this.fetchWeatherData();
    this.weatherDataOptions = {
      low: -30,
      high: 50,
      showArea: false,
      height: "245px",
      axisX: {
        showGrid: false
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: true,
      showPoint: false
    };
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      activityChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      preferencesChart: {
        data: {
          labels: ["62%", "32%", "6%"],
          series: [62, 32, 6]
        },
        options: {}
      }
    };
  },
  computed: {
    ...mapGetters(["funds", "weather"]),
    weatherData() {
      return {
        labels: [
          this.weather.temperatureHistory.map(temp => moment(temp.date).format('hh:mm a'))
        ],
        series: [this.weather.temperatureHistory.map(temp => temp.temperature)]
      };
    }
  },
  methods: {
    ...mapActions(["addFunds", "fetchWeatherData"])
  }
};
</script>
<style></style>
