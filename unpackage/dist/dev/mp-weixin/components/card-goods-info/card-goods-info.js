"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_format = require("../../utils/format.js");
if (!Array) {
  const _easycom_uv_number_box2 = common_vendor.resolveComponent("uv-number-box");
  _easycom_uv_number_box2();
}
const _easycom_uv_number_box = () => "../../uni_modules/uv-number-box/components/uv-number-box/uv-number-box.js";
if (!Math) {
  _easycom_uv_number_box();
}
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
    },
    sku: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["selectBuy"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const cardData = common_vendor.computed(() => {
      var _a, _b, _c;
      const _bannerImg = props.info.goods_banner_img || ((_b = (_a = props.info) == null ? void 0 : _a.goods_banner_imgs) == null ? void 0 : _b[0]) || null;
      const _skuInfo = props.sku._id ? { ...props.sku } : { ...(_c = props.info.sku) == null ? void 0 : _c[0] };
      return {
        _bannerImg,
        _skuInfo,
        ...props.info
      };
    });
    const numberChange = (e) => {
      common_vendor.index.__f__("log", "at components/card-goods-info/card-goods-info.vue:44", e);
    };
    const selectBuy = () => {
      emits("selectBuy", { ...props.info });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: cardData.value._bannerImg,
        b: common_vendor.t(__props.info.name),
        c: [2].includes(__props.type)
      }, [2].includes(__props.type) ? {
        d: common_vendor.t(cardData.value._skuInfo.name || "默认规格")
      } : {}, {
        e: common_vendor.t(common_vendor.unref(utils_format.formatPrice)(__props.info.price || cardData.value._skuInfo.price)),
        f: __props.info.market_price || cardData.value._skuInfo.market_price
      }, __props.info.market_price || cardData.value._skuInfo.market_price ? {
        g: common_vendor.t(common_vendor.unref(utils_format.formatPrice)(__props.info.market_price || cardData.value._skuInfo.market_price))
      } : {}, {
        h: [1].includes(__props.type)
      }, [1].includes(__props.type) ? {
        i: common_vendor.o(selectBuy)
      } : {}, {
        j: [2].includes(__props.type)
      }, [2].includes(__props.type) ? {
        k: common_vendor.o(numberChange),
        l: common_vendor.p({
          value: cardData.value._countNum
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ba01e190"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/card-goods-info/card-goods-info.js.map
