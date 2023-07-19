<template>
    <div class="order">
        <div class="order__total"> 实付金额 <b>&yen;{{ total }}</b>  </div>
        <div class="order__submit" @click="() => handleSubmitClick(true)"  v-show="showSubmitBtn">提交订单</div>
    </div>
    <div class="mask" v-show="maskShow" @click="() => handleSubmitClick(false)">
        <!-- @click.stop 阻止点击冒泡 ，点击蒙层时 关闭弹框。 弹框是蒙层里的内容。 阻止 点到白色弹框也关闭蒙层 -->
        <div class="mask__content" @click.stop>
            <h3 class="mask__content__title">确认要离开收银台？</h3>
            <p class="mask__content__text">请尽快完成支付，否则将被取消</p>
            <div class="mask__content__but">
                <div class="mask__content__but__left" @click="() => handlePayClick(true)">取消订单</div>
                <div class="mask__content__but__right" @click="() => handlePayClick(false)">确认支付</div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { post } from '../../utils/request' // 引入post请求
import { useToastEffect } from '../../components/Toast' // 引入 请求失败后的 弹窗样式
// ------蒙层展示相关逻辑
const maskShowEffect = () => {
  const maskShow = ref(false)
  const handleSubmitClick = (x) => { // 点击确认支付 弹出蒙层，接收外表传递的false或true
    maskShow.value = x // maskShow是ref响应式数据，取值为maskShow.value
    return maskShow
  }
  return { handleSubmitClick, maskShow }
}
// -------订单相关逻辑
const orderListEffect = () => {
  const store = useStore() // 获取全局数据
  const cartList = store.state.cartList
  const route = useRoute() // 获取当前ID
  const router = useRouter()
  const shopId = route.params.id
  const addressId = route.query.addressId
  const { showToast } = useToastEffect()

  //  计算商品总价
  const total = computed(() => {
    const productList = cartList[shopId]?.productList
    let all = 0
    for (const i in productList) {
      const product = productList[i]
      if (product.check) { // 计算总价前 判断购物车中被勾选的才能计算总价
        all += (product.count * product.price)
      }
    }
    return all.toFixed(2) // 金额四舍五入 只要两位小数
  })
  // 获取商铺名字
  const shopName = computed(() => { // computed计算属性 ，具有响应式的效果，随依赖的值发生变化而变化。
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
  // 绑定事件 确认支付or取消订单: 提交用户填写的信息 给后端发请求
  const handlePayClick = async (isCanceled) => { // 接收模版中 传入的isCanceled的值
    const productList = cartList[shopId]?.productList
    const products = []
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0 && product.check) { // 过滤数量>0,并勾选成功的产品
        products.push({ id: product._id, num: product.count }) // 构建 后端需要的传入数据类型
      }
    }
    try { // post 请求向后端存入 要求的结构的数据。
      const result = await post('/api/order', { // result = 发送请求后 后端返回的结果
        addressId,
        shopId,
        shopName: shopName.value, // 获取 计算属性computed返回的是一个对象，获取它的值 需要.value 模版中会自动调节，但在js里需要写成:返回值.value
        isCanceled, // 是否取消订单的值为：false或true 由点击时传入的’变量决定‘
        products
      })
      if (result?.data?.errno === 0) { // 请求发送： 成功
        router.push({ name: 'OrderList' }) // 1.跳转到我的订单页面
        if (isCanceled === false) {
          store.commit('clearProduct', { shopId }) // 2.确认支付后 该店铺的清空购物车
        }
      } else { // 请求发送： 失败
        showToast('支付失败')
        console.log('------')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  return { total, handlePayClick }
}

export default {
  name: 'Order',
  setup () {
    const route = useRoute()
    const { maskShow, handleSubmitClick } = maskShowEffect()
    const { total, handlePayClick } = orderListEffect()
    return {
      total,
      maskShow,
      handlePayClick,
      handleSubmitClick,
      showSubmitBtn: !!route.query.addressId // 返回一个布尔值 ，判断路由上是否带有addressId，以便判断之前是否填写过地址
    }
  }
}
</script>

<style lang="scss" scoped>
.order{
    display: flex;
    background: #FFFFFF;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 0.49rem;
    line-height: 0.49rem;
    font-size: 0.14rem;
    &__total{
        flex: 1;
        padding-left: 0.24rem;
        color: #333333;
    }
    &__submit{
        width: 0.98rem;
        background: #4FB0F9;
        color: #FFFFFF;
        text-align: center;
    }
}
.mask{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.50);
    &__content{
        position: absolute;
        top: 50%;
        left: 50%; // 相对页面定位 实现上下 左右居中
        transform: translate(-50%,-50%);
        height: 1.57rem;
        width: 3rem;
        background: #FFFFFF;
        border-radius: .04rem;
        text-align: center;
        &__title{
            font-size: 0.18rem;
            margin: 0.24rem 0 .08rem 0;
        }
        &__text{
            font-size: 0.14rem;
            color: #666666;
            font-size: 0.14rem;
            line-height: .2rem;
            margin: 0 0 0.24rem 0;
        }
        &__but{
            display: flex;
            font-size: 0.14rem;
            margin-bottom: 0.24rem;
            &__left{
                line-height: 0.32rem;
                width: 0.8rem;
                border: 0.01rem solid #4FB0F9;
                border-radius: 0.16rem;
                color: #0091FF;
                margin:0  0.24rem 0 .59rem;
            }
            &__right{
                line-height: 0.32rem;
                width: 0.8rem;
                border:  0.01rem solid #4FB0F9;
                border-radius:  0.16rem;
                background: #4FB0F9;
                color: #FFFFFF;
            }
        }
    }
}

</style>
