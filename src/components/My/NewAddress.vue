<template>
    <div id="NewAddress" class="newaddressbox">
        <Header :headtitle="titles"></Header>
        <div class="pubtitle"><div class="back" @click="back"></div></div>
        <ul class="addrinfo-box">
            <li>
                <div class="labels">姓名</div>
                <div><input type="text" v-model="info.name" placeholder="收货人姓名" maxlength="20"></div>
            </li>
            <li>
                <div class="labels">电话</div>
                <div><input type="tel" v-model="info.phone" placeholder="收货人手机号" maxlength="20"></div>
            </li>
            <li>
                <div class="labels">地区</div>
                <div><input type="text" v-model="info.addrarea" @click="showPicker" placeholder="选择省 /市 /区" maxlength="50" readonly></div>
            </li>
            <li>
                <div class="labels">详细地址</div>
                <div><textarea name="" id="" cols="30" rows="10" v-model="info.addrinfo" placeholder="街道门牌、楼层房间号等信息" maxlength="100"></textarea></div>
            </li>
        </ul>
        <div class="btn" @click="save">保存并使用</div>
        <mt-popup v-model="areaVisible" class="area-class" position="bottom">
            <div class="btn-box">
                <span class="btn-cancel" @click="cancel">取消</span>
                <span></span>
                <span class="btn-sure" @click="sure">确定</span>
            </div>
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import cityData from '../../../static/city.json'

let index = 0
let index2 = 0
let province = cityData.map(res => {
    return res.name
})
// 初始化市
let city = cityData[index].childs.map(res => {
    return res.name
})
// 初始化区
let area = cityData[index].childs[index2].childs.map(res => {
    return res.name
})

export default {
    name: 'NewAddress',
    data () {
        return {
            titles: '新增收货地址',
            id: '',
            buytype: '',
            info: {
                name: '',
                phone: '',
                addrarea: '',
                addrinfo: ''
            },
            slots: [],
            areaVisible: false,
            selcity: ''
        }
    },
    methods: {
        back: function () {
            this.$router.go(-1)
        },
        save: function () {
            if (this.info.name === '') {
                this.Toast('请输入姓名')
            } else if (this.info.phone === '') {
                this.Toast('请输入手机号')
            } else if (!checkMobile(this.info.phone)) {
                this.Toast('请输入正确手机号')
            } else if (this.info.addrarea === '') {
                this.Toast('请选择省市区')
            } else if (this.info.addrinfo === '') {
                this.Toast('请输入详细街道门牌、楼层房间号')
            } else {
                let arr = this.info.addrarea.split(' ')
                this.$http.get(this.apis + '/address/saveOrupdate', {params: {
                    name: this.info.name,
                    mobile: this.info.phone,
                    province: arr[0],
                    city: arr[1],
                    district: arr[2],
                    customopenid: sessionStorage.getItem('openID'),
                    address: this.info.addrinfo,
                    id: this.id,
                    status: 1
                }})
                .then(res => {
                    console.log(res)
                    if (res && res.data && res.data.code === 1) {
                        this.$messagebox('保存成功！')
                        sessionStorage.setItem('selAddr', JSON.stringify(res.data.obj))
                        this.$router.push({
                            path: '/orderbooking?ty=' + this.buytype + '&selAddr=' + res.data.obj.id
                        })
                    }
                })
            }
        },
        showPicker: function () {
            this.areaVisible = true
        },
        onValuesChange: function (picker, values) {
            let one = values[0]
            let two = values[1]
            index = province.indexOf(one)
            if (index >= 0 && province.length > 0) {
                city = cityData[index].childs.map(res => {
                return res.name
                })
                picker.setSlotValues(1, city)
                two = values[1]
            }

            index2 = city.indexOf(two)
            if (index2 >= 0 && city.length > 0) {
                area = cityData[index].childs[index2].childs.map(res => {
                return res.name
                })
                picker.setSlotValues(2, area)
            }
            this.selcity = values.join(' ')
        },
        cancel: function () {
            this.areaVisible = false
        },
        sure: function () {
            this.areaVisible = false
            this.info.addrarea = this.selcity
        }
    },
    beforeMount () {
        this.slots = [
            {
                flex: 1,
                defaultIndex: 0,
                values: province,
                className: 'slot1',
                textAlign: 'center'
            }, {
                divider: true,
                content: '-',
                className: 'slot2'
            }, {
                flex: 1,
                values: city,
                className: 'slot3',
                textAlign: 'center'
            },
            {
                divider: true,
                content: '-',
                className: 'slot4'
            },
            {
                flex: 1,
                values: area,
                className: 'slot5',
                textAlign: 'center'
            }
        ]

        this.$store.state.menu = false
        this.id = this.$route.query.id || ''
        this.buytype = this.$route.query.ty
        if (this.id) {
            let addr = sessionStorage.getItem('selAddr')
            let infos = JSON.parse(addr)
            this.info = {
                name: infos.name,
                phone: infos.mobile,
                addrarea: infos.province + ' ' + infos.city + ' ' + infos.district,
                addrinfo: infos.address
            }
        }
    },
    components: {
        Header
    }
}

function checkMobile (v) {
    return /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/.test(v)
}
</script>

<style lang="scss">
    .newaddressbox{
        background-color: #f4f4f4;
        padding: 1.1rem 0 1rem 0;
        height: 100%;
        box-sizing: border-box;
        .addrinfo-box{
            background-color: #fff;
            padding-left: .3rem;
            box-sizing: border-box;
            li{
                line-height: .8rem;
                display: flex;
                border-bottom: .02rem solid #eee;
                box-sizing: border-box;
                div{
                    width: 5.7rem;
                }
                .labels{
                    width: 1.5rem;
                }
                input{
                    border: 0;
                    height: .8rem;
                    width: 100%;
                    box-sizing: border-box;
                }
                textarea{
                    border: 0;
                    width: 100%;
                    height: 2rem;
                    resize: none;
                    padding-top: .22rem;
                    box-sizing: border-box;
                }
            }
        }
        .btn{
            width: 6.5rem;
            height: .8rem;
            line-height: .8rem;
            font-size: .28rem;
            margin: .5rem auto;
            background-color: #c71f2c;
            color: #fff;
            text-align: center;
            border-radius: .1rem;
        }
        .btn:active{
            background-color: #B30E17;
        }
        .area-class {
            width: 100%;
            height: 210px;
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
