function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, 'prototype', { writable: false }); return Constructor; }

/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
const MEDIA_PREFERS_REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const CREATED = 1;
const MOUNTED = 2;
const IDLE = 3;
const MOVING = 4;
const SCROLLING = 5;
const DRAGGING = 6;
const DESTROYED = 7;
const STATES = {
  CREATED: CREATED,
  MOUNTED: MOUNTED,
  IDLE: IDLE,
  MOVING: MOVING,
  SCROLLING: SCROLLING,
  DRAGGING: DRAGGING,
  DESTROYED: DESTROYED,
};

function empty(array) {
  array.length = 0;
}

function slice(arrayLike, start, end) {
  return Array.prototype.slice.call(arrayLike, start, end);
}

function apply(func) {
  return func.bind.apply(func, [null].concat(slice(arguments, 1)));
}

const nextTick = setTimeout;

const noop = function noop() {};

function raf(func) {
  return requestAnimationFrame(func);
}

function typeOf(type, subject) {
  return typeof subject === type;
}

function isObject(subject) {
  return !isNull(subject) && typeOf('object', subject);
}

const isArray = Array.isArray;
const isFunction = apply(typeOf, 'function');
const isString = apply(typeOf, 'string');
const isUndefined = apply(typeOf, 'undefined');

function isNull(subject) {
  return subject === null;
}

function isHTMLElement(subject) {
  try {
    return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
  } catch (e) {
    return false;
  }
}

function toArray(value) {
  return isArray(value) ? value : [value];
}

function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}

function includes(array, value) {
  return array.indexOf(value) > -1;
}

function push(array, items) {
  array.push.apply(array, toArray(items));
  return array;
}

function toggleClass(elm, classes, add) {
  if (elm) {
    forEach(classes, (name) => {
      if (name) {
        elm.classList[add ? 'add' : 'remove'](name);
      }
    });
  }
}

function addClass(elm, classes) {
  toggleClass(elm, isString(classes) ? classes.split(' ') : classes, true);
}

function append(parent, children) {
  forEach(children, parent.appendChild.bind(parent));
}

function before(nodes, ref) {
  forEach(nodes, (node) => {
    const parent = (ref || node).parentNode;

    if (parent) {
      parent.insertBefore(node, ref);
    }
  });
}

function matches(elm, selector) {
  return isHTMLElement(elm) && (elm['msMatchesSelector'] || elm.matches).call(elm, selector);
}

function children(parent, selector) {
  const children2 = parent ? slice(parent.children) : [];
  return selector ? children2.filter((child) => {
    return matches(child, selector);
  }) : children2;
}

function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}

const ownKeys = Object.keys;

function forOwn(object, iteratee, right) {
  if (object) {
    (right ? ownKeys(object).reverse() : ownKeys(object)).forEach((key) => {
      key !== '__proto__' && iteratee(object[key], key);
    });
  }

  return object;
}

function assign(object) {
  slice(arguments, 1).forEach((source) => {
    forOwn(source, (value, key) => {
      object[key] = source[key];
    });
  });
  return object;
}

function merge(object) {
  slice(arguments, 1).forEach((source) => {
    forOwn(source, (value, key) => {
      if (isArray(value)) {
        object[key] = value.slice();
      } else if (isObject(value)) {
        object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
      } else {
        object[key] = value;
      }
    });
  });
  return object;
}

function omit(object, keys) {
  forEach(keys || ownKeys(object), (key) => {
    delete object[key];
  });
}

function removeAttribute(elms, attrs) {
  forEach(elms, (elm) => {
    forEach(attrs, (attr) => {
      elm && elm.removeAttribute(attr);
    });
  });
}

function setAttribute(elms, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, (value2, name) => {
      setAttribute(elms, name, value2);
    });
  } else {
    forEach(elms, (elm) => {
      isNull(value) || value === '' ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
    });
  }
}

function create(tag, attrs, parent) {
  const elm = document.createElement(tag);

  if (attrs) {
    isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
  }

  parent && append(parent, elm);
  return elm;
}

function style(elm, prop, value) {
  if (isUndefined(value)) {
    return getComputedStyle(elm)[prop];
  }

  if (!isNull(value)) {
    elm.style[prop] = '' + value;
  }
}

function display(elm, display2) {
  style(elm, 'display', display2);
}

function focus(elm) {
  elm['setActive'] && elm['setActive']() || elm.focus({
    preventScroll: true,
  });
}

function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}

function hasClass(elm, className) {
  return elm && elm.classList.contains(className);
}

function rect(target) {
  return target.getBoundingClientRect();
}

function remove(nodes) {
  forEach(nodes, (node) => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

function parseHtml(html) {
  return child(new DOMParser().parseFromString(html, 'text/html').body);
}

function prevent(e, stopPropagation) {
  e.preventDefault();

  if (stopPropagation) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}

function query(parent, selector) {
  return parent && parent.querySelector(selector);
}

function queryAll(parent, selector) {
  return selector ? slice(parent.querySelectorAll(selector)) : [];
}

function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}

function timeOf(e) {
  return e.timeStamp;
}

function unit(value) {
  return isString(value) ? value : value ? value + 'px' : '';
}

const PROJECT_CODE = 'splide';
const DATA_ATTRIBUTE = 'data-' + PROJECT_CODE;

function assert(condition, message) {
  if (!condition) {
    throw new Error('[' + PROJECT_CODE + '] ' + (message || ''));
  }
}

const min = Math.min,
  max = Math.max,
  floor = Math.floor,
  ceil = Math.ceil,
  abs = Math.abs;

function approximatelyEqual(x, y, epsilon) {
  return abs(x - y) < epsilon;
}

function between(number, x, y, exclusive) {
  const minimum = min(x, y);
  const maximum = max(x, y);
  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
}

function clamp(number, x, y) {
  const minimum = min(x, y);
  const maximum = max(x, y);
  return min(max(minimum, number), maximum);
}

function sign(x) {
  return +(x > 0) - +(x < 0);
}

function camelToKebab(string) {
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function format(string, replacements) {
  forEach(replacements, (replacement) => {
    string = string.replace('%s', '' + replacement);
  });
  return string;
}

function pad(number) {
  return number < 10 ? '0' + number : '' + number;
}

const ids = {};

function uniqueId(prefix) {
  return '' + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
}

function EventBinder() {
  let listeners = [];

  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, (target, event, namespace) => {
      const isEventTarget = ('addEventListener' in target);
      const remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target['removeListener'].bind(target, callback);
      isEventTarget ? target.addEventListener(event, callback, options) : target['addListener'](callback);
      listeners.push([target, event, namespace, callback, remover]);
    });
  }

  function unbind(targets, events, callback) {
    forEachEvent(targets, events, (target, event, namespace) => {
      listeners = listeners.filter((listener) => {
        if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
          listener[4]();
          return false;
        }

        return true;
      });
    });
  }

  function dispatch(target, type, detail) {
    let e;
    const bubbles = true;

    if (typeof CustomEvent === 'function') {
      e = new CustomEvent(type, {
        bubbles: bubbles,
        detail: detail,
      });
    } else {
      e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, bubbles, false, detail);
    }

    target.dispatchEvent(e);
    return e;
  }

  function forEachEvent(targets, events, iteratee) {
    forEach(targets, (target) => {
      target && forEach(events, (events2) => {
        events2.split(' ').forEach((eventNS) => {
          const fragment = eventNS.split('.');
          iteratee(target, fragment[0], fragment[1]);
        });
      });
    });
  }

  function destroy() {
    listeners.forEach((data) => {
      data[4]();
    });
    empty(listeners);
  }

  return {
    bind: bind,
    unbind: unbind,
    dispatch: dispatch,
    destroy: destroy,
  };
}

const EVENT_MOUNTED = 'mounted';
const EVENT_READY = 'ready';
const EVENT_MOVE = 'move';
const EVENT_MOVED = 'moved';
const EVENT_CLICK = 'click';
const EVENT_ACTIVE = 'active';
const EVENT_INACTIVE = 'inactive';
const EVENT_VISIBLE = 'visible';
const EVENT_HIDDEN = 'hidden';
const EVENT_REFRESH = 'refresh';
const EVENT_UPDATED = 'updated';
const EVENT_RESIZE = 'resize';
const EVENT_RESIZED = 'resized';
const EVENT_DRAG = 'drag';
const EVENT_DRAGGING = 'dragging';
const EVENT_DRAGGED = 'dragged';
const EVENT_SCROLL = 'scroll';
const EVENT_SCROLLED = 'scrolled';
const EVENT_OVERFLOW = 'overflow';
const EVENT_DESTROY = 'destroy';
const EVENT_ARROWS_MOUNTED = 'arrows:mounted';
const EVENT_ARROWS_UPDATED = 'arrows:updated';
const EVENT_PAGINATION_MOUNTED = 'pagination:mounted';
const EVENT_PAGINATION_UPDATED = 'pagination:updated';
const EVENT_NAVIGATION_MOUNTED = 'navigation:mounted';
const EVENT_AUTOPLAY_PLAY = 'autoplay:play';
const EVENT_AUTOPLAY_PLAYING = 'autoplay:playing';
const EVENT_AUTOPLAY_PAUSE = 'autoplay:pause';
const EVENT_LAZYLOAD_LOADED = 'lazyload:loaded';
const EVENT_SLIDE_KEYDOWN = 'sk';
const EVENT_SHIFTED = 'sh';
const EVENT_END_INDEX_CHANGED = 'ei';

function EventInterface(Splide2) {
  const bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
  const binder = EventBinder();

  function on(events, callback) {
    binder.bind(bus, toArray(events).join(' '), (e) => {
      callback.apply(callback, isArray(e.detail) ? e.detail : []);
    });
  }

  function emit(event) {
    binder.dispatch(bus, event, slice(arguments, 1));
  }

  if (Splide2) {
    Splide2.event.on(EVENT_DESTROY, binder.destroy);
  }

  return assign(binder, {
    bus: bus,
    on: on,
    off: apply(binder.unbind, bus),
    emit: emit,
  });
}

function RequestInterval(interval, onInterval, onUpdate, limit) {
  const now = Date.now;
  let startTime;
  let rate = 0;
  let id;
  let paused = true;
  let count = 0;

  function update() {
    if (!paused) {
      rate = interval ? min((now() - startTime) / interval, 1) : 1;
      onUpdate && onUpdate(rate);

      if (rate >= 1) {
        onInterval();
        startTime = now();

        if (limit && ++count >= limit) {
          return pause();
        }
      }

      id = raf(update);
    }
  }

  function start(resume) {
    resume || cancel();
    startTime = now() - (resume ? rate * interval : 0);
    paused = false;
    id = raf(update);
  }

  function pause() {
    paused = true;
  }

  function rewind() {
    startTime = now();
    rate = 0;

    if (onUpdate) {
      onUpdate(rate);
    }
  }

  function cancel() {
    id && cancelAnimationFrame(id);
    rate = 0;
    id = 0;
    paused = true;
  }

  function set(time) {
    interval = time;
  }

  function isPaused() {
    return paused;
  }

  return {
    start: start,
    rewind: rewind,
    pause: pause,
    cancel: cancel,
    set: set,
    isPaused: isPaused,
  };
}

function State(initialState) {
  let state = initialState;

  function set(value) {
    state = value;
  }

  function is(states) {
    return includes(toArray(states), state);
  }

  return {
    set: set,
    is: is,
  };
}

function Throttle(func, duration) {
  const interval = RequestInterval(duration || 0, func, null, 1);
  return function () {
    interval.isPaused() && interval.start();
  };
}

