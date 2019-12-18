<template>
    <div id="List" class="listbox">
        <div :class='"listbox-video" + (isplay? "" : " play-video")' v-if="videoSrc" @click="playVideo">
            <img :src="videoPoster" v-show="!isplay" @click="playend" alt="">
            <video id="video" v-show="isplay" :src="videoSrc" @click="playend" controls x-webkit-airplay="true" x5-playsinline="true" webkit-playsinline="true" playsinline="true"></video>
        </div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="listbox-list">
            <li v-for="(pro, index) in proList" :key="index"  @click='toinfo(pro.id)' class="listbox-item">
                <div class="listbox-item-img">
                    <span v-if="pro.stock <= 0">已售罄</span>
                    <img :src='pro.pic' alt="">
                </div>
                <div class="listbox-item-lf listbox-item-xilie">
                    {{pro.name}}
                </div>
                <template v-if="pro.needattr == 0">
                    <div class="listbox-item-lf listbox-item-price"><span>&yen;</span>{{pro.price}}</div>
                </template>
                <template v-else-if="pro.productColorSizeStocks && pro.productColorSizeStocks.length > 0">
                    <div class="listbox-item-lf listbox-item-price"><span>&yen;</span>{{pro.productColorSizeStocks[0].price}}</div>
                </template>
            </li>
        </ul>
        <div v-show="!allLoaded" slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">上拉加载更多↑</span>
            <span v-show="bottomStatus === 'loading'">Loading...</span>
        </div>
        </mt-loadmore>
        <div v-show="allLoaded" class="loadmore">————我是有底线的————</div>
    </div>
</template>

<script>
// import Jsmpeg from 'jsmpeg'
export default {
    name: 'List',
    data () {
        return {
            proList: [],
            id: '',
            page: 1,
            formtype: 0,
            bottomStatus: '',
            allLoaded: false,
            videoSrc: '',
            videoPoster: '',
            wxCode: '',
            wxOpenID: '',
            isLoading: false,
            isplay: false
        }
    },
    beforeMount () {
        this.$store.state.menu = true
        this.id = this.$route.query.id || 0
        this.wxCode = getUrlParams('code')
        if (this.wxCode) {
            sessionStorage.setItem('wxcode', this.wxCode)
        } else {
            // this.wxCode = sessionStorage.getItem('wxcode') || '061OFK2B1RRWLb0QIr2B1O9N2B1OFK2X'
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx39a01f81408fb9c8&redirect_uri=http%3A%2F%2Fwww.lovzvzu.com%2Findex.html%23% %2Flist%3Fid%3D' + this.id + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
        }
        this.loadBottom()
    },
    methods: {
        toinfo: function (id) {
            this.$router.push({
                path: '/home/info?id=' + id
            })
        },
        loadMore: function () {
            if (!this.isLoading && !this.allLoaded) {
                this.isLoading = true
                this.$http.get(this.apis + '/product/findProductByCategorySecond', {params: {
                    'categorysecond': this.id,
                    'code': this.wxCode,
                    'page': this.page,
                    'pageSize': 6
                }})
                .then(res => {
                    console.log(res)
                    this.isLoading = false
                    if (res && res.data && res.data.code === 1) {
                        if (!this.wxOpenID) {
                            this.wxOpenID = res.data.obj.openid
                            sessionStorage.setItem('openID', this.wxOpenID)
                        }
                        var data = res.data.obj
                        if (data.user) {
                            sessionStorage.setItem('user', JSON.stringify(data.user))
                        }
                        if (data.productCategory && data.productCategory.video) {
                            this.videoSrc = data.productCategory.video
                            this.videoPoster = data.productCategory.videoPoster
                        }
                        if (this.page === 1) {
                            this.proList = data.products
                        } else {
                            this.proList = this.proList.concat(data.products)
                        }
                        this.page = this.page + 1
                        if (data.products.length < 6) {
                            this.allLoaded = true// if all data are loaded
                        }
                        if (this.page === 2) {
                            setTimeout(function () {
                                window.scrollTo(0, 0)
                            }, 1)
                            var img = this.proList[0].pic
                            var name = this.proList[0].name
                            getSign(this, name, img, this.id)
                        }
                    } else {
                        this.allLoaded = true// if all data are loaded
                    }
                    this.bottomStatus = ''
                    this.$refs.loadmore.onBottomLoaded()
                })
            }
        },
        loadBottom: function () {
            this.bottomStatus = 'loading'
            if (this.wxCode) {
                this.loadMore()
            }
        },
        playend: function (e) {
            var _video = document.getElementById('video')
            if (e.target.paused) {
                _video.play()
            } else {
                _video.pause()
            }
        },
        playVideo: function () {
            let _video = document.getElementById('video')
            _video.play()
            this.isplay = true
        }
    }
}

// function videoReday (vue) {
//     var canvas = document.querySelector('#canvas')
//     // 注意这里需要将video.mp4转换成ts格式的文件 才能生效
//     var player = new Jsmpeg.Player('video.ts', { canvas: canvas, loop: false, autoplay: false, audio: true })
//     player.audioOut.unlock(onUnlocked)
//     player.play()

//     //  onUnlocked方法
//     function onUnlocked () {
//         player.volume = 1
//     }
// }

// document.addEventListener('WeixinJSBridgeReady', function () {
//     setTimeout(function () {
//         var _video = document.getElementById('video')
//         if (_video && _video.paused) {
//             console.log(_video)
//             _video.play()
//         }
//     }, 2000)
// })

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
        shareLink: 'http://www.lovzvzu.com/index.html#/home/list?id=' + id,
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
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
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
        // 分享到朋友圈;
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
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
        return r[2]
    }
    return null
}
</script>

<style lang="scss">
    .listbox{
        background-color: #efefef;
        padding: .1rem .2rem .9rem .2rem;
        box-sizing: border-box;
        height: 100%;
        .listbox-video{
            margin-bottom: .1rem;
            position: relative;
            video{
                width: 100%;
            }
            img{
                width: 100%;
                display: block;
            }
        }
        .play-video::after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 111;
            background: url(../../assets/images/play.png) no-repeat center;
            background-color: rgba(0,0,0,.3);
        }
        .listbox-list{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .listbox-item{
                width: 3.44rem;
                height: 4.4rem;
                background-color: #fff;
                margin-bottom: .2rem;
                .listbox-item-img{
                    position: relative;
                    height: 3.44rem;
                    img{
                        display: block;
                        width: 100%;
                    }
                    span{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 1rem;
                        height: .5rem;
                        line-height: .5rem;
                        background-color: rgba(0,0,0,.5);
                        color: #fff;
                        text-align: center;
                    }
                }
                .listbox-item-lf{
                    height: .4rem;
                    padding-left: .2rem;
                    box-sizing: border-box;
                    color: #333;
                    font-size: .28rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .listbox-item-price{
                    height: .4rem;
                    line-height: .4rem;
                    margin-top: .08rem;
                    color: #c71f2c;
                    font-size: .28rem;
                    background: url('../../assets/images/cart_cur.png') no-repeat;
                    background-position: 2.9rem center;
                    background-size: auto .4rem;
                    span{
                        font-size: .2rem;
                    }
                }
            }
        }
        .mint-loadmore-bottom{
            margin: 0
        }
        .loadmore{
            margin: .2rem auto;
            color: #999;
            text-align: center;
        }
    }
</style>
