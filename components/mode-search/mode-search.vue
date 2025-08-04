<script setup>
defineOptions({
  options: {
    styleIsolation: "shared",
  },
});

import { ref } from "vue";
import { useNavBarStyle } from "@/utils/system.js";

const { headHeight } = useNavBarStyle();

const searchValue = ref("");
const handleSearch = () => {
  console.log("搜索内容:", searchValue.value);
};
</script>

<template>
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
</template>

<style lang="scss" scoped>
.search-wrap {
  .fixed {
    background-color: $uni-color-primary;
    padding: 10rpx 32rpx;
    position: fixed;
    width: 100%;
    height: 45px;
    top: v-bind(headHeight);
    left: 0;
    z-index: 1000;
    :deep(.is-input-border) {
      border-radius: 50px;
      border-color: $uni-border-color !important;
    }
  }
  .block {
    height: 45px;
  }
}
</style>
