<template>
    <div id="Home" class="home-box">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'Home',
    beforeMount () {
        this.$store.state.menu = true
        this.$store.state.menuCur = 2
    }
}
</script>

<style lang="scss">
    .home-box{
        height: 100%;
    }
</style>
