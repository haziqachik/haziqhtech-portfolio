(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/ui/src/lib/cn.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
function cn() {
    for(var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++){
        classes[_key] = arguments[_key];
    }
    return classes.filter(Boolean).join(" ");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/src/components/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/lib/cn.ts [app-client] (ecmascript)");
;
;
const variantStyles = {
    primary: "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 hover:bg-blue-500",
    outline: "border border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600",
    ghost: "text-slate-500 hover:text-blue-500"
};
function Button(param) {
    let { as, variant = "primary", className, ...props } = param;
    const Component = as !== null && as !== void 0 ? as : "button";
    const combinedClassName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500", variantStyles[variant], className);
    const finalProps = {
        className: combinedClassName,
        ...props
    };
    if (Component === "button" && finalProps.type == null) {
        finalProps.type = "button";
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(Component, finalProps);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/src/components/Card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/lib/cn.ts [app-client] (ecmascript)");
;
;
function Card(param) {
    let { as, className, ...props } = param;
    const Component = as !== null && as !== void 0 ? as : "div";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(Component, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur", className),
        ...props
    });
}
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/src/tailwind-preset.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwindcss$2f$dist$2f$colors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/tailwindcss/dist/colors.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwindcss$2f$dist$2f$chunk$2d$HTB5LLOP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/tailwindcss/dist/chunk-HTB5LLOP.mjs [app-client] (ecmascript) <export a as default>");
;
const sharedPreset = {
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#2563eb",
                    foreground: "#ffffff"
                },
                slate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwindcss$2f$dist$2f$chunk$2d$HTB5LLOP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a__as__default$3e$__["default"].slate
            },
            fontFamily: {
                sans: [
                    "var(--font-geist-sans)",
                    "system-ui",
                    "sans-serif"
                ],
                mono: [
                    "var(--font-geist-mono)",
                    "ui-monospace",
                    "SFMono-Regular"
                ]
            },
            maxWidth: {
                content: "64rem"
            }
        }
    }
};
const __TURBOPACK__default__export__ = sharedPreset;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$tailwind$2d$preset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/tailwind-preset.ts [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portfolio/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/Card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const projects = [
    {
        title: "Infrastructure Automation Toolkit",
        description: "Terraform and Ansible modules that accelerate provisioning of secure, cloud-native environments.",
        link: "https://github.com/haziqhtech/infrastructure-automation-toolkit"
    },
    {
        title: "Security Analytics Dashboard",
        description: "Next.js dashboard that visualises threat trends and real-time detections for SOC teams.",
        link: "https://github.com/haziqhtech/security-analytics-dashboard"
    },
    {
        title: "Data Quality Pipeline",
        description: "ETL pipeline with automated data validation, alerting, and reporting for operational telemetry.",
        link: "https://github.com/haziqhtech/data-quality-pipeline"
    }
];
const initialForm = {
    name: "",
    email: "",
    message: ""
};
function Home() {
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialForm);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const handleChange = (field)=>(event)=>{
            setFormData((prev)=>({
                    ...prev,
                    [field]: event.target.value
                }));
            setErrors((prev)=>({
                    ...prev,
                    [field]: undefined
                }));
            setStatus("idle");
        };
    const validate = ()=>{
        const nextErrors = {};
        if (!formData.name.trim()) {
            nextErrors.name = "Please enter your name.";
        }
        if (!formData.email.trim()) {
            nextErrors.email = "Please enter your email.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            nextErrors.email = "Please enter a valid email address.";
        }
        if (!formData.message.trim()) {
            nextErrors.message = "Please include a short message.";
        } else if (formData.message.trim().length < 10) {
            nextErrors.message = "Message should be at least 10 characters long.";
        }
        return nextErrors;
    };
    const handleSubmit = (event)=>{
        event.preventDefault();
        const nextErrors = validate();
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setStatus("idle");
            return;
        }
        setErrors({});
        setStatus("success");
        setFormData(initialForm);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex flex-col gap-24 text-slate-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "hero",
                className: "flex flex-col items-center gap-10 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600",
                                children: "Welcome"
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-bold tracking-tight md:text-6xl",
                                children: "Haziq Asyraaf"
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-2xl text-lg text-slate-600 md:text-2xl",
                                children: "IT Professional | Data Analyst | Cybersecurity Enthusiast"
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                as: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                href: "#projects",
                                children: "Explore My Projects"
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "max-w-3xl text-balance text-base leading-relaxed text-slate-600 md:text-lg",
                        children: "I build resilient digital platforms that tie together data, infrastructure, and security principles. My goal is to deliver reliable systems, clear insights, and safe experiences for every stakeholder involved."
                    }, void 0, false, {
                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                as: "section",
                id: "about",
                className: "grid gap-10 p-10 shadow-md md:grid-cols-[minmax(0,220px)_1fr]",
                "aria-labelledby": "about-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-4 text-center md:items-start md:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-36 w-36 overflow-hidden rounded-full border-4 border-blue-100 bg-gradient-to-br from-blue-200 via-blue-100 to-white shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/profile.jpg",
                                    alt: "Portrait of Haziq Asyraaf",
                                    className: "h-full w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold uppercase tracking-[0.4em] text-blue-500",
                                        children: "About"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "about-heading",
                                        className: "text-2xl font-semibold tracking-tight text-slate-900",
                                        children: "Bridging Ops, Data & Security"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5 text-sm leading-6 text-slate-600 md:text-base",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "I specialise in designing infrastructure that scales effortlessly while remaining secure and observable. From deploying automated CI/CD pipelines to orchestrating zero-downtime releases, I focus on dependable execution and measurable impact."
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "With hands-on DevOps experience, strong analytical fundamentals, and a cybersecurity mindset, I collaborate with teams to translate complex challenges into outcomes that protect users and unlock new opportunities."
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "projects",
                className: "space-y-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "space-y-3 text-center md:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-[0.4em] text-blue-500",
                                children: "Projects"
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-semibold tracking-tight text-slate-900",
                                children: "Work Highlights"
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-2xl text-sm text-slate-600 md:text-base",
                                children: "A curated selection of initiatives that showcase my background in automation, analytics, and cyber defence."
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-6 md:grid-cols-2",
                        children: projects.map((project)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                as: "article",
                                className: "flex h-full flex-col justify-between border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold text-slate-900",
                                                children: project.title
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                                lineNumber: 165,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm leading-6 text-slate-600",
                                                children: project.description
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                                lineNumber: 166,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: project.link,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-500",
                                        children: [
                                            "View on GitHub",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "aria-hidden": "true",
                                                children: "→"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                                lineNumber: 175,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, project.title, true, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                as: "section",
                id: "contact",
                className: "p-8 shadow-md sm:p-10",
                "aria-labelledby": "contact-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 text-center md:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-[0.4em] text-blue-500",
                                children: "Contact"
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "contact-heading",
                                className: "text-3xl font-semibold tracking-tight text-slate-900",
                                children: "Let's collaborate"
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600 md:text-base",
                                children: "Share a brief note about your project, opportunity, or idea and I'll get back to you soon."
                            }, void 0, false, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "mt-8 space-y-6",
                        noValidate: true,
                        onSubmit: handleSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 sm:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "name",
                                                className: "text-sm font-semibold text-slate-800",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                                lineNumber: 200,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "name",
                                                name: "name",
                                                type: "text",
                                                value: formData.name,
                                                onChange: handleChange("name"),
                                                "aria-invalid": errors.name ? "true" : "false",
                                                "aria-describedby": errors.name ? "name-error" : undefined,
                                                className: "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                placeholder: "Your name"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                                lineNumber: 203,
                                                columnNumber: 15
                                            }, this),
                                            errors.name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                id: "name-error",
                                                className: "text-xs font-medium text-red-500",
                                                children: errors.name
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                                lineNumber: 215,
                                                columnNumber: 17
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "email",
                                                className: "text-sm font-semibold text-slate-800",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                                lineNumber: 221,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "email",
                                                name: "email",
                                                type: "email",
                                                value: formData.email,
                                                onChange: handleChange("email"),
                                                "aria-invalid": errors.email ? "true" : "false",
                                                "aria-describedby": errors.email ? "email-error" : undefined,
                                                className: "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
                                                placeholder: "you@example.com"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                                lineNumber: 224,
                                                columnNumber: 15
                                            }, this),
                                            errors.email ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                id: "email-error",
                                                className: "text-xs font-medium text-red-500",
                                                children: errors.email
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                                lineNumber: 236,
                                                columnNumber: 17
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "message",
                                        className: "text-sm font-semibold text-slate-800",
                                        children: "Message"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "message",
                                        name: "message",
                                        rows: 5,
                                        value: formData.message,
                                        onChange: handleChange("message"),
                                        "aria-invalid": errors.message ? "true" : "false",
                                        "aria-describedby": errors.message ? "message-error" : undefined,
                                        className: "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
                                        placeholder: "How can I help?"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                        lineNumber: 246,
                                        columnNumber: 13
                                    }, this),
                                    errors.message ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        id: "message-error",
                                        className: "text-xs font-medium text-red-500",
                                        children: errors.message
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "submit",
                                        children: "Send Message"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-500",
                                        role: "status",
                                        "aria-live": "polite",
                                        children: status === "success" ? "Thanks for reaching out! I'll respond shortly." : "I reply within two working days."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portfolio/src/app/page.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portfolio/src/app/page.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portfolio/src/app/page.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(Home, "ndGpf607NMblAGryIVY6KnZ0OgQ=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/tailwindcss/dist/chunk-HTB5LLOP.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>l
]);
var l = {
    inherit: "inherit",
    current: "currentcolor",
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    slate: {
        50: "oklch(98.4% 0.003 247.858)",
        100: "oklch(96.8% 0.007 247.896)",
        200: "oklch(92.9% 0.013 255.508)",
        300: "oklch(86.9% 0.022 252.894)",
        400: "oklch(70.4% 0.04 256.788)",
        500: "oklch(55.4% 0.046 257.417)",
        600: "oklch(44.6% 0.043 257.281)",
        700: "oklch(37.2% 0.044 257.287)",
        800: "oklch(27.9% 0.041 260.031)",
        900: "oklch(20.8% 0.042 265.755)",
        950: "oklch(12.9% 0.042 264.695)"
    },
    gray: {
        50: "oklch(98.5% 0.002 247.839)",
        100: "oklch(96.7% 0.003 264.542)",
        200: "oklch(92.8% 0.006 264.531)",
        300: "oklch(87.2% 0.01 258.338)",
        400: "oklch(70.7% 0.022 261.325)",
        500: "oklch(55.1% 0.027 264.364)",
        600: "oklch(44.6% 0.03 256.802)",
        700: "oklch(37.3% 0.034 259.733)",
        800: "oklch(27.8% 0.033 256.848)",
        900: "oklch(21% 0.034 264.665)",
        950: "oklch(13% 0.028 261.692)"
    },
    zinc: {
        50: "oklch(98.5% 0 0)",
        100: "oklch(96.7% 0.001 286.375)",
        200: "oklch(92% 0.004 286.32)",
        300: "oklch(87.1% 0.006 286.286)",
        400: "oklch(70.5% 0.015 286.067)",
        500: "oklch(55.2% 0.016 285.938)",
        600: "oklch(44.2% 0.017 285.786)",
        700: "oklch(37% 0.013 285.805)",
        800: "oklch(27.4% 0.006 286.033)",
        900: "oklch(21% 0.006 285.885)",
        950: "oklch(14.1% 0.005 285.823)"
    },
    neutral: {
        50: "oklch(98.5% 0 0)",
        100: "oklch(97% 0 0)",
        200: "oklch(92.2% 0 0)",
        300: "oklch(87% 0 0)",
        400: "oklch(70.8% 0 0)",
        500: "oklch(55.6% 0 0)",
        600: "oklch(43.9% 0 0)",
        700: "oklch(37.1% 0 0)",
        800: "oklch(26.9% 0 0)",
        900: "oklch(20.5% 0 0)",
        950: "oklch(14.5% 0 0)"
    },
    stone: {
        50: "oklch(98.5% 0.001 106.423)",
        100: "oklch(97% 0.001 106.424)",
        200: "oklch(92.3% 0.003 48.717)",
        300: "oklch(86.9% 0.005 56.366)",
        400: "oklch(70.9% 0.01 56.259)",
        500: "oklch(55.3% 0.013 58.071)",
        600: "oklch(44.4% 0.011 73.639)",
        700: "oklch(37.4% 0.01 67.558)",
        800: "oklch(26.8% 0.007 34.298)",
        900: "oklch(21.6% 0.006 56.043)",
        950: "oklch(14.7% 0.004 49.25)"
    },
    red: {
        50: "oklch(97.1% 0.013 17.38)",
        100: "oklch(93.6% 0.032 17.717)",
        200: "oklch(88.5% 0.062 18.334)",
        300: "oklch(80.8% 0.114 19.571)",
        400: "oklch(70.4% 0.191 22.216)",
        500: "oklch(63.7% 0.237 25.331)",
        600: "oklch(57.7% 0.245 27.325)",
        700: "oklch(50.5% 0.213 27.518)",
        800: "oklch(44.4% 0.177 26.899)",
        900: "oklch(39.6% 0.141 25.723)",
        950: "oklch(25.8% 0.092 26.042)"
    },
    orange: {
        50: "oklch(98% 0.016 73.684)",
        100: "oklch(95.4% 0.038 75.164)",
        200: "oklch(90.1% 0.076 70.697)",
        300: "oklch(83.7% 0.128 66.29)",
        400: "oklch(75% 0.183 55.934)",
        500: "oklch(70.5% 0.213 47.604)",
        600: "oklch(64.6% 0.222 41.116)",
        700: "oklch(55.3% 0.195 38.402)",
        800: "oklch(47% 0.157 37.304)",
        900: "oklch(40.8% 0.123 38.172)",
        950: "oklch(26.6% 0.079 36.259)"
    },
    amber: {
        50: "oklch(98.7% 0.022 95.277)",
        100: "oklch(96.2% 0.059 95.617)",
        200: "oklch(92.4% 0.12 95.746)",
        300: "oklch(87.9% 0.169 91.605)",
        400: "oklch(82.8% 0.189 84.429)",
        500: "oklch(76.9% 0.188 70.08)",
        600: "oklch(66.6% 0.179 58.318)",
        700: "oklch(55.5% 0.163 48.998)",
        800: "oklch(47.3% 0.137 46.201)",
        900: "oklch(41.4% 0.112 45.904)",
        950: "oklch(27.9% 0.077 45.635)"
    },
    yellow: {
        50: "oklch(98.7% 0.026 102.212)",
        100: "oklch(97.3% 0.071 103.193)",
        200: "oklch(94.5% 0.129 101.54)",
        300: "oklch(90.5% 0.182 98.111)",
        400: "oklch(85.2% 0.199 91.936)",
        500: "oklch(79.5% 0.184 86.047)",
        600: "oklch(68.1% 0.162 75.834)",
        700: "oklch(55.4% 0.135 66.442)",
        800: "oklch(47.6% 0.114 61.907)",
        900: "oklch(42.1% 0.095 57.708)",
        950: "oklch(28.6% 0.066 53.813)"
    },
    lime: {
        50: "oklch(98.6% 0.031 120.757)",
        100: "oklch(96.7% 0.067 122.328)",
        200: "oklch(93.8% 0.127 124.321)",
        300: "oklch(89.7% 0.196 126.665)",
        400: "oklch(84.1% 0.238 128.85)",
        500: "oklch(76.8% 0.233 130.85)",
        600: "oklch(64.8% 0.2 131.684)",
        700: "oklch(53.2% 0.157 131.589)",
        800: "oklch(45.3% 0.124 130.933)",
        900: "oklch(40.5% 0.101 131.063)",
        950: "oklch(27.4% 0.072 132.109)"
    },
    green: {
        50: "oklch(98.2% 0.018 155.826)",
        100: "oklch(96.2% 0.044 156.743)",
        200: "oklch(92.5% 0.084 155.995)",
        300: "oklch(87.1% 0.15 154.449)",
        400: "oklch(79.2% 0.209 151.711)",
        500: "oklch(72.3% 0.219 149.579)",
        600: "oklch(62.7% 0.194 149.214)",
        700: "oklch(52.7% 0.154 150.069)",
        800: "oklch(44.8% 0.119 151.328)",
        900: "oklch(39.3% 0.095 152.535)",
        950: "oklch(26.6% 0.065 152.934)"
    },
    emerald: {
        50: "oklch(97.9% 0.021 166.113)",
        100: "oklch(95% 0.052 163.051)",
        200: "oklch(90.5% 0.093 164.15)",
        300: "oklch(84.5% 0.143 164.978)",
        400: "oklch(76.5% 0.177 163.223)",
        500: "oklch(69.6% 0.17 162.48)",
        600: "oklch(59.6% 0.145 163.225)",
        700: "oklch(50.8% 0.118 165.612)",
        800: "oklch(43.2% 0.095 166.913)",
        900: "oklch(37.8% 0.077 168.94)",
        950: "oklch(26.2% 0.051 172.552)"
    },
    teal: {
        50: "oklch(98.4% 0.014 180.72)",
        100: "oklch(95.3% 0.051 180.801)",
        200: "oklch(91% 0.096 180.426)",
        300: "oklch(85.5% 0.138 181.071)",
        400: "oklch(77.7% 0.152 181.912)",
        500: "oklch(70.4% 0.14 182.503)",
        600: "oklch(60% 0.118 184.704)",
        700: "oklch(51.1% 0.096 186.391)",
        800: "oklch(43.7% 0.078 188.216)",
        900: "oklch(38.6% 0.063 188.416)",
        950: "oklch(27.7% 0.046 192.524)"
    },
    cyan: {
        50: "oklch(98.4% 0.019 200.873)",
        100: "oklch(95.6% 0.045 203.388)",
        200: "oklch(91.7% 0.08 205.041)",
        300: "oklch(86.5% 0.127 207.078)",
        400: "oklch(78.9% 0.154 211.53)",
        500: "oklch(71.5% 0.143 215.221)",
        600: "oklch(60.9% 0.126 221.723)",
        700: "oklch(52% 0.105 223.128)",
        800: "oklch(45% 0.085 224.283)",
        900: "oklch(39.8% 0.07 227.392)",
        950: "oklch(30.2% 0.056 229.695)"
    },
    sky: {
        50: "oklch(97.7% 0.013 236.62)",
        100: "oklch(95.1% 0.026 236.824)",
        200: "oklch(90.1% 0.058 230.902)",
        300: "oklch(82.8% 0.111 230.318)",
        400: "oklch(74.6% 0.16 232.661)",
        500: "oklch(68.5% 0.169 237.323)",
        600: "oklch(58.8% 0.158 241.966)",
        700: "oklch(50% 0.134 242.749)",
        800: "oklch(44.3% 0.11 240.79)",
        900: "oklch(39.1% 0.09 240.876)",
        950: "oklch(29.3% 0.066 243.157)"
    },
    blue: {
        50: "oklch(97% 0.014 254.604)",
        100: "oklch(93.2% 0.032 255.585)",
        200: "oklch(88.2% 0.059 254.128)",
        300: "oklch(80.9% 0.105 251.813)",
        400: "oklch(70.7% 0.165 254.624)",
        500: "oklch(62.3% 0.214 259.815)",
        600: "oklch(54.6% 0.245 262.881)",
        700: "oklch(48.8% 0.243 264.376)",
        800: "oklch(42.4% 0.199 265.638)",
        900: "oklch(37.9% 0.146 265.522)",
        950: "oklch(28.2% 0.091 267.935)"
    },
    indigo: {
        50: "oklch(96.2% 0.018 272.314)",
        100: "oklch(93% 0.034 272.788)",
        200: "oklch(87% 0.065 274.039)",
        300: "oklch(78.5% 0.115 274.713)",
        400: "oklch(67.3% 0.182 276.935)",
        500: "oklch(58.5% 0.233 277.117)",
        600: "oklch(51.1% 0.262 276.966)",
        700: "oklch(45.7% 0.24 277.023)",
        800: "oklch(39.8% 0.195 277.366)",
        900: "oklch(35.9% 0.144 278.697)",
        950: "oklch(25.7% 0.09 281.288)"
    },
    violet: {
        50: "oklch(96.9% 0.016 293.756)",
        100: "oklch(94.3% 0.029 294.588)",
        200: "oklch(89.4% 0.057 293.283)",
        300: "oklch(81.1% 0.111 293.571)",
        400: "oklch(70.2% 0.183 293.541)",
        500: "oklch(60.6% 0.25 292.717)",
        600: "oklch(54.1% 0.281 293.009)",
        700: "oklch(49.1% 0.27 292.581)",
        800: "oklch(43.2% 0.232 292.759)",
        900: "oklch(38% 0.189 293.745)",
        950: "oklch(28.3% 0.141 291.089)"
    },
    purple: {
        50: "oklch(97.7% 0.014 308.299)",
        100: "oklch(94.6% 0.033 307.174)",
        200: "oklch(90.2% 0.063 306.703)",
        300: "oklch(82.7% 0.119 306.383)",
        400: "oklch(71.4% 0.203 305.504)",
        500: "oklch(62.7% 0.265 303.9)",
        600: "oklch(55.8% 0.288 302.321)",
        700: "oklch(49.6% 0.265 301.924)",
        800: "oklch(43.8% 0.218 303.724)",
        900: "oklch(38.1% 0.176 304.987)",
        950: "oklch(29.1% 0.149 302.717)"
    },
    fuchsia: {
        50: "oklch(97.7% 0.017 320.058)",
        100: "oklch(95.2% 0.037 318.852)",
        200: "oklch(90.3% 0.076 319.62)",
        300: "oklch(83.3% 0.145 321.434)",
        400: "oklch(74% 0.238 322.16)",
        500: "oklch(66.7% 0.295 322.15)",
        600: "oklch(59.1% 0.293 322.896)",
        700: "oklch(51.8% 0.253 323.949)",
        800: "oklch(45.2% 0.211 324.591)",
        900: "oklch(40.1% 0.17 325.612)",
        950: "oklch(29.3% 0.136 325.661)"
    },
    pink: {
        50: "oklch(97.1% 0.014 343.198)",
        100: "oklch(94.8% 0.028 342.258)",
        200: "oklch(89.9% 0.061 343.231)",
        300: "oklch(82.3% 0.12 346.018)",
        400: "oklch(71.8% 0.202 349.761)",
        500: "oklch(65.6% 0.241 354.308)",
        600: "oklch(59.2% 0.249 0.584)",
        700: "oklch(52.5% 0.223 3.958)",
        800: "oklch(45.9% 0.187 3.815)",
        900: "oklch(40.8% 0.153 2.432)",
        950: "oklch(28.4% 0.109 3.907)"
    },
    rose: {
        50: "oklch(96.9% 0.015 12.422)",
        100: "oklch(94.1% 0.03 12.58)",
        200: "oklch(89.2% 0.058 10.001)",
        300: "oklch(81% 0.117 11.638)",
        400: "oklch(71.2% 0.194 13.428)",
        500: "oklch(64.5% 0.246 16.439)",
        600: "oklch(58.6% 0.253 17.585)",
        700: "oklch(51.4% 0.222 16.935)",
        800: "oklch(45.5% 0.188 13.697)",
        900: "oklch(41% 0.159 10.272)",
        950: "oklch(27.1% 0.105 12.094)"
    }
};
;
}),
"[project]/node_modules/tailwindcss/dist/colors.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwindcss$2f$dist$2f$chunk$2d$HTB5LLOP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwindcss/dist/chunk-HTB5LLOP.mjs [app-client] (ecmascript)");
;
;
}),
"[project]/node_modules/tailwindcss/dist/chunk-HTB5LLOP.mjs [app-client] (ecmascript) <export a as default>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwindcss$2f$dist$2f$chunk$2d$HTB5LLOP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwindcss$2f$dist$2f$chunk$2d$HTB5LLOP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwindcss/dist/chunk-HTB5LLOP.mjs [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_7003f1ae._.js.map