<template>
    <div class="col-10">
      <div class="row flex-xl-nowrap2">
        <div class="bd-content col-xl-9 col-12 pb-md-3 pl-md-5">
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
  import header1 from './blocks/front/header1.vue';
  import header2 from './blocks/front/header2.vue';
  import header3 from './blocks/front/header3.vue';
  import header4 from './blocks/front/header4.vue';
  import header5 from './blocks/front/header5.vue';
  import header6 from './blocks/front/header6.vue';
  import paragraph from './blocks/front/paragraph.vue'; 
  import image from './blocks/front/image.vue';
  import preformatted from './blocks/front/preformatted.vue';
  import code from './blocks/front/code.vue';

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
        'header1': header1,
        'header2': header2,
        'header3': header3,
        'header4': header4,
        'header5': header5,
        'header6': header6,
        'paragraph': paragraph,
        'imageBlock': image,
        'preformatted': preformatted,
        'codeBlock': code
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
          axios.get('/post/' + this.$route.params.postId).then((response) => {
            this.post = response.data;
            if(this.post.blocks.length > 0){
                this.navigations = this.post.blocks.filter(function(block){
                    return ['header1','header2','header3','header4','header5','header6'].includes(block.type);
                });
            }
          });
        },
        deletePost: function(postId){
          if(confirm('Do you want to delete this article?')){
            axios.post('/editor/post/remove', {'id': postId}).then((response) => {
              this.$router.push({path: '/'});
            });
          }
        }
      }
  }
</script>

<style lang="sass">
  .bd-lead{max-width: 100%;}
</style>

