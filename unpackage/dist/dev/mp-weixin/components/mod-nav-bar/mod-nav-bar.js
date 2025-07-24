"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_config = require("../../utils/config.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "mod-nav-bar",
  props: {
    title: {
      type: String,
      default: "标题内容"
    },
    titleColor: {
      type: String,
      default: "#ffffff"
    }
  },
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "cb1a5f74": common_vendor.unref(utils_config.COLOR_THEME_PRIMARY),
      "7598c584": common_vendor.unref(statusBarHeight),
      "60186a28": common_vendor.unref(titleBarHeight),
      "efd55796": __props.titleColor,
      "62c901aa": titleTextAlign.value,
      "3709e371": common_vendor.unref(headHeight)
    }));
    const { statusBarHeight, titleBarHeight, headHeight } = utils_system.useNavBarStyle();
    common_vendor.index.__f__("log", "at components/mod-nav-bar/mod-nav-bar.vue:6", "状态栏高度", statusBarHeight);
    common_vendor.index.__f__("log", "at components/mod-nav-bar/mod-nav-bar.vue:7", "标题栏高度", titleBarHeight);
    common_vendor.index.__f__("log", "at components/mod-nav-bar/mod-nav-bar.vue:8", "头部高度", headHeight);
    const showBack = getCurrentPages().length > 1;
    const navBack = () => {
      common_vendor.index.navigateBack({
        fail: () => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    const titleTextAlign = common_vendor.computed(() => {
      if (!showBack)
        return "left";
      return "center";
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showBack
      }, showBack ? {
        b: common_vendor.p({
          type: "left",
          size: "28",
          color: __props.titleColor
        }),
        c: common_vendor.o(navBack)
      } : {}, {
        d: common_vendor.t(__props.title),
        e: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ba908f3c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/mod-nav-bar/mod-nav-bar.js.map
