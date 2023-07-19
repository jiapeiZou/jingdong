<template>
    <!-- 滚动栏 -->
    <div class="nearby">
        <h3 class="nearby__title">附近店铺</h3>
        <!-- 调用局部组件 : 循环把数据item 传给子组件.并且需要显示border -->
        <router-link
          v-for="item in nearbyList"
          :key="item._id"
          :to="`/shop/${item._id}`">
          <ShopInfo :showBorder="true" :item="item"/>
        </router-link>
         <!-- router-link  绑定to属性，点击这一区块 路由跳转到/shop/下面对应的id号 的页面。`${item._id}`是js表达式="item._id"后端返回的内容中 被循环中的item的id,这样才能精准跳转到相应的商家 -->
    </div>

      <!--  -->
        <!-- <div class="nearby__item">
            <img class="nearby__item__img" src="../../assets/超市.png" >
            <div class="nearby__item__content" >
              <div class="nearby__item__content__title"> 沃尔玛 </div>
              <div class="nearby__item__content__tags">
                <span class="nearby__item__content__tag"> 月售1万+ </span>
                <span class="nearby__item__content__tag"> 起送¥0 </span>
                <span class="nearby__item__content__tag"> 基础运费¥5 </span>
              </div>
              <div class="nearby__item__content__highlight"> VIP尊享满89元减4元运费券（每月3张） </div>
            </div>
          </div>
        </div> -->
     <!--  -->
        <!-- <div class="nearby__item">
            <img class="nearby__item__img" src="../../assets/超市.png" >
            <div class="nearby__item__content" >
              <div class="nearby__item__content__title"> 沃尔玛 </div>
              <div class="nearby__item__content__tags">
                <span class="nearby__item__content__tag"> 月售1万+ </span>
                <span class="nearby__item__content__tag"> 起送¥0 </span>
                <span class="nearby__item__content__tag"> 基础运费¥5 </span>
              </div>
              <div class="nearby__item__content__highlight"> VIP尊享满89元减4元运费券（每月3张） </div>
            </div>
          </div> -->
          <!-- 循环列表内的内容 后来改成了在后端拿数据 -->
          <!-- const nearbyList = [{
                  id: 1,
                  imgUrl: require('../../assets/超市.png'),
                  // 循环相对路径时，需要套一层require(),才能识别。 如果图片是链接形式就不用！！！
                  title: '沃尔玛',
                  tags: ['月售1万+', '起送¥0', '基础运费¥5'],
                  highlight: ' VIP尊享满89元减4元运费券（每月3张）'
                }, {
                  id: 2,
                  imgUrl: require('../../assets/超市.png'),
                  title: '盒马',
                  tags: ['月售3万+', '起送¥49', '基础运费¥7'],
                  highlight: ' VIP尊享满89元减4元运费券（每月3张）'
                }] -->
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo' // 引入店铺公共组件

// 获取后台数据 封装
const useNearbyEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => { // async 声明异步函数
    const result = await get('/api/shop/hot-list') // await 等待get请求 返回的数据
    if (result?.data?.errno === 0 && result?.data?.data?.length) { // 如果data中有数据 且 errno = 0,就把拿到的后端数据 赋值给nearbyList
      nearbyList.value = result.data.data // ref 封装 基本数据类型，变成响应式数据。取值时用 `xxx.value`
    }
    // console.log(nearbyList.value)
    // console.log('==============')判断语句如何检查bug
    // console.log(result?.data?.errno === 0)
    // console.log(result?.data?.data?.length)
  }
  return { nearbyList, getNearbyList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo }, // 注入局部组件
  setup () {
    const { nearbyList, getNearbyList } = useNearbyEffect()
    console.log(nearbyList)
    getNearbyList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
.nearby{
    &__title{
        margin: .14rem 0 .02rem 0;
        font-size: 0.18rem;
    color: #333;
    }
    a{ // 当被路由定义为点击跳转的区域时 会被默认为a标签，自带下划线。这里去掉下划线
      text-decoration: none;
    }

}
</style>
