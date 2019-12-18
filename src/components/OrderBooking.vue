<template>
    <div id="OrderBooking" class="orderbooking-box">
        <div class="addr-box">
            <template v-if="isAddr">
                <div @click="toAddrList(addrInfo.id)">
                    <div class="namephone">
                        <span>收货人：{{addrInfo.name}}</span>
                        <span>{{addrInfo.mobile}}</span>
                    </div>
                    <div class="addr-info">
                        收货地址：{{addrInfo.province}} {{addrInfo.city}} {{addrInfo.district}} {{addrInfo.address}}
                    </div>
                </div>
            </template>
            <template v-if="!isAddr">
                <div class="newaddr" @click="toNewAddr">
                    <span class="btn"></span><span>选择收货地址</span>
                </div>
            </template>
        </div>

        <div class="products-box">
            <div class="storename">Lovzvzu 商城</div>
            <ul class="product-list">
                <li v-for="(item, index) in dataList" :key="index">
                    <div class="proimg">
                        <img :src="item.selModel.productcolorImage || item.pic" alt="">
                    </div>
                    <div class="proinfo">
                        <div class="name">{{item.name}}</div>
                        <div class="attr">{{item.selModel.productcolorValue}} {{item.selModel.productsizeValue}}</div>
                        <div class="pnum"><span class="price">&yen;{{item.selModel.price || item.price}}</span><span>&#120;{{item.num}}</span></div>
                    </div>
                </li>
            </ul>
            <div class="other-box">
                <div class="delivery">
                    <div class="name"><label>配送方式</label></div>
                    <div>快递免运费</div>
                </div>
                <div class="delivery" v-if="credit.creditRule.status == 0 && proPrice >= credit.creditRule.orderprice">
                    <div class="name">
                        <label>积分</label>
                        <span v-if="credit.user.credit > credit.creditRule.creditcanuse">共有{{credit.user.credit}}积分，可用{{credit.madeCredit.usable}}积分，抵&yen;{{credit.madeCredit.diCountYen}}</span>
                        <span class="jifen" @click="showDesc" v-else>共有{{credit.user.credit}}积分，满{{credit.creditRule.creditcanuse}}可用</span>
                    </div>
                    <div><mt-switch v-model="credit.madeCredit.isMade" @change="openCloseCredit"></mt-switch></div>
                </div>
                <div class="jifen-made" v-if="credit.madeCredit.isMade">
                    <span>使用</span>
                    <span class="ddl_jifen" @click="jifenVisible = true">{{credit.madeCredit.Number}}</span>
                    <span>积分</span>
                    <span>，抵</span>
                    <span class="jifen rmb" @click="showDesc">&yen;{{credit.madeCredit.diYen}}.00</span>
                </div>
            </div>
        </div>

        <div class="totalprice">
            <ul class="price-item">
                <li><span>商品金额</span><span>&yen;{{proPrice}}</span></li>
                <li v-if="balance > 0"><span>余额</span><span>-&yen;{{balance}}</span></li>
                <li v-if="credit.madeCredit.isMade && credit.madeCredit.diYen > 0"><span>积分</span><span>-&yen;{{credit.madeCredit.diYen}}.00</span></li>
                <li><span>运费</span><span>+&yen;0.00</span></li>
            </ul>
            <div class="total">
                合计：<span>{{totalPrice}}</span>
            </div>
        </div>

        <div class="totalbox">
            <div class="amount">合计：<span>&yen;{{totalPrice}}</span></div>
            <div class="btn" @click="submitOrder">提交订单</div>
        </div>

        <mt-popup v-model="jifenVisible" class="jifen-select" position="bottom">
            <div class="btn-box">
                <span class="btn-cancel" @click="jifenVisible = false">取消</span>
                <span></span>
                <span class="btn-sure" @click="btn_ok">确定</span>
            </div>
            <mt-picker :slots="jifenSlots" @change="onValuesChange" :visibleItemCount="3"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
