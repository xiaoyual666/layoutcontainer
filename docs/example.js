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
/******/ 	return __webpack_require__(__webpack_require__.s = "./example/example.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./example/example.js":
/*!****************************!*\
  !*** ./example/example.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../index */ "./index.js");


var containerDom = document.querySelector(".main-container")
console.log(containerDom)

var data = {
    id: "container",
    type: "LAYOUT_CONTAINER",
    path: [],
    top: {
        id: "cell_top",
        type: "LAYOUT_CELL",
        path: ["top"],
        x: 0,
        y: 0,
        width: 500,
        height: 100,
        availableHorizontalSpace: 480,
        availableVerticalSpace: 80
    }, 
    leading: {
        id: "cell_leading",
        type: "LAYOUT_CELL",
        path: ["leading"],
        x: 0,
        y: 100,
        width: 150,
        height: 300,
        availableHorizontalSpace: 130,
        availableVerticalSpace: 280
    },
    center: {
        id: "cell_center",
        type: "LAYOUT_CELL",
        path: ["center"],
        x: 150,
        y: 100,
        width: 200,
        height: 300,
        availableHorizontalSpace: 180,
        availableVerticalSpace: 280
    },
    trailing: {
        id: "cell_tailing",
        type: "LAYOUT_CELL",
        path: ["tailing"],
        x: 350,
        y: 100,
        width: 150,
        height: 300,
        availableHorizontalSpace: 130,
        availableVerticalSpace: 280
    },
    bottom: {
        id: "cell_bottom",
        type: "LAYOUT_CELL",
        path: ["top"],
        x: 0,
        y: 400,
        width: 500,
        height: 100,
        availableHorizontalSpace: 480,
        availableVerticalSpace: 80
    }
}
var layoutContainer = new _index__WEBPACK_IMPORTED_MODULE_0__["default"](data)
var widgetsMap = {}

function createCell(state) {
    var cell = document.createElement("div")
    cell.classList.add("layout-cell")
    cell.setAttribute("data-layout-path", state.path.join(","))
    cell.style.position = "absolute"
    return cell
}
function createSplitter(state) {
    var splitter = document.createElement("div")
    splitter.classList.add("layout-splitter")
    splitter.setAttribute("data-layout-path", state.path.join(","))
    splitter.style.position = "absolute"
    return splitter
}

function updateCell(cell, state) {
    cell.style.left = state.x + "px"
    cell.style.left = state.x + "px"
    cell.style.top = state.y + "px"
    cell.style.width = state.width + "px"
    cell.style.height = state.height + "px"
}

function updateSplitter(splitter, state) {
    var region = state.path[state.path.length - 1]
    switch(region) {
        case "top":
            splitter.style.top = state.y + state.height - 4 + "px"
            splitter.style.left = state.x + "px"
            splitter.style.width = state.width + "px"
            splitter.style.height = "7px"
            break
        case "leading":
            splitter.style.top = state.y + "px"
            splitter.style.left = state.x + state.width - 4 + "px"
            splitter.style.width = "7px"
            splitter.style.height = state.height + "px"
            break
        case "trailing":
            splitter.style.top = state.y + "px"
            splitter.style.left = state.x - 4 + "px"
            splitter.style.width = "7px"
            splitter.style.height = state.height + "px"
            break
        case "bottom":
            splitter.style.top = state.y - 4 + "px"
            splitter.style.left = state.x + "px"
            splitter.style.width = state.width + "px"
            splitter.style.height = "7px"
            break
    }
}

layoutContainer.traverse({
    onCellVisited: function onCellVisited(parent, current) {
        var cell = createCell(current),
            splitter = createSplitter(current)
        containerDom.appendChild(cell)
        containerDom.appendChild(splitter)
        widgetsMap[current.id] = {cell: cell, splitter: splitter }
    }
})

layoutContainer.on("resizing", function (state) {
    updateSplitter(widgetsMap[state.id].splitter, state)
    updateCell(widgetsMap[state.id].cell, state)
})

window.drag = function(path, x, y) {
    layoutContainer.resizeBySplitter(path, [x,y])
}

/***/ }),

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
/* harmony import */ var _utls_Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utls/Constants */ "./utls/Constants.js");







