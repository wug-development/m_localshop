<template>
    <div id="MyOrderList" class="myorderlist">
        <Header headtitle="订单列表"></Header>
        <div class="titletab">
            <span :class='orderType == 1 ? "cur": ""' @click="toOrderList(1)">全部</span>
            <span :class='orderType == 0 ? "cur": ""' @click="toOrderList(0)">待付款</span>
            <span :class='orderType == 2 ? "cur": ""' @click="toOrderList(2)">待收货</span>
        </div>
        <ul class="order-list">
            <li class="order-item" v-for="(item, i) in orderList" :key="i" @click="toDetail(item)">
                <div class="orderno">
                    <span>订单编号：{{item.orderno}}</span>
                    <span class="status">{{checkstatus(item.status)}}</span>
                </div>
                <ul class="product-list">
                    <li v-for="(p, index) in item.orderProductList" :key="index">
                        <div class="proimg">
                            <img :src="p.productcoverimage" alt="">
                        </div>
                        <div class="proinfo">
                            <div class="name">{{p.productname}}</div>
                            <div class="attr">{{p.color}} {{p.size}}</div>
                            <div class="pnum"><span class="price">&yen;{{p.productprice}}</span><span>&#120;{{p.buynumber}}</span></div>
                        </div>
                    </li>
                </ul>
                <div class="total">
                    合计：<span>&yen;{{item.price}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Header from '@/components/common/Header.vue'

export default {
    name: 'MyOrderList',
    data () {
        return {
            orderList: [],
            orderType: 0,
            allList: []
        }
    },
    components: {
        Header
    },
    methods: {
        toDetail: function (item) {
            sessionStorage.setItem('orderitem', JSON.stringify(item))
            this.$router.push({
                path: '/my/myorderdetail'
            })
        },
        checkstatus: function (s) {
            let txt = ''
            switch (s) {
                case 1: txt = '未支付'; break
                case 2: txt = '已支付'; break
                case 3: txt = '已送达'; break
                case 4: txt = '订单取消'; break
                case 6: txt = '订单关闭'; break
                case 8: txt = '订单取消'; break
            }
            return txt
        },
        toOrderList: function (e) {
            this.orderType = Number(e)
            this.showData(this.allList)
        },
        showData: function (olist) {
            this.orderList = []
            if (this.orderType === 0) {
                for (let o in olist) {
                    if (olist[o].status === 1) {
                        this.orderList.push(olist[o])
                    }
                }
            } else if (this.orderType === 2) {
                for (let o in olist) {
                    if (olist[o].status === 2) {
                        this.orderList.push(olist[o])
                    }
                }
            } else {
                this.orderList = olist
            }
        }
    },
    beforeMount () {
        this.orderType = Number(this.$route.query.ty)

        this.$http.get(this.apis + '/order/userOrderListAjax', {params: {
            openId: sessionStorage.getItem('openID'),
            page: 1,
            pageSize: 6,
            ischongzhi: 0
        }})
        .then(res => {
            console.log(res)
            if (res && res.data && res.data.code === 1) {
                let olist = res.data.obj.userOrderList
                this.allList = olist
                this.showData(olist)
            }
        })
    }
}
</script>

<style lang="scss">
    .myorderlist{
        height: 100%;
        background-color: #f9f9f9;
        padding: .9rem 0;
        box-sizing: border-box;
        .header-box{
            box-shadow: none;
        }
        .titletab{
            height: .8rem;
            line-height: .8rem;
            display: flex;
            background-color: #fff;
            justify-content: space-around;
            .cur{
                color: #f00;
                border-bottom: .04rem solid #f00;
            }
        }
        .order-list{
            .order-item{
                margin-top: .2rem;
                background-color: #fff;
                .orderno{
                    height: .8rem;
                    line-height: .8rem;
                    color: #999;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 .3rem;
                    box-sizing: border-box;
                    .status{
                        color: #f00;
                    }
                }
                .product-list{
                    padding: 0 .2rem;
                    box-sizing: border-box;
                    background-color: #f9f9f9;
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
                            padding-left: .2rem;
                            box-sizing: border-box;
                            .name{
                                font-weight: bold;
                            }
                            .attr{
                                color: #777;
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
                .total{
                    height: .8rem;
                    line-height: .8rem;
                    text-align: right;
                    padding: 0 .3rem;
                    box-sizing: border-box;
                    span{
                        color: #f00;
                    }
                }
            }
        }
    }
</style>
