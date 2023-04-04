<template>
  <div id="app">
    <!--路由出口-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background: #737373;
  cursor: pointer;
  border-radius: 4px;
}
::-webkit-scrollbar-corner {
  display: none;
}
::-webkit-resizer {
  display: none;
}
</style>
