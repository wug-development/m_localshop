<template>
    <div id="Info" class="infobox">
        <SBanner :dataList = 'pro.imgsLunbo' class="infobox-banner" :height='7.5'></SBanner>
        <div class="info-pro-box info-pro-nameprice">
            <div class="info-pro-name">{{pro.name}}</div>
            <div class="info-pro-price">&yen;{{(pro.selModel && pro.selModel.price) || pro.price}}</div>
        </div>
        <div class="info-pro-box info-pro-service">
            <span>服务承诺</span>&nbsp;&nbsp;&nbsp;&nbsp;官方正品&nbsp;&nbsp;免邮配送&nbsp;&nbsp;同城速递
        </div>
        <div class="info-pro-box info-pro-sel" v-if="pro.selModel && pro.selModel.productcolorValue" @click="ShowSelShow">
            <span>已选</span>
            <template v-if="pro.selModel">
                <label v-if='pro.selModel'>{{pro.selModel.productcolorValue}}</label>
                <label v-if='pro.selModel'>{{pro.selModel.productsizeValue}}</label>
            </template>
        </div>
        <div class="info-pro-box info-pro-detail" v-if="pro.imgsDetail">
            <div class="info-pro-detail-tab">商品详情</div>
            <div class="info-pro-detail-img">
                <div v-for="(img, i) in pro.imgsDetail" :key="i">
                    <img :src="img" alt="">
                </div>
            </div>
        </div>
        <div class="info-pro-btnbox">
            <ul class="info-pro-btnbox-list">
                <li class="btnbox-item-img btnbox-item-index" @click="toHome">列表</li>
                <li class="btnbox-item-img btnbox-item-cart" @click="toCart">
                    <span v-if="cartNum>0">{{cartNum}}</span>购物车
                </li>
                <template v-if="pro.stock > 0">
                <li class="btnbox-item-txt btnbox-item-addcart"  @click="addCart">加入购物车</li>
                <li class="btnbox-item-txt btnbox-item-buynow" @click="buyNow">立即购买</li>
                </template>
                <template v-if="pro.stock <= 0">
                <li class="btnbox-item-end">已售罄</li>
                </template>
            </ul>
        </div>
        <SelColor :isShow='SelColorIsShow' :pro='pro' v-on:close="SelColorIsShow=false"></SelColor>
    </div>
</template>

<script>
import SBanner from '../../components/common/Swipe.vue'
import SelColor from '../../components/common/ProSelColor.vue'

export default {
    name: 'Info',
    data () {
        return {
            id: 0,
            pro: {
                selModel: {}
            },
            SelColorIsShow: false,
            cartNum: 0,
            wxCode: '',
            wxOpenID: ''
        }
    },
    components: {
        SBanner,
        SelColor
    },
    beforeMount () {
        this.$store.state.menu = false
        this.id = this.$route.query.id
        const modelID = this.$route.query.mid
        var isshare = getUrlParams('isshare')
        if (isshare === '1') {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx39a01f81408fb9c8&redirect_uri=http%3A%2F%2Fwww.lovzvzu.com%2Findex.html%23%2Fhome%2Finfo%3Fid%3D' + this.id + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
        }
        this.wxCode = getUrlParameter('code')
        if (this.wxCode) {
            sessionStorage.setItem('wxcode', this.wxCode)
            this.$http.get(this.apis + '/product/getOpenIdByCode', {params: {
                'code': this.wxCode
            }})
            .then(res => {
                console.log(res)
                if (res && res.data && res.data.code === 1) {
                    this.wxOpenID = res.data.obj
                    sessionStorage.setItem('openID', this.wxOpenID)
                }
            })
        }
        this.$http.get(this.apis + '/product/findProductById', {params: {
            'productId': this.id
        }})
        .then(res => {
            console.log(res)
            if (res && res.data && res.data.code === 1) {
                var data = res.data.obj.product
                if (res.data.obj.user) {
                    sessionStorage.setItem('user', JSON.stringify(res.data.obj.user))
                }
                data.selModel = {}
                if (data.productColorSizeStocks && data.productColorSizeStocks.length > 0) {
                    if (modelID) {
                        for (let i in data.productColorSizeStocks) {
                            if (Number(data.productColorSizeStocks[i].id) === Number(modelID)) {
                                data.selModel = data.productColorSizeStocks[i]
                                break
                            }
                        }
                    } else {
                        data.selModel = data.productColorSizeStocks[0]
                    }
                }
                console.log(data.selModel.price)
                this.pro = data
                var img = data.pic
                var name = data.name
                getSign(this, name, img, data.id)
            }
        })

        var s = sessionStorage.getItem('cart')
        var pros = []
        if (s) {
            pros = JSON.parse(s)
            this.cartNum = pros.length
        }
    },
    methods: {
        toHome: function () {
            this.$router.push({
                path: '/home/list?id=0'
            })
        },
        toCart: function () {
            this.$router.push({
                path: '/cart'
            })
        },
        addCart: function () {
            // if (this.pro.selModel) {
                this.ShowSelShow()
            // } else {
            //     sessionStorage.setItem('cart', JSON.stringify(pros))
            //     this.Toast('加入成功！')
            // }
        },
        buyNow: function () {
            this.pro.num = 1
            sessionStorage.setItem('buy', JSON.stringify(this.pro))
            this.$router.push({
                path: '/orderbooking?ty=buy'
            })
        },
        ShowSelShow: function () {
            this.SelColorIsShow = true
        }
    }
}

