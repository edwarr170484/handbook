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
    #knowladge > .navbar{position:fixed;width:100%;z-index:3;}
    .navbar-brand a{
        color:#fff;
        text-decoration:none;
    }
</style>