export default {
    name: 'OrderBooking',
    data () {
        return {
            isAddr: 0,
            buytype: '',
            dataList: [],
            proPrice: 0,
            totalPrice: 0,
            addrInfo: {},
            isSubmited: false,
            credit: {
                madeCredit: {
                    isMade: false,
                    Number: 0,
                    usable: 0,
                    diYen: 0,
                    diCountYen: 0
                },
                creditRule: {},
                user: {}
            },
            balance: 0,
            pickerValue: 0,
            jifenVisible: false,
            jifenSlots: [{
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
            }]
        }
    },
    methods: {
        toNewAddr: function () {
            this.$router.push({
                path: '/my/newaddress'
            })
        },
        toAddrList: function (id) {
            this.$router.push({
                path: '/my/myaddress?id=' + id + '&ty=' + this.buytype
            })
        },
        onValuesChange (picker, v) {
            this.pickerValue = v[0]
        },
        openCloseCredit: function () {
            this.countPrice()
        },
        btn_ok: function () {
            this.credit.madeCredit.Number = this.pickerValue || 0
            this.jifenVisible = false
            this.credit.madeCredit.diYen = this.credit.madeCredit.Number / this.credit.creditRule.creditunit
            this.countPrice()
        },
        toOrderList: function (e) {
            this.$router.push({
                path: '/my/myorderlist?ty=' + e
            })
        },
        submitOrder: function () {
            if (this.isSubmited) {
                return false
            } else if (this.addrInfo && this.addrInfo.id) {
                this.Indicator.open()
                this.isSubmited = true
                let pids = ''
                let nums = ''
                let _models = ''
                for (let i in this.dataList) {
                    if (i > 0) {
                        pids = pids + ','
                        nums = nums + ','
                    }
                    pids += this.dataList[i].id
                    nums += this.dataList[i].num
                    if (this.dataList[i].selModel && this.dataList[i].selModel.id) {
                        if (_models.length > 0) {
                            _models = _models + ','
                        }
                        _models += this.dataList[i].selModel.id
                    }
                }

                this.$http.get(this.apis + '/order/addOrderAjaxNew', {params: {
                    openid: sessionStorage.getItem('openID'),
                    address: this.addrInfo.id,
                    productIds: pids,
                    buyproductNumbers: nums,
                    productcolorsizestocks: _models,
                    useCredit: this.credit.madeCredit.isMade ? 1 : 0,
                    useCreditNumber: this.credit.madeCredit.Number
                }})
                .then(res => {
                    console.log(res)
                    if (res && res.data) {
                        if (res.data.code === 1) {
                            console.log(res.data.obj)
                            this.wxPay(res.data.obj[0])
                        } else if (res.data.code === 2) {
                            this.$messagebox('库存不足')
                            this.Indicator.close()
                            this.isSubmited = false
                        } else if (res.data.code === 3) {
                            this.$messagebox('下单成功')
                            this.Indicator.close()
                            this.isSubmited = false
                            this.toOrderList(1)
                        } else {
                            this.$messagebox(res.data.msg)
                            this.Indicator.close()
                            this.isSubmited = false
                            this.toOrderList(0)
                        }
                    } else {
                        this.$messagebox('提交失败')
                        this.Indicator.close()
                        this.isSubmited = false
                    }
                })
                .catch(e => {
                    this.Indicator.close()
                    this.isSubmited = false
                })
            } else {
                this.$messagebox('请选择收货地址')
                this.isSubmited = false
            }
        },
        getAddr: function () {
            this.$http.get(this.apis + '/address/getCustomerAddressByOpenIdAjax', {params: {
                openId: sessionStorage.getItem('openID')
            }})
            .then(res => {
                if (res && res.data && res.data.code === 1) {
                    let _data = res.data.obj
                    for (let i in _data) {
                        if (_data[i].status === 1) {
                            this.addrInfo = _data[i]
                            this.isAddr = true
                        }
                    }
                }
            })
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
                    this.toOrderList(0)
                }
            })
            .catch(e => {
                this.Indicator.close()
                this.Toast('微信支付调用失败')
                this.isSubmited = false
                this.toOrderList(0)
            })
        },
        countPrice () {
            if (this.credit.creditRule.status === 0 && this.credit.madeCredit.isMade === true) {
                this.totalPrice = keepTwoDecimal(this.proPrice - this.credit.madeCredit.diYen - this.balance)
            } else {
                this.totalPrice = keepTwoDecimal(this.proPrice - this.balance)
            }
        },
        showDesc () {
            this.$messagebox('温馨提示', this.credit.creditRule.description)
        }
    },
    beforeMount () {
        this.$store.state.menu = false
        this.buytype = this.$route.query.ty
        if (this.buytype === 'cart') {
            let pros = sessionStorage.getItem('cart')
            if (pros) {
                let _list = JSON.parse(pros)
                for (let i in _list) {
                    if (_list[i].issel) {
                        this.dataList.push(_list[i])
                        this.proPrice += keepTwoDecimal(this.totalPrice + (_list[i].selModel.price || _list[i].price) * _list[i].num)
                    }
                }
            }
        } else {
            let pros = sessionStorage.getItem('buy')
            if (pros) {
                let pro = JSON.parse(pros)
                this.proPrice = keepTwoDecimal(this.totalPrice + (pro.selModel.price || pro.price) * pro.num)
                this.dataList = [pro]
            }
        }
        this.totalPrice = this.proPrice
        let selAddr = this.$route.query.selAddr
        if (selAddr) {
            this.addrInfo = JSON.parse(sessionStorage.getItem('selAddr'))
            this.isAddr = true
        } else {
            this.getAddr()
        }

        let _user = sessionStorage.getItem('user')
        if (_user) {
            this.credit.user = JSON.parse(_user)
        }

        this.$http.get(this.apis + '/creditrule/findCreditRule', {params: {
            userid: this.credit.user.id
        }})
        .then(res => {
            if (res && res.data && res.data.code === 1) {
                this.credit.creditRule = res.data.obj.creditRule
                console.log(res.data.obj)
                const rule = this.credit.creditRule
                this.credit.user.credit = res.data.obj.userCredit
                this.balance = res.data.obj.balance
                if (rule.status === 0) {
                    let arr = []
                    // rule.creditunit
                    for (let i = 0; i <= this.credit.user.credit; i += rule.creditunit) {
                        if (this.proPrice / 2 > (i / this.credit.creditRule.creditunit)) {
                            arr.push(i)
                        } else {
                            break
                        }
                    }
                    if (arr.length > 0) {
                        this.jifenSlots[0].values = arr
                        this.credit.madeCredit.usable = arr[arr.length - 1]
                        this.credit.madeCredit.diCountYen = this.credit.madeCredit.usable / this.credit.creditRule.creditunit
                    }
                }
            }
            this.countPrice()
        })
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
                vue.toOrderList(1)
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                vue.Toast('取消支付')
                vue.toOrderList(0)
            } else {
                vue.Toast('支付失败')
                vue.toOrderList(0)
            }
        }
    )
}

