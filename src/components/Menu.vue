<template>
    <div id="Menu" class="menubox">
        <div class="searchbox">
            <input type="search" name="txt_search" id="txt_search">
        </div>
        <div class="menubox-tab">
            <ul class="menubox-left">
                <li v-for="(m, index) in menuData" :key="index" @click="issel = index" :class='"menubox-left-item" + (issel == index? " cur": "")'>{{m.names}}</li>
            </ul>
            <ul class="menubox-right">
                <li class="menubox-right-item" v-for='(item, i) in menuData' :key='i' v-show="issel == i">
                    <template v-if="item.childmenu && item.childmenu.imgs">
                    <div class="menubox-item-banner">
                        <img :src="item.childmenu.imgs" alt="">
                    </div>
                    <div v-for='(items, j) in item.childmenu.childmenu' :key='j'>
                        <div class="menubox-item-children-title">{{items.names}}</div>
                        <dl class="menubox-item-children">
                            <dt  v-for='(t, n) in items.childmenu' :key='n'>
                                <img :src="t.imgs" alt="">
                                <span>{{t.names}}</span>
                            </dt>
                        </dl>
                    </div>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    data () {
        return {
            menuData: [],
            issel: 1
        }
    },
    beforeMount () {
        this.$store.state.menu = true
        this.$store.state.menuCur = 2
        this.menuData = headMenu('/home/list?id=', this.imgpathlib)
    }
}

