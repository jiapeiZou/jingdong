<template>
    <!-- 蒙层 与 购物篮 的展示：不仅要ShowCart为true时， 还要购物车中商品数量>0 -->
     <div class="mask" v-if="ShowCart && total>0" @click="handleShowCart"></div>
     <div class="cart">
        <div class="right" v-if="ShowCart && total>0">
            <div class="right__header">
               <div class="right__header__icon iconfont" v-html="allCheck ? '&#xe618;': '&#xe60f;' "  @click="() => handleAllCheck( shopId )"> </div>
               <div class="right__header__all" >
                  <span class="right__header__allclick" @click="() => handleAllCheck( shopId )">全选</span>
               </div>
               <!-- 因为它做了flex布局 ，点击面大 裹一层span的标签，点周围没有效果，只要点击字 才生效 -->
               <div class="right__header__clear">
                 <span  @click="() => handleClearCart( shopId )" >  清空购物车 </span>
               </div>
            </div>
            <template  v-for="item in productList" :key="item._id">
                <!-- 占位符 实现展示已加购的商品。商品数量小于0时，不展示。只展示>0的商品 -->
                <div class="right__item" v-if="item.count>0" >
                    <div class="right__item__icon iconfont"  @click="() => handleCheck(shopId , item._id)"  v-html="item.check ? '&#xe618;': '&#xe60f;'" > </div>
                    <img class="right__item__img" :src="item.imgUrl" v-show="item.imgUrl" />
                    <div class="right__text">
                        <h3 class="right__text__title"> {{ item.name }} </h3>
                        <p class="right__text__price">
                            <span class="right__text__yen">&yen;</span>{{ item.price }}
                            <span class="right__text__origin"> &yen;{{ item.oldPrice }} </span>
                        </p>
                    </div>
                    <div class="item__number">
                        <div class="item__number__minus iconfont"  @click="() => { changeItemToCart(shopId , item._id, item, -1) }"> &#xe8e6; </div>
                        <!-- 初始时 购物车没有加入产品 显示0 。 购物车中有产品时，显示 储存在 全局数据中的数据，cartList中的 -- 商品ID shopId中的 --产品ID 中的 --count数量 -->
                        <div class="item__number__count"> {{ item.count || 0 }} </div>
                        <div class="item__number__plus iconfont"  @click="() => { changeItemToCart(shopId , item._id, item, 1) }"> &#xe8df; </div>
                    </div>
                </div>
            </template>
        </div>

     <div class="cart__2">
        <div class="cart__left">
            <img class="cart__left__img" src="../../assets/basket@3x.png" @click="handleShowCart"/>
            <div class="cart__left__tag">
               <div class="cart__left__tag__count"> {{total}} </div>
            </div>
            <div class="cart__left__check">
                总计：<span class="cart__left__yen"> &yen;{{ all }} </span>
            </div>
        </div>
        <div class="cart__right" v-show="total > 0">
             <router-link :to="{ path: `/orderConfirmation/${shopId}` }">去结算</router-link>
             <!-- 点击去结算时 1.当商品总价大于0 才会显示结算 2.跳到相应商铺ID的商店结算   让路由带上ID js表达式`${}`,因为shopId是动态的 -->
        </div>
    </div>
 </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useCommonCartEffect } from './commonCartEffect'

// 获取购物车 数据 逻辑
const useCartEffect = () => {
  const store = useStore() // 获取全局数据
  const cartList = store.state.cartList
  const route = useRoute() // 获取当前路由ID
  const shopId = route.params.id
  const { changeItemToCart } = useCommonCartEffect() // 调用公用修改商品数量的逻辑 完成已加购的商品 的数量加减，修改全局数据

  // 1.---计算商品数量
  const total = computed(() => {
    const productList = cartList[shopId]?.productList
    let count = 0
    if (productList) { // 如果里面有加入商品，执行以下代码。没有商品就返回count = 0
      for (const i in productList) { // 循环商品列表 计算数量count总和
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })
  // 2.---计算商品总价
  const all = computed(() => {
    const productList = cartList[shopId]?.productList

    let priceall = 0
    if (productList) {
      for (const x in productList) {
        const product = productList[x]
        if (product.check) { // 计算总价前 判断购物车中被勾选的才能计算总价
          priceall += (product.count * product.price)
        }
      }
    }
    return priceall.toFixed(2) // 金额四舍五入 只要两位小数
  })
  // 3.---已加入 购物车 的商品(通过点击 +号，修改已经存储在全局数据中的商品)
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || [] // 取出全局数据中的商品信息
    return productList
  })
  // 4.---绑定点击 勾选 或 取消勾选 商品，修改全局数据中的check
  const handleCheck = (shopId, productId) => {
    store.commit('handleCheck', { shopId, productId })
  }

  // 5.---绑定点击事件 清空购物车
  const handleClearCart = (shopId) => {
    store.commit('handleClearCart', { shopId })
  }

  // 6.---设置全选状态  当购物车中有商品，且商品没有被勾选时，取消全选状态
  const allCheck = computed(() => {
    const productList = cartList[shopId]?.productList
    let result = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.count > 0 && !product.check) {
          result = false
        }
      }
    }
    return result
  })

  // 7.---绑定点击事件，点击全选 勾选购物车中数量>0 的所有商品
  const handleAllCheck = () => {
    store.commit('handleAllCheck', { shopId })
  }

  return { total, all, productList, changeItemToCart, handleCheck, handleClearCart, allCheck, handleAllCheck }
}

