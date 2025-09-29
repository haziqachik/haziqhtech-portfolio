"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hast-util-has-property";
exports.ids = ["vendor-chunks/hast-util-has-property"];
exports.modules = {

/***/ "(rsc)/../../node_modules/hast-util-has-property/lib/index.js":
/*!**************************************************************!*\
  !*** ../../node_modules/hast-util-has-property/lib/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hasProperty: () => (/* binding */ hasProperty)\n/* harmony export */ });\n/**\n * @typedef {import('hast').Root} Root\n * @typedef {import('hast').Content} Content\n */\n\n/**\n * @typedef {Root | Content} Node\n */\n\nconst own = {}.hasOwnProperty\n\n/**\n * Check if `node`is an element and has a `field` property.\n *\n * @param {unknown} node\n *   Thing to check (typically `Element`).\n * @param {unknown} field\n *   Field name to check (typically `string`).\n * @returns {boolean}\n *   Whether `node` is an element that has a `field` property.\n */\nfunction hasProperty(node, field) {\n  const value =\n    typeof field === 'string' &&\n    isNode(node) &&\n    node.type === 'element' &&\n    node.properties &&\n    own.call(node.properties, field) &&\n    node.properties[field]\n\n  return value !== null && value !== undefined && value !== false\n}\n\n/**\n * @param {unknown} value\n * @returns {value is Node}\n */\nfunction isNode(value) {\n  return Boolean(value && typeof value === 'object' && 'type' in value)\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC1oYXMtcHJvcGVydHkvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEsd0JBQXdCO0FBQ3JDOztBQUVBO0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0I7O0FBRUEsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcaHpoYW1cXGhhemlxaHRlY2hcXG5vZGVfbW9kdWxlc1xcaGFzdC11dGlsLWhhcy1wcm9wZXJ0eVxcbGliXFxpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5Sb290fSBSb290XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuQ29udGVudH0gQ29udGVudFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge1Jvb3QgfCBDb250ZW50fSBOb2RlXG4gKi9cblxuY29uc3Qgb3duID0ge30uaGFzT3duUHJvcGVydHlcblxuLyoqXG4gKiBDaGVjayBpZiBgbm9kZWBpcyBhbiBlbGVtZW50IGFuZCBoYXMgYSBgZmllbGRgIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gbm9kZVxuICogICBUaGluZyB0byBjaGVjayAodHlwaWNhbGx5IGBFbGVtZW50YCkuXG4gKiBAcGFyYW0ge3Vua25vd259IGZpZWxkXG4gKiAgIEZpZWxkIG5hbWUgdG8gY2hlY2sgKHR5cGljYWxseSBgc3RyaW5nYCkuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciBgbm9kZWAgaXMgYW4gZWxlbWVudCB0aGF0IGhhcyBhIGBmaWVsZGAgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNQcm9wZXJ0eShub2RlLCBmaWVsZCkge1xuICBjb25zdCB2YWx1ZSA9XG4gICAgdHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJyAmJlxuICAgIGlzTm9kZShub2RlKSAmJlxuICAgIG5vZGUudHlwZSA9PT0gJ2VsZW1lbnQnICYmXG4gICAgbm9kZS5wcm9wZXJ0aWVzICYmXG4gICAgb3duLmNhbGwobm9kZS5wcm9wZXJ0aWVzLCBmaWVsZCkgJiZcbiAgICBub2RlLnByb3BlcnRpZXNbZmllbGRdXG5cbiAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IGZhbHNlXG59XG5cbi8qKlxuICogQHBhcmFtIHt1bmtub3dufSB2YWx1ZVxuICogQHJldHVybnMge3ZhbHVlIGlzIE5vZGV9XG4gKi9cbmZ1bmN0aW9uIGlzTm9kZSh2YWx1ZSkge1xuICByZXR1cm4gQm9vbGVhbih2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICd0eXBlJyBpbiB2YWx1ZSlcbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/hast-util-has-property/lib/index.js\n");

/***/ })

};
;