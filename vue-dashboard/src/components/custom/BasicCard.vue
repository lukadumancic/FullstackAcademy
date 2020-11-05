<template>
  <div class="col-md-6 col-xl-3">
    <StatsCard>
      <div class="icon-big text-center" :class="`icon-warning`" slot="header">
        <img v-if="icon" :src="icon" />
      </div>
      <div class="numbers" slot="content">
        <p>{{ subtitle }}</p>
        {{ title }}
      </div>
      <div class="stats" slot="footer">
        <i class="ti-reload"></i> {{ description }}
      </div>
    </StatsCard>
  </div>
</template>

<script>
import { StatsCard } from "@/components";

export default {
  name: "BasicCard",
  props: ['subtitle', 'title', 'description', 'icon'],
  components: {
      StatsCard
  }
};
</script>
