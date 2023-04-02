<template>
  <div>
    <el-menu
        :router="true"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :default-active="$route.path"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

      <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.path">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>

      <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>

        <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
          <el-menu-item :index="subItem.path">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CommonAside',
  data () {
    return {
      menuData: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home',
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'shopping-cart-2',
          url: 'MallManage/MallManage',
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage',
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne',
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo',
            },
          ],
        },
      ],
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    // 点击左侧菜单
    ...mapMutations('tab', {clickMenu: 'SELECT_MENU'}),

    /*
        ⟬ 还可以就是数组写法...mapMutations('tab', ['SELECT_MENU'])在上面15行写成 SELECT_MENU(item)  ⟭
        或者下面这样     【三种写法】
     ...mapMutations('tab', ['SELECT_MENU']),
    clickMenu (item) {
      this.SELECT_MENU(item)
    },
    */
  },
  computed: {
    // 没有子菜单
    noChildren () {
      return this.menuData.filter(item => !item.children)
    },
    // 有子菜单
    hasChildren () {
      return this.menuData.filter(item => item.children)
    },
    // 获取是否水平折叠收起菜单的状态数据  isCollapse为true是不展开的状态
    ...mapState('tab', ['isCollapse']),
  },
  mounted () {
    console.log(this.$route)
  },
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
  //min-height: 400px;
}

.el-menu {
  height: 100vh;
  border-right: none !important;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
    white-space: nowrap;
  }
}
</style>
