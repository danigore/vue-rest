<template>
    <b-card :title="post.title">
        <b-card-text>
            {{ post.content }}
        </b-card-text>

        <div v-if="post.tags.length">
            <b-link  v-for="tag in post.tags" :key="tag.id" :href="'/tag/'+tag.slug" class="card-link">{{ tag.title }}</b-link>
        </div>

        <b-button v-if="onEditCallback" @click="onEdit" variant="dark">Edit</b-button>
        <b-button v-if="onDeleteCallback" @click="onDelete" variant="danger">Delete</b-button>

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
    },
    onEditCallback: {
      type: Function // the typeof a not required property can be `null` or `undefined`!
    },
    onDeleteCallback: {
      type: Function
     },
  },
  methods: {
    onEdit () {
      if ('function' === typeof this.onEditCallback) {
        this.onEditCallback(this.post)
      }
    },
    onDelete () {
      if ('function' === typeof this.onDeleteCallback) {
        this.onDeleteCallback(this.post.id)
      }
    },
  }
}
</script>