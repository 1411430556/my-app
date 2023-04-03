<template>
  <div>
    <div class="header-container">
      <div class="l-content">
        <!--控制左侧栏是否折叠-->
        <el-button style="margin-right: 20px" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
        <!--面包屑-->
        <el-breadcrumb separator="-">
          <el-breadcrumb-item v-for="item in tabsList" :key="item.path" :to="{ path: item.path }">{{ item.label }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="r-content">
        <el-dropdown>
          <span class="el-dropdown-link">
            <!--<img class="user" src="../assets/images/user.png" alt="">-->
            <el-avatar :size="40" :src="avatar" @error="errorHandler"></el-avatar>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item command="cancel">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CommonHeader',
  data () {
    return {
      // 头像链接
      avatar: 'http://rsbtei8vb.hd-bkt.clouddn.com/background/%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F.png',
    }
  },
  computed: {
    ...mapState('tab', ['tabsList']),
  },

  methods: {
    // 头像处理
    errorHandler () {
      return true
    },
    // 控制左侧菜单栏是否折叠
    ...mapMutations('tab', { handleMenu: 'COLLAPSE_MENU' }),
  },
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  height: 60px;
  padding: 0 20px;

  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }

  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .l-content {
    display: flex;
    align-items: center;

    /deep/ .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #fff;
          &:hover {
            color: #42b983;
          }
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
