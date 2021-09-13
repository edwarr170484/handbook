<template>
    <pre>{{ block.blockText }}</pre>
</template>

<script>
export default {
    name: 'preformatted',
    props:{
        block: Object
    }
}
</script>