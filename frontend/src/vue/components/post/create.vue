<template>
    <div class="col-8">
        <main class="bd-main bd-components">
            <header class="bd-content">
                <h1 id="bootstrap-icons" class="bv-no-focus-ring" tabindex="-1"><span class="bd-content-title">Add post</span></h1> 
            </header>
        </main>
        <div class="post-edit-form">
            <b-form-group id="input-group-1">
                <b-input-group class="mt-3" prepend="Post title">
                    <b-form-input name="post.title" v-model="post.title"></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group id="input-group-2">
                <b-input-group class="mt-3" prepend="Post preamble">
                    <b-form-textarea id="textarea-rows" rows="8" name="post.postText" v-model="post.postText"></b-form-textarea>
                </b-input-group>
            </b-form-group>
        </div>
        <editor :post = "post"></editor>
    </div>
</template>

<script>
    import editor from './editor.vue'

    export default {
        name: 'post-create',
        data(){
            return {
                post: {
                    title: '',
                    postText: '',
                    topic_id: null,
                    blocks: []
                }
            }
        },
        components:{
            'editor': editor
        },
        created(){
            this.post.topic_id = this.$route.params.topicId;
        },
        watch: {
            $route(to, from) {
                this.post.topic_id = this.$route.params.topicId;
            }
        }
    }
</script>