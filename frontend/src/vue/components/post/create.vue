<template>
    <div class="col-8">
        <main class="bd-main bd-components">
            <header class="bd-content">
                <h1 id="bootstrap-icons" class="bv-no-focus-ring" tabindex="-1"><span class="bd-content-title">Добавить статью</span></h1> 
            </header>
        </main>
        <div class="post-edit-form">
            <form name="post-edit-form" @submit.prevent="savePost">
                <b-form-group id="input-group-1">
                    <b-input-group class="mt-3" prepend="Заголовок статьи">
                        <b-form-input name="post[title]" v-model="post.title"></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group id="input-group-2">
                    <b-input-group class="mt-3" prepend="Текст преамбулы">
                        <b-form-textarea id="textarea-rows" rows="8" name="post[postText]" v-model="post.postText"></b-form-textarea>
                    </b-input-group>
                </b-form-group>
                <component v-for="block in post.blocks" :key="block.id" v-bind:is="block.type" :block="block"></component>
                <div class="add-block-buttons">
                    <div class="mt-3 mb-3">
                        <b-button-group size="sm">
                            <b-button @click="addPostBlock('header1')">H1</b-button>
                            <b-button @click="addPostBlock('header2')">H2</b-button>
                            <b-button @click="addPostBlock('header3')">H3</b-button>
                            <b-button @click="addPostBlock('header4')">H4</b-button>
                            <b-button @click="addPostBlock('header5')">H5</b-button>
                            <b-button @click="addPostBlock('header6')">H6</b-button>
                            <b-button @click="addPostBlock('paragraph')">p</b-button>
                            <b-button @click="addPostBlock('preformatted')">pre</b-button>
                            <b-button @click="addPostBlock('codeBlock')">code</b-button>
                        </b-button-group>
                    </div>
                </div>
                <input name="post[topic_id]" type="hidden" v-model="post.topic_id" />
                <b-button-group>
                    <b-button type="submit" variant="primary">Сохранить</b-button>
                    <b-button @click="$router.push({name: 'post', params:{postId: post.id}})">Отменить</b-button>
                </b-button-group>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import header1 from '../blocks/edit/header1.vue';
    import header2 from '../blocks/edit/header2.vue';
    import header3 from '../blocks/edit/header3.vue';
    import header4 from '../blocks/edit/header4.vue';
    import header5 from '../blocks/edit/header5.vue';
    import header6 from '../blocks/edit/header6.vue';
    import paragraph from '../blocks/edit/paragraph.vue'; 
    import image from '../blocks/edit/image.vue';
    import preformatted from '../blocks/edit/preformatted.vue';
    import codeBlock from '../blocks/edit/code.vue';
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
        created(){
            this.post.topic_id = this.$route.params.topicId;
        },
        watch: {
            $route(to, from) {
                this.post.topic_id = this.$route.params.topicId;
            }
        },
        components:{
            'header1': header1,
            'header2': header2,
            'header3': header3,
            'header4': header4,
            'header5': header5,
            'header6': header6,
            'paragraph': paragraph,
            'imageBlock': image,
            'preformatted': preformatted,
            'codeBlock': codeBlock
        },
        methods:{
            savePost: function(event){
                let data={
                    'title': this.post.title,
                    'postText': this.post.postText,
                    'topic_id': this.post.topic_id,
                    'blocks': this.post.blocks
                }
                axios.post('/editor/post/create', data).then((response) => {
                    if(response.data && response.data.id > 0){
                        this.$router.push({name: 'postEdit', params: {postId: response.data.id}});
                    }
                });
            },
            addPostBlock: function(type){
                let newBlock = {
                    id: null,
                    type: type,
                    blockText: '',
                    sortorder: this.post.blocks.length + 1,
                }

                this.post.blocks.push(newBlock);
            }
        }
    }
</script>