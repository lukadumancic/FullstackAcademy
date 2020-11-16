<template>
  <div>
    <div class="row justify-content-center" style="margin-top: 120px">
      <form class="col-md-6">
        <Card>
          <div class="form-group">
            <label>Username</label>
            <input
              type="email"
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="Username"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </Card>
      </form>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Cards/Card";
export default {
  name: "Login",
  components: {
    Card
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #ededed;
}
</style>
