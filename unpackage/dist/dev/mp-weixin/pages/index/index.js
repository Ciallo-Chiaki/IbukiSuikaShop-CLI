"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_mod_nav_bar2 = common_vendor.resolveComponent("mod-nav-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_mod_nav_bar2 + _easycom_uni_easyinput2)();
}
const _easycom_mod_nav_bar = () => "../../components/mod-nav-bar/mod-nav-bar.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_mod_nav_bar + _easycom_uni_easyinput)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "75318496": common_vendor.unref(headHeight)
    }));
    const { headHeight } = utils_system.useNavBarStyle();
    const searchValue = common_vendor.ref("");
    const handleSearch = () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:9", "搜索内容:", searchValue.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "首页",
          ["title-color"]: "#ffffff"
        }),
        b: common_vendor.o(handleSearch),
        c: common_vendor.o(handleSearch),
        d: common_vendor.o(common_vendor.m(($event) => searchValue.value = $event, {
          trim: true
        }, true)),
        e: common_vendor.p({
          suffixIcon: "search",
          placeholder: "请输入要搜索的产品...",
          modelValue: searchValue.value
        }),
        f: common_vendor.f(30, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        g: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
