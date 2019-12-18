import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Home/Index'
import Info from '@/components/Home/Info'
import List from '@/components/Home/List'
import Menu from '@/components/Menu'
import Cart from '@/components/Cart'
import My from '@/components/My'
import MyCenter from '@/components/My/MyCenter'
import MyAddress from '@/components/My/MyAddress'
import NewAddress from '@/components/My/NewAddress'
import MyPass from '@/components/My/MyPass'
import MyInfo from '@/components/My/MyInfo'
import MyVip from '@/components/My/MyVip'
import MyOrderList from '@/components/My/MyOrderList'
import MyOrderDetail from '@/components/My/MyOrderDetail'
import OrderBooking from '@/components/OrderBooking'

Vue.use(Router)

const indexchildren = [
    {
        path: '',
        component: Index
    },
    {
        path: 'index',
        component: Index
    },
    {
        path: 'info',
        component: Info
    },
    {
        path: 'list',
        component: List,
        meta: {
            // 此组件需要被缓存
            keepAlive: true,
            // 用于判断上一个页面是哪个
            isBack: false
        }
    }
]

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            children: indexchildren
        },
        {
            path: '/home',
            component: Home,
            children: indexchildren
        },
        {
            path: '/menu',
            name: 'Menu',
            component: Menu
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: '/my',
            name: 'My',
            component: My,
            meta: {
                // 此组件需要被缓存
                keepAlive: true,
                // 用于判断上一个页面是哪个
                isBack: false
            },
            children: [
                {
                    path: '/',
                    name: 'MyCenter',
                    component: MyCenter
                },
                {
                    path: 'myaddress',
                    name: 'MyAddress',
                    component: MyAddress
                },
                {
                    path: 'newaddress',
                    name: 'NewAddress',
                    component: NewAddress
                },
                {
                    path: 'mypass',
                    name: 'MyPass',
                    component: MyPass
                },
                {
                    path: 'myinfo',
                    name: 'MyInfo',
                    component: MyInfo
                },
                {
                    path: 'myvip',
                    name: 'MyVip',
                    component: MyVip
                },
                {
                    path: 'myorderlist',
                    name: 'MyOrderList',
                    component: MyOrderList,
                    meta: {
                        // 此组件需要被缓存
                        keepAlive: true,
                        // 用于判断上一个页面是哪个
                        isBack: false
                    }
                },
                {
                    path: 'myorderdetail',
                    name: 'MyOrderDetail',
                    component: MyOrderDetail
                }
            ]
        },
        {
            path: '/orderbooking',
            name: 'OrderBooking',
            component: OrderBooking
        }
    ],
    scrollBehavior (to, from, saveTop) {
        if (saveTop) {
            return saveTop
        } else {
            return {x: 0, y: 0}
        }
    }
})
