/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/App.jsx":
/*!************************!*\
  !*** ./src/js/App.jsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Navbar */ "./src/js/components/Navbar.jsx");
/* harmony import */ var _components_Breadcrumbs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Breadcrumbs */ "./src/js/components/Breadcrumbs.jsx");
/* harmony import */ var _components_Sidebar_Left__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Sidebar_Left */ "./src/js/components/Sidebar_Left.jsx");
/* harmony import */ var _components_Body__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Body */ "./src/js/components/Body.jsx");
/* harmony import */ var _components_Sidebar_Right__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Sidebar_Right */ "./src/js/components/Sidebar_Right.jsx");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Footer */ "./src/js/components/Footer.jsx");
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */







/* eslint-enable */

// const React = (function () {
//     let hooks = [];
//     let idx = 0;
//     let root = null;

//     function useState(initialValue) {
//         const state = hooks[idx] || initialValue;

//         const _idx = idx;
//         const setState = newVal => {
//             hooks[_idx] = newVal;
//         };

//         idx++;

//         return [state, setState];
//     }

//     function useEffect(cb, deps) {
//         let oldDeps = hooks[idx];
//         let hasChanged = true;

//         if (oldDeps) {
//             hasChanged = deps.some((dep, i) => !Object.is(dep, oldDeps[i]));
//         }

//         if (hasChanged) cb();
//         hooks[idx] = deps;
//         idx++;
//     }

//     function workLoop() {
//         idx = 0;
//         root.update(<MyComponent />);
//         setTimeout(workLoop, 300);
//     }

//     let renderIndex = 0;

//     function render(Component, selector, oldHooks) {
//         oldHooks = oldHooks || [];
//         console.log(oldHooks, hooks);
//         let vNode = Component();
//         let hasChanged = hooks.some((dep, i) => !Object.is(dep, oldHooks[i]));
//         idx = 0;
//         // let root = document.querySelector(selector);

//         if (renderIndex === 0) {
//             root = View.createRoot(selector);
//         }
//         // root.innerHTML = "";
//         // const c = Component();
//         // c.render();

//         // let node = View.createElement(vNode);
//         // root.appendChild(node);
//         if (renderIndex === 0) {
//             root.render(vNode);
//         } else if (renderIndex > 0 && hasChanged) {
//             root.update(vNode);
//         }

//         renderIndex++;
//         oldHooks = hooks;
//         // return c;
//         setTimeout(() => render(Component, selector, oldHooks), 750);
//     }

//     return { useState, useEffect, vNode, render };
// })();

function App() {
  // const [bool, setBool] = React.useState(1);
  var typeBool = true;
  // let appType = process.env.APP_TYPE || 'books-online';
  var appType = typeBool ? 'books-online' : 'ors-viewer';
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("header", {
    "class": "flex flex-col lg:h-32"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_components_Navbar__WEBPACK_IMPORTED_MODULE_1__["default"], null), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_components_Breadcrumbs__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: appType
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "container mx-auto"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "lg:grid lg:grid-cols-6"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_components_Sidebar_Left__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: appType
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_components_Body__WEBPACK_IMPORTED_MODULE_4__["default"], {
    type: appType
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_components_Sidebar_Right__WEBPACK_IMPORTED_MODULE_5__["default"], {
    type: appType
  }))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_components_Footer__WEBPACK_IMPORTED_MODULE_6__["default"], null));
}

/***/ }),

