<template>
    <code>{{ innerText }}</code>
</template>

<script>
export default {
    name: 'codeBlock',
    props:{
        innerText: String
    }
}
</script>