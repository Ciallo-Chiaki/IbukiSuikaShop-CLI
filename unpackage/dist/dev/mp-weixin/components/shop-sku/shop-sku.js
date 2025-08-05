"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_card_goods_info2 = common_vendor.resolveComponent("card-goods-info");
  _easycom_card_goods_info2();
}
const _easycom_card_goods_info = () => "../card-goods-info/card-goods-info.js";
if (!Math) {
  _easycom_card_goods_info();
}
const _sfc_main = {
  __name: "shop-sku",
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          info: props.info,
          type: 3
        }),
        b: common_vendor.f(3, (item, k0, i0) => {
          return {
            a: item === 1 ? 1 : "",
            b: item
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6fb26f9c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/shop-sku/shop-sku.js.map
