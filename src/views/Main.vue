<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <!--左侧主导航栏-->
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader></CommonHeader>
        </el-header>
        <el-main>
          <!--路由出口-->
          <!--路由匹配到的组件将渲染到这里-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
export default {
  name: 'Main',
  components: {
    CommonAside,
    CommonHeader
  },
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>
