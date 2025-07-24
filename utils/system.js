import { SYSTEM_WINDOW_INFO } from "@/utils/config.js";
import { computed, unref } from "vue";
import { MENU_BUTTON_RECT_INFO } from "./config";

// 状态栏高度（默认25px）
export const statusBarH = computed(() => {
  return SYSTEM_WINDOW_INFO.statusBarHeight || 25;
});

// 标题栏高度
export const titleBarH = computed(() => {
  const { top, height } = MENU_BUTTON_RECT_INFO;
  if (!top || !height) return 40;
  return height + (top - unref(statusBarH)) * 2;
});

// 导航栏整体高度 = 状态栏高度 + 标题栏高度
export const navBarH = computed(() => {
  return unref(statusBarH) + unref(titleBarH);
});

export const useNavBarStyle = () => {
  const statusBarHeightValue = computed(() => {
    return unref(statusBarH) + "px";
  });
  const titleBarHeightValue = computed(() => {
    return unref(titleBarH) + "px";
  });
  const headHeightValue = computed(() => {
    return unref(navBarH) + "px";
  });

  return {
    statusBarHeight: statusBarHeightValue,
    titleBarHeight: titleBarHeightValue,
    headHeight: headHeightValue,
  };
};
