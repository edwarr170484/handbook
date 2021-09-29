<template>
    <p v-html="block.blockText"></p>
</template>

<script>
export default {
    name: 'paragraph',
    props:{
        block: Object
    }
}
</script>