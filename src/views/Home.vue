<template>
    <div>
        <b-button v-if="!postsLoaded" variant="secondary" disabled>
            <b-spinner small type="grow"></b-spinner>
            Posts loading...
        </b-button>

        <b-card-group v-else-if="postsLoaded && posts.length > 0" deck>
            <b-card v-for="post in posts" :key="post.id" :title="post.title">
                <b-card-text>
                    {{ post.content }}
                </b-card-text>

                <div v-if="post.tags.length">
                    <b-link  v-for="tag in post.tags" :key="tag.id" :href="'/tag/'+tag.slug" class="card-link">{{ tag.title }}</b-link>
                </div>

                <template v-slot:footer>
                    <small class="text-muted">Last updated: {{ post.updated.date }}</small>
                </template>
            </b-card>
        </b-card-group>

        <b-alert v-else-if="postsLoaded && postError.length > 0" show variant="danger">{{ postError }}</b-alert>

        <h1 v-else>Oh no, there is no posts yet ... 😢</h1>
    </div>
</template>

<script>
// @ is an alias to /src
import PostsMixin from '@/mixins/crud/Posts.mixin'
import { BCard  } from 'bootstrap-vue'

export default {
  name: 'Home',
  mixins: [PostsMixin],
  components: {
    BCard
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