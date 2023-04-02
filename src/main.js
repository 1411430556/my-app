import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import router from '@/router/index'
import store from './store/index'
import moment from 'moment' //导入模块
moment.locale('zh-cn') //设置语言 或 moment.lang('zh-cn');
import './api/mock'

Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate () {
    Vue.prototype.$moment = moment
  },
}).$mount('#app')