function Media(Splide2, Components2, options) {
  const state = Splide2.state;
  const breakpoints = options.breakpoints || {};
  const reducedMotion = options.reducedMotion || {};
  const binder = EventBinder();
  const queries = [];

  function setup() {
    const isMin = options.mediaQuery === 'min';
    ownKeys(breakpoints).sort((n, m) => {
      return isMin ? +n - +m : +m - +n;
    }).forEach((key) => {
      register(breakpoints[key], '(' + (isMin ? 'min' : 'max') + '-width:' + key + 'px)');
    });
    register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
    update();
  }

  function destroy(completely) {
    if (completely) {
      binder.destroy();
    }
  }

  function register(options2, query) {
    const queryList = matchMedia(query);
    binder.bind(queryList, 'change', update);
    queries.push([options2, queryList]);
  }

  function update() {
    const destroyed = state.is(DESTROYED);
    const direction = options.direction;
    const merged = queries.reduce((merged2, entry) => {
      return merge(merged2, entry[1].matches ? entry[0] : {});
    }, {});
    omit(options);
    set(merged);

    if (options.destroy) {
      Splide2.destroy(options.destroy === 'completely');
    } else if (destroyed) {
      destroy(true);
      Splide2.mount();
    } else {
      direction !== options.direction && Splide2.refresh();
    }
  }

  function reduce(enable) {
    if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
      enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
    }
  }

  function set(opts, base, notify) {
    merge(options, opts);
    base && merge(Object.getPrototypeOf(options), opts);

    if (notify || !state.is(CREATED)) {
      Splide2.emit(EVENT_UPDATED, options);
    }
  }

  return {
    setup: setup,
    destroy: destroy,
    reduce: reduce,
    set: set,
  };
}

const ARROW = 'Arrow';
const ARROW_LEFT = ARROW + 'Left';
const ARROW_RIGHT = ARROW + 'Right';
const ARROW_UP = ARROW + 'Up';
const ARROW_DOWN = ARROW + 'Down';
const LTR = 'ltr';
const RTL = 'rtl';
const TTB = 'ttb';
const ORIENTATION_MAP = {
  width: ['height'],
  left: ['top', 'right'],
  right: ['bottom', 'left'],
  x: ['y'],
  X: ['Y'],
  Y: ['X'],
  ArrowLeft: [ARROW_UP, ARROW_RIGHT],
  ArrowRight: [ARROW_DOWN, ARROW_LEFT],
};

function Direction(Splide2, Components2, options) {
  function resolve(prop, axisOnly, direction) {
    direction = direction || options.direction;
    const index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
    return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, (match, offset) => {
      const replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
      return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
    });
  }

  function orient(value) {
    return value * (options.direction === RTL ? 1 : -1);
  }

  return {
    resolve: resolve,
    orient: orient,
  };
}

const ROLE = 'role';
const TAB_INDEX = 'tabindex';
const DISABLED = 'disabled';
const ARIA_PREFIX = 'aria-';
const ARIA_CONTROLS = ARIA_PREFIX + 'controls';
const ARIA_CURRENT = ARIA_PREFIX + 'current';
const ARIA_SELECTED = ARIA_PREFIX + 'selected';
const ARIA_LABEL = ARIA_PREFIX + 'label';
const ARIA_LABELLEDBY = ARIA_PREFIX + 'labelledby';
const ARIA_HIDDEN = ARIA_PREFIX + 'hidden';
const ARIA_ORIENTATION = ARIA_PREFIX + 'orientation';
const ARIA_ROLEDESCRIPTION = ARIA_PREFIX + 'roledescription';
const ARIA_LIVE = ARIA_PREFIX + 'live';
const ARIA_BUSY = ARIA_PREFIX + 'busy';
const ARIA_ATOMIC = ARIA_PREFIX + 'atomic';
const ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
const CLASS_PREFIX = PROJECT_CODE + '__';
const STATUS_CLASS_PREFIX = 'is-';
const CLASS_ROOT = PROJECT_CODE;
const CLASS_TRACK = CLASS_PREFIX + 'track';
const CLASS_LIST = CLASS_PREFIX + 'list';
const CLASS_SLIDE = CLASS_PREFIX + 'slide';
const CLASS_CLONE = CLASS_SLIDE + '--clone';
const CLASS_CONTAINER = CLASS_SLIDE + '__container';
const CLASS_ARROWS = CLASS_PREFIX + 'arrows';
const CLASS_ARROW = CLASS_PREFIX + 'arrow';
const CLASS_ARROW_PREV = CLASS_ARROW + '--prev';
const CLASS_ARROW_NEXT = CLASS_ARROW + '--next';
const CLASS_PAGINATION = CLASS_PREFIX + 'pagination';
const CLASS_PAGINATION_PAGE = CLASS_PAGINATION + '__page';
const CLASS_PROGRESS = CLASS_PREFIX + 'progress';
const CLASS_PROGRESS_BAR = CLASS_PROGRESS + '__bar';
const CLASS_TOGGLE = CLASS_PREFIX + 'toggle';
const CLASS_TOGGLE_PLAY = CLASS_TOGGLE + '__play';
const CLASS_TOGGLE_PAUSE = CLASS_TOGGLE + '__pause';
const CLASS_SPINNER = CLASS_PREFIX + 'spinner';
const CLASS_SR = CLASS_PREFIX + 'sr';
const CLASS_INITIALIZED = STATUS_CLASS_PREFIX + 'initialized';
const CLASS_ACTIVE = STATUS_CLASS_PREFIX + 'active';
const CLASS_PREV = STATUS_CLASS_PREFIX + 'prev';
const CLASS_NEXT = STATUS_CLASS_PREFIX + 'next';
const CLASS_VISIBLE = STATUS_CLASS_PREFIX + 'visible';
const CLASS_LOADING = STATUS_CLASS_PREFIX + 'loading';
const CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + 'focus-in';
const CLASS_OVERFLOW = STATUS_CLASS_PREFIX + 'overflow';
const STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
const CLASSES = {
  slide: CLASS_SLIDE,
  clone: CLASS_CLONE,
  arrows: CLASS_ARROWS,
  arrow: CLASS_ARROW,
  prev: CLASS_ARROW_PREV,
  next: CLASS_ARROW_NEXT,
  pagination: CLASS_PAGINATION,
  page: CLASS_PAGINATION_PAGE,
  spinner: CLASS_SPINNER,
};

function closest(from, selector) {
  if (isFunction(from.closest)) {
    return from.closest(selector);
  }

  let elm = from;

  while (elm && elm.nodeType === 1) {
    if (matches(elm, selector)) {
      break;
    }

    elm = elm.parentElement;
  }

  return elm;
}

const FRICTION = 5;
const LOG_INTERVAL = 200;
const POINTER_DOWN_EVENTS = 'touchstart mousedown';
const POINTER_MOVE_EVENTS = 'touchmove mousemove';
const POINTER_UP_EVENTS = 'touchend touchcancel mouseup click';

function Elements(Splide2, Components2, options) {
  const _EventInterface = EventInterface(Splide2),
    on = _EventInterface.on,
    bind = _EventInterface.bind;

  const root = Splide2.root;
  const i18n = options.i18n;
  const elements = {};
  const slides = [];
  let rootClasses = [];
  let trackClasses = [];
  let track;
  let list;
  let isUsingKey;

  function setup() {
    collect();
    init();
    update();
  }

  function mount() {
    on(EVENT_REFRESH, destroy);
    on(EVENT_REFRESH, setup);
    on(EVENT_UPDATED, update);
    bind(document, POINTER_DOWN_EVENTS + ' keydown', (e) => {
      isUsingKey = e.type === 'keydown';
    }, {
      capture: true,
    });
    bind(root, 'focusin', () => {
      toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
    });
  }

  function destroy(completely) {
    const attrs = ALL_ATTRIBUTES.concat('style');
    empty(slides);
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    removeAttribute([track, list], attrs);
    removeAttribute(root, completely ? attrs : ['style', ARIA_ROLEDESCRIPTION]);
  }

  function update() {
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    rootClasses = getClasses(CLASS_ROOT);
    trackClasses = getClasses(CLASS_TRACK);
    addClass(root, rootClasses);
    addClass(track, trackClasses);
    setAttribute(root, ARIA_LABEL, options.label);
    setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
  }

  function collect() {
    track = find('.' + CLASS_TRACK);
    list = child(track, '.' + CLASS_LIST);
    assert(track && list, 'A track/list element is missing.');
    push(slides, children(list, '.' + CLASS_SLIDE + ':not(.' + CLASS_CLONE + ')'));
    forOwn({
      arrows: CLASS_ARROWS,
      pagination: CLASS_PAGINATION,
      prev: CLASS_ARROW_PREV,
      next: CLASS_ARROW_NEXT,
      bar: CLASS_PROGRESS_BAR,
      toggle: CLASS_TOGGLE,
    }, (className, key) => {
      elements[key] = find('.' + className);
    });
    assign(elements, {
      root: root,
      track: track,
      list: list,
      slides: slides,
    });
  }

  function init() {
    const id = root.id || uniqueId(PROJECT_CODE);
    const role = options.role;
    root.id = id;
    track.id = track.id || id + '-track';
    list.id = list.id || id + '-list';

    if (!getAttribute(root, ROLE) && root.tagName !== 'SECTION' && role) {
      setAttribute(root, ROLE, role);
    }

    setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
    setAttribute(list, ROLE, 'presentation');
  }

  function find(selector) {
    const elm = query(root, selector);
    return elm && closest(elm, '.' + CLASS_ROOT) === root ? elm : void 0;
  }

  function getClasses(base) {
    return [base + '--' + options.type, base + '--' + options.direction, options.drag && base + '--draggable', options.isNavigation && base + '--nav', base === CLASS_ROOT && CLASS_ACTIVE];
  }

  return assign(elements, {
    setup: setup,
    mount: mount,
    destroy: destroy,
  });
}

const SLIDE = 'slide';
const LOOP = 'loop';
const FADE = 'fade';

function Slide$1(Splide2, index, slideIndex, slide) {
  const event = EventInterface(Splide2);
  const on = event.on,
    emit = event.emit,
    bind = event.bind;
  const Components = Splide2.Components,
    root = Splide2.root,
    options = Splide2.options;
  const isNavigation = options.isNavigation,
    updateOnMove = options.updateOnMove,
    i18n = options.i18n,
    pagination = options.pagination,
    slideFocus = options.slideFocus;
  const resolve = Components.Direction.resolve;
  const styles = getAttribute(slide, 'style');
  const label = getAttribute(slide, ARIA_LABEL);
  const isClone = slideIndex > -1;
  const container = child(slide, '.' + CLASS_CONTAINER);
  let destroyed;

  function mount() {
    if (!isClone) {
      slide.id = root.id + '-slide' + pad(index + 1);
      setAttribute(slide, ROLE, pagination ? 'tabpanel' : 'group');
      setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
      setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
    }

    listen();
  }

  function listen() {
    bind(slide, 'click', apply(emit, EVENT_CLICK, self));
    bind(slide, 'keydown', apply(emit, EVENT_SLIDE_KEYDOWN, self));
    on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
    on(EVENT_NAVIGATION_MOUNTED, initNavigation);

    if (updateOnMove) {
      on(EVENT_MOVE, onMove);
    }
  }

  function destroy() {
    destroyed = true;
    event.destroy();
    removeClass(slide, STATUS_CLASSES);
    removeAttribute(slide, ALL_ATTRIBUTES);
    setAttribute(slide, 'style', styles);
    setAttribute(slide, ARIA_LABEL, label || '');
  }

  function initNavigation() {
    const controls = Splide2.splides.map((target) => {
      const Slide2 = target.splide.Components.Slides.getAt(index);
      return Slide2 ? Slide2.slide.id : '';
    }).join(' ');
    setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
    setAttribute(slide, ARIA_CONTROLS, controls);
    setAttribute(slide, ROLE, slideFocus ? 'button' : '');
    slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
  }

  function onMove() {
    if (!destroyed) {
      update();
    }
  }

  function update() {
    if (!destroyed) {
      const curr = Splide2.index;
      updateActivity();
      updateVisibility();
      toggleClass(slide, CLASS_PREV, index === curr - 1);
      toggleClass(slide, CLASS_NEXT, index === curr + 1);
    }
  }

  function updateActivity() {
    const active = isActive();

    if (active !== hasClass(slide, CLASS_ACTIVE)) {
      toggleClass(slide, CLASS_ACTIVE, active);
      setAttribute(slide, ARIA_CURRENT, isNavigation && active || '');
      emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
    }
  }

  function updateVisibility() {
    const visible = isVisible();
    const hidden = !visible && (!isActive() || isClone);

    if (!Splide2.state.is([MOVING, SCROLLING])) {
      setAttribute(slide, ARIA_HIDDEN, hidden || '');
    }

    setAttribute(queryAll(slide, options.focusableNodes || ''), TAB_INDEX, hidden ? -1 : '');

    if (slideFocus) {
      setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
    }

    if (visible !== hasClass(slide, CLASS_VISIBLE)) {
      toggleClass(slide, CLASS_VISIBLE, visible);
      emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
    }

    if (!visible && document.activeElement === slide) {
      const Slide2 = Components.Slides.getAt(Splide2.index);
      Slide2 && focus(Slide2.slide);
    }
  }

  function style$1(prop, value, useContainer) {
    style(useContainer && container || slide, prop, value);
  }

  function isActive() {
    const curr = Splide2.index;
    return curr === index || options.cloneStatus && curr === slideIndex;
  }

  function isVisible() {
    if (Splide2.is(FADE)) {
      return isActive();
    }

    const trackRect = rect(Components.Elements.track);
    const slideRect = rect(slide);
    const left = resolve('left', true);
    const right = resolve('right', true);
    return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
  }

  function isWithin(from, distance) {
    let diff = abs(from - index);

    if (!isClone && (options.rewind || Splide2.is(LOOP))) {
      diff = min(diff, Splide2.length - diff);
    }

    return diff <= distance;
  }

  var self = {
    index: index,
    slideIndex: slideIndex,
    slide: slide,
    container: container,
    isClone: isClone,
    mount: mount,
    destroy: destroy,
    update: update,
    style: style$1,
    isWithin: isWithin,
  };
  return self;
}

