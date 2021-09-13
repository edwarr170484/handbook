<template>
    <p>{{ block.blockText }}</p>
</template>

<script>
export default {
    name: 'paragraph',
    props:{
        block: Object
    }
}
</script>