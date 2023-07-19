<template>
    <div class="wapper">
      <div class="title">我的订单</div>
      <div class="order">
        <div class="order__item"  v-for="(item, index) in list" :key="index">

          <div class="order__shop">
            <h3 class="order__shop__text">{{ item.shopName }}</h3>
            <span class="order__shop__state">{{ item.isCanceled ? '已取消': '已下单' }}</span>
          </div>

          <div class="order__product">
            <div class="order__product__imgs">
              <img  class="img"
                v-for="(innerItem, innerIndex) in item.products"
                :key="innerIndex"
                :src="innerItem.product.img" >
            </div>
            <div class="order__product__number">
              <div class="order__product__total">&yen; {{ item.total }}</div>
              <div class="order__product__count">共{{item.products.length}}件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Docker :indexNumber="2"/>
</template>

<script>
import { get } from '../../utils/request'
import { reactive, toRefs } from 'vue'
import Docker from '../../components/Docker.vue'

// 订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] }) // 定义一个响应式数据list 用于存放get请求，从后端取到的值
  // get请求
  const getOrderList = async () => {
    const result = await get('/api/order')

    if (result?.data?.errno === 0 && result?.data?.data?.length) {
      const food = result.data.data

      for (const item in food) { // 遍历 算出总价 （food 层次较多，遍历了两次
        const foodList = food[item]
        const foodData = foodList.products
        // console.log('---', foodData)

        let total = 0
        for (const innerItem in foodData) { // 计算总价
          const foodValue = foodData[innerItem]
          total += (foodValue.orderSales * foodValue.product.price)
          console.log('+++++', total)
        }
        foodList.total = total // 给list里 新增一个total属性，并把算出的总价赋值给它
      }

      // console.log('======', food)
      data.list = result.data.data // list获取到新增total属性的后端返回值
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  console.log('======', list)
  return { getOrderList, list }
}

export default {
  name: 'OrderList',
  components: { Docker },

  setup () {
    // const store = useStore()
    // const route = useRoute()
    // const shopId = route.params.id
    const { getOrderList, list } = useOrderListEffect()
    return { getOrderList, list }
  }
}
</script>

<style lang="scss" scoped>
.wapper{//除开页脚项的剩余页面，整个大包装
  position:absolute;
  left: 0;
  top: 0;
  bottom: 0.49rem;//把页脚栏空出来
  right: 0;
  background: #f8f8f8;
  // padding: 0 0.18rem;//内边距左右18px上下0
}
.title{
  line-height: 0.44rem;
  background: #FFFFFF;
  text-align: center;
  font-size:  0.16rem;
  color: #333333;
}
.order__item{
  margin:0.16rem 0.18rem 0 0.18rem ;
  background: #FFFFFF;
  border-radius: 0.04rem;
  height: 1.11rem;
}
.order__shop{
  display: flex;
 line-height: 0.22rem;
  &__text{
    flex: 1;
    font-size: 0.16rem;
    color: #333333;
    margin: 0.16rem 0 0.16rem 0.16rem;
  }
  &__state{
    margin: 0.16rem  0.16rem 0.16rem 0;
    font-size: 0.14rem;
    color: #999999 ;
  }
}
.order__product{
  display: flex;
  margin: 0 0.16rem 0.16rem 0.16rem;
  &__imgs{
    flex: 1;
    overflow-x: scroll;
  }
  &__number{
     width: 0.7rem;
     text-align: right;
  }
  &__total{
      line-height: 0.2rem;
      color: #E93B3B;
      font-size: 0.14rem;
     }
     &__count{
      line-height: 0.14rem;
      color: #333333 ;
      font-size: 0.12rem;
      margin-top: 0.04rem;
     }
}
.img{
  height: 0.4rem;
  width: 0.4rem;
  margin-right: 0.12rem;
}
</style>
