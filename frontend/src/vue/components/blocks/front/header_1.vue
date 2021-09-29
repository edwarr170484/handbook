<template>
    <h1 class="bv-no-focus-ring" :id="block.id">
        <span class="bd-content-title">{{ block.blockText }}<a class="anchorjs-link" :href="'#' + block.id"></a></span>
    </h1>
</template>

<script>
export default {
    name: 'header1',
    props:{
        block: Object
    }
}
</script>