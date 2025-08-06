"use strict";
const common_vendor = require("../common/vendor.js");
const cartList = common_vendor.ref([]);
const useCartStore = common_vendor.defineStore("cart", () => {
  const pushGoods = (data) => {
    cartList.value.unshift(data);
  };
  return {
    cartList,
    pushGoods
  };
});
exports.useCartStore = useCartStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/cart.js.map
