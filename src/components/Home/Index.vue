<template>
    <div id="indexbox" class="index-box">
        <SBanner :dataList="bannerList"  :height='5.4'></SBanner>
        <div>
            <img :src='imgpathlib + "15554844407956239.jpg"' alt="">
        </div>
        <div @click="tolist">
            <img id="4" :src='imgpathlib + "15535855169262225.jpg"' alt="">
        </div>
        <div @click="toinfo">
            <img :src='imgpathlib + "15521259916227378.jpg"' alt="">
            <img id="5099" :src='imgpathlib + "15521259916442509.jpg"' alt="">
            <img id="3540" :src='imgpathlib + "15522849303698263.jpg"' alt="">
            <img id="12" :src='imgpathlib + "15521259916573424.jpg"' alt="">
            <img id="2064" :src='imgpathlib + "15521259916726969.jpg"' alt="">
        </div>
    </div>
</template>

<script>
import SBanner from '../../components/common/Swipe.vue'

export default {
    data () {
        return {
            userid: 0,
            bannerList: []
        }
    },
    components: {
        SBanner
    },
    methods: {
        toinfo: function (e) {
            this.$router.push({
                path: '/home/info?id=' + e.target.id
            })
        },
        tolist: function (e) {
            this.$router.push({
                path: '/home/list?id=' + e.target.id
            })
        }
    },
    beforeMount () {
        this.$store.state.menu = true
        this.$http.get(this.apio + '/index/m/0', {})
        .then(res => {
            this.bannerList = res.data.datas
        })
    }
}
</script>

<style lang="scss">
    .index-box{
        color: #414141;
        padding-bottom: .9rem;
        img{
            display: block;
            max-width: 100%;
        }
    }
</style>
