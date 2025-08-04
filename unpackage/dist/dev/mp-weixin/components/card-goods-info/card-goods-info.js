"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_format = require("../../utils/format.js");
const _sfc_main = {
  __name: "card-goods-info",
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.info.goods_banner_img,
        b: common_vendor.t(__props.info.name),
        c: common_vendor.t(common_vendor.unref(utils_format.formatPrice)(__props.info.price)),
        d: __props.info.market_price
      }, __props.info.market_price ? {
        e: common_vendor.t(common_vendor.unref(utils_format.formatPrice)(__props.info.market_price))
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ba01e190"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/card-goods-info/card-goods-info.js.map
