<template>
    <div class="content">
        <div class="content__item">
            <h3 class="content__text"> {{ shopName }} </h3>
                <div class="foodbox">
                    <div class="content__food" v-for="item in productList" :key="item._id" >
                        <img class="content__food__img" :src="item.imgUrl" />
                        <div class="content__food__text">
                            <h3 class="content__food__name"> {{ item.name }} </h3>
                            <div class="content__food__price">
                                <div class="food__price">
                                <span class="content__food__yen">&yen;</span>
                                {{ item.price }} x {{ item.count }}
                                </div>
                                <div class="content__all">
                                    <p class="content__all__number">
                                        <span class="content__all__yen">&yen;</span>
                                        {{ (item.price * item.count).toFixed(2) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

// 获取购物车 数据 逻辑
const useCartEffect = () => {
  const route = useRoute() // 获取当前ID
  const shopId = route.params.id
  const store = useStore() // 获取全局数据
  const cartList = store.state.cartList

  // 1. 取出全局数据中的商品信息,已加购的产品
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    const newProductList = []
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0 && product.check) { // 过滤 只显示数量>1, 并勾选 的商品
        newProductList.push(product)
      }
    }
    return newProductList
  })
  // 2. 获取 商品名字
  const shopName = computed(() => { // computed计算属性 ，具有响应式的效果，随依赖的值发生变化而变化。
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
  return { productList, shopName }
}

export default {
  name: 'ProdectList',
  setup () {
    const { productList, shopName } = useCartEffect()
    return { productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
.content{
    box-sizing: border-box;
        margin-top: 0.16rem ;
    &__item{
        margin: 0 0.18rem 0.16rem 0.18rem;
        background: #FFFFFF;
        position: relative;
        box-sizing: border-box;
    }
    &__text{
        margin: 0;
        padding:0.16rem ;
        font-size: 0.16rem;
    }
}
.foodbox{
        max-height: 4.1rem;
        box-sizing: border-box;
        overflow-y: scroll;
}
.content__food{
        display: flex;
        position: relative;
        padding: 0 0.16rem 0.16rem 0.16rem ;
        background: #FFFFFF;
}
.content__food__img{
        height: 0.46rem;
        width: 0.46rem;
        padding-right: 0.16rem;
    }
.content__food__text{
    overflow:hidden; // 超出部分 不显示 父元素限制宽度
}
.content__food__name{
    margin: 0;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #333;
    overflow: hidden;//1.用于隐藏溢出的内容。(三个搭配使用，)
    white-space: nowrap;//2.用于防止文本自动换行
    text-overflow: ellipsis;//3.文本溢出的地方显示省略号...
}
.content__food__price{
   display: flex;
}
.food__price{
    margin: 0;
    padding-top: 0.06rem;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #E93B3B;
}
.content__food__yen{
    margin: 0;
    font-size: 0.1rem;
    color: #E93B3B;
}
.content__all{
    margin: 0;
    position: absolute;
    right: 0;
    padding-top: 0.06rem;
    text-align: right;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #000000 ;
    &__number{
        margin: 0;
        padding-right: 0.16rem;
    }
    &__yen{
        font-size: 0.1rem;
    }
}
</style>
