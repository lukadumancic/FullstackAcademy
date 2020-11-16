
<template>
    <BasicCard 
        v-if="cityWeather"
        :cardType=" 'Weather' "
        :subtitle="cityWeather.type"
        :description="cityWeather.description"
        :title="cityWeather.temperature + '°C'"
        :icon="cityWeather.icon"
    />
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BasicCard from './BasicCard';

export default {
    name: 'WeatherCard',
    props: ['cityId'],
    created() {
        this.fetchWeatherData(this.cityId);
    },
    watch: {
        cityWeather(val) {
            console.log(val);
        }
    },
    computed: {
        ...mapGetters(['getWeatherByCityId']),
        cityWeather() {
            return this.getWeatherByCityId(this.cityId);
        }
    },
    methods: {
        ...mapActions(['fetchWeatherData']),
    },
    components: {
        BasicCard
    }
}
</script>