/***/ "./src/js/components/Body.jsx":
/*!************************************!*\
  !*** ./src/js/components/Body.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Body)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Hyperlink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hyperlink */ "./src/js/components/Hyperlink.jsx");
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Body(_ref) {
  var type = _ref.type;
  var styleTabActive = 'tab-btn rounded-t-md border border-b-transparent p-4';
  var styleTabInactive = 'tab-btn rounded-t-md border border-transparent border-b-inherit p-4 text-blue-400 hover:text-blue-500 hover:underline hover:underline-offset-2';
  var toggleTabs = function toggleTabs(tabBtnClicked) {
    var tabBtns = document.getElementsByClassName('tab-btn');
    var tabBodies = document.getElementsByClassName('tab-body');
    Array.from(tabBtns).forEach(function (tabBtn) {
      return tabBtn.className = tabBtnClicked.target === tabBtn ? styleTabActive : styleTabInactive;
    });
    Array.from(tabBodies).forEach(function (tabBody) {
      return tabBtnClicked.target.id.split('-')[2] === tabBody.id.split('-')[2] ? tabBody.classList.remove('hidden') : tabBody.classList.add('hidden');
    });
  };
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("main", {
    "class": "flex flex-col gap-4 p-4 lg:col-span-4 lg:col-start-2 lg:me-auto lg:p-8"
  }, type === 'books-online' ? (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "flex flex-col gap-4"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("h1", {
    "class": "text-3xl font-bold"
  }, "Felony Sentencing in Oregon: Guidelines, Statutes, Cases", ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("button", {
    "class": "contrast-[200] saturate-0 hover:opacity-[67.5%]"
  }, "\uD83D\uDD16")), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", {
    "class": "font-thin"
  }, "2019 edition \u2014 Includes June 2023 updates by Jennelle Meeks Barton"), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("h1", {
    "class": "text-3xl font-bold"
  }, "Chapter 1 - Introduction"), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", {
    "class": "flex items-center gap-2"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "Jesse Wm. Barton \uD83D\uDD89"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "flex gap-4"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "body-button",
    href: "/",
    body: "\uD83D\uDCC1 Chapters"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "body-button",
    href: "/",
    body: "\uD83D\uDCC1 References"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", null, "In 1977, the Oregon Legislature adopted the state\u2019s indeterminate (parole matrix) sentencing system. Effective November 1, 1989, the legislature replaced that system with the Oregon Sentencing Guidelines, a determinate sentencing system. The differences between indeterminate and determinate sentencing systems are discussed later in this chapter. Under either system:", (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("blockquote", {
    "class": "m-8 border-l-8 border-blue-400 p-4"
  }, "ORS 138.005(5)(a)-(b) (5) \u201CSentence\u201D means all legal consequences established or imposed by the trial court after conviction of an offense, including but not limited to: (a) Forfeiture, imprisonment, cancellation of license, removal from office, monetary obligation, probation, conditions of probation, discharge, restitution and community service; and (b) Suspension of imposition or execution of any part of a sentence, extension of a period of probation, imposition of a new or modified condition of probation or of sentence suspension, and imposition or execution of a sentence upon revocation of probation or sentence suspension. [ORS 558.35; ORS 529.1]"), "See also State v. Trice, 146 Or App 15, 19, 933 P2d 345, rev den, 325 Or 280 (1997) (\u201C[t]he term \u2018sentence\u2019 is generally defined as \u2018the judgment passed by a court or judge on a person on trial as a criminal or offender\u2019 and as an \u2018order by which a court or judge imposes punishment or penalty upon a person found guilty\u2019\u201D; quoting Webster\u2019s Third New International Dictionary 2068[sic] (unabridged ed 1993)). Although the legislature and the Oregon electorate, subsequent to the adoption of the guidelines, approved additional felony sentencing systems, these additional systems supplement, rather than replace, the guidelines. Consequently, this manual primarily focuses on the guidelines. This chapter discusses the guidelines\u2019 stated principles and purposes, including \u201C[t]he centerpiece of the sentencing guidelines\u201D\u2014the \u201CSentencing Guidelines Grid.\u201D State v. Davis, 315 Or 484, 487, 847 P2d 834 (1993). The chapter then discusses the guidelines\u2019 historical development and the manner in which they may be amended. The chapter also provides a summary of the categories of crimes and defendants to which the guidelines apply. Following that are analyses of the guidelines\u2019 stated definitions and the various rules used in construing the guidelines. Finally, the chapter discusses certain questions regarding the guidelines\u2019 constitutionality and trial court authority to impose money judgments in guidelines cases."), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("h1", {
    "class": "text-3xl font-bold"
  }, "\xA7 1-1. OAR 213-002-0001 STATEMENT OF PURPOSES AND PRINCIPLES."), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("blockquote", {
    "class": "mx-8 border-l-8 border-blue-400 p-4 font-thin"
  }, "213-002-0001Statement of Purposes and Principles (1) The primary objectives of sentencing are to punish each offender appropriately, and to insure the security of the people in person and property, within the limits of correctional resources provided by the Legislative Assembly, local governments and the people. (2) Sentencing guidelines are intended to forward the objectives described in section (1) by defining presumptive punishments for felony convictions, subject to judicial discretion to deviate for substantial and compelling reasons; and presumptive punishments for post-prison or probation supervision violations, again subject to deviation. (3) The basic principles which underlie these guidelines are: (a) The response of the corrections system to crime, and to violation of post-prison and probation supervision, must reflect the resources available for that response. A corrections system that overruns its resources is a system that cannot deliver its threatened punishment or its rehabilitative impact. This undermines the system\u2019s credibility with the public and the offender, and vitiates the objectives of prevention of recidivism and reformation of the offender. A corrections system that overruns its resources can produce costly litigation and the threat of loss of system control to the federal judiciary. A corrections system that overruns its resources can increase the risk to life and property within the system and to the public. (b) Oregon\u2019s current sentencing system combines indeterminate sentences with a parole matrix. Although many citizens believe the indeterminate sentence sets the length of imprisonment, that sentence only sets an offender\u2019s maximum period of incarceration and the matrix controls actual length of stay. The frequent disparity between the indeterminate sentence length and time served under the matrix confuses and angers the public and damages the corrections system\u2019s credibility with the public. Sentences of imprisonment should represent the time an offender will actually serve, subject only to any reduction authorized by law. (c) Under sentencing guidelines the response to many crimes will be state imprisonment. Other crimes will be punished by local penalties and restrictions imposed as part of probation. All offenders released from prison will be under post-prison supervision for a period of time. The ability of the corrections system to enforce swiftly and sternly the conditions of both probation and post-prison supervision, including by imprisonment, is crucial. Use of state institutions as the initial punishment for crime must, therefore, leave enough institutional capacity to permit imprisonment, when appropriate, for violation of probation and post-prison supervision conditions. (d) Subject to the discretion of the sentencing judge to deviate and impose a different sentence in recognition of aggravating and mitigating circumstances, the appropriate punishment for a felony conviction should depend on the seriousness of the crime of conviction when compared to all other crimes and the offender\u2019s criminal history. (e) Subject to the sentencing judge\u2019s discretion to deviate in recognition of aggravating and mitigating circumstances, the corrections system should seek to respond in a consistent way to like crimes combined with like criminal histories; and in a consistent way to like violations of probation and post-prison supervision conditions."), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("h1", {
    "class": "text-3xl font-bold"
  }, "\xA7 1-1.1. Intent of Provision."), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", null, "The commentary to this provision states: \u201CThe purposes of sentencing in Oregon and the principles that guide sentencing practices to achieve those purposes are legislative issues. This provision states the State Sentencing Guidelines Board\u2019s understanding of those purposes and principles as provided in the guidelines enabling legislation, Chapter 619, Oregon Laws 1987 (1987 legislation).\u201D Sentencing Guidelines Implementation Manual 6 (1989) (hereafter Implementation Manual). Regardless of what the legislature declared are the purposes and principles of sentencing, the Oregon Constitution states its own set of principles: \u201CLaws for the punishment of crime shall be founded on these principles: protection of society, personal responsibility, and accountability for one\u2019s actions and reformation.\u201D Or Const, Art I, \xA7 15. See also State v. Kinkel, 184 Or App 277, 287, 56 P3d 463, 469, rev den, 335 Or 142 (2002) (\u201C[t]o the extent that the four criteria [of Article I, section 15] can be applied on the level of individualized sentencing, their particular significance must vary depending on the circumstances of the crime or crimes being sentenced\u201D). It is noteworthy that although \u201Creformation\u201D is a constitutionally based sentencing principle, the legislative purposes and principles do not mention it. To the extent the principles set by legislature conflict with those set by the constitution, the constitutional principles control. See, e.g., State v. Baker, 328 Or 355, 364, 976 P2d 1132 (1999)."), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("blockquote", {
    "class": "border-l-4 border-yellow-400 bg-blue-50 p-4"
  }, "Practice Tip The terms \u201Creformation\u201D and \u201Crehabilitation\u201D are interchangeable. When relying on Article I, section 15\u2019s reformation principle, defense counsel should cite to Pope Francis\u2019s address to United States Congress. He said, \u201CA just and necessary punishment must never exclude the dimension of hope and the goal of rehabilitation.\u201D \u201CVisit to the Joint Session of the United States Congress: \u2018Address of the Holy Father,\u2019\u201D U.S. Capitol, Washington, D.C., Sept. 24, 2015.")) : type === 'ors-viewer' ? (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("h1", {
    "class": "text-4xl font-bold"
  }, "ORS 1.001"), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", {
    "class": "text-3xl font-thin"
  }, "State policy for courts")), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "flex flex-col gap-4"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("button", {
    id: "tab-btn-1",
    "class": styleTabActive,
    onclick: toggleTabs
  }, "Text")), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("button", {
    id: "tab-btn-2",
    "class": styleTabInactive,
    onclick: toggleTabs
  }, "Annotations")), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "w-full border border-transparent border-b-inherit p-4"
  }, "\xA0"))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", {
    id: "tab-body-1",
    "class": "tab-body flex flex-col gap-4"
  }, "The Legislative Assembly hereby declares that, as a matter of statewide concern, it is in the best interests of the people of this state that the judicial branch of state government, including the appellate, tax and circuit courts, be funded and operated at the state level. The Legislative Assembly finds that state funding and operation of the judicial branch can provide for best statewide allocation of governmental resources according to the actual needs of the people and of the judicial branch by establishing an accountable, equitably funded and uniformly administered system of justice for all the people of this state. [1981 s.s. c.3 \xA71]", (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("hr", null), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("small", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("i", null, "Source: Section 1.001 \u2014 State policy for courts,", ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "https://\xADoregonlegislature.\xADgov/bills_laws/ors/ors001.\xADhtml",
    body: "https://\xADoregonlegislature.\xADgov/bills_laws/ors/ors001.\xADhtml"
  })))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", {
    id: "tab-body-2",
    "class": "tab-body flex flex-col gap-4"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", null, "Law Review Citations"), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", null, "50 WLR 291 (2014)"))) : (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null));
}

/***/ }),

