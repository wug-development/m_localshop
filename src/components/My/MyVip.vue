<template>
    <div id="myvip" class="myvip">
        <Header headtitle="充值中心"></Header>
        <div class="card">
            <div class="title">Lovzvzu 商城储值卡</div>
            <div class="pricetxt">
                <div>&yen;<span>{{totalPrice}}</span></div>
                <div>储值，支付更方便</div>
            </div>
        </div>
        <div class="recharge">
            <div>充值金额</div>
            <div><input type="tel" v-model="price" placeholder="自定义金额" maxlength="8" ></div>
        </div>
        <div class="btn" @click="submitPrice">
            立即充值
        </div>
        <div class="agreement">
            <span>同意 <label @click="isxieyi=true">《储值卡消费服务协议》</label></span>
        </div>
        <Xieyi v-show="isxieyi" v-on:close="isxieyi = false"></Xieyi>
    </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import Xieyi from '@/components/common/Xieyi.vue'

export default {
    name: 'MyVip',
    data () {
        return {
            price: '',
            totalPrice: '0.00',
            isxieyi: false
        }
    },
    components: {
        Header,
        Xieyi
    },
    methods: {
        submitPrice: function () {
            if (this.price && /^[+]{0,1}(\d+)$/g.test(this.price)) {
                this.price = Number(this.price)
                if (this.price > 0) {
                    this.Indicator.open()
                    // address/getCustomerAddressByOpenIdAjax
                    this.$http.get(this.apis + '/admin/user/setBalance', {params: {
                        openId: sessionStorage.getItem('openID'),
                        balance: this.price
                    }})
                    .then(res => {
                        console.log(res)
                        if (res && res.data && res.data.code === 1) {
                            this.wxPay(res.data.obj)
                        } else if (res && res.data) {
                            this.Indicator.close()
                            this.Toast(res.data.msg)
                        } else {
                            this.Indicator.close()
                            this.Toast('充值失败')
                        }
                    })
                    .catch(e => {
                        this.Indicator.close()
                        this.Toast('充值失败')
                    })
                }
            } else {
                this.$messagebox('请输入正确的金额')
            }
        },
        wxPay: function (obj) {
            this.$http.get(this.apis + '/payWeixin/wxPayByWeb', {params: {
                out_trade_no: obj.orderno
            }})
            .then(res => {
                if (res && res.data && res.data.code === 1) {
                    this.Toast('微信支付调用成功')
                    this.Indicator.close()
                    this.isSubmited = false
                    jsSDK(res.data.obj, this)
                } else {
                    this.Toast('微信支付调用失败')
                    this.Indicator.close()
                    this.isSubmited = false
                }
            })
            .catch(e => {
                this.Indicator.close()
                this.Toast('微信支付调用失败')
                this.isSubmited = false
            })
        }
    },
    created () {
        this.totalPrice = this.$route.query.p
    }
}

function jsSDK (params, vue) {
    if (typeof window.WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', function () { onBridgeReady(params, vue) }, false)
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', function () { onBridgeReady(params, vue) })
            document.attachEvent('onWeixinJSBridgeReady', function () { onBridgeReady(params, vue) })
        }
    } else {
        onBridgeReady(params, vue)
    }
}

function onBridgeReady (res, vue) {
    window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            'appId': res.appId, // 公众号名称，由商户传入
            'timeStamp': res.timeStamp, // 时间戳，自1970年以来的秒数
            'nonceStr': res.nonceStr, // 随机串
            'package': res.packageValue,
            'signType': res.signType, // 微信签名方式：
            'paySign': res.paySign // 微信签名
        },
        function (res) {
            console.log(res)
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
                vue.Toast('支付成功')
                vue.$router.push({
                    path: '/my'
                })
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                vue.Toast('取消支付')
            } else {
                vue.Toast('支付失败')
            }
        }
    )
}
</script>

<style lang="scss">
    .myvip{
        height: 100%;
        padding: .9rem 0;
        box-sizing: border-box;
        background-color: #fff;
        .card{
            width: 6.5rem;
            height: 3.6rem;
            margin: .4rem auto;
            background: url('../../assets/images/card_bg.png') no-repeat center;
            background-size: 100% ;
            color: #fff;
            padding: .4rem .3rem 0 .3rem;
            box-sizing: border-box;
            .title{
                text-align: center;
                font-size: .28rem;
            }
            .pricetxt{
                margin-top: 2rem;
                line-height: .4rem;
                display: flex;
                justify-content: space-between;
                span{
                    font-size: .4rem;
                    margin-left: .1rem;
                }
            }
        }
        .recharge{
            width: 6.5rem;
            margin: .6rem auto;
            color: #000;
            font-size: .28rem;
            input{
                margin-top: .4rem;
                height: .8rem;
                line-height: .8rem;
                width: 2.4rem;
                padding-left: .2rem;
                border: 0;
                box-shadow: 0 0 .2rem #ddd;
                border-radius: .1rem;
            }
        }
        .btn{
            width: 6.5rem;
            margin: .6rem auto 0 auto;
            height: .8rem;
            line-height: .8rem;
            background-color: #f00;
            color: #fff;
            font-size: .28rem;
            text-align: center;
            border-radius: .8rem;
        }
        .btn:active{
            background-color: #D30000;
        }
        .agreement{
            margin-top: .4rem;
            text-align: center;
            color: #000;
            span{
                position: relative;
                label{
                    color: #3296FA;
                }
            }
            span::before{
                content: '';
                position: absolute;
                left: -.4rem;
                top: 0;
                width: .3rem;
                height: .3rem;
                background: url('../../assets/images/dui.png') no-repeat center;
                background-color: #3296FA;
                background-size: 60%;
                border-radius: .06rem;
            }
        }
    }
</style>
