<script setup>
import { computed, unref, ref, nextTick } from "vue";
import { SYSTEM_WINDOW_INFO } from "@/utils/config.js";
import { navBarH } from "@/utils/system.js";
import { useGoodsCategoryApi, useGoodsDetailApi } from "@/apis/goods.js";
import { useCartStore } from "@/stores/cart.js";

const cartStore = useCartStore();
const { data: categoryList = [] } = useGoodsCategoryApi();
const { data: goodsDetail = {} } = useGoodsDetailApi();

const currentClassId = ref("");
const mainScrollTop = ref(0);
const skuPopRef = ref(null);
const cartPopRef = ref(null);
const currentGoods = ref({});
const currentSkuId = ref("");
const containerHeight = computed(() => {
  let tabBarH = 0;
  // #ifdef H5
  tabBarH = 50;
  // #endif

  return `${
    SYSTEM_WINDOW_INFO.windowHeight -
    unref(navBarH) -
    45 -
    uni.rpx2px(100) -
    tabBarH
  }px`;
});

const onClassTab = (item) => {
  console.log("Selected category:", item);
  currentClassId.value = item._id;
  mainScrollTop.value = item.top;
};

const calcSize = () => {
  let height = 0;
  categoryList.forEach((item, index) => {
    const view = uni.createSelectorQuery().select(`#module-${item._id}`);
    view
      .fields({ size: true }, (data) => {
        item.top = Math.floor(height);
        height += data.height;
      })
      .exec();
  });
  return height;
};

const onMainScroll = (e) => {
  let scrollTop = e.detail.scrollTop;
  let results = categoryList.filter((item) => item.top <= scrollTop).reverse();
  console.log(results);
  if (results.length > 0) currentClassId.value = results[0]._id;
};

const showSkuPop = (e) => {
  // console.log(e);
  currentGoods.value = goodsDetail;
  currentSkuId.value = goodsDetail?.sku?.[0]?._id || "";
  skuPopRef.value.open();
};

const closeSkuPop = () => {
  skuPopRef.value.close();
};

const showCartPop = () => {
  cartPopRef.value.open();
};

nextTick(() => {
  calcSize();
  if (categoryList) onClassTab(categoryList[0]);
  console.log(categoryList);
});
console.log(unref(containerHeight));
</script>

<template>
  <view class="page-wrap">
    <mod-nav-bar title="商品分类" title-color="#ffffff"></mod-nav-bar>
    <mode-search></mode-search>
    <view class="container">
      <scroll-view class="aside" scroll-y>
        <view
          class="item"
          :class="{ active: item._id == currentClassId }"
          v-for="(item, index) in categoryList"
          :key="item._id"
          @click="onClassTab(item)"
          >{{ item.name }}</view
        >
      </scroll-view>
      <scroll-view
        class="main"
        scroll-y
        :scroll-top="mainScrollTop"
        scroll-with-animation
        @scroll="onMainScroll"
      >
        <view
          class="group"
          v-for="(group, index) in categoryList"
          :key="group._id"
          :id="`module-${group._id}`"
        >
          <view class="name">{{ group.name }}</view>
          <view class="list">
            <view
              class="item"
              v-for="(goods, index) in group.goods"
              :key="goods._id"
            >
              <card-goods-info
                :info="goods"
                :type="1"
                @select-buy="showSkuPop"
              ></card-goods-info>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="shop-bar">
      <view class="content">
        <view class="left">
          <view class="icon-wrap" @click="showCartPop">
            <view class="iconfont icon-caigou"></view>
            <view class="tag" v-if="cartStore.goodsTotal > 0">{{
              cartStore.goodsTotal
            }}</view>
          </view>
          <view class="price-wrap">
            <text>合计：</text>
            <text class="num">￥{{ cartStore.priceTotal }}</text>
          </view>
        </view>
        <view class="right">
          <view class="settle" v-if="cartStore.goodsTotal > 0">去结算</view>
        </view>
      </view>
    </view>

    <uni-popup ref="skuPopRef" type="bottom" :mask="true" :safe-area="false">
      <view class="sku-pop-wrap">
        <shop-sku
          :info="currentGoods"
          :sku-id="currentSkuId"
          v-model:sku-id="currentSkuId"
          @close="closeSkuPop"
        ></shop-sku>
      </view>
    </uni-popup>

    <uni-popup ref="cartPopRef" type="bottom" :mask="true" :safe-area="false">
      <view class="cart-pop-wrap">
        <shop-cart></shop-cart>
      </view>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
.page-wrap {
  .container {
    display: flex;
    justify-content: space-between;
    height: v-bind(containerHeight);

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
          background: #fff;

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
          font-size: 26rpx;
          color: #333;
          padding: 10rpx 24rpx;
          position: sticky;
          top: 0;
          left: 0;
          background: #fff;
          font-weight: bold;
        }

        .list {
          padding: 24rpx;
          padding-top: 0;
          display: grid;
          gap: 24rpx;
        }
      }
    }
  }

  .shop-bar {
    position: fixed;
    width: 100%;
    left: 0;
    //#ifdef H5
    bottom: 50px;
    //#endif
    //#ifndef H5
    bottom: 0;
    //#endif
    .content {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100rpx;
      padding: 0 24rpx;
      box-sizing: border-box;
      background-color: #6a6a6a;

      .left {
        display: flex;
        align-items: center;
        height: 100%;

        .icon-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 112rpx;
          height: 112rpx;
          border-radius: 50%;
          background-color: $uni-color-primary;
          position: absolute;
          top: -30rpx;
          left: 24rpx;

          .iconfont {
            font-size: 50rpx;
            color: #fff;
          }

          .tag {
            position: absolute;
            right: 0;
            top: 0rpx;
            min-width: 40rpx;
            height: 40rpx;
            padding: 10rpx;
            font-size: 22rpx;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: $uni-color-error;
            border-radius: 40rpx;
          }
        }

        .price-wrap {
          display: flex;
          align-items: center;
          margin-left: 120rpx;
          color: #fff;
          font-size: 22rpx;

          .num {
            font-size: 36rpx;
          }
        }
      }

      .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100%;

        .settle {
          padding: 0 32rpx;
          height: 66rpx;
          line-height: 66rpx;
          font-size: 32rpx;
          color: #fff;
          background-color: $uni-color-error;
          border-radius: 66rpx;
        }
      }
    }
  }

  .sku-pop-wrap,
  .cart-pop-wrap {
    background: #fff;
    min-height: 300rpx;
    padding: 32rpx;
    /* #ifdef H5 */
    padding: 32rpx 32rpx 66px;
    /* #endif */
    border-radius: 20rpx 20rpx 0 0;
  }
}
</style>