/***/ "./src/js/components/Breadcrumbs.jsx":
/*!*******************************************!*\
  !*** ./src/js/components/Breadcrumbs.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Breadcrumbs)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Hyperlink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hyperlink */ "./src/js/components/Hyperlink.jsx");
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Breadcrumbs(_ref) {
  var type = _ref.type;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("section", {
    "class": "container mx-auto flex items-center whitespace-pre border border-t-0 p-4 text-black lg:h-16"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "container mx-auto flex items-center"
  }, type === 'books-online' ?
  // <div class='flex items-center gap-2'>
  (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "Books Online"
  }), ' ', "/", ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", null, "Felony Sentencing in Oregon")) : type === 'ors-viewer' ? (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "https://oregon.public.law/statutes",
    body: "ORS"
  }), ' ', "/", ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "https://oregon.public.law/statutes/ors_volume_1",
    body: " Vol. 1 "
  }), ' ', "/", ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "https://oregon.public.law/statutes/ors_title_1",
    body: " Title 1 "
  }), ' ', "/", ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "https://oregon.public.law/statutes/ors_chapter_1",
    body: " Chap. 1. Courts & Judicial Officers Generally "
  }), ' ', "/ ", (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", null, "\xA7 1.001")) : (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null)));
}

/***/ }),

/***/ "./src/js/components/Footer.jsx":
/*!**************************************!*\
  !*** ./src/js/components/Footer.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Hyperlink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hyperlink */ "./src/js/components/Hyperlink.jsx");
/** @jsx vNode */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Footer() {
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("footer", {
    "class": "container mx-auto flex flex-col gap-4 border border-b-0 p-4 pb-16 lg:flex-row lg:gap-0 lg:p-8 lg:pb-16"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex h-max flex-col gap-8 lg:flex-row lg:gap-32"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex items-center gap-4"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "flex"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "brand",
    href: "https://oregon.public.law/",
    body: (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
      "class": "flex items-center"
    }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("img", {
      "class": "h-16",
      src: "https://www.ocdla.org/wp-content/uploads/2019/10/cropped-ocdla-logo.png"
    }))
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex gap-2"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "footer-social",
    href: "https://www.facebook.com/OregonCriminalDefenseLawyersAssociation/",
    body: (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("img", {
      "class": "size-8",
      src: "https://www.ocdla.org/wp-content/themes/wireframe/assets/images/default-facebook-icon.png"
    })
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "footer-social",
    href: "https://twitter.com/oregondefense?lang=en",
    body: (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("img", {
      "class": "size-8",
      src: "https://www.ocdla.org/wp-content/themes/wireframe/assets/images/default-twitter-icon.png"
    })
  }))))))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "text-xs font-thin"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, "\xA9 2024 Oregon Criminal Defense Lawyers Association"), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, "Oregon Criminal Defense Lawyers Association is a 501(c)(3) nonprofit educational association. Contributions to OCDLA may be tax deductible - check with your tax advisor. Electronic downloads are for the sole use of the purchasing member. Files may not be distributed to others."))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "text-nowrap"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col gap-2"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("strong", null, "Services")), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "https://pubs.ocdla.org/directory/members",
    body: "Membership Directory"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "https://pubs.ocdla.org/directory/experts",
    body: "Expert Directory"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "Online store"
  })))))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "text-nowrap"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col gap-2"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("strong", null, "Research")), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "https://pubs.ocdla.org/car/list",
    body: "Research Criminal Appellate Review"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "https://lod.ocdla.org/",
    body: "Library of Defense"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "https://lod.ocdla.org/Public:Subscriptions",
    body: "Books Online"
  })))))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "text-nowrap"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col gap-2"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("strong", null, "Resources")), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "CLEs"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "Videos"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "Seminars & Events"
  }))))))));
}

/***/ }),

/***/ "./src/js/components/Hyperlink.jsx":
/*!*****************************************!*\
  !*** ./src/js/components/Hyperlink.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Hyperlink)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */

function Hyperlink(_ref) {
  var type = _ref.type,
    extraClasses = _ref.extraClasses,
    href = _ref.href,
    body = _ref.body;
  var classes;
  switch (type) {
    case 'standard':
      classes = 'hover:underline-blue-500 text-blue-400 hover:opacity-[67.5%] hover:underline hover:underline-offset-2';
      break;
    case 'navbar-link':
      classes = 'text-nowrap text-neutral-500 hover:opacity-[67.5%] hover:underline hover:underline-offset-2 -ms-4 lg:m-0 px-4 py-8';
      break;
    case 'navbar-dropdown':
      classes = 'border border-t-0 hover:border-neutral-200 bg-neutral-50 px-12 py-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-600';
      break;
    case 'navbar-brand':
      classes = 'p-4 lg:py-8 -m-4';
      break;
    case 'navbar-button-feedback':
      classes = 'bg-blue-600 hover:bg-blue-500 text-white border-blue-600 hover:border-blue-500 px-4 py-2 rounded-md';
      break;
    case 'body-button':
      classes = 'border border-blue-600 hover:opacity-[67.5%] text-blue-600 px-4 py-2 rounded-md contrast-[0] saturate-0';
      break;
    case 'footer-social':
      classes = 'hover:opacity-[67.5%]';
      break;
  }
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("a", {
    "class": "".concat(classes).concat(extraClasses !== null && extraClasses !== void 0 ? extraClasses : ''),
    href: href
  }, body);
}

/***/ }),

/***/ "./src/js/components/ItemPage.jsx":
/*!****************************************!*\
  !*** ./src/js/components/ItemPage.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ItemPage)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable-next-line no-unused-vars */

function ItemPage(_ref) {
  var active = _ref.active,
    href = _ref.href,
    heading = _ref.heading,
    body = _ref.body;
  var a;
  var h1;
  var p;
  switch (active) {
    case true:
      a = 'text-white border-black bg-black';
      h1 = '';
      p = 'text-white';
      break;
    case undefined:
    case false:
      a = 'group hover:bg-neutral-100';
      h1 = 'text-blue-400 group-hover:text-blue-500';
      p = '';
      break;
  }
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("a", {
    "class": "flex border-b px-4 py-2 ".concat(a),
    href: href
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("small", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("h1", {
    "class": "text-xl font-bold ".concat(h1)
  }, heading), body ? (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", {
    "class": p
  }, body) : (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null))));
}

/***/ }),

/***/ "./src/js/components/Navbar.jsx":
/*!**************************************!*\
  !*** ./src/js/components/Navbar.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Navbar)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Hyperlink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hyperlink */ "./src/js/components/Hyperlink.jsx");
/** @jsx vNode */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Navbar() {
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("nav", {
    "class": "flex items-center lg:h-16 lg:p-0"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("menu", {
    "class": "container mx-auto flex flex-col gap-4 border border-t-0 p-4 pt-0 lg:h-16 lg:flex-row lg:items-center lg:gap-0 lg:py-0"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col items-center gap-4 lg:me-auto lg:flex-row lg:gap-0"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "flex items-center font-black text-white"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "navbar-brand",
    href: "https://oregon.public.law/",
    body: (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
      "class": "flex items-center"
    }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("img", {
      "class": "h-16",
      src: "https://www.ocdla.org/wp-content/uploads/2019/10/cropped-ocdla-logo.png"
    }))
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "navbar-link",
    href: "https://oregon.public.law/rules",
    body: "Oregon Administrative Rules"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "font-bold"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "navbar-link",
    href: "https://oregon.public.law/statutes",
    body: "Oregon Revised Statutes"
  }))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("hr", {
    "class": "block lg:hidden"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-row-reverse items-center gap-2 lg:flex-row"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "group relative ms-auto lg:m-0"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("button", {
    "class": "peer flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#516490] p-2 text-white hover:opacity-[67.5%] group-focus-within:opacity-[67.5%]"
  }, "G"), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "absolute left-[50%] top-full z-10 mt-[15px] hidden -translate-x-1/2 flex-col text-nowrap shadow group-focus-within:flex"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "navbar-dropdown",
    href: "https://oregon.public.law/users/sign_in",
    body: "Login"
  }))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "hidden text-neutral-300 lg:block"
  }, "|"), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "navbar-button-feedback",
    href: "/",
    body: "Give Feedback"
  }), ' '))));
}

