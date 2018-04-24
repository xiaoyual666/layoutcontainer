/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/node-libs-browser/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utls_ResizeDetector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utls/ResizeDetector */ "./utls/ResizeDetector.js");
/* harmony import */ var _utls_RegionResizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utls/RegionResizer */ "./utls/RegionResizer.js");
/* harmony import */ var _utls_SplitterResizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utls/SplitterResizer */ "./utls/SplitterResizer.js");
/* harmony import */ var _utls_BorderResizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utls/BorderResizer */ "./utls/BorderResizer.js");
/* harmony import */ var _utls_Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utls/Constants */ "./utls/Constants.js");








var defaultExport = function defaultExport(state) {
    this._rootContainerState = state
    this._flattenedStates = this._flattenContainerState()
    this._eventEmitter = new events__WEBPACK_IMPORTED_MODULE_0___default.a()
};

defaultExport.prototype._flattenContainerState = function _flattenContainerState () {
    var flattenContainerStates = {}
    var callback = function(parent, curr) {
        flattenContainerStates[curr.id] = {
            data: curr,
            parent: parent
        }
    }
    this.traverse({
        onCellVisited: callback,
        onContainerVisited: callback
    })
    return flattenContainerStates
};

defaultExport.prototype.getRootContainerState = function getRootContainerState () {
    return this._rootContainerState
};

defaultExport.prototype.getStateByPath = function getStateByPath (path) {
    var state = this._rootContainerState
    path.forEach(function (region) { return state = state[region]; })
    return state
};

defaultExport.prototype.on = function on (type, callback) {
    return this._eventEmitter.on(type, callback)
};

defaultExport.prototype.traverse = function traverse (option) {
    var _traverse = function(parent, state) {
        if (!state) { return }
        if ( state.type === _utls_Constants__WEBPACK_IMPORTED_MODULE_5__["TYPE_CELL"]) {
            if (typeof option.onCellVisited === "function") {
                option.onCellVisited.call(this, parent, state)
            }
        } else {
            _traverse(state, state.top)
            _traverse(state, state.leading)
            _traverse(state, state.center)
            _traverse(state, state.trailing)
            _traverse(state, state.bottom)
                
            if (typeof option.onContainerVisited === "function") {
                option.onContainerVisited.call(this, parent, state)
            }
        }
    }
    _traverse(null, this._rootContainerState)
};

defaultExport.prototype._resizeByRegion = function _resizeByRegion (state, region, offsets) {
    if (!state) { return; }

    switch(region) {
        case "top":
            offsets = _utls_RegionResizer__WEBPACK_IMPORTED_MODULE_2__["default"].moveTopRegion(state, offsets, this._eventEmitter)
            break
        case "leading":
            offsets = _utls_RegionResizer__WEBPACK_IMPORTED_MODULE_2__["default"].moveLeadingRegion(state, offsets, this._eventEmitter)
            break
        case "center":
            offsets = _utls_RegionResizer__WEBPACK_IMPORTED_MODULE_2__["default"].moveCenterRegion(state, offsets, this._eventEmitter)
            break
        case "trailing":
            offsets = _utls_RegionResizer__WEBPACK_IMPORTED_MODULE_2__["default"].moveTrailingRegion(state, offsets, this._eventEmitter)
            break
        case "bottom":
            offsets = _utls_RegionResizer__WEBPACK_IMPORTED_MODULE_2__["default"].moveBottomRegion(state, offsets, this._eventEmitter)
            break
    }

    var parentState = this._flattenedStates[state.id].parent,
        currentStateRegion = state.path[state.path.length - 1]

    this._resizeByRegion(parentState, currentStateRegion, offsets)
};

