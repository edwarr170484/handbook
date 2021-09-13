<template>
    <h2 class="bv-no-focus-ring" :id="block.id">
        <span class="bd-content-title">{{ block.blockText }}<a class="anchorjs-link" :href="'#' + block.id"></a></span>
    </h2>
</template>

<script>
export default {
    name: 'header2',
    props:{
        block: Object
    }
}
</script>