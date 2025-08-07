<script setup>
import { useCartStore } from "@/stores/cart.js";
const cartStore = useCartStore();

const handleCartOrder = () => {};
</script>

<template>
  <view class="shop-cart">
    <view class="cart-list-wrap">
      <scroll-view class="scroll" scroll-y>
        <view class="cart-list">
          <view class="cart-item-wrap" v-for="item in cartStore.cartList">
            <card-goods-info :info="item" :type="2" />
          </view>
        </view>
      </scroll-view>
      <view class="loadmore-wrap" v-if="cartStore.cartList.length < 1">
        <uni-load-more
          status="no-more"
          :content-text="{ contentnomore: '购物车是空的' }"
        />
      </view>
    </view>
    <view class="btn-wrap" v-if="cartStore.cartList.length > 0">
      <view class="btn buy-btn" @click="handleCartOrder">结算</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.shop-cart {
  position: relative;
  width: 100%;
  min-height: 100px;
  padding-bottom: 100rpx;
  background-color: #fff;
  border-radius: 10px 10px 0 0;

  .cart-list-wrap {
    padding-bottom: 32rpx;

    .scroll {
      width: 100%;
      max-height: 50vh;
    }

    .cart-list {
      .cart-item-wrap {
        margin-bottom: 24rpx;
      }
    }

    .loadmore-wrap {
      padding: 32rpx 0;
    }
  }

  .btn-wrap {
    position: absolute;
    left: 0;
    bottom: 24rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80rpx;
      font-size: 28rpx;
      color: #fff;
    }

    .buy-btn {
      width: 680rpx;
      background-color: $uni-color-error;
      border-radius: 80rpx;
    }
  }
}
</style>
