<template>
    <nav :id="id">
        <item class="bd-toc-item" v-for="item in items" :key="item.id" :item="item"></item>
    </nav>
</template>

<script>
    import item from './item.vue';
    import axios from 'axios';

    export default {
        name: 'list',
        props:{
            id: String,
            items: Array
        },
        components:{
            'item': item
        }
    }
</script>

<style>

</style>