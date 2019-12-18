<template>
    <div id="myaddress" class="myaddressbox">
        <Header headtitle="地址管理"></Header>
        <ul :class='selid > 0?"addrlist seladdr":"addrlist"'>
            <li :class='selid == addrInfo.id ? "cur": ""' v-for="(addrInfo, i) in dataList" :key="i">
                <div class="addrinfo" @click="selAddr(addrInfo)">
                    <div class="name">{{addrInfo.name}}，{{addrInfo.mobile}}</div>
                    <div class="info">收货地址：{{addrInfo.province}} {{addrInfo.city}} {{addrInfo.district}} {{addrInfo.address}}</div>
                </div>
                <div class="edit" @click="editAddr(addrInfo)"></div>
            </li>
        </ul>
        <div class="newaddr" @click="toNewAddr">
            新增收货地址
        </div>
    </div>
</template>

<script>
import Header from '@/components/common/Header.vue'

export default {
    name: 'myaddress',
    data () {
        return {
            selid: 0,
            buytype: '',
            dataList: []
        }
    },
    components: {
        Header
    },
    methods: {
        selAddr: function (item) {
            this.selid = item.id
            sessionStorage.setItem('selAddr', JSON.stringify(item))
            this.$router.push({
                path: '/orderbooking?ty=' + this.buytype + '&selAddr=' + item.id
            })
        },
        editAddr: function (item) {
            sessionStorage.setItem('selAddr', JSON.stringify(item))
            this.$router.push({
                path: '/my/newaddress?ty=' + this.buytype + '&id=' + item.id
            })
        },
        toNewAddr: function () {
            this.$router.push({
                path: '/my/newaddress?ty=' + this.buytype
            })
        }
    },
    beforeMount () {
        this.Indicator.open()
        this.$store.state.menu = false
        this.selid = this.$route.query.id
        this.buytype = this.$route.query.ty
        this.$http.get(this.apis + '/address/getCustomerAddressByOpenIdAjax', {params: {
            openId: sessionStorage.getItem('openID')
        }})
        .then(res => {
            this.Indicator.close()
            if (res && res.data && res.data.code === 1) {
                this.dataList = res.data.obj
            }
        })
    }
}
</script>

<style lang="scss">
    .myaddressbox{
        background-color: #f4f4f4;
        padding: 1.1rem 0 1rem 0;
        height: 100%;
        box-sizing: border-box;
        .addrlist{
            background-color: #fff;
            padding-left: .3rem;
            box-sizing: border-box;
            li{
                position: relative;
                padding: .2rem .9rem .2rem 0;
                box-sizing: border-box;
                border-bottom: .02rem solid #eee;
                .addrinfo{
                    .name{
                        color: #000;
                        font-weight: bold;
                        font-size: .28rem;
                        line-height: .6rem;
                    }
                    .info{
                        color: #999;
                    }
                }
                .edit{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: .9rem;
                    height: 100%;
                    display: block;
                    background: url('../../assets/images/edit.png') no-repeat center;
                    background-size: auto .4rem;
                }
            }
            li:last-child{
                border: 0;
            }
        }
        .seladdr{
            li{
                .addrinfo{
                    padding-left: .6rem;
                }
                .addrinfo::before{
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: 16px;
                    height: 16px;
                    margin-top: -12px;
                    border-radius: 20px;
                    border: .02rem solid #333;
                }
            }
            .cur{
                .addrinfo::before{
                    border: .02rem solid #f00;
                    background: url('../../assets/images/dui.png') no-repeat center;
                    background-size: 12px;
                    background-color: #f00;
                }
            }
        }
        .newaddr{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: .9rem;
            line-height: .9rem;
            text-align: center;
            background-color: #c71f2c;
            color: #fff;
            font-size: .28rem;
            a{
                color: #fff;
            }
        }
        .newaddr:active{
            background-color: #B30E17;
        }
    }
</style>
