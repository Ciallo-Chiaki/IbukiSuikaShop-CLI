"use strict";
const utils_config = require("./config.js");
const common_vendor = require("../common/vendor.js");
const statusBarH = common_vendor.computed(() => {
  return utils_config.SYSTEM_WINDOW_INFO.statusBarHeight || 25;
});
const titleBarH = common_vendor.computed(() => {
  const { top, height } = utils_config.MENU_BUTTON_RECT_INFO;
  if (!top || !height)
    return 40;
  return height + (top - common_vendor.unref(statusBarH)) * 2;
});
const navBarH = common_vendor.computed(() => {
  return common_vendor.unref(statusBarH) + common_vendor.unref(titleBarH);
});
const useNavBarStyle = () => {
  const statusBarHeightValue = common_vendor.computed(() => {
    return common_vendor.unref(statusBarH) + "px";
  });
  const titleBarHeightValue = common_vendor.computed(() => {
    return common_vendor.unref(titleBarH) + "px";
  });
  const headHeightValue = common_vendor.computed(() => {
    return common_vendor.unref(navBarH) + "px";
  });
  return {
    statusBarHeight: statusBarHeightValue,
    titleBarHeight: titleBarHeightValue,
    headHeight: headHeightValue
  };
};
exports.useNavBarStyle = useNavBarStyle;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/system.js.map
