<!--shop和nearby--公用的店铺组件 -->
<template>
    <div class="shop">
        <img class="shop__img" :src="item.imgUrl">
        <!-- 绑定一个属性,控制样式！ 三元表达式 判断 父组件传过来的showBorder 来决定要不要显示border -->
        <div class="shop__content" :class="{'shop__content--border': showBorder ? true : false }" >
            <div class="shop__content__title"> {{ item.name }} </div>
            <div class="shop__content__tags">
                <span class="shop__content__tag"> 月售{{ item.sales }} </span>
                <span class="shop__content__tag"> 起送{{ item.expressLimit }} </span>
                <span class="shop__content__tag"> 基础运费{{ item.expressPrice }} </span>
            </div>
            <div class="shop__content__highlight"> {{ item.slogan }} </div>

            <!-- 这一区块 要看item中是否有products属性，才做展示 -->
            <div class="shopimg" v-if="item.products">
                <div class="shopimg__item" v-for="food in item.products" :key="food.name">
                    <img class="shopimg__item__img" :src="food.imgUrl" >
                    <div class="shopimg__item__text"> {{ food.name }}</div>
                    <div class="product">
                      <span class="product__yen">&yen;</span>  <span class="product__price">{{ food.price }}</span>
                        <span class="product__oldprice">&yen;{{ food.oldPrice }}4444</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'showBorder'] // 接收子组件传过来的后端数据（遍历好的item） 和 是否展示下方的横线Border
}
</script>

<style lang="scss" scoped>
.shop {
    display: flex;
    padding-top: 0.12rem;

    &__img {
        height: 0.56rem;
        width: 0.56rem;
        padding-right: 0.16rem;
    }

    &__content {
        flex: 1; //它们将平分剩余的空间。
        padding-bottom: 0.12rem;
        &--border{ // --是对border的修饰
            border-bottom: 0.01rem solid #f1f1f1;
        }

        &__title {
            line-height: 0.22rem;
            font-size: 0.16rem;
            color: #333;
        }

        &__tags {
            line-height: 0.18rem;
            font-size: 0.13rem;
            color: #333;
            margin-top: 0.08rem;
        }

        &__tag {
            margin-right: 0.16rem;
        }

        &__highlight {
            line-height: 0.18rem;
            font-size: 0.13rem;
            color: #E93B3B;
            margin-top: 0.08rem;
        }
    }
}

.shopimg{
    display: flex;
    margin-right: 0.07rem;
    margin-top: 0.08rem;
    &__item{
        box-sizing: border-box;
       &__img{
        margin-right: 0.16rem;
        margin-left: 0;
        height:.76rem ;
        width:.76rem ;
       }
       &__text{
        margin: 0.04rem 0 0.02rem 0;
        width: 0.76rem;
        line-height: 0.17rem;
        font-size: 0.12rem;
        color: #333333;
        overflow: hidden; // 超出部分隐藏
        white-space: nowrap; // 不换行
        text-overflow: ellipsis; // 用……显示隐藏部分
       }
    }
}
.product{
    line-height: 0.2rem;
    font-size: 0.06rem;
    color: #999999;
    width: 0.76rem;
    overflow: hidden; // 超出部分隐藏
    white-space: nowrap; // 不换行
    text-overflow: ellipsis; // 用……显示隐藏部分
    &__yen{
        color: #E93B3B;
    }
    &__price{
        font-size: 0.12rem;
        margin-right: 0.06rem;
        color: #E93B3B;
    }
    &__oldprice{
        color: #999999;
        text-decoration: line-through; // 横线
    }
}
</style>
