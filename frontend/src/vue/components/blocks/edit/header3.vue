<template>
    <b-form-group id="input-group-header-3">
        <b-input-group class="mt-3" :prepend="block.type">
            <b-form-input :name="'post.blocks'" v-model="block.blockText"></b-form-input>
            <input name="post.types" v-model="block.type" type="hidden" />
            <input name="block.id" :value="(block.id) ? block.id : 'isNew'" type="hidden" />
            <b-input-group-append>
                <b-button variant="info" title="Удалить блок" @click="deleteBlock"><b-icon icon="trash"></b-icon></b-button>
            </b-input-group-append>
        </b-input-group>
    </b-form-group>
</template>

<script>
import axios from 'axios';
export default {
    name: 'header3',
    props:{
        block: Object
    },
    methods: {
        deleteBlock: function(){
            if(confirm('Are you want to delete this block?')){
                if(this.block.id !== null){
                    axios({
                        method: 'post',
                        url: '/editor/post/block/delete',
                        data: {'id': this.block.id},
                        responseType: 'json'
                    }).then((response) => {
                        if(response.data.error){
                            alert(response.data.error);
                        }else{
                            let index = this.$parent.post.blocks.indexOf(this.block);

                            if(index > -1){
                                this.$parent.post.blocks.splice(index, 1);
                            }
                        }
                    });
                }
            }
        }
    }
}
</script>