function Slides(Splide2, Components2, options) {
  const _EventInterface2 = EventInterface(Splide2),
    on = _EventInterface2.on,
    emit = _EventInterface2.emit,
    bind = _EventInterface2.bind;

  const _Components2$Elements = Components2.Elements,
    slides = _Components2$Elements.slides,
    list = _Components2$Elements.list;
  const Slides2 = [];

  function mount() {
    init();
    on(EVENT_REFRESH, destroy);
    on(EVENT_REFRESH, init);
  }

  function init() {
    slides.forEach((slide, index) => {
      register(slide, index, -1);
    });
  }

  function destroy() {
    forEach$1((Slide2) => {
      Slide2.destroy();
    });
    empty(Slides2);
  }

  function update() {
    forEach$1((Slide2) => {
      Slide2.update();
    });
  }

  function register(slide, index, slideIndex) {
    const object = Slide$1(Splide2, index, slideIndex, slide);
    object.mount();
    Slides2.push(object);
    Slides2.sort((Slide1, Slide2) => {
      return Slide1.index - Slide2.index;
    });
  }

  function get(excludeClones) {
    return excludeClones ? filter((Slide2) => {
      return !Slide2.isClone;
    }) : Slides2;
  }

  function getIn(page) {
    const Controller = Components2.Controller;
    const index = Controller.toIndex(page);
    const max = Controller.hasFocus() ? 1 : options.perPage;
    return filter((Slide2) => {
      return between(Slide2.index, index, index + max - 1);
    });
  }

  function getAt(index) {
    return filter(index)[0];
  }

  function add(items, index) {
    forEach(items, (slide) => {
      if (isString(slide)) {
        slide = parseHtml(slide);
      }

      if (isHTMLElement(slide)) {
        const ref = slides[index];
        ref ? before(slide, ref) : append(list, slide);
        addClass(slide, options.classes.slide);
        observeImages(slide, apply(emit, EVENT_RESIZE));
      }
    });
    emit(EVENT_REFRESH);
  }

  function remove$1(matcher) {
    remove(filter(matcher).map((Slide2) => {
      return Slide2.slide;
    }));
    emit(EVENT_REFRESH);
  }

  function forEach$1(iteratee, excludeClones) {
    get(excludeClones).forEach(iteratee);
  }

  function filter(matcher) {
    return Slides2.filter(isFunction(matcher) ? matcher : (Slide2) => {
      return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
    });
  }

  function style(prop, value, useContainer) {
    forEach$1((Slide2) => {
      Slide2.style(prop, value, useContainer);
    });
  }

  function observeImages(elm, callback) {
    const images = queryAll(elm, 'img');
    let length = images.length;

    if (length) {
      images.forEach((img) => {
        bind(img, 'load error', () => {
          if (! --length) {
            callback();
          }
        });
      });
    } else {
      callback();
    }
  }

  function getLength(excludeClones) {
    return excludeClones ? slides.length : Slides2.length;
  }

  function isEnough() {
    return Slides2.length > options.perPage;
  }

  return {
    mount: mount,
    destroy: destroy,
    update: update,
    register: register,
    get: get,
    getIn: getIn,
    getAt: getAt,
    add: add,
    remove: remove$1,
    forEach: forEach$1,
    filter: filter,
    style: style,
    getLength: getLength,
    isEnough: isEnough,
  };
}

function Layout(Splide2, Components2, options) {
  const _EventInterface3 = EventInterface(Splide2),
    on = _EventInterface3.on,
    bind = _EventInterface3.bind,
    emit = _EventInterface3.emit;

  const Slides = Components2.Slides;
  const resolve = Components2.Direction.resolve;
  const _Components2$Elements2 = Components2.Elements,
    root = _Components2$Elements2.root,
    track = _Components2$Elements2.track,
    list = _Components2$Elements2.list;
  const getAt = Slides.getAt,
    styleSlides = Slides.style;
  let vertical;
  let rootRect;
  let overflow;

  function mount() {
    init();
    bind(window, 'resize load', Throttle(apply(emit, EVENT_RESIZE)));
    on([EVENT_UPDATED, EVENT_REFRESH], init);
    on(EVENT_RESIZE, resize);
  }

  function init() {
    vertical = options.direction === TTB;
    style(root, 'maxWidth', unit(options.width));
    style(track, resolve('paddingLeft'), cssPadding(false));
    style(track, resolve('paddingRight'), cssPadding(true));
    resize(true);
  }

  function resize(force) {
    const newRect = rect(root);

    if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
      style(track, 'height', cssTrackHeight());
      styleSlides(resolve('marginRight'), unit(options.gap));
      styleSlides('width', cssSlideWidth());
      styleSlides('height', cssSlideHeight(), true);
      rootRect = newRect;
      emit(EVENT_RESIZED);

      if (overflow !== (overflow = isOverflow())) {
        toggleClass(root, CLASS_OVERFLOW, overflow);
        emit(EVENT_OVERFLOW, overflow);
      }
    }
  }

  function cssPadding(right) {
    const padding = options.padding;
    const prop = resolve(right ? 'right' : 'left');
    return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || '0px';
  }

  function cssTrackHeight() {
    let height = '';

    if (vertical) {
      height = cssHeight();
      assert(height, 'height or heightRatio is missing.');
      height = 'calc(' + height + ' - ' + cssPadding(false) + ' - ' + cssPadding(true) + ')';
    }

    return height;
  }

  function cssHeight() {
    return unit(options.height || rect(list).width * options.heightRatio);
  }

  function cssSlideWidth() {
    return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? '' : cssSlideSize());
  }

  function cssSlideHeight() {
    return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
  }

  function cssSlideSize() {
    const gap = unit(options.gap);
    return 'calc((100%' + (gap && ' + ' + gap) + ')/' + (options.perPage || 1) + (gap && ' - ' + gap) + ')';
  }

  function listSize() {
    return rect(list)[resolve('width')];
  }

  function slideSize(index, withoutGap) {
    const Slide = getAt(index || 0);
    return Slide ? rect(Slide.slide)[resolve('width')] + (withoutGap ? 0 : getGap()) : 0;
  }

  function totalSize(index, withoutGap) {
    const Slide = getAt(index);

    if (Slide) {
      const right = rect(Slide.slide)[resolve('right')];
      const left = rect(list)[resolve('left')];
      return abs(right - left) + (withoutGap ? 0 : getGap());
    }

    return 0;
  }

  function sliderSize(withoutGap) {
    return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
  }

  function getGap() {
    const Slide = getAt(0);
    return Slide && parseFloat(style(Slide.slide, resolve('marginRight'))) || 0;
  }

  function getPadding(right) {
    return parseFloat(style(track, resolve('padding' + (right ? 'Right' : 'Left')))) || 0;
  }

  function isOverflow() {
    return Splide2.is(FADE) || sliderSize(true) > listSize();
  }

  return {
    mount: mount,
    resize: resize,
    listSize: listSize,
    slideSize: slideSize,
    sliderSize: sliderSize,
    totalSize: totalSize,
    getPadding: getPadding,
    isOverflow: isOverflow,
  };
}

const MULTIPLIER = 2;

function Clones(Splide2, Components2, options) {
  const event = EventInterface(Splide2);
  const on = event.on;
  const Elements = Components2.Elements,
    Slides = Components2.Slides;
  const resolve = Components2.Direction.resolve;
  const clones = [];
  let cloneCount;

  function mount() {
    on(EVENT_REFRESH, remount);
    on([EVENT_UPDATED, EVENT_RESIZE], observe);

    if (cloneCount = computeCloneCount()) {
      generate(cloneCount);
      Components2.Layout.resize(true);
    }
  }

  function remount() {
    destroy();
    mount();
  }

  function destroy() {
    remove(clones);
    empty(clones);
    event.destroy();
  }

  function observe() {
    const count = computeCloneCount();

    if (cloneCount !== count) {
      if (cloneCount < count || !count) {
        event.emit(EVENT_REFRESH);
      }
    }
  }

  function generate(count) {
    const slides = Slides.get().slice();
    const length = slides.length;

    if (length) {
      while (slides.length < count) {
        push(slides, slides);
      }

      push(slides.slice(-count), slides.slice(0, count)).forEach((Slide, index) => {
        const isHead = index < count;
        const clone = cloneDeep(Slide.slide, index);
        isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
        push(clones, clone);
        Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
      });
    }
  }

  function cloneDeep(elm, index) {
    const clone = elm.cloneNode(true);
    addClass(clone, options.classes.clone);
    clone.id = Splide2.root.id + '-clone' + pad(index + 1);
    return clone;
  }

  function computeCloneCount() {
    let clones2 = options.clones;

    if (!Splide2.is(LOOP)) {
      clones2 = 0;
    } else if (isUndefined(clones2)) {
      const fixedSize = options[resolve('fixedWidth')] && Components2.Layout.slideSize(0);
      const fixedCount = fixedSize && ceil(rect(Elements.track)[resolve('width')] / fixedSize);
      clones2 = fixedCount || options[resolve('autoWidth')] && Splide2.length || options.perPage * MULTIPLIER;
    }

    return clones2;
  }

  return {
    mount: mount,
    destroy: destroy,
  };
}

