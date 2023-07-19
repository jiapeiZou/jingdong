<template>
    <div class="wrapper">

      <div class="wrapper__top">
        <div class="top">
          <router-link to="/my">
            <div class="top__icon iconfont"> &#xe7e0; </div>
          </router-link>
          <div class="top__text">管理收货地址</div>
          <router-link to="/addressEdit">
            <div class="top__new">
              新建
            </div>
        </router-link>
        </div>
      </div>

      <div class="text">我的收货地址</div>

      <div class="address">
        <div class="show" v-if="!addressList.length"> 暂无数据 </div>
        <div class="address__list"  v-for="item in addressList" :key="item._id">
          <span class="address__list__icon iconfont" @click="() => alterAddress(item._id)" >&#xe7e0;</span>
          <p class="address__list__name">
            {{ item.name }}<span class="address__list__phone">{{ item.phone }}</span>
          </p>
          <div class="address__list__text">{{item.city}}  {{ item.department }}  {{item.houseNumber}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import { useRouter } from 'vue-router'

const useGetAddressEffect = () => {
  const addressList = ref([])
  const router = useRouter()

  const getAddress = async () => {
    const resoult = await get('api/user/address')
    if (resoult?.data?.errno === 0 && resoult?.data?.data.length) {
      addressList.value = resoult.data.data
      console.log(addressList)
    }
  }
  // 编辑地址逻辑 跳转到编辑页面，并带上当前地址ID
  const alterAddress = (id) => {
    router.push(`/addressEdit?id=${id}`)
  }
  return { getAddress, addressList, alterAddress }
}
console.log(function () {})
export default {
  name: 'Address',
  setup () {
    const { getAddress, addressList, alterAddress } = useGetAddressEffect()
    getAddress()
    return { getAddress, addressList, alterAddress }
  }
}

</script>

<style lang="scss" scoped>
.wrapper{
  position: absolute; // 想要占满屏幕区域 可以用定位来写
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background:  #f6f6f6;
  padding: 0 0.18rem;
  &__top{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 0.44rem;
    background: #FFFFFF;
  }
}
.show{
  color: #B6B6B6 ;
  line-height: 0.22rem;
  text-align: center;
  font-size: 0.16rem;
}
.top{
  display: flex;
  margin:0.11rem  0.18rem;
  line-height: 0.22rem;
  &__icon{
    color: #B6B6B6 ;
    font-size: 0.16rem;
  }
  a{
    text-decoration: none;
  }
  &__text{
    flex: 1;
    text-align: center;
    font-size: 0.16rem;
    color: #333333;
  }
  &__new{
    font-size: 14px;
    color: #333333;
  }
}
.text{
  position: absolute;
  top: 0.6rem;
  line-height: 0.2rem;
  font-size: 14px;
  color: #333333;
}
.address{
  position: absolute;
  top: 0.92rem;
  right: 0;
  left: 0;
  margin: 0  0.18rem 0.16rem 0.18rem ;
  &__list{
    box-sizing: border-box;
    height: 1.04rem;
    background: #FFFFFF;
    border-radius: 4px;
    padding: 0.18rem 0.16rem;
    margin-bottom: 0.16rem;
    &__name{
      margin: 0;
      margin-bottom: 0.08rem;
      font-size: 14px;
      color: #999999;
  }
  &__phone{
    margin-left: 0.66rem;
  }
  &__text{
    width: 2.6rem;
    max-height: 0.4rem;
    font-size: 14px;
    color: #333333;
    line-height: 0.2rem;
    overflow: hidden;
    display: -webkit-box; // 使用弹性盒模型
  -webkit-box-orient: vertical;   // 确定子元素的排列方式为垂直
  -webkit-line-clamp: 2;   // 限制在一个块元素显示的文本的行数
    text-overflow: ellipsis;
  }
  &__icon{
    margin-top: 0.26rem;
     position: absolute;
     right: 0.16rem;
    font-size: 0.16rem;
    color: #999999;
    transform:rotate(180deg) ;
  }
  }
}
</style>
