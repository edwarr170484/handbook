<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <router-link to="/" class="navbar-brand"><b-icon icon="server"></b-icon> База знаний</router-link>
    </b-navbar>
</template>

<script>
    export default {
        name: 'header-menu'
    }
</script>

<style>
    .navbar-brand a{
        color:#fff;
        text-decoration:none;
    }
</style>