function headMenu (linkPath, imgpathlib) {
    const basePath = '/home/'
    return [
        {
            names: '新品上新',
            links: linkPath + '138',
            issel: false,
            childmenu: {}
        },
        {
            names: '爱礼推荐',
            links: 'javascript:void(0);',
            issel: true,
            childmenu: {
                imgs: imgpathlib + '15529893631162586.jpg',
                links: linkPath + '4',
                childmenu: [
                    {
                        names: '场合',
                        childmenu: [
                            {
                                names: '生辰日',
                                imgs: imgpathlib + '15405429661045211.png',
                                links: linkPath + '/shengri.html'
                            },
                            {
                                names: '纪念日',
                                imgs: imgpathlib + '15405429660885134.png',
                                links: linkPath + '/jinianri.html'
                            },
                            {
                                names: '告白日',
                                imgs: imgpathlib + '15405429660785009.png',
                                links: linkPath + '/biaobai.html'
                            },
                            {
                                names: '求婚',
                                imgs: imgpathlib + '15405429660969442.png',
                                links: linkPath + '/qiuhun.html'
                            }
                        ]
                    },
                    {
                        names: '人群',
                        childmenu: [
                            {
                                names: '送给他',
                                imgs: imgpathlib + '15405429661206792.png',
                                links: linkPath + '/songnanyou.html'
                            },
                            {
                                names: '送给她',
                                imgs: imgpathlib + '15405429661271302.png',
                                links: linkPath + '/songnvyou.html'
                            },
                            {
                                names: '送母亲',
                                imgs: imgpathlib + '15405429661359250.png',
                                links: linkPath + '/songmuqin.html'
                            },
                            {
                                names: '送父亲',
                                imgs: imgpathlib + '15405429661121454.png',
                                links: linkPath + '/songfuqin.html'
                            }
                        ]
                    }
                ]
            }
        },
        {
            names: '鲜花玫瑰',
            links: 'javascript:void(0);',
            issel: false,
            childmenu: {
                imgs: imgpathlib + '15529893631418786.jpg',
                links: linkPath + '/xianhuameigui.html',
                childmenu: [
                    {
                        names: '类型',
                        childmenu: [
                            {
                                names: '玫瑰长盒',
                                imgs: imgpathlib + '15530544241619956.png',
                                links: linkPath + '/meiguichanghe.html'
                            },
                            {
                                names: '玫瑰手捧',
                                imgs: imgpathlib + '15241944159612599.png',
                                links: linkPath + '/shoupengmeigui.html'
                            },
                            {
                                names: '玫瑰花篮',
                                imgs: imgpathlib + '15258369062803832.png',
                                links: linkPath + '/hualan.html'
                            },
                            {
                                names: '玫瑰水晶花盒',
                                imgs: imgpathlib + '15409519174744934.png',
                                links: linkPath + '/shuijinghuahe.html'
                            }
                        ]
                    },
                    {
                        names: '系列',
                        childmenu: [
                            {
                                names: '经典永续',
                                imgs: imgpathlib + '15530544241765102.png',
                                links: linkPath + '/xhjingdianyongxu.html'
                            },
                            {
                                names: '恒久真爱',
                                imgs: imgpathlib + '15022686924219170.png',
                                links: linkPath + '/hengjiuzhenai.html'
                            },
                            {
                                names: '爱在满怀',
                                imgs: imgpathlib + '15409519220267849.png',
                                links: linkPath + '/aizaimanhuai.html'
                            },
                            {
                                names: '全世爱',
                                imgs: imgpathlib + '15160072117836561.png',
                                links: linkPath + '/xhquanshiai.html'
                            },
                            {
                                names: 'for all love',
                                imgs: imgpathlib + '15262947118785825.png',
                                links: linkPath + '/falhualan.html'
                            }
                        ]
                    }
                ]
            }
        },
        {
            names: '永生玫瑰',
            links: 'javascript:void(0);',
            issel: false,
            childmenu: {
                imgs: imgpathlib + '15529893631505057.jpg',
                links: linkPath + '/yongshengmeigui.html',
                childmenu: [
                    {
                        names: '类型',
                        childmenu: [
                            {
                                names: '音乐玫瑰',
                                imgs: imgpathlib + '15268966021845491.png',
                                links: linkPath + '/yinyuemeigui.html'
                            },
                            {
                                names: '玫瑰花球',
                                imgs: imgpathlib + '15258366309038040.png',
                                links: linkPath + '/yongshengqiuxing.html'
                            },
                            {
                                names: '公仔',
                                imgs: imgpathlib + '15258366227537003.png',
                                links: linkPath + '/ysmgx.html'
                            },
                            {
                                names: '玫瑰圆盒',
                                imgs: imgpathlib + '15021813515746438.png',
                                links: linkPath + '/yongshengyuanhe.html'
                            },
                            {
                                names: '玫瑰方盒',
                                imgs: imgpathlib + '15021814418341752.png',
                                links: linkPath + '/yongshengfanghe.html'
                            },
                            {
                                names: '玫瑰心形盒',
                                imgs: imgpathlib + '15021814605019841.png',
                                links: linkPath + '/xinxing.html'
                            }
                        ]
                    },
                    {
                        names: '系列',
                        childmenu: [
                            {
                                names: '经典永续',
                                imgs: imgpathlib + '15258366280323532.png',
                                links: linkPath + '/jingdianyongxu.html'
                            },
                            {
                                names: '玫瑰公仔',
                                imgs: imgpathlib + '15241945365995940.png',
                                links: linkPath + '/ysmgx.html'
                            },
                            {
                                names: '全世爱',
                                imgs: imgpathlib + '15241945392226399.png',
                                links: linkPath + '/ysquanshiai.html'
                            },
                            {
                                names: '一生一世',
                                imgs: imgpathlib + '15021816078328184.png',
                                links: linkPath + '/yishengyishi.html'
                            },
                            {
                                names: '星座经典',
                                imgs: imgpathlib + '15268965978357920.png',
                                links: linkPath + '/ysxingzuojingdian.html'
                            },
                            {
                                names: 'for all love',
                                imgs: imgpathlib + '15021816289577679.png',
                                links: linkPath + '/forallloves.html'
                            }
                        ]
                    }
                ]
            }
        },
        {
            names: '玫瑰珠宝',
            links: 'javascript:void(0);',
            issel: false,
            childmenu: {
                imgs: imgpathlib + '15529893631285531.jpg',
                links: linkPath + '/meiguizhubao.html',
                childmenu: [
                    {
                        names: '类型',
                        childmenu: [
                            {
                                names: '项链',
                                imgs: imgpathlib + '15174701207742782.png',
                                links: linkPath + '/zhubaoxl.html'
                            },
                            {
                                names: '手链',
                                imgs: imgpathlib + '15198860449702126.png',
                                links: linkPath + '/zhubaosl.html'
                            },
                            {
                                names: '耳饰',
                                imgs: imgpathlib + '15198860411135359.png',
                                links: linkPath + '/zhubaoes.html'
                            },
                            {
                                names: '手镯',
                                imgs: imgpathlib + '15268963801911527.png',
                                links: linkPath + '/zhubaosz.html'
                            },
                            {
                                names: '戒指',
                                imgs: imgpathlib + '15258369919411648.png',
                                links: linkPath + '/zhubaojz.html'
                            }
                        ]
                    },
                    {
                        names: '材质',
                        childmenu: [
                            {
                                names: '18k玫瑰金镶钻',
                                imgs: imgpathlib + '15063294681208249.png',
                                links: linkPath + '/zbmgjxz.html'
                            },
                            {
                                names: '18k白金镶钻',
                                imgs: imgpathlib + '15132423348295562.png',
                                links: linkPath + '/zbbjxz.html'
                            },
                            {
                                names: '18k玫瑰金',
                                imgs: imgpathlib + '15063294561716470.png',
                                links: linkPath + '/zbsbkmgj.html'
                            },
                            {
                                names: '18k白金',
                                imgs: imgpathlib + '15021839055802743.png',
                                links: linkPath + '/zbsbkbj.html'
                            },
                            {
                                names: '9k玫瑰金',
                                imgs: imgpathlib + '15220384752053440.png',
                                links: linkPath + '/zbjkmgj.html'
                            }
                        ]
                    }
                ]
            }
        },
        {
            names: '玫瑰饰品',
            links: 'javascript:void(0);',
            issel: false,
            childmenu: {
                imgs: imgpathlib + '15542794439858200.jpg',
                links: linkPath + '/meiguishipin.html',
                childmenu: [
                    {
                        names: '类型',
                        childmenu: [
                            {
                                names: '项链',
                                imgs: imgpathlib + '15198956296369253.png',
                                links: linkPath + '/shipinxianglian.html'
                            },
                            {
                                names: '手链',
                                imgs: imgpathlib + '15198958399143896.jpg',
                                links: linkPath + '/shipinshoulian.html'
                            },
                            {
                                names: '耳饰',
                                imgs: imgpathlib + '15198956208641639.png',
                                links: linkPath + '/shipinershi.html'
                            },
                            {
                                names: '手镯',
                                imgs: imgpathlib + '15021851404549213.png',
                                links: linkPath + '/shipinsz.html'
                            },
                            {
                                names: '戒指',
                                imgs: imgpathlib + '15021851698752758.png',
                                links: linkPath + '/spjz.html'
                            }
                        ]
                    },
                    {
                        names: '材质',
                        childmenu: [
                            {
                                names: '925银镀玫瑰金',
                                imgs: imgpathlib + '15021850089833196.png',
                                links: linkPath + '/spydmgj.html'
                            },
                            {
                                names: '925银镀白金',
                                imgs: imgpathlib + '15180731956922073.png',
                                links: linkPath + '/spydbj.html'
                            },
                            {
                                names: '925银珍珠',
                                imgs: imgpathlib + '15132434673487626.png',
                                links: linkPath + '/spyzz.html'
                            }
                        ]
                    }
                ]
            }
        },
        {
            names: '玫瑰香氛',
            links: 'javascript:void(0);',
            issel: false,
            childmenu: {
                imgs: imgpathlib + '15368220649036390.jpg',
                links: linkPath + '/meiguixiangfen.html',
                childmenu: [
                    {
                        names: '类型',
                        childmenu: [
                            {
                                names: '蜡烛',
                                imgs: imgpathlib + '15166177804344289.png',
                                links: linkPath + '/xflazhu.html'
                            },
                            {
                                names: '散香',
                                imgs: imgpathlib + '15166143692656808.png',
                                links: linkPath + '/xfsanxiang.html'
                            },
                            {
                                names: '陶瓷香氛',
                                imgs: imgpathlib + '15163302731614826.png',
                                links: linkPath + '/taocixiangfen.html'
                            }
                        ]
                    },
                    {
                        names: '系列',
                        childmenu: [
                            {
                                names: '经典永续',
                                imgs: imgpathlib + '15166131819052730.png',
                                links: linkPath + '/xfjingdianyongxu.html'
                            },
                            {
                                names: '玫瑰公仔',
                                imgs: imgpathlib + '15163302751215808.png',
                                links: linkPath + '/xfmeiguigongzai.html'
                            },
                            {
                                names: 'For all love',
                                imgs: imgpathlib + '15405442032002042.png',
                                links: linkPath + '/falxiangfen.html'
                            }
                        ]
                    }
                ]
            }
        },
        {
            names: '高端定制',
            links: basePath + '/list/gddz.html',
            issel: false,
            childmenu: {}
        },
        {
            names: '专卖店',
            links: basePath + '/about/shitidian.html',
            issel: false,
            childmenu: {}
        },
        {
            names: '婚礼定制',
            links: basePath + '/m/phone/wedding.html',
            issel: false,
            childmenu: {}
        },
        {
            names: '诺誓世界',
            links: basePath + '/nuoshi/nuoshishijie.html',
            issel: false,
            childmenu: {}
        }]
}
</script>

