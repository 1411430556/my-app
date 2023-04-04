<template>
  <div class="tags">
    <el-tag
        v-for="(item, index) in tabsList"
        :key="item.path"
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ? 'dark' : 'plain'"
        @click="changeMenu(item)"
        @close="handleClose(item, index)"
        size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CommonTag',
  data () {
    return {}
  },
  computed: {
    ...mapState('tab', ['tabsList']),
  },
  methods: {
    ...mapMutations('tab', ['CLOSE_TAG']),
    // 点击tag跳转的功能
    changeMenu (item) {
      this.$router.push(item.path)
    },
    // 点击tag删除的功能
    handleClose (item) {
      // 调用store中的mutations
      this.CLOSE_TAG(item)
      const lastIndex = this.tabsList.length - 1
      // 删除之后的跳转逻辑
      // 方法①
      if (this.$route.name !== 'home') {
        this.$router.push(this.tabsList[lastIndex])
      }

      // 方法②
      /*  if (this.$route.name !== 'home') {
         // 其实这个应该是会多次跳转，但是最终会跳转到数组里最后一项的地址
         this.tabsList.forEach(item => this.$router.push(item.path))
       } */

      // 方法③
      /* if (item.name !== this.$route.name) {
        return
      }
      // 表示的是删除的最后一项
      if (index === length) {
        this.$router.push({
          name: this.tabsList[index - 1].name,
        })
      } else {
        this.$router.push({
          name: this.tabsList[index].name,
        })
      } */
    },
  },
}
</script>

<style lang="less" scoped>
.tags {
  padding: 20px;

  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
