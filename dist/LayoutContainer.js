!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.LayoutContainer=e():t.LayoutContainer=e()}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(t){return"function"==typeof t}function r(t){return"object"==typeof t&&null!==t}function o(t){return void 0===t}t.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},n.prototype.emit=function(t){var e,n,a,s,l,c;if(this._events||(this._events={}),"error"===t&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var p=new Error('Uncaught, unspecified "error" event. ('+e+")");throw p.context=e,p}if(o(n=this._events[t]))return!1;if(i(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),n.apply(this,s)}else if(r(n))for(s=Array.prototype.slice.call(arguments,1),a=(c=n.slice()).length,l=0;l<a;l++)c[l].apply(this,s);return!0},n.prototype.addListener=function(t,e){var a;if(!i(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,i(e.listener)?e.listener:e),this._events[t]?r(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,r(this._events[t])&&!this._events[t].warned&&(a=o(this._maxListeners)?n.defaultMaxListeners:this._maxListeners)&&a>0&&this._events[t].length>a&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(t,e){if(!i(e))throw TypeError("listener must be a function");var n=!1;function r(){this.removeListener(t,r),n||(n=!0,e.apply(this,arguments))}return r.listener=e,this.on(t,r),this},n.prototype.removeListener=function(t,e){var n,o,a,s;if(!i(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(a=(n=this._events[t]).length,o=-1,n===e||i(n.listener)&&n.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(r(n)){for(s=a;s-- >0;)if(n[s]===e||n[s].listener&&n[s].listener===e){o=s;break}if(o<0)return this;1===n.length?(n.length=0,delete this._events[t]):n.splice(o,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},n.prototype.removeAllListeners=function(t){var e,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(i(n=this._events[t]))this.removeListener(t,n);else if(n)for(;n.length;)this.removeListener(t,n[n.length-1]);return delete this._events[t],this},n.prototype.listeners=function(t){return this._events&&this._events[t]?i(this._events[t])?[this._events[t]]:this._events[t].slice():[]},n.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(i(e))return 1;if(e)return e.length}return 0},n.listenerCount=function(t,e){return t.listenerCount(e)}},function(t,e,n){"use strict";n.r(e);var i=n(0),r=n.n(i),o="LAYOUT_CELL";function a(t){if(!t)return 0;if(t.type===o)return t.availableVerticalSpace;var e=0;return t.top&&(e+=a(t.top)),t.bottom&&(e+=a(t.bottom)),e+l(t)}function s(t){if(!t)return 0;if(t.type===o)return t.availableHorizontalSpace;var e,n=0,i=0;return t.top&&t.bottom?n=Math.min(s(t.top),s(t.bottom)):t.top?n=s(t.top):t.bottom?borizontalSpaceForTopBottom=s(t.bottom):n=Number.POSITIVE_INFINITY,t.leading&&(i+=s(t.leading)),t.center&&(i+=s(t.center)),t.trailing&&(i+=s(t.trailing)),t.leading||t.center||t.trailing||(i=Number.POSITIVE_INFINITY),(e=Math.min(n,i))===Number.POSITIVE_INFINITY?0:e}function l(t){var e=Number.POSITIVE_INFINITY;return t.leading||t.center||t.trailing?(t.leading&&(e=Math.min(e,a(t.leading))),t.center&&(e=Math.min(e,a(t.center))),t.trailing&&(e=Math.min(e,a(t.trailing))),e):0}var c={findVerticalSpace:a,findHorizontalSpace:s,findVerticalSpaceBelowTop:function(t){var e=l(t);return t.bottom&&(e+=a(t.bottom)),e},findVerticalSpaceAboveBottom:function(t){var e=l(t);return t.top&&(e+=a(t.top)),e},findVerticalSpaceBetweenTopBottom:l,findHorizontalSpaceAfterLeading:function(t){var e=0;return t.center&&(e+=s(t.center)),t.trailing&&(e+=s(t.trailing)),e},findHorizontalSpaceBeforeTrailing:function(t){var e=0;return t.center&&(e+=s(t.center)),t.leading&&(e+=s(t.leading)),e}};function p(t,e,n,i){t&&0!==e&&(t.type===o?(t[n]+=e,i&&i.emit("resizing",{state:t,key:n})):(p(t.top,e,n,i),p(t.leading,e,n,i),p(t.center,e,n,i),p(t.trailing,e,n,i),p(t.bottom,e,n,i)))}function f(t,e,n){p(t,e,"y",n)}function u(t,e,n){p(t,e,"x",n)}var h=function t(e,n,i){if(e&&0!==n){if(e.type===o)return e.height+=n,e.availableVerticalSpace+=n,i&&i.emit("resizing",{state:e,key:"height"}),0;var r=n,a=0,s=0;return r<0?(s=c.findVerticalSpace(e.bottom),r-=a=-Math.min(s,-r),t(e.bottom,a,i),0===r?r:(s=c.findVerticalSpaceBetweenTopBottom(e),r-=a=-Math.min(s,-r),t(e.leading,a,i),t(e.center,a,i),t(e.trailing,a,i),f(e.bottom,a,i),e.top&&(s=c.findVerticalSpace(e.top),r-=a=-Math.min(s,-r),t(e.top,a,i),f(e.leading,a,i),f(e.center,a,i),f(e.trailing,a,i),f(e.bottom,a,i)),r)):(e.bottom?t(e.bottom,n,i):e.leading||e.center||e.trailing?(t(e.leading,n,i),t(e.center,n,i),t(e.trailing,n,i)):t(e.top,n,i),0)}},m=function t(e,n,i){if(e&&0!==n){if(e.type===o)return e.x+=n,e.width-=n,e.availableHorizontalSpace-=n,i&&(i.emit("resizing",{state:e,key:"x"}),i.emit("resizing",{state:e,key:"width"})),0;var r=n,a=0,s=0,l=0,p=0,f=0;return n>0?0===(s=c.findHorizontalSpace(e))||0===r?r:(e.leading&&(l=c.findHorizontalSpace(e.leading),r-=a=Math.min(l,s,r),s-=a,t(e.top,a,i),t(e.leading,a,i),t(e.bottom,a,i)),0===s||0===r?r:(e.center&&(p=c.findHorizontalSpace(e.center),r-=a=Math.min(s,p,r),s-=a,t(e.top,a,i),t(e.bottom,a,i),t(e.center,a,i),u(e.leading,a,i)),0===s||0===r?r:(e.trailing&&(f=c.findHorizontalSpace(e.trailing),r-=a=Math.min(s,f,r),s-=a,t(e.top,a,i),t(e.bottom,a,i),t(e.trailing,a,i),u(e.leading,a,i),u(e.center,a,i)),r))):(t(e.top,n,i),e.leading?t(e.leading,n,i):e.center?t(e.center,n,i):t(e.trailing,n,i),t(e.bottom,n,i),0)}},d=function t(e,n,i){if(e&&0!==n){if(e.type===o)return e.y+=n,e.height-=n,e.availableVerticalSpace-=n,i&&(i.emit("resizing",{state:e,key:"y"}),i.emit("resizing",{state:e,key:"height"})),0;var r=n,a=0,s=0;return r>0?(e.top&&(s=c.findVerticalSpace(e.top),r-=a=Math.min(s,r),t(e.top,a,i)),0===r?r:(s=c.findVerticalSpaceBetweenTopBottom(e),r-=a=Math.min(s,r),t(e.leading,a,i),t(e.center,a,i),t(e.trailing,a,i),f(e.top,a,i),e.bottom&&(s=c.findVerticalSpace(e.bottom),r-=a=Math.min(s,r),t(e.bottom,a,i),f(e.leading,a,i),f(e.center,a,i),f(e.trailing,a,i),f(e.top,a,i)),r)):(e.top?t(e.top,n,i):e.leading||e.center||e.trailing?(t(e.leading,n,i),t(e.center,n,i),t(e.trailing,n,i)):t(e.bottom,n,i),0)}},g=function t(e,n,i){if(!e||0===n)return n;if(e.type===o)return e.width+=n,e.availableHorizontalSpace+=n,i&&i.emit("resizing",{state:e,key:"width"}),n;var r=n,a=0,s=0,l=0,p=0,f=0;return n<0?0===(s=c.findHorizontalSpace(e))||0===r?r:(e.trailing&&(f=c.findHorizontalSpace(e.trailing),r-=a=-Math.min(f,s,-r),s+=a,t(e.top,a,i),t(e.trailing,a,i),t(e.bottom,a,i)),0===s||0===r?r:(e.center&&(p=c.findHorizontalSpace(e.center),r-=a=-Math.min(s,p,-r),s+=a,t(e.top,a,i),t(e.bottom,a,i),t(e.center,a,i),u(e.trailing,a,i)),0===s||0===r?r:(e.leading&&(l=c.findHorizontalSpace(e.leading),r-=a=-Math.min(s,l,-r),s+=a,t(e.top,a,i),t(e.bottom,a,i),t(e.leading,a,i),u(e.trailing,a,i),u(e.center,a,i)),r))):(t(e.top,n,i),e.trailing?t(e.trailing,n,i):e.center?t(e.center,n,i):t(e.leading,n,i),t(e.bottom,n,i),0)},v=function(t,e,n){if(!t||0===e||t.type===o)return e;var i=e,r=0,a=0;return i>0?(a=c.findVerticalSpaceBetweenTopBottom(t),i-=r=Math.min(a,i),h(t.top,r,n),d(t.leading,r,n),d(t.center,r,n),d(t.trailing,r,n),a=c.findVerticalSpace(t.bottom),i-=r=Math.min(a,i),h(t.top,r,n),d(t.bottom,r,n),f(t.leading,r,n),f(t.center,r,n),f(t.trailing,r,n)):(a=c.findVerticalSpace(t.top),i-=r=-Math.min(a,-i),h(t.top,r,n),d(t.leading,r,n),d(t.center,r,n),d(t.trailing,r,n)),i},_=function(t,e,n){if(!t||0===e||t.type===o)return e;var i=e,r=0,a=0;return i<0?(a=c.findVerticalSpaceBetweenTopBottom(t),i-=r=-Math.min(a,-i),d(t.bottom,r,n),h(t.leading,r,n),h(t.center,r,n),h(t.trailing,r,n),(a=c.findVerticalSpace(t.top))===Number.POSITIVE_INFINITY&&(a=0),i-=r=-Math.min(a,-i),h(t.top,r,n),d(t.bottom,r,n),f(t.leading,r,n),f(t.center,r,n),f(t.trailing,r,n)):(a=c.findVerticalSpace(t.bottom),i-=r=Math.min(a,i),d(t.bottom,r,n),h(t.leading,r,n),h(t.center,r,n),h(t.trailing,r,n)),i},y=function(t,e,n){if(!t||0===e||t.type===o)return e;var i=e,r=0,a=0;return i>0?(t.center&&(a=c.findHorizontalSpace(t.center),i-=r=Math.min(i,a),g(t.leading,r,n),m(t.center,r,n)),t.trailing&&(a=c.findHorizontalSpace(t.trailing),i-=r=Math.min(i,a),g(t.leading,r,n),m(t.trailing,r,n),u(t.center,r,n))):(a=c.findHorizontalSpace(t.leading),i-=r=-Math.min(a,-i),g(t.leading,r,n),t.center?m(t.center,r,n):m(t.trailing,r,n)),i},b=function(t,e,n){if(!t||0===e||t.type===o)return e;var i=e,r=0,a=0;return i<0?(t.center&&(a=c.findHorizontalSpace(t.center),i-=r=-Math.min(-i,a),m(t.trailing,r,n),g(t.center,r,n)),t.leading&&(a=c.findHorizontalSpace(t.leading),i-=r=-Math.min(-i,a),g(t.leading,r,n),m(t.trailing,r,n),u(t.center,r,n))):(a=c.findHorizontalSpace(t.trailing),i-=r=Math.min(i,a),m(t.trailing,r,n),t.center?g(t.center,r,n):g(t.leading,r,n)),i},S=function(t,e,n){return t&&t.type!==o?[e[0],function(t,e,n){return 0===e?e:e>0?v(t,e,n):e}(t,e[1],n)]:e},z=function(t,e,n){return t&&t.type!==o?[function(t,e,n){return 0===e?e:e>0?y(t,e,n):e}(t,e[0],n),function(t,e,n){return 0===e?e:e>0?_(t,e,n):moveTopSplitter(t,e,n)}(t,e[1],n)]:e},M=function(t,e,n){return[function(t,e,n){return 0===e?e:e>0?b(t,e,n):y(t,e,n)}(t,e[0],n),function(t,e,n){return 0===e?e:e>0?_(t,e,n):v(t,e,n)}(t,e[1],n)]},E=function(t,e,n){return t&&t.type!==o?[function(t,e,n){return 0===e?e:e>0?e:b(t,e,n)}(t,e[0],n),function(t,e,n){return 0===e?e:e>0?_(t,e,n):v(t,e,n)}(t,e[1],n)]:e},L=function(t,e,n){return t&&t.type!==o?[e[0],function(t,e,n){return 0===e?e:e>0?e:_(t,e,n)}(t,e[1],n)]:e},w=function(t){this._rootContainerState=t,this._flattenedStates=this._flattenContainerState(),this._eventEmitter=new r.a};w.prototype._flattenContainerState=function(){var t={},e=function(e,n){t[n.id]={data:n,parent:e}};return this.traverse({onCellVisited:e,onContainerVisited:e}),t},w.prototype.getRootContainerState=function(){return this._rootContainerState},w.prototype.getStateByPath=function(t){var e=this._rootContainerState;return t.forEach(function(t){return e=e[t]}),e},w.prototype.on=function(t,e){return this._eventEmitter.on(t,e)},w.prototype.traverse=function(t){var e=function(n,i){i&&(i.type===o?"function"==typeof t.onCellVisited&&t.onCellVisited.call(this,n,i):(e(i,i.top),e(i,i.leading),e(i,i.center),e(i,i.trailing),e(i,i.bottom),"function"==typeof t.onContainerVisited&&t.onContainerVisited.call(this,n,i)))};e(null,this._rootContainerState)},w.prototype._resizeByRegion=function(t,e,n){if(t){switch(e){case"top":n=S(t,n,this._eventEmitter);break;case"leading":n=z(t,n,this._eventEmitter);break;case"center":n=M(t,n,this._eventEmitter);break;case"trailing":n=E(t,n,this._eventEmitter);break;case"bottom":n=L(t,n,this._eventEmitter)}var i=this._flattenedStates[t.id].parent,r=t.path[t.path.length-1];this._resizeByRegion(i,r,n)}},w.prototype._resizeBySplitter=function(t,e,n){var i=n[0],r=n[1];switch(e){case"leading":r=0,i=y(t,i,this._eventEmitter);break;case"top":i=0,r=v(t,r,this._eventEmitter);break;case"trailing":r=0,i=b(t,i,this._eventEmitter);break;case"bottom":i=0,r=_(t,r,this._eventEmitter)}return[i,r]},w.prototype.resizeBySplitter=function(t,e){var n=t.length,i=t[n-1],r=this._rootContainerState,o=this._rootContainerState;t.forEach(function(t,e){o=e!=n-1?r=r[t]:o[t]});var a=this._resizeBySplitter(r,i,e);this._resizeByRegion(r,i,a),this._resizeBySplitter(r,i,a)},w.prototype.resizeByEdge=function(t,e){switch(t){case"top":d(this._rootContainerState,e,this._eventEmitter);break;case"bottom":h(this._rootContainerState,e,this._eventEmitter);break;case"left":m(this._rootContainerState,e,this._eventEmitter);break;case"right":g(this._rootContainerState,e,this._eventEmitter)}},e.default=w}])});