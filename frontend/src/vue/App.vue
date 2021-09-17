<template>
    <div id="knowladge">
        <header-menu></header-menu>
        <div class="container-fluid">
            <div class="row flex-xl-nowrap2">
                <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12">
                    <div class="bd-search">
                        <b-input-group>
                            <b-form-input v-model="topic.title" type="text" placeholder="Название категории"></b-form-input>
                            <b-input-group-append>
                                <b-button variant="info" @click="addTopic" title="Добавить новую категорию">
                                    <b-icon icon="plus-square" v-if="!isLoading"></b-icon>
                                    <b-icon icon="arrow-clockwise" animation="spin" v-if="isLoading"></b-icon>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                    <docs-nav id="bd-docs-nav" class="bd-links d-none d-md-block" :items="items"></docs-nav>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import headerMenu from '../vue/components/header.vue'
    import mainContent from '../vue/components/main.vue'
    import docsNav from '../vue/components/sidebar/left/list/list.vue'
    
    export default {
        data(){
            return {
                topic: {
                    title: ''
                },
                isLoading: false
            }
        },
        components:{
            'header-menu' : headerMenu,
            'docs-nav' : docsNav,
            'main-content' : mainContent
        },
        created(){
            this.$store.commit('getTopicsList');
        },
        computed: {
            items: function(){
                return this.$store.state.topics;
            }  
        },
        methods:{
            addTopic: function(){
                this.isLoading = true;
                axios({
                    method: 'post',
                    url: '/editor/topic/create',
                    data: {
                        'title': this.topic.title,
                        'sortorder': this.items.length + 1
                    },
                    responseType: 'json'
                }).then((response) => {
                    this.isLoading = false;
                    if(response.data.error){
                        alert(response.data.error);
                    }else{
                        this.topic.title = null;
                        this.items.push(response.data.topic);
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    .bd-sidebar{top:3.5rem;}
    .breadcrumb{
        background: none;
        padding: 0.75rem 0;
    }
</style>