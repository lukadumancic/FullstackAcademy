<template>
  <div class="row">
    <StockCard v-for="ticker in stocksWatching" :ticker="ticker" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StockCard from '@/components/custom/StockCard';
export default {
  name: "StockContainer",
  computed: {
      ...mapGetters(['stocks', 'stocksWatching'])
  },
  components: {
      StockCard
  }
};
</script>
