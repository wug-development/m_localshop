<template>
    <div id="My" class="mybox">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'My',
    beforeMount () {
        this.$store.state.menu = true
        this.$store.state.menuCur = 4
    }
}
</script>

<style lang="scss">
    .mybox{
        height: 100%;
    }
</style>
