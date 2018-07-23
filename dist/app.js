!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("vuex-keg-resolve",[],t):"object"==typeof exports?exports["vuex-keg-resolve"]=t():e["vuex-keg-resolve"]=t()}(this,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is referenced from these modules with unsupported syntax: multi ./src/index.ts (referenced with single entry) */function(e,t,n){"use strict";n.r(t);var o=function(e,t){return!0===e||void 0===e?function(e){return""+e+t}:"string"==typeof e?function(){return e}:!1!==e&&"function"==typeof e?e:void 0},r=function(e,t){return"string"==typeof e?""+t+e:"function"==typeof e?e(t):void 0};t.default=function(e){return void 0===e&&(e={}),function(){return function(t,n,u){return void 0===u&&(u={}),function(n,c,i){if(e||u){var f=function(e,t,n){var r=n.success,u=void 0===r?t.success||e.success:r,c=n.failure,i=void 0===c?t.success||e.success:c;return{success:o(u,"Success"),failure:o(i,"Failure")}}(e,u,"object"==typeof c?c:{success:c,failure:i}),s=f.success,p=f.failure;return new Promise(function(e,o){n.then(function(n){s&&t.commit(r(s,t.name),n),e(n)}).catch(function(e){p&&t.commit(r(p,t.name),e),o(e)})})}}}}}},
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){e.exports=n(/*! ./src/index.ts */0)}])});
//# sourceMappingURL=app.js.map