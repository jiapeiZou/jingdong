
<template>
<div class="wrapper">
    <img class="wrapper__img" src="../../assets/编组@2x.png">
    <div class="wrapper__input" >
        <input class="wrapper__input__content"  placeholder="请输入用户名" v-model="username"/>
    </div>
    <div class="wrapper__input" >
        <input class="wrapper__input__content"  placeholder="请输入密码"  type="password" v-model="password"/>
    </div>
    <div class="wrapper__input" >
        <input class="wrapper__input__content"  placeholder="确认密码"  type="password" v-model="passwordagain"/>
    </div>
    <div class="wrapper__button" @click="handleRegister"> 注册 </div>
    <div class="wrapper__text" @click="handleLoginClick"> 已有账号去登录 </div>
    <Toast v-if="show" :message="toastMessage"/>
</div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 处理注册相关逻辑
const userRegisterEffect = (showToast) => {
  const router = useRouter() // 导入路由中的实例，通过push方法，跳转去其他页面
  const data = reactive({ password: '', username: '' })

  const handleRegister = async () => {
    try {
      if (data.password === '' && data.username === '') {
        showToast('用户名与密码必填')
      } else {
        const result = await post('/api/user/register', {
          username: data.username,
          password: data.password
        })
        if (result?.data?.errno === 0) {
          localStorage.isRegister = true
          router.push({ name: 'Login' })
        } else {
          showToast('注册失败')
        }
      }
    } catch {
      showToast('请求失败')
    }
  }
  const { password, username, passwordagain } = toRefs(data) // 对响应式数据进行解构
  return { handleRegister, password, username, passwordagain }
}
// 处理注册 跳转 至登录
const userLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}
// ------------
// try catch 一种错误处理结构，可以捕获在执行 try 块中的代码时可能抛出的异常
// try {
// 尝试执行的代码
// } catch (error) {
// 如果 try 块中的代码抛出异常，这里的代码将会执行
// }

// async 和 await 用于处理异步操作。
// async 关键字用于声明一个函数是异步的，写在函数前面
// await 关键字用于等待 Promise 解决，直到 Promise 解决，然后返回解决的值。如果 Promise 被拒绝，await 将抛出错误，可以用 try/catch 语句捕获。
// ------------

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const { showToast, show, toastMessage } = useToastEffect()
    const { handleRegister, password, username, passwordagain } = userRegisterEffect(showToast)
    const { handleLoginClick } = userLoginEffect()

    return { handleLoginClick, handleRegister, password, username, passwordagain, show, toastMessage }
  }
}

</script>

<style lang="scss" scoped>
.wrapper{
    margin: 0 0.4rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__img{
        height: 0.66rem;
        width: 0.66rem;
        padding-bottom: 0.4rem; }
    &__input{
    margin-bottom: 0.16rem;
    height: 0.48rem;
    width: 100%;
    background: #F9F9F9;
    border: 0.01rem solid rgba(0,0,0,0.10);
    border-radius: 0.06rem;
       &__content{
        box-sizing: border-box;
        padding: 0 0.16rem;
        border: none;
        line-height: 0.48rem;
        width: 100%;
        border-radius: 0.06rem;
        background: none;
        font-size: 0.16rem;
        color: rgba(0,0,0,0.50);
       }
    }
    &__button{
        margin: 0.16rem 0;
        line-height: 0.48rem;
        width: 100%;
        background: #0091FF;
        border-radius: 0.06rem;
        box-shadow: 0 0.04rem 0.08rem 0 rgba(0,145,255,0.32);
        color: #FFFFFF;
        font-size: 0.16rem;
        text-align: center;
    }
    &__text{
        font-size: 0.14rem;
        color: rgba(0,0,0,0.50);
        text-align: center;
    }
}
</style>
