<template>
    <div class="col-10">
      <div class="row flex-xl-nowrap2">
        <div class="bd-content col-xl-9 col-12 pb-md-3 pl-md-5" id="main-content">
          <main class="bd-main bd-components">
            <header class="bd-content d-flex justify-content-between align-items-center" v-if="post && post.title">
              <h1 id="bootstrap-icons" class="bv-no-focus-ring" tabindex="-1"><span class="bd-content-title">{{ post.title }}</span></h1> 
              <b-button-group>
                <b-button title="Редактировать статью" size="sm" @click="$router.push({name: 'postEdit', params:{postId: post.id}})"><b-icon icon="pen"></b-icon></b-button>
                <b-button title="Удалить статью" size="sm" @click="deletePost(post.id)"><b-icon icon="trash"></b-icon></b-button>
              </b-button-group>
            </header>
            <p class="bd-lead" v-if="post && post.postText">{{ post.postText }}</p>
            <article v-if="post && post.blocks && post.blocks.length > 0" class="post-blocks">
              <component v-for="block in post.blocks" :key="block.id" v-bind:is="block.type" :block="block"></component>
            </article>
          </main>                
        </div>
        <refs-nav class="bd-toc col-xl-2 d-none d-xl-block" :items="navigations" :title="(post && post.title) ? post.title : null"></refs-nav>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import refsNav from './sidebar/right/list/list.vue';
  import header_1 from './blocks/front/header_1.vue';
  import header_2 from './blocks/front/header_2.vue';
  import header_3 from './blocks/front/header_3.vue';
  import header_4 from './blocks/front/header_4.vue';
  import header_5 from './blocks/front/header_5.vue';
  import header_6 from './blocks/front/header_6.vue';
  import paragraph from './blocks/front/paragraph.vue'; 
  import imageBlock from './blocks/front/image.vue';
  import preformatted from './blocks/front/preformatted.vue';
  import code from './blocks/front/code.vue';
  import list from './blocks/front/list.vue';

  export default {
      name: 'main-content',
      data(){
        return {
          post: null,
          navigations:[]
        }
      },
      components:{
        'refs-nav' : refsNav,
        'header_1': header_1,
        'header_2': header_2,
        'header_3': header_3,
        'header_4': header_4,
        'header_5': header_5,
        'header_6': header_6,
        'paragraph': paragraph,
        'imageBlock': imageBlock,
        'preformatted': preformatted,
        'codeBlock': code,
        'list': list
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
            if(response.data.error){
              alert(response.data.error);
            }else{
              this.post = response.data.data.post;
              if(this.post && this.post.blocks.length > 0){
                  this.navigations = this.post.blocks.filter(function(block){
                      return ['header_1','header_2','header_3','header_4','header_5','header_6'].includes(block.type);
                  });
              }
            }
          });
        },
        deletePost: function(postId){
          if(confirm('Do you want to delete this article?')){
            axios.post('/editor/post/remove', {'id': postId}).then((response) => {
              if(response.data.error){
                alert(response.data.error);
              }else{
                this.$router.push({path: '/'});
                this.$store.commit('getTopicsList');
              }
            });
          }
        }
      }
  }
</script>

<style lang="sass">
  .bd-lead{max-width: 100%;}
  #main-content{padding-top:80px;}
</style>

