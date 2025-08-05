"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_format = require("../../utils/format.js");
const _sfc_main = {
  __name: "card-goods-info",
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: Number,
      default: 0
      /* 
        0 订单列表处
        1 商城分类列表处
        2 商品购物车列表处
        3 规格选择处
        4 创建订单处
        5 订单历史详情
      */
    }
  },
  emits: ["selectBuy"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const selectBuy = () => {
      emits("selectBuy", { ...props.info });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.info.goods_banner_img,
        b: common_vendor.t(__props.info.name),
        c: common_vendor.t(common_vendor.unref(utils_format.formatPrice)(__props.info.price)),
        d: __props.info.market_price
      }, __props.info.market_price ? {
        e: common_vendor.t(common_vendor.unref(utils_format.formatPrice)(__props.info.market_price))
      } : {}, {
        f: [1].includes(__props.type)
      }, [1].includes(__props.type) ? {
        g: common_vendor.o(selectBuy)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ba01e190"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/card-goods-info/card-goods-info.js.map
