<template>
    <div id="Cart" class="cartbox">
        <template v-if="dataList.length">
        <ul class="cartbox-list">
            <li class="cartbox-item" v-for="(item, index) in dataList" :key="index" @touchstart="showDeleteButton(item)" @touchend="clearLoop">
                <div :class='(item.issel ? "cur ": "") + "cartbox-item-radio"' @click="checkOne(item)"></div>
                <div class="cartbox-item-img">
                    <img :src="item.selModel.productcolorImage || item.pic" alt="">
                </div>
                <div class="cartbox-item-name">
                    <div class="item-name-xilie">{{item.name}}</div>
                    <div class="item-name-name">{{item.selModel.productcolorValue}} {{item.selModel.productsizeValue}}</div>
                    <div class="item-name-price">
                        <span>&yen; {{item.selModel.price || item.price}}</span>
                        <div class="item-name-num">
                            <div class="num-jian" @click="jian(index)"><img src="../assets/images/jian.png" alt=""></div>
                            <div class="num-num"><input type="tel" v-model="item.num" readonly /></div>
                            <div class="num-jia" @click="jia(index)">+</div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="amountbox">
            <div :class="isAll?'sel cur':'sel'" @click="selAll">全选</div>
            <div class="total">合计：<span>&yen; {{totalPrice}}</span></div>
            <div :class="isCheck?'btn cur':'btn'" @click="submitCart">结算</div>
        </div>
        </template>
        <template v-if="!dataList.length">
            <div class="cart-null-box">
                <div class="tit">购物车快饿扁了 T.T</div>
                <div class="other">快给我挑点宝贝</div>
                <div class="btn" @click="toPage">去逛逛</div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'Cart',
    data () {
        return {
            dataList: [],
            isAll: true,
            isCheck: false,
            Loop: 0,
            isDeleting: false,
            totalPrice: 0
        }
    },
    methods: {
        showDeleteButton: function (item) {
            clearInterval(this.Loop)
            this.Loop = setTimeout(() => {
                this.deletePro(item)
            }, 1000)
        },
        clearLoop: function () {
            clearInterval(this.Loop)
        },
        deletePro: function (item) {
            this.$messagebox({message: '是否删除该商品？', showCancelButton: true}).then(action => {
                let _pros = sessionStorage.getItem('cart')
                if (_pros) {
                    let _data = JSON.parse(_pros)
                    for (let i in _data) {
                        if (_data[i].id === item.id) {
                            _data.splice(i, 1)
                            console.log(_data)
                            sessionStorage.setItem('cart', JSON.stringify(_data))
                            this.showData()
                            break
                        }
                    }
                }
            })
        },
        selAll: function () {
            this.isAll = !this.isAll
            for (var i in this.dataList) {
                this.dataList[i].issel = this.isAll
            }
            this.isCheck = this.isAll
            sessionStorage.setItem('cart', JSON.stringify(this.dataList))
            this.countPrice()
        },
        checkOne: function (item) {
            item.issel = !item.issel
            var issels = true
            for (var i in this.dataList) {
                if (!this.dataList[i].issel) {
                    issels = false
                    this.isCheck = false
                } else {
                    this.isCheck = true
                }
            }
            this.isAll = issels
            sessionStorage.setItem('cart', JSON.stringify(this.dataList))
            this.countPrice()
        },
        showData: function () {
            var pros = sessionStorage.getItem('cart')
            if (pros) {
                this.dataList = JSON.parse(pros)
                this.countPrice()
            }
        },
        countPrice: function () {
            this.totalPrice = 0
            for (var i in this.dataList) {
                if (this.dataList[i].issel) {
                    this.isCheck = true
                    this.totalPrice = keepTwoDecimal(this.totalPrice + (this.dataList[i].selModel.price || this.dataList[i].price) * this.dataList[i].num)
                } else {
                    this.isAll = false
                }
            }
        },
        jia: function (i) {
            if (this.dataList[i].selModel.stock) {
                if (this.dataList[i].num < this.dataList[i].selModel.stock) {
                    this.dataList[i].num = this.dataList[i].num + 1
                    sessionStorage.setItem('cart', JSON.stringify(this.dataList))
                    this.countPrice()
                } else {
                    this.Toast('该商品库存不足最多可买数量' + this.dataList[i].selModel.stock)
                }
            } else {
                if (this.dataList[i].num < this.dataList[i].stock) {
                    this.dataList[i].num = this.dataList[i].num + 1
                    sessionStorage.setItem('cart', JSON.stringify(this.dataList))
                    this.countPrice()
                } else {
                    this.Toast('该商品库存不足最多可买数量' + this.dataList[i].stock)
                }
            }
        },
        jian: function (i) {
            if (this.dataList[i].num > 1) {
                this.dataList[i].num = this.dataList[i].num - 1
                sessionStorage.setItem('cart', JSON.stringify(this.dataList))
                this.countPrice()
            }
        },
        submitCart: function () {
            if (this.isCheck) {
                this.$router.push({
                    path: '/orderbooking?ty=cart'
                })
            }
        },
        toPage: function () {
            this.$router.push({
                path: '/home/list?id=0'
            })
        }
    },
    beforeMount () {
        this.dataList = []
        this.$store.state.menu = true
        this.$store.state.menuCur = 3
        this.showData()
    }
}

