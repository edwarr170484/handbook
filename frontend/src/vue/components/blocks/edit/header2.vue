<template>
    <b-form-group id="input-group-header-2">
        <b-input-group class="mt-3" :prepend="block.type">
            <b-form-input :name="'post[blocks][' + block.id + ']'" v-model="block.blockText"></b-form-input>
            <b-input-group-append>
                <b-button variant="info" title="Удалить блок" @click="deleteBlock"><b-icon icon="trash"></b-icon></b-button>
            </b-input-group-append>
        </b-input-group>
    </b-form-group>
</template>

<script>
import axios from 'axios';
export default {
    name: 'header2',
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
                    });
                }

                let index = this.$parent.post.blocks.indexOf(this.block);

                if(index > -1){
                    this.$parent.post.blocks.splice(index, 1);
                }
            }
        }
    }
}
</script>