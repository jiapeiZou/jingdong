<template>
    <div class="wrapper">
        <!-- 顶部 子组件 -->
        <TopArea/>
        <!-- 商品订单 子组件 -->
        <ProdectList/>
        <!-- 底部结算 子组件 -->
        <Order/>
    </div>
</template>

<script>
import TopArea from './TopArea.vue'
import ProdectList from './ProdectList.vue'
import Order from './Order.vue'

export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProdectList, Order }
}

</script>

<style lang="scss" scoped>
.wrapper{
position: absolute; // 想要占满屏幕区域 可以用定位来写
top: 0;
right: 0;
bottom: 0;
left: 0;
background: #eee;
display: flex;
flex-direction: column;
}
</style>
