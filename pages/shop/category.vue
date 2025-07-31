<script setup>
import { SYSTEM_WINDOW_INFO } from "@/utils/comfig.js";
import { navBarH } from "@/utils/system.js";

console.log(SYSTEM_WINDOW_INFO);
</script>

<template>
  <view class="page-wrap">
    <mod-nav-bar title="商品分类" title-color="#ffffff"></mod-nav-bar>
    <mode-search></mode-search>
    <view class="container">
      <scroll-view class="aside" scroll-y>
        <view
          class="item"
          :class="{ active: index == 2 }"
          v-for="(item, index) in 5"
          :key="index"
          >分类名称</view
        >
      </scroll-view>
      <scroll-view class="main" scroll-y>
        <view class="group" v-for="(group, index) in 5" :key="index">
          <view class="name">白酒{{ index + 1 }}</view>
          <view class="list">
            <view class="item" v-for="(goods, index) in 3" :key="index">
              <card-goods-info></card-goods-info>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page-wrap {
  .container {
    display: flex;
    justify-content: space-between;
    height: 100vh;
    border: 1px solid red;
    .aside {
      width: 200rpx;
      height: 100%;
      background: #f9f9f9;
      flex-shrink: 0;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100rpx;
        font-size: 28rpx;
        color: #666;
        position: relative;
        &.active {
          color: $uni-color-primary;
          background-color: #fff;
          &::after {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 8rpx;
            height: 36rpx;
            background: $uni-color-primary;
            border-radius: 0 10rpx 10rpx 0;
          }
        }
      }
    }
    .main {
      flex: 1;
      height: 100%;
      .group {
        .name {
          font-size: 28rpx;
          color: #333;
          padding: 10rpx 24rpx;
          position: sticky;
          top: 0;
          background: #fff;
        }
        .list {
          padding: 24rpx;
          padding-top: 0;
          display: grid;
          grid-gap: 24rpx;
        }
      }
    }
  }
}
</style>