function Move(Splide2, Components2, options) {
  const _EventInterface4 = EventInterface(Splide2),
    on = _EventInterface4.on,
    emit = _EventInterface4.emit;

  const set = Splide2.state.set;
  const _Components2$Layout = Components2.Layout,
    slideSize = _Components2$Layout.slideSize,
    getPadding = _Components2$Layout.getPadding,
    totalSize = _Components2$Layout.totalSize,
    listSize = _Components2$Layout.listSize,
    sliderSize = _Components2$Layout.sliderSize;
  const _Components2$Directio = Components2.Direction,
    resolve = _Components2$Directio.resolve,
    orient = _Components2$Directio.orient;
  const _Components2$Elements3 = Components2.Elements,
    list = _Components2$Elements3.list,
    track = _Components2$Elements3.track;
  let Transition;

  function mount() {
    Transition = Components2.Transition;
    on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
  }

  function reposition() {
    if (!Components2.Controller.isBusy()) {
      Components2.Scroll.cancel();
      jump(Splide2.index);
      Components2.Slides.update();
    }
  }

  function move(dest, index, prev, callback) {
    if (dest !== index && canShift(dest > prev)) {
      cancel();
      translate(shift(getPosition(), dest > prev), true);
    }

    set(MOVING);
    emit(EVENT_MOVE, index, prev, dest);
    Transition.start(index, () => {
      set(IDLE);
      emit(EVENT_MOVED, index, prev, dest);
      callback && callback();
    });
  }

  function jump(index) {
    translate(toPosition(index, true));
  }

  function translate(position, preventLoop) {
    if (!Splide2.is(FADE)) {
      const destination = preventLoop ? position : loop(position);
      style(list, 'transform', 'translate' + resolve('X') + '(' + destination + 'px)');
      position !== destination && emit(EVENT_SHIFTED);
    }
  }

  function loop(position) {
    if (Splide2.is(LOOP)) {
      const index = toIndex(position);
      const exceededMax = index > Components2.Controller.getEnd();
      const exceededMin = index < 0;

      if (exceededMin || exceededMax) {
        position = shift(position, exceededMax);
      }
    }

    return position;
  }

  function shift(position, backwards) {
    const excess = position - getLimit(backwards);
    const size = sliderSize();
    position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
    return position;
  }

  function cancel() {
    translate(getPosition(), true);
    Transition.cancel();
  }

  function toIndex(position) {
    const Slides = Components2.Slides.get();
    let index = 0;
    let minDistance = Infinity;

    for (let i = 0; i < Slides.length; i++) {
      const slideIndex = Slides[i].index;
      const distance = abs(toPosition(slideIndex, true) - position);

      if (distance <= minDistance) {
        minDistance = distance;
        index = slideIndex;
      } else {
        break;
      }
    }

    return index;
  }

  function toPosition(index, trimming) {
    const position = orient(totalSize(index - 1) - offset(index));
    return trimming ? trim(position) : position;
  }

  function getPosition() {
    const left = resolve('left');
    return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
  }

  function trim(position) {
    if (options.trimSpace && Splide2.is(SLIDE)) {
      position = clamp(position, 0, orient(sliderSize(true) - listSize()));
    }

    return position;
  }

  function offset(index) {
    const focus = options.focus;
    return focus === 'center' ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
  }

  function getLimit(max) {
    return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
  }

  function canShift(backwards) {
    const shifted = orient(shift(getPosition(), backwards));
    return backwards ? shifted >= 0 : shifted <= list[resolve('scrollWidth')] - rect(track)[resolve('width')];
  }

  function exceededLimit(max, position) {
    position = isUndefined(position) ? getPosition() : position;
    const exceededMin = max !== true && orient(position) < orient(getLimit(false));
    const exceededMax = max !== false && orient(position) > orient(getLimit(true));
    return exceededMin || exceededMax;
  }

  return {
    mount: mount,
    move: move,
    jump: jump,
    translate: translate,
    shift: shift,
    cancel: cancel,
    toIndex: toIndex,
    toPosition: toPosition,
    getPosition: getPosition,
    getLimit: getLimit,
    exceededLimit: exceededLimit,
    reposition: reposition,
  };
}

function Controller(Splide2, Components2, options) {
  const _EventInterface5 = EventInterface(Splide2),
    on = _EventInterface5.on,
    emit = _EventInterface5.emit;

  const Move = Components2.Move;
  const getPosition = Move.getPosition,
    getLimit = Move.getLimit,
    toPosition = Move.toPosition;
  const _Components2$Slides = Components2.Slides,
    isEnough = _Components2$Slides.isEnough,
    getLength = _Components2$Slides.getLength;
  const omitEnd = options.omitEnd;
  const isLoop = Splide2.is(LOOP);
  const isSlide = Splide2.is(SLIDE);
  const getNext = apply(getAdjacent, false);
  const getPrev = apply(getAdjacent, true);
  let currIndex = options.start || 0;
  let endIndex;
  let prevIndex = currIndex;
  let slideCount;
  let perMove;
  let perPage;

  function mount() {
    init();
    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
    on(EVENT_RESIZED, onResized);
  }

  function init() {
    slideCount = getLength(true);
    perMove = options.perMove;
    perPage = options.perPage;
    endIndex = getEnd();
    const index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);

    if (index !== currIndex) {
      currIndex = index;
      Move.reposition();
    }
  }

  function onResized() {
    if (endIndex !== getEnd()) {
      emit(EVENT_END_INDEX_CHANGED);
    }
  }

  function go(control, allowSameIndex, callback) {
    if (!isBusy()) {
      const dest = parse(control);
      const index = loop(dest);

      if (index > -1 && (allowSameIndex || index !== currIndex)) {
        setIndex(index);
        Move.move(dest, index, prevIndex, callback);
      }
    }
  }

  function scroll(destination, duration, snap, callback) {
    Components2.Scroll.scroll(destination, duration, snap, () => {
      const index = loop(Move.toIndex(getPosition()));
      setIndex(omitEnd ? min(index, endIndex) : index);
      callback && callback();
    });
  }

  function parse(control) {
    let index = currIndex;

    if (isString(control)) {
      const _ref = control.match(/([+\-<>])(\d+)?/) || [],
        indicator = _ref[1],
        number = _ref[2];

      if (indicator === '+' || indicator === '-') {
        index = computeDestIndex(currIndex + +('' + indicator + (+number || 1)), currIndex);
      } else if (indicator === '>') {
        index = number ? toIndex(+number) : getNext(true);
      } else if (indicator === '<') {
        index = getPrev(true);
      }
    } else {
      index = isLoop ? control : clamp(control, 0, endIndex);
    }

    return index;
  }

  function getAdjacent(prev, destination) {
    const number = perMove || (hasFocus() ? 1 : perPage);
    const dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));

    if (dest === -1 && isSlide) {
      if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
        return prev ? 0 : endIndex;
      }
    }

    return destination ? dest : loop(dest);
  }

  function computeDestIndex(dest, from, snapPage) {
    if (isEnough() || hasFocus()) {
      const index = computeMovableDestIndex(dest);

      if (index !== dest) {
        from = dest;
        dest = index;
        snapPage = false;
      }

      if (dest < 0 || dest > endIndex) {
        if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
          dest = toIndex(toPage(dest));
        } else {
          if (isLoop) {
            dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
          } else if (options.rewind) {
            dest = dest < 0 ? endIndex : 0;
          } else {
            dest = -1;
          }
        }
      } else {
        if (snapPage && dest !== from) {
          dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
        }
      }
    } else {
      dest = -1;
    }

    return dest;
  }

  function computeMovableDestIndex(dest) {
    if (isSlide && options.trimSpace === 'move' && dest !== currIndex) {
      const position = getPosition();

      while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
        dest < currIndex ? --dest : ++dest;
      }
    }

    return dest;
  }

  function loop(index) {
    return isLoop ? (index + slideCount) % slideCount || 0 : index;
  }

  function getEnd() {
    let end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);

    while (omitEnd && end-- > 0) {
      if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
        end++;
        break;
      }
    }

    return clamp(end, 0, slideCount - 1);
  }

  function toIndex(page) {
    return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
  }

  function toPage(index) {
    return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
  }

  function toDest(destination) {
    const closest = Move.toIndex(destination);
    return isSlide ? clamp(closest, 0, endIndex) : closest;
  }

  function setIndex(index) {
    if (index !== currIndex) {
      prevIndex = currIndex;
      currIndex = index;
    }
  }

  function getIndex(prev) {
    return prev ? prevIndex : currIndex;
  }

  function hasFocus() {
    return !isUndefined(options.focus) || options.isNavigation;
  }

  function isBusy() {
    return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
  }

  return {
    mount: mount,
    go: go,
    scroll: scroll,
    getNext: getNext,
    getPrev: getPrev,
    getAdjacent: getAdjacent,
    getEnd: getEnd,
    setIndex: setIndex,
    getIndex: getIndex,
    toIndex: toIndex,
    toPage: toPage,
    toDest: toDest,
    hasFocus: hasFocus,
    isBusy: isBusy,
  };
}

const XML_NAME_SPACE = 'http://www.w3.org/2000/svg';
const PATH = 'm15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z';
const SIZE = 40;

function Arrows(Splide2, Components2, options) {
  const event = EventInterface(Splide2);
  const on = event.on,
    bind = event.bind,
    emit = event.emit;
  const classes = options.classes,
    i18n = options.i18n;
  const Elements = Components2.Elements,
    Controller = Components2.Controller;
  const placeholder = Elements.arrows,
    track = Elements.track;
  let wrapper = placeholder;
  let prev = Elements.prev;
  let next = Elements.next;
  let created;
  let wrapperClasses;
  const arrows = {};

  function mount() {
    init();
    on(EVENT_UPDATED, remount);
  }

  function remount() {
    destroy();
    mount();
  }

  function init() {
    const enabled = options.arrows;

    if (enabled && !(prev && next)) {
      createArrows();
    }

    if (prev && next) {
      assign(arrows, {
        prev: prev,
        next: next,
      });
      display(wrapper, enabled ? '' : 'none');
      addClass(wrapper, wrapperClasses = CLASS_ARROWS + '--' + options.direction);

      if (enabled) {
        listen();
        update();
        setAttribute([prev, next], ARIA_CONTROLS, track.id);
        emit(EVENT_ARROWS_MOUNTED, prev, next);
      }
    }
  }

  function destroy() {
    event.destroy();
    removeClass(wrapper, wrapperClasses);

    if (created) {
      remove(placeholder ? [prev, next] : wrapper);
      prev = next = null;
    } else {
      removeAttribute([prev, next], ALL_ATTRIBUTES);
    }
  }

  function listen() {
    on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
    bind(next, 'click', apply(go, '>'));
    bind(prev, 'click', apply(go, '<'));
  }

  function go(control) {
    Controller.go(control, true);
  }

  function createArrows() {
    wrapper = placeholder || create('div', classes.arrows);
    prev = createArrow(true);
    next = createArrow(false);
    created = true;
    append(wrapper, [prev, next]);
    !placeholder && before(wrapper, track);
  }

  function createArrow(prev2) {
    const arrow = '<button class="' + classes.arrow + ' ' + (prev2 ? classes.prev : classes.next) + '" type="button"><svg xmlns="' + XML_NAME_SPACE + '" viewBox="0 0 ' + SIZE + ' ' + SIZE + '" width="' + SIZE + '" height="' + SIZE + '" focusable="false"><path d="' + (options.arrowPath || PATH) + '" />';
    return parseHtml(arrow);
  }

  function update() {
    if (prev && next) {
      const index = Splide2.index;
      const prevIndex = Controller.getPrev();
      const nextIndex = Controller.getNext();
      const prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
      const nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
      prev.disabled = prevIndex < 0;
      next.disabled = nextIndex < 0;
      setAttribute(prev, ARIA_LABEL, prevLabel);
      setAttribute(next, ARIA_LABEL, nextLabel);
      emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
    }
  }

  return {
    arrows: arrows,
    mount: mount,
    destroy: destroy,
    update: update,
  };
}

const INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + '-interval';

