import { defineStore } from "pinia";
import { ref, unref } from "vue";

const cartList = ref([]);
export const useCartStore = defineStore("cart", () => {
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
  };
});
