<template>
    <div class="wrapper">
      <img class="wrapper__img" src="../../assets/编组@2x.png" >
      <!-- 写input框时 最好用一个div 包裹起来，才好撑出地方. placeholder默认输入-->
      <div class="wrapper__input">
          <input class="wrapper__input__content"  placeholder="用户名"  v-model="username"/>
      </div>
      <div class="wrapper__input">
          <input class="wrapper__input__content" placeholder="请输入密码" type="password"  v-model="password"/>
      </div>
      <div class="wrapper__login-botton"  @click="handleLogin" > 登陆 </div>
      <div class="wrapper__login-link" @click="handleRegister" > 立即注册 </div>
      <!-- 调用子组件 登录失败时的弹窗 -->
      <Toast v-if="show" :message="toastMessage"/>
    </div>
  </template>

<script>
import { reactive, toRefs } from 'vue' // 引入响应式对象数据
import { useRouter } from 'vue-router'// 3.获取vue-router 中的useRouter函数，可以访问路由的实例，再通过push()方法，可以跳转到下一个页面
import { post } from '../../utils/request' // 引入已经封装好的axios
import Toast, { useToastEffect } from '../../components/Toast'

// 处理登录逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter() // 4.当你在组件中调用 useRouter，它会返回当前的 router 实例
  const data = reactive({ username: '', password: '' }) // 让setup 中的数据变成 响应式的数据，返回出入 模版中V-model可以与数据进行双向绑定，便于更改.如果想使用其中的数据用 data.username /data.password
  // 向后端发送请求
  const handleLogin = async () => { // async 和 await用于处理异步操作: async 关键字用于声明一个函数是异步的
    try {
      const { username, password } = data
      if (username === '' && password === '') {
        showToast('用户名与密码必须填写')
      } else {
        const result = await post('/api/user/login', // await 会等待给后端发送的数据请求完成，然后把后端返回的响应对象赋值给 result （主要取 后端返回中的 data对象 中的errno 判断是否等于0
          {
            username: data.username,
            password: data.password
          })
        if (result?.data?.errno === 0) { // errno=0 代表 用户名和密码输入正确.  ?.可选链 查询不必明确的属性是否存在。
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          showToast('登录失败')
        }
      }
    } catch (e) { // 如果 try 块中的代码抛出异常，这里的代码将会执行
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data) // 对响应式数据做一个解构，外部用数据时 不用再写data.password了，直接写password
  return { username, password, handleLogin }
}
// 处理 登录跳转 到home
const useRegisterEffect = () => {
  const router = useRouter() // 4.当你在组件中调用 useRouter，它会返回当前的 router 实例
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast }, // 引入弹窗子组件

  // setup职责就是告诉你，代码执行的逻辑
  setup () {
    const { showToast, show, toastMessage } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegister } = useRegisterEffect()

    return { handleRegister, handleLogin, show, toastMessage, username, password }
  }
}

</script>

<style lang="scss" scoped>
.wrapper{
    margin: 0 0.4rem;
    height: 100vh; // 等于高度等于视口的高度
    display: flex; //父元素开启 弹性盒
    flex-direction: column; //主轴设置为y轴（默认主轴为x轴，所有元素横向排列）
    justify-content: center; //实现主轴的居中
    align-items: center;  ////实现侧轴的居中
    &__img{
        height: 0.66rem;
        width: 0.66rem;
        margin-bottom: 0.4rem;
    }
    &__input{
        margin-bottom: .16rem;
        height: 0.48rem;
        width: 100%;
        background: #F9F9F9;
        border: .01rem solid rgba(0,0,0,0.10);
        border-radius: .06rem;
        font-size: 0.16rem;
        &__content{
            padding: 0 0.16rem;
            width: 100%;
            box-sizing: border-box;//等于盒子的大小 不能超过
            line-height: 0.48rem;
            border: none;
            outline: none;//设置元素轮廓的属性，轮廓不影响布局， 它不占据空间 通常用于用户界面中的 焦点管理
            background: none;// 没有背景颜色
            &::placeholder{
                color:  #777;
            }
        }
    }
    &__login-botton{
        width: 100%;
        margin: 0.16rem 0;
        background: #0091FF;
        box-shadow: 0 .04rem 0.08rem 0 rgba(0,145,255,0.32);
        border-radius: .04rem;
        color:#FFFFFF;
        line-height: 0.48rem;
        font-size: 0.16rem;
        text-align: center;
    }
    &__login-link{
        font-size: 0.14rem;
        color: #777;
        text-align: center;
    }
}
</style>
