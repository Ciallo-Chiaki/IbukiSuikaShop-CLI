"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_cart = require("../../stores/cart.js");
if (!Array) {
  const _easycom_card_goods_info2 = common_vendor.resolveComponent("card-goods-info");
  const _easycom_uv_number_box2 = common_vendor.resolveComponent("uv-number-box");
  (_easycom_card_goods_info2 + _easycom_uv_number_box2)();
}
const _easycom_card_goods_info = () => "../card-goods-info/card-goods-info.js";
const _easycom_uv_number_box = () => "../../uni_modules/uv-number-box/components/uv-number-box/uv-number-box.js";
if (!Math) {
  (_easycom_card_goods_info + _easycom_uv_number_box)();
}
const _sfc_main = {
  __name: "shop-sku",
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    skuId: {
      type: String,
      default: ""
    }
  },
  emits: ["update:skuId", "close"],
  setup(__props, { emit: __emit }) {
    const cartStore = stores_cart.useCartStore();
    common_vendor.index.__f__("log", "at components/shop-sku/shop-sku.vue:5", cartStore.cartList);
    const props = __props;
    common_vendor.index.__f__("log", "at components/shop-sku/shop-sku.vue:18", props.skuId);
    const emits = __emit;
    const skuList = common_vendor.computed(() => {
      return props.info.sku || [];
    });
    common_vendor.index.__f__("log", "at components/shop-sku/shop-sku.vue:23", "skuList:", skuList.value);
    const skuInfo = common_vendor.computed(() => {
      return skuList.value.find((item) => item._id == props.skuId) || {};
    });
    const countNum = common_vendor.ref(1);
    const handleSkuChange = (e) => {
      common_vendor.index.__f__("log", "at components/shop-sku/shop-sku.vue:30", "Selected SKU:", e);
      emits("update:skuId", e._id);
    };
    const createInfo = () => {
      if (!common_vendor.unref(skuInfo)._id) {
        throw new Error("缺少规格参数");
      }
      return {
        ...props.info,
        _skuInfo: common_vendor.unref(skuInfo),
        _countNum: common_vendor.unref(countNum)
      };
    };
    const handleCart = () => {
      const shopInfo = createInfo();
      cartStore.pushGoods(shopInfo);
      emits("close");
    };
    const handleBuy = () => {
      emits("close");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          info: props.info,
          type: 3,
          sku: skuInfo.value
        }),
        b: common_vendor.f(skuList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.o(($event) => handleSkuChange(item), item._id),
            c: item._id === __props.skuId ? 1 : "",
            d: item._id
          };
        }),
        c: common_vendor.o(($event) => countNum.value = $event),
        d: common_vendor.p({
          min: 1,
          max: 10,
          modelValue: countNum.value
        }),
        e: common_vendor.o(handleCart),
        f: common_vendor.o(handleBuy)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6fb26f9c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/shop-sku/shop-sku.js.map