defaultExport.prototype._resizeBySplitter = function _resizeBySplitter (parentState, region, offsets) {
    var offsetRemainX = offsets[0],
        offsetRemainY = offsets[1]

    switch(region) {
        case "leading":
            offsetRemainY = 0
            offsetRemainX = _utls_SplitterResizer__WEBPACK_IMPORTED_MODULE_3__["default"].moveLeadingSplitter(parentState, offsetRemainX, this._eventEmitter)
            break
        case "top":
            offsetRemainX = 0
            offsetRemainY = _utls_SplitterResizer__WEBPACK_IMPORTED_MODULE_3__["default"].moveTopSplitter(parentState, offsetRemainY, this._eventEmitter)
            break
        case "trailing":
            offsetRemainY = 0
            offsetRemainX = _utls_SplitterResizer__WEBPACK_IMPORTED_MODULE_3__["default"].moveTrailingSplitter(parentState, offsetRemainX, this._eventEmitter)
            break
        case "bottom":
            offsetRemainX = 0
            offsetRemainY = _utls_SplitterResizer__WEBPACK_IMPORTED_MODULE_3__["default"].moveBottomSplitter(parentState, offsetRemainY, this._eventEmitter)
            break
    }
        
    return [offsetRemainX, offsetRemainY]
};

defaultExport.prototype.resizeBySplitter = function resizeBySplitter (path, offsets) {
    var pathLen = path.length,
        region = path[pathLen - 1],
        parentState = this._rootContainerState,
        leafState = this._rootContainerState

    path.forEach(function(key, index) {
        if (index != pathLen - 1) {
            leafState = parentState = parentState[key]
        } else {
            leafState = leafState[key]
        }
    })
    var remainOffsets = this._resizeBySplitter(parentState, region, offsets)
    this._resizeByRegion(parentState, region, remainOffsets)
    this._resizeBySplitter(parentState, region, remainOffsets)
};

defaultExport.prototype.resizeByEdge = function resizeByEdge (edge, offset) {
    switch(edge) {
        case "top":
            _utls_BorderResizer__WEBPACK_IMPORTED_MODULE_4__["default"].moveTopBorder(this._rootContainerState, offset, this._eventEmitter)
            break;
        case "bottom":
            _utls_BorderResizer__WEBPACK_IMPORTED_MODULE_4__["default"].moveBottomBorder(this._rootContainerState, offset, this._eventEmitter)
            break;
        case "left":
            _utls_BorderResizer__WEBPACK_IMPORTED_MODULE_4__["default"].moveLeftBorder(this._rootContainerState, offset, this._eventEmitter)
            break;
        case "right":
            _utls_BorderResizer__WEBPACK_IMPORTED_MODULE_4__["default"].moveRightBorder(this._rootContainerState, offset, this._eventEmitter)
            break;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (defaultExport);

/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/events/events.js":
/*!**********************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/events/events.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    { throw TypeError('n must be a positive number'); }
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var this$1 = this;

  var er, handler, len, args, i, listeners;

  if (!this._events)
    { this._events = {}; }

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    { return false; }

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      { listeners[i].apply(this$1, args); }
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    { throw TypeError('listener must be a function'); }

  if (!this._events)
    { this._events = {}; }

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    { this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener); }

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    { this._events[type] = listener; }
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    { this._events[type].push(listener); }
  else
    // Adding the second element, need to change to array.
    { this._events[type] = [this._events[type], listener]; }

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    { throw TypeError('listener must be a function'); }

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    { throw TypeError('listener must be a function'); }

  if (!this._events || !this._events[type])
    { return this; }

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      { this.emit('removeListener', type, listener); }

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      { return this; }

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      { this.emit('removeListener', type, listener); }
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var this$1 = this;

  var key, listeners;

  if (!this._events)
    { return this; }

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      { this._events = {}; }
    else if (this._events[type])
      { delete this._events[type]; }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this$1._events) {
      if (key === 'removeListener') { continue; }
      this$1.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      { this$1.removeListener(type, listeners[listeners.length - 1]); }
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    { ret = []; }
  else if (isFunction(this._events[type]))
    { ret = [this._events[type]]; }
  else
    { ret = this._events[type].slice(); }
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      { return 1; }
    else if (evlistener)
      { return evlistener.length; }
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ "./utls/BorderResizer.js":
/*!*******************************!*\
  !*** ./utls/BorderResizer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./utls/Constants.js");
/* harmony import */ var _Mover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Mover */ "./utls/Mover.js");
/* harmony import */ var _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ResizeDetector */ "./utls/ResizeDetector.js");




