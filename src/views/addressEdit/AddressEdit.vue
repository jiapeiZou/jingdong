<template>
    <div class="wrapper">

        <div class="wrapper__top">
          <div class="top">
            <router-link to="/address">
              <div class="top__icon iconfont"> &#xe7e0; </div>
            </router-link>
            <div class="top__text"> {{id ? "修改" : "新建"}}收货地址</div>
            <router-link to="/addressEdit">
              <div class="top__new" @click="handlePost">
                  保存
              </div>
          </router-link>
          </div>
      </div>

      <div class="content">
        <div class="content__item">
          <span class="content__item__text">所在城市：</span>
          <input class="content__item__input" placeholder="北京市" v-model="city">
        </div>
        <div class="content__item">
          <span class="content__item__text">小区/大厦/学校：</span>
          <input class="content__item__input" placeholder="北理工大学国防科技园" v-model="department">
        </div>
        <div class="content__item">
          <span class="content__item__text">楼号-门牌号：</span>
          <input class="content__item__input" placeholder="2号楼10层" v-model="houseNumber">
        </div>
        <div class="content__item">
          <span class="content__item__text">收货人：</span>
          <input class="content__item__input" placeholder="小慕" v-model="name">
        </div>
        <div class="content__item">
          <span class="content__item__text">联系电话：</span>
          <input class="content__item__input" placeholder="18911023277" v-model="phone">
        </div>
      </div>
     <!-- 调用子组件 -->
     <Toast v-if="show" :message="toastMessage"/>

    </div>
</template>

<script>
import { ref } from 'vue'
import { post, get } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue' // 引入子组件
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'AddressEdit',
  components: { Toast }, // 声明子组件
  setup () {
    const router = useRouter()
    const route = useRoute()
    const id = route.query.id

    const { showToast, show, toastMessage } = useToastEffect() // 引入的公用组件

    const city = ref('')
    const department = ref('')
    const houseNumber = ref('')
    const name = ref('')
    const phone = ref('')

    // 点击 保存逻辑，并返回上一页
    const handlePost = async () => {
      if (!city.value || !department.value || !houseNumber.value || !name.value || !phone.value) {
        showToast('请完善所有信息') // 1.判断是否 完善信息， 未完成 弹框提醒
      } else {
        if (id) { // 2.如果从编辑页进来
          const resoult = await post(`/api/user/address/${id}`, { //  点击保存时 发送post 请求存储数据
            city: city.value, // post 数据要求传入的样式
            department: department.value,
            houseNumber: houseNumber.value,
            name: name.value,
            phone: phone.value
          })
          if (resoult?.data?.errno === 0) { // 如果发送请求成功 返回上一页
            // router.back()
            router.push('/address')
          }
        } else { // 3.如果从新建地址进来
          const resoult = await post('/api/user/address', { //  完成填写后 发送post 请求存储数据
            city: city.value, // post 数据要求传入的样式
            department: department.value,
            houseNumber: houseNumber.value,
            name: name.value,
            phone: phone.value
          })
          if (resoult?.data?.errno === 0) { // 如果发送请求成功
            router.back() // 返回上一页
          }
        }
      }
    }

    // 重新修改地址 逻辑
    const newArrress = async () => {
      if (id) { // 先判断 路径中是否有ID（判断是 无ID：新建地址过来的，有ID：已经填写 是过来修改的）
        const newResoult = await get(`/api/user/address/${id}`) // 如果有，那就发送get请求 获取已存储的数据
        console.log(newResoult)

        if (newResoult?.data?.errno === 0) { // 如果发送成功 那就赋值给 模版中双向绑定的数据，在网页上显示出来
          city.value = newResoult.data.data.city
          department.value = newResoult.data.data.department
          houseNumber.value = newResoult.data.data.houseNumber
          name.value = newResoult.data.data.name
          phone.value = newResoult.data.data.phone
        }
      }
    }
    newArrress()

    return { id, city, department, houseNumber, name, show, phone, toastMessage, handlePost, newArrress }
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
.content{
  position: absolute;
  top:0.56rem;
  left: 0;
  right: 0;
  height: 2.24rem;
  background: #FFFFFF;
  &__item{
    margin: 0 0.18rem;
    line-height: 0.44rem;
    font-size: 14px;
    display: flex;
    border-bottom: 0.01rem solid #F1F1F1;
    &__text{
      color: #5f5e5e;
    }
    &__input{
    flex: 1;
    border: none;
    outline: none; // 输入框 输入时 去掉外边框
    font-size: 14px;
    color: #151515;
    line-height: 20px;
  }
  }
}
</style>