function Autoplay(Splide2, Components2, options) {
  const _EventInterface6 = EventInterface(Splide2),
    on = _EventInterface6.on,
    bind = _EventInterface6.bind,
    emit = _EventInterface6.emit;

  const interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, '>'), onAnimationFrame);
  const isPaused = interval.isPaused;
  const Elements = Components2.Elements,
    _Components2$Elements4 = Components2.Elements,
    root = _Components2$Elements4.root,
    toggle = _Components2$Elements4.toggle;
  const autoplay = options.autoplay;
  let hovered;
  let focused;
  let stopped = autoplay === 'pause';

  function mount() {
    if (autoplay) {
      listen();
      toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
      stopped || play();
      update();
    }
  }

  function listen() {
    if (options.pauseOnHover) {
      bind(root, 'mouseenter mouseleave', (e) => {
        hovered = e.type === 'mouseenter';
        autoToggle();
      });
    }

    if (options.pauseOnFocus) {
      bind(root, 'focusin focusout', (e) => {
        focused = e.type === 'focusin';
        autoToggle();
      });
    }

    if (toggle) {
      bind(toggle, 'click', () => {
        stopped ? play() : pause(true);
      });
    }

    on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
    on(EVENT_MOVE, onMove);
  }

  function play() {
    if (isPaused() && Components2.Slides.isEnough()) {
      interval.start(!options.resetProgress);
      focused = hovered = stopped = false;
      update();
      emit(EVENT_AUTOPLAY_PLAY);
    }
  }

  function pause(stop) {
    if (stop === void 0) {
      stop = true;
    }

    stopped = !!stop;
    update();

    if (!isPaused()) {
      interval.pause();
      emit(EVENT_AUTOPLAY_PAUSE);
    }
  }

  function autoToggle() {
    if (!stopped) {
      hovered || focused ? pause(false) : play();
    }
  }

  function update() {
    if (toggle) {
      toggleClass(toggle, CLASS_ACTIVE, !stopped);
      setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? 'play' : 'pause']);
    }
  }

  function onAnimationFrame(rate) {
    const bar = Elements.bar;
    bar && style(bar, 'width', rate * 100 + '%');
    emit(EVENT_AUTOPLAY_PLAYING, rate);
  }

  function onMove(index) {
    const Slide = Components2.Slides.getAt(index);
    interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
  }

  return {
    mount: mount,
    destroy: interval.cancel,
    play: play,
    pause: pause,
    isPaused: isPaused,
  };
}

function Cover(Splide2, Components2, options) {
  const _EventInterface7 = EventInterface(Splide2),
    on = _EventInterface7.on;

  function mount() {
    if (options.cover) {
      on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
      on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
    }
  }

  function cover(cover2) {
    Components2.Slides.forEach((Slide) => {
      const img = child(Slide.container || Slide.slide, 'img');

      if (img && img.src) {
        toggle(cover2, img, Slide);
      }
    });
  }

  function toggle(cover2, img, Slide) {
    Slide.style('background', cover2 ? 'center/cover no-repeat url("' + img.src + '")' : '', true);
    display(img, cover2 ? 'none' : '');
  }

  return {
    mount: mount,
    destroy: apply(cover, false),
  };
}

const BOUNCE_DIFF_THRESHOLD = 10;
const BOUNCE_DURATION = 600;
const FRICTION_FACTOR = 0.6;
const BASE_VELOCITY = 1.5;
const MIN_DURATION = 800;

function Scroll(Splide2, Components2, options) {
  const _EventInterface8 = EventInterface(Splide2),
    on = _EventInterface8.on,
    emit = _EventInterface8.emit;

  const set = Splide2.state.set;
  const Move = Components2.Move;
  const getPosition = Move.getPosition,
    getLimit = Move.getLimit,
    exceededLimit = Move.exceededLimit,
    translate = Move.translate;
  const isSlide = Splide2.is(SLIDE);
  let interval;
  let callback;
  let friction = 1;

  function mount() {
    on(EVENT_MOVE, clear);
    on([EVENT_UPDATED, EVENT_REFRESH], cancel);
  }

  function scroll(destination, duration, snap, onScrolled, noConstrain) {
    const from = getPosition();
    clear();

    if (snap && (!isSlide || !exceededLimit())) {
      const size = Components2.Layout.sliderSize();
      const offset = sign(destination) * size * floor(abs(destination) / size) || 0;
      destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
    }

    const noDistance = approximatelyEqual(from, destination, 1);
    friction = 1;
    duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
    callback = onScrolled;
    interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
    set(SCROLLING);
    emit(EVENT_SCROLL);
    interval.start();
  }

  function onEnd() {
    set(IDLE);
    callback && callback();
    emit(EVENT_SCROLLED);
  }

  function update(from, to, noConstrain, rate) {
    const position = getPosition();
    const target = from + (to - from) * easing(rate);
    const diff = (target - position) * friction;
    translate(position + diff);

    if (isSlide && !noConstrain && exceededLimit()) {
      friction *= FRICTION_FACTOR;

      if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
        scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
      }
    }
  }

  function clear() {
    if (interval) {
      interval.cancel();
    }
  }

  function cancel() {
    if (interval && !interval.isPaused()) {
      clear();
      onEnd();
    }
  }

  function easing(t) {
    const easingFunc = options.easingFunc;
    return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
  }

  return {
    mount: mount,
    destroy: clear,
    scroll: scroll,
    cancel: cancel,
  };
}

const SCROLL_LISTENER_OPTIONS = {
  passive: false,
  capture: true,
};

function Drag(Splide2, Components2, options) {
  const _EventInterface9 = EventInterface(Splide2),
    on = _EventInterface9.on,
    emit = _EventInterface9.emit,
    bind = _EventInterface9.bind,
    unbind = _EventInterface9.unbind;

  const state = Splide2.state;
  const Move = Components2.Move,
    Scroll = Components2.Scroll,
    Controller = Components2.Controller,
    track = Components2.Elements.track,
    reduce = Components2.Media.reduce;
  const _Components2$Directio2 = Components2.Direction,
    resolve = _Components2$Directio2.resolve,
    orient = _Components2$Directio2.orient;
  const getPosition = Move.getPosition,
    exceededLimit = Move.exceededLimit;
  let basePosition;
  let baseEvent;
  let prevBaseEvent;
  let isFree;
  let dragging;
  let exceeded = false;
  let clickPrevented;
  let disabled;
  let target;

  function mount() {
    bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
    bind(track, 'click', onClick, {
      capture: true,
    });
    bind(track, 'dragstart', prevent);
    on([EVENT_MOUNTED, EVENT_UPDATED], init);
  }

  function init() {
    const drag = options.drag;
    disable(!drag);
    isFree = drag === 'free';
  }

  function onPointerDown(e) {
    clickPrevented = false;

    if (!disabled) {
      const isTouch = isTouchEvent(e);

      if (isDraggable(e.target) && (isTouch || !e.button)) {
        if (!Controller.isBusy()) {
          target = isTouch ? track : window;
          dragging = state.is([MOVING, SCROLLING]);
          prevBaseEvent = null;
          bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
          bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
          Move.cancel();
          Scroll.cancel();
          save(e);
        } else {
          prevent(e, true);
        }
      }
    }
  }

  function onPointerMove(e) {
    if (!state.is(DRAGGING)) {
      state.set(DRAGGING);
      emit(EVENT_DRAG);
    }

    if (e.cancelable) {
      if (dragging) {
        Move.translate(basePosition + constrain(diffCoord(e)));
        const expired = diffTime(e) > LOG_INTERVAL;
        const hasExceeded = exceeded !== (exceeded = exceededLimit());

        if (expired || hasExceeded) {
          save(e);
        }

        clickPrevented = true;
        emit(EVENT_DRAGGING);
        prevent(e);
      } else if (isSliderDirection(e)) {
        dragging = shouldStart(e);
        prevent(e);
      }
    }
  }

  function onPointerUp(e) {
    if (state.is(DRAGGING)) {
      state.set(IDLE);
      emit(EVENT_DRAGGED);
    }

    if (dragging) {
      move(e);
      prevent(e);
    }

    unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
    unbind(target, POINTER_UP_EVENTS, onPointerUp);
    dragging = false;
  }

  function onClick(e) {
    if (!disabled && clickPrevented) {
      prevent(e, true);
    }
  }

  function save(e) {
    prevBaseEvent = baseEvent;
    baseEvent = e;
    basePosition = getPosition();
  }

  function move(e) {
    const velocity = computeVelocity(e);
    const destination = computeDestination(velocity);
    const rewind = options.rewind && options.rewindByDrag;
    reduce(false);

    if (isFree) {
      Controller.scroll(destination, 0, options.snap);
    } else if (Splide2.is(FADE)) {
      Controller.go(orient(sign(velocity)) < 0 ? rewind ? '<' : '-' : rewind ? '>' : '+');
    } else if (Splide2.is(SLIDE) && exceeded && rewind) {
      Controller.go(exceededLimit(true) ? '>' : '<');
    } else {
      Controller.go(Controller.toDest(destination), true);
    }

    reduce(true);
  }

  function shouldStart(e) {
    const thresholds = options.dragMinThreshold;
    const isObj = isObject(thresholds);
    const mouse = isObj && thresholds.mouse || 0;
    const touch = (isObj ? thresholds.touch : +thresholds) || 10;
    return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
  }

  function isSliderDirection(e) {
    return abs(diffCoord(e)) > abs(diffCoord(e, true));
  }

  function computeVelocity(e) {
    if (Splide2.is(LOOP) || !exceeded) {
      const time = diffTime(e);

      if (time && time < LOG_INTERVAL) {
        return diffCoord(e) / time;
      }
    }

    return 0;
  }

  function computeDestination(velocity) {
    return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
  }

  function diffCoord(e, orthogonal) {
    return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
  }

  function diffTime(e) {
    return timeOf(e) - timeOf(getBaseEvent(e));
  }

  function getBaseEvent(e) {
    return baseEvent === e && prevBaseEvent || baseEvent;
  }

  function coordOf(e, orthogonal) {
    return (isTouchEvent(e) ? e.changedTouches[0] : e)['page' + resolve(orthogonal ? 'Y' : 'X')];
  }

  function constrain(diff) {
    return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
  }

  function isDraggable(target2) {
    const noDrag = options.noDrag;
    return !matches(target2, '.' + CLASS_PAGINATION_PAGE + ', .' + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
  }

  function isTouchEvent(e) {
    return typeof TouchEvent !== 'undefined' && e instanceof TouchEvent;
  }

  function isDragging() {
    return dragging;
  }

  function disable(value) {
    disabled = value;
  }

  return {
    mount: mount,
    disable: disable,
    isDragging: isDragging,
  };
}

const NORMALIZATION_MAP = {
  Spacebar: ' ',
  Right: ARROW_RIGHT,
  Left: ARROW_LEFT,
  Up: ARROW_UP,
  Down: ARROW_DOWN,
};

function normalizeKey(key) {
  key = isString(key) ? key : key.key;
  return NORMALIZATION_MAP[key] || key;
}

const KEYBOARD_EVENT = 'keydown';

function Keyboard(Splide2, Components2, options) {
  const _EventInterface10 = EventInterface(Splide2),
    on = _EventInterface10.on,
    bind = _EventInterface10.bind,
    unbind = _EventInterface10.unbind;

  const root = Splide2.root;
  const resolve = Components2.Direction.resolve;
  let target;
  let disabled;

  function mount() {
    init();
    on(EVENT_UPDATED, destroy);
    on(EVENT_UPDATED, init);
    on(EVENT_MOVE, onMove);
  }

  function init() {
    const keyboard = options.keyboard;

    if (keyboard) {
      target = keyboard === 'global' ? window : root;
      bind(target, KEYBOARD_EVENT, onKeydown);
    }
  }

  function destroy() {
    unbind(target, KEYBOARD_EVENT);
  }

  function disable(value) {
    disabled = value;
  }

  function onMove() {
    const _disabled = disabled;
    disabled = true;
    nextTick(() => {
      disabled = _disabled;
    });
  }

  function onKeydown(e) {
    if (!disabled) {
      const key = normalizeKey(e);

      if (key === resolve(ARROW_LEFT)) {
        Splide2.go('<');
      } else if (key === resolve(ARROW_RIGHT)) {
        Splide2.go('>');
      }
    }
  }

  return {
    mount: mount,
    destroy: destroy,
    disable: disable,
  };
}

const SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + '-lazy';
const SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + '-srcset';
const IMAGE_SELECTOR = '[' + SRC_DATA_ATTRIBUTE + '], [' + SRCSET_DATA_ATTRIBUTE + ']';

function LazyLoad(Splide2, Components2, options) {
  const _EventInterface11 = EventInterface(Splide2),
    on = _EventInterface11.on,
    off = _EventInterface11.off,
    bind = _EventInterface11.bind,
    emit = _EventInterface11.emit;

  const isSequential = options.lazyLoad === 'sequential';
  const events = [EVENT_MOVED, EVENT_SCROLLED];
  let entries = [];

  function mount() {
    if (options.lazyLoad) {
      init();
      on(EVENT_REFRESH, init);
    }
  }

  function init() {
    empty(entries);
    register();

    if (isSequential) {
      loadNext();
    } else {
      off(events);
      on(events, check);
      check();
    }
  }

  function register() {
    Components2.Slides.forEach((Slide) => {
      queryAll(Slide.slide, IMAGE_SELECTOR).forEach((img) => {
        const src = getAttribute(img, SRC_DATA_ATTRIBUTE);
        const srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);

        if (src !== img.src || srcset !== img.srcset) {
          const className = options.classes.spinner;
          const parent = img.parentElement;
          const spinner = child(parent, '.' + className) || create('span', className, parent);
          entries.push([img, Slide, spinner]);
          img.src || display(img, 'none');
        }
      });
    });
  }

  function check() {
    entries = entries.filter((data) => {
      const distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
      return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
    });
    entries.length || off(events);
  }

  function load(data) {
    const img = data[0];
    addClass(data[1].slide, CLASS_LOADING);
    bind(img, 'load error', apply(onLoad, data));
    setAttribute(img, 'src', getAttribute(img, SRC_DATA_ATTRIBUTE));
    setAttribute(img, 'srcset', getAttribute(img, SRCSET_DATA_ATTRIBUTE));
    removeAttribute(img, SRC_DATA_ATTRIBUTE);
    removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
  }

  function onLoad(data, e) {
    const img = data[0],
      Slide = data[1];
    removeClass(Slide.slide, CLASS_LOADING);

    if (e.type !== 'error') {
      remove(data[2]);
      display(img, '');
      emit(EVENT_LAZYLOAD_LOADED, img, Slide);
      emit(EVENT_RESIZE);
    }

    isSequential && loadNext();
  }

  function loadNext() {
    entries.length && load(entries.shift());
  }

  return {
    mount: mount,
    destroy: apply(empty, entries),
    check: check,
  };
}