function moveBottomBorder (state, offset, emitter) {
    if (!state || offset === 0) { return }
    if (state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) {
        state.height += offset
        state.availableVerticalSpace += offset
        if (emitter) {
            emitter.emit("resizing", {
                state: state,
                key: "height"
            })
        }
        return 0
    } else {
        var offsetRemain = offset,
            offsetCanUse = 0,
            availableVerticalSpace = 0

        if (offsetRemain < 0) {

            // eat space on bottom region
            availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpace(state.bottom)
            offsetCanUse = -Math.min(availableVerticalSpace, -offsetRemain)
            offsetRemain = offsetRemain - offsetCanUse
            moveBottomBorder(state.bottom, offsetCanUse, emitter)

            if (offsetRemain === 0) { return offsetRemain }

            availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpaceBetweenTopBottom(state)
            offsetCanUse = -Math.min(availableVerticalSpace, -offsetRemain)
            offsetRemain = offsetRemain - offsetCanUse
            moveBottomBorder(state.leading, offsetCanUse, emitter)
            moveBottomBorder(state.center, offsetCanUse, emitter)
            moveBottomBorder(state.trailing, offsetCanUse, emitter)
            Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(state.bottom, offsetCanUse, emitter)

            // eat space on the top region.
            if (state.top) {
                availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpace(state.top)
                offsetCanUse = -Math.min(availableVerticalSpace, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                moveBottomBorder(state.top, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(state.leading, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(state.center, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(state.trailing, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(state.bottom, offsetCanUse, emitter)
            }
            return offsetRemain

        } else {
            if (state.bottom) {
                moveBottomBorder(state.bottom, offset, emitter)
            } else if (state.leading || state.center || state.trailing) {
                moveBottomBorder(state.leading, offset, emitter)
                moveBottomBorder(state.center, offset, emitter)
                moveBottomBorder(state.trailing, offset, emitter)
            } else {
                moveBottomBorder(state.top, offset, emitter)
            }
            return 0
        }
    }
}

function moveLeftBorder (state, offset, emitter) {
    if (!state || offset === 0) { return }
    if (state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) {
        state.x += offset
        state.width -= offset
        state.availableHorizontalSpace -= offset
        if (emitter) {
            emitter.emit("resizing", {
                state: state,
                key: "x"
            })
            emitter.emit("resizing", {
                state: state,
                key: "width"
            })

        }
        return 0
    } else {
        var offsetRemain = offset,
            offsetCanUse = 0,
            availableHorizontalSpace =0,
            availableHorizontalSpaceForCLT = 0,
            availableHorizontalSpaceForLeading = 0,
            availableHorizontalSpaceForCenter = 0,
            availableHorizontalSpaceForTrailing = 0

        if (offset > 0) {
            availableHorizontalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state)
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }

            if (state.leading) {
                availableHorizontalSpaceForLeading = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.leading)
                offsetCanUse = Math.min(availableHorizontalSpaceForLeading, availableHorizontalSpace, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace -= offsetCanUse

                moveLeftBorder(state.top, offsetCanUse, emitter)
                moveLeftBorder(state.leading, offsetCanUse, emitter)
                moveLeftBorder(state.bottom, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }
            if (state.center) {
                availableHorizontalSpaceForCenter = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.center)
                offsetCanUse = Math.min(availableHorizontalSpace,availableHorizontalSpaceForCenter, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace -= offsetCanUse

                moveLeftBorder(state.top, offsetCanUse, emitter)
                moveLeftBorder(state.bottom, offsetCanUse, emitter)
                moveLeftBorder(state.center, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(state.leading, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }
            if (state.trailing) {
                availableHorizontalSpaceForTrailing = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.trailing)
                offsetCanUse = Math.min(availableHorizontalSpace, availableHorizontalSpaceForTrailing, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace -= offsetCanUse
                moveLeftBorder(state.top, offsetCanUse, emitter)
                moveLeftBorder(state.bottom, offsetCanUse, emitter)
                moveLeftBorder(state.trailing, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(state.leading, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(state.center, offsetCanUse, emitter)
            }
            return offsetRemain

        } else {
            moveLeftBorder(state.top, offset, emitter)
            if (state.leading) {
                moveLeftBorder(state.leading, offset, emitter)
            } else if (state.center) {
                moveLeftBorder(state.center, offset, emitter)
            } else {
                moveLeftBorder(state.trailing, offset, emitter)
            }
            moveLeftBorder(state.bottom, offset, emitter)
            return 0
        }
    }
}

function moveRightBorder(state, offset, emitter) {
    if (!state || offset === 0) { return offset }
    if (state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) {
        state.width += offset
        state.availableHorizontalSpace += offset
        if (emitter) {
            emitter.emit("resizing", {
                state: state,
                key: "width"
            })
        }
        return offset
    } else {
        var offsetRemain = offset,
            offsetCanUse = 0,
            availableHorizontalSpace =0,
            availableHorizontalSpaceForCLT = 0,
            availableHorizontalSpaceForLeading = 0,
            availableHorizontalSpaceForCenter = 0,
            availableHorizontalSpaceForTrailing = 0

        if (offset < 0) {
            availableHorizontalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state)
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }
            if (state.trailing) {
                availableHorizontalSpaceForTrailing = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.trailing)
                offsetCanUse = -Math.min(availableHorizontalSpaceForTrailing, availableHorizontalSpace, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace += offsetCanUse

                moveRightBorder(state.top, offsetCanUse, emitter)
                moveRightBorder(state.trailing, offsetCanUse, emitter)
                moveRightBorder(state.bottom, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }
            if (state.center) {
                availableHorizontalSpaceForCenter = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.center)
                offsetCanUse = -Math.min(availableHorizontalSpace,availableHorizontalSpaceForCenter, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace += offsetCanUse

                moveRightBorder(state.top, offsetCanUse, emitter)
                moveRightBorder(state.bottom, offsetCanUse, emitter)
                moveRightBorder(state.center, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(state.trailing, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }
            if (state.leading) {
                availableHorizontalSpaceForLeading = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.leading)
                offsetCanUse = -Math.min(availableHorizontalSpace, availableHorizontalSpaceForLeading, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace += offsetCanUse
                moveRightBorder(state.top, offsetCanUse, emitter)
                moveRightBorder(state.bottom, offsetCanUse, emitter)
                moveRightBorder(state.leading, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(state.trailing, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(state.center, offsetCanUse, emitter)
            }
            return offsetRemain

        // drag -> right
        } else {
            moveRightBorder(state.top, offset, emitter)
            if (state.trailing) {
                moveRightBorder(state.trailing, offset, emitter)
            } else if (state.center) {
                moveRightBorder(state.center, offset, emitter)
            } else {
                moveRightBorder(state.leading, offset, emitter)
            }
            moveRightBorder(state.bottom, offset, emitter)
            return 0
        }
    }
}

function moveTopBorder (state, offset, emitter) {
    if (!state || offset === 0) { return }
    if (state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) {
        state.y += offset
        state.height -= offset
        state.availableVerticalSpace -= offset
        if (emitter) {
            emitter.emit("resizing", {
                state: state,
                key: "y"
            })
            emitter.emit("resizing", {
                state: state,
                key: "height"
            })
        }
        return 0
    } else {
        var offsetRemain = offset,
            offsetCanUse = 0,
            availableVerticalSpace = 0

        if (offsetRemain > 0) {

            if (state.top) {
                availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpace(state.top)
                offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                moveTopBorder(state.top, offsetCanUse, emitter)
            }

            if (offsetRemain === 0) { return offsetRemain }

            availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpaceBetweenTopBottom(state)
            offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
            offsetRemain = offsetRemain - offsetCanUse
            moveTopBorder(state.leading, offsetCanUse, emitter)
            moveTopBorder(state.center, offsetCanUse, emitter)
            moveTopBorder(state.trailing, offsetCanUse, emitter)
            Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(state.top, offsetCanUse, emitter)

            // eat space in bottom region
            if (state.bottom) {
                availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpace(state.bottom)
                offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                moveTopBorder(state.bottom, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(state.leading, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(state.center, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(state.trailing, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(state.top, offsetCanUse, emitter)
            }
            return offsetRemain

        // drag -> up
        } else {
            if (state.top) {
                moveTopBorder(state.top, offset, emitter)
            } else if (state.leading || state.center || state.trailing) {
                moveTopBorder(state.leading, offset, emitter)
                moveTopBorder(state.center, offset, emitter)
                moveTopBorder(state.trailing, offset, emitter)
            } else {
                moveTopBorder(state.bottom, offset, emitter)
            }
            return 0
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = ({ moveBottomBorder: moveBottomBorder, moveLeftBorder: moveLeftBorder, moveTopBorder: moveTopBorder, moveRightBorder: moveRightBorder });



/***/ }),

/***/ "./utls/Constants.js":
/*!***************************!*\
  !*** ./utls/Constants.js ***!
  \***************************/
/*! exports provided: TYPE_CELL, TYPE_CONTAINER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_CELL", function() { return TYPE_CELL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_CONTAINER", function() { return TYPE_CONTAINER; });
var TYPE_CELL = "LAYOUT_CELL"
var TYPE_CONTAINER = "LAYOUT_CONTAINER"

/***/ }),

/***/ "./utls/Mover.js":
/*!***********************!*\
  !*** ./utls/Mover.js ***!
  \***********************/
/*! exports provided: moveVertically, moveHorizontally */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveVertically", function() { return moveVertically; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveHorizontally", function() { return moveHorizontally; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./utls/Constants.js");


function _move(state, offset, key, emitter) {
    if (!state || offset === 0) { return; }
    if (state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) {
        state[key] += offset;
        if (emitter) {
            emitter.emit("resizing", {
                state: state,
                key: key
            })
        }
    } else {
        _move(state.top, offset, key, emitter);
        _move(state.leading, offset, key, emitter);
        _move(state.center, offset, key, emitter);
        _move(state.trailing, offset, key, emitter);
        _move(state.bottom, offset, key, emitter);
    }
}

function moveVertically(state, offset, emitter) {
    _move(state, offset, "y", emitter)
}

function moveHorizontally(state, offset, emitter) {
    _move(state, offset, "x", emitter)
}



/***/ }),

/***/ "./utls/RegionResizer.js":
/*!*******************************!*\
  !*** ./utls/RegionResizer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SplitterResizer */ "./utls/SplitterResizer.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./utls/Constants.js");



function moveLeadingRegionVertically(state, offset, emitter) {
    if (offset === 0) { return offset }
    return offset > 0 ? _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__["default"].moveBottomSplitter(state, offset, emitter) : moveTopSplitter(state, offset, emitter)
}

function moveLeadingRegionHorizontally(state, offset, emitter) {
    if (offset === 0) { return offset }
    return offset > 0 ? _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__["default"].moveLeadingSplitter(state, offset, emitter) : offset
}

function moveLeadingRegion(state, offsets, emitter) {
    if (!state || state.type === _Constants__WEBPACK_IMPORTED_MODULE_1__["TYPE_CELL"]) { return offsets }
    return [
        moveLeadingRegionHorizontally(state, offsets[0], emitter),
        moveLeadingRegionVertically(state, offsets[1], emitter)
    ]
}

function moveTopRegionVertically(state, offset, emitter) {
    if (offset === 0) { return offset }
    return offset > 0 ? _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__["default"].moveTopSplitter(state, offset, emitter) : offset
}

function moveTopRegion(state, offsets, emitter) {
    if (!state || state.type === _Constants__WEBPACK_IMPORTED_MODULE_1__["TYPE_CELL"]) { return offsets }
    return [
        offsets[0],
        moveTopRegionVertically(state, offsets[1], emitter)
    ]
}

function moveBottomRegionVertically(state, offset, emitter) {
    if (offset === 0) { return offset }
    return offset > 0 ? offset : _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__["default"].moveBottomSplitter(state, offset, emitter)
}


function moveBottomRegion(state, offsets, emitter) {
    if (!state || state.type === _Constants__WEBPACK_IMPORTED_MODULE_1__["TYPE_CELL"]) { return offsets }
    return [
        offsets[0],
        moveBottomRegionVertically(state, offsets[1], emitter)
    ]
}


function moveTrailingRegionVertically(state, offset, emitter) {
    if (offset === 0) { return offset }
    return offset > 0 ? _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__["default"].moveBottomSplitter(state, offset, emitter) : _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__["default"].moveTopSplitter(state, offset, emitter)
}

function moveTrailingRegionHorizontally(state, offset, emitter) {
    if (offset === 0) { return offset }
    return offset > 0 ? offset : _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__["default"].moveTrailingSplitter(state, offset, emitter)
}

function moveTrailingRegion(state, offsets, emitter) {
    if (!state || state.type === _Constants__WEBPACK_IMPORTED_MODULE_1__["TYPE_CELL"]) { return offsets }
    return [
        moveTrailingRegionHorizontally(state, offsets[0], emitter),
        moveTrailingRegionVertically(state, offsets[1], emitter)
    ]
}

function moveCenterRegionHorizontally(state, offset, emitter) {
    if (offset ===0 ) { return offset }
    return offset > 0 ? _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__["default"].moveTrailingSplitter(state, offset, emitter): _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__["default"].moveLeadingSplitter(state, offset, emitter)
}

function moveCenterRegionVertically(state, offset, emitter) {
    if (offset === 0) { return offset }
    return offset > 0 ? _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__["default"].moveBottomSplitter(state, offset, emitter) : _SplitterResizer__WEBPACK_IMPORTED_MODULE_0__["default"].moveTopSplitter(state, offset, emitter)
}

function moveCenterRegion(state, offsets, emitter) {
    return [
        moveCenterRegionHorizontally(state, offsets[0], emitter),
        moveCenterRegionVertically(state, offsets[1], emitter)
    ]
}

/* harmony default export */ __webpack_exports__["default"] = ({moveTopRegion: moveTopRegion, moveLeadingRegion: moveLeadingRegion, moveCenterRegion: moveCenterRegion, moveTrailingRegion: moveTrailingRegion, moveBottomRegion: moveBottomRegion});

/***/ }),

/***/ "./utls/ResizeDetector.js":
/*!********************************!*\
  !*** ./utls/ResizeDetector.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./utls/Constants.js");


function findVerticalSpace(state) {
    if (!state) { return 0 }
    if (state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) { return state.availableVerticalSpace }
    var verticalSpace = 0
    if (state.top) { verticalSpace += findVerticalSpace(state.top) }
    if (state.bottom) { verticalSpace += findVerticalSpace(state.bottom) }
    verticalSpace += findVerticalSpaceBetweenTopBottom(state)
    return verticalSpace
}

function findHorizontalSpace(state) {
    if (!state) { return 0 }
    if (state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) { return state.availableHorizontalSpace }
    var horizontalSpace = 0,
        horizontalSpaceForTopBottom = 0,
        horizontalSpaceForLeadingCenterTrailing =0
    
    if (state.top && state.bottom) {
        horizontalSpaceForTopBottom = Math.min(findHorizontalSpace(state.top), findHorizontalSpace(state.bottom))
    } else if (state.top) {
        horizontalSpaceForTopBottom = findHorizontalSpace(state.top) 
    } else if (state.bottom) {
        borizontalSpaceForTopBottom = findHorizontalSpace(state.bottom)
    } else {
        horizontalSpaceForTopBottom = Number.POSITIVE_INFINITY
    }

    if (state.leading) { horizontalSpaceForLeadingCenterTrailing += findHorizontalSpace(state.leading) }
    if (state.center) { horizontalSpaceForLeadingCenterTrailing += findHorizontalSpace(state.center) }
    if (state.trailing) { horizontalSpaceForLeadingCenterTrailing += findHorizontalSpace(state.trailing) }

    if (!state.leading && !state.center && !state.trailing) { horizontalSpaceForLeadingCenterTrailing = Number.POSITIVE_INFINITY }
    horizontalSpace = Math.min(horizontalSpaceForTopBottom, horizontalSpaceForLeadingCenterTrailing)

    if (horizontalSpace === Number.POSITIVE_INFINITY) { return 0 }
    return horizontalSpace

}

function findVerticalSpaceBelowTop(state) {
    var verticalSpace = findVerticalSpaceBetweenTopBottom(state)
    if (state.bottom) { verticalSpace += findVerticalSpace(state.bottom) }
    return verticalSpace
}

function findVerticalSpaceAboveBottom(state) {
    var verticalSpace = findVerticalSpaceBetweenTopBottom(state)
    if (state.top) { verticalSpace += findVerticalSpace(state.top) }
    return verticalSpace
}

function findVerticalSpaceBetweenTopBottom(state) {
    var verticalSpace = Number.POSITIVE_INFINITY
    if (!state.leading && !state.center && !state.trailing) { return 0 }
    if (state.leading) { verticalSpace = Math.min(verticalSpace, findVerticalSpace(state.leading)) }
    if (state.center) { verticalSpace = Math.min(verticalSpace, findVerticalSpace(state.center)) }
    if (state.trailing) { verticalSpace = Math.min(verticalSpace, findVerticalSpace(state.trailing)) }
    return verticalSpace
}

function findHorizontalSpaceAfterLeading(state) {
    var horizontalSpace = 0
    if (state.center) { horizontalSpace += findHorizontalSpace(state.center) }
    if (state.trailing) { horizontalSpace += findHorizontalSpace(state.trailing) }
    return horizontalSpace
}

function findHorizontalSpaceBeforeTrailing(state) {
    var horizontalSpace = 0
    if (state.center) { horizontalSpace += findHorizontalSpace(state.center) }
    if (state.leading) { horizontalSpace += findHorizontalSpace(state.leading) }
    return horizontalSpace
}

/* harmony default export */ __webpack_exports__["default"] = ({
    findVerticalSpace: findVerticalSpace,
    findHorizontalSpace: findHorizontalSpace,
    findVerticalSpaceBelowTop: findVerticalSpaceBelowTop,
    findVerticalSpaceAboveBottom: findVerticalSpaceAboveBottom,
    findVerticalSpaceBetweenTopBottom: findVerticalSpaceBetweenTopBottom,
    findHorizontalSpaceAfterLeading: findHorizontalSpaceAfterLeading,
    findHorizontalSpaceBeforeTrailing: findHorizontalSpaceBeforeTrailing
});





/***/ }),

/***/ "./utls/SplitterResizer.js":
/*!*********************************!*\
  !*** ./utls/SplitterResizer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./utls/Constants.js");
/* harmony import */ var _BorderResizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BorderResizer */ "./utls/BorderResizer.js");
/* harmony import */ var _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ResizeDetector */ "./utls/ResizeDetector.js");
/* harmony import */ var _Mover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Mover */ "./utls/Mover.js");





function moveTopSplitter(state, offset, emitter) {
    if (!state || offset === 0 || state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) { return offset }

    var offsetRemain = offset,
        offsetCanUse = 0,
        availableVerticalSpace = 0
    
        if (offsetRemain > 0) {
            availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpaceBetweenTopBottom(state)
            offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
            offsetRemain -= offsetCanUse

            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.top, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.leading, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.center, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.trailing, offsetCanUse, emitter)

            availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpace(state.bottom)
            offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
            offsetRemain -= offsetCanUse

            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.top, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.bottom, offsetCanUse, emitter)

            Object(_Mover__WEBPACK_IMPORTED_MODULE_3__["moveVertically"])(state.leading, offsetCanUse, emitter)
            Object(_Mover__WEBPACK_IMPORTED_MODULE_3__["moveVertically"])(state.center, offsetCanUse, emitter)
            Object(_Mover__WEBPACK_IMPORTED_MODULE_3__["moveVertically"])(state.trailing, offsetCanUse, emitter)

        } else {
            availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpace(state.top)
            offsetCanUse = - Math.min(availableVerticalSpace, - offsetRemain)
            offsetRemain -= offsetCanUse

            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.top, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.leading, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.center, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.trailing, offsetCanUse, emitter)
        }

    return offsetRemain
}

function moveLeadingSplitter(state, offset, emitter) {
    if (!state || offset === 0 || state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) { return offset }
    var offsetRemain = offset,
        offsetCanUse = 0,
        availableHorizontalSpace = 0

    if (offsetRemain > 0) {
        if (state.center) {
            availableHorizontalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.center)
            offsetCanUse = Math.min(offsetRemain, availableHorizontalSpace)
            offsetRemain -= offsetCanUse

            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveRightBorder(state.leading, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeftBorder(state.center, offsetCanUse, emitter)
        }

        if (state.trailing) {
            availableHorizontalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.trailing)
            offsetCanUse = Math.min(offsetRemain, availableHorizontalSpace)
            offsetRemain -= offsetCanUse

            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveRightBorder(state.leading, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeftBorder(state.trailing, offsetCanUse, emitter)

            Object(_Mover__WEBPACK_IMPORTED_MODULE_3__["moveHorizontally"])(state.center, offsetCanUse, emitter)
        }
    } else {
        availableHorizontalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.leading)
        offsetCanUse = - Math.min(availableHorizontalSpace, -offsetRemain)
        offsetRemain -= offsetCanUse

        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveRightBorder(state.leading, offsetCanUse, emitter)
        if (state.center) {
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeftBorder(state.center, offsetCanUse, emitter)
        } else {
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeftBorder(state.trailing, offsetCanUse, emitter)
        }
    }
    return offsetRemain
}

function moveTrailingSplitter(state, offset, emitter) {
    if (!state || offset === 0 || state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) { return offset; }

    var offsetRemain = offset,
        offsetCanUse = 0,
        availableHorizontalSpace = 0;

    if (offsetRemain < 0) {

        if (state.center) {
            availableHorizontalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.center);
            offsetCanUse = -Math.min(-offsetRemain, availableHorizontalSpace);
            offsetRemain = offsetRemain - offsetCanUse;
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeftBorder(state.trailing, offsetCanUse, emitter);
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveRightBorder(state.center, offsetCanUse, emitter);
        }

        if (state.leading) {
            availableHorizontalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.leading);
            offsetCanUse = -Math.min(-offsetRemain, availableHorizontalSpace);
            offsetRemain = offsetRemain - offsetCanUse;
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveRightBorder(state.leading, offsetCanUse, emitter);
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeftBorder(state.trailing, offsetCanUse, emitter);
            Object(_Mover__WEBPACK_IMPORTED_MODULE_3__["moveHorizontally"])(state.center, offsetCanUse, emitter);
        }

    } else {
        availableHorizontalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findHorizontalSpace(state.trailing);
        offsetCanUse = Math.min(offsetRemain, availableHorizontalSpace);
        offsetRemain = offsetRemain - offsetCanUse;
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeftBorder(state.trailing, offsetCanUse, emitter);
        if (state.center) {
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveRightBorder(state.center, offsetCanUse, emitter);
        } else {
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveRightBorder(state.leading, offsetCanUse, emitter);
        }
    }
    return offsetRemain
}

