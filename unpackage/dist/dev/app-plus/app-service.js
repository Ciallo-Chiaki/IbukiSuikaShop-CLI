if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$8 = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/extest/IbukiSuikaShop-CLI/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const SYSTEM_WINDOW_INFO = uni.getWindowInfo();
  const MENU_BUTTON_RECT_INFO = uni.getMenuButtonBoundingClientRect ? uni.getMenuButtonBoundingClientRect() : {};
  const COLOR_THEME_PRIMARY = "#bdaf8d";
  const statusBarH = vue.computed(() => {
    return SYSTEM_WINDOW_INFO.statusBarHeight || 25;
  });
  const titleBarH = vue.computed(() => {
    const { top, height } = MENU_BUTTON_RECT_INFO;
    if (!top || !height)
      return 40;
    return height + (top - vue.unref(statusBarH)) * 2;
  });
  const navBarH = vue.computed(() => {
    return vue.unref(statusBarH) + vue.unref(titleBarH);
  });
  const useNavBarStyle = () => {
    const statusBarHeightValue = vue.computed(() => {
      return vue.unref(statusBarH) + "px";
    });
    const titleBarHeightValue = vue.computed(() => {
      return vue.unref(titleBarH) + "px";
    });
    const headHeightValue = vue.computed(() => {
      return vue.unref(navBarH) + "px";
    });
    return {
      statusBarHeight: statusBarHeightValue,
      titleBarHeight: titleBarHeightValue,
      headHeight: headHeightValue
    };
  };
  const _sfc_main$7 = {
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
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "ba908f3c-COLOR_THEME_PRIMARY": vue.unref(COLOR_THEME_PRIMARY),
        "ba908f3c-statusBarHeight": vue.unref(statusBarHeight),
        "ba908f3c-titleBarHeight": vue.unref(titleBarHeight),
        "ba908f3c-titleColor": __props.titleColor,
        "ba908f3c-titleTextAlign": titleTextAlign.value,
        "ba908f3c-headHeight": vue.unref(headHeight)
      }));
      const { statusBarHeight, titleBarHeight, headHeight } = useNavBarStyle();
      formatAppLog("log", "at components/mod-nav-bar/mod-nav-bar.vue:6", "状态栏高度", statusBarHeight);
      formatAppLog("log", "at components/mod-nav-bar/mod-nav-bar.vue:7", "标题栏高度", titleBarHeight);
      formatAppLog("log", "at components/mod-nav-bar/mod-nav-bar.vue:8", "头部高度", headHeight);
      const props = __props;
      const showBack = getCurrentPages().length > 1;
      const navBack = () => {
        uni.navigateBack({
          fail: () => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }
        });
      };
      const titleTextAlign = vue.computed(() => {
        if (!showBack)
          return "left";
        return "center";
      });
      const __returned__ = { statusBarHeight, titleBarHeight, headHeight, props, showBack, navBack, titleTextAlign, get COLOR_THEME_PRIMARY() {
        return COLOR_THEME_PRIMARY;
      }, get useNavBarStyle() {
        return useNavBarStyle;
      }, computed: vue.computed };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "mod-nav-bar" }, [
      vue.createElementVNode("view", { class: "fixed-wrap" }, [
        vue.createElementVNode("view", { class: "status-bar" }),
        vue.createElementVNode("view", { class: "title-bar" }, [
          $setup.showBack ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "arrow-wrap",
            onClick: vue.withModifiers($setup.navBack, ["stop"])
          }, [
            vue.createVNode(_component_uni_icons, {
              class: "icon",
              type: "left",
              size: "28",
              color: $props.titleColor
            }, null, 8, ["color"])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "view",
            { class: "text-wrap" },
            vue.toDisplayString($props.title),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "menu-wrap" })
        ])
      ]),
      vue.createElementVNode("view", { class: "block-wrap" })
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-ba908f3c"], ["__file", "D:/extest/IbukiSuikaShop-CLI/components/mod-nav-bar/mod-nav-bar.vue"]]);
  const _imports_0$2 = "/static/images/notic_prefix.png";
  const _sfc_main$6 = {};
  function _sfc_render$5(_ctx, _cache) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "scroll-notice" }, [
      vue.createElementVNode("view", { class: "left-wrap" }, [
        vue.createElementVNode("image", {
          class: "icon",
          src: _imports_0$2,
          mode: "aspectFill"
        })
      ]),
      vue.createElementVNode("view", { class: "notice-wrap" }, [
        vue.createElementVNode("swiper", {
          class: "swiper",
          vertical: "",
          interval: "3000",
          autoplay: "",
          circular: ""
        }, [
          vue.createElementVNode("swiper-item", { class: "swiper-item" }, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta veritatis expedita, fugit consectetur culpa quas inventore at enim dolorem totam facere, vero neque quis nobis. Hic nostrum fuga animi consectetur! 测试文本内容1"),
          vue.createElementVNode("swiper-item", { class: "swiper-item" }, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta veritatis expedita, fugit consectetur culpa quas inventore at enim dolorem totam facere, vero neque quis nobis. Hic nostrum fuga animi consectetur! 测试文本内容2"),
          vue.createElementVNode("swiper-item", { class: "swiper-item" }, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta veritatis expedita, fugit consectetur culpa quas inventore at enim dolorem totam facere, vero neque quis nobis. Hic nostrum fuga animi consectetur! 测试文本内容3")
        ])
      ]),
      vue.createElementVNode("view", { class: "right-wrap" }, [
        vue.createVNode(_component_uni_icons, {
          type: "right",
          color: "#888",
          size: "34rpx"
        })
      ])
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-abee4ea6"], ["__file", "D:/extest/IbukiSuikaShop-CLI/components/scroll-notice/scroll-notice.vue"]]);
  var setupDefaults$a = {
    keyId: 1,
    cookies: {
      path: "/"
    },
    treeOptions: {
      parentKey: "parentId",
      key: "id",
      children: "children"
    },
    parseDateFormat: "yyyy-MM-dd HH:mm:ss",
    firstDayOfWeek: 1
  };
  var setupDefaults_1 = setupDefaults$a;
  function arrayEach$f(list, iterate, context) {
    if (list) {
      if (list.forEach) {
        list.forEach(iterate, context);
      } else {
        for (var index = 0, len2 = list.length; index < len2; index++) {
          iterate.call(context, list[index], index, list);
        }
      }
    }
  }
  var arrayEach_1 = arrayEach$f;
  var objectToString$2 = Object.prototype.toString;
  var staticObjectToString = objectToString$2;
  var objectToString$1 = staticObjectToString;
  function helperCreateInInObjectString$5(type) {
    return function(obj) {
      return "[object " + type + "]" === objectToString$1.call(obj);
    };
  }
  var helperCreateInInObjectString_1 = helperCreateInInObjectString$5;
  var helperCreateInInObjectString$4 = helperCreateInInObjectString_1;
  var isArray$s = Array.isArray || helperCreateInInObjectString$4("Array");
  var isArray_1 = isArray$s;
  function hasOwnProp$a(obj, key) {
    return obj && obj.hasOwnProperty ? obj.hasOwnProperty(key) : false;
  }
  var hasOwnProp_1 = hasOwnProp$a;
  var hasOwnProp$9 = hasOwnProp_1;
  function objectEach$5(obj, iterate, context) {
    if (obj) {
      for (var key in obj) {
        if (hasOwnProp$9(obj, key)) {
          iterate.call(context, obj[key], key, obj);
        }
      }
    }
  }
  var objectEach_1 = objectEach$5;
  var isArray$r = isArray_1;
  var arrayEach$e = arrayEach_1;
  var objectEach$4 = objectEach_1;
  function each$i(obj, iterate, context) {
    if (obj) {
      return (isArray$r(obj) ? arrayEach$e : objectEach$4)(obj, iterate, context);
    }
    return obj;
  }
  var each_1 = each$i;
  function helperCreateInTypeof$6(type) {
    return function(obj) {
      return typeof obj === type;
    };
  }
  var helperCreateInTypeof_1 = helperCreateInTypeof$6;
  var helperCreateInTypeof$5 = helperCreateInTypeof_1;
  var isFunction$e = helperCreateInTypeof$5("function");
  var isFunction_1 = isFunction$e;
  var each$h = each_1;
  function helperCreateGetObjects$3(name, getIndex) {
    var proMethod = Object[name];
    return function(obj) {
      var result = [];
      if (obj) {
        if (proMethod) {
          return proMethod(obj);
        }
        each$h(obj, getIndex > 1 ? function(key) {
          result.push(["" + key, obj[key]]);
        } : function() {
          result.push(arguments[getIndex]);
        });
      }
      return result;
    };
  }
  var helperCreateGetObjects_1 = helperCreateGetObjects$3;
  var helperCreateGetObjects$2 = helperCreateGetObjects_1;
  var keys$a = helperCreateGetObjects$2("keys", 1);
  var keys_1 = keys$a;
  var objectToString = staticObjectToString;
  var objectEach$3 = objectEach_1;
  var arrayEach$d = arrayEach_1;
  function getCativeCtor(val, args) {
    var Ctor = val.__proto__.constructor;
    return args ? new Ctor(args) : new Ctor();
  }
  function handleValueClone(item, isDeep) {
    return isDeep ? copyValue(item, isDeep) : item;
  }
  function copyValue(val, isDeep) {
    if (val) {
      switch (objectToString.call(val)) {
        case "[object Object]": {
          var restObj = Object.create(Object.getPrototypeOf(val));
          objectEach$3(val, function(item, key) {
            restObj[key] = handleValueClone(item, isDeep);
          });
          return restObj;
        }
        case "[object Date]":
        case "[object RegExp]": {
          return getCativeCtor(val, val.valueOf());
        }
        case "[object Array]":
        case "[object Arguments]": {
          var restArr = [];
          arrayEach$d(val, function(item) {
            restArr.push(handleValueClone(item, isDeep));
          });
          return restArr;
        }
        case "[object Set]": {
          var restSet = getCativeCtor(val);
          restSet.forEach(function(item) {
            restSet.add(handleValueClone(item, isDeep));
          });
          return restSet;
        }
        case "[object Map]": {
          var restMap = getCativeCtor(val);
          restMap.forEach(function(item, key) {
            restMap.set(key, handleValueClone(item, isDeep));
          });
          return restMap;
        }
      }
    }
    return val;
  }
  function clone$3(obj, deep) {
    if (obj) {
      return copyValue(obj, deep);
    }
    return obj;
  }
  var clone_1 = clone$3;
  var arrayEach$c = arrayEach_1;
  var keys$9 = keys_1;
  var isArray$q = isArray_1;
  var clone$2 = clone_1;
  var objectAssignFns = Object.assign;
  function handleAssign(destination, args, isClone) {
    var len2 = args.length;
    for (var source, index = 1; index < len2; index++) {
      source = args[index];
      arrayEach$c(keys$9(args[index]), isClone ? function(key) {
        destination[key] = clone$2(source[key], isClone);
      } : function(key) {
        destination[key] = source[key];
      });
    }
    return destination;
  }
  var assign$d = function(target) {
    if (target) {
      var args = arguments;
      if (target === true) {
        if (args.length > 1) {
          target = isArray$q(target[1]) ? [] : {};
          return handleAssign(target, args, true);
        }
      } else {
        return objectAssignFns ? objectAssignFns.apply(Object, args) : handleAssign(target, args);
      }
    }
    return target;
  };
  var assign_1 = assign$d;
  var setupDefaults$9 = setupDefaults_1;
  var arrayEach$b = arrayEach_1;
  var each$g = each_1;
  var isFunction$d = isFunction_1;
  var assign$c = assign_1;
  var XEUtils$1 = function() {
  };
  function mixin() {
    arrayEach$b(arguments, function(methods) {
      each$g(methods, function(fn, name) {
        XEUtils$1[name] = isFunction$d(fn) ? function() {
          var result = fn.apply(XEUtils$1.$context, arguments);
          XEUtils$1.$context = null;
          return result;
        } : fn;
      });
    });
  }
  function setConfig(options) {
    return assign$c(setupDefaults$9, options);
  }
  function getConfig() {
    return setupDefaults$9;
  }
  var version = "3.7.8";
  XEUtils$1.VERSION = version;
  XEUtils$1.version = version;
  XEUtils$1.mixin = mixin;
  XEUtils$1.setup = setConfig;
  XEUtils$1.setConfig = setConfig;
  XEUtils$1.getConfig = getConfig;
  var ctor = XEUtils$1;
  function lastArrayEach$3(obj, iterate, context) {
    for (var len2 = obj.length - 1; len2 >= 0; len2--) {
      iterate.call(context, obj[len2], len2, obj);
    }
  }
  var lastArrayEach_1 = lastArrayEach$3;
  var lastArrayEach$2 = lastArrayEach_1;
  var keys$8 = keys_1;
  function lastObjectEach$2(obj, iterate, context) {
    lastArrayEach$2(keys$8(obj), function(key) {
      iterate.call(context, obj[key], key, obj);
    });
  }
  var lastObjectEach_1 = lastObjectEach$2;
  function isNull$9(obj) {
    return obj === null;
  }
  var isNull_1 = isNull$9;
  var isNull$8 = isNull_1;
  function property$6(name, defs) {
    return function(obj) {
      return isNull$8(obj) ? defs : obj[name];
    };
  }
  var property_1 = property$6;
  var each$f = each_1;
  var isFunction$c = isFunction_1;
  var property$5 = property_1;
  function objectMap$1(obj, iterate, context) {
    var result = {};
    if (obj) {
      if (iterate) {
        if (!isFunction$c(iterate)) {
          iterate = property$5(iterate);
        }
        each$f(obj, function(val, index) {
          result[index] = iterate.call(context, val, index, obj);
        });
      } else {
        return obj;
      }
    }
    return result;
  }
  var objectMap_1 = objectMap$1;
  function isPlainObject$6(obj) {
    return obj ? obj.constructor === Object : false;
  }
  var isPlainObject_1 = isPlainObject$6;
  function helperCheckCopyKey$2(key) {
    return key !== "__proto__" && key !== "constructor";
  }
  var helperCheckCopyKey_1 = helperCheckCopyKey$2;
  var isArray$p = isArray_1;
  var isPlainObject$5 = isPlainObject_1;
  var isFunction$b = isFunction_1;
  var each$e = each_1;
  var helperCheckCopyKey$1 = helperCheckCopyKey_1;
  function handleMerge(target, source) {
    if (isPlainObject$5(target) && isPlainObject$5(source) || isArray$p(target) && isArray$p(source)) {
      each$e(source, function(val, key) {
        if (helperCheckCopyKey$1(key)) {
          target[key] = isFunction$b(source) ? val : handleMerge(target[key], val);
        }
      });
      return target;
    }
    return source;
  }
  var merge$1 = function(target) {
    if (!target) {
      target = {};
    }
    var args = arguments;
    var len2 = args.length;
    for (var source, index = 1; index < len2; index++) {
      source = args[index];
      if (source) {
        handleMerge(target, source);
      }
    }
    return target;
  };
  var merge_1 = merge$1;
  var each$d = each_1;
  function map$7(obj, iterate, context) {
    var result = [];
    if (obj && arguments.length > 1) {
      if (obj.map) {
        return obj.map(iterate, context);
      } else {
        each$d(obj, function() {
          result.push(iterate.apply(context, arguments));
        });
      }
    }
    return result;
  }
  var map_1 = map$7;
  var hasOwnProp$8 = hasOwnProp_1;
  var isArray$o = isArray_1;
  function helperCreateIterateHandle$4(prop, useArray, restIndex, matchValue, defaultValue) {
    return function(obj, iterate, context) {
      if (obj && iterate) {
        if (prop && obj[prop]) {
          return obj[prop](iterate, context);
        } else {
          if (useArray && isArray$o(obj)) {
            for (var index = 0, len2 = obj.length; index < len2; index++) {
              if (!!iterate.call(context, obj[index], index, obj) === matchValue) {
                return [true, false, index, obj[index]][restIndex];
              }
            }
          } else {
            for (var key in obj) {
              if (hasOwnProp$8(obj, key)) {
                if (!!iterate.call(context, obj[key], key, obj) === matchValue) {
                  return [true, false, key, obj[key]][restIndex];
                }
              }
            }
          }
        }
      }
      return defaultValue;
    };
  }
  var helperCreateIterateHandle_1 = helperCreateIterateHandle$4;
  var helperCreateIterateHandle$3 = helperCreateIterateHandle_1;
  var some$2 = helperCreateIterateHandle$3("some", 1, 0, true, false);
  var some_1 = some$2;
  var helperCreateIterateHandle$2 = helperCreateIterateHandle_1;
  var every$2 = helperCreateIterateHandle$2("every", 1, 1, false, true);
  var every_1 = every$2;
  var hasOwnProp$7 = hasOwnProp_1;
  function includes$6(obj, val) {
    if (obj) {
      if (obj.includes) {
        return obj.includes(val);
      }
      for (var key in obj) {
        if (hasOwnProp$7(obj, key)) {
          if (val === obj[key]) {
            return true;
          }
        }
      }
    }
    return false;
  }
  var includes_1 = includes$6;
  var isArray$n = isArray_1;
  var includes$5 = includes_1;
  function includeArrays$2(array1, array2) {
    var len2;
    var index = 0;
    if (isArray$n(array1) && isArray$n(array2)) {
      for (len2 = array2.length; index < len2; index++) {
        if (!includes$5(array1, array2[index])) {
          return false;
        }
      }
      return true;
    }
    return includes$5(array1, array2);
  }
  var includeArrays_1 = includeArrays$2;
  var each$c = each_1;
  var includes$4 = includes_1;
  var isFunction$a = isFunction_1;
  var property$4 = property_1;
  function uniq$2(array, iterate, context) {
    var result = [];
    if (iterate) {
      if (!isFunction$a(iterate)) {
        iterate = property$4(iterate);
      }
      var val, valMap = {};
      each$c(array, function(item, key) {
        val = iterate.call(context, item, key, array);
        if (!valMap[val]) {
          valMap[val] = 1;
          result.push(item);
        }
      });
    } else {
      each$c(array, function(value) {
        if (!includes$4(result, value)) {
          result.push(value);
        }
      });
    }
    return result;
  }
  var uniq_1 = uniq$2;
  var map$6 = map_1;
  function toArray$3(list) {
    return map$6(list, function(item) {
      return item;
    });
  }
  var toArray_1 = toArray$3;
  var uniq$1 = uniq_1;
  var toArray$2 = toArray_1;
  function union$1() {
    var args = arguments;
    var result = [];
    var index = 0;
    var len2 = args.length;
    for (; index < len2; index++) {
      result = result.concat(toArray$2(args[index]));
    }
    return uniq$1(result);
  }
  var union_1 = union$1;
  var staticStrUndefined$b = "undefined";
  var staticStrUndefined_1 = staticStrUndefined$b;
  var staticStrUndefined$a = staticStrUndefined_1;
  var helperCreateInTypeof$4 = helperCreateInTypeof_1;
  var isUndefined$a = helperCreateInTypeof$4(staticStrUndefined$a);
  var isUndefined_1 = isUndefined$a;
  var isNull$7 = isNull_1;
  var isUndefined$9 = isUndefined_1;
  function eqNull$9(obj) {
    return isNull$7(obj) || isUndefined$9(obj);
  }
  var eqNull_1 = eqNull$9;
  var staticHGKeyRE$2 = /(.+)?\[(\d+)\]$/;
  var staticHGKeyRE_1 = staticHGKeyRE$2;
  function helperGetHGSKeys$3(property2) {
    return property2 ? property2.splice && property2.join ? property2 : ("" + property2).replace(/(\[\d+\])\.?/g, "$1.").replace(/\.$/, "").split(".") : [];
  }
  var helperGetHGSKeys_1 = helperGetHGSKeys$3;
  var staticHGKeyRE$1 = staticHGKeyRE_1;
  var helperGetHGSKeys$2 = helperGetHGSKeys_1;
  var hasOwnProp$6 = hasOwnProp_1;
  var isUndefined$8 = isUndefined_1;
  var eqNull$8 = eqNull_1;
  function get$5(obj, property2, defaultValue) {
    if (eqNull$8(obj)) {
      return defaultValue;
    }
    var result = getValueByPath(obj, property2);
    return isUndefined$8(result) ? defaultValue : result;
  }
  function getDeepProps(obj, key) {
    var matchs = key ? key.match(staticHGKeyRE$1) : "";
    return matchs ? matchs[1] ? obj[matchs[1]] ? obj[matchs[1]][matchs[2]] : void 0 : obj[matchs[2]] : obj[key];
  }
  function getValueByPath(obj, property2) {
    if (obj) {
      var rest, props, len2;
      var index = 0;
      if (obj[property2] || hasOwnProp$6(obj, property2)) {
        return obj[property2];
      } else {
        props = helperGetHGSKeys$2(property2);
        len2 = props.length;
        if (len2) {
          for (rest = obj; index < len2; index++) {
            rest = getDeepProps(rest, props[index]);
            if (eqNull$8(rest)) {
              if (index === len2 - 1) {
                return rest;
              }
              return;
            }
          }
        }
        return rest;
      }
    }
  }
  var get_1 = get$5;
  var arrayEach$a = arrayEach_1;
  var toArray$1 = toArray_1;
  var map$5 = map_1;
  var isArray$m = isArray_1;
  var isFunction$9 = isFunction_1;
  var isPlainObject$4 = isPlainObject_1;
  var isUndefined$7 = isUndefined_1;
  var isNull$6 = isNull_1;
  var eqNull$7 = eqNull_1;
  var get$4 = get_1;
  var property$3 = property_1;
  var ORDER_PROP_ASC = "asc";
  var ORDER_PROP_DESC = "desc";
  function handleSort(v1, v2) {
    if (isUndefined$7(v1)) {
      return 1;
    }
    if (isNull$6(v1)) {
      return isUndefined$7(v2) ? -1 : 1;
    }
    return v1 && v1.localeCompare ? v1.localeCompare(v2) : v1 > v2 ? 1 : -1;
  }
  function buildMultiOrders(name, confs, compares) {
    return function(item1, item2) {
      var v1 = item1[name];
      var v2 = item2[name];
      if (v1 === v2) {
        return compares ? compares(item1, item2) : 0;
      }
      return confs.order === ORDER_PROP_DESC ? handleSort(v2, v1) : handleSort(v1, v2);
    };
  }
  function getSortConfs(arr, list, fieldConfs, context) {
    var sortConfs = [];
    fieldConfs = isArray$m(fieldConfs) ? fieldConfs : [fieldConfs];
    arrayEach$a(fieldConfs, function(handle, index) {
      if (handle) {
        var field = handle;
        var order;
        if (isArray$m(handle)) {
          field = handle[0];
          order = handle[1];
        } else if (isPlainObject$4(handle)) {
          field = handle.field;
          order = handle.order;
        }
        sortConfs.push({
          field,
          order: order || ORDER_PROP_ASC
        });
        arrayEach$a(list, isFunction$9(field) ? function(item, key) {
          item[index] = field.call(context, item.data, key, arr);
        } : function(item) {
          item[index] = field ? get$4(item.data, field) : item.data;
        });
      }
    });
    return sortConfs;
  }
  function orderBy$3(arr, fieldConfs, context) {
    if (arr) {
      if (eqNull$7(fieldConfs)) {
        return toArray$1(arr).sort(handleSort);
      }
      var compares;
      var list = map$5(arr, function(item) {
        return { data: item };
      });
      var sortConfs = getSortConfs(arr, list, fieldConfs, context);
      var len2 = sortConfs.length - 1;
      while (len2 >= 0) {
        compares = buildMultiOrders(len2, sortConfs[len2], compares);
        len2--;
      }
      if (compares) {
        list = list.sort(compares);
      }
      return map$5(list, property$3("data"));
    }
    return [];
  }
  var orderBy_1 = orderBy$3;
  var orderBy$2 = orderBy_1;
  var sortBy$1 = orderBy$2;
  var sortBy_1 = sortBy$1;
  function random$2(minVal, maxVal) {
    return minVal >= maxVal ? minVal : (minVal = minVal >> 0) + Math.round(Math.random() * ((maxVal || 9) - minVal));
  }
  var random_1 = random$2;
  var helperCreateGetObjects$1 = helperCreateGetObjects_1;
  var values$6 = helperCreateGetObjects$1("values", 0);
  var values_1 = values$6;
  var random$1 = random_1;
  var values$5 = values_1;
  function shuffle$2(array) {
    var index;
    var result = [];
    var list = values$5(array);
    var len2 = list.length - 1;
    for (; len2 >= 0; len2--) {
      index = len2 > 0 ? random$1(0, len2) : 0;
      result.push(list[index]);
      list.splice(index, 1);
    }
    return result;
  }
  var shuffle_1 = shuffle$2;
  var shuffle$1 = shuffle_1;
  function sample$1(array, number) {
    var result = shuffle$1(array);
    if (arguments.length <= 1) {
      return result[0];
    }
    if (number < result.length) {
      result.length = number || 0;
    }
    return result;
  }
  var sample_1 = sample$1;
  function helperCreateToNumber$2(handle) {
    return function(str) {
      if (str) {
        var num = handle(str && str.replace ? str.replace(/,/g, "") : str);
        if (!isNaN(num)) {
          return num;
        }
      }
      return 0;
    };
  }
  var helperCreateToNumber_1 = helperCreateToNumber$2;
  var helperCreateToNumber$1 = helperCreateToNumber_1;
  var toNumber$7 = helperCreateToNumber$1(parseFloat);
  var toNumber_1 = toNumber$7;
  var toNumber$6 = toNumber_1;
  function slice$7(array, startIndex, endIndex) {
    var result = [];
    var argsSize = arguments.length;
    if (array) {
      startIndex = argsSize >= 2 ? toNumber$6(startIndex) : 0;
      endIndex = argsSize >= 3 ? toNumber$6(endIndex) : array.length;
      if (array.slice) {
        return array.slice(startIndex, endIndex);
      }
      for (; startIndex < endIndex; startIndex++) {
        result.push(array[startIndex]);
      }
    }
    return result;
  }
  var slice_1 = slice$7;
  var each$b = each_1;
  function filter$1(obj, iterate, context) {
    var result = [];
    if (obj && iterate) {
      if (obj.filter) {
        return obj.filter(iterate, context);
      }
      each$b(obj, function(val, key) {
        if (iterate.call(context, val, key, obj)) {
          result.push(val);
        }
      });
    }
    return result;
  }
  var filter_1 = filter$1;
  var helperCreateIterateHandle$1 = helperCreateIterateHandle_1;
  var findKey$1 = helperCreateIterateHandle$1("", 0, 2, true);
  var findKey_1 = findKey$1;
  var helperCreateIterateHandle = helperCreateIterateHandle_1;
  var find$1 = helperCreateIterateHandle("find", 1, 3, true);
  var find_1 = find$1;
  var isArray$l = isArray_1;
  var values$4 = values_1;
  function findLast$1(obj, iterate, context) {
    if (obj) {
      if (!isArray$l(obj)) {
        obj = values$4(obj);
      }
      for (var len2 = obj.length - 1; len2 >= 0; len2--) {
        if (iterate.call(context, obj[len2], len2, obj)) {
          return obj[len2];
        }
      }
    }
  }
  var findLast_1 = findLast$1;
  var keys$7 = keys_1;
  function reduce$1(array, callback, initialValue) {
    if (array) {
      var len2, reduceMethod;
      var index = 0;
      var context = null;
      var previous = initialValue;
      var isInitialVal = arguments.length > 2;
      var keyList = keys$7(array);
      if (array.length && array.reduce) {
        reduceMethod = function() {
          return callback.apply(context, arguments);
        };
        if (isInitialVal) {
          return array.reduce(reduceMethod, previous);
        }
        return array.reduce(reduceMethod);
      }
      if (isInitialVal) {
        index = 1;
        previous = array[keyList[0]];
      }
      for (len2 = keyList.length; index < len2; index++) {
        previous = callback.call(context, previous, array[keyList[index]], index, array);
      }
      return previous;
    }
  }
  var reduce_1 = reduce$1;
  var isArray$k = isArray_1;
  function copyWithin$1(array, target, start, end) {
    if (isArray$k(array) && array.copyWithin) {
      return array.copyWithin(target, start, end);
    }
    var replaceIndex, replaceArray;
    var targetIndex = target >> 0;
    var startIndex = start >> 0;
    var len2 = array.length;
    var endIndex = arguments.length > 3 ? end >> 0 : len2;
    if (targetIndex < len2) {
      targetIndex = targetIndex >= 0 ? targetIndex : len2 + targetIndex;
      if (targetIndex >= 0) {
        startIndex = startIndex >= 0 ? startIndex : len2 + startIndex;
        endIndex = endIndex >= 0 ? endIndex : len2 + endIndex;
        if (startIndex < endIndex) {
          for (replaceIndex = 0, replaceArray = array.slice(startIndex, endIndex); targetIndex < len2; targetIndex++) {
            if (replaceArray.length <= replaceIndex) {
              break;
            }
            array[targetIndex] = replaceArray[replaceIndex++];
          }
        }
      }
    }
    return array;
  }
  var copyWithin_1 = copyWithin$1;
  var isArray$j = isArray_1;
  function chunk$1(array, size) {
    var index;
    var result = [];
    var arrLen = size >> 0 || 1;
    if (isArray$j(array)) {
      if (arrLen >= 0 && array.length > arrLen) {
        index = 0;
        while (index < array.length) {
          result.push(array.slice(index, index + arrLen));
          index += arrLen;
        }
      } else {
        result = array.length ? [array] : array;
      }
    }
    return result;
  }
  var chunk_1 = chunk$1;
  var map$4 = map_1;
  var property$2 = property_1;
  function pluck$2(obj, key) {
    return map$4(obj, property$2(key));
  }
  var pluck_1 = pluck$2;
  var isFunction$8 = isFunction_1;
  var eqNull$6 = eqNull_1;
  var get$3 = get_1;
  var arrayEach$9 = arrayEach_1;
  function helperCreateMinMax$2(handle) {
    return function(arr, iterate) {
      if (arr && arr.length) {
        var rest, itemIndex;
        arrayEach$9(arr, function(itemVal, index) {
          if (iterate) {
            itemVal = isFunction$8(iterate) ? iterate(itemVal, index, arr) : get$3(itemVal, iterate);
          }
          if (!eqNull$6(itemVal) && (eqNull$6(rest) || handle(rest, itemVal))) {
            itemIndex = index;
            rest = itemVal;
          }
        });
        return arr[itemIndex];
      }
      return rest;
    };
  }
  var helperCreateMinMax_1 = helperCreateMinMax$2;
  var helperCreateMinMax$1 = helperCreateMinMax_1;
  var max$2 = helperCreateMinMax$1(function(rest, itemVal) {
    return rest < itemVal;
  });
  var max_1 = max$2;
  var pluck$1 = pluck_1;
  var max$1 = max_1;
  function unzip$2(arrays) {
    var index, maxItem, len2;
    var result = [];
    if (arrays && arrays.length) {
      index = 0;
      maxItem = max$1(arrays, function(item) {
        return item ? item.length : 0;
      });
      for (len2 = maxItem ? maxItem.length : 0; index < len2; index++) {
        result.push(pluck$1(arrays, index));
      }
    }
    return result;
  }
  var unzip_1 = unzip$2;
  var unzip$1 = unzip_1;
  function zip$1() {
    return unzip$1(arguments);
  }
  var zip_1 = zip$1;
  var values$3 = values_1;
  var each$a = each_1;
  function zipObject$1(props, arr) {
    var result = {};
    arr = arr || [];
    each$a(values$3(props), function(val, key) {
      result[val] = arr[key];
    });
    return result;
  }
  var zipObject_1 = zipObject$1;
  var isArray$i = isArray_1;
  var arrayEach$8 = arrayEach_1;
  function flattenDeep(array, deep) {
    var result = [];
    arrayEach$8(array, function(vals) {
      result = result.concat(isArray$i(vals) ? deep ? flattenDeep(vals, deep) : vals : [vals]);
    });
    return result;
  }
  function flatten$1(array, deep) {
    if (isArray$i(array)) {
      return flattenDeep(array, deep);
    }
    return [];
  }
  var flatten_1 = flatten$1;
  var map$3 = map_1;
  var isArray$h = isArray_1;
  function deepGetObj(obj, path) {
    var index = 0;
    var len2 = path.length;
    while (obj && index < len2) {
      obj = obj[path[index++]];
    }
    return len2 && obj ? obj : 0;
  }
  function invoke$1(list, path) {
    var func;
    var args = arguments;
    var params = [];
    var paths = [];
    var index = 2;
    var len2 = args.length;
    for (; index < len2; index++) {
      params.push(args[index]);
    }
    if (isArray$h(path)) {
      len2 = path.length - 1;
      for (index = 0; index < len2; index++) {
        paths.push(path[index]);
      }
      path = path[len2];
    }
    return map$3(list, function(context) {
      if (paths.length) {
        context = deepGetObj(context, paths);
      }
      func = context[path] || path;
      if (func && func.apply) {
        return func.apply(context, params);
      }
    });
  }
  var invoke_1 = invoke$1;
  function helperLog$1(type, msg) {
    return (console[type] || console.log)(msg);
  }
  var helperLog_1 = helperLog$1;
  function helperDeleteProperty$2(obj, property2) {
    try {
      delete obj[property2];
    } catch (e) {
      obj[property2] = void 0;
    }
  }
  var helperDeleteProperty_1 = helperDeleteProperty$2;
  var isArray$g = isArray_1;
  var lastArrayEach$1 = lastArrayEach_1;
  var lastObjectEach$1 = lastObjectEach_1;
  function lastEach$2(obj, iterate, context) {
    if (obj) {
      return (isArray$g(obj) ? lastArrayEach$1 : lastObjectEach$1)(obj, iterate, context);
    }
    return obj;
  }
  var lastEach_1 = lastEach$2;
  var helperCreateInTypeof$3 = helperCreateInTypeof_1;
  var isObject$4 = helperCreateInTypeof$3("object");
  var isObject_1 = isObject$4;
  var helperDeleteProperty$1 = helperDeleteProperty_1;
  var isPlainObject$3 = isPlainObject_1;
  var isObject$3 = isObject_1;
  var isArray$f = isArray_1;
  var isNull$5 = isNull_1;
  var assign$b = assign_1;
  var objectEach$2 = objectEach_1;
  function clear$2(obj, defs, assigns) {
    if (obj) {
      var len2;
      var isDefs = arguments.length > 1 && (isNull$5(defs) || !isObject$3(defs));
      var extds = isDefs ? assigns : defs;
      if (isPlainObject$3(obj)) {
        objectEach$2(obj, isDefs ? function(val, key) {
          obj[key] = defs;
        } : function(val, key) {
          helperDeleteProperty$1(obj, key);
        });
        if (extds) {
          assign$b(obj, extds);
        }
      } else if (isArray$f(obj)) {
        if (isDefs) {
          len2 = obj.length;
          while (len2 > 0) {
            len2--;
            obj[len2] = defs;
          }
        } else {
          obj.length = 0;
        }
        if (extds) {
          obj.push.apply(obj, extds);
        }
      }
    }
    return obj;
  }
  var clear_1 = clear$2;
  var helperDeleteProperty = helperDeleteProperty_1;
  var isFunction$7 = isFunction_1;
  var isArray$e = isArray_1;
  var each$9 = each_1;
  var arrayEach$7 = arrayEach_1;
  var lastEach$1 = lastEach_1;
  var clear$1 = clear_1;
  var eqNull$5 = eqNull_1;
  function pluckProperty(name) {
    return function(obj, key) {
      return key === name;
    };
  }
  function remove$2(obj, iterate, context) {
    if (obj) {
      if (!eqNull$5(iterate)) {
        var removeKeys = [];
        var rest = [];
        if (!isFunction$7(iterate)) {
          iterate = pluckProperty(iterate);
        }
        each$9(obj, function(item, index, rest2) {
          if (iterate.call(context, item, index, rest2)) {
            removeKeys.push(index);
          }
        });
        if (isArray$e(obj)) {
          lastEach$1(removeKeys, function(item, key) {
            rest.push(obj[item]);
            obj.splice(item, 1);
          });
        } else {
          rest = {};
          arrayEach$7(removeKeys, function(key) {
            rest[key] = obj[key];
            helperDeleteProperty(obj, key);
          });
        }
        return rest;
      }
      return clear$1(obj);
    }
    return obj;
  }
  var remove_1 = remove$2;
  var setupDefaults$8 = setupDefaults_1;
  var helperLog = helperLog_1;
  var orderBy$1 = orderBy_1;
  var clone$1 = clone_1;
  var eqNull$4 = eqNull_1;
  var each$8 = each_1;
  var remove$1 = remove_1;
  var assign$a = assign_1;
  function strictTree(array, optChildren) {
    each$8(array, function(item) {
      if (item[optChildren] && !item[optChildren].length) {
        remove$1(item, optChildren);
      }
    });
  }
  function toArrayTree$1(array, options) {
    var opts = assign$a({}, setupDefaults$8.treeOptions, options);
    var optStrict = opts.strict;
    var optKey = opts.key;
    var optParentKey = opts.parentKey;
    var optChildren = opts.children;
    var optMapChildren = opts.mapChildren;
    var optSortKey = opts.sortKey;
    var optReverse = opts.reverse;
    var optData = opts.data;
    var result = [];
    var treeMaps = {};
    var idsMap = {};
    var id, treeData, parentId;
    if (optSortKey) {
      array = orderBy$1(clone$1(array), optSortKey);
      if (optReverse) {
        array = array.reverse();
      }
    }
    each$8(array, function(item) {
      id = item[optKey];
      if (idsMap[id]) {
        helperLog("warn", "Duplicate primary key=" + id);
      }
      idsMap[id] = true;
    });
    each$8(array, function(item) {
      id = item[optKey];
      if (optData) {
        treeData = {};
        treeData[optData] = item;
      } else {
        treeData = item;
      }
      parentId = item[optParentKey];
      treeMaps[id] = treeMaps[id] || [];
      treeData[optKey] = id;
      treeData[optParentKey] = parentId;
      if (id === parentId) {
        parentId = null;
        helperLog("warn", "Error infinite Loop. key=" + id + " parentKey=" + id);
      }
      treeMaps[parentId] = treeMaps[parentId] || [];
      treeMaps[parentId].push(treeData);
      treeData[optChildren] = treeMaps[id];
      if (optMapChildren) {
        treeData[optMapChildren] = treeMaps[id];
      }
      if (!optStrict || optStrict && eqNull$4(parentId)) {
        if (!idsMap[parentId]) {
          result.push(treeData);
        }
      }
    });
    if (optStrict) {
      strictTree(array, optChildren);
    }
    return result;
  }
  var toArrayTree_1 = toArrayTree$1;
  var setupDefaults$7 = setupDefaults_1;
  var arrayEach$6 = arrayEach_1;
  var assign$9 = assign_1;
  function unTreeList(result, parentItem, array, opts) {
    var optKey = opts.key;
    var optParentKey = opts.parentKey;
    var optChildren = opts.children;
    var optData = opts.data;
    var optUpdated = opts.updated;
    var optClear = opts.clear;
    arrayEach$6(array, function(item) {
      var childList = item[optChildren];
      if (optData) {
        item = item[optData];
      }
      if (optUpdated !== false) {
        item[optParentKey] = parentItem ? parentItem[optKey] : null;
      }
      result.push(item);
      if (childList && childList.length) {
        unTreeList(result, item, childList, opts);
      }
      if (optClear) {
        delete item[optChildren];
      }
    });
    return result;
  }
  function toTreeArray$1(array, options) {
    return unTreeList([], null, array, assign$9({}, setupDefaults$7.treeOptions, options));
  }
  var toTreeArray_1 = toTreeArray$1;
  function helperCreateTreeFunc$4(handle) {
    return function(obj, iterate, options, context) {
      var opts = options || {};
      var optChildren = opts.children || "children";
      return handle(null, obj, iterate, context, [], [], optChildren, opts);
    };
  }
  var helperCreateTreeFunc_1 = helperCreateTreeFunc$4;
  var helperCreateTreeFunc$3 = helperCreateTreeFunc_1;
  function findTreeItem(parent, obj, iterate, context, path, node, parseChildren, opts) {
    if (obj) {
      var item, index, len2, paths, nodes, match;
      for (index = 0, len2 = obj.length; index < len2; index++) {
        item = obj[index];
        paths = path.concat(["" + index]);
        nodes = node.concat([item]);
        if (iterate.call(context, item, index, obj, paths, parent, nodes)) {
          return { index, item, path: paths, items: obj, parent, nodes };
        }
        if (parseChildren && item) {
          match = findTreeItem(item, item[parseChildren], iterate, context, paths.concat([parseChildren]), nodes, parseChildren);
          if (match) {
            return match;
          }
        }
      }
    }
  }
  var findTree$1 = helperCreateTreeFunc$3(findTreeItem);
  var findTree_1 = findTree$1;
  var helperCreateTreeFunc$2 = helperCreateTreeFunc_1;
  var each$7 = each_1;
  function eachTreeItem(parent, obj, iterate, context, path, node, parseChildren, opts) {
    var paths, nodes;
    each$7(obj, function(item, index) {
      paths = path.concat(["" + index]);
      nodes = node.concat([item]);
      iterate.call(context, item, index, obj, paths, parent, nodes);
      if (item && parseChildren) {
        paths.push(parseChildren);
        eachTreeItem(item, item[parseChildren], iterate, context, paths, nodes, parseChildren);
      }
    });
  }
  var eachTree$2 = helperCreateTreeFunc$2(eachTreeItem);
  var eachTree_1 = eachTree$2;
  var helperCreateTreeFunc$1 = helperCreateTreeFunc_1;
  var map$2 = map_1;
  function mapTreeItem(parent, obj, iterate, context, path, node, parseChildren, opts) {
    var paths, nodes, rest;
    var mapChildren = opts.mapChildren || parseChildren;
    return map$2(obj, function(item, index) {
      paths = path.concat(["" + index]);
      nodes = node.concat([item]);
      rest = iterate.call(context, item, index, obj, paths, parent, nodes);
      if (rest && item && parseChildren && item[parseChildren]) {
        rest[mapChildren] = mapTreeItem(item, item[parseChildren], iterate, context, paths, nodes, parseChildren, opts);
      }
      return rest;
    });
  }
  var mapTree$1 = helperCreateTreeFunc$1(mapTreeItem);
  var mapTree_1 = mapTree$1;
  var eachTree$1 = eachTree_1;
  function filterTree$1(obj, iterate, options, context) {
    var result = [];
    if (obj && iterate) {
      eachTree$1(obj, function(item, index, items, path, parent, nodes) {
        if (iterate.call(context, item, index, items, path, parent, nodes)) {
          result.push(item);
        }
      }, options);
    }
    return result;
  }
  var filterTree_1 = filterTree$1;
  var helperCreateTreeFunc = helperCreateTreeFunc_1;
  var arrayEach$5 = arrayEach_1;
  var assign$8 = assign_1;
  function searchTreeItem(matchParent, parent, obj, iterate, context, path, node, parseChildren, opts) {
    var paths, nodes, rest, isMatch2, hasChild;
    var rests = [];
    var hasOriginal = opts.original;
    var sourceData = opts.data;
    var mapChildren = opts.mapChildren || parseChildren;
    var isEvery = opts.isEvery;
    arrayEach$5(obj, function(item, index) {
      paths = path.concat(["" + index]);
      nodes = node.concat([item]);
      isMatch2 = matchParent && !isEvery || iterate.call(context, item, index, obj, paths, parent, nodes);
      hasChild = parseChildren && item[parseChildren];
      if (isMatch2 || hasChild) {
        if (hasOriginal) {
          rest = item;
        } else {
          rest = assign$8({}, item);
          if (sourceData) {
            rest[sourceData] = item;
          }
        }
        rest[mapChildren] = searchTreeItem(isMatch2, item, item[parseChildren], iterate, context, paths, nodes, parseChildren, opts);
        if (isMatch2 || rest[mapChildren].length) {
          rests.push(rest);
        }
      } else if (isMatch2) {
        rests.push(rest);
      }
    });
    return rests;
  }
  var searchTree$1 = helperCreateTreeFunc(function(parent, obj, iterate, context, path, nodes, parseChildren, opts) {
    return searchTreeItem(0, parent, obj, iterate, context, path, nodes, parseChildren, opts);
  });
  var searchTree_1 = searchTree$1;
  function arrayIndexOf$2(list, val) {
    if (list.indexOf) {
      return list.indexOf(val);
    }
    for (var index = 0, len2 = list.length; index < len2; index++) {
      if (val === list[index]) {
        return index;
      }
    }
  }
  var arrayIndexOf_1 = arrayIndexOf$2;
  function arrayLastIndexOf$2(list, val) {
    if (list.lastIndexOf) {
      return list.lastIndexOf(val);
    }
    for (var len2 = list.length - 1; len2 >= 0; len2--) {
      if (val === list[len2]) {
        return len2;
      }
    }
    return -1;
  }
  var arrayLastIndexOf_1 = arrayLastIndexOf$2;
  var helperCreateInTypeof$2 = helperCreateInTypeof_1;
  var isNumber$a = helperCreateInTypeof$2("number");
  var isNumber_1 = isNumber$a;
  var isNumber$9 = isNumber_1;
  function isNumberNaN$1(obj) {
    return isNumber$9(obj) && isNaN(obj);
  }
  var _isNaN = isNumberNaN$1;
  var helperCreateInTypeof$1 = helperCreateInTypeof_1;
  var isString$9 = helperCreateInTypeof$1("string");
  var isString_1 = isString$9;
  var helperCreateInInObjectString$3 = helperCreateInInObjectString_1;
  var isDate$8 = helperCreateInInObjectString$3("Date");
  var isDate_1 = isDate$8;
  var staticParseInt$5 = parseInt;
  var staticParseInt_1 = staticParseInt$5;
  function helperGetUTCDateTime$1(resMaps) {
    return Date.UTC(resMaps.y, resMaps.M || 0, resMaps.d || 1, resMaps.H || 0, resMaps.m || 0, resMaps.s || 0, resMaps.S || 0);
  }
  var helperGetUTCDateTime_1 = helperGetUTCDateTime$1;
  function helperGetDateTime$c(date) {
    return date.getTime();
  }
  var helperGetDateTime_1 = helperGetDateTime$c;
  var staticParseInt$4 = staticParseInt_1;
  var helperGetUTCDateTime = helperGetUTCDateTime_1;
  var helperGetDateTime$b = helperGetDateTime_1;
  var isString$8 = isString_1;
  var isDate$7 = isDate_1;
  function getParseRule(txt) {
    return "(\\d{" + txt + "})";
  }
  function toParseMs(num) {
    if (num < 10) {
      return num * 100;
    } else if (num < 100) {
      return num * 10;
    }
    return num;
  }
  function toParseNum(num) {
    return isNaN(num) ? num : staticParseInt$4(num);
  }
  var d2 = getParseRule(2);
  var d1or2 = getParseRule("1,2");
  var d1or7 = getParseRule("1,7");
  var d3or4 = getParseRule("3,4");
  var place = ".{1}";
  var d1Or2RE = place + d1or2;
  var dzZ = "(([zZ])|([-+]\\d{2}:?\\d{2}))";
  var defaulParseStrs = [d3or4, d1Or2RE, d1Or2RE, d1Or2RE, d1Or2RE, d1Or2RE, place + d1or7, dzZ];
  var defaulParseREs = [];
  for (var len = defaulParseStrs.length - 1; len >= 0; len--) {
    var rule = "";
    for (var i = 0; i < len + 1; i++) {
      rule += defaulParseStrs[i];
    }
    defaulParseREs.push(new RegExp("^" + rule + "$"));
  }
  function parseDefaultRules(str) {
    var matchRest, resMaps = {};
    for (var i2 = 0, dfrLen = defaulParseREs.length; i2 < dfrLen; i2++) {
      matchRest = str.match(defaulParseREs[i2]);
      if (matchRest) {
        resMaps.y = matchRest[1];
        resMaps.M = matchRest[2];
        resMaps.d = matchRest[3];
        resMaps.H = matchRest[4];
        resMaps.m = matchRest[5];
        resMaps.s = matchRest[6];
        resMaps.S = matchRest[7];
        resMaps.Z = matchRest[8];
        break;
      }
    }
    return resMaps;
  }
  var customParseStrs = [
    ["yyyy", d3or4],
    ["yy", d2],
    ["MM", d2],
    ["M", d1or2],
    ["dd", d2],
    ["d", d1or2],
    ["HH", d2],
    ["H", d1or2],
    ["mm", d2],
    ["m", d1or2],
    ["ss", d2],
    ["s", d1or2],
    ["SSS", getParseRule(3)],
    ["S", d1or7],
    ["Z", dzZ]
  ];
  var parseRuleMaps = {};
  var parseRuleKeys = ["\\[([^\\]]+)\\]"];
  for (var i = 0; i < customParseStrs.length; i++) {
    var itemRule = customParseStrs[i];
    parseRuleMaps[itemRule[0]] = itemRule[1] + "?";
    parseRuleKeys.push(itemRule[0]);
  }
  var customParseRes = new RegExp(parseRuleKeys.join("|"), "g");
  var cacheFormatMaps = {};
  function parseCustomRules(str, format) {
    var cacheItem = cacheFormatMaps[format];
    if (!cacheItem) {
      var posIndexs = [];
      var re = format.replace(/([$(){}*+.?\\^|])/g, "\\$1").replace(customParseRes, function(text, val) {
        var firstChar = text.charAt(0);
        if (firstChar === "[") {
          return val;
        }
        posIndexs.push(firstChar);
        return parseRuleMaps[text];
      });
      cacheItem = cacheFormatMaps[format] = {
        _i: posIndexs,
        _r: new RegExp(re)
      };
    }
    var resMaps = {};
    var matchRest = str.match(cacheItem._r);
    if (matchRest) {
      var _i = cacheItem._i;
      for (var i2 = 1, len2 = matchRest.length; i2 < len2; i2++) {
        resMaps[_i[i2 - 1]] = matchRest[i2];
      }
      return resMaps;
    }
    return resMaps;
  }
  function parseTimeZone(resMaps) {
    if (/^[zZ]/.test(resMaps.Z)) {
      return new Date(helperGetUTCDateTime(resMaps));
    } else {
      var matchRest = resMaps.Z.match(/([-+])(\d{2}):?(\d{2})/);
      if (matchRest) {
        return new Date(helperGetUTCDateTime(resMaps) - (matchRest[1] === "-" ? -1 : 1) * staticParseInt$4(matchRest[2]) * 36e5 + staticParseInt$4(matchRest[3]) * 6e4);
      }
    }
    return /* @__PURE__ */ new Date("");
  }
  function toStringDate$e(str, format) {
    if (str) {
      var isDType = isDate$7(str);
      if (isDType || !format && /^[0-9]{11,15}$/.test(str)) {
        return new Date(isDType ? helperGetDateTime$b(str) : staticParseInt$4(str));
      }
      if (isString$8(str)) {
        var resMaps = format ? parseCustomRules(str, format) : parseDefaultRules(str);
        if (resMaps.y) {
          if (resMaps.M) {
            resMaps.M = toParseNum(resMaps.M) - 1;
          }
          if (resMaps.S) {
            resMaps.S = toParseMs(toParseNum(resMaps.S.substring(0, 3)));
          }
          if (resMaps.Z) {
            return parseTimeZone(resMaps);
          } else {
            return new Date(resMaps.y, resMaps.M || 0, resMaps.d || 1, resMaps.H || 0, resMaps.m || 0, resMaps.s || 0, resMaps.S || 0);
          }
        }
      }
    }
    return /* @__PURE__ */ new Date("");
  }
  var toStringDate_1 = toStringDate$e;
  function helperNewDate$4() {
    return /* @__PURE__ */ new Date();
  }
  var helperNewDate_1 = helperNewDate$4;
  var isDate$6 = isDate_1;
  var toStringDate$d = toStringDate_1;
  var helperNewDate$3 = helperNewDate_1;
  function isLeapYear$2(date) {
    var year;
    var currentDate = date ? toStringDate$d(date) : helperNewDate$3();
    if (isDate$6(currentDate)) {
      year = currentDate.getFullYear();
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    return false;
  }
  var isLeapYear_1 = isLeapYear$2;
  var isArray$d = isArray_1;
  var hasOwnProp$5 = hasOwnProp_1;
  function forOf$1(obj, iterate, context) {
    if (obj) {
      if (isArray$d(obj)) {
        for (var index = 0, len2 = obj.length; index < len2; index++) {
          if (iterate.call(context, obj[index], index, obj) === false) {
            break;
          }
        }
      } else {
        for (var key in obj) {
          if (hasOwnProp$5(obj, key)) {
            if (iterate.call(context, obj[key], key, obj) === false) {
              break;
            }
          }
        }
      }
    }
  }
  var forOf_1 = forOf$1;
  var isArray$c = isArray_1;
  var keys$6 = hasOwnProp_1;
  function lastForOf$1(obj, iterate, context) {
    if (obj) {
      var len2, list;
      if (isArray$c(obj)) {
        for (len2 = obj.length - 1; len2 >= 0; len2--) {
          if (iterate.call(context, obj[len2], len2, obj) === false) {
            break;
          }
        }
      } else {
        list = keys$6(obj);
        for (len2 = list.length - 1; len2 >= 0; len2--) {
          if (iterate.call(context, obj[list[len2]], list[len2], obj) === false) {
            break;
          }
        }
      }
    }
  }
  var lastForOf_1 = lastForOf$1;
  var isArray$b = isArray_1;
  var isString$7 = isString_1;
  var hasOwnProp$4 = hasOwnProp_1;
  function helperCreateIndexOf$2(name, callback) {
    return function(obj, val) {
      if (obj) {
        if (obj[name]) {
          return obj[name](val);
        }
        if (isString$7(obj) || isArray$b(obj)) {
          return callback(obj, val);
        }
        for (var key in obj) {
          if (hasOwnProp$4(obj, key)) {
            if (val === obj[key]) {
              return key;
            }
          }
        }
      }
      return -1;
    };
  }
  var helperCreateIndexOf_1 = helperCreateIndexOf$2;
  var helperCreateIndexOf$1 = helperCreateIndexOf_1;
  var arrayIndexOf$1 = arrayIndexOf_1;
  var indexOf$1 = helperCreateIndexOf$1("indexOf", arrayIndexOf$1);
  var indexOf_1 = indexOf$1;
  var helperCreateIndexOf = helperCreateIndexOf_1;
  var arrayLastIndexOf$1 = arrayLastIndexOf_1;
  var lastIndexOf$2 = helperCreateIndexOf("lastIndexOf", arrayLastIndexOf$1);
  var lastIndexOf_1 = lastIndexOf$2;
  var isArray$a = isArray_1;
  var isString$6 = isString_1;
  var each$6 = each_1;
  function getSize$2(obj) {
    var len2 = 0;
    if (isString$6(obj) || isArray$a(obj)) {
      return obj.length;
    }
    each$6(obj, function() {
      len2++;
    });
    return len2;
  }
  var getSize_1 = getSize$2;
  var isNumber$8 = isNumber_1;
  function isNumberFinite$1(obj) {
    return isNumber$8(obj) && isFinite(obj);
  }
  var _isFinite = isNumberFinite$1;
  var isArray$9 = isArray_1;
  var isNull$4 = isNull_1;
  var isInteger$2 = function(obj) {
    return !isNull$4(obj) && !isNaN(obj) && !isArray$9(obj) && obj % 1 === 0;
  };
  var isInteger_1 = isInteger$2;
  var isArray$8 = isArray_1;
  var isInteger$1 = isInteger_1;
  var isNull$3 = isNull_1;
  function isFloat$1(obj) {
    return !isNull$3(obj) && !isNaN(obj) && !isArray$8(obj) && !isInteger$1(obj);
  }
  var isFloat_1 = isFloat$1;
  var helperCreateInTypeof = helperCreateInTypeof_1;
  var isBoolean$2 = helperCreateInTypeof("boolean");
  var isBoolean_1 = isBoolean$2;
  var helperCreateInInObjectString$2 = helperCreateInInObjectString_1;
  var isRegExp$3 = helperCreateInInObjectString$2("RegExp");
  var isRegExp_1 = isRegExp$3;
  var helperCreateInInObjectString$1 = helperCreateInInObjectString_1;
  var isError$2 = helperCreateInInObjectString$1("Error");
  var isError_1 = isError$2;
  function isTypeError$1(obj) {
    return obj ? obj.constructor === TypeError : false;
  }
  var isTypeError_1 = isTypeError$1;
  function isEmpty$2(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  }
  var isEmpty_1 = isEmpty$2;
  var staticStrUndefined$9 = staticStrUndefined_1;
  var supportSymbol = typeof Symbol !== staticStrUndefined$9;
  function isSymbol$2(obj) {
    return supportSymbol && Symbol.isSymbol ? Symbol.isSymbol(obj) : typeof obj === "symbol";
  }
  var isSymbol_1 = isSymbol$2;
  var helperCreateInInObjectString = helperCreateInInObjectString_1;
  var isArguments$1 = helperCreateInInObjectString("Arguments");
  var isArguments_1 = isArguments$1;
  var isString$5 = isString_1;
  var isNumber$7 = isNumber_1;
  function isElement$1(obj) {
    return !!(obj && isString$5(obj.nodeName) && isNumber$7(obj.nodeType));
  }
  var isElement_1 = isElement$1;
  var staticStrUndefined$8 = staticStrUndefined_1;
  var staticDocument$3 = typeof document === staticStrUndefined$8 ? 0 : document;
  var staticDocument_1 = staticDocument$3;
  var staticDocument$2 = staticDocument_1;
  function isDocument$1(obj) {
    return !!(obj && staticDocument$2 && obj.nodeType === 9);
  }
  var isDocument_1 = isDocument$1;
  var staticStrUndefined$7 = staticStrUndefined_1;
  var staticWindow$2 = typeof window === staticStrUndefined$7 ? 0 : window;
  var staticWindow_1 = staticWindow$2;
  var staticWindow$1 = staticWindow_1;
  function isWindow$1(obj) {
    return !!(staticWindow$1 && !!(obj && obj === obj.window));
  }
  var isWindow_1 = isWindow$1;
  var staticStrUndefined$6 = staticStrUndefined_1;
  var supportFormData = typeof FormData !== staticStrUndefined$6;
  function isFormData$1(obj) {
    return supportFormData && obj instanceof FormData;
  }
  var isFormData_1 = isFormData$1;
  var staticStrUndefined$5 = staticStrUndefined_1;
  var supportMap = typeof Map !== staticStrUndefined$5;
  function isMap$1(obj) {
    return supportMap && obj instanceof Map;
  }
  var isMap_1 = isMap$1;
  var staticStrUndefined$4 = staticStrUndefined_1;
  var supportWeakMap = typeof WeakMap !== staticStrUndefined$4;
  function isWeakMap$1(obj) {
    return supportWeakMap && obj instanceof WeakMap;
  }
  var isWeakMap_1 = isWeakMap$1;
  var staticStrUndefined$3 = staticStrUndefined_1;
  var supportSet = typeof Set !== staticStrUndefined$3;
  function isSet$1(obj) {
    return supportSet && obj instanceof Set;
  }
  var isSet_1 = isSet$1;
  var staticStrUndefined$2 = staticStrUndefined_1;
  var supportWeakSet = typeof WeakSet !== staticStrUndefined$2;
  function isWeakSet$1(obj) {
    return supportWeakSet && obj instanceof WeakSet;
  }
  var isWeakSet_1 = isWeakSet$1;
  var isFunction$6 = isFunction_1;
  var isString$4 = isString_1;
  var isArray$7 = isArray_1;
  var hasOwnProp$3 = hasOwnProp_1;
  function helperCreateiterateIndexOf$2(callback) {
    return function(obj, iterate, context) {
      if (obj && isFunction$6(iterate)) {
        if (isArray$7(obj) || isString$4(obj)) {
          return callback(obj, iterate, context);
        }
        for (var key in obj) {
          if (hasOwnProp$3(obj, key)) {
            if (iterate.call(context, obj[key], key, obj)) {
              return key;
            }
          }
        }
      }
      return -1;
    };
  }
  var helperCreateiterateIndexOf_1 = helperCreateiterateIndexOf$2;
  var helperCreateiterateIndexOf$1 = helperCreateiterateIndexOf_1;
  var findIndexOf$3 = helperCreateiterateIndexOf$1(function(obj, iterate, context) {
    for (var index = 0, len2 = obj.length; index < len2; index++) {
      if (iterate.call(context, obj[index], index, obj)) {
        return index;
      }
    }
    return -1;
  });
  var findIndexOf_1 = findIndexOf$3;
  var isNumber$6 = isNumber_1;
  var isArray$6 = isArray_1;
  var isString$3 = isString_1;
  var isRegExp$2 = isRegExp_1;
  var isDate$5 = isDate_1;
  var isBoolean$1 = isBoolean_1;
  var isUndefined$6 = isUndefined_1;
  var keys$5 = keys_1;
  var every$1 = every_1;
  function helperEqualCompare$2(val1, val2, compare, func, key, obj1, obj2) {
    if (val1 === val2) {
      return true;
    }
    if (val1 && val2 && !isNumber$6(val1) && !isNumber$6(val2) && !isString$3(val1) && !isString$3(val2)) {
      if (isRegExp$2(val1)) {
        return compare("" + val1, "" + val2, key, obj1, obj2);
      }
      if (isDate$5(val1) || isBoolean$1(val1)) {
        return compare(+val1, +val2, key, obj1, obj2);
      } else {
        var result, val1Keys, val2Keys;
        var isObj1Arr = isArray$6(val1);
        var isObj2Arr = isArray$6(val2);
        if (isObj1Arr || isObj2Arr ? isObj1Arr && isObj2Arr : val1.constructor === val2.constructor) {
          val1Keys = keys$5(val1);
          val2Keys = keys$5(val2);
          if (func) {
            result = func(val1, val2, key);
          }
          if (val1Keys.length === val2Keys.length) {
            return isUndefined$6(result) ? every$1(val1Keys, function(key2, index) {
              return key2 === val2Keys[index] && helperEqualCompare$2(val1[key2], val2[val2Keys[index]], compare, func, isObj1Arr || isObj2Arr ? index : key2, val1, val2);
            }) : !!result;
          }
          return false;
        }
      }
    }
    return compare(val1, val2, key, obj1, obj2);
  }
  var helperEqualCompare_1 = helperEqualCompare$2;
  function helperDefaultCompare$2(v1, v2) {
    return v1 === v2;
  }
  var helperDefaultCompare_1 = helperDefaultCompare$2;
  var helperEqualCompare$1 = helperEqualCompare_1;
  var helperDefaultCompare$1 = helperDefaultCompare_1;
  function isEqual$2(obj1, obj2) {
    return helperEqualCompare$1(obj1, obj2, helperDefaultCompare$1);
  }
  var isEqual_1 = isEqual$2;
  var keys$4 = keys_1;
  var findIndexOf$2 = findIndexOf_1;
  var isEqual$1 = isEqual_1;
  var some$1 = some_1;
  var includeArrays$1 = includeArrays_1;
  function isMatch$1(obj, source) {
    var objKeys = keys$4(obj);
    var sourceKeys = keys$4(source);
    if (sourceKeys.length) {
      if (includeArrays$1(objKeys, sourceKeys)) {
        return some$1(sourceKeys, function(key2) {
          return findIndexOf$2(objKeys, function(key1) {
            return key1 === key2 && isEqual$1(obj[key1], source[key2]);
          }) > -1;
        });
      }
    } else {
      return true;
    }
    return isEqual$1(obj, source);
  }
  var isMatch_1 = isMatch$1;
  var helperEqualCompare = helperEqualCompare_1;
  var helperDefaultCompare = helperDefaultCompare_1;
  var isFunction$5 = isFunction_1;
  var isUndefined$5 = isUndefined_1;
  function isEqualWith$1(obj1, obj2, func) {
    if (isFunction$5(func)) {
      return helperEqualCompare(obj1, obj2, function(v1, v2, key, obj12, obj22) {
        var result = func(v1, v2, key, obj12, obj22);
        return isUndefined$5(result) ? helperDefaultCompare(v1, v2) : !!result;
      }, func);
    }
    return helperEqualCompare(obj1, obj2, helperDefaultCompare);
  }
  var isEqualWith_1 = isEqualWith$1;
  var isSymbol$1 = isSymbol_1;
  var isDate$4 = isDate_1;
  var isArray$5 = isArray_1;
  var isRegExp$1 = isRegExp_1;
  var isError$1 = isError_1;
  var isNull$2 = isNull_1;
  function getType$1(obj) {
    if (isNull$2(obj)) {
      return "null";
    }
    if (isSymbol$1(obj)) {
      return "symbol";
    }
    if (isDate$4(obj)) {
      return "date";
    }
    if (isArray$5(obj)) {
      return "array";
    }
    if (isRegExp$1(obj)) {
      return "regexp";
    }
    if (isError$1(obj)) {
      return "error";
    }
    return typeof obj;
  }
  var getType_1 = getType$1;
  var setupDefaults$6 = setupDefaults_1;
  var eqNull$3 = eqNull_1;
  function uniqueId$1(prefix) {
    return "" + (eqNull$3(prefix) ? "" : prefix) + setupDefaults$6.keyId++;
  }
  var uniqueId_1 = uniqueId$1;
  var helperCreateiterateIndexOf = helperCreateiterateIndexOf_1;
  var findLastIndexOf$1 = helperCreateiterateIndexOf(function(obj, iterate, context) {
    for (var len2 = obj.length - 1; len2 >= 0; len2--) {
      if (iterate.call(context, obj[len2], len2, obj)) {
        return len2;
      }
    }
    return -1;
  });
  var findLastIndexOf_1 = findLastIndexOf$1;
  var isPlainObject$2 = isPlainObject_1;
  var isString$2 = isString_1;
  function toStringJSON$1(str) {
    if (isPlainObject$2(str)) {
      return str;
    } else if (isString$2(str)) {
      try {
        return JSON.parse(str);
      } catch (e) {
      }
    }
    return {};
  }
  var toStringJSON_1 = toStringJSON$1;
  var eqNull$2 = eqNull_1;
  function toJSONString$1(obj) {
    return eqNull$2(obj) ? "" : JSON.stringify(obj);
  }
  var toJSONString_1 = toJSONString$1;
  var helperCreateGetObjects = helperCreateGetObjects_1;
  var entries$1 = helperCreateGetObjects("entries", 2);
  var entries_1 = entries$1;
  var isFunction$4 = isFunction_1;
  var isArray$4 = isArray_1;
  var each$5 = each_1;
  var findIndexOf$1 = findIndexOf_1;
  function helperCreatePickOmit$2(case1, case2) {
    return function(obj, callback) {
      var item, index;
      var rest = {};
      var result = [];
      var context = this;
      var args = arguments;
      var len2 = args.length;
      if (!isFunction$4(callback)) {
        for (index = 1; index < len2; index++) {
          item = args[index];
          result.push.apply(result, isArray$4(item) ? item : [item]);
        }
        callback = 0;
      }
      each$5(obj, function(val, key) {
        if ((callback ? callback.call(context, val, key, obj) : findIndexOf$1(result, function(name) {
          return name === key;
        }) > -1) ? case1 : case2) {
          rest[key] = val;
        }
      });
      return rest;
    };
  }
  var helperCreatePickOmit_1 = helperCreatePickOmit$2;
  var helperCreatePickOmit$1 = helperCreatePickOmit_1;
  var pick$1 = helperCreatePickOmit$1(1, 0);
  var pick_1 = pick$1;
  var helperCreatePickOmit = helperCreatePickOmit_1;
  var omit$1 = helperCreatePickOmit(0, 1);
  var omit_1 = omit$1;
  var values$2 = values_1;
  function first$1(obj) {
    return values$2(obj)[0];
  }
  var first_1 = first$1;
  var values$1 = values_1;
  function last$1(obj) {
    var list = values$1(obj);
    return list[list.length - 1];
  }
  var last_1 = last$1;
  var staticHGKeyRE = staticHGKeyRE_1;
  var helperGetHGSKeys$1 = helperGetHGSKeys_1;
  var hasOwnProp$2 = hasOwnProp_1;
  function has$1(obj, property2) {
    if (obj) {
      if (hasOwnProp$2(obj, property2)) {
        return true;
      } else {
        var prop, arrIndex, objProp, matchs, rest, isHas;
        var props = helperGetHGSKeys$1(property2);
        var index = 0;
        var len2 = props.length;
        for (rest = obj; index < len2; index++) {
          isHas = false;
          prop = props[index];
          matchs = prop ? prop.match(staticHGKeyRE) : "";
          if (matchs) {
            arrIndex = matchs[1];
            objProp = matchs[2];
            if (arrIndex) {
              if (rest[arrIndex]) {
                if (hasOwnProp$2(rest[arrIndex], objProp)) {
                  isHas = true;
                  rest = rest[arrIndex][objProp];
                }
              }
            } else {
              if (hasOwnProp$2(rest, objProp)) {
                isHas = true;
                rest = rest[objProp];
              }
            }
          } else {
            if (hasOwnProp$2(rest, prop)) {
              isHas = true;
              rest = rest[prop];
            }
          }
          if (isHas) {
            if (index === len2 - 1) {
              return true;
            }
          } else {
            break;
          }
        }
      }
    }
    return false;
  }
  var has_1 = has$1;
  var staticParseInt$3 = staticParseInt_1;
  var helperGetHGSKeys = helperGetHGSKeys_1;
  var helperCheckCopyKey = helperCheckCopyKey_1;
  var hasOwnProp$1 = hasOwnProp_1;
  var sKeyRE = /(.+)?\[(\d+)\]$/;
  function setDeepProps(obj, key, isEnd, nextKey, value) {
    if (obj[key]) {
      if (isEnd) {
        obj[key] = value;
      }
    } else {
      var index;
      var rest;
      var currMatchs = key ? key.match(sKeyRE) : null;
      if (isEnd) {
        rest = value;
      } else {
        var nextMatchs = nextKey ? nextKey.match(sKeyRE) : null;
        if (nextMatchs && !nextMatchs[1]) {
          rest = new Array(staticParseInt$3(nextMatchs[2]) + 1);
        } else {
          rest = {};
        }
      }
      if (currMatchs) {
        if (currMatchs[1]) {
          index = staticParseInt$3(currMatchs[2]);
          if (obj[currMatchs[1]]) {
            if (isEnd) {
              obj[currMatchs[1]][index] = rest;
            } else {
              if (obj[currMatchs[1]][index]) {
                rest = obj[currMatchs[1]][index];
              } else {
                obj[currMatchs[1]][index] = rest;
              }
            }
          } else {
            obj[currMatchs[1]] = new Array(index + 1);
            obj[currMatchs[1]][index] = rest;
          }
        } else {
          obj[currMatchs[2]] = rest;
        }
      } else {
        obj[key] = rest;
      }
      return rest;
    }
    return obj[key];
  }
  function set$1(obj, property2, value) {
    if (obj && helperCheckCopyKey(property2)) {
      if ((obj[property2] || hasOwnProp$1(obj, property2)) && !isPrototypePolluted(property2)) {
        obj[property2] = value;
      } else {
        var rest = obj;
        var props = helperGetHGSKeys(property2);
        var len2 = props.length;
        for (var index = 0; index < len2; index++) {
          if (isPrototypePolluted(props[index])) {
            continue;
          }
          var isEnd = index === len2 - 1;
          rest = setDeepProps(rest, props[index], isEnd, isEnd ? null : props[index + 1], value);
        }
      }
    }
    return obj;
  }
  function isPrototypePolluted(key) {
    return key === "__proto__" || key === "constructor" || key === "prototype";
  }
  var set_1 = set$1;
  var isEmpty$1 = isEmpty_1;
  var isObject$2 = isObject_1;
  var isFunction$3 = isFunction_1;
  var property$1 = property_1;
  var each$4 = each_1;
  function createiterateEmpty(iterate) {
    return function() {
      return isEmpty$1(iterate);
    };
  }
  function groupBy$2(obj, iterate, context) {
    var groupKey;
    var result = {};
    if (obj) {
      if (iterate && isObject$2(iterate)) {
        iterate = createiterateEmpty(iterate);
      } else if (!isFunction$3(iterate)) {
        iterate = property$1(iterate);
      }
      each$4(obj, function(val, key) {
        groupKey = iterate ? iterate.call(context, val, key, obj) : val;
        if (result[groupKey]) {
          result[groupKey].push(val);
        } else {
          result[groupKey] = [val];
        }
      });
    }
    return result;
  }
  var groupBy_1 = groupBy$2;
  var groupBy$1 = groupBy_1;
  var objectEach$1 = objectEach_1;
  function countBy$1(obj, iterate, context) {
    var result = groupBy$1(obj, iterate, context || this);
    objectEach$1(result, function(item, key) {
      result[key] = item.length;
    });
    return result;
  }
  var countBy_1 = countBy$1;
  function range$2(start, stop, step) {
    var index, len2;
    var result = [];
    var args = arguments;
    if (args.length < 2) {
      stop = args[0];
      start = 0;
    }
    index = start >> 0;
    len2 = stop >> 0;
    if (index < stop) {
      step = step >> 0 || 1;
      for (; index < len2; index += step) {
        result.push(index);
      }
    }
    return result;
  }
  var range_1 = range$2;
  var keys$3 = keys_1;
  var slice$6 = slice_1;
  var includes$3 = includes_1;
  var arrayEach$4 = arrayEach_1;
  var assign$7 = assign_1;
  function destructuring$1(destination, sources) {
    if (destination && sources) {
      var rest = assign$7.apply(this, [{}].concat(slice$6(arguments, 1)));
      var restKeys = keys$3(rest);
      arrayEach$4(keys$3(destination), function(key) {
        if (includes$3(restKeys, key)) {
          destination[key] = rest[key];
        }
      });
    }
    return destination;
  }
  var destructuring_1 = destructuring$1;
  var helperCreateMinMax = helperCreateMinMax_1;
  var min$1 = helperCreateMinMax(function(rest, itemVal) {
    return rest > itemVal;
  });
  var min_1 = min$1;
  function helperNumberDecimal$4(numStr) {
    return (numStr.split(".")[1] || "").length;
  }
  var helperNumberDecimal_1 = helperNumberDecimal$4;
  var staticParseInt$2 = staticParseInt_1;
  function helperStringRepeat$5(str, count) {
    if (str.repeat) {
      return str.repeat(count);
    }
    var list = isNaN(count) ? [] : new Array(staticParseInt$2(count));
    return list.join(str) + (list.length > 0 ? str : "");
  }
  var helperStringRepeat_1 = helperStringRepeat$5;
  function helperNumberOffsetPoint$2(str, offsetIndex) {
    return str.substring(0, offsetIndex) + "." + str.substring(offsetIndex, str.length);
  }
  var helperNumberOffsetPoint_1 = helperNumberOffsetPoint$2;
  var helperStringRepeat$4 = helperStringRepeat_1;
  var helperNumberOffsetPoint$1 = helperNumberOffsetPoint_1;
  function toNumberString$8(num) {
    var rest = "" + num;
    var scienceMatchs = rest.match(/^([-+]?)((\d+)|((\d+)?[.](\d+)?))e([-+]{1})([0-9]+)$/);
    if (scienceMatchs) {
      var isNegative = num < 0;
      var absFlag = isNegative ? "-" : "";
      var intNumStr = scienceMatchs[3] || "";
      var dIntNumStr = scienceMatchs[5] || "";
      var dFloatNumStr = scienceMatchs[6] || "";
      var sciencFlag = scienceMatchs[7];
      var scienceNumStr = scienceMatchs[8];
      var floatOffsetIndex = scienceNumStr - dFloatNumStr.length;
      var intOffsetIndex = scienceNumStr - intNumStr.length;
      var dIntOffsetIndex = scienceNumStr - dIntNumStr.length;
      if (sciencFlag === "+") {
        if (intNumStr) {
          return absFlag + intNumStr + helperStringRepeat$4("0", scienceNumStr);
        }
        if (floatOffsetIndex > 0) {
          return absFlag + dIntNumStr + dFloatNumStr + helperStringRepeat$4("0", floatOffsetIndex);
        }
        return absFlag + dIntNumStr + helperNumberOffsetPoint$1(dFloatNumStr, scienceNumStr);
      }
      if (intNumStr) {
        if (intOffsetIndex > 0) {
          return absFlag + "0." + helperStringRepeat$4("0", Math.abs(intOffsetIndex)) + intNumStr;
        }
        return absFlag + helperNumberOffsetPoint$1(intNumStr, intOffsetIndex);
      }
      if (dIntOffsetIndex > 0) {
        return absFlag + "0." + helperStringRepeat$4("0", Math.abs(dIntOffsetIndex)) + dIntNumStr + dFloatNumStr;
      }
      return absFlag + helperNumberOffsetPoint$1(dIntNumStr, dIntOffsetIndex) + dFloatNumStr;
    }
    return rest;
  }
  var toNumberString_1 = toNumberString$8;
  var helperNumberDecimal$3 = helperNumberDecimal_1;
  var toNumberString$7 = toNumberString_1;
  function helperMultiply$2(multiplier, multiplicand) {
    var str1 = toNumberString$7(multiplier);
    var str2 = toNumberString$7(multiplicand);
    return parseInt(str1.replace(".", "")) * parseInt(str2.replace(".", "")) / Math.pow(10, helperNumberDecimal$3(str1) + helperNumberDecimal$3(str2));
  }
  var helperMultiply_1 = helperMultiply$2;
  var helperMultiply$1 = helperMultiply_1;
  var toNumber$5 = toNumber_1;
  var toNumberString$6 = toNumberString_1;
  function helperCreateMathNumber$3(name) {
    return function(num, digits) {
      var numRest = toNumber$5(num);
      var rest = numRest;
      if (numRest) {
        digits = digits >> 0;
        var numStr = toNumberString$6(numRest);
        var nums = numStr.split(".");
        var intStr = nums[0];
        var floatStr = nums[1] || "";
        var fStr = floatStr.substring(0, digits + 1);
        var subRest = intStr + (fStr ? "." + fStr : "");
        if (digits >= floatStr.length) {
          return toNumber$5(subRest);
        }
        subRest = numRest;
        if (digits > 0) {
          var ratio = Math.pow(10, digits);
          rest = Math[name](helperMultiply$1(subRest, ratio)) / ratio;
        } else {
          rest = Math[name](subRest);
        }
      }
      return rest;
    };
  }
  var helperCreateMathNumber_1 = helperCreateMathNumber$3;
  var helperCreateMathNumber$2 = helperCreateMathNumber_1;
  var round$3 = helperCreateMathNumber$2("round");
  var round_1 = round$3;
  var helperCreateMathNumber$1 = helperCreateMathNumber_1;
  var ceil$2 = helperCreateMathNumber$1("ceil");
  var ceil_1 = ceil$2;
  var helperCreateMathNumber = helperCreateMathNumber_1;
  var floor$2 = helperCreateMathNumber("floor");
  var floor_1 = floor$2;
  var eqNull$1 = eqNull_1;
  var isNumber$5 = isNumber_1;
  var toNumberString$5 = toNumberString_1;
  function toValueString$e(obj) {
    if (isNumber$5(obj)) {
      return toNumberString$5(obj);
    }
    return "" + (eqNull$1(obj) ? "" : obj);
  }
  var toValueString_1 = toValueString$e;
  var round$2 = round_1;
  var toValueString$d = toValueString_1;
  var helperStringRepeat$3 = helperStringRepeat_1;
  var helperNumberOffsetPoint = helperNumberOffsetPoint_1;
  function toFixed$3(num, digits) {
    digits = digits >> 0;
    var str = toValueString$d(round$2(num, digits));
    var nums = str.split(".");
    var intStr = nums[0];
    var floatStr = nums[1] || "";
    var digitOffsetIndex = digits - floatStr.length;
    if (digits) {
      if (digitOffsetIndex > 0) {
        return intStr + "." + floatStr + helperStringRepeat$3("0", digitOffsetIndex);
      }
      return intStr + helperNumberOffsetPoint(floatStr, Math.abs(digitOffsetIndex));
    }
    return intStr;
  }
  var toFixed_1 = toFixed$3;
  var setupDefaults$5 = setupDefaults_1;
  var round$1 = round_1;
  var ceil$1 = ceil_1;
  var floor$1 = floor_1;
  var isNumber$4 = isNumber_1;
  var toValueString$c = toValueString_1;
  var toFixed$2 = toFixed_1;
  var toNumberString$4 = toNumberString_1;
  var assign$6 = assign_1;
  function commafy$1(num, options) {
    var opts = assign$6({}, setupDefaults$5.commafyOptions, options);
    var optDigits = opts.digits;
    var isNum = isNumber$4(num);
    var rest, result, isNegative, intStr, floatStr;
    if (isNum) {
      rest = (opts.ceil ? ceil$1 : opts.floor ? floor$1 : round$1)(num, optDigits);
      result = toNumberString$4(optDigits ? toFixed$2(rest, optDigits) : rest).split(".");
      intStr = result[0];
      floatStr = result[1];
      isNegative = intStr && rest < 0;
      if (isNegative) {
        intStr = intStr.substring(1, intStr.length);
      }
    } else {
      rest = toValueString$c(num).replace(/,/g, "");
      result = rest ? [rest] : [];
      intStr = result[0];
    }
    if (result.length) {
      return (isNegative ? "-" : "") + intStr.replace(new RegExp("(?=(?!(\\b))(.{" + (opts.spaceNumber || 3) + "})+$)", "g"), opts.separator || ",") + (floatStr ? "." + floatStr : "");
    }
    return rest;
  }
  var commafy_1 = commafy$1;
  var staticParseInt$1 = staticParseInt_1;
  var helperCreateToNumber = helperCreateToNumber_1;
  var toInteger$1 = helperCreateToNumber(staticParseInt$1);
  var toInteger_1 = toInteger$1;
  var helperMultiply = helperMultiply_1;
  var toNumber$4 = toNumber_1;
  function multiply$3(num1, num2) {
    var multiplier = toNumber$4(num1);
    var multiplicand = toNumber$4(num2);
    return helperMultiply(multiplier, multiplicand);
  }
  var multiply_1 = multiply$3;
  var helperNumberDecimal$2 = helperNumberDecimal_1;
  var toNumberString$3 = toNumberString_1;
  var multiply$2 = multiply_1;
  function helperNumberAdd$2(addend, augend) {
    var str1 = toNumberString$3(addend);
    var str2 = toNumberString$3(augend);
    var ratio = Math.pow(10, Math.max(helperNumberDecimal$2(str1), helperNumberDecimal$2(str2)));
    return (multiply$2(addend, ratio) + multiply$2(augend, ratio)) / ratio;
  }
  var helperNumberAdd_1 = helperNumberAdd$2;
  var helperNumberAdd$1 = helperNumberAdd_1;
  var toNumber$3 = toNumber_1;
  function add$1(num1, num2) {
    return helperNumberAdd$1(toNumber$3(num1), toNumber$3(num2));
  }
  var add_1 = add$1;
  var helperNumberDecimal$1 = helperNumberDecimal_1;
  var toNumberString$2 = toNumberString_1;
  var toNumber$2 = toNumber_1;
  var toFixed$1 = toFixed_1;
  function subtract$1(num1, num2) {
    var subtrahend = toNumber$2(num1);
    var minuend = toNumber$2(num2);
    var str1 = toNumberString$2(subtrahend);
    var str2 = toNumberString$2(minuend);
    var digit1 = helperNumberDecimal$1(str1);
    var digit2 = helperNumberDecimal$1(str2);
    var ratio = Math.pow(10, Math.max(digit1, digit2));
    var precision = digit1 >= digit2 ? digit1 : digit2;
    return parseFloat(toFixed$1((subtrahend * ratio - minuend * ratio) / ratio, precision));
  }
  var subtract_1 = subtract$1;
  var helperNumberDecimal = helperNumberDecimal_1;
  var toNumberString$1 = toNumberString_1;
  var multiply$1 = multiply_1;
  function helperNumberDivide$2(divisor, dividend) {
    var str1 = toNumberString$1(divisor);
    var str2 = toNumberString$1(dividend);
    var divisorDecimal = helperNumberDecimal(str1);
    var dividendDecimal = helperNumberDecimal(str2);
    var powY = dividendDecimal - divisorDecimal;
    var isMinus = powY < 0;
    var multiplicand = Math.pow(10, isMinus ? Math.abs(powY) : powY);
    return multiply$1(str1.replace(".", "") / str2.replace(".", ""), isMinus ? 1 / multiplicand : multiplicand);
  }
  var helperNumberDivide_1 = helperNumberDivide$2;
  var helperNumberDivide$1 = helperNumberDivide_1;
  var toNumber$1 = toNumber_1;
  function divide$1(num1, num2) {
    return helperNumberDivide$1(toNumber$1(num1), toNumber$1(num2));
  }
  var divide_1 = divide$1;
  var helperNumberAdd = helperNumberAdd_1;
  var isFunction$2 = isFunction_1;
  var isArray$3 = isArray_1;
  var each$3 = each_1;
  var get$2 = get_1;
  function sum$2(array, iterate, context) {
    var result = 0;
    each$3(array && array.length > 2 && isArray$3(array) ? array.sort() : array, iterate ? isFunction$2(iterate) ? function() {
      result = helperNumberAdd(result, iterate.apply(context, arguments));
    } : function(val) {
      result = helperNumberAdd(result, get$2(val, iterate));
    } : function(val) {
      result = helperNumberAdd(result, val);
    });
    return result;
  }
  var sum_1 = sum$2;
  var helperNumberDivide = helperNumberDivide_1;
  var getSize$1 = getSize_1;
  var sum$1 = sum_1;
  function mean$1(array, iterate, context) {
    return helperNumberDivide(sum$1(array, iterate, context), getSize$1(array));
  }
  var mean_1 = mean$1;
  var staticStrFirst$5 = "first";
  var staticStrFirst_1 = staticStrFirst$5;
  var staticStrLast$4 = "last";
  var staticStrLast_1 = staticStrLast$4;
  function helperGetDateFullYear$5(date) {
    return date.getFullYear();
  }
  var helperGetDateFullYear_1 = helperGetDateFullYear$5;
  var staticDayTime$6 = 864e5;
  var staticDayTime_1 = staticDayTime$6;
  function helperGetDateMonth$4(date) {
    return date.getMonth();
  }
  var helperGetDateMonth_1 = helperGetDateMonth$4;
  var isDate$3 = isDate_1;
  var helperGetDateTime$a = helperGetDateTime_1;
  function isValidDate$c(val) {
    return isDate$3(val) && !isNaN(helperGetDateTime$a(val));
  }
  var isValidDate_1 = isValidDate$c;
  var staticStrFirst$4 = staticStrFirst_1;
  var staticStrLast$3 = staticStrLast_1;
  var staticDayTime$5 = staticDayTime_1;
  var helperGetDateFullYear$4 = helperGetDateFullYear_1;
  var helperGetDateTime$9 = helperGetDateTime_1;
  var helperGetDateMonth$3 = helperGetDateMonth_1;
  var toStringDate$c = toStringDate_1;
  var isValidDate$b = isValidDate_1;
  var isNumber$3 = isNumber_1;
  function getWhatMonth$5(date, offsetMonth, offsetDay) {
    var monthNum = offsetMonth && !isNaN(offsetMonth) ? offsetMonth : 0;
    date = toStringDate$c(date);
    if (isValidDate$b(date)) {
      if (offsetDay === staticStrFirst$4) {
        return new Date(helperGetDateFullYear$4(date), helperGetDateMonth$3(date) + monthNum, 1);
      } else if (offsetDay === staticStrLast$3) {
        return new Date(helperGetDateTime$9(getWhatMonth$5(date, monthNum + 1, staticStrFirst$4)) - 1);
      } else if (isNumber$3(offsetDay)) {
        date.setDate(offsetDay);
      }
      if (monthNum) {
        var currDate = date.getDate();
        date.setMonth(helperGetDateMonth$3(date) + monthNum);
        if (currDate !== date.getDate()) {
          date.setDate(1);
          return new Date(helperGetDateTime$9(date) - staticDayTime$5);
        }
      }
    }
    return date;
  }
  var getWhatMonth_1 = getWhatMonth$5;
  var staticStrFirst$3 = staticStrFirst_1;
  var staticStrLast$2 = staticStrLast_1;
  var helperGetDateFullYear$3 = helperGetDateFullYear_1;
  var getWhatMonth$4 = getWhatMonth_1;
  var toStringDate$b = toStringDate_1;
  var isValidDate$a = isValidDate_1;
  function getWhatYear$4(date, offset, month) {
    var number;
    date = toStringDate$b(date);
    if (isValidDate$a(date)) {
      if (offset) {
        number = offset && !isNaN(offset) ? offset : 0;
        date.setFullYear(helperGetDateFullYear$3(date) + number);
      }
      if (month || !isNaN(month)) {
        if (month === staticStrFirst$3) {
          return new Date(helperGetDateFullYear$3(date), 0, 1);
        } else if (month === staticStrLast$2) {
          date.setMonth(11);
          return getWhatMonth$4(date, 0, staticStrLast$2);
        } else {
          date.setMonth(month);
        }
      }
    }
    return date;
  }
  var getWhatYear_1 = getWhatYear$4;
  var getWhatMonth$3 = getWhatMonth_1;
  var toStringDate$a = toStringDate_1;
  var isValidDate$9 = isValidDate_1;
  function getQuarterNumber(date) {
    var month = date.getMonth();
    if (month < 3) {
      return 1;
    } else if (month < 6) {
      return 2;
    } else if (month < 9) {
      return 3;
    }
    return 4;
  }
  function getWhatQuarter$1(date, offset, day) {
    var currMonth, monthOffset = offset && !isNaN(offset) ? offset * 3 : 0;
    date = toStringDate$a(date);
    if (isValidDate$9(date)) {
      currMonth = (getQuarterNumber(date) - 1) * 3;
      date.setMonth(currMonth);
      return getWhatMonth$3(date, monthOffset, day);
    }
    return date;
  }
  var getWhatQuarter_1 = getWhatQuarter$1;
  var staticStrFirst$2 = staticStrFirst_1;
  var staticStrLast$1 = staticStrLast_1;
  var staticParseInt = staticParseInt_1;
  var helperGetDateFullYear$2 = helperGetDateFullYear_1;
  var helperGetDateMonth$2 = helperGetDateMonth_1;
  var helperGetDateTime$8 = helperGetDateTime_1;
  var toStringDate$9 = toStringDate_1;
  var isValidDate$8 = isValidDate_1;
  function getWhatDay$2(date, offset, mode) {
    date = toStringDate$9(date);
    if (isValidDate$8(date) && !isNaN(offset)) {
      date.setDate(date.getDate() + staticParseInt(offset));
      if (mode === staticStrFirst$2) {
        return new Date(helperGetDateFullYear$2(date), helperGetDateMonth$2(date), date.getDate());
      } else if (mode === staticStrLast$1) {
        return new Date(helperGetDateTime$8(getWhatDay$2(date, 1, staticStrFirst$2)) - 1);
      }
    }
    return date;
  }
  var getWhatDay_1 = getWhatDay$2;
  function helperStringUpperCase$2(str) {
    return str.toUpperCase();
  }
  var helperStringUpperCase_1 = helperStringUpperCase$2;
  var staticDayTime$4 = staticDayTime_1;
  var staticWeekTime$2 = staticDayTime$4 * 7;
  var staticWeekTime_1 = staticWeekTime$2;
  var setupDefaults$4 = setupDefaults_1;
  var staticDayTime$3 = staticDayTime_1;
  var staticWeekTime$1 = staticWeekTime_1;
  var helperGetDateTime$7 = helperGetDateTime_1;
  var toStringDate$8 = toStringDate_1;
  var isValidDate$7 = isValidDate_1;
  var isNumber$2 = isNumber_1;
  function getWhatWeek$2(date, offsetWeek, offsetDay, firstDay) {
    date = toStringDate$8(date);
    if (isValidDate$7(date)) {
      var hasCustomDay = isNumber$2(offsetDay);
      var hasStartDay = isNumber$2(firstDay);
      var whatDayTime = helperGetDateTime$7(date);
      if (hasCustomDay || hasStartDay) {
        var viewStartDay = hasStartDay ? firstDay : setupDefaults$4.firstDayOfWeek;
        var currentDay = date.getDay();
        var customDay = hasCustomDay ? offsetDay : currentDay;
        if (currentDay !== customDay) {
          var offsetNum = 0;
          if (viewStartDay > currentDay) {
            offsetNum = -(7 - viewStartDay + currentDay);
          } else if (viewStartDay < currentDay) {
            offsetNum = viewStartDay - currentDay;
          }
          if (customDay > viewStartDay) {
            whatDayTime += ((customDay === 0 ? 7 : customDay) - viewStartDay + offsetNum) * staticDayTime$3;
          } else if (customDay < viewStartDay) {
            whatDayTime += (7 - viewStartDay + customDay + offsetNum) * staticDayTime$3;
          } else {
            whatDayTime += offsetNum * staticDayTime$3;
          }
        }
      }
      if (offsetWeek && !isNaN(offsetWeek)) {
        whatDayTime += offsetWeek * staticWeekTime$1;
      }
      return new Date(whatDayTime);
    }
    return date;
  }
  var getWhatWeek_1 = getWhatWeek$2;
  var setupDefaults$3 = setupDefaults_1;
  var staticDayTime$2 = staticDayTime_1;
  var staticWeekTime = staticWeekTime_1;
  var isNumber$1 = isNumber_1;
  var includes$2 = includes_1;
  var toStringDate$7 = toStringDate_1;
  var isValidDate$6 = isValidDate_1;
  var getWhatWeek$1 = getWhatWeek_1;
  var range$1 = range_1;
  var map$1 = map_1;
  var helperGetDateTime$6 = helperGetDateTime_1;
  var nextStartMaps = map$1(range$1(0, 7), function(day) {
    return [(day + 1) % 7, (day + 2) % 7, (day + 3) % 7];
  });
  function matchWeekStartDay(time, viewStartDay) {
    var day = new Date(time).getDay();
    return includes$2(nextStartMaps[viewStartDay], day);
  }
  function helperCreateGetDateWeek$2(getStartDate, checkCrossDate) {
    return function(date, firstDay) {
      var viewStartDay = isNumber$1(firstDay) ? firstDay : setupDefaults$3.firstDayOfWeek;
      var targetDate = toStringDate$7(date);
      if (isValidDate$6(targetDate)) {
        var targetWeekStartDate = getWhatWeek$1(targetDate, 0, viewStartDay, viewStartDay);
        var firstDate = getStartDate(targetWeekStartDate);
        var firstTime = helperGetDateTime$6(firstDate);
        var targetWeekStartTime = helperGetDateTime$6(targetWeekStartDate);
        var targetWeekEndTime = targetWeekStartTime + staticDayTime$2 * 6;
        var targetWeekEndDate = new Date(targetWeekEndTime);
        var firstWeekStartDate = getWhatWeek$1(firstDate, 0, viewStartDay, viewStartDay);
        var firstWeekStartTime = helperGetDateTime$6(firstWeekStartDate);
        var tempTime;
        if (targetWeekStartTime === firstWeekStartTime) {
          return 1;
        }
        if (checkCrossDate(targetWeekStartDate, targetWeekEndDate)) {
          tempTime = helperGetDateTime$6(getStartDate(targetWeekEndDate));
          for (; tempTime < targetWeekEndTime; tempTime += staticDayTime$2) {
            if (matchWeekStartDay(tempTime, viewStartDay)) {
              return 1;
            }
          }
        }
        var firstWeekEndTime = firstWeekStartTime + staticDayTime$2 * 6;
        var firstWeekEndDate = new Date(targetWeekEndTime);
        var offsetNum = 1;
        if (checkCrossDate(firstWeekStartDate, firstWeekEndDate)) {
          offsetNum = 0;
          tempTime = firstTime;
          for (; tempTime < firstWeekEndTime; tempTime += staticDayTime$2) {
            if (matchWeekStartDay(tempTime, viewStartDay)) {
              offsetNum++;
              break;
            }
          }
        }
        return Math.floor((targetWeekStartTime - firstWeekStartTime) / staticWeekTime) + offsetNum;
      }
      return NaN;
    };
  }
  var helperCreateGetDateWeek_1 = helperCreateGetDateWeek$2;
  var helperCreateGetDateWeek$1 = helperCreateGetDateWeek_1;
  var getYearWeek$2 = helperCreateGetDateWeek$1(function(targetDate) {
    return new Date(targetDate.getFullYear(), 0, 1);
  }, function(date1, date2) {
    return date1.getFullYear() !== date2.getFullYear();
  });
  var getYearWeek_1 = getYearWeek$2;
  var helperGetDateFullYear$1 = helperGetDateFullYear_1;
  var helperGetDateMonth$1 = helperGetDateMonth_1;
  function helperGetYMD$1(date) {
    return new Date(helperGetDateFullYear$1(date), helperGetDateMonth$1(date), date.getDate());
  }
  var helperGetYMD_1 = helperGetYMD$1;
  var helperGetDateTime$5 = helperGetDateTime_1;
  var helperGetYMD = helperGetYMD_1;
  function helperGetYMDTime$1(date) {
    return helperGetDateTime$5(helperGetYMD(date));
  }
  var helperGetYMDTime_1 = helperGetYMDTime$1;
  var staticDayTime$1 = staticDayTime_1;
  var staticStrFirst$1 = staticStrFirst_1;
  var helperGetYMDTime = helperGetYMDTime_1;
  var getWhatYear$3 = getWhatYear_1;
  var toStringDate$6 = toStringDate_1;
  var isValidDate$5 = isValidDate_1;
  function getYearDay$2(date) {
    date = toStringDate$6(date);
    if (isValidDate$5(date)) {
      return Math.floor((helperGetYMDTime(date) - helperGetYMDTime(getWhatYear$3(date, 0, staticStrFirst$1))) / staticDayTime$1) + 1;
    }
    return NaN;
  }
  var getYearDay_1 = getYearDay$2;
  var toValueString$b = toValueString_1;
  var isUndefined$4 = isUndefined_1;
  var helperStringRepeat$2 = helperStringRepeat_1;
  function padStart$2(str, targetLength, padString) {
    var rest = toValueString$b(str);
    targetLength = targetLength >> 0;
    padString = isUndefined$4(padString) ? " " : "" + padString;
    if (rest.padStart) {
      return rest.padStart(targetLength, padString);
    }
    if (targetLength > rest.length) {
      targetLength -= rest.length;
      if (targetLength > padString.length) {
        padString += helperStringRepeat$2(padString, targetLength / padString.length);
      }
      return padString.slice(0, targetLength) + rest;
    }
    return rest;
  }
  var padStart_1 = padStart$2;
  var setupDefaults$2 = setupDefaults_1;
  var helperStringUpperCase$1 = helperStringUpperCase_1;
  var helperGetDateFullYear = helperGetDateFullYear_1;
  var helperGetDateMonth = helperGetDateMonth_1;
  var toStringDate$5 = toStringDate_1;
  var getYearWeek$1 = getYearWeek_1;
  var getYearDay$1 = getYearDay_1;
  var assign$5 = assign_1;
  var isValidDate$4 = isValidDate_1;
  var isFunction$1 = isFunction_1;
  var padStart$1 = padStart_1;
  function handleCustomTemplate(date, formats, match, value) {
    var format = formats[match];
    if (format) {
      if (isFunction$1(format)) {
        return format(value, match, date);
      } else {
        return format[value];
      }
    }
    return value;
  }
  var dateFormatRE = /\[([^\]]+)]|y{2,4}|M{1,2}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3}|Z{1,2}|W{1,2}|D{1,3}|[aAeEq]/g;
  function toDateString$2(date, format, options) {
    if (date) {
      date = toStringDate$5(date);
      if (isValidDate$4(date)) {
        var result = format || setupDefaults$2.parseDateFormat || setupDefaults$2.formatString;
        var hours = date.getHours();
        var apm = hours < 12 ? "am" : "pm";
        var formats = assign$5({}, setupDefaults$2.parseDateRules || setupDefaults$2.formatStringMatchs, options ? options.formats : null);
        var fy = function(match, length) {
          return ("" + helperGetDateFullYear(date)).substr(4 - length);
        };
        var fM = function(match, length) {
          return padStart$1(helperGetDateMonth(date) + 1, length, "0");
        };
        var fd = function(match, length) {
          return padStart$1(date.getDate(), length, "0");
        };
        var fH = function(match, length) {
          return padStart$1(hours, length, "0");
        };
        var fh = function(match, length) {
          return padStart$1(hours <= 12 ? hours : hours - 12, length, "0");
        };
        var fm = function(match, length) {
          return padStart$1(date.getMinutes(), length, "0");
        };
        var fs = function(match, length) {
          return padStart$1(date.getSeconds(), length, "0");
        };
        var fS = function(match, length) {
          return padStart$1(date.getMilliseconds(), length, "0");
        };
        var fZ = function(match, length) {
          var zoneHours = date.getTimezoneOffset() / 60 * -1;
          return handleCustomTemplate(date, formats, match, (zoneHours >= 0 ? "+" : "-") + padStart$1(zoneHours, 2, "0") + (length === 1 ? ":" : "") + "00");
        };
        var fW = function(match, length) {
          return padStart$1(handleCustomTemplate(date, formats, match, getYearWeek$1(date, (options ? options.firstDay : null) || setupDefaults$2.firstDayOfWeek)), length, "0");
        };
        var fD = function(match, length) {
          return padStart$1(handleCustomTemplate(date, formats, match, getYearDay$1(date)), length, "0");
        };
        var parseDates = {
          yyyy: fy,
          yy: fy,
          MM: fM,
          M: fM,
          dd: fd,
          d: fd,
          HH: fH,
          H: fH,
          hh: fh,
          h: fh,
          mm: fm,
          m: fm,
          ss: fs,
          s: fs,
          SSS: fS,
          S: fS,
          ZZ: fZ,
          Z: fZ,
          WW: fW,
          W: fW,
          DDD: fD,
          D: fD,
          a: function(match) {
            return handleCustomTemplate(date, formats, match, apm);
          },
          A: function(match) {
            return handleCustomTemplate(date, formats, match, helperStringUpperCase$1(apm));
          },
          e: function(match) {
            return handleCustomTemplate(date, formats, match, date.getDay());
          },
          E: function(match) {
            return handleCustomTemplate(date, formats, match, date.getDay());
          },
          q: function(match) {
            return handleCustomTemplate(date, formats, match, Math.floor((helperGetDateMonth(date) + 3) / 3));
          }
        };
        return result.replace(dateFormatRE, function(match, skip) {
          return skip || (parseDates[match] ? parseDates[match](match, match.length) : match);
        });
      }
      return "Invalid Date";
    }
    return "";
  }
  var toDateString_1 = toDateString$2;
  var helperGetDateTime$4 = helperGetDateTime_1;
  var helperNewDate$2 = helperNewDate_1;
  var now$2 = Date.now || function() {
    return helperGetDateTime$4(helperNewDate$2());
  };
  var now_1 = now$2;
  var helperGetDateTime$3 = helperGetDateTime_1;
  var now$1 = now_1;
  var toStringDate$4 = toStringDate_1;
  var isDate$2 = isDate_1;
  var timestamp$1 = function(str, format) {
    if (str) {
      var date = toStringDate$4(str, format);
      return isDate$2(date) ? helperGetDateTime$3(date) : date;
    }
    return now$1();
  };
  var timestamp_1 = timestamp$1;
  var toDateString$1 = toDateString_1;
  function isDateSame$1(date1, date2, format) {
    if (date1 && date2) {
      date1 = toDateString$1(date1, format);
      return date1 !== "Invalid Date" && date1 === toDateString$1(date2, format);
    }
    return false;
  }
  var isDateSame_1 = isDateSame$1;
  var helperCreateGetDateWeek = helperCreateGetDateWeek_1;
  var getMonthWeek$1 = helperCreateGetDateWeek(function(targetDate) {
    return new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
  }, function(date1, date2) {
    return date1.getMonth() !== date2.getMonth();
  });
  var getMonthWeek_1 = getMonthWeek$1;
  var getWhatYear$2 = getWhatYear_1;
  var toStringDate$3 = toStringDate_1;
  var isValidDate$3 = isValidDate_1;
  var isLeapYear$1 = isLeapYear_1;
  function getDayOfYear$1(date, year) {
    date = toStringDate$3(date);
    if (isValidDate$3(date)) {
      return isLeapYear$1(getWhatYear$2(date, year)) ? 366 : 365;
    }
    return NaN;
  }
  var getDayOfYear_1 = getDayOfYear$1;
  var staticDayTime = staticDayTime_1;
  var staticStrFirst = staticStrFirst_1;
  var staticStrLast = staticStrLast_1;
  var helperGetDateTime$2 = helperGetDateTime_1;
  var getWhatMonth$2 = getWhatMonth_1;
  var toStringDate$2 = toStringDate_1;
  var isValidDate$2 = isValidDate_1;
  function getDayOfMonth$1(date, month) {
    date = toStringDate$2(date);
    if (isValidDate$2(date)) {
      return Math.floor((helperGetDateTime$2(getWhatMonth$2(date, month, staticStrLast)) - helperGetDateTime$2(getWhatMonth$2(date, month, staticStrFirst))) / staticDayTime) + 1;
    }
    return NaN;
  }
  var getDayOfMonth_1 = getDayOfMonth$1;
  var helperGetDateTime$1 = helperGetDateTime_1;
  var helperNewDate$1 = helperNewDate_1;
  var toStringDate$1 = toStringDate_1;
  var isValidDate$1 = isValidDate_1;
  var dateDiffRules = [
    ["yyyy", 31536e6],
    ["MM", 2592e6],
    ["dd", 864e5],
    ["HH", 36e5],
    ["mm", 6e4],
    ["ss", 1e3],
    ["S", 0]
  ];
  function getDateDiff$1(startDate, endDate) {
    var startTime, endTime, item, diffTime, len2, index;
    var result = { done: false, time: 0 };
    startDate = toStringDate$1(startDate);
    endDate = endDate ? toStringDate$1(endDate) : helperNewDate$1();
    if (isValidDate$1(startDate) && isValidDate$1(endDate)) {
      startTime = helperGetDateTime$1(startDate);
      endTime = helperGetDateTime$1(endDate);
      if (startTime < endTime) {
        diffTime = result.time = endTime - startTime;
        result.done = true;
        for (index = 0, len2 = dateDiffRules.length; index < len2; index++) {
          item = dateDiffRules[index];
          if (diffTime >= item[1]) {
            if (index === len2 - 1) {
              result[item[0]] = diffTime || 0;
            } else {
              result[item[0]] = Math.floor(diffTime / item[1]);
              diffTime -= result[item[0]] * item[1];
            }
          } else {
            result[item[0]] = 0;
          }
        }
      }
    }
    return result;
  }
  var getDateDiff_1 = getDateDiff$1;
  var toValueString$a = toValueString_1;
  var isUndefined$3 = isUndefined_1;
  var helperStringRepeat$1 = helperStringRepeat_1;
  function padEnd$1(str, targetLength, padString) {
    var rest = toValueString$a(str);
    targetLength = targetLength >> 0;
    padString = isUndefined$3(padString) ? " " : "" + padString;
    if (rest.padEnd) {
      return rest.padEnd(targetLength, padString);
    }
    if (targetLength > rest.length) {
      targetLength -= rest.length;
      if (targetLength > padString.length) {
        padString += helperStringRepeat$1(padString, targetLength / padString.length);
      }
      return rest + padString.slice(0, targetLength);
    }
    return rest;
  }
  var padEnd_1 = padEnd$1;
  var toValueString$9 = toValueString_1;
  var helperStringRepeat = helperStringRepeat_1;
  function repeat$1(str, count) {
    return helperStringRepeat(toValueString$9(str), count);
  }
  var repeat_1 = repeat$1;
  var toValueString$8 = toValueString_1;
  function trimRight$2(str) {
    return str && str.trimRight ? str.trimRight() : toValueString$8(str).replace(/[\s\uFEFF\xA0]+$/g, "");
  }
  var trimRight_1 = trimRight$2;
  var toValueString$7 = toValueString_1;
  function trimLeft$2(str) {
    return str && str.trimLeft ? str.trimLeft() : toValueString$7(str).replace(/^[\s\uFEFF\xA0]+/g, "");
  }
  var trimLeft_1 = trimLeft$2;
  var trimRight$1 = trimRight_1;
  var trimLeft$1 = trimLeft_1;
  function trim$2(str) {
    return str && str.trim ? str.trim() : trimRight$1(trimLeft$1(str));
  }
  var trim_1 = trim$2;
  var staticEscapeMap$2 = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };
  var staticEscapeMap_1 = staticEscapeMap$2;
  var toValueString$6 = toValueString_1;
  var keys$2 = keys_1;
  function helperFormatEscaper$2(dataMap) {
    var replaceRegexp = new RegExp("(?:" + keys$2(dataMap).join("|") + ")", "g");
    return function(str) {
      return toValueString$6(str).replace(replaceRegexp, function(match) {
        return dataMap[match];
      });
    };
  }
  var helperFormatEscaper_1 = helperFormatEscaper$2;
  var staticEscapeMap$1 = staticEscapeMap_1;
  var helperFormatEscaper$1 = helperFormatEscaper_1;
  var escape$1 = helperFormatEscaper$1(staticEscapeMap$1);
  var _escape = escape$1;
  var staticEscapeMap = staticEscapeMap_1;
  var helperFormatEscaper = helperFormatEscaper_1;
  var each$2 = each_1;
  var unescapeMap = {};
  each$2(staticEscapeMap, function(item, key) {
    unescapeMap[staticEscapeMap[key]] = key;
  });
  var unescape$1 = helperFormatEscaper(unescapeMap);
  var _unescape = unescape$1;
  function helperStringSubstring$2(str, start, end) {
    return str.substring(start, end);
  }
  var helperStringSubstring_1 = helperStringSubstring$2;
  function helperStringLowerCase$2(str) {
    return str.toLowerCase();
  }
  var helperStringLowerCase_1 = helperStringLowerCase$2;
  var toValueString$5 = toValueString_1;
  var helperStringSubstring$1 = helperStringSubstring_1;
  var helperStringUpperCase = helperStringUpperCase_1;
  var helperStringLowerCase$1 = helperStringLowerCase_1;
  var camelCacheMaps = {};
  function camelCase$1(str) {
    str = toValueString$5(str);
    if (camelCacheMaps[str]) {
      return camelCacheMaps[str];
    }
    var strLen = str.length;
    var rest = str.replace(/([-]+)/g, function(text, flag, index) {
      return index && index + flag.length < strLen ? "-" : "";
    });
    strLen = rest.length;
    rest = rest.replace(/([A-Z]+)/g, function(text, upper, index) {
      var upperLen = upper.length;
      upper = helperStringLowerCase$1(upper);
      if (index) {
        if (upperLen > 2 && index + upperLen < strLen) {
          return helperStringUpperCase(helperStringSubstring$1(upper, 0, 1)) + helperStringSubstring$1(upper, 1, upperLen - 1) + helperStringUpperCase(helperStringSubstring$1(upper, upperLen - 1, upperLen));
        }
        return helperStringUpperCase(helperStringSubstring$1(upper, 0, 1)) + helperStringSubstring$1(upper, 1, upperLen);
      } else {
        if (upperLen > 1 && index + upperLen < strLen) {
          return helperStringSubstring$1(upper, 0, upperLen - 1) + helperStringUpperCase(helperStringSubstring$1(upper, upperLen - 1, upperLen));
        }
      }
      return upper;
    }).replace(/(-[a-zA-Z])/g, function(text, upper) {
      return helperStringUpperCase(helperStringSubstring$1(upper, 1, upper.length));
    });
    camelCacheMaps[str] = rest;
    return rest;
  }
  var camelCase_1 = camelCase$1;
  var toValueString$4 = toValueString_1;
  var helperStringSubstring = helperStringSubstring_1;
  var helperStringLowerCase = helperStringLowerCase_1;
  var kebabCacheMaps = {};
  function kebabCase$1(str) {
    str = toValueString$4(str);
    if (kebabCacheMaps[str]) {
      return kebabCacheMaps[str];
    }
    if (/^[A-Z]+$/.test(str)) {
      return helperStringLowerCase(str);
    }
    var rest = str.replace(/^([a-z])([A-Z]+)([a-z]+)$/, function(text, prevLower, upper, nextLower) {
      var upperLen = upper.length;
      if (upperLen > 1) {
        return prevLower + "-" + helperStringLowerCase(helperStringSubstring(upper, 0, upperLen - 1)) + "-" + helperStringLowerCase(helperStringSubstring(upper, upperLen - 1, upperLen)) + nextLower;
      }
      return helperStringLowerCase(prevLower + "-" + upper + nextLower);
    }).replace(/^([A-Z]+)([a-z]+)?$/, function(text, upper, nextLower) {
      var upperLen = upper.length;
      return helperStringLowerCase(helperStringSubstring(upper, 0, upperLen - 1) + "-" + helperStringSubstring(upper, upperLen - 1, upperLen) + (nextLower || ""));
    }).replace(/([a-z]?)([A-Z]+)([a-z]?)/g, function(text, prevLower, upper, nextLower, index) {
      var upperLen = upper.length;
      if (upperLen > 1) {
        if (prevLower) {
          prevLower += "-";
        }
        if (nextLower) {
          return (prevLower || "") + helperStringLowerCase(helperStringSubstring(upper, 0, upperLen - 1)) + "-" + helperStringLowerCase(helperStringSubstring(upper, upperLen - 1, upperLen)) + nextLower;
        }
      }
      return (prevLower || "") + (index ? "-" : "") + helperStringLowerCase(upper) + (nextLower || "");
    });
    rest = rest.replace(/([-]+)/g, function(text, flag, index) {
      return index && index + flag.length < rest.length ? "-" : "";
    });
    kebabCacheMaps[str] = rest;
    return rest;
  }
  var kebabCase_1 = kebabCase$1;
  var toValueString$3 = toValueString_1;
  function startsWith$1(str, val, startIndex) {
    var rest = toValueString$3(str);
    return (arguments.length === 1 ? rest : rest.substring(startIndex)).indexOf(val) === 0;
  }
  var startsWith_1 = startsWith$1;
  var toValueString$2 = toValueString_1;
  function endsWith$1(str, val, startIndex) {
    var rest = toValueString$2(str);
    var argsLen = arguments.length;
    return argsLen > 1 && (argsLen > 2 ? rest.substring(0, startIndex).indexOf(val) === startIndex - 1 : rest.indexOf(val) === rest.length - 1);
  }
  var endsWith_1 = endsWith$1;
  var setupDefaults$1 = setupDefaults_1;
  var toValueString$1 = toValueString_1;
  var trim$1 = trim_1;
  var get$1 = get_1;
  function template$2(str, args, options) {
    return toValueString$1(str).replace((options || setupDefaults$1).tmplRE || /\{{2}([.\w[\]\s]+)\}{2}/g, function(match, key) {
      return get$1(args, trim$1(key));
    });
  }
  var template_1 = template$2;
  var template$1 = template_1;
  function toFormatString$1(str, obj) {
    return template$1(str, obj, { tmplRE: /\{([.\w[\]\s]+)\}/g });
  }
  var toFormatString_1 = toFormatString$1;
  function noop$1() {
  }
  var noop_1 = noop$1;
  var slice$5 = slice_1;
  function bind$1(callback, context) {
    var args = slice$5(arguments, 2);
    return function() {
      return callback.apply(context, slice$5(arguments).concat(args));
    };
  }
  var bind_1 = bind$1;
  var slice$4 = slice_1;
  function once$1(callback, context) {
    var done = false;
    var rest = null;
    var args = slice$4(arguments, 2);
    return function() {
      if (done) {
        return rest;
      }
      rest = callback.apply(context, slice$4(arguments).concat(args));
      done = true;
      return rest;
    };
  }
  var once_1 = once$1;
  var slice$3 = slice_1;
  function after$1(count, callback, context) {
    var runCount = 0;
    var rests = [];
    return function() {
      var args = arguments;
      runCount++;
      if (runCount <= count) {
        rests.push(args[0]);
      }
      if (runCount >= count) {
        callback.apply(context, [rests].concat(slice$3(args)));
      }
    };
  }
  var after_1 = after$1;
  var slice$2 = slice_1;
  function before$1(count, callback, context) {
    var runCount = 0;
    var rests = [];
    context = context || this;
    return function() {
      var args = arguments;
      runCount++;
      if (runCount < count) {
        rests.push(args[0]);
        callback.apply(context, [rests].concat(slice$2(args)));
      }
    };
  }
  var before_1 = before$1;
  var assign$4 = assign_1;
  function throttle$1(callback, wait, options) {
    var args = null;
    var context = null;
    var runFlag = false;
    var timeout = null;
    var opts = assign$4({ leading: true, trailing: true }, options);
    var optLeading = opts.leading;
    var optTrailing = opts.trailing;
    var gcFn = function() {
      args = null;
      context = null;
    };
    var runFn = function() {
      runFlag = true;
      callback.apply(context, args);
      timeout = setTimeout(endFn, wait);
      gcFn();
    };
    var endFn = function() {
      timeout = null;
      if (runFlag) {
        gcFn();
        return;
      }
      if (optTrailing === true) {
        runFn();
        return;
      }
      gcFn();
    };
    var cancelFn = function() {
      var rest = timeout !== null;
      if (rest) {
        clearTimeout(timeout);
      }
      gcFn();
      timeout = null;
      runFlag = false;
      return rest;
    };
    var throttled = function() {
      args = arguments;
      context = this;
      runFlag = false;
      if (timeout === null && optLeading === true) {
        runFn();
        return;
      }
      if (optTrailing === true) {
        timeout = setTimeout(endFn, wait);
      }
    };
    throttled.cancel = cancelFn;
    return throttled;
  }
  var throttle_1 = throttle$1;
  var assign$3 = assign_1;
  function debounce$1(callback, wait, options) {
    var args = null;
    var context = null;
    var opts = typeof options === "boolean" ? { leading: options, trailing: !options } : assign$3({ leading: false, trailing: true }, options);
    var runFlag = false;
    var timeout = null;
    var optLeading = opts.leading;
    var optTrailing = opts.trailing;
    var gcFn = function() {
      args = null;
      context = null;
    };
    var runFn = function() {
      runFlag = true;
      callback.apply(context, args);
      gcFn();
    };
    var endFn = function() {
      if (optLeading === true) {
        timeout = null;
      }
      if (runFlag) {
        gcFn();
        return;
      }
      if (optTrailing === true) {
        runFn();
        return;
      }
      gcFn();
    };
    var cancelFn = function() {
      var rest = timeout !== null;
      if (rest) {
        clearTimeout(timeout);
      }
      gcFn();
      timeout = null;
      runFlag = false;
      return rest;
    };
    var debounced = function() {
      runFlag = false;
      args = arguments;
      context = this;
      if (timeout === null) {
        if (optLeading === true) {
          runFn();
        }
      } else {
        clearTimeout(timeout);
      }
      timeout = setTimeout(endFn, wait);
    };
    debounced.cancel = cancelFn;
    return debounced;
  }
  var debounce_1 = debounce$1;
  var slice$1 = slice_1;
  function delay$1(callback, wait) {
    var args = slice$1(arguments, 2);
    var context = this;
    return setTimeout(function() {
      callback.apply(context, args);
    }, wait);
  }
  var delay_1 = delay$1;
  var staticDecodeURIComponent$2 = decodeURIComponent;
  var staticDecodeURIComponent_1 = staticDecodeURIComponent$2;
  var staticDecodeURIComponent$1 = staticDecodeURIComponent_1;
  var arrayEach$3 = arrayEach_1;
  var isString$1 = isString_1;
  function unserialize$2(str) {
    var items;
    var result = {};
    if (str && isString$1(str)) {
      arrayEach$3(str.split("&"), function(param) {
        items = param.split("=");
        result[staticDecodeURIComponent$1(items[0])] = staticDecodeURIComponent$1(items[1] || "");
      });
    }
    return result;
  }
  var unserialize_1 = unserialize$2;
  var staticEncodeURIComponent$2 = encodeURIComponent;
  var staticEncodeURIComponent_1 = staticEncodeURIComponent$2;
  var staticEncodeURIComponent$1 = staticEncodeURIComponent_1;
  var each$1 = each_1;
  var isArray$2 = isArray_1;
  var isNull$1 = isNull_1;
  var isUndefined$2 = isUndefined_1;
  var isPlainObject$1 = isPlainObject_1;
  function stringifyParams(resultVal, resultKey, isArr) {
    var _arr;
    var result = [];
    each$1(resultVal, function(item, key) {
      _arr = isArray$2(item);
      if (isPlainObject$1(item) || _arr) {
        result = result.concat(stringifyParams(item, resultKey + "[" + key + "]", _arr));
      } else {
        result.push(staticEncodeURIComponent$1(resultKey + "[" + (isArr ? "" : key) + "]") + "=" + staticEncodeURIComponent$1(isNull$1(item) ? "" : item));
      }
    });
    return result;
  }
  function serialize$1(query) {
    var _arr;
    var params = [];
    each$1(query, function(item, key) {
      if (!isUndefined$2(item)) {
        _arr = isArray$2(item);
        if (isPlainObject$1(item) || _arr) {
          params = params.concat(stringifyParams(item, key, _arr));
        } else {
          params.push(staticEncodeURIComponent$1(key) + "=" + staticEncodeURIComponent$1(isNull$1(item) ? "" : item));
        }
      }
    });
    return params.join("&").replace(/%20/g, "+");
  }
  var serialize_1 = serialize$1;
  var staticStrUndefined$1 = staticStrUndefined_1;
  var staticLocation$4 = typeof location === staticStrUndefined$1 ? 0 : location;
  var staticLocation_1 = staticLocation$4;
  var staticLocation$3 = staticLocation_1;
  function helperGetLocatOrigin$2() {
    return staticLocation$3 ? staticLocation$3.origin || staticLocation$3.protocol + "//" + staticLocation$3.host : "";
  }
  var helperGetLocatOrigin_1 = helperGetLocatOrigin$2;
  var staticLocation$2 = staticLocation_1;
  var unserialize$1 = unserialize_1;
  var helperGetLocatOrigin$1 = helperGetLocatOrigin_1;
  function parseURLQuery(uri) {
    return unserialize$1(uri.split("?")[1] || "");
  }
  function parseUrl$2(url) {
    var hashs, portText, searchs, parsed;
    var href = "" + url;
    if (href.indexOf("//") === 0) {
      href = (staticLocation$2 ? staticLocation$2.protocol : "") + href;
    } else if (href.indexOf("/") === 0) {
      href = helperGetLocatOrigin$1() + href;
    }
    searchs = href.replace(/#.*/, "").match(/(\?.*)/);
    parsed = {
      href,
      hash: "",
      host: "",
      hostname: "",
      protocol: "",
      port: "",
      search: searchs && searchs[1] && searchs[1].length > 1 ? searchs[1] : ""
    };
    parsed.path = href.replace(/^([a-z0-9.+-]*:)\/\//, function(text, protocol) {
      parsed.protocol = protocol;
      return "";
    }).replace(/^([a-z0-9.+-]*)(:\d+)?\/?/, function(text, hostname, port) {
      portText = port || "";
      parsed.port = portText.replace(":", "");
      parsed.hostname = hostname;
      parsed.host = hostname + portText;
      return "/";
    }).replace(/(#.*)/, function(text, hash) {
      parsed.hash = hash.length > 1 ? hash : "";
      return "";
    });
    hashs = parsed.hash.match(/#((.*)\?|(.*))/);
    parsed.pathname = parsed.path.replace(/(\?|#.*).*/, "");
    parsed.origin = parsed.protocol + "//" + parsed.host;
    parsed.hashKey = hashs ? hashs[2] || hashs[1] || "" : "";
    parsed.hashQuery = parseURLQuery(parsed.hash);
    parsed.searchQuery = parseURLQuery(parsed.search);
    return parsed;
  }
  var parseUrl_1 = parseUrl$2;
  var staticLocation$1 = staticLocation_1;
  var helperGetLocatOrigin = helperGetLocatOrigin_1;
  var lastIndexOf$1 = lastIndexOf_1;
  function getBaseURL$1() {
    if (staticLocation$1) {
      var pathname = staticLocation$1.pathname;
      var lastIndex = lastIndexOf$1(pathname, "/") + 1;
      return helperGetLocatOrigin() + (lastIndex === pathname.length ? pathname : pathname.substring(0, lastIndex));
    }
    return "";
  }
  var getBaseURL_1 = getBaseURL$1;
  var staticLocation = staticLocation_1;
  var parseUrl$1 = parseUrl_1;
  function locat$1() {
    return staticLocation ? parseUrl$1(staticLocation.href) : {};
  }
  var locat_1 = locat$1;
  var setupDefaults = setupDefaults_1;
  var staticDocument$1 = staticDocument_1;
  var staticDecodeURIComponent = staticDecodeURIComponent_1;
  var staticEncodeURIComponent = staticEncodeURIComponent_1;
  var isArray$1 = isArray_1;
  var isObject$1 = isObject_1;
  var isDate$1 = isDate_1;
  var isUndefined$1 = isUndefined_1;
  var includes$1 = includes_1;
  var keys$1 = keys_1;
  var assign$2 = assign_1;
  var arrayEach$2 = arrayEach_1;
  var helperNewDate = helperNewDate_1;
  var helperGetDateTime = helperGetDateTime_1;
  var getWhatYear$1 = getWhatYear_1;
  var getWhatMonth$1 = getWhatMonth_1;
  var getWhatDay$1 = getWhatDay_1;
  function toCookieUnitTime(unit, expires) {
    var num = parseFloat(expires);
    var nowdate = helperNewDate();
    var time = helperGetDateTime(nowdate);
    switch (unit) {
      case "y":
        return helperGetDateTime(getWhatYear$1(nowdate, num));
      case "M":
        return helperGetDateTime(getWhatMonth$1(nowdate, num));
      case "d":
        return helperGetDateTime(getWhatDay$1(nowdate, num));
      case "h":
      case "H":
        return time + num * 60 * 60 * 1e3;
      case "m":
        return time + num * 60 * 1e3;
      case "s":
        return time + num * 1e3;
    }
    return time;
  }
  function toCookieUTCString(date) {
    return (isDate$1(date) ? date : new Date(date)).toUTCString();
  }
  function cookie$1(name, value, options) {
    if (staticDocument$1) {
      var opts, expires, values2, result, cookies, keyIndex;
      var inserts = [];
      var args = arguments;
      if (isArray$1(name)) {
        inserts = name;
      } else if (args.length > 1) {
        inserts = [assign$2({ name, value }, options)];
      } else if (isObject$1(name)) {
        inserts = [name];
      }
      if (inserts.length > 0) {
        arrayEach$2(inserts, function(obj) {
          opts = assign$2({}, setupDefaults.cookies, obj);
          values2 = [];
          if (opts.name) {
            expires = opts.expires;
            values2.push(staticEncodeURIComponent(opts.name) + "=" + staticEncodeURIComponent(isObject$1(opts.value) ? JSON.stringify(opts.value) : opts.value));
            if (expires) {
              if (isNaN(expires)) {
                expires = expires.replace(/^([0-9]+)(y|M|d|H|h|m|s)$/, function(text, num, unit) {
                  return toCookieUTCString(toCookieUnitTime(unit, num));
                });
              } else if (/^[0-9]{11,13}$/.test(expires) || isDate$1(expires)) {
                expires = toCookieUTCString(expires);
              } else {
                expires = toCookieUTCString(toCookieUnitTime("d", expires));
              }
              opts.expires = expires;
            }
            arrayEach$2(["expires", "path", "domain", "secure"], function(key) {
              if (!isUndefined$1(opts[key])) {
                values2.push(opts[key] && key === "secure" ? key : key + "=" + opts[key]);
              }
            });
          }
          staticDocument$1.cookie = values2.join("; ");
        });
        return true;
      } else {
        result = {};
        cookies = staticDocument$1.cookie;
        if (cookies) {
          arrayEach$2(cookies.split("; "), function(val) {
            keyIndex = val.indexOf("=");
            result[staticDecodeURIComponent(val.substring(0, keyIndex))] = staticDecodeURIComponent(val.substring(keyIndex + 1) || "");
          });
        }
        return args.length === 1 ? result[name] : result;
      }
    }
    return false;
  }
  function hasCookieItem(value) {
    return includes$1(cookieKeys(), value);
  }
  function getCookieItem(name) {
    return cookie$1(name);
  }
  function setCookieItem(name, value, options) {
    cookie$1(name, value, options);
    return cookie$1;
  }
  function removeCookieItem(name, options) {
    cookie$1(name, "", assign$2({ expires: -1 }, setupDefaults.cookies, options));
  }
  function cookieKeys() {
    return keys$1(cookie$1());
  }
  function cookieJson() {
    return cookie$1();
  }
  assign$2(cookie$1, {
    has: hasCookieItem,
    set: setCookieItem,
    setItem: setCookieItem,
    get: getCookieItem,
    getItem: getCookieItem,
    remove: removeCookieItem,
    removeItem: removeCookieItem,
    keys: cookieKeys,
    getJSON: cookieJson
  });
  var cookie_1 = cookie$1;
  var staticStrUndefined = staticStrUndefined_1;
  var staticDocument = staticDocument_1;
  var staticWindow = staticWindow_1;
  var assign$1 = assign_1;
  var arrayEach$1 = arrayEach_1;
  function isBrowseStorage(storage) {
    try {
      var testKey = "__xe_t";
      storage.setItem(testKey, 1);
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
  function isBrowseType(type) {
    return navigator.userAgent.indexOf(type) > -1;
  }
  function browse$1() {
    var $body, isChrome, isEdge;
    var isMobile = false;
    var isLocalStorage = false;
    var isSessionStorage = false;
    var result = {
      isNode: false,
      isMobile,
      isPC: false,
      isDoc: !!staticDocument
    };
    if (!staticWindow && typeof process !== staticStrUndefined) {
      result.isNode = true;
    } else {
      isEdge = isBrowseType("Edge");
      isChrome = isBrowseType("Chrome");
      isMobile = /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/.test(navigator.userAgent);
      if (result.isDoc) {
        $body = staticDocument.body || staticDocument.documentElement;
        arrayEach$1(["webkit", "khtml", "moz", "ms", "o"], function(core) {
          result["-" + core] = !!$body[core + "MatchesSelector"];
        });
      }
      try {
        isLocalStorage = isBrowseStorage(staticWindow.localStorage);
      } catch (e) {
      }
      try {
        isSessionStorage = isBrowseStorage(staticWindow.sessionStorage);
      } catch (e) {
      }
      assign$1(result, {
        edge: isEdge,
        firefox: isBrowseType("Firefox"),
        msie: !isEdge && result["-ms"],
        safari: !isChrome && !isEdge && isBrowseType("Safari"),
        isMobile,
        isPC: !isMobile,
        isLocalStorage,
        isSessionStorage
      });
    }
    return result;
  }
  var browse_1 = browse$1;
  var XEUtils = ctor;
  var assign = assign_1;
  var objectEach = objectEach_1;
  var lastObjectEach = lastObjectEach_1;
  var objectMap = objectMap_1;
  var merge = merge_1;
  var map = map_1;
  var some = some_1;
  var every = every_1;
  var includeArrays = includeArrays_1;
  var arrayEach = arrayEach_1;
  var lastArrayEach = lastArrayEach_1;
  var uniq = uniq_1;
  var union = union_1;
  var toArray = toArray_1;
  var sortBy = sortBy_1;
  var orderBy = orderBy_1;
  var shuffle = shuffle_1;
  var sample = sample_1;
  var slice = slice_1;
  var filter = filter_1;
  var findKey = findKey_1;
  var includes = includes_1;
  var find = find_1;
  var findLast = findLast_1;
  var reduce = reduce_1;
  var copyWithin = copyWithin_1;
  var chunk = chunk_1;
  var zip = zip_1;
  var unzip = unzip_1;
  var zipObject = zipObject_1;
  var flatten = flatten_1;
  var pluck = pluck_1;
  var invoke = invoke_1;
  var toArrayTree = toArrayTree_1;
  var toTreeArray = toTreeArray_1;
  var findTree = findTree_1;
  var eachTree = eachTree_1;
  var mapTree = mapTree_1;
  var filterTree = filterTree_1;
  var searchTree = searchTree_1;
  var arrayIndexOf = arrayIndexOf_1;
  var arrayLastIndexOf = arrayLastIndexOf_1;
  var hasOwnProp = hasOwnProp_1;
  var isArray = isArray_1;
  var isNull = isNull_1;
  var isNumberNaN = _isNaN;
  var isUndefined = isUndefined_1;
  var isFunction = isFunction_1;
  var isObject = isObject_1;
  var isString = isString_1;
  var isPlainObject = isPlainObject_1;
  var isLeapYear = isLeapYear_1;
  var isDate = isDate_1;
  var eqNull = eqNull_1;
  var each = each_1;
  var forOf = forOf_1;
  var lastForOf = lastForOf_1;
  var indexOf = indexOf_1;
  var lastIndexOf = lastIndexOf_1;
  var keys = keys_1;
  var values = values_1;
  var clone = clone_1;
  var getSize = getSize_1;
  var lastEach = lastEach_1;
  var remove = remove_1;
  var clear = clear_1;
  var isNumberFinite = _isFinite;
  var isFloat = isFloat_1;
  var isInteger = isInteger_1;
  var isBoolean = isBoolean_1;
  var isNumber = isNumber_1;
  var isRegExp = isRegExp_1;
  var isError = isError_1;
  var isTypeError = isTypeError_1;
  var isEmpty = isEmpty_1;
  var isSymbol = isSymbol_1;
  var isArguments = isArguments_1;
  var isElement = isElement_1;
  var isDocument = isDocument_1;
  var isWindow = isWindow_1;
  var isFormData = isFormData_1;
  var isMap = isMap_1;
  var isWeakMap = isWeakMap_1;
  var isSet = isSet_1;
  var isWeakSet = isWeakSet_1;
  var isMatch = isMatch_1;
  var isEqual = isEqual_1;
  var isEqualWith = isEqualWith_1;
  var getType = getType_1;
  var uniqueId = uniqueId_1;
  var findIndexOf = findIndexOf_1;
  var findLastIndexOf = findLastIndexOf_1;
  var toStringJSON = toStringJSON_1;
  var toJSONString = toJSONString_1;
  var entries = entries_1;
  var pick = pick_1;
  var omit = omit_1;
  var first = first_1;
  var last = last_1;
  var has = has_1;
  var get = get_1;
  var set = set_1;
  var groupBy = groupBy_1;
  var countBy = countBy_1;
  var range = range_1;
  var destructuring = destructuring_1;
  var random = random_1;
  var max = max_1;
  var min = min_1;
  var commafy = commafy_1;
  var round = round_1;
  var ceil = ceil_1;
  var floor = floor_1;
  var toFixed = toFixed_1;
  var toInteger = toInteger_1;
  var toNumber = toNumber_1;
  var toNumberString = toNumberString_1;
  var add = add_1;
  var subtract = subtract_1;
  var multiply = multiply_1;
  var divide = divide_1;
  var sum = sum_1;
  var mean = mean_1;
  var getWhatYear = getWhatYear_1;
  var getWhatQuarter = getWhatQuarter_1;
  var getWhatMonth = getWhatMonth_1;
  var getWhatDay = getWhatDay_1;
  var toStringDate = toStringDate_1;
  var toDateString = toDateString_1;
  var now = now_1;
  var timestamp = timestamp_1;
  var isValidDate = isValidDate_1;
  var isDateSame = isDateSame_1;
  var getWhatWeek = getWhatWeek_1;
  var getYearDay = getYearDay_1;
  var getYearWeek = getYearWeek_1;
  var getMonthWeek = getMonthWeek_1;
  var getDayOfYear = getDayOfYear_1;
  var getDayOfMonth = getDayOfMonth_1;
  var getDateDiff = getDateDiff_1;
  var padEnd = padEnd_1;
  var padStart = padStart_1;
  var repeat = repeat_1;
  var trim = trim_1;
  var trimRight = trimRight_1;
  var trimLeft = trimLeft_1;
  var escape = _escape;
  var unescape = _unescape;
  var camelCase = camelCase_1;
  var kebabCase = kebabCase_1;
  var startsWith = startsWith_1;
  var endsWith = endsWith_1;
  var template = template_1;
  var toFormatString = toFormatString_1;
  var toValueString = toValueString_1;
  var noop = noop_1;
  var property = property_1;
  var bind = bind_1;
  var once = once_1;
  var after = after_1;
  var before = before_1;
  var throttle = throttle_1;
  var debounce = debounce_1;
  var delay = delay_1;
  var unserialize = unserialize_1;
  var serialize = serialize_1;
  var parseUrl = parseUrl_1;
  var getBaseURL = getBaseURL_1;
  var locat = locat_1;
  var cookie = cookie_1;
  var browse = browse_1;
  assign(XEUtils, {
    // object
    assign,
    objectEach,
    lastObjectEach,
    objectMap,
    merge,
    // array
    uniq,
    union,
    sortBy,
    orderBy,
    shuffle,
    sample,
    some,
    every,
    slice,
    filter,
    find,
    findLast,
    findKey,
    includes,
    arrayIndexOf,
    arrayLastIndexOf,
    map,
    reduce,
    copyWithin,
    chunk,
    zip,
    unzip,
    zipObject,
    flatten,
    toArray,
    includeArrays,
    pluck,
    invoke,
    arrayEach,
    lastArrayEach,
    toArrayTree,
    toTreeArray,
    findTree,
    eachTree,
    mapTree,
    filterTree,
    searchTree,
    // base
    hasOwnProp,
    eqNull,
    isNaN: isNumberNaN,
    isFinite: isNumberFinite,
    isUndefined,
    isArray,
    isFloat,
    isInteger,
    isFunction,
    isBoolean,
    isString,
    isNumber,
    isRegExp,
    isObject,
    isPlainObject,
    isDate,
    isError,
    isTypeError,
    isEmpty,
    isNull,
    isSymbol,
    isArguments,
    isElement,
    isDocument,
    isWindow,
    isFormData,
    isMap,
    isWeakMap,
    isSet,
    isWeakSet,
    isLeapYear,
    isMatch,
    isEqual,
    isEqualWith,
    getType,
    uniqueId,
    getSize,
    indexOf,
    lastIndexOf,
    findIndexOf,
    findLastIndexOf,
    toStringJSON,
    toJSONString,
    keys,
    values,
    entries,
    pick,
    omit,
    first,
    last,
    each,
    forOf,
    lastForOf,
    lastEach,
    has,
    get,
    set,
    groupBy,
    countBy,
    clone,
    clear,
    remove,
    range,
    destructuring,
    // number
    random,
    min,
    max,
    commafy,
    round,
    ceil,
    floor,
    toFixed,
    toNumber,
    toNumberString,
    toInteger,
    add,
    subtract,
    multiply,
    divide,
    sum,
    mean,
    // date
    now,
    timestamp,
    isValidDate,
    isDateSame,
    toStringDate,
    toDateString,
    getWhatYear,
    getWhatQuarter,
    getWhatMonth,
    getWhatWeek,
    getWhatDay,
    getYearDay,
    getYearWeek,
    getMonthWeek,
    getDayOfYear,
    getDayOfMonth,
    getDateDiff,
    // string
    trim,
    trimLeft,
    trimRight,
    escape,
    unescape,
    camelCase,
    kebabCase,
    repeat,
    padStart,
    padEnd,
    startsWith,
    endsWith,
    template,
    toFormatString,
    toString: toValueString,
    toValueString,
    // function
    noop,
    property,
    bind,
    once,
    after,
    before,
    throttle,
    debounce,
    delay,
    // url
    unserialize,
    serialize,
    parseUrl,
    // web
    getBaseURL,
    locat,
    browse,
    cookie
  });
  var xeUtils = XEUtils;
  const formatPrice = (price = 0, opts = {}) => {
    const { digits = 2 } = opts;
    return xeUtils.commafy(Number(price) / 100, { digits });
  };
  const _imports_0$1 = "/static/images/tmp_goods.jpg";
  const _sfc_main$5 = {
    __name: "card-goods",
    setup(__props, { expose: __expose }) {
      __expose();
      const __returned__ = { get formatPrice() {
        return formatPrice;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "card-goods-item" }, [
      vue.createElementVNode("view", { class: "pic" }, [
        vue.createElementVNode("image", {
          class: "img",
          src: _imports_0$1,
          mode: "aspectFill"
        })
      ]),
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "title" }, "测试商品名称 Lorem ipsum, dolor sit amet consectetur adipisicing elit. "),
        vue.createElementVNode("view", { class: "price" }, [
          vue.createElementVNode("view", { class: "new" }, [
            vue.createElementVNode("view", { class: "unit" }, "¥"),
            vue.createElementVNode(
              "view",
              { class: "text" },
              vue.toDisplayString($setup.formatPrice(5688, { digits: 2 })),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode(
            "view",
            { class: "old" },
            "¥" + vue.toDisplayString($setup.formatPrice(12332, { digits: 2 })),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-953ea244"], ["__file", "D:/extest/IbukiSuikaShop-CLI/components/card-goods/card-goods.vue"]]);
  const _imports_0 = "/static/images/tmp_banner1.png";
  const _imports_1 = "/static/images/tmp_banner2.jpg";
  const _imports_2 = "/static/images/home_xydcj.png";
  const _sfc_main$4 = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const { headHeight } = useNavBarStyle();
      const searchValue = vue.ref("");
      const handleSearch = () => {
        formatAppLog("log", "at pages/index/index.vue:9", "搜索内容:", searchValue.value);
      };
      const menuList = vue.ref([
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
      const __returned__ = { headHeight, searchValue, handleSearch, menuList, ref: vue.ref, get useNavBarStyle() {
        return useNavBarStyle;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_mod_nav_bar = resolveEasycom(vue.resolveDynamicComponent("mod-nav-bar"), __easycom_0);
    const _component_scroll_notice = resolveEasycom(vue.resolveDynamicComponent("scroll-notice"), __easycom_1);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_2);
    const _component_card_goods = resolveEasycom(vue.resolveDynamicComponent("card-goods"), __easycom_3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-wrap" }, [
      vue.createVNode(_component_mod_nav_bar, {
        title: "首页",
        "title-color": "#ffffff"
      }),
      vue.createElementVNode("view", { class: "page-content" }, [
        vue.createElementVNode("view", { class: "banner" }, [
          vue.createElementVNode("swiper", {
            "indicator-dots": "",
            "indicator-color": "rgba(255, 255, 255, 0.5)",
            "indicator-active-color": "rgba(255, 255, 255, 1)",
            interval: "3000",
            autoplay: "",
            circular: "",
            class: "swiper"
          }, [
            vue.createElementVNode("swiper-item", { class: "swiper-item" }, [
              vue.createElementVNode("image", {
                class: "swiper-image",
                src: _imports_0,
                mode: "scaleToFill"
              })
            ]),
            vue.createElementVNode("swiper-item", { class: "swiper-item" }, [
              vue.createElementVNode("image", {
                class: "swiper-image",
                src: _imports_1,
                mode: "scaleToFill"
              })
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "notice" }, [
          vue.createVNode(_component_scroll_notice)
        ]),
        vue.createElementVNode("view", { class: "home-menu" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.menuList, (item) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: "item",
                  style: vue.normalizeStyle({ color: item.color }),
                  key: item.label
                },
                [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "icon",
                      style: vue.normalizeStyle({
                        background: `linear-gradient(to bottom, ${item.bg1}, ${item.bg2})`
                      })
                    },
                    [
                      vue.createElementVNode(
                        "text",
                        {
                          class: vue.normalizeClass(["iconfont", item.icon])
                        },
                        null,
                        2
                        /* CLASS */
                      )
                    ],
                    4
                    /* STYLE */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "label" },
                    vue.toDisplayString(item.label),
                    1
                    /* TEXT */
                  )
                ],
                4
                /* STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "prize" }, [
          vue.createElementVNode("image", {
            src: _imports_2,
            mode: "scaleToFill"
          })
        ]),
        vue.createElementVNode("view", { class: "hot" }, [
          vue.createElementVNode("view", { class: "page-title" }, [
            vue.createElementVNode("view", { class: "left" }, [
              vue.createElementVNode("view", { class: "left-line" }),
              vue.createElementVNode("view", { class: "name" }, "热销产品")
            ]),
            vue.createElementVNode("view", { class: "right" }, [
              vue.createElementVNode("view", { class: "more" }, "查看更多"),
              vue.createElementVNode("view", { class: "icon" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "right",
                  color: "#a6a6a6",
                  size: "24"
                })
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "hot-content" }, [
            vue.createElementVNode("view", { class: "list" }, [
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(10, (item) => {
                  return vue.createElementVNode("view", {
                    class: "item",
                    key: item
                  }, [
                    vue.createVNode(_component_card_goods)
                  ]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ])
          ])
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/extest/IbukiSuikaShop-CLI/pages/index/index.vue"]]);
  const _sfc_main$3 = {};
  function _sfc_render$2(_ctx, _cache) {
    const _component_mod_nav_bar = resolveEasycom(vue.resolveDynamicComponent("mod-nav-bar"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_mod_nav_bar, {
        title: "资讯",
        "title-color": "#ffffff"
      })
    ]);
  }
  const PagesNewsNews = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/extest/IbukiSuikaShop-CLI/pages/news/news.vue"]]);
  const _sfc_main$2 = {};
  function _sfc_render$1(_ctx, _cache) {
    const _component_mod_nav_bar = resolveEasycom(vue.resolveDynamicComponent("mod-nav-bar"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_mod_nav_bar, {
        title: "我的",
        "title-color": "#ffffff"
      })
    ]);
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/extest/IbukiSuikaShop-CLI/pages/my/my.vue"]]);
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache) {
    const _component_mod_nav_bar = resolveEasycom(vue.resolveDynamicComponent("mod-nav-bar"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_mod_nav_bar, {
        title: "商品分类",
        "title-color": "#ffffff"
      })
    ]);
  }
  const PagesShopCategory = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/extest/IbukiSuikaShop-CLI/pages/shop/category.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/news/news", PagesNewsNews);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/shop/category", PagesShopCategory);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/extest/IbukiSuikaShop-CLI/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
