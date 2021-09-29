<template>
    <div class="col-8">
        <main class="bd-main bd-components">
            <header class="bd-content">
                <h1 id="bootstrap-icons" class="bv-no-focus-ring" tabindex="-1"><span class="bd-content-title">Edit post</span></h1> 
            </header>
        </main>
        <div class="post-edit-form">
            <b-form-group id="input-group-1">
                <b-input-group class="mt-3" prepend="Post title">
                    <b-form-input name="post.title" :value="post.title" v-model="post.title"></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group id="input-group-2">
                <b-input-group class="mt-3" prepend="Post preamble">
                    <b-form-textarea id="textarea-rows" rows="8" name="post.postText" :value="post.postText" v-model="post.postText"></b-form-textarea>
                </b-input-group>
            </b-form-group>
        </div>
        <editor :post = "post"></editor>
    </div>
</template>

<script>   
    import axios from 'axios';
    import editor from './editor.vue'

    export default {
        name: 'post-edit',
        data(){
            return {
                post: null
            }
        },
        components:{
            'editor': editor
        },
        created() {
            this.getPostData();
        },
        watch: {
            $route: 'getPostData'
        },
        methods: {
            getPostData: function(){
                this.post = null;
                let queryPost = `query Post{
                    post(post_id: "${this.$route.params.postId}") {
                        id, 
                        title, 
                        postText,
                        blocks {id, type, blockText, post_id}
                    }
                }`;
                axios.get('/graphql', {params:{query: queryPost}}).then((response) => {
                    this.post = response.data.data.post;
                    if(this.post.blocks && this.post.blocks.length > 0){
                        this.post.blocks.forEach(function(block){
                            block.isNew = false;
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="sass">

</style>