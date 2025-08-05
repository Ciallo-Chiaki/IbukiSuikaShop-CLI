<script setup>
import { formatPrice } from "@/utils/format.js";

const props = defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: Number,
    default: 0,
    /* 
      0 订单列表处
      1 商城分类列表处
      2 商品购物车列表处
      3 规格选择处
      4 创建订单处
      5 订单历史详情
    */
  },
});

const emits = defineEmits(["selectBuy"]);

const selectBuy = () => {
  emits("selectBuy", { ...props.info });
};
</script>

<template>
  <view class="card-goods-item">
    <view class="card-left">
      <image class="img" :src="info.goods_banner_img" mode="aspectFill" />
    </view>
    <view class="card-right">
      <view class="top-box">
        <view class="title">{{ info.name }}</view>
        <view></view>
      </view>
      <view class="bottom-box">
        <view class="left">
          <view class="price-wrap">
            <view class="new">
              <text>￥</text>
              <text class="big">{{ formatPrice(info.price) }}</text>
            </view>
            <view class="old" v-if="info.market_price">
              <text>￥{{ formatPrice(info.market_price) }}</text>
            </view>
          </view>
        </view>
        <view class="right">
          <view class="buy" @click="selectBuy" v-if="[1].includes(type)"
            >选购</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.card-goods-item {
  height: 180rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14rpx;
  .card-left {
    flex-shrink: 0;
    height: 180rpx;
    aspect-ratio: 1/1;
    background-color: #eaeaea;
    border-radius: 6rpx;
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .card-right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 28rpx;
        color: #333;
        @include text-ellipsis(2);
      }
    }
    .bottom-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        flex-direction: column;
        .price-wrap {
          // display: flex;
          // align-items: baseline;
          .new {
            font-weight: bolder;
            font-size: 24rpx;
            color: $uni-color-error;
            .big {
              font-size: 32rpx;
            }
          }
          .old {
            font-size: 24rpx;
            color: #999999;
            text-decoration-line: line-through;
          }
        }
      }
      .right {
        .buy {
          background-color: #ff5722;
          color: #ffffff;
          padding: 10rpx 24rpx;
          border-radius: 30rpx;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>
