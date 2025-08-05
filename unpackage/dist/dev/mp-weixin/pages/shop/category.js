"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_config = require("../../utils/config.js");
const utils_system = require("../../utils/system.js");
const apis_goods = require("../../apis/goods.js");
if (!Array) {
  const _easycom_mod_nav_bar2 = common_vendor.resolveComponent("mod-nav-bar");
  const _easycom_mode_search2 = common_vendor.resolveComponent("mode-search");
  const _easycom_card_goods_info2 = common_vendor.resolveComponent("card-goods-info");
  const _easycom_shop_sku2 = common_vendor.resolveComponent("shop-sku");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_mod_nav_bar2 + _easycom_mode_search2 + _easycom_card_goods_info2 + _easycom_shop_sku2 + _easycom_uni_popup2)();
}
const _easycom_mod_nav_bar = () => "../../components/mod-nav-bar/mod-nav-bar.js";
const _easycom_mode_search = () => "../../components/mode-search/mode-search.js";
const _easycom_card_goods_info = () => "../../components/card-goods-info/card-goods-info.js";
const _easycom_shop_sku = () => "../../components/shop-sku/shop-sku.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_mod_nav_bar + _easycom_mode_search + _easycom_card_goods_info + _easycom_shop_sku + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "category",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "fcf5eaf4": containerHeight.value
    }));
    const { data: categoryList = [] } = apis_goods.useGoodsCategoryApi();
    const { data: goodsDetail = {} } = apis_goods.useGoodsDetailApi();
    const currentClassId = common_vendor.ref("");
    const mainScrollTop = common_vendor.ref(0);
    const skuPopRef = common_vendor.ref(null);
    const currentGoods = common_vendor.ref({});
    const containerHeight = common_vendor.computed(() => {
      let tabBarH = 0;
      return `${utils_config.SYSTEM_WINDOW_INFO.windowHeight - common_vendor.unref(utils_system.navBarH) - 45 - common_vendor.index.rpx2px(100) - tabBarH}px`;
    });
    const onClassTab = (item) => {
      common_vendor.index.__f__("log", "at pages/shop/category.vue:31", "Selected category:", item);
      currentClassId.value = item._id;
      mainScrollTop.value = item.top;
    };
    const calcSize = () => {
      let height = 0;
      categoryList.forEach((item, index) => {
        const view = common_vendor.index.createSelectorQuery().select(`#module-${item._id}`);
        view.fields({ size: true }, (data) => {
          item.top = Math.floor(height);
          height += data.height;
        }).exec();
      });
      return height;
    };
    const onMainScroll = (e) => {
      let scrollTop = e.detail.scrollTop;
      let results = categoryList.filter((item) => item.top <= scrollTop).reverse();
      common_vendor.index.__f__("log", "at pages/shop/category.vue:53", results);
      if (results.length > 0)
        currentClassId.value = results[0]._id;
    };
    const showSkuPop = (e) => {
      common_vendor.index.__f__("log", "at pages/shop/category.vue:58", e);
      currentGoods.value = goodsDetail;
      skuPopRef.value.open();
    };
    common_vendor.nextTick$1(() => {
      calcSize();
      if (categoryList)
        onClassTab(categoryList[0]);
      common_vendor.index.__f__("log", "at pages/shop/category.vue:66", categoryList);
    });
    common_vendor.index.__f__("log", "at pages/shop/category.vue:68", common_vendor.unref(containerHeight));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "商品分类",
          ["title-color"]: "#ffffff"
        }),
        b: common_vendor.f(common_vendor.unref(categoryList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item._id == currentClassId.value ? 1 : "",
            c: item._id,
            d: common_vendor.o(($event) => onClassTab(item), item._id)
          };
        }),
        c: common_vendor.f(common_vendor.unref(categoryList), (group, index, i0) => {
          return {
            a: common_vendor.t(group.name),
            b: common_vendor.f(group.goods, (goods, index2, i1) => {
              return {
                a: common_vendor.o(showSkuPop, goods._id),
                b: "cb6343c4-2-" + i0 + "-" + i1,
                c: common_vendor.p({
                  info: goods,
                  type: 1
                }),
                d: goods._id
              };
            }),
            c: group._id,
            d: `module-${group._id}`
          };
        }),
        d: mainScrollTop.value,
        e: common_vendor.o(onMainScroll),
        f: common_vendor.p({
          info: currentGoods.value
        }),
        g: common_vendor.sr(skuPopRef, "cb6343c4-3", {
          "k": "skuPopRef"
        }),
        h: common_vendor.p({
          type: "bottom",
          mask: true
        }),
        i: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cb6343c4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shop/category.js.map
