import { defineStore } from "pinia";
import { ref, unref, computed } from "vue";
import { formatPrice } from "@/utils/format.js";
import { add as xe_add, multiply as xe_multiply } from "xe-utils";

const cartList = ref([]);
export const useCartStore = defineStore("cart", () => {
  // 购物车显示的商品件数
  const goodsTotal = computed(() => {
    return unref(cartList).reduce((total, item) => {
      return xe_add(total, Number(item._countNum));
    }, 0);
  });

  // 购物车显示的总价
  const priceTotal = computed(() => {
    let amount = unref(cartList).reduce((prev, current) => {
      const result = xe_multiply(
        Number(current._countNum),
        Number(current._skuInfo.price),
      );
      return xe_add(prev, Number(result));
    }, 0);
    return formatPrice(amount, { digits: 2 });
  });

  const pushGoods = (data) => {
    let {
      _id,
      _skuInfo: { _id: skuId },
      _countNum,
    } = data;

    const index = unref(cartList).findIndex(
      (item) => _id && skuId && item._id === _id && item._skuInfo._id === skuId,
    );
    if (index > -1) {
      cartList.value[index]._countNum += _countNum;

      return;
    }
    cartList.value.unshift(data);
  };

  // 计算购物车商品件数

  return {
    cartList,
    pushGoods,
    goodsTotal,
    priceTotal,
  };
});
