<template>
    <h3 class="bv-no-focus-ring" :id="block.id">
        <span class="bd-content-title">{{ block.blockText }}<a class="anchorjs-link" :href="'#' + block.id"></a></span>
    </h3>
</template>

<script>
export default {
    name: 'header3',
    props:{
        block: Object
    }
}
</script>