"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hast-util-heading-rank";
exports.ids = ["vendor-chunks/hast-util-heading-rank"];
exports.modules = {

/***/ "(rsc)/../../node_modules/hast-util-heading-rank/lib/index.js":
/*!**************************************************************!*\
  !*** ../../node_modules/hast-util-heading-rank/lib/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headingRank: () => (/* binding */ headingRank)\n/* harmony export */ });\n/**\n * @typedef {import('hast').Root} Root\n * @typedef {import('hast').Content} Content\n */\n\n/**\n * @typedef {Root | Content} Node\n */\n\n// To do next major: return `undefined`.\n/**\n * Get the rank (`1` to `6`) of headings (`h1` to `h6`).\n *\n * @param {Node} node\n *   Node to check.\n * @returns {number | null}\n *   Rank of the heading or `null` if not a heading.\n */\nfunction headingRank(node) {\n  const name =\n    (node && node.type === 'element' && node.tagName.toLowerCase()) || ''\n  const code =\n    name.length === 2 && name.charCodeAt(0) === 104 /* `h` */\n      ? name.charCodeAt(1)\n      : 0\n  return code > 48 /* `0` */ && code < 55 /* `7` */ ? code - 48 /* `0` */ : null\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC1oZWFkaW5nLXJhbmsvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEsd0JBQXdCO0FBQ3JDOztBQUVBO0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxoemhhbVxcaGF6aXFodGVjaFxcbm9kZV9tb2R1bGVzXFxoYXN0LXV0aWwtaGVhZGluZy1yYW5rXFxsaWJcXGluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLlJvb3R9IFJvb3RcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5Db250ZW50fSBDb250ZW50XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7Um9vdCB8IENvbnRlbnR9IE5vZGVcbiAqL1xuXG4vLyBUbyBkbyBuZXh0IG1ham9yOiByZXR1cm4gYHVuZGVmaW5lZGAuXG4vKipcbiAqIEdldCB0aGUgcmFuayAoYDFgIHRvIGA2YCkgb2YgaGVhZGluZ3MgKGBoMWAgdG8gYGg2YCkuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiAgIE5vZGUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7bnVtYmVyIHwgbnVsbH1cbiAqICAgUmFuayBvZiB0aGUgaGVhZGluZyBvciBgbnVsbGAgaWYgbm90IGEgaGVhZGluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWRpbmdSYW5rKG5vZGUpIHtcbiAgY29uc3QgbmFtZSA9XG4gICAgKG5vZGUgJiYgbm9kZS50eXBlID09PSAnZWxlbWVudCcgJiYgbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpIHx8ICcnXG4gIGNvbnN0IGNvZGUgPVxuICAgIG5hbWUubGVuZ3RoID09PSAyICYmIG5hbWUuY2hhckNvZGVBdCgwKSA9PT0gMTA0IC8qIGBoYCAqL1xuICAgICAgPyBuYW1lLmNoYXJDb2RlQXQoMSlcbiAgICAgIDogMFxuICByZXR1cm4gY29kZSA+IDQ4IC8qIGAwYCAqLyAmJiBjb2RlIDwgNTUgLyogYDdgICovID8gY29kZSAtIDQ4IC8qIGAwYCAqLyA6IG51bGxcbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/hast-util-heading-rank/lib/index.js\n");

/***/ })

};
;