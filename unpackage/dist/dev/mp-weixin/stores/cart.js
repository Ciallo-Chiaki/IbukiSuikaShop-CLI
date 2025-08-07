"use strict";
const common_vendor = require("../common/vendor.js");
const cartList = common_vendor.ref([]);
const useCartStore = common_vendor.defineStore("cart", () => {
  const pushGoods = (data) => {
    let {
      _id,
      _skuInfo: { _id: skuId },
      _countNum
    } = data;
    const index = common_vendor.unref(cartList).findIndex(
      (item) => _id && skuId && item._id === _id && item._skuInfo._id === skuId
    );
    if (index > -1) {
      cartList.value[index]._countNum += _countNum;
      return;
    }
    cartList.value.unshift(data);
  };
  return {
    cartList,
    pushGoods
  };
});
exports.useCartStore = useCartStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/cart.js.map
