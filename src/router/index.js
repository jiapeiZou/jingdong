import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
  // 首页
  path: '/', // 路径
  name: 'Home',
  component: () => import(/* webpackChunkName:"home" */'../views/home/Home.vue')
}, { // 商家详情
  path: '/shop/:id', // 把对应商家的id 带到页面上来 。变成动态路由，需要传入id 才能访问到具体哪个商家店铺。从首页点进 查看商家详情，其实排版都是一样的，只是内容不同，
  name: 'Shop',
  component: () => import(/* webpackChunkName:"shop" */'../views/shop/Shop.vue') // 动态路由 异步组件（显示其他页面时，后台不会加载这个页面的代码，当你点击加载这个页面时，才会执行加载页面代码。提高页面跳转速度
},
{ // 注册
  path: '/register',
  name: 'Register',
  component: () => import(/* webpackChunkName:"register" */'../views/register/Register.vue'),
  beforeEnter (to, from, next) {
    const isLogin = localStorage.isLogin // 获取登录状态，是否登录过
    if (isLogin) {
      next({ name: 'Home' }) // 如果已经登录过，就会跳转到Home路径
    } else {
      next() // 如果没有登录过 那就执行当前 Register 注册 路径
    }
  }
}, { // 登陆页面
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName:"login" */'../views/login/Login.vue'),
  beforeEnter (to, from, next) { // 1.每个路由项可加入的函数，函数 在你进入当前这个路由之前就被执行
    const isLogin = localStorage.isLogin // 获取登录状态，是否登录过
    if (isLogin) {
      next({ name: 'Home' }) // 如果已经登录过，而又来登录页面时，就会跳转到Home路径
    } else {
      next() // 如果没有登录过，那就执行当前这个Login路径
    }
  }
}, { // 购物车
  path: '/cartList',
  name: 'CartList',
  component: () => import(/* webpackChunkName:"cartList" */'../views/cartList/CartList.vue')
}, { // 订单
  path: '/orderConfirmation/:id', // 路径：把对应商家的id 带到页面上来 。变成动态路由，需要传入id 才能访问到具体哪个商家店铺。从首页点进 查看商家详情，其实排版都是一样的，只是内容不同，
  name: 'OrderConfirmation',
  component: () => import(/* webpackChunkName:"orderConfirmation" */'../views/orderConfirmation/OrderConfirmation.vue') // 动态路由 异步组件（显示其他页面时，后台不会加载这个页面的代码，当你点击加载这个页面时，才会执行加载页面代码。提高页面跳转速度
}, { // 我的订单
  path: '/orderList',
  name: 'OrderList',
  component: () => import(/* webpackChunkName:"orderList" */'../views/orderList/OrderList.vue')
}, { // 搜索
  path: '/search', // URL上显示的路径
  name: 'Search', // 路由的名字
  component: () => import(/* webpackChunkName:"orderList" */'../views/search/Search.vue') // 路由的组件（页面的显示内容）
}, { // 搜索后展示的相关内容页面
  path: '/searchList',
  name: 'SearchList',
  component: () => import('../views/searchList/SearchList.vue')
}, { // 我的
  path: '/my',
  name: 'My',
  component: () => import('../views/my/My.vue')
}, { // 我的地址
  path: '/address',
  name: 'Address',
  component: () => import('../views/address/Address.vue')
}, { // 新建地址
  path: '/addressEdit',
  name: 'AddressEdit',
  component: () => import('../views/addressEdit/AddressEdit.vue')
}, { // 选择地址
  path: '/addressSelect',
  name: 'AddressSelect',
  component: () => import('../views/addressSelect/AddressSelect.vue')
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage // 从 localStorage 中获取 isLogin 的值：const isLogin = localStorage.isLogin
  const { name } = to // 解构 name = 你想访问跳转的路由的名字
  const isLoginOrRegister = (name === 'Login' || name === 'Register'); // 判断目标路由是否是 要去 登录页面或 注册页面
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' }) // 如果用户已经登录，或者目标路由是登录页面或注册页面，那么允许导航继续，调用 next()。否则，重定向到登录页面，调用 next({ name: 'Login' })。
})
// if (isLogin || to.name === 'Login') {
//   next()
// } else {
//   next({ name: 'Login' })
// }

// 2.router整体 可加的函数，当路由在切换时 执行.用来决定是否允许或阻止导航到新的路由
// 导航守卫 beforeEach 这个守卫会在路由改变之前（页面跳转之前）被调用。接受三个参数：to 表示即将要进入的目标路由对象 from 示当前导航正要离开的路由 next 函数需要被调用才会执行接下来的导航。
// router.beforeEach((to, from, next) => { // 每次页面跳转 之前，会执行的钩子函数
//   const isLogin = localStorage.isLogin // 拿到登录状态 ，看是否登录过，再做判断
//   if (isLogin || to.name === 'Login') { // 逻辑或 如果isLogin为true（已经登录过） 或者 去的路径名为Login（正好去登陆页面）
//     next() // 执行 去当前想去的页面路径
//   } else { // 没有登录过，想去其他页面时，就会跳转到登录页面
//     next({ name: 'Login' }) // 去名为Login的路径
//   }
// })
// 3. beforeEnter 每个路由项 执行的函数
// beforeEnter (to, from, next) { // 1.每个路由项可加入的函数，函数 在你进入当前这个路由之前就被执行
//   const isLogin = localStorage.isLogin // 获取登录状态，是否登录过
//   if (isLogin) {
//     next({ name: 'Home' }) // 如果已经登录过，而又来登录页面时，就会跳转到Home路径
//   } else {
//     next() // 如果没有登录过，那就执行当前这个Login路径
//   }
// }

export default router
