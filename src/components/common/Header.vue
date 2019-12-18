<template>
    <div id="Header" class="header-box">
        <div class="back" @click="back"></div>{{title}}
    </div>
</template>

<script>
export default {
    props: ['headtitle'],
    name: 'Header',
    data () {
        return {
            title: ''
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    text-align: center;
    height: .9rem;
    line-height: .9rem;
    font-size: .28rem;
    color: #000;
    border-bottom: .02rem solid #ccc;
    box-shadow: 0 0 .1rem #ddd;
    background-color: #fff;
    .back{
        position: absolute;
        left: 0;
        top: 0;
        width: .9rem;
        height: .9rem;
        background: url('../../assets/images/left.png') no-repeat center;
        background-size: auto .4rem;
    }
}
</style>