function getSign (vue, shareDesc, shareImg, id) {
    var RO_WX = {
        // 时间戳
        timeStamp: function () {
            var timestamp = new Date().getTime()
            var times1 = parseInt(parseInt(timestamp) / 1000)
            var timestampstring = times1.toString() // 一定要转换字符串
            RO_WX.oldTimeStamp = window.oldTimeStamp = timestampstring
            return timestampstring
        },
        // 随机串
        nonceStr: function () {
            var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            var maxPos = $chars.length
            var noceStr = ''
            for (var i = 0; i < 32; i++) {
                noceStr += $chars.charAt(Math.floor(Math.random() * maxPos))
            }
            RO_WX.oldNonceStr = window.oldNonceStr = noceStr
            return noceStr
        }
    }

    var timeStamp = RO_WX.timeStamp()
    var nonceStr = RO_WX.nonceStr()
    vue.$http.get(vue.apis + '/payWeixin/getJsSignature', {params: {
        timestamp: timeStamp,
        noncestr: nonceStr,
        url: window.location.href.split('#')[0]
    }})
    .then(res => {
        if (res && res.data) {
            wxInitShare(res.data.obj, timeStamp, nonceStr, shareDesc, shareImg, id)
        }
    })
}

function wxInitShare (obj, timeStamp, nonceStr, shareDesc, shareImg, id) {
    var wxDatas = {
        appID: 'wx39a01f81408fb9c8',
        timeStamp: timeStamp,
        nonceStr: nonceStr,
        shareLink: 'http://www.lovzvzu.com/index.html#/home/info?id=' + id + '&isshare=1',
        shareTitle: 'LOVZVZU 商城',
        shareDesc: shareDesc,
        shareImg: shareImg
    }

    window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wxDatas.appID, // 必填，公众号的唯一标识
        timestamp: wxDatas.timeStamp, // 必填，生成签名的时间戳
        nonceStr: wxDatas.nonceStr, // 必填，生成签名的随机串
        signature: obj.signature, // 必填，签名
        jsApiList: ['onMenuShareAppMessage', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
    })

    window.wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
        // 分享朋友
        window.wx.onMenuShareAppMessage({
            title: wxDatas.shareTitle, // 分享标题
            desc: wxDatas.shareDesc, // 分享描述
            link: wxDatas.shareLink, // 分享链接
            imgUrl: wxDatas.shareImg,
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        })
        // 分享朋友圈
        window.wx.updateTimelineShareData({
            title: wxDatas.shareTitle, // 分享标题
            link: wxDatas.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: wxDatas.shareImg, // 分享图标
            success: function () {
            // 设置成功
            }
        })
    })
}

