<template>
  <div>
    <WeatherContainer />
    <StockContainer />
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
  computed: {
  },
};
</script>
<style></style>
