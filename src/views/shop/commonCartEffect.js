import { useStore } from 'vuex' // 引入全局数据仓库 储存购物车 加购
import { toRefs } from 'vue'

// 商品加减 修改全局数据 逻辑

export const useCommonCartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state) // 「获取全局数据」解构 cosnt cartList = store.state.cartList

  const changeItemToCart = (shopId, productId, productInfo, num) => { // 处理点击+时的事件；把接收参数 传递给 全局数据库
    store.commit('changeItemToCart', { shopId, productId, productInfo, num }) // 「同步更改全局数据」 调用commit方法 名为addItemToCart 它增加了state的 全局数据
  } // store.commit 是一种调用 mutation 的方式。Mutation 是一种用于修改 Vuex store 中 state 的唯一方法.同步更改全局数据
  return { cartList, changeItemToCart }
}
