<template>
    <h5 class="bv-no-focus-ring" :id="block.id">
        <span class="bd-content-title">{{ block.blockText }}<a class="anchorjs-link" :href="'#' + block.id"></a></span>
    </h5>
</template>

<script>
export default {
    name: 'header5',
    props:{
        block: Object
    }
}
</script>