<template>
    <img :src="block.blockText" alt="" title="" />
</template>

<script>
export default {
    name: 'imageBlock',
    props:{
        block: Object
    }
}
</script>