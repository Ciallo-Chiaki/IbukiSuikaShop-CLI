<script setup>
import { COLOR_THEME_PRIMARY } from "@/utils/config.js";
import { useNavBarStyle } from "@/utils/system.js";
import { computed } from "vue";
const { statusBarHeight, titleBarHeight, headHeight } = useNavBarStyle();
console.log("状态栏高度", statusBarHeight);
console.log("标题栏高度", titleBarHeight);
console.log("头部高度", headHeight);

const props = defineProps({
  title: {
    type: String,
    default: "标题内容",
  },
  titleColor: {
    type: String,
    default: "#ffffff",
  },
});

// 页面栈
const showBack = getCurrentPages().length > 1;

const navBack = () => {
  uni.navigateBack({
    fail: () => {
      uni.reLaunch({
        url: "/pages/index/index",
      });
    },
  });
};

// 判断标题文字的对齐方式
const titleTextAlign = computed(() => {
  if (!showBack) return "left";
  return "center";
});
</script>

<template>
  <view class="mod-nav-bar">
    <view class="fixed-wrap">
      <view class="status-bar"></view>
      <view class="title-bar">
        <view class="arrow-wrap" v-if="showBack" @click.stop="navBack">
          <uni-icons
            class="icon"
            type="left"
            size="28"
            :color="titleColor"
          ></uni-icons>
        </view>
        <view class="text-wrap"> {{ title }} </view>
        <view class="menu-wrap"></view>
      </view>
    </view>
    <view class="block-wrap"></view>
  </view>
</template>

<style lang="scss" scoped>
.mod-nav-bar {
  width: 750rpx;
  .fixed-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: v-bind(COLOR_THEME_PRIMARY);
    .status-bar {
      width: 100%;
      height: v-bind(statusBarHeight);
      // border: 1px solid red;
    }
    .title-bar {
      display: flex;
      width: 100%;
      text-align: center;
      justify-content: space-between;
      align-items: center;
      height: v-bind(titleBarHeight);
      // border: 1px solid green;
      color: v-bind(titleColor);
      padding: 0 32rpx;
      font-size: 32rpx;
      .arrow-wrap {
        height: 100%;
        width: 80rpx;
        flex-shrink: 0;
        display: flex;
        align-items: center;
      }
      .text-wrap {
        flex: 1;
        text-align: v-bind(titleTextAlign);
        font-weight: bold;
      }
      .menu-wrap {
        height: 100%;
        width: 80rpx;
        flex-shrink: 0;
      }
    }
  }
  .block-wrap {
    width: 100%;
    height: v-bind(headHeight);
  }
}
</style>
