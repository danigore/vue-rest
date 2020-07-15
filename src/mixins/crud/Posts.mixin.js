import BaseMixin from '@/mixins/Base.mixin'
import CrudClient from '@/clients/api/CrudClient.api'

const PostsClient = new CrudClient('posts'),
    PostsMixin = BaseMixin // PostsMixin extends BaseMixin

PostsMixin.data = () => {
    return {
        posts: [],
        postError: null,
        postsLoaded: false,
    }
}

PostsMixin.methods = Object.assign(PostsMixin.methods, {
    /**
     * Load all posts
     */
    async getAllPosts () {
        await PostsClient.read('').then(response => {
            if (this.isFailed(response)) {
                return
            }

            if (200 === response.status) {
                this.posts = response.data
            } else {
                this.postError = response.message
            }

            this.postsLoaded = true
        })
    },
})

export default PostsMixin