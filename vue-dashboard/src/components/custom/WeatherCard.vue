
<template>
    <BasicCard 
        :cardType=" 'Weather' "
        :subtitle="cityWeather.type"
        :description="cityWeather.description"
        :title="cityWeather.temperature + '°C'"
        :icon="cityWeather.icon"
    />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BasicCard from './BasicCard';

const initWeatherData = {
  temperature: 0,
  description: "",
  type: "",
  icon: "",
  temperatureHistory: []
};

export default {
    name: 'WeatherCard',
    props: ['cityId'],
    created() {
        this.fetchWeatherData(this.cityId);
    },
    computed: {
        ...mapGetters(['weather']),
        cityWeather() {
            if (!this.weather[this.cityId]) {
                return initWeatherData;
            }
            return this.weather[this.cityId];
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