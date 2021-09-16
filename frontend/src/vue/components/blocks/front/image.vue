<template>
    <img :src="'upload/' + block.blockText" alt="" title="" class="mw-100" />
</template>

<script>
export default {
    name: 'imageBlock',
    props:{
        block: Object
    }
}
</script>