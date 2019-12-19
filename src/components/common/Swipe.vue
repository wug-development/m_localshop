<template>
    <div>
        <mt-swipe :auto="4000" :style="{height: h}">
            <mt-swipe-item v-for="(item, i) in arr" :key="i">
                <div>
                    <img :src="item" class="swipe-banner-img" alt="">
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ['dataList', 'height', 'img'],
    name: 'Swipe',
    data () {
        return {
            arr: [],
            h: '5.45rem'
        }
    },
    watch: {
        dataList (v) {
            this.arr = v
        },
        img (v) {
            this.arr = [v]
        },
        height (v) {
            this.h = v + 'rem'
        }
    },
    created () {
        this.h = this.height + 'rem'
        this.arr = this.dataList
    }
}
</script>

<style lang="scss">
    .swipe-banner-img{
        display: block;
        width: 100%;
    }
</style>
