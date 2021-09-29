<template>
    <ul>
        <li v-for="(item, index) in items" :key="index" v-html="item"></li>
    </ul>
</template>

<script>
export default {
    name: 'list',
    props:{
        block: Object
    },
    computed: {
        items: function(){
            return JSON.parse(this.block.blockText);
        }
    }
}
</script>