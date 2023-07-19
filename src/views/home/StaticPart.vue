<template>
       <!-- 定位栏 -->
       <div class="position">
        <span class="iconfont position__icon">&#xe630;</span>
        北京理工大学国防科技园2号楼10层
        <span class="iconfont position__notice">&#xe8c0;</span>
      </div>
      <!-- 搜索栏 点击跳转导航到search路由页面-->
      <router-link to="Search">
        <div class="search">
          <span class="iconfont">&#xe600;</span>
          <span class="search__text" >山姆会员商店优惠商品</span>
        </div>
      </router-link>
      <!-- 广告栏 横幅 -->
      <div class="banner">
        <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" />
      </div>
      <!-- 图标栏 -->
      <div class="icons">
        <div class="icons__item" v-for="item in iconList" :key="item.id" >
          <img class="icons__item__img" :src="item.img">
          <p class="icons__item__desc"> {{ item.text }} </p>
        </div>
        <!-- <div class="icons__item">
          <img class="icons__item__img" src="../../assets/菜市场.png">
          <p class="icons__item__desc"> 菜市场 </p>
        </div>
        <div class="icons__item">
          <img class="icons__item__img" src="../../assets/水果店.png">
          <p class="icons__item__desc"> 水果店 </p>
        </div>
        <div class="icons__item">
          <img class="icons__item__img" src="../../assets/红包.png">
          <p class="icons__item__desc"> 红包套餐 </p>
        </div> -->
      </div>
       <!-- 间隙 -->
      <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      {
        img: require('../../assets/超市.png'),
        text: '超市便利',
        id: 1
      }, {
        img: require('../../assets/水果店.png'),
        text: '水果店',
        id: 2
      }, {
        img: require('../../assets/超市.png'),
        text: '超市便利',
        id: 3
      }, {
        img: require('../../assets/鲜花.png'),
        text: '鲜花绿植',
        id: 4
      }, {
        img: require('../../assets/医药健康.png'),
        text: '医药健康',
        id: 5
      }, {
        img: require('../../assets/家居.png'),
        text: '家居时尚',
        id: 6
      }, {
        img: require('../../assets/蛋糕.png'),
        text: '烘培蛋糕',
        id: 7
      }, {
        img: require('../../assets/签到.png'),
        text: '签到',
        id: 8
      }, {
        img: require('../../assets/大牌免运.png'),
        text: '大牌免运',
        id: 9
      }, {
        img: require('../../assets/红包.png'),
        text: '红包套餐',
        id: 10
      }
    ]
    return { iconList }
  }
}
</script>

<style lang="scss" scoped>
.position{
      position: relative;
      padding: 0.16rem  0.24rem 0.16rem 0;
      line-height: 0.22rem;//行高
      font-size:0.16rem;
      overflow: hidden;//1.用于隐藏溢出的内容。(三个搭配使用，)
      white-space: nowrap;//2.用于防止文本自动换行
      text-overflow: ellipsis;//3.文本溢出的地方显示省略号...
      color: #333;
      .position__icon{
        font-size: 0.2rem;
        position: relative;//相对定位 相对原来的位置做调整
        top:0.02rem;
      }
      .position__notice{
        position: absolute;//绝对定位相对父元素进行定位，父元素也需要开启定位
        right: 0;
        top: 0.18rem;
        font-size: 0.2rem;
      }
    }
    .search{
      background: #F5F5F5;
      border-radius: 0.16rem;
      line-height: 0.32rem;
      color: #B7B7B7;
      margin-bottom: 0.12rem;
      .iconfont{
        display: inline-block;
        padding: 0 .08rem 0 .16rem;
        font-size: 0.16rem;
      }
      &__text{
        display: inline-block;
        font-size: 0.14rem;
      }
    }
    .banner{
      height: 0;//1.高度为0（三个结合实现：解决加载图片时，避免图片下方内容的抖动。撑开图片的区域）
      overflow: hidden;//2.超出的部分隐藏不显示
      padding-bottom: 25.4%;//3.图片的高宽比，代表banner区域宽度的25.4% 这样撑出这个区域，当网速慢时加载内容，不影响图片以下内容的抖动
      &__img{
        width: 100%;
      }
    }
    .icons{//父元素开启flex布局
      display: flex;//元素被设定为 flex 容器,它的直接子元素（不论是 div、p、img 或任何其他元素）默认都会在水平方向上排列在一行里
      flex-wrap: wrap;//决定 flex 容器中的元素如何换行的属性。当子元素无法全部放置在一行的时候，允许它们进行换行
      margin-top:0.16rem;
      &__item{
        width: 20%;//元素的宽度设置为其父元素宽度的 20% 所以100%的宽度分成5份。这是一个相对宽度，意味着元素的实际像素宽度会随着其父元素的宽度的变化而变化。
        &__img{
          width: 0.4rem;
          height: 0.4rem;
          display: block;//让img标签变成 块级元素
          margin: 0 auto;//块级元素实现 在其父容器中水平居中
        }
        &__desc{
          font-size: 0.12rem;
          text-align: center;//文字居中
          margin: 0.06rem 0 0.16rem 0;
          color: #333;
        }
      }
    }
    .gap{
      height: 0.1rem;
      background: #f1f1f1;
      margin:0 -0.18rem 0 -0.18rem ;//因为最外层wrapper设置了一个内边距0.18rem. 这里是需要占满视图端口
    }
</style>