function keepTwoDecimal (num) {
    var result = parseFloat(num)
    if (isNaN(result)) {
        return 0
    }
    result = Math.round(num * 100) / 100
    if (result) {
        return result.toFixed(2)
    } else {
        return 0.00
    }
}

</script>

<style lang="scss">
    .orderbooking-box{
        height: 100%;
        background-color: #f9f9f9;
        .addr-box{
            padding: .2rem .6rem;
            background: url('../assets/images/right.png') no-repeat center;
            background-position-x: 7rem;
            background-size: .32rem;
            background-color: #fff;
            border-bottom: .04rem dashed #777;
            .namephone{
                display: flex;
                justify-content: space-between;
                color: #000;
                font-size: .28rem;
                font-family: '黑体', sans-serif;
                font-weight: bold;
                position: relative;
            }
            .namephone::before{
                content: '';
                position: absolute;
                top: 0;
                left: -.4rem;
                width: .4rem;
                height: .4rem;
                background: url('../assets/images/site.png') no-repeat center;
                background-size: .24rem;
            }
            .addr-info{
                margin-top: .1rem;
                color: #777;
            }
            .newaddr{
                display: flex;
                line-height: .6rem;
                .btn{
                    width: .6rem;
                    height: .6rem;
                    background: url('../assets/images/jia.png') no-repeat center;
                    background-color: #f00;
                    background-size: .42rem;
                    color: #fff;
                    font-size: .64rem;
                    text-align: center;
                    margin-right: .2rem;
                    border-radius: .1rem;
                    box-sizing: border-box;
                }
            }
        }
        .products-box{
            margin-top: .2rem;
            .storename{
                height: .8rem;
                line-height: .8rem;
                color: #333;
                padding-left: .6rem;
                background: url('../assets/images/store.png') no-repeat center;
                background-position-x: .3rem;
                background-size: .26rem;
                background-color: #fff;
            }
            .product-list{
                padding: 0 .2rem;
                box-sizing: border-box;
                li{
                    display: flex;
                    padding: .2rem 0;
                    box-sizing: border-box;
                    .proimg {
                        width: 1.4rem;
                        height: 1.4rem;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .proinfo{
                        width: 5.7rem;
                        padding: .1rem 0 0 .2rem;
                        box-sizing: border-box;
                        .name{
                            font-weight: bold;
                        }
                        .attr{
                            height: .3rem;
                            color: #777;
                            margin: .1rem 0;
                        }
                        .pnum{
                            margin-top: .1rem;
                            display: flex;
                            justify-content: space-between;
                            .price{
                                color: #f00;
                            }
                        }
                    }
                }
            }
            .other-box{
                padding: 0 .2rem;
                background-color: #fff;
                .delivery{
                    display: flex;
                    height: .8rem;
                    line-height: .8rem;
                    justify-content: space-between;
                    border-top: .02rem solid #ddd;
                    box-sizing: border-box;
                    .name{
                        display: flex;
                        label{
                            min-width: 1rem;
                        }
                        .cur{
                            font-weight: bold;
                        }
                    }
                    .mint-switch{
                        top: .18rem;
                        height: .4rem;
                        .mint-switch-core{
                            height: .44rem;
                        }
                        .mint-switch-input:checked + .mint-switch-core {
                            border-color: #1AAD19;
                            background-color: #1AAD19;
                        }
                        .mint-switch-input:checked + .mint-switch-core::after {
                            transform: translateX(30px);
                        }
                        .mint-switch-core::before{
                            height: .4rem;
                        }
                        .mint-switch-core::after {
                            width: .4rem;
                            height: .4rem;
                        }
                    }
                }
                .delivery:first-child{
                    border: 0;
                }
                .jifen-made{
                    display: flex;
                    height: .8rem;
                    line-height: .8rem;
                    .ddl_jifen{
                        margin: .2rem .1rem 0 .1rem;
                        min-width: 1rem;
                        height: .4rem;
                        line-height: .4rem;
                        border: .02rem solid #ccc;
                        padding: 0 .4rem 0 .1rem;
                        position: relative;
                        box-sizing: border-box;
                    }
                    .ddl_jifen::after{
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: .4rem;
                        height: .4rem;
                        background: url('../assets/images/right.png') no-repeat center;
                        background-size: .3rem;
                        transform: rotate(90deg);
                    }
                    .rmb{
                        color: #f00000;
                    }
                }
                .jifen::after{
                    content: "?";
                    color: #666;
                    font-size: .24rem;
                    display: inline-block;
                    width: .24rem;
                    height: .24rem;
                    line-height: .24rem;
                    text-align: center;
                    border-radius: .24rem;
                    border: .02rem solid #666;
                    margin-left: .1rem;
                }
            }
        }
        .totalprice{
            margin-top: .2rem;
            background-color: #fff;
            padding-left: .2rem;
            box-sizing: border-box;
            .price-item{
                padding: .1rem .2rem .1rem 0;
                border-bottom: .02rem solid #ddd;
                li{
                    display: flex;
                    justify-content: space-between;
                    font-size: .2rem;
                    line-height: .5rem;
                }
            }
            .total{
                text-align: right;
                color: #777;
                height: .8rem;
                line-height: .8rem;
                padding-right: .2rem;
                box-sizing: border-box;
                span{
                    color: #f00;
                }
            }
        }
        .totalbox{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: .9rem;
            line-height: .9rem;
            background-color: #fff;
            display: flex;
            font-size: .28rem;
            .amount{
                width: 5.5rem;
                text-align: right;
                color: #333;
                border-top: .02rem solid #eee;
                box-sizing: border-box;
                padding-right: .2rem;
                span{
                    color: #f00;
                }
            }
            .btn{
                width: 2rem;
                text-align: center;
                color: #fff;
                background-color: #f00;
            }
            .btn:active{
                background-color: #DA0000;
            }
        }
        .jifen-select{
            width: 100%;
            height: 138px;
            .btn-box{
                display: flex;
                height: 30px;
                justify-content: space-around;
                align-items: center;
                box-shadow: 2px 2px 4px #ddd;
                span{
                    padding: 0 20px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 5px;
                }
                .btn-cancel{
                    background-color: #ddd;
                }
                .btn-sure{
                    background-color: #c71f2c;
                    color: #fff;
                }
            }
        }
    }
</style>
