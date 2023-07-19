<template>
    <div class="toast"> {{ message }} </div>
</template>

<script> // --公共--弹框组件
import { reactive, toRefs } from 'vue'
export default {
  props: ['message'] // 子组件接收父组件传递过来的参数
}

export const useToastEffect = () => {
  const toastData = reactive({ show: false, toastMessage: '' })
  const { show, toastMessage } = toRefs(toastData)

  const showToast = (message) => {
    toastData.show = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.show = false
      toastData.toastMessage = ''
    }, 2000)
  }

  return { show, toastMessage, showToast }
}
</script>

<style lang="scss" scoped >
.toast{
    padding: 0 0.1rem;
    position: fixed; // 固定定位
    top: 50%;
    left: 50%;
    white-space: nowrap;
    line-height: 0.5rem; // 行高
    transform: translate(-50%,-50%); //实现居中， 元素向左和向上移动，移动的距离是元素自身宽度和高度的 50%。这在许多情况下被用来将元素居中
    background: rgb(0, 0, 0, .35) ;
    border-radius: 0.05rem;
    color: #fff;
    text-align: center;
    font-size: 0.12rem;
}
</style>
