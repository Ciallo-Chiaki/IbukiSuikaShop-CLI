"use strict";
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return expectsLowerCase ? (val) => set2.has(val.toLowerCase()) : (val) => set2.has(val);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove$3 = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$t = Array.isArray;
const isMap$2 = (val) => toTypeString(val) === "[object Map]";
const isSet$2 = (val) => toTypeString(val) === "[object Set]";
const isFunction$f = (val) => typeof val === "function";
const isString$a = (val) => typeof val === "string";
const isSymbol$3 = (val) => typeof val === "symbol";
const isObject$5 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$5(val) || isFunction$f(val)) && isFunction$f(val.then) && isFunction$f(val.catch);
};
const objectToString$3 = Object.prototype.toString;
const toTypeString = (value) => objectToString$3.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$8 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$a(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s2 = str ? `on${capitalize(str)}` : ``;
  return s2;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const toNumber$8 = (val) => {
  const n2 = isString$a(val) ? Number(val) : NaN;
  return isNaN(n2) ? val : n2;
};
function normalizeStyle(value) {
  if (isArray$t(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$a(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$a(value) || isObject$5(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$a(value)) {
    res = value;
  } else if (isArray$t(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$5(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString$a(val) ? val : val == null ? "" : isArray$t(val) || isObject$5(val) && (val.toString === objectToString$3 || !isFunction$f(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap$2(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries2, [key, val2], i) => {
          entries2[stringifySymbol(key, i) + " =>"] = val2;
          return entries2;
        },
        {}
      )
    };
  } else if (isSet$2(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol$3(val)) {
    return stringifySymbol(val);
  } else if (isObject$5(val) && !isArray$t(val) && !isPlainObject$8(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return isSymbol$3(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
};
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith$2(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  const lang = startsWith$2(locale, locales);
  if (lang) {
    return lang;
  }
}
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_SHARE_CHAT = "onShareChat";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const VIRTUAL_HOST_STYLE = "virtualHostStyle";
const VIRTUAL_HOST_CLASS = "virtualHostClass";
const VIRTUAL_HOST_HIDDEN = "virtualHostHidden";
const VIRTUAL_HOST_ID = "virtualHostId";
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once$2(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString$a(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject$8(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject$8(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction$f(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once$2((app, createErrorHandler2) => {
  return createErrorHandler2(app);
});
const E = function() {
};
E.prototype = {
  _id: 1,
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx,
      _id: this._id
    });
    return this._id++;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, event) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && event) {
      for (var i = evts.length - 1; i >= 0; i--) {
        if (evts[i].fn === event || evts[i].fn._ === event || evts[i]._id === event) {
          evts.splice(i, 1);
          break;
        }
      }
      liveEvents = evts;
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
/**
* @dcloudio/uni-mp-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last2 = this.parent.scopes.pop();
        if (last2 && last2 !== this) {
          this.parent.scopes[this.index] = last2;
          last2.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else {
    warn$2(
      `onScopeDispose() is called when there is no active effect scope to be associated with.`
    );
  }
}
let activeEffect;
class ReactiveEffect {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i = 0; i < this._depsLength; i++) {
        const dep = this.deps[i];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v) {
    this._dirtyLevel = v ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
      cleanupDepEffect(effect2.deps[i], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last2 = trackStack.pop();
  shouldTrack = last2 === void 0 ? true : last2;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type,
        key
      }
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$t(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol$3(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$t(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap$2(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$t(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap$2(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap$2(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        {
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
function getDepFromReactive(object, key) {
  var _a;
  return (_a = targetMap.get(object)) == null ? void 0 : _a.get(key);
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol$3)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$t(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol$3(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$5(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$t(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray$t(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol$3(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$t(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$6(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$3(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add$2(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear$3() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap$2(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap$2(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$6(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$3,
    add: add$2,
    set: set$1$1,
    delete: deleteEntry,
    clear: clear$3,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$6(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$3,
    add: add$2,
    set: set$1$1,
    delete: deleteEntry,
    clear: clear$3,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$6(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$3.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$6(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$3.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    warn$2(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$5(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$5(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$5(value) ? readonly(value) : value;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self = toRaw(this);
    if ((!self._cacheable || self.effect.dirty) && hasChanged(self._value, self._value = self.effect.run())) {
      triggerRefValue(self, 4);
    }
    trackRefValue(self);
    if (self.effect._dirtyLevel >= 2) {
      if (this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self, 2);
    }
    return self._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v) {
    this.effect.dirty = v;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$f(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn$2("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  if (!isProxy(object)) {
    warn$2(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray$t(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this.__v_isRef = true;
    this.__v_isReadonly = true;
  }
  get value() {
    return this._getter();
  }
}
function toRef(source, key, defaultValue) {
  if (isRef(source)) {
    return source;
  } else if (isFunction$f(source)) {
    return new GetterRefImpl(source);
  } else if (isObject$5(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last2 = normalizedStack[0];
    if (last2 && last2.vnode === currentVNode) {
      last2.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys2 = Object.keys(props);
  keys2.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys2.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString$a(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$f(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$f(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values2 = [];
  for (let i = 0; i < fn.length; i++) {
    values2.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values2;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue$1 = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue$1[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue$1.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i = queue$1.indexOf(job);
  if (i > flushIndex) {
    queue$1.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$t(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue$1.length; i++) {
    const cb = queue$1[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue$1.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
      const job = queue$1[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue$1.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue$1.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction$f(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim: trim2 } = props[modifiersKey] || EMPTY_OBJ;
    if (trim2) {
      args = rawArgs.map((a) => isString$a(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$f(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$5(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$t(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$5(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(
      `resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction$f(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once: once2,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once2) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(
      `Invalid watch source: `,
      s2,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$t(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return reactiveGetter(s2);
      } else if (isFunction$f(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction$f(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove$3(scope.effects, effect2);
    }
  };
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$a(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$f(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen) {
  if (!isObject$5(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray$t(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, currentDepth, seen);
    }
  } else if (isSet$2(value) || isMap$2(value)) {
    value.forEach((v) => {
      traverse(v, depth, currentDepth, seen);
    });
  } else if (isPlainObject$8(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$f(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$5(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version: version$1,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction$f(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction$f(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin2) {
        {
          if (!context.mixins.includes(mixin2)) {
            context.mixins.push(mixin2);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin2.name ? `: ${mixin2.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$f(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
function hasInjectionContext() {
  return !!(currentInstance || currentRenderingInstance || currentApp);
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove$3(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(
      (ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, "")
    );
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`
    );
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
function getComponentInternalInstance(i) {
  return i;
}
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    // fixed by xxxxxx
    $: getComponentInternalInstance,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i) => i.__$el || (i.__$el = {}),
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      i.effect.dirty = true;
      queueJob(i.update);
    }),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString$a(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props) {
  return isArray$t(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  function initInjections() {
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
  }
  {
    initInjections();
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$f(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction$f(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject$5(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$f(opt) ? opt.bind(publicThis, publicThis) : isFunction$f(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction$f(opt) && isFunction$f(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v) => c2.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  function initProvides() {
    if (provideOptions) {
      const provides = isFunction$f(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    initProvides();
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$t(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$t(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$t(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$5(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$t(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$a(raw)) {
    const handler = ctx[raw];
    if (isFunction$f(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction$f(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$5(raw)) {
    if (isArray$t(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction$f(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$f(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m2) => mergeOptions(resolved, m2, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$5(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m2) => mergeOptions(to, m2, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction$f(to) ? to.call(this, this) : to,
      isFunction$f(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$t(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$t(to) && isArray$t(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext() && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue$1(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue$1(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue$1(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue$1(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction$f(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$f(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys2)
        needCastKeys.push(...keys2);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$5(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$t(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString$a(raw[i])) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$5(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$t(opt) || isFunction$f(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$5(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType$3(ctor2) {
  if (ctor2 === null) {
    return "null";
  }
  if (typeof ctor2 === "function") {
    return ctor2.name || "";
  } else if (typeof ctor2 === "object") {
    const name = ctor2.constructor && ctor2.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a, b) {
  return getType$3(a) === getType$3(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$t(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction$f(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp$1(
      key,
      resolvedValues[key],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
    );
  }
}
function validateProp$1(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray$t(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage$1(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$3(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$5(value);
  } else if (expectedType === "Array") {
    valid = isArray$t(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$4(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$4(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null,
    // fixed by xxxxxx 用于存储uni-app的元素缓存
    $uniElements: /* @__PURE__ */ new Map(),
    $templateUniElementRefs: [],
    $templateUniElementStyles: {},
    $eS: {},
    $eA: {}
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  internalSetCurrentInstance = (i) => {
    currentInstance = i;
  };
  setInSSRSetupState = (v) => {
    isInSSRComponentSetup = v;
  };
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        shallowReadonly(instance.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(
          `setup() returned a Promise, but the version of Vue you are using does not support it yet.`
        );
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$f(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$5(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions$1(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray$t(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction$f(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  const c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    const i = getCurrentInstance();
    if (i && i.appContext.config.warnRecursiveComputed) {
      c2._warnRecursive = true;
    }
  }
  return c2;
};
const version$1 = "3.4.21";
const warn = warn$1;
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            if (currentValue.length < preValue.length) {
              setResult(
                result,
                (path == "" ? "" : path + ".") + key,
                currentValue
              );
            } else {
              currentValue.forEach((item, index2) => {
                _diff(
                  item,
                  preValue[index2],
                  (path == "" ? "" : path + ".") + key + "[" + index2 + "]",
                  result
                );
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            for (let subKey in currentValue) {
              _diff(
                currentValue[subKey],
                preValue[subKey],
                (path == "" ? "" : path + ".") + key + "." + subKey,
                result
              );
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue$1.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone$4(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray$t(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone$4(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone$4(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone$4(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys2) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys2.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  data.$eS = instance.$eS || {};
  data.$eA = instance.$eA || {};
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys2 = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys2));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(
    options,
    instance,
    publicThis
  );
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys2 = Object.keys(computedOptions);
    if (keys2.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys2);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const {
    setupState,
    $templateRefs,
    $templateUniElementRefs,
    ctx: { $scope, $mpPlatform }
  } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$scope || !$templateRefs && !$templateUniElementRefs) {
    return;
  }
  if (isUnmount) {
    $templateRefs && $templateRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    $templateUniElementRefs && $templateUniElementRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    return;
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    if (refs.length === 0) {
      return [];
    }
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat(
        $scope.selectAllComponents(".r-i-f") || []
      )
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    if ($templateRefs) {
      const refs = doSetByRefs($templateRefs);
      if (refs.length && instance.proxy && instance.proxy.$scope) {
        instance.proxy.$scope.setData({ r1: 1 }, () => {
          doSetByRefs(refs);
        });
      }
    }
  };
  if ($templateUniElementRefs && $templateUniElementRefs.length) {
    nextTick(instance, () => {
      $templateUniElementRefs.forEach((templateRef) => {
        if (isArray$t(templateRef.v)) {
          templateRef.v.forEach((v) => {
            setTemplateRef(templateRef, v, setupState);
          });
        } else {
          setTemplateRef(templateRef, templateRef.v, setupState);
        }
      });
    });
  }
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject$5(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find(
    (com) => com && (com.properties || com.props).uI === id
  );
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction$f(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString$a(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray$t(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          if (refValue.$) {
            onBeforeUnmount(() => remove$3(existing, refValue), refValue.$);
          }
        }
      } else if (_isString) {
        if (hasOwn(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  instance.renderer = options.mpType ? options.mpType : "component";
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const {
    type: Component2,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    uid: uid2,
    appContext: {
      app: {
        config: {
          globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 }
        }
      }
    },
    inheritAttrs
  } = instance;
  instance.$uniElementIds = /* @__PURE__ */ new Map();
  instance.$templateRefs = [];
  instance.$templateUniElementRefs = [];
  instance.$templateUniElementStyles = {};
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(
        proxyToUse,
        proxyToUse,
        renderCache,
        props,
        setupState,
        data,
        ctx
      );
    } else {
      fallthroughAttrs(
        inheritAttrs,
        props,
        propsOptions,
        Component2.props ? attrs : getFunctionalFallthrough(attrs)
      );
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys2 = Object.keys(fallthroughAttrs2).filter(
      (key) => key !== "class" && key !== "style"
    );
    if (!keys2.length) {
      return;
    }
    if (propsOptions && keys2.some(isModelListener)) {
      keys2.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys2.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString$a(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(
        data,
        oldScopedSlotData[index2]
      );
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(
    instance
  );
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u) {
        queuePostRenderEffect(u);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect2 = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    NOOP,
    () => queueJob(update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = () => {
    if (effect2.dirty) {
      effect2.run();
    }
  };
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect2.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect2.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  {
    update();
  }
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  {
    const parentInstance = instance.parent;
    if (parentInstance) {
      const $children = parentInstance.ctx.$children;
      const target = getExposeProxy(instance) || instance.proxy;
      const index2 = $children.indexOf(target);
      if (index2 > -1) {
        $children.splice(index2, 1);
      }
    }
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode2 = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent22(initialVNode, options) {
    return mountComponent(createVNode2(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(
      createVNode2({ type: rootComponent }),
      {
        mpType: "app",
        mpInstance: null,
        parentComponent: null,
        slots: [],
        props: null
      }
    );
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version$1);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function useCssVars(getter) {
  const instance = getCurrentInstance();
  if (!instance) {
    warn(`useCssVars is called without current active component instance.`);
    return;
  }
  initCssVarsRender(instance, getter);
}
function initCssVarsRender(instance, getter) {
  instance.ctx.__cssVars = () => {
    const vars = getter(instance.proxy);
    const cssVars = {};
    for (const key in vars) {
      cssVars[`--${key}`] = vars[key];
    }
    return cssVars;
  };
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction$f(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component" || // instance.renderer 标识页面是否作为组件渲染
  mpType === "page" && instance.renderer === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray$t(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set$3(target, key, val) {
  return target[key] = val;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  const userErrorHandler = app.config.errorHandler;
  return function errorHandler(err, instance, info) {
    if (userErrorHandler) {
      userErrorHandler(err, instance, info);
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    if (appInstance[ON_ERROR]) {
      {
        appInstance.proxy.$callHook(ON_ERROR, err);
      }
    } else {
      logError(err, info, instance ? instance.$.vnode : null, false);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set$3;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined" && typeof global[method] !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function stringifyStyle(value) {
  if (isString$a(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString$a(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq" || ctx.$mpPlatform === "mp-xhs") && (isString$a(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (instance && instance.ctx.$getTriggerEventDetail) {
      if (typeof e2.detail === "number") {
        e2.detail = instance.ctx.$getTriggerEventDetail(e2.detail);
      }
    }
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke2 = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke2);
    } else {
      const res = invoke2();
      if (e2.type === "input" && (isArray$t(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event, instance) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject$8(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject$8(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$t(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray$t(source) || isString$a(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i);
    }
  } else if (isObject$5(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, i));
    } else {
      const keys2 = Object.keys(source);
      ret = new Array(keys2.length);
      for (let i = 0, l = keys2.length; i < l; i++) {
        const key = keys2[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
function withModelModifiers(fn, { number, trim: trim2 }, isComponent = false) {
  if (isComponent) {
    return (...args) => {
      if (trim2) {
        args = args.map((a) => a.trim());
      } else if (number) {
        args = args.map(toNumber$8);
      }
      return fn(...args);
    };
  }
  return (event) => {
    const value = event.detail.value;
    if (trim2) {
      event.detail.value = value.trim();
    } else if (number) {
      event.detail.value = toNumber$8(value);
    }
    return fn(event);
  };
}
const o = (value, key) => vOn(value, key);
const f = (source, renderItem) => vFor(source, renderItem);
const s = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n = (value) => normalizeClass(value);
const t = (val) => toDisplayString(val);
const p = (props) => renderProps(props);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
const m = (fn, modifiers, isComponent = false) => withModelModifiers(fn, modifiers, isComponent);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
function getLocaleLanguage$1() {
  var _a;
  let localeLanguage = "";
  {
    const appBaseInfo = ((_a = wx.getAppBaseInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString$a(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray$t(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp(name, value, prop, isAbsent) {
  if (!isPlainObject$8(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray$t(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType(value, type) {
  let valid;
  const expectedType = getType$2(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$5(value);
  } else if (expectedType === "Array") {
    valid = isArray$t(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean$3(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$2(ctor2) {
  const match = ctor2 && ctor2.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$3(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction$f(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject$8(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction$f(success);
  const hasFail = isFunction$f(fail);
  const hasComplete = isFunction$f(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction$f(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction$f(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue(hooks, data, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray$t(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue(hooks, res, options).then((res2) => {
        return isFunction$f(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray$t(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray$t(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray$t(interceptor.invoke)) {
      const res = queue(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject$8(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction$f(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, extend({}, args), rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend({}, args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  args[0];
  {
    return;
  }
}
function invokeSuccess(id, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
  const errMsgPrefix = name + ":fail";
  let apiErrMsg = "";
  if (!errMsg) {
    apiErrMsg = errMsgPrefix;
  } else if (errMsg.indexOf(errMsgPrefix) === 0) {
    apiErrMsg = errMsg;
  } else {
    apiErrMsg = errMsgPrefix + " " + errMsg;
  }
  {
    delete errRes.errCode;
  }
  let res = extend({ errMsg: apiErrMsg }, errRes);
  return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  const errMsg = formatApiArgs(args);
  if (errMsg) {
    return errMsg;
  }
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString$a(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    if (typeof globalThis === "undefined" || !globalThis.harmonyChannel) {
      console.error(errMsg.message + "\n" + errMsg.stack);
    }
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  var _a, _b;
  let windowWidth, pixelRatio, platform;
  {
    const windowInfo = ((_a = wx.getWindowInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const deviceInfo = ((_b = wx.getDeviceInfo) === null || _b === void 0 ? void 0 : _b.call(wx)) || wx.getSystemInfoSync();
    windowWidth = windowInfo.windowWidth;
    pixelRatio = windowInfo.pixelRatio;
    platform = deviceInfo.platform;
  }
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
function __f__(type, filename, ...args) {
  if (filename) {
    args.push(filename);
  }
  console[type].apply(console, args);
}
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction$f(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray$t(hooks) && isFunction$f(hook)) {
      remove$3(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray$t(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString$a(method) && isPlainObject$8(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject$8(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString$a(method)) {
    if (isPlainObject$8(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject$8(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: [Function, Number]
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
class EventBus {
  constructor() {
    this.$emitter = new E$1();
  }
  on(name, callback) {
    return this.$emitter.on(name, callback);
  }
  once(name, callback) {
    return this.$emitter.once(name, callback);
  }
  off(name, callback) {
    if (!name) {
      this.$emitter.e = {};
      return;
    }
    this.$emitter.off(name, callback);
  }
  emit(name, ...args) {
    this.$emitter.emit(name, ...args);
  }
}
const eventBus = new EventBus();
const $on = defineSyncApi(API_ON, (name, callback) => {
  eventBus.on(name, callback);
  return () => eventBus.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  eventBus.once(name, callback);
  return () => eventBus.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!isArray$t(name))
    name = name ? [name] : [];
  name.forEach((n2) => {
    eventBus.off(n2, callback);
  });
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  eventBus.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|__f__|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|rpx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const TASK_APIS = ["request", "downloadFile", "uploadFile", "connectSocket"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function isTaskApi(name) {
  return TASK_APIS.indexOf(name) !== -1;
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction$f(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction$f(options.success) || isFunction$f(options.fail) || isFunction$f(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, extend({}, options), rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject$8(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction$f(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction$f(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString$a(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject$8(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction$f(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction$f(fromArgs)) {
      if (isFunction$f(argsOption)) {
        argsOption(fromArgs, {});
      }
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction$f(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    const realKeepReturnValue = keepReturnValue || false;
    return processArgs(methodName, res, returnValue, {}, realKeepReturnValue);
  }
  return function wrapper(methodName, method) {
    const hasProtocol = hasOwn(protocols2, methodName);
    if (!hasProtocol && typeof wx[methodName] !== "function") {
      return method;
    }
    const needWrapper = hasProtocol || isFunction$f(protocols2.returnValue) || isContextApi(methodName) || isTaskApi(methodName);
    const hasMethod = hasProtocol || isFunction$f(method);
    if (!hasProtocol && !method) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    if (!needWrapper || !hasMethod) {
      return method;
    }
    const protocol = protocols2[methodName];
    return function(arg1, arg2) {
      let options = protocol || {};
      if (isFunction$f(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isContextApi(methodName) || isTaskApi(methodName)) {
        if (returnValue && !returnValue.__v_skip) {
          returnValue.__v_skip = true;
        }
      }
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction$f(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return getLocaleLanguage$1();
};
const setLocale = (locale) => {
  const app = isFunction$f(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function getOSInfo(system, platform) {
  let osName = "";
  let osVersion = "";
  if (platform && false) {
    osName = platform;
    osVersion = system;
  } else {
    osName = system.split(" ")[0] || platform;
    osVersion = system.split(" ")[1] || "";
  }
  osName = osName.toLowerCase();
  switch (osName) {
    case "harmony":
    case "ohos":
    case "openharmony":
      osName = "harmonyos";
      break;
    case "iphone os":
      osName = "ios";
      break;
    case "mac":
    case "darwin":
      osName = "macos";
      break;
    case "windows_nt":
      osName = "windows";
      break;
  }
  return {
    osName,
    osVersion
  };
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  const { osName, osVersion } = getOSInfo(system, platform);
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = (language || "").replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__0A02249",
    appName: "IbukiSuikaShop-CLI",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.75",
    uniCompilerVersion: "4.75",
    uniRuntimeVersion: "4.75",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName,
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0,
    isUniAppX: false
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray$t(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model, system = "", platform = "" } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    const { osName, osVersion } = getOSInfo(system, platform);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model,
      osName,
      osVersion
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = (language || "").replace(/_/g, "-");
    const parameters = {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__0A02249",
      appName: "IbukiSuikaShop-CLI",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      isUniAppX: false,
      uniPlatform: "mp-weixin",
      uniCompileVersion: "4.75",
      uniCompilerVersion: "4.75",
      uniRuntimeVersion: "4.75"
    };
    extend(toRes, parameters);
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const onError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        wx.$onErrorHandlers = [];
      }
      wx.$onErrorHandlers.push(fromArgs);
    } else {
      injectHook(ON_ERROR, fromArgs, app.$vm.$);
    }
  }
};
const offError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        return;
      }
      const index2 = wx.$onErrorHandlers.findIndex((fn) => fn === fromArgs);
      if (index2 !== -1) {
        wx.$onErrorHandlers.splice(index2, 1);
      }
    } else if (fromArgs.__weh) {
      const onErrors = app.$vm.$[ON_ERROR];
      if (onErrors) {
        const index2 = onErrors.indexOf(fromArgs.__weh);
        if (index2 > -1) {
          onErrors.splice(index2, 1);
        }
      }
    }
  }
};
const onSocketOpen = {
  args() {
    if (wx.__uni_console__) {
      if (wx.__uni_console_warned__) {
        return;
      }
      wx.__uni_console_warned__ = true;
      console.warn(`开发模式下小程序日志回显会使用 socket 连接，为了避免冲突，建议使用 SocketTask 的方式去管理 WebSocket 或手动关闭日志回显功能。[详情](https://uniapp.dcloud.net.cn/tutorial/run/mp-log.html)`);
    }
  }
};
const onSocketMessage = onSocketOpen;
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  rpx2px: upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback,
  __f__
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction$f(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction$f(fail) && fail(res);
    }
    isFunction$f(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    if (component.$scope) {
      return oldIn.call(this, component.$scope);
    }
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
if (!wx$2.canIUse("getAppBaseInfo")) {
  wx$2.getAppBaseInfo = wx$2.getSystemInfoSync;
}
if (!wx$2.canIUse("getWindowInfo")) {
  wx$2.getWindowInfo = wx$2.getSystemInfoSync;
}
if (!wx$2.canIUse("getDeviceInfo")) {
  wx$2.getDeviceInfo = wx$2.getSystemInfoSync;
}
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  offError,
  onError,
  onSocketMessage,
  onSocketOpen,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
function initRuntimeSocket(hosts, port, id) {
  if (hosts == "" || port == "" || id == "")
    return Promise.resolve(null);
  return hosts.split(",").reduce((promise, host2) => {
    return promise.then((socket) => {
      if (socket != null)
        return Promise.resolve(socket);
      return tryConnectSocket(host2, port, id);
    });
  }, Promise.resolve(null));
}
const SOCKET_TIMEOUT = 500;
function tryConnectSocket(host2, port, id) {
  return new Promise((resolve2, reject) => {
    const socket = index.connectSocket({
      url: `ws://${host2}:${port}/${id}`,
      multiple: true,
      // 支付宝小程序 是否开启多实例
      fail() {
        resolve2(null);
      }
    });
    const timer = setTimeout(() => {
      socket.close({
        code: 1006,
        reason: "connect timeout"
      });
      resolve2(null);
    }, SOCKET_TIMEOUT);
    socket.onOpen((e2) => {
      clearTimeout(timer);
      resolve2(socket);
    });
    socket.onClose((e2) => {
      clearTimeout(timer);
      resolve2(null);
    });
    socket.onError((e2) => {
      clearTimeout(timer);
      resolve2(null);
    });
  });
}
const CONSOLE_TYPES = ["log", "warn", "error", "info", "debug"];
const originalConsole = /* @__PURE__ */ CONSOLE_TYPES.reduce((methods, type) => {
  methods[type] = console[type].bind(console);
  return methods;
}, {});
let sendError = null;
const errorQueue = /* @__PURE__ */ new Set();
const errorExtra = {};
function sendErrorMessages(errors) {
  if (sendError == null) {
    errors.forEach((error) => {
      errorQueue.add(error);
    });
    return;
  }
  const data = errors.map((err) => {
    if (typeof err === "string") {
      return err;
    }
    const isPromiseRejection = err && "promise" in err && "reason" in err;
    const prefix = isPromiseRejection ? "UnhandledPromiseRejection: " : "";
    if (isPromiseRejection) {
      err = err.reason;
    }
    if (err instanceof Error && err.stack) {
      if (err.message && !err.stack.includes(err.message)) {
        return `${prefix}${err.message}
${err.stack}`;
      }
      return `${prefix}${err.stack}`;
    }
    if (typeof err === "object" && err !== null) {
      try {
        return prefix + JSON.stringify(err);
      } catch (err2) {
        return prefix + String(err2);
      }
    }
    return prefix + String(err);
  }).filter(Boolean);
  if (data.length > 0) {
    sendError(JSON.stringify(Object.assign({
      type: "error",
      data
    }, errorExtra)));
  }
}
function setSendError(value, extra = {}) {
  sendError = value;
  Object.assign(errorExtra, extra);
  if (value != null && errorQueue.size > 0) {
    const errors = Array.from(errorQueue);
    errorQueue.clear();
    sendErrorMessages(errors);
  }
}
function initOnError() {
  function onError2(error) {
    try {
      if (typeof PromiseRejectionEvent !== "undefined" && error instanceof PromiseRejectionEvent && error.reason instanceof Error && error.reason.message && error.reason.message.includes(`Cannot create property 'errMsg' on string 'taskId`)) {
        return;
      }
      if (true) {
        originalConsole.error(error);
      }
      sendErrorMessages([error]);
    } catch (err) {
      originalConsole.error(err);
    }
  }
  if (typeof index.onError === "function") {
    index.onError(onError2);
  }
  if (typeof index.onUnhandledRejection === "function") {
    index.onUnhandledRejection(onError2);
  }
  return function offError2() {
    if (typeof index.offError === "function") {
      index.offError(onError2);
    }
    if (typeof index.offUnhandledRejection === "function") {
      index.offUnhandledRejection(onError2);
    }
  };
}
function formatMessage(type, args) {
  try {
    return {
      type,
      args: formatArgs(args)
    };
  } catch (e2) {
  }
  return {
    type,
    args: []
  };
}
function formatArgs(args) {
  return args.map((arg) => formatArg(arg));
}
function formatArg(arg, depth = 0) {
  if (depth >= 7) {
    return {
      type: "object",
      value: "[Maximum depth reached]"
    };
  }
  const type = typeof arg;
  switch (type) {
    case "string":
      return formatString(arg);
    case "number":
      return formatNumber(arg);
    case "boolean":
      return formatBoolean(arg);
    case "object":
      try {
        return formatObject(arg, depth);
      } catch (e2) {
        return {
          type: "object",
          value: {
            properties: []
          }
        };
      }
    case "undefined":
      return formatUndefined();
    case "function":
      return formatFunction(arg);
    case "symbol": {
      return formatSymbol(arg);
    }
    case "bigint":
      return formatBigInt(arg);
  }
}
function formatFunction(value) {
  return {
    type: "function",
    value: `function ${value.name}() {}`
  };
}
function formatUndefined() {
  return {
    type: "undefined"
  };
}
function formatBoolean(value) {
  return {
    type: "boolean",
    value: String(value)
  };
}
function formatNumber(value) {
  return {
    type: "number",
    value: String(value)
  };
}
function formatBigInt(value) {
  return {
    type: "bigint",
    value: String(value)
  };
}
function formatString(value) {
  return {
    type: "string",
    value
  };
}
function formatSymbol(value) {
  return {
    type: "symbol",
    value: value.description
  };
}
function formatObject(value, depth) {
  if (value === null) {
    return {
      type: "null"
    };
  }
  {
    if (isComponentPublicInstance(value)) {
      return formatComponentPublicInstance(value, depth);
    }
    if (isComponentInternalInstance(value)) {
      return formatComponentInternalInstance(value, depth);
    }
    if (isUniElement(value)) {
      return formatUniElement(value, depth);
    }
    if (isCSSStyleDeclaration(value)) {
      return formatCSSStyleDeclaration(value, depth);
    }
  }
  if (Array.isArray(value)) {
    return {
      type: "object",
      subType: "array",
      value: {
        properties: value.map((v, i) => formatArrayElement(v, i, depth + 1))
      }
    };
  }
  if (value instanceof Set) {
    return {
      type: "object",
      subType: "set",
      className: "Set",
      description: `Set(${value.size})`,
      value: {
        entries: Array.from(value).map((v) => formatSetEntry(v, depth + 1))
      }
    };
  }
  if (value instanceof Map) {
    return {
      type: "object",
      subType: "map",
      className: "Map",
      description: `Map(${value.size})`,
      value: {
        entries: Array.from(value.entries()).map((v) => formatMapEntry(v, depth + 1))
      }
    };
  }
  if (value instanceof Promise) {
    return {
      type: "object",
      subType: "promise",
      value: {
        properties: []
      }
    };
  }
  if (value instanceof RegExp) {
    return {
      type: "object",
      subType: "regexp",
      value: String(value),
      className: "Regexp"
    };
  }
  if (value instanceof Date) {
    return {
      type: "object",
      subType: "date",
      value: String(value),
      className: "Date"
    };
  }
  if (value instanceof Error) {
    return {
      type: "object",
      subType: "error",
      value: value.message || String(value),
      className: value.name || "Error"
    };
  }
  let className = void 0;
  {
    const constructor = value.constructor;
    if (constructor) {
      if (constructor.get$UTSMetadata$) {
        className = constructor.get$UTSMetadata$().name;
      }
    }
  }
  let entries2 = Object.entries(value);
  if (isHarmonyBuilderParams(value)) {
    entries2 = entries2.filter(([key]) => key !== "modifier" && key !== "nodeContent");
  }
  return {
    type: "object",
    className,
    value: {
      properties: entries2.map((entry) => formatObjectProperty(entry[0], entry[1], depth + 1))
    }
  };
}
function isHarmonyBuilderParams(value) {
  return value.modifier && value.modifier._attribute && value.nodeContent;
}
function isComponentPublicInstance(value) {
  return value.$ && isComponentInternalInstance(value.$);
}
function isComponentInternalInstance(value) {
  return value.type && value.uid != null && value.appContext;
}
function formatComponentPublicInstance(value, depth) {
  return {
    type: "object",
    className: "ComponentPublicInstance",
    value: {
      properties: Object.entries(value.$.type).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function formatComponentInternalInstance(value, depth) {
  return {
    type: "object",
    className: "ComponentInternalInstance",
    value: {
      properties: Object.entries(value.type).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function isUniElement(value) {
  return value.style && value.tagName != null && value.nodeName != null;
}
function formatUniElement(value, depth) {
  return {
    type: "object",
    // 非 x 没有 UniElement 的概念
    // className: 'UniElement',
    value: {
      properties: Object.entries(value).filter(([name]) => [
        "id",
        "tagName",
        "nodeName",
        "dataset",
        "offsetTop",
        "offsetLeft",
        "style"
      ].includes(name)).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function isCSSStyleDeclaration(value) {
  return typeof value.getPropertyValue === "function" && typeof value.setProperty === "function" && value.$styles;
}
function formatCSSStyleDeclaration(style, depth) {
  return {
    type: "object",
    value: {
      properties: Object.entries(style.$styles).map(([name, value]) => formatObjectProperty(name, value, depth + 1))
    }
  };
}
function formatObjectProperty(name, value, depth) {
  const result = formatArg(value, depth);
  result.name = name;
  return result;
}
function formatArrayElement(value, index2, depth) {
  const result = formatArg(value, depth);
  result.name = `${index2}`;
  return result;
}
function formatSetEntry(value, depth) {
  return {
    value: formatArg(value, depth)
  };
}
function formatMapEntry(value, depth) {
  return {
    key: formatArg(value[0], depth),
    value: formatArg(value[1], depth)
  };
}
let sendConsole = null;
const messageQueue = [];
const messageExtra = {};
const EXCEPTION_BEGIN_MARK = "---BEGIN:EXCEPTION---";
const EXCEPTION_END_MARK = "---END:EXCEPTION---";
function sendConsoleMessages(messages) {
  if (sendConsole == null) {
    messageQueue.push(...messages);
    return;
  }
  sendConsole(JSON.stringify(Object.assign({
    type: "console",
    data: messages
  }, messageExtra)));
}
function setSendConsole(value, extra = {}) {
  sendConsole = value;
  Object.assign(messageExtra, extra);
  if (value != null && messageQueue.length > 0) {
    const messages = messageQueue.slice();
    messageQueue.length = 0;
    sendConsoleMessages(messages);
  }
}
const atFileRegex = /^\s*at\s+[\w/./-]+:\d+$/;
function rewriteConsole() {
  function wrapConsole(type) {
    return function(...args) {
      {
        const originalArgs = [...args];
        if (originalArgs.length) {
          const maybeAtFile = originalArgs[originalArgs.length - 1];
          if (typeof maybeAtFile === "string" && atFileRegex.test(maybeAtFile)) {
            originalArgs.pop();
          }
        }
        originalConsole[type](...originalArgs);
      }
      if (type === "error" && args.length === 1) {
        const arg = args[0];
        if (typeof arg === "string" && arg.startsWith(EXCEPTION_BEGIN_MARK)) {
          const startIndex = EXCEPTION_BEGIN_MARK.length;
          const endIndex = arg.length - EXCEPTION_END_MARK.length;
          sendErrorMessages([arg.slice(startIndex, endIndex)]);
          return;
        } else if (arg instanceof Error) {
          sendErrorMessages([arg]);
          return;
        }
      }
      sendConsoleMessages([formatMessage(type, args)]);
    };
  }
  if (isConsoleWritable()) {
    CONSOLE_TYPES.forEach((type) => {
      console[type] = wrapConsole(type);
    });
    return function restoreConsole() {
      CONSOLE_TYPES.forEach((type) => {
        console[type] = originalConsole[type];
      });
    };
  } else {
    {
      if (typeof index !== "undefined" && index.__f__) {
        const oldLog = index.__f__;
        if (oldLog) {
          index.__f__ = function(...args) {
            const [type, filename, ...rest] = args;
            oldLog(type, "", ...rest);
            sendConsoleMessages([formatMessage(type, [...rest, filename])]);
          };
          return function restoreConsole() {
            index.__f__ = oldLog;
          };
        }
      }
    }
  }
  return function restoreConsole() {
  };
}
function isConsoleWritable() {
  const value = console.log;
  const sym = Symbol();
  try {
    console.log = sym;
  } catch (ex) {
    return false;
  }
  const isWritable = console.log === sym;
  console.log = value;
  return isWritable;
}
function initRuntimeSocketService() {
  const hosts = "192.168.5.60,127.0.0.1";
  const port = "8090";
  const id = "mp-weixin_ZWSKbh";
  const lazy = typeof swan !== "undefined";
  let restoreError = lazy ? () => {
  } : initOnError();
  let restoreConsole = lazy ? () => {
  } : rewriteConsole();
  return Promise.resolve().then(() => {
    if (lazy) {
      restoreError = initOnError();
      restoreConsole = rewriteConsole();
    }
    return initRuntimeSocket(hosts, port, id).then((socket) => {
      if (!socket) {
        restoreError();
        restoreConsole();
        originalConsole.error(wrapError("开发模式下日志通道建立 socket 连接失败。"));
        {
          originalConsole.error(wrapError("小程序平台，请勾选不校验合法域名配置。"));
        }
        originalConsole.error(wrapError("如果是运行到真机，请确认手机与电脑处于同一网络。"));
        return false;
      }
      {
        initMiniProgramGlobalFlag();
      }
      socket.onClose(() => {
        {
          originalConsole.error(wrapError("开发模式下日志通道 socket 连接关闭，请在 HBuilderX 中重新运行。"));
        }
        restoreError();
        restoreConsole();
      });
      setSendConsole((data) => {
        socket.send({
          data
        });
      });
      setSendError((data) => {
        socket.send({
          data
        });
      });
      return true;
    });
  });
}
const ERROR_CHAR = "‌";
function wrapError(error) {
  return `${ERROR_CHAR}${error}${ERROR_CHAR}`;
}
function initMiniProgramGlobalFlag() {
  if (typeof wx$1 !== "undefined") {
    wx$1.__uni_console__ = true;
  } else if (typeof my !== "undefined") {
    my.__uni_console__ = true;
  } else if (typeof tt !== "undefined") {
    tt.__uni_console__ = true;
  } else if (typeof swan !== "undefined") {
    swan.__uni_console__ = true;
  } else if (typeof qq !== "undefined") {
    qq.__uni_console__ = true;
  } else if (typeof ks !== "undefined") {
    ks.__uni_console__ = true;
  } else if (typeof jd !== "undefined") {
    jd.__uni_console__ = true;
  } else if (typeof xhs !== "undefined") {
    xhs.__uni_console__ = true;
  } else if (typeof has !== "undefined") {
    has.__uni_console__ = true;
  } else if (typeof qa !== "undefined") {
    qa.__uni_console__ = true;
  }
}
initRuntimeSocketService();
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray$t(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function getLocaleLanguage() {
  var _a;
  let localeLanguage = "";
  {
    const appBaseInfo = ((_a = wx.getAppBaseInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  {
    Object.defineProperties(ctx, {
      // only id
      [VIRTUAL_HOST_ID]: {
        get() {
          const id = this.$scope.data[VIRTUAL_HOST_ID];
          return id === void 0 ? "" : id;
        }
      }
    });
  }
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray$t(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin2) => findHooks(mixin2, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once$2(() => {
  const runtimeHooks = [];
  const app = isFunction$f(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray$t(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin2) => {
        hooks.forEach((hook) => {
          if (hasOwn(mixin2, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope && ctx.$callHook) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const onErrorHandlers = wx.$onErrorHandlers;
  if (onErrorHandlers) {
    onErrorHandlers.forEach((fn) => {
      injectHook(ON_ERROR, fn, internalInstance);
    });
    onErrorHandlers.length = 0;
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm);
    const app = isFunction$f(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction$f(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction$f(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction$f(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(getLocaleLanguage());
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    let observerSlots = function(newVal) {
      const $slots = /* @__PURE__ */ Object.create(null);
      newVal && newVal.forEach((slotName) => {
        $slots[slotName] = true;
      });
      this.setData({
        $slots
      });
    };
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: []
    };
    {
      properties.uS.observer = observerSlots;
    }
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties[VIRTUAL_HOST_STYLE] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_CLASS] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_HIDDEN] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_ID] = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray$t(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray$t(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject$8(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject$8(opts)) {
        let value = opts.default;
        if (isFunction$f(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(resolvePropValue(properties.uP))) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject$8(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = resolvePropValue(properties[name]);
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray$t(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function resolvePropValue(prop) {
  return prop;
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(resolvePropValue(up), this.$vm.$);
    } else if (resolvePropValue(this.properties.uT) === "m") {
      updateMiniProgramComponentProperties(resolvePropValue(up), this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray$t(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray$t(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, isPageInProject, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray$t(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$5(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    isPageInProject: true,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    {
      this.options = query;
    }
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [
      customizeEvent(event),
      ...args
    ]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        // vueSlots
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var isVue2 = false;
function set$2(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const getActivePinia = () => hasInjectionContext() && inject(piniaSymbol) || activePinia;
const piniaSymbol = Symbol("pinia");
function isPlainObject$7(o2) {
  return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = typeof window !== "undefined";
const USE_DEVTOOLS = IS_CLIENT;
const componentStateTypes = [];
const getStoreType = (id) => "🍍 " + id;
function registerPiniaDevtools(app, pinia) {
}
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
}
function patchActionForGrouping(store, actionNames, wrapWithProxy) {
  const actions = actionNames.reduce((storeActions, actionName) => {
    storeActions[actionName] = toRaw(store)[actionName];
    return storeActions;
  }, {});
  for (const actionName in actions) {
    store[actionName] = function() {
      const trackedStore = wrapWithProxy ? new Proxy(store, {
        get(...args) {
          return Reflect.get(...args);
        },
        set(...args) {
          return Reflect.set(...args);
        }
      }) : store;
      const retValue = actions[actionName].apply(trackedStore, arguments);
      return retValue;
    };
  }
}
function devtoolsPlugin({ app, store, options }) {
  if (store.$id.startsWith("__hot:")) {
    return;
  }
  store._isOptionsAPI = !!options.state;
  patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
  const originalHotUpdate = store._hotUpdate;
  toRaw(store)._hotUpdate = function(newStore) {
    originalHotUpdate.apply(this, arguments);
    patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
  };
  addStoreToDevtools(
    app,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    store
  );
}
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}
const isUseStore = (fn) => {
  return typeof fn === "function" && typeof fn.$id === "string";
};
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject$7(targetValue) && isPlainObject$7(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
function acceptHMRUpdate(initialUseStore, hot) {
  return (newModule) => {
    const pinia = hot.data.pinia || initialUseStore._pinia;
    if (!pinia) {
      return;
    }
    hot.data.pinia = pinia;
    for (const exportName in newModule) {
      const useStore = newModule[exportName];
      if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
        const id = useStore.$id;
        if (id !== initialUseStore.$id) {
          console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
          return hot.invalidate();
        }
        const existingStore = pinia._s.get(id);
        if (!existingStore) {
          console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
          return;
        }
        useStore(pinia, existingStore);
      }
    }
  };
}
const noop$2 = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop$2) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject$7(targetValue) && isPlainObject$7(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol("pinia:skipHydration");
function skipHydrate(obj) {
  return Object.defineProperty(obj, skipHydrateSymbol, {});
}
function shouldHydrate(obj) {
  return !isPlainObject$7(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: assign$e } = Object;
function isComputed(o2) {
  return !!(isRef(o2) && o2.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && !hot) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(state ? state() : {}).value)
    ) : toRefs(pinia.state.value[id]);
    return assign$e(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (name in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$e({ actions: {} }, options);
  if (!pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && !hot) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick$1().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$e($state, newState);
    });
  } : (
    /* istanbul ignore next */
    () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    }
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after2(callback) {
        afterCallbackList.push(callback);
      }
      function onError2(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after: after2,
        onError: onError2
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign$e({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(assign$e(
    {
      _hmrPayload,
      _customProperties: markRaw(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    partialStore
    // must be added later
    // setupStore
  ));
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(setup)));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (hot) {
        set$2(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key]
        ) : prop;
        if (IS_CLIENT) {
          const getters = setupStore._getters || // @ts-expect-error: same
          (setupStore._getters = markRaw([]));
          getters.push(key);
        }
      }
    }
  }
  {
    assign$e(store, setupStore);
    assign$e(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign$e($state, state);
      });
    }
  });
  {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject$7(newStateTarget) && isPlainObject$7(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set$2(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick$1().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName];
        set$2(store, actionName, wrapAction(actionName, action));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        set$2(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  if (USE_DEVTOOLS) {
    const nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
      Object.defineProperty(store, p2, assign$e({ value: store[p2] }, nonEnumerable));
    });
  }
  pinia._p.forEach((extender) => {
    if (USE_DEVTOOLS) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign$e(store, extensions);
    } else {
      assign$e(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
    if (typeof id !== "string") {
      throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
    }
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    pinia || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    if (!activePinia) {
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign$e({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (IS_CLIENT) {
      const currentInstance2 = getCurrentInstance();
      if (currentInstance2 && currentInstance2.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance2.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
let mapStoreSuffix = "Store";
function setMapStoreSuffix(suffix) {
  mapStoreSuffix = suffix;
}
function mapStores(...stores) {
  if (Array.isArray(stores[0])) {
    console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
    stores = stores[0];
  }
  return stores.reduce((reduced, useStore) => {
    reduced[useStore.$id + mapStoreSuffix] = function() {
      return useStore(this.$pinia);
    };
    return reduced;
  }, {});
}
function mapState(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
    reduced[key] = function() {
      return useStore(this.$pinia)[key];
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
    reduced[key] = function() {
      const store = useStore(this.$pinia);
      const storeKey = keysOrMapper[key];
      return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
    };
    return reduced;
  }, {});
}
const mapGetters = mapState;
function mapActions(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
    reduced[key] = function(...args) {
      return useStore(this.$pinia)[key](...args);
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
    reduced[key] = function(...args) {
      return useStore(this.$pinia)[keysOrMapper[key]](...args);
    };
    return reduced;
  }, {});
}
function mapWritableState(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
    reduced[key] = {
      get() {
        return useStore(this.$pinia)[key];
      },
      set(value) {
        return useStore(this.$pinia)[key] = value;
      }
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
    reduced[key] = {
      get() {
        return useStore(this.$pinia)[keysOrMapper[key]];
      },
      set(value) {
        return useStore(this.$pinia)[keysOrMapper[key]] = value;
      }
    };
    return reduced;
  }, {});
}
function storeToRefs(store) {
  {
    store = toRaw(store);
    const refs = {};
    for (const key in store) {
      const value = store[key];
      if (isRef(value) || isReactive(value)) {
        refs[key] = // ---
        toRef(store, key);
      }
    }
    return refs;
  }
}
const PiniaVuePlugin = function(_Vue) {
  _Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      if (options.pinia) {
        const pinia = options.pinia;
        if (!this._provided) {
          const provideCache = {};
          Object.defineProperty(this, "_provided", {
            get: () => provideCache,
            set: (v) => Object.assign(provideCache, v)
          });
        }
        this._provided[piniaSymbol] = pinia;
        if (!this.$pinia) {
          this.$pinia = pinia;
        }
        pinia._a = this;
        if (IS_CLIENT) {
          setActivePinia(pinia);
        }
        if (USE_DEVTOOLS) {
          registerPiniaDevtools(pinia._a);
        }
      } else if (!this.$pinia && options.parent && options.parent.$pinia) {
        this.$pinia = options.parent.$pinia;
      }
    },
    destroyed() {
      delete this._pStores;
    }
  });
};
const Pinia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get MutationType() {
    return MutationType;
  },
  PiniaVuePlugin,
  acceptHMRUpdate,
  createPinia,
  defineStore,
  getActivePinia,
  mapActions,
  mapGetters,
  mapState,
  mapStores,
  mapWritableState,
  setActivePinia,
  setMapStoreSuffix,
  skipHydrate,
  storeToRefs
}, Symbol.toStringTag, { value: "Module" }));
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
      for (var index2 = 0, len = list.length; index2 < len; index2++) {
        iterate.call(context, list[index2], index2, list);
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
  var len = args.length;
  for (var source, index2 = 1; index2 < len; index2++) {
    source = args[index2];
    arrayEach$c(keys$9(args[index2]), isClone ? function(key) {
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
  for (var len = obj.length - 1; len >= 0; len--) {
    iterate.call(context, obj[len], len, obj);
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
      each$f(obj, function(val, index2) {
        result[index2] = iterate.call(context, val, index2, obj);
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
  var len = args.length;
  for (var source, index2 = 1; index2 < len; index2++) {
    source = args[index2];
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
          for (var index2 = 0, len = obj.length; index2 < len; index2++) {
            if (!!iterate.call(context, obj[index2], index2, obj) === matchValue) {
              return [true, false, index2, obj[index2]][restIndex];
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
  var len;
  var index2 = 0;
  if (isArray$n(array1) && isArray$n(array2)) {
    for (len = array2.length; index2 < len; index2++) {
      if (!includes$5(array1, array2[index2])) {
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
  var index2 = 0;
  var len = args.length;
  for (; index2 < len; index2++) {
    result = result.concat(toArray$2(args[index2]));
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
    var rest, props, len;
    var index2 = 0;
    if (obj[property2] || hasOwnProp$6(obj, property2)) {
      return obj[property2];
    } else {
      props = helperGetHGSKeys$2(property2);
      len = props.length;
      if (len) {
        for (rest = obj; index2 < len; index2++) {
          rest = getDeepProps(rest, props[index2]);
          if (eqNull$8(rest)) {
            if (index2 === len - 1) {
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
  arrayEach$a(fieldConfs, function(handle, index2) {
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
        item[index2] = field.call(context, item.data, key, arr);
      } : function(item) {
        item[index2] = field ? get$4(item.data, field) : item.data;
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
    var len = sortConfs.length - 1;
    while (len >= 0) {
      compares = buildMultiOrders(len, sortConfs[len], compares);
      len--;
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
  var index2;
  var result = [];
  var list = values$5(array);
  var len = list.length - 1;
  for (; len >= 0; len--) {
    index2 = len > 0 ? random$1(0, len) : 0;
    result.push(list[index2]);
    list.splice(index2, 1);
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
    for (var len = obj.length - 1; len >= 0; len--) {
      if (iterate.call(context, obj[len], len, obj)) {
        return obj[len];
      }
    }
  }
}
var findLast_1 = findLast$1;
var keys$7 = keys_1;
function reduce$1(array, callback, initialValue) {
  if (array) {
    var len, reduceMethod;
    var index2 = 0;
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
      index2 = 1;
      previous = array[keyList[0]];
    }
    for (len = keyList.length; index2 < len; index2++) {
      previous = callback.call(context, previous, array[keyList[index2]], index2, array);
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
  var len = array.length;
  var endIndex = arguments.length > 3 ? end >> 0 : len;
  if (targetIndex < len) {
    targetIndex = targetIndex >= 0 ? targetIndex : len + targetIndex;
    if (targetIndex >= 0) {
      startIndex = startIndex >= 0 ? startIndex : len + startIndex;
      endIndex = endIndex >= 0 ? endIndex : len + endIndex;
      if (startIndex < endIndex) {
        for (replaceIndex = 0, replaceArray = array.slice(startIndex, endIndex); targetIndex < len; targetIndex++) {
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
function chunk$1(array, size2) {
  var index2;
  var result = [];
  var arrLen = size2 >> 0 || 1;
  if (isArray$j(array)) {
    if (arrLen >= 0 && array.length > arrLen) {
      index2 = 0;
      while (index2 < array.length) {
        result.push(array.slice(index2, index2 + arrLen));
        index2 += arrLen;
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
      arrayEach$9(arr, function(itemVal, index2) {
        if (iterate) {
          itemVal = isFunction$8(iterate) ? iterate(itemVal, index2, arr) : get$3(itemVal, iterate);
        }
        if (!eqNull$6(itemVal) && (eqNull$6(rest) || handle(rest, itemVal))) {
          itemIndex = index2;
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
  var index2, maxItem, len;
  var result = [];
  if (arrays && arrays.length) {
    index2 = 0;
    maxItem = max$1(arrays, function(item) {
      return item ? item.length : 0;
    });
    for (len = maxItem ? maxItem.length : 0; index2 < len; index2++) {
      result.push(pluck$1(arrays, index2));
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
  var index2 = 0;
  var len = path.length;
  while (obj && index2 < len) {
    obj = obj[path[index2++]];
  }
  return len && obj ? obj : 0;
}
function invoke$1(list, path) {
  var func;
  var args = arguments;
  var params = [];
  var paths = [];
  var index2 = 2;
  var len = args.length;
  for (; index2 < len; index2++) {
    params.push(args[index2]);
  }
  if (isArray$h(path)) {
    len = path.length - 1;
    for (index2 = 0; index2 < len; index2++) {
      paths.push(path[index2]);
    }
    path = path[len];
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
  } catch (e2) {
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
    var len;
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
        len = obj.length;
        while (len > 0) {
          len--;
          obj[len] = defs;
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
      each$9(obj, function(item, index2, rest2) {
        if (iterate.call(context, item, index2, rest2)) {
          removeKeys.push(index2);
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
    var item, index2, len, paths, nodes, match;
    for (index2 = 0, len = obj.length; index2 < len; index2++) {
      item = obj[index2];
      paths = path.concat(["" + index2]);
      nodes = node.concat([item]);
      if (iterate.call(context, item, index2, obj, paths, parent, nodes)) {
        return { index: index2, item, path: paths, items: obj, parent, nodes };
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
  each$7(obj, function(item, index2) {
    paths = path.concat(["" + index2]);
    nodes = node.concat([item]);
    iterate.call(context, item, index2, obj, paths, parent, nodes);
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
  return map$2(obj, function(item, index2) {
    paths = path.concat(["" + index2]);
    nodes = node.concat([item]);
    rest = iterate.call(context, item, index2, obj, paths, parent, nodes);
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
    eachTree$1(obj, function(item, index2, items, path, parent, nodes) {
      if (iterate.call(context, item, index2, items, path, parent, nodes)) {
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
  arrayEach$5(obj, function(item, index2) {
    paths = path.concat(["" + index2]);
    nodes = node.concat([item]);
    isMatch2 = matchParent && !isEvery || iterate.call(context, item, index2, obj, paths, parent, nodes);
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
  for (var index2 = 0, len = list.length; index2 < len; index2++) {
    if (val === list[index2]) {
      return index2;
    }
  }
}
var arrayIndexOf_1 = arrayIndexOf$2;
function arrayLastIndexOf$2(list, val) {
  if (list.lastIndexOf) {
    return list.lastIndexOf(val);
  }
  for (var len = list.length - 1; len >= 0; len--) {
    if (val === list[len]) {
      return len;
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
  for (var i = 0, dfrLen = defaulParseREs.length; i < dfrLen; i++) {
    matchRest = str.match(defaulParseREs[i]);
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
    for (var i = 1, len = matchRest.length; i < len; i++) {
      resMaps[_i[i - 1]] = matchRest[i];
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
      for (var index2 = 0, len = obj.length; index2 < len; index2++) {
        if (iterate.call(context, obj[index2], index2, obj) === false) {
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
    var len, list;
    if (isArray$c(obj)) {
      for (len = obj.length - 1; len >= 0; len--) {
        if (iterate.call(context, obj[len], len, obj) === false) {
          break;
        }
      }
    } else {
      list = keys$6(obj);
      for (len = list.length - 1; len >= 0; len--) {
        if (iterate.call(context, obj[list[len]], list[len], obj) === false) {
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
  var len = 0;
  if (isString$6(obj) || isArray$a(obj)) {
    return obj.length;
  }
  each$6(obj, function() {
    len++;
  });
  return len;
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
  for (var index2 = 0, len = obj.length; index2 < len; index2++) {
    if (iterate.call(context, obj[index2], index2, obj)) {
      return index2;
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
          return isUndefined$6(result) ? every$1(val1Keys, function(key2, index2) {
            return key2 === val2Keys[index2] && helperEqualCompare$2(val1[key2], val2[val2Keys[index2]], compare, func, isObj1Arr || isObj2Arr ? index2 : key2, val1, val2);
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
  for (var len = obj.length - 1; len >= 0; len--) {
    if (iterate.call(context, obj[len], len, obj)) {
      return len;
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
    } catch (e2) {
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
    var item, index2;
    var rest = {};
    var result = [];
    var context = this;
    var args = arguments;
    var len = args.length;
    if (!isFunction$4(callback)) {
      for (index2 = 1; index2 < len; index2++) {
        item = args[index2];
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
function has$2(obj, property2) {
  if (obj) {
    if (hasOwnProp$2(obj, property2)) {
      return true;
    } else {
      var prop, arrIndex, objProp, matchs, rest, isHas;
      var props = helperGetHGSKeys$1(property2);
      var index2 = 0;
      var len = props.length;
      for (rest = obj; index2 < len; index2++) {
        isHas = false;
        prop = props[index2];
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
          if (index2 === len - 1) {
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
var has_1 = has$2;
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
    var index2;
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
        index2 = staticParseInt$3(currMatchs[2]);
        if (obj[currMatchs[1]]) {
          if (isEnd) {
            obj[currMatchs[1]][index2] = rest;
          } else {
            if (obj[currMatchs[1]][index2]) {
              rest = obj[currMatchs[1]][index2];
            } else {
              obj[currMatchs[1]][index2] = rest;
            }
          }
        } else {
          obj[currMatchs[1]] = new Array(index2 + 1);
          obj[currMatchs[1]][index2] = rest;
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
      var len = props.length;
      for (var index2 = 0; index2 < len; index2++) {
        if (isPrototypePolluted(props[index2])) {
          continue;
        }
        var isEnd = index2 === len - 1;
        rest = setDeepProps(rest, props[index2], isEnd, isEnd ? null : props[index2 + 1], value);
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
  var index2, len;
  var result = [];
  var args = arguments;
  if (args.length < 2) {
    stop = args[0];
    start = 0;
  }
  index2 = start >> 0;
  len = stop >> 0;
  if (index2 < stop) {
    step = step >> 0 || 1;
    for (; index2 < len; index2 += step) {
      result.push(index2);
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
  var startTime, endTime, item, diffTime, len, index2;
  var result = { done: false, time: 0 };
  startDate = toStringDate$1(startDate);
  endDate = endDate ? toStringDate$1(endDate) : helperNewDate$1();
  if (isValidDate$1(startDate) && isValidDate$1(endDate)) {
    startTime = helperGetDateTime$1(startDate);
    endTime = helperGetDateTime$1(endDate);
    if (startTime < endTime) {
      diffTime = result.time = endTime - startTime;
      result.done = true;
      for (index2 = 0, len = dateDiffRules.length; index2 < len; index2++) {
        item = dateDiffRules[index2];
        if (diffTime >= item[1]) {
          if (index2 === len - 1) {
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
  var rest = str.replace(/([-]+)/g, function(text, flag, index2) {
    return index2 && index2 + flag.length < strLen ? "-" : "";
  });
  strLen = rest.length;
  rest = rest.replace(/([A-Z]+)/g, function(text, upper, index2) {
    var upperLen = upper.length;
    upper = helperStringLowerCase$1(upper);
    if (index2) {
      if (upperLen > 2 && index2 + upperLen < strLen) {
        return helperStringUpperCase(helperStringSubstring$1(upper, 0, 1)) + helperStringSubstring$1(upper, 1, upperLen - 1) + helperStringUpperCase(helperStringSubstring$1(upper, upperLen - 1, upperLen));
      }
      return helperStringUpperCase(helperStringSubstring$1(upper, 0, 1)) + helperStringSubstring$1(upper, 1, upperLen);
    } else {
      if (upperLen > 1 && index2 + upperLen < strLen) {
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
  }).replace(/([a-z]?)([A-Z]+)([a-z]?)/g, function(text, prevLower, upper, nextLower, index2) {
    var upperLen = upper.length;
    if (upperLen > 1) {
      if (prevLower) {
        prevLower += "-";
      }
      if (nextLower) {
        return (prevLower || "") + helperStringLowerCase(helperStringSubstring(upper, 0, upperLen - 1)) + "-" + helperStringLowerCase(helperStringSubstring(upper, upperLen - 1, upperLen)) + nextLower;
      }
    }
    return (prevLower || "") + (index2 ? "-" : "") + helperStringLowerCase(upper) + (nextLower || "");
  });
  rest = rest.replace(/([-]+)/g, function(text, flag, index2) {
    return index2 && index2 + flag.length < rest.length ? "-" : "";
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
  } catch (e2) {
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
    } catch (e2) {
    }
    try {
      isSessionStorage = isBrowseStorage(staticWindow.sessionStorage);
    } catch (e2) {
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
var has$1 = has_1;
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
  has: has$1,
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
exports.Pinia = Pinia;
exports._export_sfc = _export_sfc;
exports.computed = computed;
exports.createPinia = createPinia;
exports.createSSRApp = createSSRApp;
exports.defineStore = defineStore;
exports.e = e;
exports.f = f;
exports.index = index;
exports.m = m;
exports.n = n;
exports.nextTick$1 = nextTick$1;
exports.o = o;
exports.p = p;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s;
exports.sr = sr;
exports.t = t;
exports.unref = unref;
exports.useCssVars = useCssVars;
exports.xeUtils = xeUtils;
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