/***/ }),

/***/ "./src/js/components/Sidebar_Left.jsx":
/*!********************************************!*\
  !*** ./src/js/components/Sidebar_Left.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar_Left)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _ItemPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemPage */ "./src/js/components/ItemPage.jsx");
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Sidebar_Left(_ref) {
  var type = _ref.type;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("aside", {
    "class": "hidden h-[87.5vh] overflow-scroll border-x lg:block"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", null, type === 'books-online' ? (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/fsm/foreword",
    heading: "Chapter 1",
    body: ""
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/fsm/sentencing-outline",
    heading: "Sentencing Outline",
    body: ""
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    active: true,
    href: "https://pubs.ocdla.org/fsm/1",
    heading: "Chapter 1",
    body: "Introduction"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/fsm/2",
    heading: "Chapter 2",
    body: "Crime Seriousness Rankings"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/fsm/3",
    heading: "Chapter 3",
    body: "Criminal History Scoring"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/fsm/4",
    heading: "Chapter 4",
    body: "Prison Sentences and Post-Prison Supervision"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/fsm/5",
    heading: "Chapter 5",
    body: "Probationary and Straight Jail Sentences"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/fsm/6",
    heading: "Chapter 6",
    body: "Plea Agreements"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/fsm/7",
    heading: "Chapter 7",
    body: "Departure Sentences"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/fsm/8",
    heading: "Chapter 8",
    body: "Merger and Consecutive Sentences"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/fsm/9",
    heading: "Chapter 9",
    body: "Appeals and Post-Sentencing/Resentencing Authority"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/fsm/10",
    heading: "Chapter 10",
    body: "Sentencing Guidelines"
  })) : type === 'ors-viewer' ? (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    active: true,
    href: "https://oregon.public.law/statutes/ors_1.001",
    heading: "1.001",
    body: "State policy for courts"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.002",
    heading: "1.002",
    body: "Supreme Court"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.003",
    heading: "1.003",
    body: "Chief Justice\u2019s powers to appoint Chief Judge and presiding judges"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.004",
    heading: "1.004",
    body: "Supreme Court rules governing coordination of class actions"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.005",
    heading: "1.005",
    body: "Credit card transactions for fees, security deposits, fines and other court-imposed obligations"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.006",
    heading: "1.006",
    body: "Supreme Court rules"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.007",
    heading: "1.007",
    body: "Judicial Department Revolving Account"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.008",
    heading: "1.008",
    body: "Personnel plan, fiscal plan and property plan"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.009",
    heading: "1.009",
    body: "Judicial Department Operating Account"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.010",
    heading: "1.010",
    body: "Powers of courts in administration of court business and proceedings"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.012",
    heading: "1.012",
    body: "State Court Technology Fund"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.020",
    heading: "1.020",
    body: "Contempt punishment"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.025",
    heading: "1.025",
    body: "Duty of court and court officers to require performance of duties relating to administration of justice"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.030",
    heading: "1.030",
    body: "Seal"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.040",
    heading: "1.040",
    body: "Sittings of court to be public"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.050",
    heading: "1.050",
    body: "Time for decision on submitted questions"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.060",
    heading: "1.060",
    body: "Days for transaction of judicial business"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.070",
    heading: "1.070",
    body: "When court deemed appointed for next judicial day"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.080",
    heading: "1.080",
    body: "Place of holding court"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.085",
    heading: "1.085",
    body: "Chief Justice to designate principal location for sitting of courts"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.090",
    heading: "1.090",
    body: "Trial elsewhere than at usual location on agreement of parties"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.110",
    heading: "1.110",
    body: "Adjournment when judge does not attend"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.120",
    heading: "1.120",
    body: "Proceedings unaffected by vacancy in office"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.130",
    heading: "1.130",
    body: "Power to adjourn proceedings"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.140",
    heading: "1.140",
    body: "Manner of addressing application or proceeding to court or judge"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.150",
    heading: "1.150",
    body: "Proceedings to be in English"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.160",
    heading: "1.160",
    body: "Means to carry jurisdiction into effect"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.171",
    heading: "1.171",
    body: "Powers and duties of presiding judge for judicial district"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.175",
    heading: "1.175",
    body: "Docket priorities"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.176",
    heading: "1.176",
    body: "Capital improvements to county courthouses"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.177",
    heading: "1.177",
    body: "State plan for security, emergency preparedness and business continuity for court facilities"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.178",
    heading: "1.178",
    body: "State Court Facilities and Security Account"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.180",
    heading: "1.180",
    body: "Advisory committees on court security and emergency preparedness"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.182",
    heading: "1.182",
    body: "Court facilities security accounts"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.185",
    heading: "1.185",
    body: "County to provide courtrooms, offices and jury rooms"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.187",
    heading: "1.187",
    body: "State to provide supplies and personal property for courts"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.188",
    heading: "1.188",
    body: "Surcharge on fines for courthouse"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.189",
    heading: "1.189",
    body: "Courthouse surcharge accounts"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.194",
    heading: "1.194",
    body: "Definitions for ORS 1.194 to 1.200"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.195",
    heading: "1.195",
    body: "Reports on liquidated and delinquent accounts of state courts"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.196",
    heading: "1.196",
    body: "Agreement for reciprocal offsets"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.197",
    heading: "1.197",
    body: "Assignment of liquidated and delinquent accounts to collection agencies"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.198",
    heading: "1.198",
    body: "Exemptions from requirements of ORS 1.197"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.199",
    heading: "1.199",
    body: "Policies and procedures for exempting accounts from requirements of ORS 1.197 and for ceasing collection efforts"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.200",
    heading: "1.200",
    body: "Effect of ORS 1.194 to 1.200 on authority of judge"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.202",
    heading: "1.202",
    body: "Fee for establishing and administering account for judgment that includes monetary obligation"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.210",
    heading: "1.210",
    body: "Judicial officer defined"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.212",
    heading: "1.212",
    body: "Oath of office for judges"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.220",
    heading: "1.220",
    body: "Judicial officer or partner acting as attorney"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.230",
    heading: "1.230",
    body: "Powers of a judge out of court"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.240",
    heading: "1.240",
    body: "Powers of judicial officers"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.250",
    heading: "1.250",
    body: "Punishment for contempt"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.260",
    heading: "1.260",
    body: "Powers of judges of Supreme Court, Court of Appeals, Oregon Tax Court and circuit courts"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.270",
    heading: "1.270",
    body: "Powers of other judicial officers"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.290",
    heading: "1.290",
    body: "Leaves of absence"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.300",
    heading: "1.300",
    body: "Senior judge"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.303",
    heading: "1.303",
    body: "Disability of judge"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.305",
    heading: "1.305",
    body: "Commencement of judicial term of office"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.310",
    heading: "1.310",
    body: "Involuntary retirement of judges for disability"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.410",
    heading: "1.410",
    body: "Commission on Judicial Fitness and Disability"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.415",
    heading: "1.415",
    body: "Powers and duties of commission"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.420",
    heading: "1.420",
    body: "Investigation"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.425",
    heading: "1.425",
    body: "Commission proceedings upon receipt of complaint of disability"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.430",
    heading: "1.430",
    body: "Supreme Court review"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.440",
    heading: "1.440",
    body: "Status of records of proceedings under ORS 1.420 or 1.425"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.450",
    heading: "1.450",
    body: "Status of testimony in proceedings under ORS 1.420 or 1.425"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.460",
    heading: "1.460",
    body: "Judge not to participate in proceedings involving self except in defense"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.470",
    heading: "1.470",
    body: "Service of process"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.475",
    heading: "1.475",
    body: "Procedure when process not obeyed"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.480",
    heading: "1.480",
    body: "Officers"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.525",
    heading: "1.525",
    body: "Uniform citation and petition forms for certain offenses"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.550",
    heading: "1.550",
    body: "Private counsel for judges"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.560",
    heading: "1.560",
    body: "Procedure for employment of private counsel"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.570",
    heading: "1.570",
    body: "Claims for compensation of private counsel"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.600",
    heading: "1.600",
    body: "Appointment pro tempore to Supreme Court or Court of Appeals"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.605",
    heading: "1.605",
    body: "Compensation and expenses for judges under ORS 1.600"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.615",
    heading: "1.615",
    body: "Appointment pro tempore to tax court or circuit court"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.625",
    heading: "1.625",
    body: "Compensation and expenses for judges under ORS 1.615"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.635",
    heading: "1.635",
    body: "Appointment pro tempore of eligible person to tax court or circuit court"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.645",
    heading: "1.645",
    body: "Transfer, challenge, disqualification, supervision of person appointed under ORS 1.635"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.655",
    heading: "1.655",
    body: "Extension and termination of appointment under ORS 1.635"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.665",
    heading: "1.665",
    body: "Compensation and expenses of persons appointed under ORS 1.635"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.675",
    heading: "1.675",
    body: "Judge pro tempore ineligible to participate in selection or removal of Chief Justice, Chief Judge or presiding judge"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.725",
    heading: "1.725",
    body: "Legislative findings"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.730",
    heading: "1.730",
    body: "Council on Court Procedures"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.735",
    heading: "1.735",
    body: "Rules of procedure"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.740",
    heading: "1.740",
    body: "Employment of staff"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.745",
    heading: "1.745",
    body: "Laws on civil pleading, practice and procedure deemed rules of court until changed"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.750",
    heading: "1.750",
    body: "Legislative Counsel to publish rules"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.755",
    heading: "1.755",
    body: "Gifts, grants and donations"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.760",
    heading: "1.760",
    body: "Legislative advisory committee"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.810",
    heading: "1.810",
    body: "Judicial conference"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.820",
    heading: "1.820",
    body: "Function of conference"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.830",
    heading: "1.830",
    body: "Meetings"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.840",
    heading: "1.840",
    body: "Annual report"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.851",
    heading: "1.851",
    body: "Local criminal justice advisory councils"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.855",
    heading: "1.855",
    body: "State Court Administrator to establish registry of justice and municipal courts"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ItemPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/statutes/ors_1.860",
    heading: "1.860",
    body: "Reports relating to municipal courts and justice courts"
  })) : (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null)));
}

