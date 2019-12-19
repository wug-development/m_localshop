<template>
    <div id="MyCenter" class="mycenterbox">
        <div class="my-account">
            账户：{{account}}
        </div>
        <div class="my-order">
            <div class="wait-order" @click="toOrderList(0)"><span v-if="corder>0">{{corder}}</span>待支付</div>
            <div class="take-goods" @click="toOrderList(2)">待收货</div>
            <div class="all-order" @click="toOrderList(1)">全部订单</div>
        </div>
        <ul class="my-action-list">
            <li><span>我的积分</span><span class="content">{{credit}} 积分</span></li>
            <li><router-link :to="{path:'/my/myaddress'}"><span>收货地址</span></router-link></li>
            <li @click="tolink('/my/myinfo')"><span>我的信息</span></li>
            <li><a href="/my/myconpon"><span>我的优惠券</span><span class="content">0 张可用</span></a></li>
            <li><router-link :to="{path:'/my/myvip?p='+price}"><span>我的储值卡</span><span class="content">可用余额 &yen; {{price}}</span></router-link></li>
            <li><a href="/my/mydate"><span>我的纪念日</span><span></span></a></li>
            <li><a href="/my/myreturns"><span>退换货</span><span></span></a></li>
            <li><router-link :to="{path:'/my/mypass'}"><span>修改密码</span></router-link></li>
        </ul>
        <div class="my-outlogin hide">
            退出登录
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyCenter',
    data () {
        return {
            account: '',
            price: 0,
            corder: 0,
            credit: 0
        }
    },
    methods: {
        toOrderList: function (e) {
            this.$router.push({
                path: '/my/myorderlist?ty=' + e
            })
        }
    },
    beforeMount () {
        this.$store.state.menu = true
        this.$store.state.menuCur = 4
        this.$http.get(this.apis + '/admin/user/getUserByOpenid', {params: {
            openId: sessionStorage.getItem('openID')
        }})
        .then(res => {
            console.log(res)
            if (res && res.data && res.data.code === 1) {
                this.account = res.data.obj.name
                this.price = res.data.obj.balance
                this.corder = res.data.obj.weizhifu
                this.credit = res.data.obj.userCredit
            }
        })
    }
}
</script>

<style lang="scss">
    .mycenterbox{
        height: 100%;
        background-color: #f5f5f5;
        font-size: .28rem;
        .my-account{
            padding: .25rem 0 .25rem .25rem;
            box-sizing: border-box;
            background-color: #fff;
        }
        .my-order{
            background-color: #fff;
            display: flex;
            border-top: 0.02rem solid #ccc;
            box-shadow: 0 .02rem .06rem #ccc;
            div{
                width: 2.5rem;
                height: 1.7rem;
                padding-top: 1.1rem;
                box-sizing: border-box;
                text-align: center;
                color: #6c6c6c;
                position: relative;
                span{
                    position: absolute;
                    top: .2rem;
                    right: .7rem;
                    display: block;
                    width: 14px;
                    height: 14px;
                    background-color: #f00;
                    color: #fff;
                    border-radius: 20px;
                    font-size: .2rem;
                    line-height: .3rem;
                }
            }
            div::before{
                content: '';
                position: absolute;
                left: 0;
                top: .2rem;
                width: 0;
                border-left: .02rem solid #ccc;
                height: 1.3rem;
            }
            .wait-order{
                background: url(../../assets/images/wait-order.png) no-repeat;
                background-size: .8rem;
                background-position: center .2rem;
            }
            .wait-order::before{
                border: 0;
            }
            .take-goods{
                background: url(../../assets/images/wait-take-goods.png) no-repeat;
                background-size: .8rem;
                background-position: center .2rem;
            }
            .all-order{
                background: url(../../assets/images/all-order.png) no-repeat;
                background-size: .8rem;
                background-position: center .2rem;
            }
        }
        .my-action-list{
            margin-top: .2rem;
            background-color: #fff;
            padding-left: .4rem;
            box-sizing: border-box;
            li{
                height: .9rem;
                line-height: .4rem;
                padding: .25rem 0;
                border-top: 0.02rem solid #ccc;
                box-sizing: border-box;
                position: relative;
                display: flex;
                justify-content: space-between;
                a{
                    display: flex;
                    width: 100%;
                    height: 100%;
                    justify-content: space-between;
                    line-height: .4rem;
                    color: #6c6c6c;
                }
                span{
                    height: 100%;
                }
                .content{
                    color: #f00;
                    margin-right: .5rem;
                    font-size: .24rem;
                }
            }
            .hide{
                display: none;
            }
            li:first-child{
                border: 0;
            }
            li a::after{
                content: '';
                position: absolute;
                top: .24rem;
                right: .06rem;
                display: block;
                width: .4rem;
                height: .4rem;
                background: url(../../assets/images/right.png) no-repeat center;
                background-size: 90%;
            }
        }
        .my-outlogin{
            margin: 1rem auto .2rem auto;
            width: 6.5rem;
            height: .8rem;
            line-height: .8rem;
            background-color: #414141;
            color: #fff;
            text-align: center;
            border-radius: .1rem;
        }
        .hide{
            display: none;
        }
    }
</style>
