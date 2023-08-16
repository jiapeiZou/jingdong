<template>
    <div class="wapper">

      <div class="top">
        <div class="top__icon iconfont"> &#xe66c; </div>
      </div>

      <div class="myId">
        <img  class="myId__img" src="../../assets/IMG_4063.jpg" >
        <div class="myId__name">
          <div class="myId__name__my">热心市民李先生</div>
          <div class="myId__name__ID">ID: 1069643013</div>
        </div>
        <div class="myId__text">
          <div class="myId__text__head">
            <div class="myId__text__head__titel "><p class="iconfont hb">&#xe66b;</p>红包</div>
            <div class="myId__text__head__number">218</div>
          </div>
          <div class="myId__text__head">
            <div class="myId__text__head__titel"><p class="iconfont yhq">&#xe61e;</p>优惠券</div>
            <div class="myId__text__head__number">12张</div>
          </div>
          <div class="myId__text__head">
            <div class="myId__text__head__titel"><p class="iconfont xd">&#xe611;</p>鲜豆</div>
            <div class="myId__text__head__number">88</div>
          </div>
          <div class="myId__text__head">
            <div class="myId__text__head__titel"><p class="iconfont bt">&#xe75c;</p>白条</div>
            <div class="myId__text__head__number">1000</div>
          </div>
        </div>
      </div>

      <div class="tool">
         <div class="tool__item">
           <div class="tool__item__icon1 iconfont">&#xe604;</div>
           <div class="tool__item__text">我的钱包</div>
           <div class="tool__item__icon2 iconfont">&#xe7e0;</div>
         </div>
         <div class="tool__item" @click="goToAddress">
           <div class="tool__item__icon11 iconfont">&#xe610;</div>
           <div class="tool__item__text">我的地址</div>
           <div class="tool__item__icon2 iconfont">&#xe7e0;</div>
         </div>
         <div class="tool__item">
           <div class="tool__item__icon111 iconfont">&#xe612;</div>
           <div class="tool__item__text">客服与帮助</div>
           <div class="tool__item__icon2 iconfont">&#xe7e0;</div>
         </div>
      </div>
      <div class="hot">
        <h3>精选推荐</h3>
        <h3>熬夜看剧</h3>
        <h3>人气零食</h3>
        <h3>折扣商品</h3>
      </div>

      <div class="goods">
        <div class="goodsimg">
          <img src="../../assets/IMG_4064.jpg" >
        </div>
        <div class="goodsimg">
          <img src="../../assets/IMG_4070.jpg" >
        </div>
      </div>
       <Docker :indexNumber="3"/>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import Docker from '../../components/Docker.vue'

const useRouteEffect = () => {
  const router = useRouter()
  const goToAddress = () => {
    router.push('/address')
  }
  return { goToAddress }
}

export default {
  name: 'My',
  components: { Docker },
  setup () {
    const { goToAddress } = useRouteEffect()
    return { goToAddress }
  }
}
</script>

<style lang="scss" scoped>
.wapper{
  background: #FFFFFF;
}
.top{
  height: 2.34rem;
  background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
  border-bottom-right-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  position: relative;
  &__icon{
    position: absolute;
    top: 0.45rem;
    right: 0.21rem;
    font-size: 0.24rem;
    color: #FFFFFF;
  }
}
.myId{
  position: absolute;
  top: 0.91rem;
  right: 0.18rem ;
  left: 0.18rem;
  height: 2.03rem;
  background: #FFFFFF;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0,0,0,0.08);
  border-radius: 0.08rem;
  &__img{
    position: absolute;
    top: -0.47rem;
    left: 1.22rem;
    height: 0.94rem;
    width: 0.94rem;
    border-radius: 0.452rem;
  }
  &__name{
      &__my{
        margin-top: 0.59rem;
        font-size: 24px;
        color: #262628;
        text-align: center;
        line-height: 36px;
      }
      &__ID{
        height: 0.3rem;
        font-size: 14px;
        color: #C1C0C9;
        text-align: center;
      }
}
&__text{
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // height: 0.76rem;
  border-top: 0.01rem solid #F1F1F1;
  display: flex;
  justify-content: space-around; // 平均分配所剩空间
  box-sizing: border-box;
  &__head{
    width: 0.5rem;
    &__titel{
      display: flex;
      margin: 0.12rem 0 0.03rem 0;
      height:0.3rem;
      line-height: 0.12rem;
      width: 0.6rem;
      font-size: 0.12rem;
      text-align: center;
      color: #C1C0C9;
      .hb{
        color: #ED4A47;
        display: block;
        margin:0;
      }
      .bt{
        color: #b2da82;
        display: block;
        margin:0;
      }
      .yhq{
        color: #47cced;
        display: block;
        margin:0;
      }
      .xd{
        color: #edb647;
        display: block;
        margin:0;
      }
  }
  &__number{
    line-height: 0.28rem;
    font-size: 0.2rem;
    text-align: center;
    color: #262628;
  }
  }
}
}
.tool{
  position: absolute;
  top: 3.11rem;
  right: 0.18rem ;
  left: 0.18rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 1.46rem;
  background: #FFFFFF;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.08);
  border-radius: 8px;
  &__item{
    display: flex;
    margin: 0 0.16rem;
    &__icon1{
      font-size: 0.22rem;
      margin-right: 0.17rem;
      color:#ED4A47;
  }
  &__icon11{
      font-size: 0.22rem;
      margin-right: 0.17rem;
      color:#32C5FF;
  }
  &__icon111{
      font-size: 0.22rem;
      margin-right: 0.17rem;
      color:#9013FE ;
  }
  &__text{
    flex: 1;
    color: #262626;
    line-height: 0.17rem;
    font-size: 0.14rem;
    text-align: left;
    padding-top: 0.04rem;
  }
  &__icon2{
    color: #C2C4CA ;
    line-height: 0.17rem;
    font-size: 0.14rem;
    text-align: left;
    padding-top: 0.04rem;
    transform: rotate(180deg) // 旋转方向
  }
  }
}
.hot{

   display: flex;
   justify-content: space-around;
    position: absolute;
    top:4.5rem;
    right: 0.18rem ;
    left: 0.18rem;
  h3{
    margin-top: .2rem;
    font-size: 0.12rem;
    height: 0.2rem;
    font-weight: normal;
    &:hover{
       color: #32a6f9;
    }
    &.active{
      color: #32a6f9;
    }
  }
}
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  z-index: 2;
  position: absolute;
  top:4.9rem;
  right: 0.18rem ;
  left: 0.18rem;

  .goodsimg{
    background: #fff;
    box-shadow: 0 15px 16px 0 rgba(0,0,0,0.08);
    border-radius: 0.08rem;
    // padding: 0.08rem;
    img{
    height: 1.5rem ;
    width:1.5rem ;
  }
  }
}
</style>