/***/ }),

/***/ "./src/js/components/Sidebar_Right.jsx":
/*!*********************************************!*\
  !*** ./src/js/components/Sidebar_Right.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar_Right)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Hyperlink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hyperlink */ "./src/js/components/Hyperlink.jsx");
/** @jsx vNode */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Sidebar_Right(_ref) {
  var type = _ref.type;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("aside", {
    "class": "hidden h-[87.5vh] overflow-scroll border-x text-xs lg:block"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "p-4"
  }, type === 'books-online' ? (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("abbr", {
    "class": "flex flex-col gap-4"
    // Blank **title** attribute is required.
    ,
    title: ""
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-1.1. Intent of Provision."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-1.2. Punishment and Public Safety."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-1.3. Presumptive Punishments."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-1.4. Basic Guidelines Principles."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-2.1. Intent of Provision."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-3.1. Guidelines Amendments."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "June 2023 Update"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-3.2. OAR 213-001-0000 Notice Rule for Rulemaking."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-3.3. OAR 213-001-0005 Rulemaking Procedure."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-4.1 Intent of Provision."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-4.2. Date of Felony Uncertain."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-4.3. OAR 213-009-0002 Defendants Found Guilty Except for Insanity."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-4.4. Juvenile Defendants."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "June 2023 Update"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-5.1. Intent of Provision."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-6.1. Effect of Guidelines\u2019 Commentary and Staff Advisories."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.1. General Attacks."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.2. Specific Attacks\u2014Jury Trial Rights."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "June 2023 Update"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.3. Specific Attacks\u2014Due Process."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "June 2023 Update"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.4. Specific Attacks\u2014Notice of Intent to Prove Enhancement Facts."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "June 2023 Update"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.5. Specific Attacks\u2014Right Against Self-Incrimination."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.6. Specific Attacks\u2014Double Counting."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.7. Specific Attacks\u2014Confrontation."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.8. Specific Attacks\u2014Record of Prior Convictions."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "June 2023 Update"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.9. Specific Attacks\u2014Separate Criminal Episode Findings."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "June 2023 Update"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.10. Ad Hoc Application of Sentencing Schemes."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.11. Specific Attacks\u2014Speedy Trial."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-7.12. Specific Attacks\u2014Special State Constitutional Provisions."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "June 2023 Update"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "June 2023 Update"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "\xA7 1-8.1. Limitations on Money Judgments."
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "June 2023 Update"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "June 2023 Update"
  }))) : (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "flex flex-col gap-4"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("abbr", {
    title: ""
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "/",
    body: "Current through early 202"
  }))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, "\xA7 1.001\u2019s source at", ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Hyperlink__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "standard",
    href: "https://oregonlegislature.gov/bills_laws/ors/ors001.html",
    body: "oregon\u200B.gov \u25BA"
  })))));
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/css/input.css":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/css/input.css ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
! tailwindcss v3.4.6 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: "Open Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}
.container {
  width: 100%;
}
@media (min-width: 640px) {

  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {

  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {

  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {

  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {

  .container {
    max-width: 1536px;
  }
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.left-5 {
  left: 1.25rem;
}
.left-\\[50\\%\\] {
  left: 50%;
}
.top-5 {
  top: 1.25rem;
}
.top-full {
  top: 100%;
}
.z-10 {
  z-index: 10;
}
.-m-4 {
  margin: -1rem;
}
.m-8 {
  margin: 2rem;
}
.mx-8 {
  margin-left: 2rem;
  margin-right: 2rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.-ms-4 {
  margin-inline-start: -1rem;
}
.ms-auto {
  margin-inline-start: auto;
}
.mt-\\[15px\\] {
  margin-top: 15px;
}
.block {
  display: block;
}
.flex {
  display: flex;
}
.hidden {
  display: none;
}
.size-8 {
  width: 2rem;
  height: 2rem;
}
.h-16 {
  height: 4rem;
}
.h-\\[34px\\] {
  height: 34px;
}
.h-\\[87\\.5vh\\] {
  height: 87.5vh;
}
.h-full {
  height: 100%;
}
.h-max {
  height: -moz-max-content;
  height: max-content;
}
.min-h-screen {
  min-height: 100vh;
}
.w-\\[34px\\] {
  width: 34px;
}
.w-full {
  width: 100%;
}
.-translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.flex-row-reverse {
  flex-direction: row-reverse;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-4 {
  gap: 1rem;
}
.gap-8 {
  gap: 2rem;
}
.overflow-scroll {
  overflow: scroll;
}
.whitespace-pre {
  white-space: pre;
}
.text-nowrap {
  text-wrap: nowrap;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-md {
  border-radius: 0.375rem;
}
.rounded-t-md {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}
.border {
  border-width: 1px;
}
.border-x {
  border-left-width: 1px;
  border-right-width: 1px;
}
.border-b {
  border-bottom-width: 1px;
}
.border-b-0 {
  border-bottom-width: 0px;
}
.border-l-4 {
  border-left-width: 4px;
}
.border-l-8 {
  border-left-width: 8px;
}
.border-t-0 {
  border-top-width: 0px;
}
.border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.border-blue-400 {
  --tw-border-opacity: 1;
  border-color: rgb(96 165 250 / var(--tw-border-opacity));
}
.border-blue-600 {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
}
.border-transparent {
  border-color: transparent;
}
.border-yellow-400 {
  --tw-border-opacity: 1;
  border-color: rgb(250 204 21 / var(--tw-border-opacity));
}
.border-b-inherit {
  border-bottom-color: inherit;
}
.border-b-transparent {
  border-bottom-color: transparent;
}
.bg-\\[\\#516490\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(81 100 144 / var(--tw-bg-opacity));
}
.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}
.bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity));
}
.bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
.bg-neutral-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 250 250 / var(--tw-bg-opacity));
}
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
.from-amber-50 {
  --tw-gradient-from: #fffbeb var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(255 251 235 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-sky-50 {
  --tw-gradient-from: #f0f9ff var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(240 249 255 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-0\\% {
  --tw-gradient-from-position: 0%;
}
.via-25\\% {
  --tw-gradient-via-position: 25%;
}
.to-sky-300 {
  --tw-gradient-to: #7dd3fc var(--tw-gradient-to-position);
}
.to-50\\% {
  --tw-gradient-to-position: 50%;
}
.bg-no-repeat {
  background-repeat: no-repeat;
}
.p-2 {
  padding: 0.5rem;
}
.p-4 {
  padding: 1rem;
}
.px-12 {
  padding-left: 3rem;
  padding-right: 3rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.pb-16 {
  padding-bottom: 4rem;
}
.pt-0 {
  padding-top: 0px;
}
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.font-black {
  font-weight: 900;
}
.font-bold {
  font-weight: 700;
}
.font-thin {
  font-weight: 100;
}
.text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.text-blue-400 {
  --tw-text-opacity: 1;
  color: rgb(96 165 250 / var(--tw-text-opacity));
}
.text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.text-neutral-300 {
  --tw-text-opacity: 1;
  color: rgb(212 212 212 / var(--tw-text-opacity));
}
.text-neutral-500 {
  --tw-text-opacity: 1;
  color: rgb(115 115 115 / var(--tw-text-opacity));
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.contrast-\\[0\\] {
  --tw-contrast: contrast(0);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.contrast-\\[200\\] {
  --tw-contrast: contrast(200);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.saturate-0 {
  --tw-saturate: saturate(0);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.hover\\:border-blue-500:hover {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity));
}
.hover\\:border-neutral-200:hover {
  --tw-border-opacity: 1;
  border-color: rgb(229 229 229 / var(--tw-border-opacity));
}
.hover\\:bg-blue-500:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
}
.hover\\:bg-neutral-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(245 245 245 / var(--tw-bg-opacity));
}
.hover\\:text-blue-500:hover {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}
.hover\\:text-neutral-600:hover {
  --tw-text-opacity: 1;
  color: rgb(82 82 82 / var(--tw-text-opacity));
}
.hover\\:underline:hover {
  text-decoration-line: underline;
}
.hover\\:underline-offset-2:hover {
  text-underline-offset: 2px;
}
.hover\\:opacity-\\[67\\.5\\%\\]:hover {
  opacity: 67.5%;
}
.group:focus-within .group-focus-within\\:flex {
  display: flex;
}
.group:focus-within .group-focus-within\\:opacity-\\[67\\.5\\%\\] {
  opacity: 67.5%;
}
.group:hover .group-hover\\:text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}
@media (min-width: 1024px) {

  .lg\\:col-span-4 {
    grid-column: span 4 / span 4;
  }

  .lg\\:col-start-2 {
    grid-column-start: 2;
  }

  .lg\\:m-0 {
    margin: 0px;
  }

  .lg\\:me-auto {
    margin-inline-end: auto;
  }

  .lg\\:block {
    display: block;
  }

  .lg\\:flex {
    display: flex;
  }

  .lg\\:grid {
    display: grid;
  }

  .lg\\:hidden {
    display: none;
  }

  .lg\\:h-16 {
    height: 4rem;
  }

  .lg\\:h-32 {
    height: 8rem;
  }

  .lg\\:grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .lg\\:flex-row {
    flex-direction: row;
  }

  .lg\\:items-center {
    align-items: center;
  }

  .lg\\:gap-0 {
    gap: 0px;
  }

  .lg\\:gap-32 {
    gap: 8rem;
  }

  .lg\\:rounded-lg {
    border-radius: 0.5rem;
  }

  .lg\\:p-0 {
    padding: 0px;
  }

  .lg\\:p-8 {
    padding: 2rem;
  }

  .lg\\:py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .lg\\:py-8 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .lg\\:pb-16 {
    padding-bottom: 4rem;
  }
}
`, "",{"version":3,"sources":["webpack://./src/css/input.css"],"names":[],"mappings":"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","sourcesContent":["@tailwind base;\n@tailwind components;\n@tailwind utilities;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/input.css":
/*!***************************!*\
  !*** ./src/css/input.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_input_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!./input.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/css/input.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_input_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_input_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_input_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_input_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/@ocdla/view/cache.js":
/*!*******************************************!*\
  !*** ./node_modules/@ocdla/view/cache.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CACHE: () => (/* binding */ CACHE),
/* harmony export */   HISTORY: () => (/* binding */ HISTORY)
/* harmony export */ });





const CACHE = {};

const HISTORY = {};

let vNodeHistory = [];




CACHE.set = function (key, value) {
    CACHE[key] = value;
}

CACHE.get = function (key) {
    return CACHE[key];
}




HISTORY.set = function (index, vNode) {
    vNodeHistory[index] = vNode;
}

HISTORY.add = function (newVnode) {
    vNodeHistory.push(newVnode);
};

HISTORY.clear = function () {
    vNodeHistory = [];
}

HISTORY.getRecent = function (backwardsIndex) {
    return vNodeHistory[vNodeHistory.length - (1 + backwardsIndex)];
}

HISTORY.getLast = function () {
    return vNodeHistory[vNodeHistory.length - 1];
}

HISTORY.getLength = function () {
    return vNodeHistory.length;
}













/***/ }),

/***/ "./node_modules/@ocdla/view/view.js":
/*!******************************************!*\
  !*** ./node_modules/@ocdla/view/view.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   View: () => (/* binding */ View),
/* harmony export */   VirtualDom: () => (/* binding */ VirtualDom),
/* harmony export */   vNode: () => (/* binding */ vNode)
/* harmony export */ });
/* harmony import */ var _cache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cache.js */ "./node_modules/@ocdla/view/cache.js");
/**
 * @ocdladefense/view
 *
 * @description Here is my description.
 *
 *
 *
 */



  

const VirtualDom = (function() {
    return {
        Fragment: "Fragment"
    };
})();


/** 
 * @class View
 * 
 * This is a description of the View class.
 */
const View = (function() {

    
    const myEvents = {};

    const myAfterEvents = {};
    
    const domEvents = {};
    
    const CACHE = {};

    const HISTORY = {};
    
    let vNodeHistory = [];

    let historyUserIndex = 0; //IW - to keep track of what part of the history the user is in, in case they want to go back or forward?

    const NODE_CHANGED_STATES = ["NODE_NO_COMPARISON", "NODE_DIFFERENT_TYPE", "NODE_NOT_EQUAL", "NODE_DIFFERENT_ELEMENT", "NODE_PROPS_CHANGED", "TEXT_NODES_NOT_EQUAL"];
    
    //IW - to store stuff throughout the history so that you can access it at any point
    CACHE.set = function (key, value) {
        CACHE[key] = value;
    }
    
    CACHE.get = function (key) {
        return CACHE[key];
    }

    //IW - this one shouldnt be used because it would just replace the one at the index
    HISTORY.set = function (index, vNode) {
        vNodeHistory[index] = vNode;
    }
    
    //IW - The main function for adding things to the history
    HISTORY.add = function (newVnode) {
        vNodeHistory.push(newVnode);
    };
    
    //IW - if you dont want the user to be able to go back
    HISTORY.clear = function () {
        vNodeHistory = [];
    }
    
    //IW - if backwardsIndex is 0 it is the most recent history (the one already rendered)
    HISTORY.getRecent = function (backwardsIndex) {
        return vNodeHistory[vNodeHistory.length - (1 + backwardsIndex)];
    }
    
    //IW - the preveous function but it only returns the previous history
    HISTORY.getLast = function () {
        return vNodeHistory[vNodeHistory.length - 1];
    }
    
    //IW - Im not sure the use case for this one
    HISTORY.getLength = function () {
        return vNodeHistory.length;
    }
    
    
    
    
    


    
    function preRenderEventHelper(selector, eventType, callback, selectorType="class") {
        if (domEvents[selector] == null) {
            domEvents[selector] = {};
        }

        domEvents[selector][eventType.substring(2)] = {callback: callback, selectorType: selectorType};
    }


    function getEvents() {
        return domEvents;
    }
    
    
    function postRenderEventHelper() {
    
        //IW - goes through all dom objects that have an even, then goes through each event for that object, like if it had an onclick and an onchange(, then adds it to all its children?)
        for (var selector in domEvents) {
            let eventsArray = domEvents[selector];
            for (var eventType in eventsArray) {
                let event = eventsArray[eventType];
            //eventsArray.forEach(event => {
                //let eventType = event.eventType;
                //eventType = eventType.substring(2);
                let callback = event.callback;
                let selectorType = event.selectorType;
                let domSelector = selectorType == "class" ? ("." + selector) : ("#" + selector);
                let containers = document.querySelectorAll(domSelector);
                for (let i = 0; i < containers.length; i++) {
                    containers[i].addEventListener(eventType, callback);
                }
            };
        }
    }
    
    
    
    
    //IW - might be left over from what view.js was before
    function objectCombiner(obj1, obj2) {
        let newObj = {};
        for (var prop in obj1) {
            newObj[prop] = obj1[prop];
        }
        for (var prop in obj2) {
            newObj[prop] = obj2[prop];
        }
    
        return newObj;
    }
    
    
    
    /**
     * @memberof View
     * @method render
     * @instance
     * @description Perform an initial paint of a virtual node structure.
     * @param {Object} vNode A virtual node structure.
     */
    function render(vNode) {
        // let $parent = this.root;

        //let renderer = createElement.bind(this);

        this.currentTree = vNode;
        let $newNode = createElement(vNode);

        this.root.innerHTML = "";
        this.root.appendChild($newNode);
        

        // $parent.replaceChild($clone, this.root);
        // postRenderEventHelper(); //@jbernal

        // this.root = $clone;
        // this.root.addEventListener("click", myAppEventHandler);
        //BACKTO
        // HISTORY.add($parent); //might not be the correct one to add, also might not be correct using add instead of starting new
    }
    
    
    function update(newNode) {

        updateElement(this.root, newNode, this.currentTree);

        this.currentTree = newNode;
    }



    /**
     * @memberof View
     * @method updateElement
     * @instance
     * @description Perform an initial paint of a virtual node structure.
     * @param {DOMNode} $parent
     * @param {vNode} newNode Then new virtual node tree to be rendered.
     * @param {vNode} oldNode The old virtual node tree to be diffed.
     * @param {Integer} index The current index of a recursive structure.
     */
    function updateElement($parent, newNode, oldNode, index = 0) {

        let state = getChangeState(newNode, oldNode);

        // Whether to use replaceChild to swap nodes.
        let shouldSwapNodes = changed(state);

        // Whether this current evaluation is a synthetic node.
        let isSynthetic = newNode && typeof newNode.type === "function";

        if($parent.nodeType == 3) {
            return;
        }
        

        if(!oldNode) {
            let n = View.createElement(newNode);
            $parent.appendChild(n);
        }


        else if(!newNode) {
            if (!$parent.children[index]) {
                $parent.removeChild($parent.children[$parent.children.length-1]);
            } else {
                $parent.removeChild($parent.children[index]);
            }
        }


        else if(isSynthetic) {
            if(newNode.type && newNode.type.prototype && newNode.type.prototype.render) {
                let obj = new newNode.type(newNode.props);
                newNode = obj.render();
            } else {
                newNode = typeof newNode.type === "function" ? newNode.type(newNode.props) : newNode;
            }

            if(oldNode.type && oldNode.type.prototype && oldNode.type.prototype.render) {
                let obj = new oldNode.type(oldNode.props);
                oldNode = obj.render();
            }
            
            else oldNode = typeof oldNode.type === "function" ? oldNode.type(oldNode.props) : oldNode;
            updateElement($parent, newNode, oldNode, index);
        }


        else if(!isSynthetic && shouldSwapNodes) {
            let n = createElement(newNode);

            if(newNode.type) {
                $parent.replaceChild(n, $parent.childNodes[index]); 
            } else {
                $parent.replaceChild(n, $parent.childNodes[index]);
            }
            
        }

        // Not obvious, but text nodes don't have a type and should
        // have been handled before this block executes.
        else if(newNode.type && newNode.children) {

            const newLength = newNode.children.length;
            const oldLength = oldNode.children.length;

            for (let i = 0; i < newLength || i < oldLength; i++) {


                let nextParent = $parent.childNodes[index];
                let revisedNode = newNode.children[i];
                let expiredNode = oldNode.children[i];
                let equal = revisedNode == expiredNode;
                if(equal) continue;

                updateElement(
                    nextParent,
                    revisedNode,
                    expiredNode,
                    i
                );
            }
        }
    }
    



    function getChangeState(n1, n2) {

        if(n1 && !n2) return "NODE_NO_COMPARISON";

        if(n1 == n2) return "NODE_NO_CHANGE";

        // Comparing two text nodes that are obviously different.
        if(typeof n1 === "string" && typeof n2 === "string" && n1 !== n2) {
            return "TEXT_NODES_NOT_EQUAL";
        }

        if(typeof n1 !== typeof n2) {
            return "NODE_DIFFERENT_TYPE";
        }
        
        if(n1.type !== n2.type) {
            return "NODE_DIFFERENT_ELEMENT";
        }

        if(propsChanged(n1, n2)) {
            return "NODE_PROPS_CHANGED";
        }

        if(n1 != n2) {
            return "NODE_RECURSIVE_EVALUATE";
        }
        
        return "NODE_NO_CHANGE";
    }


    function changed(state) {

        return NODE_CHANGED_STATES.includes(state);
    }

    function propsChanged(node1, node2) {

        let node1Props = node1.props;
        let node2Props = node2.props;
    
        if (typeof node1Props != typeof node2Props) {
            return true;
        }
    
        if (!node1Props && !node2Props) {
            return false;
        }
    
        let aProps = Object.getOwnPropertyNames(node1Props);
        let bProps = Object.getOwnPropertyNames(node2Props);
    
        
        if (aProps.length != bProps.length) {
            return true;
        }
    
        for (let i = 0; i < aProps.length; i++) {
            let propName = aProps[i];
    
            if (node1Props[propName] !== node2Props[propName]) {
                return true;
            }
        }

        return false;
    }



    
    //IW - not used?
    function props(props){
        var p = {};
        for(var i = 0; i<props.length; i++){
            var attr = props.item(i);
            p["class" == attr.nodeName ? "className" : attr.nodeName] = attr.nodeValue;
            // console.log(props.item(i));
        }
        
        return p;
    }
    

    
    
    // Main event handler for any view application.
    function myAppEventHandler(e) {
        //console.log(e);
        e.preventDefault(); //added to prevent a link from taking you somewhere
    
        let target, actions, action, virtualNodes, currentVnodeState, details;
    
    
        target = e.target;
        actions = getDefinedActions();
        details = e.frameworkDetail;
    
    
        action = details.action;
    
        if (!actions.includes(action)) {
            return false;
        }
        
        currentVnodeState = HISTORY.getRecent(0); //BACKTO
    
        virtualNodes = myEvents[action](details);
        
        if (virtualNodes) {
            try {
                //to remove error if a nonpromise is returned because you just want to detect if something is clicked without rendering anything
                //could maybe make it so other related errors dont pop up in debugger?
                return virtualNodes.then(function(vNodes) {
                    HISTORY.add(vNodes);
                    updateElement(root, vNodes, currentVnodeState);
                    myAfterEvents[action]();
                });
            }
            catch {
                //console.log("non promise event was called");
                return false;
            }
        }
    
    
    
    }
    
    
    
    
    function getDefinedActions() {
        return Object.getOwnPropertyNames(myEvents);
    }
    
    function addEvent(key, result, afterRenderEvent = function() {}) {
        //console.log(this.root); //using the root here might not work if it gets changed
        //this.root.addEventListener("click", myAppEventHandler);

        myEvents[key] = result;
        myAfterEvents[key] = afterRenderEvent;
    }

    

    /**
     * @constructs View
     * @param root
     */
    function View(root) {
        this.root = root;
        //document.getElementById("order-history-main").addEventListener("click", myAppEventHandler);
        //root.addEventListener("click", myAppEventHandler);
    }

    View.prototype = {
        render: render,
        update: update,
        addEvent: addEvent,
        preRenderEventHelper: preRenderEventHelper,
        createElement: createElement,
        getEvents, getEvents
    };
    

    return View;
})();



/**
 * Return a View instance from the given DOM element or selector.
 * 
 * @param {string} selector 
 * @returns {View}
 */
View.createRoot = function(selector) {
    let elem = typeof selector == "string" ? document.querySelector(selector) : selector;
    let root = elem.cloneNode(false);
    elem.parentElement.replaceChild(root, elem);
    
    return new View(root);
};
    


/**
 * @memberof View
 * @method createElement
 * @description Recursively transform a virtual node structure into a DOM node tree.
 * @param {Object} vnode A virtual node structure.
 * @returns DOMElement
 */
function createElement(vnode) {
    
    if(typeof vnode === "string" || typeof vnode === "number") {
        return document.createTextNode(vnode.toString());
    }
    if(vnode.type == "text") {
        return document.createTextNode(vnode.children);
    }
    //first check to see if component references a class name
    if(typeof vnode.type == "function" && vnode.type.prototype && vnode.type.prototype.render) {
        console.log("vNode is a class reference");
        let obj = new vnode.type(vnode.props);
        let render = obj.render();
        let node = createElement(render);
        //BACKTO
        // Let the component know about its own root.
        // obj.setRoot(node);
        return node;
    }
    if(typeof vnode.type == "function") {
        let fn = vnode.type(vnode.props);
        return createElement(fn);
    }

    var $el = vnode.type == "Fragment" ? document.createDocumentFragment() : document.createElement(vnode.type);
    var theClassNames;
    var theEventKey;

    if (vnode.props) {
        //var html5 = "className" == prop ? "class" : prop;
        theClassNames = vnode.props["class"];
        if (theClassNames) {
            theClassNames = theClassNames.split(" "); //hack, get better way of obtaining names, this one only gets the first
            // theEventKey = theClassNames[0]; 
        }
    }
    
    //BACKTO
    for(var prop in vnode.props) {
        var html5 = "className" == prop ? "class" : prop;
        if("children" == prop) continue;
        if (prop.indexOf("on") === 0) {
            // this.preRenderEventHelper(theEventKey, prop, vnode.props[prop]);
            $el.addEventListener(prop.substring(2), vnode.props[prop]);
            continue;
        }
        else if (vnode.props[prop] === null) {
            continue;
        }
        else {
            $el.setAttribute(html5,vnode.props[prop]);
        }
    }
    
    if(null != vnode.children) {
        vnode.children.map(createElement)
            .forEach($el.appendChild.bind($el));
    }
    
    return $el;
};

View.createElement = createElement;

/** 
 * JSX parsing function.
 */
function vNode(name,attributes,...children) {
    attributes = attributes || {};
    let joined = [];
    if(children.length == 0 || null == children[0] || typeof children[0] == "undefined") {
        joined = [];
    } else if(children.length == 1 && typeof children[0] == "string") {
        joined = children;
    } else {
        for(var i = 0; i<children.length; i++) {
            if(Array.isArray(children[i])) {
                joined = joined.concat(children[i]);
            } else {
                joined.push(children[i]);
            }
        }
    }


    attributes.children = joined;
            
    var vnode =  {    
        type: name,
        props: attributes,
        children: joined
    };
    
    return vnode;
}





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_input_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/input.css */ "./src/css/input.css");
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/js/App.jsx");

/** @jsx vNode */
/* eslint-disable no-unused-vars */


/* eslint-enable */

var $body = document.querySelector('body');
var js_root = _ocdla_view__WEBPACK_IMPORTED_MODULE_1__.View.createRoot($body);
// const root = View.createRoot('#root');

js_root.render((0,_ocdla_view__WEBPACK_IMPORTED_MODULE_1__.vNode)(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null)); // JSX Tests
/******/ })()
;
//# sourceMappingURL=app.bundle.js.map