<style lang="scss">
    .menubox{
        background-color: #f6f6f6;
        height: 100%;
        overflow: hidden;
        .searchbox{
            padding: .1rem .3rem;
            box-sizing: border-box;
            input{
                width: 100%;
                height: .8rem;
                border: 0;
                padding-left: .8rem;
                box-sizing: border-box;
                background: url('../assets/images/search.png') no-repeat;
                background-position: .2rem center;
                background-size: auto 60%;
                background-color: #fff;
            }
        }
        .menubox-tab{
            display: flex;
            height: 100%;
            overflow: hidden;
            .menubox-left{
                width: 1.5rem;
                overflow-y: scroll;
                height: 100%;
                padding-bottom: 2rem;
                box-sizing: border-box;
                .menubox-left-item{
                    height: 1rem;
                    line-height: 1.1rem;
                    text-align: center;
                    font-size: .28rem;
                }
                .cur{
                    background-color: #fff;
                    position: relative;
                }
                .cur::before{
                    content: ' ';
                    position: absolute;
                    left: 0;
                    top: .25rem;
                    width: .08rem;
                    height: .5rem;
                    background-color: #f00000;
                }
            }
            .menubox-right{
                width: 6rem;
                background-color: #fff;
                padding: 0 .2rem 2rem .2rem;
                box-sizing: border-box;
                height: 100%;
                overflow-y: scroll;
                .menubox-item-banner{
                    img{
                        display: block;
                        width: 100%;
                    }
                }
                .menubox-item-children-title{
                    height: .8rem;
                    line-height: .8rem;
                }
                .menubox-item-children{
                    display: flex;
                    flex-wrap: wrap;
                    dt{
                        width: 1.8rem;
                        text-align: center;
                        margin-bottom: .2rem;
                        img{
                            display: block;
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>
