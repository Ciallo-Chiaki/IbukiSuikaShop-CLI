<script setup>
import { formatPrice } from "@/utils/format.js";
</script>

<template>
  <view class="card-goods-item">
    <view class="pic">
      <image class="img" src="/static/images/tmp_goods.jpg" mode="aspectFill" />
    </view>
    <view class="info">
      <view class="title"
        >测试商品名称 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </view>
      <view class="price">
        <view class="new">
          <view class="unit">¥</view>
          <view class="text">{{ formatPrice(5688, { digits: 2 }) }}</view>
        </view>
        <view class="old">¥{{ formatPrice(12332, { digits: 2 }) }}</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.card-goods-item {
  .pic {
    width: 100%;
    aspect-ratio: 1 / 1;
    .img {
      width: 100%;
      height: 100%;
      border-radius: 16rpx;
    }
  }
  .info {
    padding: 16rpx 0;
    .title {
      font-size: 30rpx;
      color: #333;
      font-weight: bolder;
      @include text-ellipsis(1);
    }
    .price {
      display: flex;
      gap: 16rpx;
      align-items: flex-end;
      padding-top: 10rpx;
      .new {
        display: flex;
        align-items: flex-end;
        font-size: 32rpx;
        font-weight: bolder;
        color: $uni-color-error;
        .unit {
          font-size: 24rpx;
        }
      }
      .old {
        font-size: 24rpx;
        color: #bbb;
        text-decoration: line-through;
      }
    }
  }
}
</style>
