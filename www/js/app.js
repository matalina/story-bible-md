(self["webpackChunkstory_bible_md"] = self["webpackChunkstory_bible_md"] || []).push([["/js/app"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/Markdown.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/Markdown.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
var wikilinks = __webpack_require__(/*! ./WikiLinks */ "./src/js/WikiLinks.js")();

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js").default;

var md = __webpack_require__(/*! markdown-it */ "./node_modules/markdown-it/index.js")({
  xhtmlOut: true,
  breaks: true,
  linkify: true
}).use(wikilinks);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Markdown",
  data: function data() {
    return {
      markdown: '# Loading...'
    };
  },
  watch: {
    $route: function $route(to, from) {
      // get content from markdown file
      this.getPage();
    }
  },
  methods: {
    getPage: function getPage() {
      var _this = this;

      var file = 'index.md';

      if (this.$route.params.pathMatch !== '/') {
        file = "".concat(this.$route.params.pathMatch, ".md");
      }

      axios.get("markdown/".concat(file)).then(function (response) {
        _this.markdown = response.data;
      })["catch"](function (error) {
        axios.get("markdown/404.md").then(function (response) {
          _this.markdown = response.data;
        })["catch"](function (error) {
          console.log(error);
        });
      });
    },
    render: function render(markdown) {
      return md.render(this.markdown);
    }
  },
  mounted: function mounted() {
    this.getPage();
  }
});

/***/ }),

/***/ "./src/js/WikiLinks.js":
/*!*****************************!*\
  !*** ./src/js/WikiLinks.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Plugin = __webpack_require__(/*! markdown-it-regexp */ "./node_modules/markdown-it-regexp/index.js");

var extend = __webpack_require__(/*! extend */ "./node_modules/extend/index.js");

var sanitize = __webpack_require__(/*! sanitize-filename */ "./node_modules/sanitize-filename/index.js");

module.exports = function (options) {
  var defaults = {
    linkPattern: /\[\[([\w\s/]+)(\|([\w\s/]+))?\]\]/,
    baseURL: '/',
    relativeBaseURL: './#/',
    makeAllLinksAbsolute: false,
    uriSuffix: '',
    htmlAttributes: {},
    generatePageNameFromLabel: function generatePageNameFromLabel(label) {
      return label;
    },
    postProcessPageName: function postProcessPageName(pageName) {
      pageName = pageName.trim();
      pageName = pageName.split('/').map(sanitize).join('/');
      pageName = pageName.replace(/\s+/, '-');
      return pageName;
    },
    postProcessLabel: function postProcessLabel(label) {
      label = label.trim();
      return label;
    }
  };
  options = extend(true, defaults, options);

  function isAbsolute(pageName) {
    return options.makeAllLinksAbsolute || pageName.charCodeAt(0) === 0x2F;
    /* / */
  }

  function removeInitialSlashes(str) {
    return str.replace(/^\/+/g, '');
  }

  return Plugin(options.linkPattern, function (match, utils) {
    var label = '';
    var pageName = '';
    var href = '';
    var htmlAttrs = [];
    var htmlAttrsString = '';
    var isSplit = !!match[3];

    if (isSplit) {
      label = match[3];
      pageName = match[1];
    } else {
      label = match[1];
      pageName = options.generatePageNameFromLabel(label);
    }

    label = options.postProcessLabel(label);
    pageName = options.postProcessPageName(pageName); // make sure none of the values are empty

    if (!label || !pageName) {
      return match.input;
    }

    if (isAbsolute(pageName)) {
      pageName = removeInitialSlashes(pageName);
      href = options.baseURL + pageName + options.uriSuffix;
    } else {
      href = options.relativeBaseURL + pageName + options.uriSuffix;
    }

    href = utils.escape(href);
    htmlAttrs.push("href=\"".concat(href, "\""));

    for (var attrName in options.htmlAttributes) {
      var attrValue = options.htmlAttributes[attrName];
      htmlAttrs.push("".concat(attrName, "=\"").concat(attrValue, "\""));
    }

    htmlAttrsString = htmlAttrs.join(' ');
    return "<a ".concat(htmlAttrsString, ">").concat(label, "</a>");
  });
};

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _Markdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Markdown */ "./src/js/Markdown.vue");



vue__WEBPACK_IMPORTED_MODULE_1__.default.use(vue_router__WEBPACK_IMPORTED_MODULE_2__.default);
var router = new vue_router__WEBPACK_IMPORTED_MODULE_2__.default({
  routes: [{
    path: '*',
    component: _Markdown__WEBPACK_IMPORTED_MODULE_0__.default
  }]
});
var app = new vue__WEBPACK_IMPORTED_MODULE_1__.default({
  el: '#app',
  router: router
});

/***/ }),

/***/ "./src/sass/app.scss":
/*!***************************!*\
  !*** ./src/sass/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/Markdown.vue":
/*!*****************************!*\
  !*** ./src/js/Markdown.vue ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Markdown_vue_vue_type_template_id_ab2b0568___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Markdown.vue?vue&type=template&id=ab2b0568& */ "./src/js/Markdown.vue?vue&type=template&id=ab2b0568&");
/* harmony import */ var _Markdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Markdown.vue?vue&type=script&lang=js& */ "./src/js/Markdown.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Markdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Markdown_vue_vue_type_template_id_ab2b0568___WEBPACK_IMPORTED_MODULE_0__.render,
  _Markdown_vue_vue_type_template_id_ab2b0568___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/Markdown.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/js/Markdown.vue?vue&type=script&lang=js&":
/*!******************************************************!*\
  !*** ./src/js/Markdown.vue?vue&type=script&lang=js& ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Markdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Markdown.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/Markdown.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Markdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./src/js/Markdown.vue?vue&type=template&id=ab2b0568&":
/*!************************************************************!*\
  !*** ./src/js/Markdown.vue?vue&type=template&id=ab2b0568& ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Markdown_vue_vue_type_template_id_ab2b0568___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Markdown_vue_vue_type_template_id_ab2b0568___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Markdown_vue_vue_type_template_id_ab2b0568___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Markdown.vue?vue&type=template&id=ab2b0568& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/Markdown.vue?vue&type=template&id=ab2b0568&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/Markdown.vue?vue&type=template&id=ab2b0568&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/js/Markdown.vue?vue&type=template&id=ab2b0568& ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("main", { domProps: { innerHTML: _vm._s(_vm.render()) } })
}
var staticRenderFns = []
render._withStripped = true



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["css/app","/js/vendor"], () => (__webpack_exec__("./src/js/app.js"), __webpack_exec__("./src/sass/app.scss")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);