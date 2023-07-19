<template>
    <div class="wrapper">
       <div class="top">
            <div class="search">
                <div class="search__bcg">
                    <div class="search__icon iconfont" > &#xe600; </div>
                    <!--  v-model 双向绑定 以便于确认后清空输入框的内容  change事件，监听input框中内容的变化-->
                    <input class="search__input" @change="handleSearchChange"  v-model="inputValue" placeholder="山姆会员商店优惠商品">
                </div>
                <div class="search__text"  @click="handleBackHome"> 取消 </div>
            </div>
       </div>
             <!-- 如果历史搜索 内有内容 才展示。否则隐藏 -->
       <div class="area" v-if="searchList.length">
            <div class="area__title">
                <h4 class="area__title__text1">搜索历史</h4>
                <div class="area__title__text2" @click="handleClearSearch">清除搜索历史</div>
            </div>
            <ul class="area__list">
                <li class="area__list__item" v-for="(item, index) in searchList" :key="index"  @click="() => handleToWord(item)"> {{ item }} </li>
            </ul>
       </div>

       <div class="area">
            <div class="area__title">
                <h4 class="area__title__text1">热门搜索</h4>
            </div>
            <ul class="area__list">
                <li class="area__list__item" v-for="(item, index) in hotSearch" :key="index"  @click="() => handleToWord(item)"> {{ item }} </li>
            </ul>
       </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'

export default {
  name: 'Search',
  // 搜索 逻辑
  setup () {
    const router = useRouter()
    // const hotSearch = ['牛奶', '鲜花', '酸奶', '新鲜水果', '香槟玫瑰', '生日鲜花', '山姆会员商店']

    // 循环展示 搜索过的内容 ：当input框 内容发生变化时，把内容存储到localStorage中 。
    const searchList = ref(JSON.parse(localStorage.history || '[]')) // SearchList = 存储在localStorage中的history属性的内容（history自己新增的属性） or [](没有搜索过时展示空数组)
    const inputValue = ref('') // 模版中V-modle双向绑定的 响应式数据

    const handleSearchChange = (e) => {
      const text = e.target.value // e.target.value = 你搜索 输入的内容

      if (!text) return // 如果 text 不存在，就立即退出函数 如果 text 是 null、undefined、''、 NaN，或者布尔值 false，那么就立即退出函数。

      const hasText = searchList.value.find(item => item === text) // localStorage存储的内容 = 你输入的内容 （代表你已经搜索过 当前内容了）
      if (!hasText) { // 如果没有搜索过
        searchList.value.push(text) // 那就SearchList响应式数组中 添加 你搜索的内容
        localStorage.history = JSON.stringify(searchList.value)
      }
      router.push(`/searchList?keyword=${text}`) // 点击搜索后 路由导航，让页面跳转到相应 的输入内容 的路径页面  js表达式 `${变量}`
      inputValue.value = '' // 每次输入 回车后清空 input框
    }

    // 取消 返回主页
    const handleBackHome = () => {
      router.back()
    }
    // 清空 历史记录 本地存储
    const handleClearSearch = () => {
      searchList.value = []
      localStorage.history = ''
    }
    // get请求 获取热门搜索内容
    const hotSearch = ref([])
    const getHotSreach = async () => {
      const result = await get('/api/shop/search/hot-words')
      if (result?.data?.errno === 0 && result?.data?.data?.length) {
        hotSearch.value = result.data.data
      }
    }
    getHotSreach() // 调用函数时 才会有返回值

    // 点击搜索词跳转到相应页面
    const handleToWord = (keyword) => {
      router.push(`/searchList?keyword=${keyword}`) // 点击搜索后 路由导航，让页面跳转到相应 的输入内容 的路径页面  js表达式 `${变量}`
    }
    return { hotSearch, handleSearchChange, handleToWord, handleBackHome, searchList, inputValue, handleClearSearch, getHotSreach }
  }
}

</script>

<style lang="scss" scoped>
.wrapper{
    margin: 0 0.18rem;
}
.search{
    margin: 0.16rem 0 .24rem 0;
    display: flex;
    position:relative;
    height: 0.32rem;
    line-height: 0.32rem;
    &__bcg{
        flex: 1;
        position: relative;
        background: #F5F5F5;
        border-radius: 0.16rem;
    }
    &__icon{
        position: absolute;
        left: 0.16rem;
        color: #B7B7B7;
        font-size: 0.16rem;
    }
    &__input{
       position: absolute;
       line-height: 0.16rem;
       left: 0.44rem;
       right: 0.12rem;
       top: 0.06rem;
       font-size: 0.14rem;
       color: #333333;
       outline: none;
       border: none;
       background: none;
    }
    &__text{
        margin-left: 0.12rem;
        font-size: 0.16rem;
        color: #333333;
    }
}
.area{
    margin-bottom: 0.24rem;
    &__title{
        display: flex;
        color: #333333;
        line-height: 0.22rem;
        &__text1{
            margin: 0;
            flex: 1;
            font-size: 0.16rem;
        }
        &__text2{
            font-size: 0.14rem;
        }
    }
    &__list{
        margin: 0;
        margin-left: -0.12rem; // 压缩0.12 的距离， 让列表 项目 一排可以多放下一个
        list-style-type:none;
        padding: 0;
        &__item{
            display: inline-block; // 把 ul列表 从纵向变成横向排列
            font-size: 0.14rem;
            color: #666666;
            line-height:0.32rem;
            background: #F5F5F5;
            border-radius: 0.02rem;
            margin-left: 0.1rem;
            margin-top: 0.12rem;
            padding: 0 0.1rem;
        }
    }
}
</style>
