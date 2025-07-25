<script setup>
import { ref } from "vue";
import { useNavBarStyle } from "@/utils/system.js";

const { headHeight } = useNavBarStyle();

const searchValue = ref("");
const handleSearch = () => {
  console.log("搜索内容:", searchValue.value);
};

const menuList = ref([
  {
    label: "我的积分",
    icon: "icon-jifen",
    color: "#6470E8",
    bg1: "#E0E7FF",
    bg2: "#C7D2FE",
  },
  {
    label: "购物商城",
    icon: "icon-caigou",
    color: "#EF807A",
    bg1: "#FEE2E2",
    bg2: "#FECACA",
  },
  {
    label: "商家地图",
    icon: "icon-dianpu1",
    color: "#79AA9C",
    bg1: "#DCFCE7",
    bg2: "#BBF7D0",
  },
  {
    label: "我要合作",
    icon: "icon-hezuoguanxi",
    color: "#45C2D3",
    bg1: "#CCFBF1",
    bg2: "#99F6E4",
  },
]);
</script>

<template>
  <view class="page-wrap">
    <mod-nav-bar title="首页" title-color="#ffffff"></mod-nav-bar>

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

      <view class="notice">
        <scroll-notice></scroll-notice>
      </view>

      <view class="home-menu">
        <view
          class="item"
          :style="{ color: item.color }"
          v-for="item in menuList"
          :key="item.label"
        >
          <view
            class="icon"
            :style="{
              background: `linear-gradient(to bottom, ${item.bg1}, ${item.bg2})`,
            }"
          >
            <text class="iconfont" :class="item.icon"></text>
          </view>
          <view class="label">{{ item.label }}</view>
        </view>
      </view>

      <view class="prize">
        <image src="/static/images/home_xydcj.png" mode="scaleToFill" />
      </view>

      <view class="hot">
        <view class="page-title">
          <view class="left">
            <view class="left-line"></view>
            <view class="name">热销产品</view>
          </view>
          <view class="right">
            <view class="more">查看更多</view>
            <view class="icon">
              <uni-icons type="right" color="#a6a6a6" size="24" />
            </view>
          </view>
        </view>

        <view class="hot-content">
          <view class="list">
            <view class="item" v-for="item in 10" :key="item">
              <card-goods></card-goods>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page-wrap {
  .page-content {
    padding: 20rpx 32rpx;
    width: 100%;
    position: relative;
    overflow: hidden;
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

    .notice {
      padding: 40rpx 0;
    }

    .home-menu {
      padding: 20rpx 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 140rpx;
          height: 140rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          .iconfont {
            font-size: 60rpx;
          }
        }
        .label {
          text-align: center;
          font-size: 28rpx;
          padding-top: 15rpx;
        }
      }
    }

    .prize {
      width: 100%;
      height: 185rpx;
      padding: 20rpx 32rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }

    .hot {
      padding: 30rpx 0;
      .page-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          gap: 15rpx;
          .left-line {
            width: 8rpx;
            height: 36rpx;
            background: $uni-color-primary;
            border-radius: 6rpx;
          }
          .name {
            font-size: 36rpx;
            font-weight: bolder;
            color: $uni-color-primary;
          }
        }
        .right {
          display: flex;
          align-items: center;
          gap: 5rpx;
          .more {
            font-size: 24rpx;
            color: #a6a6a6;
          }
        }
      }
      .hot-content {
        margin-top: 30rpx;
        .list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 30rpx;
          .item {
            // background: #ccc;
          }
        }
      }
    }
  }
}
</style>
