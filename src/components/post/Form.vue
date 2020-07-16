<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="post-title-state-group" label="Title:" label-for="post-title-state">
                <b-form-input
                        id="post-title-state"
                        v-model="form.title"
                        placeholder="Add a short title to your post, if you want ..."
                ></b-form-input>
            </b-form-group>

            <b-form-group id="post-content-state-group" label="The content of your post:" label-for="post-content-state">
                <b-form-textarea
                        id="post-content-state"
                        v-model="form.content"
                        :state="form.content.length >= 3 && form.content.length < 15000"
                        placeholder="Content must be at least 3 characters long and cannot be longer than 15000 characters!"
                        rows="3"
                        trim
                        required
                ></b-form-textarea>
            </b-form-group>

            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>

        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
        </b-card>
    </div>
</template>

<script>
import { BForm  } from 'bootstrap-vue'

export default {
  name: "PostForm",
  components: {
    BForm
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    onSubmitCallback: {
      type: Function,
      required: true
    },
    onResetCallback: {
      type: Function,
      required: true
    },
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()
      evt.stopImmediatePropagation()

      if ('function' === typeof this.onSubmitCallback) {
        this.onSubmitCallback()
      }
    },
    async onReset(evt) {
      evt.preventDefault()
      evt.stopImmediatePropagation()

      if ('function' === typeof this.onResetCallback) {
        this.onResetCallback()
      }
    }
  }
}
</script>