function getUrlParams (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.hash.substr(1).match(reg)
    if (r != null) {
        return r[2]
    }
    return null
}

function getUrlParameter (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
        return r[2]
    }
    return null
}
</script>

<style lang="scss">
    .infobox{
        background-color: #f5f5f5;
        padding-bottom: .9rem;
        min-height: 100%;
        box-sizing: border-box;
        .infobox-banner{
            background-color: #f5f5f5;
        }
        .info-pro-box{
            padding: .16rem .24rem;
            background-color: #fff;
            border-bottom: .02rem solid #efefef;
        }
        .info-pro-nameprice{
            padding: .24rem;
            font-size: .28rem;
            line-height: .32rem;
            font-weight: bold;
            .info-pro-name{
                color: #000;
            }
            .info-pro-price{
                padding-top: .2rem;
                color: #f00000;
                font-size: .3rem;
            }
        }
        .info-pro-service{
            font-size: .24rem;
            height: .6rem;
            line-height: .68rem;
            display: flex;
            span{
                color: #09BB07;
                font-weight: bold;
                padding-left: .36rem;
                background: url('../../assets/images/safe.png') no-repeat;
                background-position: left center;
                background-size: auto .30rem;
            }
        }
        .info-pro-sel{
            font-size: .28rem;
            line-height: .68rem;
            height: .6rem;
            position: relative;
            span{
                color: #999;
                font-size: .28rem;
            }
            label{
                margin-left: .2rem;
            }
        }
        .info-pro-sel::after{
            content: ' ';
            width: .48rem;
            height: .48rem;
            display: block;
            background: url('../../assets/images/right.png') no-repeat center;
            background-size: auto 100%;
            position: absolute;
            top: 0.22rem;
            right: 0.1rem;
        }
        .info-pro-cur::after{
            content: ' ';
            width: .48rem;
            height: .48rem;
            display: block;
            background: url('../../assets/images/more.png') no-repeat center;
            background-size: auto 100%;
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;
        }
        .info-pro-detail{
            margin-top: .1rem;
            padding: 0 .24rem;
            .info-pro-detail-tab{
                text-align: center;
                font-size: .28rem;
                border-bottom: .02rem solid #efefef;
                height: .9rem;
                line-height: .9rem;
            }
            .info-pro-detail-img{
                img{
                    display: block;
                    max-width: 100%;
                }
            }
        }
        .info-pro-btnbox{
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 9;
            background-color: #fff;
            height: .9rem;
            width: 7.5rem;
            .info-pro-btnbox-list{
                width: 7.5rem;
                display: flex;
                text-align: center;
                line-height: .9rem;
                .btnbox-item-img{
                    width: 1.5rem;
                    color: #414141;
                    line-height: 1.4rem;
                    font-size: .2rem;
                    border-top: .01rem solid #efefef;
                    box-sizing: border-box;
                }
                .btnbox-item-index{
                    background: url('../../assets/images/info-index.png') no-repeat;
                    background-size: .4rem;
                    background-position: center .08rem;
                }
                .btnbox-item-service{
                    background: url('../../assets/images/info-service.png') no-repeat;
                    background-size: .4rem;
                    background-position: center .08rem;
                }
                .btnbox-item-cart{
                    background: url('../../assets/images/info-cart.png') no-repeat;
                    background-size: .4rem;
                    background-position: center .08rem;
                    position: relative;
                    span{
                        position: absolute;
                        top: .06rem;
                        right: .26rem;
                        width: .24rem;
                        height: .24rem;
                        border-radius: .24rem;
                        background-color: #c71f2c;
                        color: #fff;
                        line-height: .24rem;
                        font-size: .16rem;
                        text-align: center;
                        display: block;
                    }
                }
                .btnbox-item-txt{
                    width: 2.25rem;
                    color: #fff;
                    font-size: .28rem;
                }
                .btnbox-item-buynow{
                    background-color: #c71f2c;
                }
                .btnbox-item-addcart{
                    background-color: #414141;
                }
                .btnbox-item-end{
                    width: 4.5rem;
                    background-color: #414141;
                    color: #fff;
                    font-size: .28rem;
                }
            }
        }
    }
</style>
