// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import './assets/css/public.css'
import swipe from 'mint-ui/lib/swipe'
import 'mint-ui/lib/swipe/style.css'
import swipeitem from 'mint-ui/lib/swipe-item'
import 'mint-ui/lib/swipe-item/style.css'
import loadmore from 'mint-ui/lib/loadmore'
import 'mint-ui/lib/loadmore/style.css'
import cellswipe from 'mint-ui/lib/cell-swipe'
import 'mint-ui/lib/cell-swipe/style.css'
import messagebox from 'mint-ui/lib/message-box'
import 'mint-ui/lib/message-box/style.css'
import toast from 'mint-ui/lib/toast'
import 'mint-ui/lib/toast/style.css'
import indicator from 'mint-ui/lib/indicator'
import 'mint-ui/lib/indicator/style.css'
import picker from 'mint-ui/lib/picker'
import 'mint-ui/lib/picker/style.css'
import datetimepicker from 'mint-ui/lib/datetime-picker'
import 'mint-ui/lib/datetime-picker/style.css'
import popup from 'mint-ui/lib/popup'
import 'mint-ui/lib/popup/style.css'
import switchs from 'mint-ui/lib/switch'
import 'mint-ui/lib/switch/style.css'

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.apiw = process.env.APIW_URL
Vue.prototype.apis = process.env.APIS_URL
Vue.prototype.imgpath = 'https://www.roseonly.com.cn/'
Vue.prototype.imgpathlib = 'https://www.roseonly.com.cn/upload/syspic_new/'
Vue.prototype.$messagebox = messagebox
Vue.prototype.Toast = toast
Vue.prototype.Indicator = indicator

Vue.component(swipe.name, swipe)
Vue.component(swipeitem.name, swipeitem)
Vue.component(loadmore.name, loadmore)
Vue.component(cellswipe.name, cellswipe)
Vue.component(messagebox.name, messagebox)
Vue.component(picker.name, picker)
Vue.component(datetimepicker.name, datetimepicker)
Vue.component(popup.name, popup)
Vue.component(switchs.name, switchs)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
