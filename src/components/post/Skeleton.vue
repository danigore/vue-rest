<template>
    <b-card :title="post.title">
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
</template>

<script>
import { BCard  } from 'bootstrap-vue'

export default {
  name: "PostSkeleton",
  components: {
    BCard
  },
  props: {
    post: {
      type: Object
    }
  }
}
</script>