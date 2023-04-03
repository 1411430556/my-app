<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <!--左侧主导航栏-->
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader></CommonHeader>
        </el-header>
        <!--tag标签-->
        <CommonTag></CommonTag>
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
import CommonTag from '@/components/CommonTag.vue'

export default {
  name: 'Main',
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>
