<template>
  <div class="row">
    <WeatherCard v-for="cityId in cities" :cityId="cityId" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WeatherCard from '@/components/custom/WeatherCard';
export default {
  name: "WeatherContainer",
  computed: {
      ...mapGetters(['cities'])
  },
  components: {
      WeatherCard
  }
};
</script>