function Pagination(Splide2, Components2, options) {
  const event = EventInterface(Splide2);
  const on = event.on,
    emit = event.emit,
    bind = event.bind;
  const Slides = Components2.Slides,
    Elements = Components2.Elements,
    Controller = Components2.Controller;
  const hasFocus = Controller.hasFocus,
    getIndex = Controller.getIndex,
    go = Controller.go;
  const resolve = Components2.Direction.resolve;
  const placeholder = Elements.pagination;
  const items = [];
  let list;
  let paginationClasses;

  function mount() {
    destroy();
    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
    const enabled = options.pagination;
    placeholder && display(placeholder, enabled ? '' : 'none');

    if (enabled) {
      on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
      createPagination();
      update();
      emit(EVENT_PAGINATION_MOUNTED, {
        list: list,
        items: items,
      }, getAt(Splide2.index));
    }
  }

  function destroy() {
    if (list) {
      remove(placeholder ? slice(list.children) : list);
      removeClass(list, paginationClasses);
      empty(items);
      list = null;
    }

    event.destroy();
  }

  function createPagination() {
    const length = Splide2.length;
    const classes = options.classes,
      i18n = options.i18n,
      perPage = options.perPage;
    const max = hasFocus() ? Controller.getEnd() + 1 : ceil(length / perPage);
    list = placeholder || create('ul', classes.pagination, Elements.track.parentElement);
    addClass(list, paginationClasses = CLASS_PAGINATION + '--' + getDirection());
    setAttribute(list, ROLE, 'tablist');
    setAttribute(list, ARIA_LABEL, i18n.select);
    setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? 'vertical' : '');

    for (let i = 0; i < max; i++) {
      const li = create('li', null, list);
      const button = create('button', {
        class: classes.page,
        type: 'button',
      }, li);
      const controls = Slides.getIn(i).map((Slide) => {
        return Slide.slide.id;
      });
      const text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
      bind(button, 'click', apply(onClick, i));

      if (options.paginationKeyboard) {
        bind(button, 'keydown', apply(onKeydown, i));
      }

      setAttribute(li, ROLE, 'presentation');
      setAttribute(button, ROLE, 'tab');
      setAttribute(button, ARIA_CONTROLS, controls.join(' '));
      setAttribute(button, ARIA_LABEL, format(text, i + 1));
      setAttribute(button, TAB_INDEX, -1);
      items.push({
        li: li,
        button: button,
        page: i,
      });
    }
  }

  function onClick(page) {
    go('>' + page, true);
  }

  function onKeydown(page, e) {
    const length = items.length;
    const key = normalizeKey(e);
    const dir = getDirection();
    let nextPage = -1;

    if (key === resolve(ARROW_RIGHT, false, dir)) {
      nextPage = ++page % length;
    } else if (key === resolve(ARROW_LEFT, false, dir)) {
      nextPage = (--page + length) % length;
    } else if (key === 'Home') {
      nextPage = 0;
    } else if (key === 'End') {
      nextPage = length - 1;
    }

    const item = items[nextPage];

    if (item) {
      focus(item.button);
      go('>' + nextPage);
      prevent(e, true);
    }
  }

  function getDirection() {
    return options.paginationDirection || options.direction;
  }

  function getAt(index) {
    return items[Controller.toPage(index)];
  }

  function update() {
    const prev = getAt(getIndex(true));
    const curr = getAt(getIndex());

    if (prev) {
      const button = prev.button;
      removeClass(button, CLASS_ACTIVE);
      removeAttribute(button, ARIA_SELECTED);
      setAttribute(button, TAB_INDEX, -1);
    }

    if (curr) {
      const _button = curr.button;
      addClass(_button, CLASS_ACTIVE);
      setAttribute(_button, ARIA_SELECTED, true);
      setAttribute(_button, TAB_INDEX, '');
    }

    emit(EVENT_PAGINATION_UPDATED, {
      list: list,
      items: items,
    }, prev, curr);
  }

  return {
    items: items,
    mount: mount,
    destroy: destroy,
    getAt: getAt,
    update: update,
  };
}

const TRIGGER_KEYS = [' ', 'Enter'];

function Sync(Splide2, Components2, options) {
  const isNavigation = options.isNavigation,
    slideFocus = options.slideFocus;
  const events = [];

  function mount() {
    Splide2.splides.forEach((target) => {
      if (!target.isParent) {
        sync(Splide2, target.splide);
        sync(target.splide, Splide2);
      }
    });

    if (isNavigation) {
      navigate();
    }
  }

  function destroy() {
    events.forEach((event) => {
      event.destroy();
    });
    empty(events);
  }

  function remount() {
    destroy();
    mount();
  }

  function sync(splide, target) {
    const event = EventInterface(splide);
    event.on(EVENT_MOVE, (index, prev, dest) => {
      target.go(target.is(LOOP) ? dest : index);
    });
    events.push(event);
  }

  function navigate() {
    const event = EventInterface(Splide2);
    const on = event.on;
    on(EVENT_CLICK, onClick);
    on(EVENT_SLIDE_KEYDOWN, onKeydown);
    on([EVENT_MOUNTED, EVENT_UPDATED], update);
    events.push(event);
    event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
  }

  function update() {
    setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? 'vertical' : '');
  }

  function onClick(Slide) {
    Splide2.go(Slide.index);
  }

  function onKeydown(Slide, e) {
    if (includes(TRIGGER_KEYS, normalizeKey(e))) {
      onClick(Slide);
      prevent(e);
    }
  }

  return {
    setup: apply(Components2.Media.set, {
      slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus,
    }, true),
    mount: mount,
    destroy: destroy,
    remount: remount,
  };
}

function Wheel(Splide2, Components2, options) {
  const _EventInterface12 = EventInterface(Splide2),
    bind = _EventInterface12.bind;

  let lastTime = 0;

  function mount() {
    if (options.wheel) {
      bind(Components2.Elements.track, 'wheel', onWheel, SCROLL_LISTENER_OPTIONS);
    }
  }

  function onWheel(e) {
    if (e.cancelable) {
      const deltaY = e.deltaY;
      const backwards = deltaY < 0;
      const timeStamp = timeOf(e);

      const _min = options.wheelMinThreshold || 0;

      const sleep = options.wheelSleep || 0;

      if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
        Splide2.go(backwards ? '<' : '>');
        lastTime = timeStamp;
      }

      shouldPrevent(backwards) && prevent(e);
    }
  }

  function shouldPrevent(backwards) {
    return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
  }

  return {
    mount: mount,
  };
}

const SR_REMOVAL_DELAY = 90;

function Live(Splide2, Components2, options) {
  const _EventInterface13 = EventInterface(Splide2),
    on = _EventInterface13.on;

  const track = Components2.Elements.track;
  const enabled = options.live && !options.isNavigation;
  const sr = create('span', CLASS_SR);
  const interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));

  function mount() {
    if (enabled) {
      disable(!Components2.Autoplay.isPaused());
      setAttribute(track, ARIA_ATOMIC, true);
      sr.textContent = '\u2026';
      on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
      on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
      on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
    }
  }

  function toggle(active) {
    setAttribute(track, ARIA_BUSY, active);

    if (active) {
      append(track, sr);
      interval.start();
    } else {
      remove(sr);
      interval.cancel();
    }
  }

  function destroy() {
    removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
    remove(sr);
  }

  function disable(disabled) {
    if (enabled) {
      setAttribute(track, ARIA_LIVE, disabled ? 'off' : 'polite');
    }
  }

  return {
    mount: mount,
    disable: disable,
    destroy: destroy,
  };
}

const ComponentConstructors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Media: Media,
  Direction: Direction,
  Elements: Elements,
  Slides: Slides,
  Layout: Layout,
  Clones: Clones,
  Move: Move,
  Controller: Controller,
  Arrows: Arrows,
  Autoplay: Autoplay,
  Cover: Cover,
  Scroll: Scroll,
  Drag: Drag,
  Keyboard: Keyboard,
  LazyLoad: LazyLoad,
  Pagination: Pagination,
  Sync: Sync,
  Wheel: Wheel,
  Live: Live,
});
const I18N = {
  prev: 'Previous slide',
  next: 'Next slide',
  first: 'Go to first slide',
  last: 'Go to last slide',
  slideX: 'Go to slide %s',
  pageX: 'Go to page %s',
  play: 'Start autoplay',
  pause: 'Pause autoplay',
  carousel: 'carousel',
  slide: 'slide',
  select: 'Select a slide to show',
  slideLabel: '%s of %s',
};
const DEFAULTS = {
  type: 'slide',
  role: 'region',
  speed: 400,
  perPage: 1,
  cloneStatus: true,
  arrows: true,
  pagination: true,
  paginationKeyboard: true,
  interval: 5e3,
  pauseOnHover: true,
  pauseOnFocus: true,
  resetProgress: true,
  easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
  drag: true,
  direction: 'ltr',
  trimSpace: true,
  focusableNodes: 'a, button, textarea, input, select, iframe',
  live: true,
  classes: CLASSES,
  i18n: I18N,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: 'pause',
  },
};

