import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import '../scss/app.scss'
import App from '../vue/App.vue'
import mainContent from '../vue/components/main.vue'
import postEdit from '../vue/components/post/edit.vue'
import postCreate from '../vue/components/post/create.vue'

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
    routes:[
        {name: 'post', path: '/post/:postId', component: mainContent},
        {name: 'postEdit', path: '/editor/post/edit/:postId', component: postEdit},
        {name: 'postCreate', path: '/editor/post/create/:topicId', component: postCreate}
    ]
});

const store = new Vuex.Store({
    state:{
        topics: []
    },
    mutations:{
        getTopicsList(){
            axios.get('/topics/list').then((response) => {
                if(response.data.error){
                    alert(response.data.error);
                }else{
                    this.state.topics = response.data.topics;
                }
            });
        }
    }
});

const app = new Vue({
    render: h => h(App),
    router: router,
    store: store
}).$mount('#knowledge');