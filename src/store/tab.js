export default {
  namespaced: true,
  state: {
    isCollapse: false,  // 用于控制菜单的展开还是收起
    // 面包屑数据
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home',
      },
    ],
  },

  mutations: {
    // 修改菜单展开收起的方法
    COLLAPSE_MENU (state) {
      state.isCollapse = !state.isCollapse
    },
    // 更新面包屑数据
    SELECT_MENU (state, val) {
      // 判断添加的数据是否为首页
      if (val.name !== 'home') {
        const result = state.tabsList.every(item => item.name !== val.name)
        // const index = state.tabsList.findIndex(item => item.name === val.name)  // 这个是返回数组中满足测试函数的第一个元素的索引，没有找到满足的元素就返回 -1
        // 如果不存在
        if (result) {
          state.tabsList.push(val)
        }
      }
    },
    // 删除指定的tag数据
    CLOSE_TAG (state, val) {
      const index = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(index, 1)
    },
  },
}