// ---点击购物篮，展示 隐藏购物车逻辑
const showCartEffect = () => {
  const ShowCart = ref(false)
  const handleShowCart = () => {
    ShowCart.value = !ShowCart.value
  }
  return { ShowCart, handleShowCart }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute() // 获取当前路由ID
    const shopId = route.params.id
    const { handleShowCart, ShowCart } = showCartEffect()
    const { total, all, productList, changeItemToCart, handleCheck, handleClearCart, allCheck, handleAllCheck } = useCartEffect()
    return { total, all, productList, changeItemToCart, shopId, handleCheck, handleClearCart, allCheck, handleAllCheck, handleShowCart, ShowCart }
  }
}
</script>

<style lang="scss" scoped >
.mask{
    position: fixed; // 蒙层区域 固定定位
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(0,0,0,0.50);
}
.cart{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    &__2{
        display: flex;
        height: 0.49rem;
        width:100%;
    }
    &__left{
        display: flex;
        flex: 1;
        border-top: 0.01rem solid #F1F1F1;
        background: #fff;
        &__img{
            padding:.11rem 0 .12rem 0.24rem;
            height:.26rem;
            width: .28rem;
            position: relative;
        }
        &__tag{
            padding: 0 0.02rem;
            position: relative;
            left: -0.06rem;
            bottom: -0.06rem;
            height: .12rem;
            min-width: .12rem; // 它用来设置元素的最小宽度,内容变大 宽度随之变大
            border-radius: 1rem;
            background: #E93B3B;
            text-align: center;
            &__count{
              font-size: 0.12rem;
              color: #FFFFFF;
            }
        }
        &__check{
            padding-left: 0.3rem;
            line-height: 0.49rem;
            font-size: 0.12rem;
            text-align: center;
            color: #333333;
        }
        &__yen{
            display: inline-block;
            color: #E93B3B ;
            line-height: 0.49rem;
            font-size: 0.18rem;
            text-align: center;
        }
    }
    &__right{
        line-height: 0.49rem;
        width: 0.98rem;
        background: #4FB0F9;
        font-size: 0.14rem;
        text-align: center;
        a{
            color: #FFFFFF;
            text-decoration: none; // 去掉a标签的下划线
        }
    }
}

.right{
    display: flex;
    flex: 1;
    flex-direction: column; // flex弹性盒 主轴设置为y轴，竖向排列
    overflow-y: scroll; // 内容超出范围 有滚动条
    padding: 0 0.16rem 0 0.18rem;
    background: #FFF;
    &__header{
        height:0.52rem ;
        width: 100%;
        border-bottom:0.01rem solid #F1F1F1;
        display: flex;
        &__icon{
            color: #0091FF;
            font-size: 0.2rem;
            text-align: center;
            line-height: 0.5rem;
        }
        &__all{
            padding-left: 0.2rem;
            flex: 1;
            font-size: 0.14rem;
        }
        &__allclick{
            line-height: 0.52rem;
        }
        &__clear{
            flex: 1;
            line-height:0.52rem ;
            text-align: right;
            font-size: 0.14rem;
        }
    }
    &__item{
        position: relative; // 加减号按钮的父元素开启定位
        display: flex;
        padding: 0.12rem 0;
        &__icon{
            color: #0091FF;
            font-size: 0.2rem;
            text-align: center;
            line-height: 0.5rem;
            padding-right: 0.17rem;
        }
        &__img{
            height: 0.46rem;
            width: 0.46rem;
            padding-right: 0.16rem;
        }
    }
    &__text{
        overflow:hidden; // 超出部分 不显示 父元素限制宽度
            &__title{
                margin: 0;
                line-height: 0.2rem;
                font-size: 0.14rem;
                color: #333;
                overflow: hidden;//1.用于隐藏溢出的内容。(三个搭配使用，)
                white-space: nowrap;//2.用于防止文本自动换行
                text-overflow: ellipsis;//3.文本溢出的地方显示省略号...
            }
            &__price{
                margin: 0;
                padding-top: 0.06rem;
                line-height: 0.2rem;
                font-size: 0.14rem;
                color: #E93B3B;
            }
            &__yen{
                    font-size: 0.08rem;
                    color: #E93B3B;
            }
                &__origin{
                    padding-left: 0.06rem;
                    font-size: 0.1rem;
                    color: #999999;
                    text-decoration: line-through;
            }
        }
}
.item__number{
    position: absolute;
    bottom: 0.12rem;
    right: 0;
    line-height: 0.16rem;
    display: flex;
    &__count{
      font-size: 0.14rem;
      color: #333333 ;
      margin: 0 0.1rem 0 0.1rem;
    }
    &__minus{
        font-size: 0.2rem;
        color: #666666;
    }
    &__plus{
        font-size: 0.2rem;
        color:  #0091FF;
    }
}

</style>
