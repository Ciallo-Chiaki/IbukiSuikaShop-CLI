"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_format = require("../../utils/format.js");
const _sfc_main = {
  __name: "card-goods",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.t(common_vendor.unref(utils_format.formatPrice)(5688, {
          digits: 2
        })),
        c: common_vendor.t(common_vendor.unref(utils_format.formatPrice)(12332, {
          digits: 2
        }))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-953ea244"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/card-goods/card-goods.js.map
