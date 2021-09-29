<template>
    <div :class="{active:item.posts && item.posts.length > 0}">
        <div class="topic-link">
            <b-link href="javascript:void(0)" class="bd-toc-link" target="_self" @contextmenu.prevent="$refs.menu.open" v-if="!isEdit">{{ item.title }}</b-link>
            <b-input-group v-if="isEdit">
                <b-form-input v-model="item.title" type="text" placeholder="Enter topic title"></b-form-input>
                <b-input-group-append>
                    <b-button variant="info" @click="editTopic(item)">
                        <b-icon icon="check-circle" v-if="!isLoading"></b-icon>
                        <b-icon icon="arrow-clockwise" animation="spin" v-if="isLoading"></b-icon>
                    </b-button>
                </b-input-group-append>
            </b-input-group>
            <vue-context ref="menu">
                <li @click="isCreate = true" v-if="!item.parent_id">Добавить подкатегорию - {{ item.parent_id }}</li>
                <li @click="$router.push({name: 'postCreate', params: {topicId: item.id}})">Добавить статью</li>
                <li @click="isEdit = true">Редактировать</li>
                <li @click="deleteTopic">Удалить</li>
            </vue-context>
            <div class="topic-add-form">
                <b-input-group v-if="isCreate">
                    <b-form-input v-model="subTopicTitle" type="text" placeholder="Название подкатегории"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="info" @click="addSubTopic">
                            <b-icon icon="plus-square" v-if="!isLoading"></b-icon>
                            <b-icon icon="arrow-clockwise" animation="spin" v-if="isLoading"></b-icon>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </div>
            <div class="subtopics" v-if="item.children && item.children.length > 0">
                <item class="bd-toc-item" v-for="child in item.children" :key="child.id" :item="child"></item>
            </div>
        </div>
        <ul class="nav bd-sidenav" v-if="item.posts && item.posts.length > 0">
            <li class="nav-item" v-for="child in item.posts" :key="child.id">
                <router-link :to="{name: 'post', params:{postId: child.id}}" class="nav-link" target="_self">{{ child.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import VueContext from 'vue-context';
    Vue.component('vue-context', VueContext);
    
    export default {
        name: 'item',
        props:{
            item: Object
        },
        data(){
            return {
                isEdit: false,
                isLoading: false,
                isCreate: false,
                subTopicTitle: ''
            }
        },
        methods:{
            editTopic: function(){
                this.isLoading = true;
                axios({
                    method: 'post',
                    url: '/editor/topic/edit',
                    data: {
                        'id' : this.item.id,
                        'title' : this.item.title
                    },
                    responseType: 'json'
                }).then((response) => {
                    this.isLoading = false;
                    this.isEdit = false;
                    
                    if(response.data.error){
                        alert(response.data.error);
                    }
                });
            },
            deleteTopic: function(){
                if(confirm('Вы уверены в том, что хотите удалить категорию в все, что в нее вложено?')){
                    axios({
                        method: 'post',
                        url: '/editor/topic/delete',
                        data: {'id': this.item.id},
                        responseType: 'json'
                    }).then((response) => {
                        if(response.data.error){
                            alert(response.data.error);
                        }else{
                            if(this.item.parent_id){
                                const index = this.$parent.item.children.indexOf(this.item);

                                if (index > -1) {
                                    this.$parent.item.children.splice(index, 1);
                                }
                            }else{
                                const index = this.$parent.$parent.items.indexOf(this.item);
                            
                                if (index > -1) {
                                    this.$parent.$parent.items.splice(index, 1);
                                }
                            }
                        }
                    });
                }
            },
            addSubTopic: function(){
                this.isLoading = true;
                axios({
                    method: 'post',
                    url: '/editor/topic/create',
                    data: {
                        'title': this.subTopicTitle,
                        'sortorder': 0,
                        'parent_id': this.item.id
                    },
                    responseType: 'json'
                }).then((response) => {
                    this.isCreate = false;
                    this.isLoading = false;
                    
                    if(response.data.error){
                        alert(response.data.error);
                    }else{
                        if(this.item.children === undefined){
                            Vue.set(this.item, 'children', []);
                        }
                        
                        this.item.children.push(response.data.topic);
                    }
                });
            },
            goToPost: function(post){
                router.push({ path: `/post/${post.id}`});
            }
        }
    }
</script>

<style>
    .topic-link{position: relative;}
    .topic-link .input-group{width: auto;}
    .topic-link .input-group{margin-left: 15px;margin-right: 15px;}
    .topic-link-tools .btn.btn-link{color:#000;padding:2px;font-size:75%;}
    .v-context, .v-context ul{padding:3px 12px;}
    .v-context li:hover,.v-context li:focus{cursor: pointer;color:#17a2b8 !important;}
    .topic-add-form,.subtopics{margin-left:25px;}
    .bd-toc-item.active{margin-bottom: 0;}
</style>