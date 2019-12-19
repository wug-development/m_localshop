<template>
    <mt-popup v-model="isShow" class="menu-box" style="z-index: 2003;" position="left">
        <div class="menu-body" v-if="!showTwo">
            <div class="menu-body-box">
                <div class="menu-title"></div>
                <ul class="menu-list">
                    <li v-for="(item, i) in menu" @click="showChild(item)" :key="i">{{item.menuName}}<span><i>七夕</i></span></li>
                </ul>
            </div>
            <ul class="menu-list menu-acount">
                <li @click="toPage('register')">注册</li>
                <li @click="toPage('login')">登陆</li>
            </ul>
        </div>
        <div class="menu-body" v-else>
            <div class="menu-body-box">
                <div class="menu-title menu-border"><i class="btn-back" @click="showTwo = false"></i></div>
                <div class="menu-tab" v-for="(item, i) in secondmenu" :key="i">
                    <div class="menu-tab-title">{{item.menuName}}</div>
                    <ul class="menu-list" v-if="item.types==2 && item.childMenus">
                        <li v-for="(s, index) in item.childMenus" :key="index">{{s.menuName}}<span><i>七夕</i></span></li>
                    </ul>
                </div>
            </div>
        </div>
    </mt-popup>
</template>

<script>
export default {
    name: 'Menu',
    props: ['status'],
    data () {
        return {
            isShow: false,
            showTwo: false,
            menu: '',
            secondmenu: ''
        }
    },
    methods: {
        toPage (v) {
            this.$router.push({
                path: '/' + v
            })
            this.closeMenu()
        },
        closeMenu () {
            this.isShow = false
            this.$emit('close', false)
        },
        showChild (v) {
            if (v.hasChildMenu) {
                this.showTwo = true
                this.secondmenu = v.childMenus
            }
        }
    },
    created () {
        if (window.roseonly_menu_data) {
            this.menu = window.roseonly_menu_data.childMenus.childMenus
            console.log(this.menu)
        }
    },
    watch: {
        status (v) {
            if (v) {
                this.isShow = v
            }
        },
        isShow (v) {
            if (!v) {
                this.closeMenu()
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.menu-box{
    left: 0;
    width: 4.8rem;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: $Light;
    color: $fontcolor;
    .menu-body{
        display: flex;
        flex-wrap: wrap;
        min-height: 100%;
        align-content: space-between;
        .menu-body-box{
            width: 100%;
            .menu-title{
                height: 1.2rem;
                .btn-back{
                    position: absolute;
                    width: .24rem;
                    height: .24rem;
                    border: .04rem solid $pubcolor;
                    border-top: 0;
                    border-right: 0;
                    left: .4rem;
                    top: .48rem;
                    transform: rotate(45deg) scale(0.8);
                }
            }
            .menu-border{
                border-bottom: .02rem solid #bab8b6;
            }
            .menu-tab{
                border-bottom: .02rem solid #bab8b6;
                padding-top: .2rem;
                .menu-tab-title{
                    color: $Gray;
                    text-align: left;
                    padding-left: .8rem;
                    font-size: .3rem;
                }
            }
            .menu-tab:last-child{
                border: 0;
            }
        }
        .menu-list{
            font-size: .3rem;
            text-align: left;
            padding-left: .8rem;
            padding-bottom: .4rem;
            box-sizing: border-box;
            li{
                height: .96rem;
                line-height: .96rem;
                display: flex;
                span{
                    margin-top: .32rem;
                    margin-left: .16rem;
                    display: block;
                    width: .72rem;
                    height: .32rem;
                    line-height: .34rem;
                    text-align: center;
                    background-color: #b42c25;
                    color: #fff;
                    border-radius: .04rem;
                    i{
                        display: block;
                        width: 100%;
                        height: 100%;
                        font-size: .24rem;
                        transform: scale(0.68);
                    }
                }
            }
        }
        .menu-acount{
            width: 100%;
            height: 2.54rem;
            box-sizing: border-box;
            padding: .3rem .8rem;
            border-top: .02rem solid #bab8b6;
        }
    }
}
</style>
