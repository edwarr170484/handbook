<template>
    <div>
        <div id="postblocks"></div>
        <b-button-group>
            <b-button type="bottom" variant="primary" @click="savePost((post && post.id) ? post.id : null)">Сохранить</b-button>
            <b-button v-if="post && post.id" @click="$router.push({name: 'post', params:{postId: post.id}})">Отменить</b-button>
        </b-button-group>
    </div>
</template>

<script>
    import axios from 'axios';
    import EditorJS from '@editorjs/editorjs';
    import Header from '@editorjs/header'; 
    import List from '@editorjs/list'; 
    import ImageTool from '@editorjs/image';

    export default {
        name: 'editor',
        props: {
            post: Object
        },
        data: function(){
            return {
                editor: null
            }
        },
        created: function(){
            let postBlocks = (this.post && this.post.blocks && this.post.blocks.length > 0) ? this.post.blocks.map((block) => {
                let parts = block.type.split('_');
                
                let newBlock = {
                    "id": block.id,
                    "type": parts[0],
                    "data": {
                        "text": block.blockText,
                    }
                }

                switch(parts[0]){
                    case 'header':
                        newBlock.data.level = parts[1];
                    break;

                    case 'imageBlock':
                        newBlock.type = "image";
                        newBlock.data = {
                            file: {
                                url: "/upload/" + block.blockText,
                                text: block.blockText
                            }
                        }
                    break;

                    case 'list':
                        newBlock.data.items = JSON.parse(block.blockText);
                    break;
                }

                return newBlock;
            }) : [];

            this.editor = new EditorJS({ 
                holder: 'postblocks', 
                placeholder: 'Click here to add new block of post',
                tools: { 
                    header: Header, 
                    list: List ,
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: '/editor/post/uploadImage'
                            }
                        }
                    }
                },
                data: {
                    blocks: postBlocks
                }
            });
        },
        methods: {
            savePost: function(postId = null){
                let component = this;
                
                this.editor.save().then(function(postData){
                    let data = new FormData();

                    if(postId){
                        data.append('post.id', postId);
                    }
                    
                    data.append('post.title', component.post.title);
                    data.append('post.postText', component.post.postText);

                    if(component.$route.name == 'postCreate'){
                        data.append('post.topic_id', component.$route.params.topicId);
                    }

                    if(postData && postData.blocks){
                        postData.blocks.forEach(function(block){    
                            let type = block.type;

                            if(block.data && block.data.level){
                                type += '_' + block.data.level;
                            }

                            if(block.type == 'image'){
                                data.append('post.blocks', block.data.file.text);
                                data.append('post.types', 'imageBlock');
                            }else if(block.type == 'list'){
                                data.append('post.blocks', JSON.stringify(block.data.items));
                                data.append('post.types', type);
                            }else{
                                data.append('post.blocks', block.data.text);
                                data.append('post.types', type);
                            }
                            
                            data.append('block.id', (isNaN(parseInt(block.id)) || parseInt(block.id) != block.id) ? 'isNew' : block.id);       
                        });
                    }

                    axios({
                        method: 'post',
                        url: (postId) ? '/editor/post/edit/' + component.$route.params.postId : '/editor/post/create/',
                        data: data,
                        headers:{'Content-Type': 'multipart/form-data'},
                        responseType: 'json'
                    }).then((response) => {
                        if(response.data.error){
                            alert(response.data.error);
                        }else{
                            component.$store.commit('getTopicsList');
                            
                            if(component.$route.name == 'postCreate'){
                                component.$router.push({name: 'postEdit', params: {'postId' : response.data.post.id}});
                            }
                        }
                    });
                });
            }
        }
    }
</script>

<style>
    .ce-toolbar__plus{left:0;}
    .ce-block__content, .ce-toolbar__content{max-width:100%;}
    .ce-toolbar{width:100%}
    .ce-toolbox{left:35px;}
    .ce-block__content{padding-left:35px;}
</style>