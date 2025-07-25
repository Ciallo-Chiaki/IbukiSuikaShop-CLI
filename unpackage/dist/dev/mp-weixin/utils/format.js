"use strict";
const common_vendor = require("../common/vendor.js");
const formatPrice = (price = 0, opts = {}) => {
  const { digits = 2 } = opts;
  return common_vendor.xeUtils.commafy(Number(price) / 100, { digits });
};
exports.formatPrice = formatPrice;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/format.js.map