function moveBottomSplitter(state, offset, emitter) {
    if (!state || offset === 0 || state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) { return offset }

    var offsetRemain = offset,
        offsetCanUse = 0,
        availableVerticalSpace = 0

    if (offsetRemain < 0) {

        availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpaceBetweenTopBottom(state);

        offsetCanUse = - Math.min(availableVerticalSpace, -offsetRemain);
        offsetRemain = offsetRemain - offsetCanUse;

        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.bottom, offsetCanUse, emitter);
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.leading, offsetCanUse, emitter);
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.center, offsetCanUse, emitter);
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.trailing, offsetCanUse, emitter);

        availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpace(state.top);
        if (availableVerticalSpace === Number.POSITIVE_INFINITY) {
            availableVerticalSpace = 0;
        }
        offsetCanUse = - Math.min(availableVerticalSpace, -offsetRemain);
        offsetRemain = offsetRemain - offsetCanUse;
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.top, offsetCanUse, emitter);
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.bottom, offsetCanUse, emitter);
        Object(_Mover__WEBPACK_IMPORTED_MODULE_3__["moveVertically"])(state.leading, offsetCanUse, emitter)
        Object(_Mover__WEBPACK_IMPORTED_MODULE_3__["moveVertically"])(state.center, offsetCanUse, emitter)
        Object(_Mover__WEBPACK_IMPORTED_MODULE_3__["moveVertically"])(state.trailing, offsetCanUse, emitter)

    } else {

        availableVerticalSpace = _ResizeDetector__WEBPACK_IMPORTED_MODULE_2__["default"].findVerticalSpace(state.bottom);
        offsetCanUse = Math.min(availableVerticalSpace, offsetRemain);
        offsetRemain = offsetRemain - offsetCanUse;
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.bottom, offsetCanUse, emitter);
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.leading, offsetCanUse, emitter);
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.center, offsetCanUse, emitter);
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.trailing, offsetCanUse, emitter);
    }
    return offsetRemain;
}


/* harmony default export */ __webpack_exports__["default"] = ({ moveTopSplitter: moveTopSplitter, moveBottomSplitter: moveBottomSplitter, moveLeadingSplitter: moveLeadingSplitter, moveTrailingSplitter: moveTrailingSplitter });

/***/ })

/******/ });
//# sourceMappingURL=LayoutContainer.js.map