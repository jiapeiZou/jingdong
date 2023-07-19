<template>
    <!-- 页脚 -->
    <div class="docker">
        <!--这是一个绑定到div元素class属性的Vue指令。这个指令的值是一个对象，表示应该应用哪个CSS 类。每个键是一个类名，每个值是一个布尔值，表示是否应该应用这个类 -->
        <div
            :class="{ 'docker__item':true, 'docker__item--active':index=== indexNumber }"
            v-for="(item, index) in dockerList"
            :key="item.icon"
            >
            <router-link :to="item.to">
                <div class="iconfont" v-html="item.icon" ></div>
                <!-- 当循环时 展示icon图标 不能用插值表达式，识别不出来需要用v-html ！！！  -->
                <div class="docker__title"> {{ item.text }} </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['indexNumber'], // 接收调用的组件 传递来的数字，决定docker__item--active在哪个 下标上显示蓝色
  setup () {
    const dockerList = [
      { icon: '&#xe640;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe603;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe601;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe660;', text: '我的', to: { name: 'My' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>// scoped避免各组件间 同名的class样式 相互干扰
.docker {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0.49rem;
    width: 100%;
    border-top: 0.01rem solid #f1f1f1;
    display: flex; //定义一个元素为弹性布局容器，这个元素的子元素将成为弹性项目，并且自动排布在一行或一列内
    padding: 0 0.18rem; //上下内边距为 0，左右为18px
    box-sizing: border-box; //这个属性控制 CSS 的盒模型的行为；宽度和高度包括了边框和内边距，但不包括外边距（margin）
    color: #333;

    &__item {
        flex: 1;
        text-align: center;
        a{
            text-decoration: none;
            color: #333;
         }
        .iconfont {
            font-size: 0.18rem;
            margin: 0.07rem 0 0.02rem 0;
        }
        &--active {
            a{ color: #1fa4fc; }
        }
    }

    &__title {
        font-size: 0.2rem;
        transform: scale(0.5, 0.5);
        transform-origin: center top;
    }
}
</style>

 <!-- BEM css的命名规则：block__element--Modifier(修饰器)  block(块)element(块中的元素)Modifire(元素的状态)
     &代表最外层的docker,简写
    .docker__item{
       flex:1;//子元素均分等份
       text-align: center;
    .iconfont{
       font-size: 0.18rem;
       margin: 0.07rem 0 0.02rem 0;
    }
    }
    .docker__item--active{
       color: #1FA4Fc;
    }
   .docker__title{
       font-size: 0.2rem;
       transform: scale(0.5,0.5); 横行 纵向缩放50%，变成0.1rem
       transform-origin: center top; 缩放中心点 以什么为中心
    }  -->
