<template>
    <div class="content">
        <div class="left">
            <div
              :class="{'left__item':true ,'left__item--active':leftItemTab === item.tab}"
              v-for="item in leftItem"
              :key="item.name"
              @click="() => handleLeftItem(item.tab)"
              > {{ item.name }} </div>
              <!-- 每次循环把 相应的tab传给handleLeftItem函数 -->
        </div>
        <div class="right">
            <div class="right__item" v-for="item in shopContent" :key="item._id">
                <img class="right__item__img" :src="item.imgUrl" v-show="item.imgUrl" />
                <div class="right__text">
                    <h3 class="right__text__title"> {{ item.name }} </h3>
                    <p class="right__text__sales"> 月售：{{ item.sales }} 件 </p>
                    <p class="right__text__price">
                        <span class="right__text__yen">&yen;</span>{{ item.price }}
                        <span class="right__text__origin"> &yen;{{ item.oldPrice }} </span>
                    </p>
                </div>
                <div class="item__number">
                    <div class="item__number__minus iconfont"  @click="() => { changeCartItem(shopId , item._id, item, -1, shopName) }"> &#xe8e6; </div>
                    <!-- 初始时 购物车没有加入产品 显示0 。 购物车中有产品时，显示 储存在 全局数据中的数据，cartList中的 -- 商品ID shopId中的 --产品ID 中的 --count数量 -->
                    <div class="item__number__count">{{ getProductCount(shopId, item._id) }}</div>
                    <div class="item__number__plus iconfont"  @click="() => { changeCartItem(shopId , item._id, item, 1, shopName) }"> &#xe8df; </div>
                </div>
            </div>
            </div>
        </div>
</template>

<script>
import { get } from '../../utils/request'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { reactive, ref, toRefs } from 'vue'
import { useCommonCartEffect } from './commonCartEffect'

// get 请求获取右边数据 逻辑
const useGetItemEffect = () => {
  const data = reactive({ shopContent: [] }) // 响应式数据
  const getContentData = async (tab) => { // async 声明异步函数 接收下面 handleLeftItem函数 调用它时传的参数
    const result = await get('/api/shop/:id/products', { tab }) //  后端要求get请求时 传值tab
    if (result?.data?.errno === 0 && result?.data?.data) {
      data.shopContent = result.data.data
    }
  }
  const { shopContent } = toRefs(data)
  return { getContentData, shopContent }
}

// 处理点击 tab的不同 切换不同商品逻辑
const useClickEffect = (getContentData) => {
  const leftItem = [{ name: '全部商品', tab: 'all' }, { name: '秒杀', tab: 'seckill' }, { name: '新鲜水果', tab: 'fruit' }] // 定义 后端要求get请求时 传值 tab为：all,seckill,fruit
  const leftItemTab = ref(leftItem[0].tab) // 定义响应式数据：leftItemTab 初始值 = leftItem数组的第一项，中的tab。后面绑定的点击事件 会更改它，这一步用于显示点击某个，它的样式背景变成白色，才知道被选中了
  const handleLeftItem = (tab) => { // 接收参数：绑定点击事件时，获取到每次循环得到的item.tab
    getContentData(tab) // 当每一次点击 都传入一次相应的tab，执行get请求后端数据。所以点击 全部商品，秒杀，新鲜水果时，得到不一样的页面。
    leftItemTab.value = tab // 每一次点击事件，就让data.leftItemTab = 当前被点击的元素的 tab
  }
  return { handleLeftItem, leftItemTab, leftItem }
}

// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore() // 获取全局数据
  const cartList = store.state.cartList

  const { changeItemToCart } = useCommonCartEffect()

  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName }) // 修改全局数据 调用store.commit（）方法，提交 函数名和传递的参数
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeItemToCart(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCount = (shopId, productId) => {
    const count = cartList?.[shopId]?.productList?.[productId]?.count || 0
    return count
  }
  return { changeCartItem, cartList, getProductCount }
}

export default {
  name: 'Content',
  props: ['shopName'], // 接收：shopName 由 shop父组件 传递过来的信息
  setup () {
    const route = useRoute()
    const shopId = route.params.id // 获取当前 shop的ID
    const { getContentData, shopContent } = useGetItemEffect()
    const { handleLeftItem, leftItemTab, leftItem } = useClickEffect(getContentData)
    const { changeCartItem, cartList, getProductCount } = useCartEffect()

    getContentData()
    return { leftItem, leftItemTab, getContentData, shopContent, handleLeftItem, cartList, shopId, changeCartItem, getProductCount }
  }

}

</script>

<style lang="scss" scoped>
.content{
    display: flex;
    position: absolute; // 开启绝对定位 父元素也需要开启定位，没有父元素的话 ，这里的父元素就是body
    left: 0;
    right: 0;
    top: 1.5rem; // 距离顶部 150px
    bottom: 0.49rem; // 距离底部 50px
}
.left{
    display: flex;
    flex-direction: column;
    overflow-y: scroll; // 当元素的内容太大而无法适应指定的宽度和高度时.scroll：内容会被裁剪，但是浏览器会显示滚动条以便查看其余的内容。
    background: #F5F5F5;
    width: 0.75rem;
    height: 100%;
    &__item{
        line-height: 0.4rem;
        width: 100%;
        font-size: 0.14rem;
        text-align: center;
        &--active{
            background: #fff;
        }
    }
}
.right{
    display: flex;
    flex: 1;
    flex-direction: column; // flex弹性盒 主轴设置为y轴，竖向排列
    overflow-y: scroll; // 内容超出范围 有滚动条
    padding: 0 0.16rem 0 0.18rem;
    &__item{
        position: relative; // 加减号按钮的父元素开启定位
        display: flex;
        padding: 0.12rem 0;
        border-bottom: .01rem solid #F1F1F1;
        &__img{
            height: 0.68rem;
            width: 0.68rem;
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
            &__sales{
                margin: 0.06rem 0;
                line-height: 0.16rem;
                font-size: 0.12rem;
                color: #333;
            }
            &__price{
                margin: 0;
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
