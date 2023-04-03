<template>
  <div class="tags">
    <el-tag
        v-for="item in tabsList"
        :key="item.path"
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ? 'dark' : 'plain'">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CommonTag',
  data () {
    return {}
  },
  computed: {
    ...mapState('tab', ['tabsList']),
  },
}
</script>

<style lang="less" scoped>

</style>
