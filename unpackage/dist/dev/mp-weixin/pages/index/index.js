"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_mod_nav_bar2 = common_vendor.resolveComponent("mod-nav-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_scroll_notice2 = common_vendor.resolveComponent("scroll-notice");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_card_goods2 = common_vendor.resolveComponent("card-goods");
  (_easycom_mod_nav_bar2 + _easycom_uni_easyinput2 + _easycom_scroll_notice2 + _easycom_uni_icons2 + _easycom_card_goods2)();
}
const _easycom_mod_nav_bar = () => "../../components/mod-nav-bar/mod-nav-bar.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_scroll_notice = () => "../../components/scroll-notice/scroll-notice.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_card_goods = () => "../../components/card-goods/card-goods.js";
if (!Math) {
  (_easycom_mod_nav_bar + _easycom_uni_easyinput + _easycom_scroll_notice + _easycom_uni_icons + _easycom_card_goods)();
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
    const menuList = common_vendor.ref([
      {
        label: "我的积分",
        icon: "icon-jifen",
        color: "#6470E8",
        bg1: "#E0E7FF",
        bg2: "#C7D2FE"
      },
      {
        label: "购物商城",
        icon: "icon-caigou",
        color: "#EF807A",
        bg1: "#FEE2E2",
        bg2: "#FECACA"
      },
      {
        label: "商家地图",
        icon: "icon-dianpu1",
        color: "#79AA9C",
        bg1: "#DCFCE7",
        bg2: "#BBF7D0"
      },
      {
        label: "我要合作",
        icon: "icon-hezuoguanxi",
        color: "#45C2D3",
        bg1: "#CCFBF1",
        bg2: "#99F6E4"
      }
    ]);
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
        f: common_assets._imports_0,
        g: common_assets._imports_1,
        h: common_vendor.f(menuList.value, (item, k0, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: `linear-gradient(to bottom, ${item.bg1}, ${item.bg2})`,
            c: common_vendor.t(item.label),
            d: item.color,
            e: item.label
          };
        }),
        i: common_assets._imports_2,
        j: common_vendor.p({
          type: "right",
          color: "#a6a6a6",
          size: "24"
        }),
        k: common_vendor.f(10, (item, k0, i0) => {
          return {
            a: "1cf27b2a-4-" + i0,
            b: item
          };
        }),
        l: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