var defaultExport = function defaultExport(state) {
    this._rootContainerState = state
    this._flattenedStates = this._flattenContainerState(this._rootContainerState)
    this._eventEmitter = new events__WEBPACK_IMPORTED_MODULE_0___default.a()
};

defaultExport.prototype._flattenContainerState = function _flattenContainerState (state) {
    var flattenContainerStates = {}
    var callback = function(parent, curr) {
        flattenContainerStates[curr.id] = {
            data: curr,
            parent: parent
        }
    }
    this.traverse(state, {
        onCellVisited: callback,
        onContainerVisited: callback
    })
};

defaultExport.prototype.on = function on (type, callback) {
    return this._eventEmitter(type, callback)
};

defaultExport.prototype.traverse = function traverse (option) {
    var _traverse = function(parent, state) {
        if ( state.type === _utls_Constants__WEBPACK_IMPORTED_MODULE_4__["TYPE_CELL"]) {
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
                option.onContainerVisite.call(this, parent, state)
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

    parentState = this._flattenedStates[state.id].parent
    currentStateRegion = state.path[state.path.length - 1]

    this._resizeByRegion(parentState, currentStateRegion, offsets)
};

defaultExport.prototype.resizeBySplitter = function resizeBySplitter (path, offsets) {
    var offsetX = offset[0],
        offsetY = offset[1],
        offsetRemainX = offsetX,
        offsetRemainY = offsetY,
        offsetUsed = 0,
        pathLen = path.length,
        region = path[pathLen - 1],
        parentState = rootState,
        leafState = rootState

    path.forEach(function(key, index) {
        if (index != pathLen - 1) {
            leafState = parentState = parentState[key]
        } else {
            leafState = leafState[key]
        }
    })

    switch(region) {
        case "leading":
            offsetRemainY = 0
            offsetRemainX = _utls_SplitterResizer__WEBPACK_IMPORTED_MODULE_3__["default"].moveLeadingSplitter(parentState, offsetRemainX)
            break
        case "top":
            offsetRemainX = 0
            offsetRemainY = _utls_SplitterResizer__WEBPACK_IMPORTED_MODULE_3__["default"].moveTopSplitter(parentState, offsetRemainY)
            break
        case "trailing":
            offsetRemainY = 0
            offsetRemainX = _utls_SplitterResizer__WEBPACK_IMPORTED_MODULE_3__["default"].moveTrailingSplitter(parentState, offsetRemainX)
            break
        case "bottom":
            offsetRemainX = 0
            offsetRemainY = _utls_SplitterResizer__WEBPACK_IMPORTED_MODULE_3__["default"].moveBottomSplitter(parentState, offsetRemainY)
            break
    }
        
    this._resizeByRegion(parentState, region, [offsetRemainX, offsetRemainY])
};

defaultExport.prototype.resizeByRegion = function resizeByRegion (path, offset) {
    var offsetX = offset[0],
        offsetY = offset[1],
        offsetRemainX = offsetX,
        offsetRemainY = offsetY,
        offsetUsed = 0,
        pathLen = path.length,
        region = path[pathLen - 1],
        parentState = rootState,
        leafState = rootState

    path.forEach(function(key, index) {
        if (index != pathLen - 1) {
            leafState = parentState = parentState[key]
        } else {
            leafState = leafState[key]
        }
    })

    this._resizeByRegion(parentState, region, [offsetRemainX, offsetRemainY])
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



function moveBottomBorder (prop, offset, emitter) {
    if (!prop || offset === 0) { return }
    if (prop.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) {
        prop.height += offset
        prop.availableVerticalSpace += offset
        if (emitter) {
            emitter.emit("resizing", {
                prop: prop,
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
            availableVerticalSpace = ResizeDetector.findVerticalSpace(prop.bottom)
            offsetCanUse = -Math.min(availableVerticalSpace, -offsetRemain)
            offsetRemain = offsetRemain - offsetCanUse
            moveBottomBorder(prop.bottom, offsetCanUse, emitter)

            if (offsetRemain === 0) { return offsetRemain }

            availableVerticalSpace = ResizeDetector.findVerticalSpaceBetweenTopBottom(prop)
            offsetCanUse = -Math.min(availableVerticalSpace, -offsetRemain)
            offsetRemain = offsetRemain - offsetCanUse
            moveBottomBorder(prop.leading, offsetCanUse, emitter)
            moveBottomBorder(prop.center, offsetCanUse, emitter)
            moveBottomBorder(prop.trailing, offsetCanUse, emitter)
            Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(prop.bottom, offsetCanUse, emitter)

            // eat space on the top region.
            if (prop.top) {
                availableVerticalSpace = ResizeDetector.findVerticalSpace(prop.bottom)
                offsetCanUse = -Math.min(availableVerticalSpace, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                moveBottomBorder(prop.top, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(prop.leading, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(prop.center, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(prop.trailing, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(prop.bottom, offsetCanUse, emitter)
            }
            return offsetRemain

        } else {
            if (prop.bottom) {
                moveBottomBorder(prop.bottom, offset, emitter)
            } else if (prop.leading || prop.center || prop.trailing) {
                moveBottomBorder(prop.leading, offset, emitter)
                moveBottomBorder(prop.center, offset, emitter)
                moveBottomBorder(prop.trailing, offset, emitter)
            } else {
                moveBottomBorder(prop.top, offset, emitter)
            }
            return 0
        }
    }
}

function moveLeftBorder (prop, offset, emitter) {
    if (!prop || offset === 0) { return }
    if (prop.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) {
        prop.x += offset
        prop.width -= offset
        prop.availableHorizontalSpace -= offset
        if (emitter) {
            emitter.emit("resizing", {
                prop: prop,
                key: "x"
            })
            emitter.emit("resizing", {
                prop: prop,
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
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(prop)
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }

            if (prop.leading) {
                availableHorizontalSpaceForLeading = ResizeDetector.findHorizontalSpace(prop.leading)
                offsetCanUse = Math.min(availableHorizontalSpaceForLeading, availableHorizontalSpace, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace -= offsetCanUse

                moveLeftBorder(prop.top, offsetCanUse, emitter)
                moveLeftBorder(prop.leading, offsetCanUse, emitter)
                moveLeftBorder(prop.bottom, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }
            if (prop.center) {
                availableHorizontalSpaceForCenter = ResizeDetector.findHorizontalSpace(prop.center)
                offsetCanUse = Math.min(availableHorizontalSpace,availableHorizontalSpaceForCenter, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace -= offsetCanUse

                moveLeftBorder(prop.top, offsetCanUse, emitter)
                moveLeftBorder(prop.bottom, offsetCanUse, emitter)
                moveLeftBorder(prop.center, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(prop.leading, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }
            if (prop.trailing) {
                availableHorizontalSpaceForTrailing = ResizeDetector.findHorizontalSpace(prop.trailing)
                offsetCanUse = Math.min(availableHorizontalSpace, availableHorizontalSpaceForTrailing, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace -= offsetCanUse
                moveLeftBorder(prop.top, offsetCanUse, emitter)
                moveLeftBorder(prop.bottom, offsetCanUse, emitter)
                moveLeftBorder(prop.trailing, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(prop.leading, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(prop.center, offsetCanUse, emitter)
            }
            return offsetRemain

        } else {
            moveLeftBorder(prop.top, offset, emitter)
            if (prop.leading) {
                moveLeftBorder(prop.leading, offset, emitter)
            } else if (prop.center) {
                moveLeftBorder(prop.center, offset, emitter)
            } else {
                moveLeftBorder(prop.trailing, offset, emitter)
            }
            moveLeftBorder(prop.bottom, offset, emitter)
            return 0
        }
    }
}

function moveRightBorder(prop, offset, emitter) {
    if (!prop || offset === 0) { return offset }
    if (prop.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) {
        prop.width += offset
        prop.availableHorizontalSpace += offset
        if (emitter) {
            emitter.emit("resizing", {
                prop: prop,
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
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(prop)
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }
            if (prop.trailing) {
                availableHorizontalSpaceForTrailing = ResizeDetector.findHorizontalSpace(prop.trailing)
                offsetCanUse = -Math.min(availableHorizontalSpaceForTrailing, availableHorizontalSpace, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace += offsetCanUse

                moveRightBorder(prop.top, offsetCanUse, emitter)
                moveRightBorder(prop.trailing, offsetCanUse, emitter)
                moveRightBorder(prop.bottom, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }
            if (prop.center) {
                availableHorizontalSpaceForCenter = ResizeDetector.findHorizontalSpace(prop.center)
                offsetCanUse = -Math.min(availableHorizontalSpace,availableHorizontalSpaceForCenter, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace += offsetCanUse

                moveRightBorder(prop.top, offsetCanUse, emitter)
                moveRightBorder(prop.bottom, offsetCanUse, emitter)
                moveRightBorder(prop.center, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(prop.trailing, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) { return offsetRemain }
            if (prop.leading) {
                availableHorizontalSpaceForLeading = ResizeDetector.findHorizontalSpace(prop.leading)
                offsetCanUse = -Math.min(availableHorizontalSpace, availableHorizontalSpaceForLeading, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace += offsetCanUse
                moveRightBorder(prop.top, offsetCanUse, emitter)
                moveRightBorder(prop.bottom, offsetCanUse, emitter)
                moveRightBorder(prop.leading, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(prop.trailing, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveHorizontally"])(prop.center, offsetCanUse, emitter)
            }
            return offsetRemain

        // drag -> right
        } else {
            moveRightBorder(prop.top, offset, emitter)
            if (prop.trailing) {
                moveRightBorder(prop.trailing, offset, emitter)
            } else if (prop.center) {
                moveRightBorder(prop.center, offset, emitter)
            } else {
                moveRightBorder(prop.leading, offset, emitter)
            }
            moveRightBorder(prop.bottom, offset, emitter)
            return 0
        }
    }
}

function moveTopBorder (prop, offset, emitter) {
    if (!prop || offset === 0) { return }
    if (prop.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) {
        prop.y += offset
        prop.height -= offset
        prop.availableVerticalSpace -= offset
        if (emitter) {
            emitter.emit("resizing", {
                prop: prop,
                key: "y"
            })
            emitter.emit("resizing", {
                prop: prop,
                key: "height"
            })
        }
        return 0
    } else {
        var offsetRemain = offset,
            offsetCanUse = 0,
            availableVerticalSpace = 0

        if (offsetRemain > 0) {

            if (prop.top) {
                availableVerticalSpace = ResizeDetector.findVerticalSpace(prop.top)
                offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                this.resize(prop.top, offsetCanUse, emitter)
            }

            if (offsetRemain === 0) { return offsetRemain }

            availableVerticalSpace = ResizeDetector.findVerticalSpaceBetweenTopBottom(prop)
            offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
            offsetRemain = offsetRemain - offsetCanUse
            moveTopBorder(prop.leading, offsetCanUse, emitter)
            moveTopBorder(prop.center, offsetCanUse, emitter)
            moveTopBorder(prop.trailing, offsetCanUse, emitter)
            Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(prop.top, offsetCanUse, emitter)

            // eat space in bottom region
            if (prop.bottom) {
                availableVerticalSpace = ResizeDetector.findVerticalSpace(prop.bottom)
                offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                moveTopBorder(prop.bottom, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(prop.leading, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(prop.center, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(prop.trailing, offsetCanUse, emitter)
                Object(_Mover__WEBPACK_IMPORTED_MODULE_1__["moveVertically"])(prop.top, offsetCanUse, emitter)
            }
            return offsetRemain

        // drag -> up
        } else {
            if (prop.top) {
                moveTopBorder(prop.top, offset, emitter)
            } else if (prop.leading || prop.center || prop.trailing) {
                moveTopBorder(prop.leading, offset, emitter)
                moveTopBorder(prop.center, offset, emitter)
                moveTopBorder(prop.trailing, offset, emitter)
            } else {
                moveTopBorder(prop.bottom, offset, emitter)
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
function _move(state, offset, key, emitter) {
    if (!state || offset === 0) { return; }
    if (state.type === LayoutTemplateConstants.LAYOUT_REGION) {
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
        offset,
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
        offset,
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
    if (state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) { return state.avaliableVerticalSpace }
    var verticalSpace = 0
    if (state.top) { verticalSpace += findVerticalSpace(state.top) }
    if (state.bottom) { verticalSpace += findVerticalSpace(state.bottom) }
    verticalSpace += getVerticalSpaceBewteenTopBottom(state);
    return verticalSpace
}

function findHorizontalSpace(state) {
    if (!state) { return 0 }
    if (state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) { return state.avaliableHorizontalSpace }
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
/* harmony import */ var _Mover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Mover */ "./utls/Mover.js");




function moveTopSplitter(state, offset, emitter) {
    if (!state || offset === 0 || state.type === _Constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_CELL"]) { return offset }

    var offsetRemain = offset,
        offsetCanUse = 0,
        availableVerticalSpace = 0
    
        if (offsetRemain > 0) {
            availableVerticalSpace = ResizeDetector.findSpaceBetweenTopAndButton(state)
            offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
            offsetRemain -= offsetCanUse

            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.top, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.leading, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.center, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.trailing, offsetCanUse, emitter)

            availableVerticalSpace = ResizeDetector.findVerticalSpace(state.bottom)
            offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
            offsetRemain -= offsetCanUse

            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.top, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.bottom, offsetCanUse, emitter)

            Object(_Mover__WEBPACK_IMPORTED_MODULE_2__["moveVertically"])(state.leading, offsetCanUse, emitter)
            Object(_Mover__WEBPACK_IMPORTED_MODULE_2__["moveVertically"])(state.center, offsetCanUse, emitter)
            Object(_Mover__WEBPACK_IMPORTED_MODULE_2__["moveVertically"])(state.trailing, offsetCanUse, emitter)

        } else {
            availableVerticalSpace = ResizeDetector.findVerticalSpace(state.top)
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
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.center)
            offsetCanUse = Math.min(offsetRemain, availableHorizontalSpace)
            offsetRemain -= offsetCanUse

            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveRightBorder(state.leading, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeftBorder(state.center, offsetCanUse, emitter)
        }

        if (state.trailing) {
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.trailing)
            offsetCanUse = Math.min(offsetRemain, availableHorizontalSpace)
            offsetRemain -= offsetCanUse

            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveRightBorder(state.leading, offsetCanUse, emitter)
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeftBorder(state.trailing, offsetCanUse, emitter)

            Object(_Mover__WEBPACK_IMPORTED_MODULE_2__["moveHorizontally"])(state,center, offsetCanUse, emitter)
        }
    } else {
        availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.leading)
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
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.center);
            offsetCanUse = -Math.min(-offsetRemain, availableHorizontalSpace);
            offsetRemain = offsetRemain - offsetCanUse;
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeftBorder(state.trailing, offsetCanUse, emitter);
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveRightBorder(state.center, offsetCanUse, emitter);
        }

        if (state.leading) {
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.leading);
            offsetCanUse = -Math.min(-offsetRemain, availableHorizontalSpace);
            offsetRemain = offsetRemain - offsetCanUse;
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveRightBorder(state.leading, offsetCanUse, emitter);
            _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeftBorder(state.trailing, offsetCanUse, emitter);
            Object(_Mover__WEBPACK_IMPORTED_MODULE_2__["moveHorizontally"])(state.center, offsetCanUse, emitter);
        }

    } else {
        availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.trailing);
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

        availableVerticalSpace = ResizeDetector.findSpaceBetweenTopAndButton(state);

        offsetCanUse = - Math.min(availableVerticalSpace, -offsetRemain);
        offsetRemain = offsetRemain - offsetCanUse;

        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.bottom, offsetCanUse, emitter);
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.leading, offsetCanUse, emitter);
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.center, offsetCanUse, emitter);
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.trailing, offsetCanUse, emitter);

        availableVerticalSpace = ResizeDetector.findVerticalSpace(state.top);
        if (availableVerticalSpace === Number.POSITIVE_INFINITY) {
            availableVerticalSpace = 0;
        }
        offsetCanUse = - Math.min(availableVerticalSpace, -offsetRemain);
        offsetRemain = offsetRemain - offsetCanUse;
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveBottomBorder(state.top, offsetCanUse, emitter);
        _BorderResizer__WEBPACK_IMPORTED_MODULE_1__["default"].moveTopBorder(state.bottom, offsetCanUse, emitter);
        Object(_Mover__WEBPACK_IMPORTED_MODULE_2__["moveVertically"])(state.leading, offsetCanUse, emitter)
        Object(_Mover__WEBPACK_IMPORTED_MODULE_2__["moveVertically"])(state.center, offsetCanUse, emitter)
        Object(_Mover__WEBPACK_IMPORTED_MODULE_2__["moveVertically"])(state.trailing, offsetCanUse, emitter)

    } else {

        availableVerticalSpace = ResizeDetector.findVerticalSpace(state.bottom);
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
//# sourceMappingURL=example.js.map