<script setup></script>

<template>
  <view class="scroll-notice">
    <view class="left-wrap">
      <image
        class="icon"
        src="/static/images/notic_prefix.png"
        mode="aspectFill"
      />
    </view>
    <view class="notice-wrap">
      <swiper class="swiper" vertical interval="3000" autoplay circular>
        <swiper-item class="swiper-item"
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
          veritatis expedita, fugit consectetur culpa quas inventore at enim
          dolorem totam facere, vero neque quis nobis. Hic nostrum fuga animi
          consectetur! 测试文本内容1</swiper-item
        >
        <swiper-item class="swiper-item"
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
          veritatis expedita, fugit consectetur culpa quas inventore at enim
          dolorem totam facere, vero neque quis nobis. Hic nostrum fuga animi
          consectetur! 测试文本内容2</swiper-item
        >
        <swiper-item class="swiper-item"
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
          veritatis expedita, fugit consectetur culpa quas inventore at enim
          dolorem totam facere, vero neque quis nobis. Hic nostrum fuga animi
          consectetur! 测试文本内容3</swiper-item
        >
      </swiper>
    </view>
    <view class="right-wrap">
      <uni-icons type="right" color="#888" size="34rpx" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.scroll-notice {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20rpx;
  .left-wrap {
    flex-shrink: 0;
    .icon {
      width: 88rpx;
      height: 40rpx;
      display: block;
    }
  }
  .notice-wrap {
    flex: 1;
    .swiper {
      height: 50rpx;
      width: 100%;
      line-height: 50rpx;
      &-item {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: end;
        font-size: 32rpx;
        height: 50rpx;
        color: #333;
        text-decoration: underline;
        @include text-ellipsis(1);
      }
    }
  }
  .right-wrap {
    width: 80rpx;
    flex-shrink: 0;
    display: flex;
    align-items: end;
    justify-content: flex-end;
  }
}
</style>
