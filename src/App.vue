<template>
    <div id="app">
        <router-view/>
        <Footer v-if="$store.state.menu"></Footer>
    </div>
</template>

<script>
import Footer from './components/common/Footer.vue'

export default {
    name: 'App',
    components: {
        Footer
    }
}
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #414141;
    height: 100%;
    font-size: .24rem;
}
</style>
