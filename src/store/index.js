import Vuex from 'vuex'
// 存储本地数据 localStorage: 下面每个方法 修改数据后 都调用一次
const setCartListLocalStorage = (state) => { // 刷新后数据仍然保存 ：将 state 中的cartList对象 它转化为 JSON 字符串 放在本地存储。
  const cartList = state.cartList
  const cartListString = JSON.stringify(cartList) // 将它转化为 JSON 字符串，然后保存到 localStorage 中。
  localStorage.cartList = cartListString // localStorage 只能存储字符串
}

// 取出本地数据 localStorage
const getCartListLocalStorage = () => { // JSON.stringify和JSON.parse 对象与字符串之间的转化
  try { // 尝试获取localSyorage中的cartList
    return JSON.parse(localStorage.cartList)
  } catch (e) { // 如果没有就返回空对象
    return {}
  }
}

export default Vuex.createStore({
// 存储数据  构造购物车数据结构  state:{ cartList:{ {shopId: {shopName:'', productList:{ productId:{  }}}}}}
  state: {
    cartList: getCartListLocalStorage()
    //                           -----第一层：购物车列表
    //    [shopId]: {shopName:'沃尔玛',         -----第二层是：店铺ID 内容 店铺名字及商品列表
    //             productList:{             -----第三层： 商品ID 内容是商铺数量及内容
    //                 [productId]:{  id:1,  count:2,  name:'番茄',  price:'35.4' ...}}  -----第四层：
    //
    // }
  },
  // 在这个方法里改变全局数据 store.commit 是一种调用 mutation 的方式。Mutation 是一种用于修改 Vuex store 中 state 的唯一方法
  mutations: { // 第一个参数:当前的state 第二个参数：payload 你需要传递额外的参数
    changeItemToCart (state, payload) {
      const { shopId, productId, productInfo, num } = payload // 它首先解构 payload，获取 shopId，productId，和 productInfo。

      let shopInfo = state.cartList[shopId] // 初始时state.cartList里没有shopId 返回undefined 的布尔值是flase , 取反为true 执行以下代码
      if (!shopInfo) { shopInfo = { shopName: '', productList: {} } } // 它查找 state 的 cartList 中是否有 shopId 的商店。如果没有，它就创建一个新的空对象。 如果存在就不执行

      let product = shopInfo.productList[productId]
      if (!product) { // 接着在这个商店中查找 productId 的商品。如果没有，它就将 productInfo 设置为新的商品，并且设置商品的 count 为 0。 如果存在就不执行
        product = productInfo
        product.count = 0
      }
      product.count = product.count + num // 每次你调用 changeItemToCart mutation 时，它都会在 cartList 中的对应商店的商品 数量 count 加 num +1 -1。如果商店或商品还不存在，它会创建一个新的商店或商品。
      if (product.count < 0) { product.count = 0 }// 数量小于0时 让它一直为0
      if (num > 0) { product.check = true }
      shopInfo.productList[productId] = product //  更新 cartList 中的商品 信息。出现过的会覆盖掉
      state.cartList[shopId] = shopInfo // 更新 cartList 中的商店 信息。 shopInfo = { shopName: '', productList: {} }
      setCartListLocalStorage(state)
    },

    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = { shopName: '', productList: {} } }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setCartListLocalStorage(state)
    },

    handleCheck (state, payload) { // 点击切换 check 是否勾选，修改全局数据中的check 取反
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setCartListLocalStorage(state)
    },

    handleClearCart (state, payload) { // 点击清空购物车 把把购物车中所有商品 变空
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setCartListLocalStorage(state)
    },

    handleAllCheck (state, payload) { // 点击全选 把购物车中所有商品 全部选中
      const { shopId } = payload
      const allproduct = state.cartList[shopId].productList
      if (allproduct) { // 如果存在商品
        for (const key in allproduct) {
          const product = allproduct[key]
          product.check = true
        }
      }
      setCartListLocalStorage(state)
    },

    clearProduct (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      console.log('clearProduct')
      setCartListLocalStorage(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