function Fade(Splide2, Components2, options) {
  const Slides = Components2.Slides;

  function mount() {
    EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
  }

  function init() {
    Slides.forEach((Slide) => {
      Slide.style('transform', 'translateX(-' + 100 * Slide.index + '%)');
    });
  }

  function start(index, done) {
    Slides.style('transition', 'opacity ' + options.speed + 'ms ' + options.easing);
    nextTick(done);
  }

  return {
    mount: mount,
    start: start,
    cancel: noop,
  };
}

function Slide(Splide2, Components2, options) {
  const Move = Components2.Move,
    Controller = Components2.Controller,
    Scroll = Components2.Scroll;
  const list = Components2.Elements.list;
  const transition = apply(style, list, 'transition');
  let endCallback;

  function mount() {
    EventInterface(Splide2).bind(list, 'transitionend', (e) => {
      if (e.target === list && endCallback) {
        cancel();
        endCallback();
      }
    });
  }

  function start(index, done) {
    const destination = Move.toPosition(index, true);
    const position = Move.getPosition();
    const speed = getSpeed(index);

    if (abs(destination - position) >= 1 && speed >= 1) {
      if (options.useScroll) {
        Scroll.scroll(destination, speed, false, done);
      } else {
        transition('transform ' + speed + 'ms ' + options.easing);
        Move.translate(destination, true);
        endCallback = done;
      }
    } else {
      Move.jump(index);
      done();
    }
  }

  function cancel() {
    transition('');
    Scroll.cancel();
  }

  function getSpeed(index) {
    const rewindSpeed = options.rewindSpeed;

    if (Splide2.is(SLIDE) && rewindSpeed) {
      const prev = Controller.getIndex(true);
      const end = Controller.getEnd();

      if (prev === 0 && index >= end || prev >= end && index === 0) {
        return rewindSpeed;
      }
    }

    return options.speed;
  }

  return {
    mount: mount,
    start: start,
    cancel: cancel,
  };
}

const _Splide = /*#__PURE__*/function () {
  function _Splide(target, options) {
    this.event = EventInterface();
    this.Components = {};
    this.state = State(CREATED);
    this.splides = [];
    this._o = {};
    this._E = {};
    const root = isString(target) ? query(document, target) : target;
    assert(root, root + ' is invalid.');
    this.root = root;
    options = merge({
      label: getAttribute(root, ARIA_LABEL) || '',
      labelledby: getAttribute(root, ARIA_LABELLEDBY) || '',
    }, DEFAULTS, _Splide.defaults, options || {});

    try {
      merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
    } catch (e) {
      assert(false, 'Invalid JSON');
    }

    this._o = Object.create(merge({}, options));
  }

  const _proto = _Splide.prototype;

  _proto.mount = function mount(Extensions, Transition) {
    const _this = this;

    const state = this.state,
      Components2 = this.Components;
    assert(state.is([CREATED, DESTROYED]), 'Already mounted!');
    state.set(CREATED);
    this._C = Components2;
    this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
    this._E = Extensions || this._E;
    const Constructors = assign({}, ComponentConstructors, this._E, {
      Transition: this._T,
    });
    forOwn(Constructors, (Component, key) => {
      const component = Component(_this, Components2, _this._o);
      Components2[key] = component;
      component.setup && component.setup();
    });
    forOwn(Components2, (component) => {
      component.mount && component.mount();
    });
    this.emit(EVENT_MOUNTED);
    addClass(this.root, CLASS_INITIALIZED);
    state.set(IDLE);
    this.emit(EVENT_READY);
    return this;
  };

  _proto.sync = function sync(splide) {
    this.splides.push({
      splide: splide,
    });
    splide.splides.push({
      splide: this,
      isParent: true,
    });

    if (this.state.is(IDLE)) {
      this._C.Sync.remount();

      splide.Components.Sync.remount();
    }

    return this;
  };

  _proto.go = function go(control) {
    this._C.Controller.go(control);

    return this;
  };

  _proto.on = function on(events, callback) {
    this.event.on(events, callback);
    return this;
  };

  _proto.off = function off(events) {
    this.event.off(events);
    return this;
  };

  _proto.emit = function emit(event) {
    let _this$event;

    (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));

    return this;
  };

  _proto.add = function add(slides, index) {
    this._C.Slides.add(slides, index);

    return this;
  };

  _proto.remove = function remove(matcher) {
    this._C.Slides.remove(matcher);

    return this;
  };

  _proto.is = function is(type) {
    return this._o.type === type;
  };

  _proto.refresh = function refresh() {
    this.emit(EVENT_REFRESH);
    return this;
  };

  _proto.destroy = function destroy(completely) {
    if (completely === void 0) {
      completely = true;
    }

    const event = this.event,
      state = this.state;

    if (state.is(CREATED)) {
      EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
    } else {
      forOwn(this._C, (component) => {
        component.destroy && component.destroy(completely);
      }, true);
      event.emit(EVENT_DESTROY);
      event.destroy();
      completely && empty(this.splides);
      state.set(DESTROYED);
    }

    return this;
  };

  _createClass(_Splide, [{
    key: 'options',
    get: function get() {
      return this._o;
    },
    set: function set(options) {
      this._C.Media.set(options, true, true);
    },
  }, {
    key: 'length',
    get: function get() {
      return this._C.Slides.getLength(true);
    },
  }, {
    key: 'index',
    get: function get() {
      return this._C.Controller.getIndex();
    },
  }]);

  return _Splide;
}();

const Splide = _Splide;
Splide.defaults = {};
Splide.STATES = STATES;
const CLASS_RENDERED = 'is-rendered';
const RENDERER_DEFAULT_CONFIG = {
  listTag: 'ul',
  slideTag: 'li',
};

const Style = /*#__PURE__*/function () {
  function Style(id, options) {
    this.styles = {};
    this.id = id;
    this.options = options;
  }

  const _proto2 = Style.prototype;

  _proto2.rule = function rule(selector, prop, value, breakpoint) {
    breakpoint = breakpoint || 'default';
    const selectors = this.styles[breakpoint] = this.styles[breakpoint] || {};
    const styles = selectors[selector] = selectors[selector] || {};
    styles[prop] = value;
  };

  _proto2.build = function build() {
    const _this2 = this;

    let css = '';

    if (this.styles.default) {
      css += this.buildSelectors(this.styles.default);
    }

    Object.keys(this.styles).sort((n, m) => {
      return _this2.options.mediaQuery === 'min' ? +n - +m : +m - +n;
    }).forEach((breakpoint) => {
      if (breakpoint !== 'default') {
        css += '@media screen and (max-width: ' + breakpoint + 'px) {';
        css += _this2.buildSelectors(_this2.styles[breakpoint]);
        css += '}';
      }
    });
    return css;
  };

  _proto2.buildSelectors = function buildSelectors(selectors) {
    const _this3 = this;

    let css = '';
    forOwn(selectors, (styles, selector) => {
      selector = ('#' + _this3.id + ' ' + selector).trim();
      css += selector + ' {';
      forOwn(styles, (value, prop) => {
        if (value || value === 0) {
          css += prop + ': ' + value + ';';
        }
      });
      css += '}';
    });
    return css;
  };

  return Style;
}();