function keepTwoDecimal (num) {
    var result = parseFloat(num)
    if (isNaN(result)) {
        return 0
    }
    result = Math.round(num * 100) / 100
    return result
}
</script>

<style lang="scss">
    .cartbox{
        height: 100%;
        overflow: auto;
        background-color: #f9f9f9;
        padding-bottom: 1.8rem;
        box-sizing: border-box;
        .cartbox-list{
            background-color: #fff;
            padding: 0 .3rem;
            .cartbox-item{
                display: flex;
                height: 1.6rem;
                box-sizing: border-box;
                margin-top: .2rem;
                .cartbox-item-radio{
                    display: block;
                    width: 16px;
                    height: 16px;
                    border: .02rem solid #ccc;
                    border-radius: 20px;
                    box-sizing: border-box;
                    margin-top: .6rem;
                }
                .cartbox-item-radio.cur{
                    border: .02rem solid #f00;
                    background: url('../assets/images/dui.png') no-repeat center;
                    background-size: auto 80%;
                    background-color: #f00;
                }
                .cartbox-item-img{
                    margin-left: .3rem;
                    width: 1.6rem;
                    height: 1.6rem;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .cartbox-item-name{
                    padding: .1rem 0 0 0;
                    margin-left: .3rem;
                    width: 4.58rem;
                    box-sizing: border-box;
                    .item-name-xilie{
                        color: #000;
                        margin-bottom: .1rem;
                        font-size: .28rem;
                    }
                    .item-name-name{
                        color: #9d9d9d;
                        font-size: .24rem;
                        margin-bottom: .1rem;
                    }
                    .item-name-price{
                        font-size: .28rem;
                        color: #f00;
                        display: flex;
                        justify-content: space-between;
                        .item-name-num{
                            display: flex;
                            padding-right: .4rem;
                            line-height: .6rem;
                            margin-top: -.1rem;
                            .num-jian{
                                width: .6rem;
                                height: .6rem;
                                border: .02rem solid #ccc;
                                box-sizing: border-box;
                                text-align: center;
                                img{
                                    margin-top: .16rem;
                                    width: .24rem;
                                }
                            }
                            .num-num{
                                width: .6rem;
                                height: .6rem;
                                border-top: .02rem solid #ccc;
                                border-bottom: .02rem solid #ccc;
                                box-sizing: border-box;
                                text-align: center;
                                font-size: .4rem;
                                input{
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                    border: 0;
                                    text-align: center;
                                    font-size: .28rem;
                                    padding: .2rem 0;
                                    box-sizing: border-box;
                                }
                            }
                            .num-jia{
                                width: .6rem;
                                height: .6rem;
                                border: .02rem solid #ccc;
                                box-sizing: border-box;
                                text-align: center;
                                font-size: .4rem;
                            }
                        }
                    }
                }
            }
        }
        .amountbox{
            position: absolute;
            left: 0;
            bottom: .9rem;
            width: 100%;
            height: .9rem;
            line-height: .9rem;
            background-color: #fff;
            display: flex;
            font-size: .28rem;
            .sel{
                width: 1.5rem;
                padding-left: .7rem;
                box-sizing: border-box;
                border-top: .02rem solid #eee;
            }
            .sel::before{
                content: '';
                position: absolute;
                left: .2rem;
                top: .3rem;
                display: block;
                width: 16px;
                height: 16px;
                border: .02rem solid #ccc;
                border-radius: 20px;
            }
            .sel.cur::before{
                border: .02rem solid #f00;
                background: url('../assets/images/dui.png') no-repeat center;
                background-size: auto 80%;
                background-color: #f00;
            }
            .total{
                width: 4rem;
                text-align: right;
                box-sizing: border-box;
                padding-right: .2rem;
                border-top: .02rem solid #eee;
                span{
                    color: #f00;
                }
            }
            .btn{
                letter-spacing: .02rem;
                text-align: center;
                background-color: #eee;
                color: #999;
                width: 2rem;
                font-weight: bold;
            }
            .btn.cur{
                background-color: #C71F2C;
                color: #fff;
            }
            .btn.cur:active{
                background-color: #B30B17;
            }
        }
        .cart-null-box{
            margin-top: 1rem;
            text-align: center;
            .tit{
                font-size: .32rem;
            }
            .other{
                font-size: .24rem;
                color: #999;
                margin-top: .2rem;
            }
            .btn{
                margin: .4rem auto;
                width: 1.6rem;
                height: .6rem;
                line-height: .6rem;
                color: #FF913C;
                border: 1px solid #FF913C;
                border-radius: 3px;
                box-sizing: border-box;
            }
        }
    }
</style>
