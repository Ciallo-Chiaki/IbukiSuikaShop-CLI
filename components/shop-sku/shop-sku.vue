<script setup>
import { ref, unref, computed } from "vue";
import { useCartStore } from "@/stores/cart.js";
const cartStore = useCartStore();
console.log(cartStore.cartList);

const props = defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
  skuId: {
    type: String,
    default: "",
  },
});

console.log(props.skuId);
const emits = defineEmits(["update:skuId", "close"]);
const skuList = computed(() => {
  return props.info.sku || [];
});
console.log("skuList:", skuList.value);
const skuInfo = computed(() => {
  return skuList.value.find((item) => item._id == props.skuId) || {};
});
const countNum = ref(1);

const handleSkuChange = (e) => {
  console.log("Selected SKU:", e);
  emits("update:skuId", e._id);
};

// 采集数据函数
const createInfo = () => {
  if (!unref(skuInfo)._id) {
    throw new Error("缺少规格参数");
  }
  return {
    ...props.info,
    _skuInfo: unref(skuInfo),
    _countNum: unref(countNum),
  };
};

const handleCart = () => {
  const shopInfo = createInfo();
  cartStore.pushGoods(shopInfo);
  emits("close");
};
const handleBuy = () => {
  emits("close");
};
</script>

<template>
  <view class="shop-sku">
    <view class="info-wrap">
      <card-goods-info
        :info="props.info"
        :type="3"
        :sku="skuInfo"
      ></card-goods-info>
    </view>

    <view class="sku-list-wrap">
      <view class="label">规格</view>
      <view class="sku-list">
        <view
          class="sku-item"
          @click="handleSkuChange(item)"
          :class="{ active: item._id === skuId }"
          v-for="item in skuList"
          :key="item._id"
          >{{ item.name }}</view
        >
      </view>
    </view>

    <view class="set-count-wrap">
      <view class="label">数量</view>
      <view class="count">
        <uv-number-box v-model="countNum" :min="1" :max="10"></uv-number-box>
      </view>
    </view>

    <view class="btn-wrap">
      <view class="btn car-btn" @click="handleCart">加入购物车</view>
      <view class="btn buy-btn" @click="handleBuy">立即购买</view>
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
        border: 1px solid #eee;

        &.active {
          color: #fff;
          border: 1px solid #fff;
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
