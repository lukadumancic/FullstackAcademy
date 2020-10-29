<template>
  <div>
    <h1>Post</h1>
    <span>Subtitle</span>
    <Post
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :content="post.content"
      :title="post.title"
      :username="getUsername(post.userId)"
      @commentsRequested="commentsRequested"
    />
    <div style="position: absolute; width: 100px; height: 80px; backgroundColor: black; top: 200px; left: 10px"></div>
  </div>
</template>

<script>
import Post from "./Post";

export default {
  name: "Posts",
  data() {
    return {
      posts: [],
      users: []
    };
  },
  async created() {
    await this.getPostsData();
    await this.getUsersData();
  },
  methods: {
    commentsRequested(value) {
      console.log(value)
    },
    async getPostsData() {
      const postsResponse = await fetch(
        "https://fullstack-academy-api.lukadumancic49.vercel.app/posts"
      );
      const postsResponseData = await postsResponse.json();
      this.posts = postsResponseData;
    },
    async getUsersData() {
      const usersResponse = await fetch(
        "https://fullstack-academy-api.lukadumancic49.vercel.app/users"
      );
      const usersResponseData = await usersResponse.json();
      this.users = usersResponseData;
    },
    getUsername(userId) {
      const user = this.users.find((user) => user.id === userId);
      if (user) {
        return user.username;
      }
      return '';
    }
  },
  components: {
    Post,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.subtitle1 {
  backgroundColor: blue;
}
.subtitle2 {
  backgroundColor: red;
}
</style>
