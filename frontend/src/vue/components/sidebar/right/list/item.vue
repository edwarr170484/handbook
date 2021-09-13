<template>
    <div :class="{active:item.children && item.children.length > 0}">
        <b-link :href="item.href" class="bd-toc-link" target="_self">{{ item.name }}</b-link>
        <ul class="nav bd-sidenav" v-if="item.children && item.children.length > 0">
            <li class="nav-item" v-for="child in item.children" :key="child.id">
                <b-link :href="child.href" class="nav-link" target="_self">{{ child.name }}</b-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'item',
        props:{
            item: Object
        }
    }
</script>

<style>

</style>