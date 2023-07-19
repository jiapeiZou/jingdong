<template>
     <!-- 1.展示静态子组件 分割线上的部分 -->
      <!-- 2.子组件滚动部分 -->
      <!-- 3.子组件页脚部分 -->
    <div class="wrapper">
      <StaticPart />
      <Nearby />
    </div>
    <div>
      <Docker :indexNumber="0"/>
    </div>
  </template>

<script>
// 1。引入文件
import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Docker from '../../components/Docker.vue'

export default {
  name: 'Home',
  // 2.注册局部组件
  components: { StaticPart, Nearby, Docker }
}
</script>

<style lang="scss" scoped>
.wrapper{//除开页脚项的剩余页面，整个大包装
  position:absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;//把页脚栏空出来
  right: 0;
  padding: 0 0.18rem;//内边距左右18px上下0
  overflow-y: auto;// 它所包括的区域能够向下滚动。不会溢出！！
}
</style>
