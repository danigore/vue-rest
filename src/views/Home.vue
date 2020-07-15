<template>
    <div>
        <b-button v-if="!postsLoaded" variant="secondary" disabled>
            <b-spinner small type="grow"></b-spinner>
            Posts loading...
        </b-button>

        <b-card-group v-else-if="postsLoaded && posts.length > 0" columns>
            <post-skeleton v-for="post in posts" :key="post.id" :post="post"></post-skeleton>
        </b-card-group>

        <b-alert v-else-if="postsLoaded && postError.length > 0" show variant="danger">{{ postError }}</b-alert>

        <h1 v-else>Oh no, there is no posts yet ... 😢</h1>
    </div>
</template>

<script>
// @ is an alias to /src
import PostsMixin from '@/mixins/crud/Posts.mixin'
const PostSkeleton = () => import('@/components/post/Skeleton')

export default {
  name: 'Home',
  mixins: [PostsMixin],
  components: {
    PostSkeleton
  },
  created: function () {
      this.getAllPosts()
  },
}
</script>

<style>
    .btn-secondary {
        margin-top: 20px;
    }
</style>