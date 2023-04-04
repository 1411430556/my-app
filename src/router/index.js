import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Main from '@/views/Main.vue'
import Mall from '@/views/Mall.vue'
import PageOne from '@/views/PageOne.vue'
import pageTwo from '@/views/PageTwo.vue'
import Login from '@/views/Login.vue'

// 在重写push|replace方法时，先把VueRouter原型对象的push|replace保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 参数1：告诉原来的push | replace方法，你往那里跳转（传递那些参数）
// 参数2：成功回调
// 参数3：失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Main,
      redirect: '/home',  // 重定向，跳转到home
      children: [
        {
          // 首页
          path: 'home',
          name: 'home',
          component: Home,
        },
        {
          // 用户管理
          path: 'user',
          name: 'user',
          component: User,
        },
        {
          // 商品管理
          path: 'mall',
          name: 'mall',
          component: Mall,
        },
        {
          // 页面一
          path: 'page1',
          name: 'page1',
          component: PageOne,
        },
        {
          // 页面二
          path: 'page2',
          name: 'page2',
          component: pageTwo,
        },
      ],
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ],
})

export default router
