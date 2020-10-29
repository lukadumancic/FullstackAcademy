<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
    <p>{{ username }}</p>
    <button @click="getCommentsData">See all comments</button>
    <p v-for="(comment, index) in comments" :key="index">
      {{ comment.comment }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: ["id", "content", "title", "username"],
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    async getCommentsData() {
      const commentsResponse = await fetch(
        "https://fullstack-academy-api.lukadumancic49.vercel.app/comments/" +
          this.id +
          ".json"
      );
      const commentsResponseData = await commentsResponse.json();
      this.comments = commentsResponseData;
      this.$emit('commentsRequested', commentsResponseData);
    },
  },
};
</script>

<style scoped>
.container {
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
}
</style>
