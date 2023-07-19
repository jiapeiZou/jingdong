<template>
    <div class="wapper">

        <div class="search">
            <div class="search__back iconfont" @click="handleBackClick">&#xe7e0;</div>
            <div class="search__content">
                <span class="search__content__icon iconfont">&#xe600;</span>
                <input class="search__content__input" placeholder="请输入商品名称搜索"  v-model="keyword" @change="handleSearch"/>
            </div>
        </div>
        <!-- 调用子组件 -->
        <router-link
            v-for="item in shopList"
            :key="item._id"
            :to="`/shop/${item._id}`">
            <ShopInfo :item="item" :showBorder="true" />
        </router-link>

    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

export default {
  name: 'SearchList',
  components: { ShopInfo }, // 声明子组件

  setup () {
    const router = useRouter()
    const route = useRoute()
    const keyword = ref(route.query.keyword || '') // keyword响应式数据 = route传过来的keyword的值（你搜索的内容）

    // 点击返回
    const handleBackClick = () => {
      router.back()
    }

    // 搜索关键词 展示相关店铺内容 逻辑
    const handleSearch = () => {
    //   const searchWord = e.target.value // 获取到 change监听事件 监听到的input框 内容的变化值（输入的内容）
      getSearch(keyword.value) //  change监听事件，监听到数据变化后 --调用getSearch函数，（接收参数 为搜索的关键词 ，get请求时 传入此数据）向后端请求 获取相关关键词内容
    }

    // 获取后端数据  展示搜索相关 内容
    const shopList = ref({})
    const getSearch = async (keyword) => {
      const result = await get('/api/shop/search', { keyword })
      if (result?.data?.errno === 0 && result?.data?.data?.length) {
        shopList.value = result.data.data
      }
      console.log(result)
      return { shopList }
    }

    getSearch(keyword.value)
    return { handleBackClick, handleSearch, keyword, getSearch, shopList }
  }

}
</script>

<style lang="scss" scoped>
.wapper {
    margin: 0 0.18rem ;
    position: relative;
}
.search{
    margin: .18rem 0 .12rem 0 ;
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
                color:  #757474;
            }
        }
    }
}
a{
    text-decoration: none;
}

</style>
