<template>
    <div class="wrapper">
        <div class="search">
            <div class="search__back iconfont" @click="handleBackClick">&#xe7e0;</div>
            <div class="search__content">
                <span class="search__content__icon iconfont">&#xe600;</span>
                <input class="search__content__input" placeholder="请输入商品名称搜索"/>
            </div>
        </div>
             <!-- 调用子组件    v-show="data.item.imgUrl" 这一步是为了让图片未加载出来时 ，不会出现裂图 的现象 -->
            <ShopInfo :item="data.item" :showBorder="false"  v-show="data.item.imgUrl" />
            <Content :shopName="data.item.name"/>
            <Cart/>
        </div>

</template>

<script>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo' // 引入局部组件
import Content from './Content.vue' // 引入局部组件
import Cart from './Cart.vue' // 引入局部组件

// 获取后端 商家详情的数据
const useShopInfoEffect = () => {
  const route = useRoute() // useRoute 提供了当前激活的 route 对象（shop），你可以使用它来访问当前路由的id，名字，参数，哈希值等
  console.log(route.name, route.params) // 打印出：shop,{id:'2'} .useRoute里的name,params,可以获取当前路由的姓名与ID

  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`) // 由useRoute()方法 可由useRoute.params获得当前路由的ID，用js表达式 `${route.params.id}` = 'route.params.id'
    if (result?.data?.errno === 0 && result?.data?.data) {
      data.item = result.data.data
    }
    console.log(data.item)
  }
  return { getItemData, data }
}
// 点击返回上一页的逻辑
const useBackEffect = () => {
  const router = useRouter() // useRouter 提供了整个 router 实例，你可以使用它来进行导航
  const handleBackClick = () => {
    router.back() // 路由的back方法，可以回到上一页(你从哪里来的那一页)
  }
  return { handleBackClick }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },

  setup () {
    const { getItemData, data } = useShopInfoEffect()
    const { handleBackClick } = useBackEffect()
    getItemData()
    return { data, getItemData, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
    padding: 0 0.18rem;
}
.search{
    margin: .18rem 0 .04rem 0 ;
    display: flex;
    &__back{
        color:#B6B6B6;
        line-height: 0.32rem;
        width: 0.3rem;
        font-size: 0.22rem;
    }
    &__content{
        display: flex;
        flex: 1;
        background: #F5F5F5;
        border-radius:  0.16rem;
        &__icon{
            width: 0.44rem;
            line-height: 0.32rem;
            color: #B7B7B7;
            font-size: 0.16rem;
            text-align: center;
        }
        &__input{
            padding-right: 0.2rem;
            line-height: 0.32rem;
            width: 100%;
            border:none;
            outline: none;
            background: none;
            border-radius:  0.16rem;
            font-size: 0.14rem;
            color: #333333;
            &::placeholder{ // 修饰符 修饰input框中默认字的颜色
                color:  #333333;
            }
        }
    }
}

</style>
