<template>
    <div id="app">
        <Header></Header>
        <router-view/>
        <Footer v-if="$store.state.menu"></Footer>
    </div>
</template>

<script>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'

export default {
    name: 'App',
    components: {
        Header,
        Footer
    },
    watch: {
        '$route': {
            handler (route) {
                let rname = route.name || ''
                console.log(rname)
                let isshowback = true
                switch (rname) {
                    case '': isshowback = false; break
                    case 'Menu': isshowback = false; break
                    case 'Cart': isshowback = false; break
                    case 'My': isshowback = false; break
                }
                console.log(isshowback)
                this.$store.state.menu = isshowback
            }
        }
    }
}
</script>

<style lang="scss">
@import './assets/css/public.scss';
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $fontcolor;
    height: 100%;
    font-size: .24rem;
    padding-top: .9rem;
    box-sizing: border-box;
}
</style>
