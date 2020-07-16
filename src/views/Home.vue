<template>
    <div>
        <b-button block variant="primary" @click="$bvModal.show('bv-modal')">Add new post</b-button>

        <b-modal id="bv-modal" ref="my-modal" hide-footer>
            <post-form :form="postForm" :onSubmitCallback="savePostAndHideModal" :onResetCallback="resetPostForm"></post-form>
            <b-button class="mt-3" block @click="$bvModal.hide('bv-modal')">Close Me</b-button>
        </b-modal>

        <b-button v-if="!postsLoaded" variant="secondary" disabled>
            <b-spinner small type="grow"></b-spinner>
            Posts loading...
        </b-button>

        <b-card-group v-else-if="postsLoaded && posts.length > 0" columns>
            <post-skeleton v-for="post in posts" :key="post.id" :post="post" :onEditCallback="postEditCallback"></post-skeleton>
        </b-card-group>

        <b-alert v-else-if="postsLoaded && postError.length > 0" show variant="danger">{{ postError }}</b-alert>

        <h1 v-else>Oh no, there is no posts yet ... 😢</h1>
    </div>
</template>

<script>
// @ is an alias to /src
import { BModal  } from 'bootstrap-vue'
import PostsMixin from '@/mixins/crud/Posts.mixin'
const PostSkeleton = () => import('@/components/post/Skeleton')
const PostForm = () => import('@/components/post/Form')

export default {
  name: 'Home',
  mixins: [PostsMixin],
  components: {
    BModal,
    PostSkeleton,
    PostForm
  },
  created: function () {
    this.getAllPosts()
  },
  methods: {
    async savePostAndHideModal () {
      await this.savePost().then(() => {
        this.$bvModal.hide('bv-modal')
      })
    },
    postEditCallback (post) {
      this.loadPostToForm(post)
      this.$bvModal.show('bv-modal')
    }
  }
}
</script>

<style scoped>
    .btn-primary {
        margin-bottom: 20px;
    }
    .btn-secondary {
        margin-top: 20px;
    }
</style>