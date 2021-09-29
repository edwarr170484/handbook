<template>
    <h4 class="bv-no-focus-ring" :id="block.id">
        <span class="bd-content-title">{{ block.blockText }}<a class="anchorjs-link" :href="'#' + block.id"></a></span>
    </h4>
</template>

<script>
export default {
    name: 'header4',
    props:{
        block: Object
    }
}
</script>