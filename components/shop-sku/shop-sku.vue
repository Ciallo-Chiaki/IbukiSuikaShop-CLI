<script setup>
import { ref } from "vue";

const props = defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <view class="shop-sku">
    <view class="info-wrap">
      <card-goods-info :info="props.info" :type="3"></card-goods-info>
    </view>

    <view class="sku-list-wrap">
      <view class="label">规格</view>
      <view class="sku-list">
        <view
          class="sku-item"
          :class="{ active: item === 1 }"
          v-for="item in 3"
          :key="item"
          >规格名称</view
        >
      </view>
    </view>

    <view class="set-count-wrap">
      <view class="label">数量</view>
      <view class="count">步进器</view>
    </view>

    <view class="btn-wrap">
      <view class="btn car-btn">加入购物车</view>
      <view class="btn buy-btn">立即购买</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.shop-sku {
  padding-bottom: 32rpx;
  .info-wrap {
    margin-bottom: 32rpx;
  }
  .sku-list-wrap {
    padding: 32rpx 0 0;
    .label {
      font-size: 32rpx;
      color: #333;
      font-weight: bold;
    }
    .sku-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 32rpx 0;
      gap: 20rpx;
      .sku-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5rpx 20rpx;
        color: #666;
        font-size: 32rpx;
        background-color: #f4f4f4;
        border-radius: 4rpx;
        &.active {
          color: #fff;
          background-color: $uni-color-primary;
        }
      }
    }
  }
  .set-count-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 80px;
    .label {
      font-size: 32rpx;
      color: #333;
      font-weight: bold;
    }
    .count {
      // 步进器
    }
  }
  .btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 80rpx;
      font-size: 28rpx;
      color: #fff;
    }
  }
  .car-btn {
    background-color: #ff9800;
    border-radius: 80rpx 0 0 80rpx;
  }
  .buy-btn {
    background-color: $uni-color-error;
    border-radius: 0 80rpx 80rpx 0;
  }
}
</style>
