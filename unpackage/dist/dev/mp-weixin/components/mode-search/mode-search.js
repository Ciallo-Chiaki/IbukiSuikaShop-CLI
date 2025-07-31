"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = /* @__PURE__ */ Object.assign({
  options: {
    styleIsolation: "shared"
  }
}, {
  __name: "mode-search",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "5ff8cc04": common_vendor.unref(headHeight)
    }));
    const { headHeight } = utils_system.useNavBarStyle();
    const searchValue = common_vendor.ref("");
    const handleSearch = () => {
      common_vendor.index.__f__("log", "at components/mode-search/mode-search.vue:15", "搜索内容:", searchValue.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(handleSearch),
        c: common_vendor.o(common_vendor.m(($event) => searchValue.value = $event, {
          trim: true
        }, true)),
        d: common_vendor.p({
          suffixIcon: "search",
          placeholder: "请输入要搜索的产品...",
          modelValue: searchValue.value
        }),
        e: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-973b0e49"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/mode-search/mode-search.js.map
