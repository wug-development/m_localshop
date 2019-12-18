<template>
    <div id="Footer" class="footerbox" v-if="isShowFooter">
        <ul class="footerbox-menu-box" @click="toppage">
            <li id="home/list?id=0" :class='$store.state.menuCur==2?"menu-cur":"menu"'>列表</li>
            <li id="cart" :class='$store.state.menuCur==3?"cart-cur":"cart"'>购物车</li>
            <li id="my" :class='$store.state.menuCur==4?"my-cur":"my"'>我的</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data () {
        return {
            isShowFooter: true
        }
    },
    methods: {
        toppage: function (e) {
            let url = '/' + e.target.id
            this.$router.push({
                path: url
            })
        }
    }
}
</script>

<style lang="scss">
    .footerbox{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9;
        width: 7.5rem;
        height: .9rem;
        box-sizing: border-box;
        background-color: #fff;
        border-top: .02rem solid #eee;
        .footerbox-menu-box{
            display: flex;
            justify-content: space-around;
            align-items: center;
            li{
                flex-wrap: nowrap;
                width: 2.5rem;
                text-align: center;
                box-sizing: border-box;
                font-size: .28rem;
                padding-top: .5rem;
            }
            .home{
                background: url('../../assets/images/home.png') no-repeat;
                background-size: .48rem;
                background-position: center .04rem;
            }
            .home-cur{
                background: url('../../assets/images/home_cur.png') no-repeat;
                background-size: .48rem;
                background-position: center .04rem;
                color: #C71F2C;
            }
            .menu{
                background: url('../../assets/images/menu.png') no-repeat;
                background-size: .48rem;
                background-position: center .04rem;
            }
            .menu-cur{
                background: url('../../assets/images/menu_cur.png') no-repeat;
                background-size: .48rem;
                background-position: center .04rem;
                color: #C71F2C;
            }
            .cart{
                background: url('../../assets/images/cart.png') no-repeat;
                background-size: .48rem;
                background-position: center .04rem;
            }
            .cart-cur{
                background: url('../../assets/images/cart_cur.png') no-repeat;
                background-size: .48rem;
                background-position: center .04rem;
                color: #C71F2C;
            }
            .my{
                background: url('../../assets/images/my.png') no-repeat;
                background-size: .48rem;
                background-position: center .04rem;
            }
            .my-cur{
                background: url('../../assets/images/my_cur.png') no-repeat;
                background-size: .48rem;
                background-position: center .04rem;
                color: #C71F2C;
            }
        }
    }
</style>
