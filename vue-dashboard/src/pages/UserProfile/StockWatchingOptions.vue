<template>
  <card class="card" title="Stocks watching">
    <div>
      <ul class="list-unstyled team-members">
        <li>
          <fg-input
            type="text"
            label="Stock"
            placeholder="Add new stock"
            v-model="newStockTicker"
            @submit="submit"
          />
          <div class="row" v-for="ticker in stocksWatching" :key="ticker">
            <div class="col-3">
              <span class="ti-wallet"></span>
            </div>
            <div class="col-6">
              {{ ticker }}
              <small>Test</small>
            </div>

            <div class="col-3">
              <p-button type="danger" outline icon @click.native="removeStockFromList(ticker)">
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
      newStockTicker: ""
    };
  },
  methods: {
    ...mapActions(["addStockToList", "removeStockFromList"]),
    submit() {
      this.addStockToList(this.newStockTicker);
      this.newStockTicker = "";
    }
  },
  computed: {
    ...mapGetters(["stocksWatching"])
  }
};
</script>
<style></style>
