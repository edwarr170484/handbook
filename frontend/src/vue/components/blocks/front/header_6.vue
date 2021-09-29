<template>
    <h6 class="bv-no-focus-ring" :id="block.id">
        <span class="bd-content-title">{{ block.blockText }}<a class="anchorjs-link" :href="'#' + block.id"></a></span>
    </h6>
</template>

<script>
export default {
    name: 'header6',
    props:{
        block: Object
    }
}
</script>