import BaseMixin from '@/mixins/Base.mixin'
import CrudClient from '@/clients/api/CrudClient.api'

const PostsClient = new CrudClient('posts'),
    PostsMixin = BaseMixin // PostsMixin extends BaseMixin

PostsMixin.data = () => {
    return {
        posts: [],
        postError: null,
        postsLoaded: false,
        postForm: {
            id: null,
            title: null,
            content: '',
            slug: '',
            //tags: [],
        },
        postFormError: null,
    }
}

PostsMixin.methods = Object.assign(PostsMixin.methods, {
    /**
     * Add again the default blank values to the form ...
     */
    resetPostForm () {
        this.postForm = {
            id: null,
            title: null,
            content: '',
            slug: '',
            //tags: [],
        }
    },
    /**
     * @param post
     * Load an existing post's values to the form ...
     */
    loadPostToForm (post) {
        this.postForm = {
            id: post.id,
            title: post.title,
            content: post.content,
            slug: post.slug,
            //tags: post.tags,
        }
    },
    /**
     * @returns {Promise<void>}
     * Load all posts
     */
    async getAllPosts () {
        await PostsClient.read('').then(response => {
            if (this.isFailed(response)) {
                return
            }

            if (200 === response.status) {
                this.posts = response.data.reverse()
            } else {
                this.postError = response.message
            }

            this.postsLoaded = true
        })
    },
    /**
     * @returns {Promise<void>}
     * Create a new Post or update one
     */
    async savePost () {
        this.postFormError = null

        const clientAction = () => this.isPositiveNumeric(this.postForm.id) ?
                PostsClient.update(this.postForm) :
                PostsClient.create(this.postForm)

        await clientAction().then(response => {
            if (this.isFailed(response)) {
                return
            }

            if ([200,201].includes(response.status)) {
                if (200 === response.status) {
                    console.log('det')
                    this.posts.splice(
                        this.posts.findIndex((post) => post.id === this.postForm.id),
                        1,
                        response.data)
                } else {
                    // The unshift() method adds one or more elements to the beginning of an array
                    this.posts.unshift(response.data)
                }

                this.resetPostForm()
            } else {
                this.postFormError = response.message
            }
        })
    },
})

export default PostsMixin