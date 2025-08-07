"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_cart = require("../../stores/cart.js");
if (!Array) {
  const _easycom_card_goods_info2 = common_vendor.resolveComponent("card-goods-info");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_card_goods_info2 + _easycom_uni_load_more2)();
}
const _easycom_card_goods_info = () => "../card-goods-info/card-goods-info.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_card_goods_info + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "shop-cart",
  setup(__props) {
    const cartStore = stores_cart.useCartStore();
    const handleCartOrder = () => {
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(cartStore).cartList, (item, k0, i0) => {
          return {
            a: "f0328613-0-" + i0,
            b: common_vendor.p({
              info: item,
              type: 2
            })
          };
        }),
        b: common_vendor.unref(cartStore).cartList.length < 1
      }, common_vendor.unref(cartStore).cartList.length < 1 ? {
        c: common_vendor.p({
          status: "no-more",
          ["content-text"]: {
            contentnomore: "购物车是空的"
          }
        })
      } : {}, {
        d: common_vendor.unref(cartStore).cartList.length > 0
      }, common_vendor.unref(cartStore).cartList.length > 0 ? {
        e: common_vendor.o(handleCartOrder)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f0328613"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/shop-cart/shop-cart.js.map
