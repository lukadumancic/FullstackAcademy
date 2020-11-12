<template>
  <div>
    <WeatherContainer />
    <StockContainer />
    <!--Charts-->
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

      
    </div>
  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components";
import Chartist from "chartist";
import moment from 'moment';
import WeatherContainer from '@/layout/dashboard/WeatherContainer';
import StockContainer from '@/layout/dashboard/StockContainer';

export default {
  components: {
    StatsCard,
    ChartCard,
    WeatherContainer,
    StockContainer
  },
  created() {
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
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
  },
};
</script>
<style></style>
