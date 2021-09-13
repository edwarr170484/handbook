<template>
    <nav :id="id">
        <ul class="nav section-nav flex-column">
            <li v-if="title" class="nav-item toc-entry mb-2"><a href="#" target="_self" class="nav-link font-weight-bold"><span>{{ title }}</span></a><li>
            <li class="nav-item toc-entry mb-2" v-for="item in items" :key="item.id">
                <a :href="'#' + item.id" class="nav-link"><span>{{ item.blockText }}</span></a>
            </li>
        </ul>
    </nav>
</template>

<script>
    import item from './item.vue';

    export default {
        name: 'list',
        props:{
            id: String,
            title: String,
            items: []
        },
        components:{
            'item': item
        }
    }
</script>

<style>

</style>