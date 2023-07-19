<template>
    <div class="wrapper">
        <div class="header">
            <div class="header__title">我的全部购物车 （{{Object.values(cartList).filter((item) => item.allCount > 0).length}}）</div>
        </div>

        <div class="content">
            <!-- 当商店里的商品数量>0时，显示 -->
            <div class="shop" v-for="(item,index) in cartList" :key="index" v-show="item.allCount > 0">
                <h3 class="shop__text"> {{ item.shopName }} </h3>
                <div class="food__box">
                    <template v-for="innerItem in item.productList" :key="innerItem._id" >
                        <!-- 遍历循环 筛选 商品数量>0 已经勾选的商品    购物窗口最多显示2个商品，点击后展开所有商品的逻辑：未点击前只展示 已勾选商品的realIdx值 <= 1 （前两个商品），后面>1的商品不满足 返回false不展示-->
                       <!-- 展开更多商品 ：点击触发handleShowClick(item) 事件，让商店的的showAll属性的值 变为true。所以让 不满足realIdx <= 1的商品（第三个及后面的商品），也变成了true，满足展示要求 -->
                        <div class="content__food" v-if="innerItem.count>0 && innerItem.check && (innerItem.realIdx <= 1 || item.showAll)"  @click="() => toOrderConfirmation(index)">
                            <img  class="content__img" :src="innerItem.imgUrl">
                            <div class="content__text">
                                <div class="content__name">{{ innerItem.name }}</div>
                                <div class="content__number">
                                    <div class="content__number__count">
                                        &yen;<div class="count"> {{ innerItem.price }} x {{ innerItem.count }} </div>
                                    </div>
                                    <div class="content__number__price">
                                        &yen;<div class="price">{{ (innerItem.price * innerItem.count).toFixed(2) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="foot" >
                    <div class="foot__data">
                        <div class="foot__item" @click="() => handleShowClick(item)">
                            <span  class="foot__item__count"> 共计 {{ item.allCount }} 件/ {{(item.total).toFixed(2)}}元</span>
                            <span class="foot__item__icon iconfont" v-if="item.type > 2 ">  &#xe65e;</span>
                        </div>
                    </div>
                </div>
            </div>
                 <!-- 要不要显示 此文字 取决于 notHaveProduct计算属性返回的值 -->
            <div class="nothave" v-if="notHaveProduct">购物车里空空的</div>
        </div>

        <div class="footer">
            <Docker :indexNumber="1"/>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Docker from '../../components/Docker.vue' // 引入页脚子组件
import { useRouter } from 'vue-router'

// 获取购物车逻辑
const useCartListEffect = () => {
  const router = useRouter()
  const store = useStore()

  const cartList = computed(() => {
    const cartList = store.state.cartList || {}

    // 遍历取出本地储存 的购物车信息
    for (const item in cartList) {
      const shop = cartList[item]
      const products = shop.productList
      console.log('=====', cartList)
      let total = 0
      let allCount = 0
      let realIdx = 0
      let type = 0
      for (const innerItem in products) {
        const food = products[innerItem]
        food.realIdx = realIdx // 给每件商品添加新属性realIdx： 下一个商品等于上一个商品的realIdx的值
        if (food.check && food.count > 0) { // 过滤掉 未勾选 & 数量 <= 0的商品
          allCount += food.count // 计算该店铺下：商品总数量
          total += (food.count * food.price) // 计算该店铺下 ：商品总价
          realIdx += 1 // 让已经勾选的商品的 realIdx的值 = 上一个商品realIdx的值+1   依次遍历 让已勾选的商品的realIdx的值 从0——N 递增+1 排列。
          type += 1
          console.log(realIdx)
        }
      }
      shop.total = total // 给cartList的元素添加新属性
      shop.allCount = allCount // 添加新属性
      shop.showAll = false
      shop.type = type
    }
    return cartList
  })
  // 点击展示全部商品
  const handleShowClick = (shop) => { // 处理点击事件，点击时传入参数，把模版中遍历的cartList 的 item 传递过来。并给它增加新的属性
    console.log('handleShowClick', shop)
    shop.showAll = !shop.showAll
  }
  // 跳转到结算页面
  const toOrderConfirmation = (shopId) => {
    router.push(`/orderConfirmation/${shopId}`) // 要求带上当前商店ID 模版中传入
  }
  // 当购物车内 无内容时 展示的内容
  const notHaveProduct = computed(() => {
    let productCount = 0
    for (const productItem in cartList.value) { // 直接遍历 cartList 计算属性算出来的值，计算属性返回的值 需要用value来获取
      const shopValue = cartList.value[productItem]
      productCount += shopValue.allCount // 计算 所有商品中的商品数量
    }
    return productCount === 0 // 直接返回 布尔值
  })

  return { cartList, handleShowClick, toOrderConfirmation, notHaveProduct }
}

export default {
  name: 'CartList',
  components: { Docker },
  setup () {
    const { cartList, handleShowClick, toOrderConfirmation, notHaveProduct } = useCartListEffect()
    return { cartList, handleShowClick, toOrderConfirmation, notHaveProduct }
  }
}

</script>

<style lang="scss" scoped >
.header{
    height: 0.44rem;
    text-align: center;
    &__title{
        padding: 0.15rem 0 0.11rem 0;
        line-height: 0.22rem;
        font-size: 0.16rem;
    }
}
.content{
    position: absolute;
    top: 0.44rem;
    bottom: 0.49rem;
    left: 0;
    right: 0;
    background: #f8f8f8;
    overflow-y: scroll;
}
.shop{
    background: #FFFFFF;
    margin: 0.16rem 0.18rem;
    border-radius: 0.04rem;
    &__text{
        padding: 0.16rem ;
        margin: 0;
    }
}
.food__box{
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    // max-height: 1.24rem;
}
.content__food{
    padding: 0 0.16rem 0.16rem 0.16rem ;
    background: #FFFFFF;
    display: flex;
}
.content__img{
    height: 0.46rem;
    width: 0.46rem;
    margin-right: 0.16rem;
}
.content__text{
    flex: 1;
}
.content__name{
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #333;
    margin-bottom: 0.06rem;
}
.content__number{
    display: flex;
    justify-content: space-between;
    &__count{
        display: flex;
        color: #E93B3B;
        line-height: 0.14rem;
        font-size: 0.08rem;
        text-align: center;
    }
    &__price{
        display: flex;
        color: #000000;
        line-height: 0.14rem;
        font-size: 0.08rem;
        text-align: right;
        text-align: center;
    }
}
.count{
    font-size: 0.14rem;
}
.price{
    font-size: 0.14rem;
}
.nothave{
    margin-top: 0.1rem;
    text-align: center;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #666666;
}
.foot{
    position: relative;
    height: 0.44rem;
    &__data{
        position: absolute;
        top: 0;
        right: 0.16rem;
        left: 0.16rem;
        bottom: 0.16rem;
        line-height: 0.28rem;
        background:#F5F5F5 ;
    }
    &__item{
        text-align: center;
        color: #999999;
        font-size: 0.14rem;
        &__icon{
            margin-left: 0.1rem;
        }
    }
}

</style>
