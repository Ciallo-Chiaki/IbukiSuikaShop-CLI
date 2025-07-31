"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/system.js");
if (!Array) {
  const _easycom_mod_nav_bar2 = common_vendor.resolveComponent("mod-nav-bar");
  const _easycom_mode_search2 = common_vendor.resolveComponent("mode-search");
  const _easycom_card_goods_info2 = common_vendor.resolveComponent("card-goods-info");
  (_easycom_mod_nav_bar2 + _easycom_mode_search2 + _easycom_card_goods_info2)();
}
const _easycom_mod_nav_bar = () => "../../components/mod-nav-bar/mod-nav-bar.js";
const _easycom_mode_search = () => "../../components/mode-search/mode-search.js";
const _easycom_card_goods_info = () => "../../components/card-goods-info/card-goods-info.js";
if (!Math) {
  (_easycom_mod_nav_bar + _easycom_mode_search + _easycom_card_goods_info)();
}
const _sfc_main = {
  __name: "category",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "商品分类",
          ["title-color"]: "#ffffff"
        }),
        b: common_vendor.f(5, (item, index, i0) => {
          return {
            a: index == 2 ? 1 : "",
            b: index
          };
        }),
        c: common_vendor.f(5, (group, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.f(3, (goods, index2, i1) => {
              return {
                a: "cb6343c4-2-" + i0 + "-" + i1,
                b: index2
              };
            }),
            c: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cb6343c4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shop/category.js.map
