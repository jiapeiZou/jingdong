<template>
    <div class="top">
            <div class="top__header">
                <div class="top__header__icon iconfont" @click="handleBack">&#xe7e0;</div>
                确认订单
            </div>
            <div class="top__receiver" @click="handleToAddress" >
                <h3 class="top__receiver__title">收货地址</h3>
                <!-- 三元表达式 如果hasAddress为true 显示前者 false显示后者 -->
                <div class="top__receiver__address">{{ hasAddress ? `${dataItem.city}${dataItem.department}${dataItem.houseNumber}` : "请填写地址" }}</div>
                <div class="top__receiver__text" v-if="hasAddress">
                    <span class="top__receiver__text__name">{{ dataItem.name }}</span>
                    <span class="top__receiver__text__iphone">{{ dataItem.phone }}</span>
                </div>
                <div class="top__receiver__icon iconfont">&#xe65e;</div>
            </div>
        </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { onBeforeMount, reactive } from 'vue'

export default {
  name: 'TopArea',
  setup () {
    const route = useRoute()
    const router = useRouter() // 返回上一页 需要用路由 back（ ）方法
    const path = route.path // 当前的路由路径
    const addressId = route.query.addressId // 获取到从哪个地址ID过来的 ，便于get请求 展示相应的地址信息
    const dataItem = reactive({ })

    // 退出当前页面 回到购物车页面
    const handleBack = () => { router.push('/cartList') }

    // 点击 路由跳转到选择地址页面，并带上当前的路由路径
    const handleToAddress = () => {
      router.push(`/addressSelect?path=${path}`)
    }
    // 发送get请求 获取已存的地址信息 （setup函数 无法写成异步函数 ，这里用 onBeforeMount 生命周期函数钩子会在挂载开始之前被调用，即在 DOM 插入之前）
    onBeforeMount(async () => {
      const resoult = await get(`/api/user/address/${addressId}`) // 发送get请求 获取后端存储中 相应ID 的地址内容
      if (resoult?.data?.errno === 0) {
        const addressContent = resoult.data.data
        dataItem.city = addressContent.city
        dataItem.name = addressContent.name
        dataItem.phone = addressContent.phone
        dataItem.department = addressContent.department
        dataItem.houseNumber = addressContent.houseNumber
      }
    })
    return {
      dataItem,
      handleBack,
      handleToAddress,
      hasAddress: !!route.query.addressId // ！！返回一个布尔值，判断路由上是否有addressId，是否填写过地址
    }
  }

}

</script>

<style lang="scss" scoped >
.top{
    height: 1.96rem;
    background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
    background-size:100% 1.59rem ;// 宽 高
    background-repeat: no-repeat; // 不重复
}
.top__header{
    padding: 0.24rem 0 0.22rem 0;
    position: relative;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: #FFFFFF;
    text-align: center;
    &__icon{
        position: absolute;
        left: 0.19rem;
        font-size: 0.22rem;
    }
}
.top__receiver{
    position: relative;
    bottom: -0.16rem;
    background: #FFFFFF;
    border-radius: 0.04rem;
    height: 1.11rem;
    margin: 0 0.18rem;
    &__title{
        margin: 0;
        line-height: 0.22rem;
        font-size:  0.16rem;
        color: #333333;
        padding: 0.16rem 0 0.14rem 0.16rem;
    }
    &__address{
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: #333333;
        padding: 0 0.4rem 0.06rem 0.16rem;
    }
    &__text{
        line-height: 0.18rem;
        font-size: 0.12rem;
        color: #666666;
        padding: 0 0 0.16rem 0.16rem;
        &__name{
            margin-right: 0.06rem;
        }
    }
    &__icon{
        transform: rotate(270deg); // 顺时针 旋转角度
        font-size: 0.16rem;
        color: #666666;
        position: absolute;
        right: 0.16rem;
        top: 0.475rem;
    }
}
</style>
