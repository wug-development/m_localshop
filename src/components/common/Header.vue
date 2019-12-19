<template>
    <div id="Header" class="header-box">
        <div class="header-icon mintui mintui-back" v-if="$store.state.menu" @click="back"></div>
        <div class="header-title">{{title}}</div>
        <i class="header-icon icon-city"></i>
    </div>
</template>

<script>
export default {
    props: ['headtitle'],
    name: 'Header',
    data () {
        return {
            title: '同城店铺'
        }
    },
    methods: {
        back: function () {
            this.$router.go(-1)
        }
    },
    created () {
        if (this.headtitle) {
            this.title = this.headtitle
        }
    }
}
</script>

<style lang="scss">
.header-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9;
    text-align: center;
    height: .9rem;
    line-height: .9rem;
    font-size: .28rem;
    color: #fff;
    box-shadow: 0 0 .1rem #999;
    background-color: #414141;
    .header-title{
        font-size: .32rem;
    }
    .header-icon{
        position: absolute;
        top: 0;
        width: .9rem;
        height: .9rem;
    }
    .icon-menu{
        left: 0;
        background: url('../../assets/images/icon-menu.png') no-repeat center;
        background-size: auto .46rem;
    }
    .icon-city{
        right: 0;
        background: url('../../assets/images/site_cur.png') no-repeat center;
        background-size: auto .46rem;
    }
}
</style>