const SplideRenderer = /*#__PURE__*/function () {
  function SplideRenderer(contents, options, config, defaults) {
    this.slides = [];
    this.options = {};
    this.breakpoints = [];
    merge(DEFAULTS, defaults || {});
    merge(merge(this.options, DEFAULTS), options || {});
    this.contents = contents;
    this.config = assign({}, RENDERER_DEFAULT_CONFIG, config || {});
    this.id = this.config.id || uniqueId('splide');
    this.Style = new Style(this.id, this.options);
    this.Direction = Direction(null, null, this.options);
    assert(this.contents.length, 'Provide at least 1 content.');
    this.init();
  }

  SplideRenderer.clean = function clean(splide) {
    const _EventInterface14 = EventInterface(splide),
      on = _EventInterface14.on;

    const root = splide.root;
    const clones = queryAll(root, '.' + CLASS_CLONE);
    on(EVENT_MOUNTED, () => {
      remove(child(root, 'style'));
    });
    remove(clones);
  };

  const _proto3 = SplideRenderer.prototype;

  _proto3.init = function init() {
    this.parseBreakpoints();
    this.initSlides();
    this.registerRootStyles();
    this.registerTrackStyles();
    this.registerSlideStyles();
    this.registerListStyles();
  };

  _proto3.initSlides = function initSlides() {
    const _this4 = this;

    push(this.slides, this.contents.map((content, index) => {
      content = isString(content) ? {
        html: content,
      } : content;
      content.styles = content.styles || {};
      content.attrs = content.attrs || {};

      _this4.cover(content);

      const classes = _this4.options.classes.slide + ' ' + (index === 0 ? CLASS_ACTIVE : '');
      assign(content.attrs, {
        class: (classes + ' ' + (content.attrs.class || '')).trim(),
        style: _this4.buildStyles(content.styles),
      });
      return content;
    }));

    if (this.isLoop()) {
      this.generateClones(this.slides);
    }
  };

  _proto3.registerRootStyles = function registerRootStyles() {
    const _this5 = this;

    this.breakpoints.forEach((_ref2) => {
      const width = _ref2[0],
        options = _ref2[1];

      _this5.Style.rule(' ', 'max-width', unit(options.width), width);
    });
  };

  _proto3.registerTrackStyles = function registerTrackStyles() {
    const _this6 = this;

    const Style2 = this.Style;
    const selector = '.' + CLASS_TRACK;
    this.breakpoints.forEach((_ref3) => {
      const width = _ref3[0],
        options = _ref3[1];
      Style2.rule(selector, _this6.resolve('paddingLeft'), _this6.cssPadding(options, false), width);
      Style2.rule(selector, _this6.resolve('paddingRight'), _this6.cssPadding(options, true), width);
      Style2.rule(selector, 'height', _this6.cssTrackHeight(options), width);
    });
  };

  _proto3.registerListStyles = function registerListStyles() {
    const _this7 = this;

    const Style2 = this.Style;
    const selector = '.' + CLASS_LIST;
    this.breakpoints.forEach((_ref4) => {
      const width = _ref4[0],
        options = _ref4[1];
      Style2.rule(selector, 'transform', _this7.buildTranslate(options), width);

      if (!_this7.cssSlideHeight(options)) {
        Style2.rule(selector, 'aspect-ratio', _this7.cssAspectRatio(options), width);
      }
    });
  };

  _proto3.registerSlideStyles = function registerSlideStyles() {
    const _this8 = this;

    const Style2 = this.Style;
    const selector = '.' + CLASS_SLIDE;
    this.breakpoints.forEach((_ref5) => {
      const width = _ref5[0],
        options = _ref5[1];
      Style2.rule(selector, 'width', _this8.cssSlideWidth(options), width);
      Style2.rule(selector, 'height', _this8.cssSlideHeight(options) || '100%', width);
      Style2.rule(selector, _this8.resolve('marginRight'), unit(options.gap) || '0px', width);
      Style2.rule(selector + ' > img', 'display', options.cover ? 'none' : 'inline', width);
    });
  };

  _proto3.buildTranslate = function buildTranslate(options) {
    const _this$Direction = this.Direction,
      resolve = _this$Direction.resolve,
      orient = _this$Direction.orient;
    const values = [];
    values.push(this.cssOffsetClones(options));
    values.push(this.cssOffsetGaps(options));

    if (this.isCenter(options)) {
      values.push(this.buildCssValue(orient(-50), '%'));
      values.push.apply(values, this.cssOffsetCenter(options));
    }

    return values.filter(Boolean).map((value) => {
      return 'translate' + resolve('X') + '(' + value + ')';
    }).join(' ');
  };

  _proto3.cssOffsetClones = function cssOffsetClones(options) {
    const _this$Direction2 = this.Direction,
      resolve = _this$Direction2.resolve,
      orient = _this$Direction2.orient;
    const cloneCount = this.getCloneCount();

    if (this.isFixedWidth(options)) {
      const _this$parseCssValue = this.parseCssValue(options[resolve('fixedWidth')]),
        value = _this$parseCssValue.value,
        unit2 = _this$parseCssValue.unit;

      return this.buildCssValue(orient(value) * cloneCount, unit2);
    }

    const percent = 100 * cloneCount / options.perPage;
    return orient(percent) + '%';
  };

  _proto3.cssOffsetCenter = function cssOffsetCenter(options) {
    const _this$Direction3 = this.Direction,
      resolve = _this$Direction3.resolve,
      orient = _this$Direction3.orient;

    if (this.isFixedWidth(options)) {
      const _this$parseCssValue2 = this.parseCssValue(options[resolve('fixedWidth')]),
        value = _this$parseCssValue2.value,
        unit2 = _this$parseCssValue2.unit;

      return [this.buildCssValue(orient(value / 2), unit2)];
    }

    const values = [];
    const perPage = options.perPage,
      gap = options.gap;
    values.push(orient(50 / perPage) + '%');

    if (gap) {
      const _this$parseCssValue3 = this.parseCssValue(gap),
        _value = _this$parseCssValue3.value,
        _unit = _this$parseCssValue3.unit;

      const gapOffset = (_value / perPage - _value) / 2;
      values.push(this.buildCssValue(orient(gapOffset), _unit));
    }

    return values;
  };

  _proto3.cssOffsetGaps = function cssOffsetGaps(options) {
    const cloneCount = this.getCloneCount();

    if (cloneCount && options.gap) {
      const orient = this.Direction.orient;

      const _this$parseCssValue4 = this.parseCssValue(options.gap),
        value = _this$parseCssValue4.value,
        unit2 = _this$parseCssValue4.unit;

      if (this.isFixedWidth(options)) {
        return this.buildCssValue(orient(value * cloneCount), unit2);
      }

      const perPage = options.perPage;
      const gaps = cloneCount / perPage;
      return this.buildCssValue(orient(gaps * value), unit2);
    }

    return '';
  };

  _proto3.resolve = function resolve(prop) {
    return camelToKebab(this.Direction.resolve(prop));
  };

  _proto3.cssPadding = function cssPadding(options, right) {
    const padding = options.padding;
    const prop = this.Direction.resolve(right ? 'right' : 'left', true);
    return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || '0px';
  };

  _proto3.cssTrackHeight = function cssTrackHeight(options) {
    let height = '';

    if (this.isVertical()) {
      height = this.cssHeight(options);
      assert(height, '"height" is missing.');
      height = 'calc(' + height + ' - ' + this.cssPadding(options, false) + ' - ' + this.cssPadding(options, true) + ')';
    }

    return height;
  };

  _proto3.cssHeight = function cssHeight(options) {
    return unit(options.height);
  };

  _proto3.cssSlideWidth = function cssSlideWidth(options) {
    return options.autoWidth ? '' : unit(options.fixedWidth) || (this.isVertical() ? '' : this.cssSlideSize(options));
  };

  _proto3.cssSlideHeight = function cssSlideHeight(options) {
    return unit(options.fixedHeight) || (this.isVertical() ? options.autoHeight ? '' : this.cssSlideSize(options) : this.cssHeight(options));
  };

  _proto3.cssSlideSize = function cssSlideSize(options) {
    const gap = unit(options.gap);
    return 'calc((100%' + (gap && ' + ' + gap) + ')/' + (options.perPage || 1) + (gap && ' - ' + gap) + ')';
  };

  _proto3.cssAspectRatio = function cssAspectRatio(options) {
    const heightRatio = options.heightRatio;
    return heightRatio ? '' + 1 / heightRatio : '';
  };

  _proto3.buildCssValue = function buildCssValue(value, unit2) {
    return '' + value + unit2;
  };

  _proto3.parseCssValue = function parseCssValue(value) {
    if (isString(value)) {
      const number = parseFloat(value) || 0;
      const unit2 = value.replace(/\d*(\.\d*)?/, '') || 'px';
      return {
        value: number,
        unit: unit2,
      };
    }

    return {
      value: value,
      unit: 'px',
    };
  };

  _proto3.parseBreakpoints = function parseBreakpoints() {
    const _this9 = this;

    const breakpoints = this.options.breakpoints;
    this.breakpoints.push(['default', this.options]);

    if (breakpoints) {
      forOwn(breakpoints, (options, width) => {
        _this9.breakpoints.push([width, merge(merge({}, _this9.options), options)]);
      });
    }
  };

  _proto3.isFixedWidth = function isFixedWidth(options) {
    return !!options[this.Direction.resolve('fixedWidth')];
  };

  _proto3.isLoop = function isLoop() {
    return this.options.type === LOOP;
  };

  _proto3.isCenter = function isCenter(options) {
    if (options.focus === 'center') {
      if (this.isLoop()) {
        return true;
      }

      if (this.options.type === SLIDE) {
        return !this.options.trimSpace;
      }
    }

    return false;
  };

  _proto3.isVertical = function isVertical() {
    return this.options.direction === TTB;
  };

  _proto3.buildClasses = function buildClasses() {
    const options = this.options;
    return [CLASS_ROOT, CLASS_ROOT + '--' + options.type, CLASS_ROOT + '--' + options.direction, options.drag && CLASS_ROOT + '--draggable', options.isNavigation && CLASS_ROOT + '--nav', CLASS_ACTIVE, !this.config.hidden && CLASS_RENDERED].filter(Boolean).join(' ');
  };

  _proto3.buildAttrs = function buildAttrs(attrs) {
    let attr = '';
    forOwn(attrs, (value, key) => {
      attr += value ? ' ' + camelToKebab(key) + '="' + value + '"' : '';
    });
    return attr.trim();
  };

  _proto3.buildStyles = function buildStyles(styles) {
    let style = '';
    forOwn(styles, (value, key) => {
      style += ' ' + camelToKebab(key) + ':' + value + ';';
    });
    return style.trim();
  };

  _proto3.renderSlides = function renderSlides() {
    const _this10 = this;

    const tag = this.config.slideTag;
    return this.slides.map((content) => {
      return '<' + tag + ' ' + _this10.buildAttrs(content.attrs) + '>' + (content.html || '') + '</' + tag + '>';
    }).join('');
  };

  _proto3.cover = function cover(content) {
    const styles = content.styles,
      _content$html = content.html,
      html = _content$html === void 0 ? '' : _content$html;

    if (this.options.cover && !this.options.lazyLoad) {
      const src = html.match(/<img.*?src\s*=\s*(['"])(.+?)\1.*?>/);

      if (src && src[2]) {
        styles.background = "center/cover no-repeat url('" + src[2] + "')";
      }
    }
  };

  _proto3.generateClones = function generateClones(contents) {
    const classes = this.options.classes;
    const count = this.getCloneCount();
    const slides = contents.slice();

    while (slides.length < count) {
      push(slides, slides);
    }

    push(slides.slice(-count).reverse(), slides.slice(0, count)).forEach((content, index) => {
      const attrs = assign({}, content.attrs, {
        class: content.attrs.class + ' ' + classes.clone,
      });
      const clone = assign({}, content, {
        attrs: attrs,
      });
      index < count ? contents.unshift(clone) : contents.push(clone);
    });
  };

  _proto3.getCloneCount = function getCloneCount() {
    if (this.isLoop()) {
      const options = this.options;

      if (options.clones) {
        return options.clones;
      }

      const perPage = max.apply(void 0, this.breakpoints.map((_ref6) => {
        const options2 = _ref6[1];
        return options2.perPage;
      }));
      return perPage * ((options.flickMaxPages || 1) + 1);
    }

    return 0;
  };

  _proto3.renderArrows = function renderArrows() {
    let html = '';
    html += '<div class="' + this.options.classes.arrows + '">';
    html += this.renderArrow(true);
    html += this.renderArrow(false);
    html += '</div>';
    return html;
  };

  _proto3.renderArrow = function renderArrow(prev) {
    const _this$options = this.options,
      classes = _this$options.classes,
      i18n = _this$options.i18n;
    const attrs = {
      class: classes.arrow + ' ' + (prev ? classes.prev : classes.next),
      type: 'button',
      ariaLabel: prev ? i18n.prev : i18n.next,
    };
    return '<button ' + this.buildAttrs(attrs) + '><svg xmlns="' + XML_NAME_SPACE + '" viewBox="0 0 ' + SIZE + ' ' + SIZE + '" width="' + SIZE + '" height="' + SIZE + '"><path d="' + (this.options.arrowPath || PATH) + '" /></svg></button>';
  };

  _proto3.html = function html() {
    const _this$config = this.config,
      rootClass = _this$config.rootClass,
      listTag = _this$config.listTag,
      arrows = _this$config.arrows,
      beforeTrack = _this$config.beforeTrack,
      afterTrack = _this$config.afterTrack,
      slider = _this$config.slider,
      beforeSlider = _this$config.beforeSlider,
      afterSlider = _this$config.afterSlider;
    let html = '';
    html += '<div id="' + this.id + '" class="' + this.buildClasses() + ' ' + (rootClass || '') + '">';
    html += '<style>' + this.Style.build() + '</style>';

    if (slider) {
      html += beforeSlider || '';
      html += '<div class="splide__slider">';
    }

    html += beforeTrack || '';

    if (arrows) {
      html += this.renderArrows();
    }

    html += '<div class="splide__track">';
    html += '<' + listTag + ' class="splide__list">';
    html += this.renderSlides();
    html += '</' + listTag + '>';
    html += '</div>';
    html += afterTrack || '';

    if (slider) {
      html += '</div>';
      html += afterSlider || '';
    }

    html += '</div>';
    return html;
  };

  return SplideRenderer;
}();

export { CLASSES, CLASS_ACTIVE, CLASS_ARROW, CLASS_ARROWS, CLASS_ARROW_NEXT, CLASS_ARROW_PREV, CLASS_CLONE, CLASS_CONTAINER, CLASS_FOCUS_IN, CLASS_INITIALIZED, CLASS_LIST, CLASS_LOADING, CLASS_NEXT, CLASS_OVERFLOW, CLASS_PAGINATION, CLASS_PAGINATION_PAGE, CLASS_PREV, CLASS_PROGRESS, CLASS_PROGRESS_BAR, CLASS_ROOT, CLASS_SLIDE, CLASS_SPINNER, CLASS_SR, CLASS_TOGGLE, CLASS_TOGGLE_PAUSE, CLASS_TOGGLE_PLAY, CLASS_TRACK, CLASS_VISIBLE, DEFAULTS, EVENT_ACTIVE, EVENT_ARROWS_MOUNTED, EVENT_ARROWS_UPDATED, EVENT_AUTOPLAY_PAUSE, EVENT_AUTOPLAY_PLAY, EVENT_AUTOPLAY_PLAYING, EVENT_CLICK, EVENT_DESTROY, EVENT_DRAG, EVENT_DRAGGED, EVENT_DRAGGING, EVENT_END_INDEX_CHANGED, EVENT_HIDDEN, EVENT_INACTIVE, EVENT_LAZYLOAD_LOADED, EVENT_MOUNTED, EVENT_MOVE, EVENT_MOVED, EVENT_NAVIGATION_MOUNTED, EVENT_OVERFLOW, EVENT_PAGINATION_MOUNTED, EVENT_PAGINATION_UPDATED, EVENT_READY, EVENT_REFRESH, EVENT_RESIZE, EVENT_RESIZED, EVENT_SCROLL, EVENT_SCROLLED, EVENT_SHIFTED, EVENT_SLIDE_KEYDOWN, EVENT_UPDATED, EVENT_VISIBLE, EventBinder, EventInterface, FADE, LOOP, LTR, RTL, RequestInterval, SLIDE, STATUS_CLASSES, Splide, SplideRenderer, State, TTB, Throttle, Splide as default };
