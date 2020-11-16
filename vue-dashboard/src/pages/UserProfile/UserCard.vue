<template>
  <card class="card-user">
    <div slot="image">
      <img src="https://d2gg9evh47fn9z.cloudfront.net/thumb_COLOURBOX8327018.jpg" alt="...">
    </div>
    <div>
      <div class="author">
        <img class="avatar border-white" src="https://avatars1.githubusercontent.com/u/17359568?s=400&u=bd29c762b0770453a42979ac1beae71965c2ff95&v=4" alt="...">
        <h4 class="title">Luka Dumančić
          <br>
          <a href="#">
            <small>GIT:lukadumancic</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        "Luka is too good at coding!"
      </p>
    </div>
    <hr>
    <div class="text-center">
      <div class="row">
        <div v-for="(info, index) in details" :key="index" :class="getClasses(index)">
          <h5>{{info.title}}
            <br>
            <small>{{info.subTitle}}</small>
          </h5>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      details: [
        {
          title: "12",
          subTitle: "Files"
        },
        {
          title: "2GB",
          subTitle: "Used"
        },
        {
          title: "24,6$",
          subTitle: "Spent"
        }
      ]
    };
  },
  methods: {
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-lg-3 offset-lg-1";
      } else if (remainder === 2) {
        return "col-lg-4";
      } else {
        return "col-lg-3";
      }
    }
  }
};
</script>
<style>
</style>
