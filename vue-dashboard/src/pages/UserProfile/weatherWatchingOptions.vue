<template>
  <card class="card" title="Weather watching">
    <div>
      <ul class="list-unstyled team-members">
        <li>
          <fg-input
            type="text"
            label="City Weather"
            placeholder="Add new city ID"
            v-model="newCityID"        
            @submit="submit"
          />
          <div class="row" v-for="cityID in cities" :key="cityID">
            <div class="col-3">
              <span class="ti-shine"></span>
            </div>
            <div class="col-6">
              {{ cityID }}
            </div>

            <div class="col-3">
              <p-button type="danger" outline icon @click.native="removeWeatherFromList(cityID)">
                <i class="fa fa-close"></i>
              </p-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      newCityID: ""
    };
  },
  methods: {
    ...mapActions(["addWeatherToList", "removeWeatherFromList"]),
    submit() {
        if ((this.newCityID.length !== 7)){
            return;
        }
      this.addWeatherToList(this.newCityID);
      this.newCityID = ""; 
    }
  },
  computed: {
    ...mapGetters(["cities"])
  }
};
</script>
<style></style>
