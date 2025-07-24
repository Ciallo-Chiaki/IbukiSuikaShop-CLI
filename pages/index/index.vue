<script setup>
import { ref } from "vue";
import { useNavBarStyle } from "@/utils/system.js";

const { headHeight } = useNavBarStyle();

const searchValue = ref("");
const handleSearch = () => {
  console.log("搜索内容:", searchValue.value);
};
</script>

<template>
  <view class="page-wrap">
    <mod-nav-bar title="首页" title-color="#ffffff"></mod-nav-bar>

    <view class="search-wrap">
      <view class="fixed">
        <uni-easyinput
          class="uni-mt-5"
          suffixIcon="search"
          v-model.trim="searchValue"
          placeholder="请输入要搜索的产品..."
          @iconClick="handleSearch"
          @confirm="handleSearch"
        ></uni-easyinput>
      </view>
      <view class="block"></view>
    </view>

    <view class="page-content">
      <view class="banner">
        <swiper
          indicator-dots
          indicator-color="rgba(255, 255, 255, 0.5)"
          indicator-active-color="rgba(255, 255, 255, 1)"
          interval="3000"
          autoplay
          circular
          class="swiper"
        >
          <swiper-item class="swiper-item">
            <image
              class="swiper-image"
              src="/static/images/tmp_banner1.png"
              mode="scaleToFill"
            />
          </swiper-item>

          <swiper-item class="swiper-item">
            <image
              class="swiper-image"
              src="/static/images/tmp_banner2.jpg"
              mode="scaleToFill"
            />
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view v-for="item in 30">
      {{ item }}. 这是一个示例列表项，您可以在这里添加更多内容。
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page-wrap {
  .search-wrap {
    .fixed {
      background-color: $uni-color-primary;
      padding: 10rpx 32rpx;
      position: fixed;
      width: 100%;
      height: 90rpx;
      top: v-bind(headHeight);
      left: 0;
      :deep(.is-input-border) {
        border-radius: 50px;
        border-color: $uni-border-color !important;
      }
    }
    .block {
      height: 90rpx;
    }
  }
  .page-content {
    padding: 20rpx 32rpx;
    width: 100%;
    position: relative;
    &::before {
      content: "";
      display: block;
      width: 984rpx;
      height: 522rpx;
      border-radius: 50%;
      background: $uni-color-primary;
      position: absolute;
      left: calc(50% - 492rpx);
      top: -320rpx;
      z-index: -1;
    }

    .banner {
      width: 100%;
      .swiper {
        width: 100%;
        height: 352rpx;
        &-item {
          width: 100%;
          height: 100%;
          border-radius: 30rpx;
          overflow: hidden;
          .swiper-image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
