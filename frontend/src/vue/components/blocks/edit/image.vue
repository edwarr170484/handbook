<template>
    <b-form-group id="input-group-header-1">
        <div v-if="block.type == 'imageBlock' && block.blockText != ''">
            <b-img thumbnail fluid :src="'/upload/' + block.blockText" :alt="block.blockText"></b-img>
        </div>
        <b-input-group class="mt-3" :prepend="block.type">
            <b-form-file :name="'post.images'" class="form-control" @change="setImageName" plain></b-form-file>
            <input name="post.blocks" v-model="block.blockText" type="hidden" />
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
    name: 'imageBlock',
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
        },
        setImageName: function(event){
            this.block.blockText = event.target.files[0].name;
        }
    }
}
</script>