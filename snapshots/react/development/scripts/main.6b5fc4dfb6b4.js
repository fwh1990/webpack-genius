(self["webpackChunkreact"] = self["webpackChunkreact"] || []).push([[179],{

/***/ 3426:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ../../node_modules/@babel/runtime-corejs3/helpers/inheritsLoose.js
var inheritsLoose = __webpack_require__(7480);
var inheritsLoose_default = /*#__PURE__*/__webpack_require__.n(inheritsLoose);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(3935);
;// CONCATENATED MODULE: ./src/index.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const src = ({"wrapper":"_1pquJdkNGog_QzSRWWxkpR"});
;// CONCATENATED MODULE: ./src/index.tsx







var Chunk = /*#__PURE__*/(0,react.lazy)(function () {
  return __webpack_require__.e(/* import() */ 280).then(__webpack_require__.bind(__webpack_require__, 7280));
});

var Demo = /*#__PURE__*/function (_PureComponent) {
  inheritsLoose_default()(Demo, _PureComponent);

  function Demo() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Demo.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: src.wrapper,
        children: "Hello World"
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
        fallback: null,
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(Chunk, {})
      })]
    });
  };

  return Demo;
}(react.PureComponent);

react_dom.render( /*#__PURE__*/(0,jsx_runtime.jsx)(Demo, {}), document.getElementById('root'));

/***/ })

},
0,[[3426,303,282]]]);
//# sourceMappingURL=main.6b5fc4dfb6b4.js.map