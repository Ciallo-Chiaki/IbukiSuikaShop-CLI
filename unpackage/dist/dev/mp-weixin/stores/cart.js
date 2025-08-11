"use strict";
const common_vendor = require("../common/vendor.js");
const utils_format = require("../utils/format.js");
const cartList = common_vendor.ref([]);
const useCartStore = common_vendor.defineStore("cart", () => {
  const goodsTotal = common_vendor.computed(() => {
    return common_vendor.unref(cartList).reduce((total, item) => {
      return common_vendor.xeUtils.add(total, Number(item._countNum));
    }, 0);
  });
  const priceTotal = common_vendor.computed(() => {
    let amount = common_vendor.unref(cartList).reduce((prev, current) => {
      const result = common_vendor.xeUtils.multiply(
        Number(current._countNum),
        Number(current._skuInfo.price)
      );
      return common_vendor.xeUtils.add(prev, Number(result));
    }, 0);
    return utils_format.formatPrice(amount, { digits: 2 });
  });
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
    pushGoods,
    goodsTotal,
    priceTotal
  };
});
exports.useCartStore = useCartStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/cart.js.map
