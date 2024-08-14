/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@ocdla/lib-http/HttpClient.js":
/*!****************************************************!*\
  !*** ./node_modules/@ocdla/lib-http/HttpClient.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HttpClient)
/* harmony export */ });
/* harmony import */ var _caches_HttpCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./caches/HttpCache.js */ "./node_modules/@ocdla/lib-http/caches/HttpCache.js");
/* harmony import */ var _caches_LocalStorageCache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./caches/LocalStorageCache.js */ "./node_modules/@ocdla/lib-http/caches/LocalStorageCache.js");
/* harmony import */ var _Url_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Url.js */ "./node_modules/@ocdla/lib-http/Url.js");
/* harmony import */ var _HttpHeader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HttpHeader.js */ "./node_modules/@ocdla/lib-http/HttpHeader.js");






console.log("I am local HTTP module");

class HttpClient {

  // Store references to mocking classes.
  // Mocking classes are registered against domains.
  static mocks = {};

  // For performance reasons, store outbound requests.
  // This enables what would otherwise be multiple requests to
  // the same URL to resolve to the same fetch request.
  static outbound = {};


  /**
   * 
   * @param {Request} req 
   * @returns Response
   */


  /*
  @param cacheOptions - Object with two keys: 'cache' and 'params'. Constructor is the name of our cache implementation. Params is an object that will be passed to that constructor.
  */
  constructor(config = {}) {
    // Turns on and off hashing
    this.debug = config.debug || false;
    let cache = config['cacheOptions'] || null;
    this.cache = cache ? new cache['cache'](cache['params']) : null; // Dynamically instantiate our cache service from the config. Leave null to use browser cache.
  }


  send(req) {
    if (navigator.onLine == false) {
      throw new Error("Network offline.");
    }

      
    // Will hold any reference to a mocking class for the request.
    let mock;

    // Will hold a reference to the cached response, if there is one.
    let cached; 

    // Reference to the pending outbound request.
    let pending;

    // Key for our cache. If we are debugging, don't hash it. Otherwise, hash it.
    let key = this.debug ? req.method + req.url : HttpClient.cyrb53(req.method + req.url);

    // Get the cache control from our request headers. If there is no cache control, use an empty string.
    let cacheHeader = req.headers.get("cache-control") || "";
    let cacheControl = new _HttpHeader_js__WEBPACK_IMPORTED_MODULE_3__["default"](
      "cache-control",
      cacheHeader
    );

    // Store our complex condition in a variable. If the request is a GET, we have a caching solution, and the cache control doesn't specify no-cache.
    let usingCaching = req.method == "GET" && this.cache && !cacheControl.hasValue("no-cache"); 

    try {

      mock = this.getMock(req);

      if(mock)
      {
        return mock.getResponse(req);
      }


      // Check the cache for a response.
      if (usingCaching)
      {
        // cached = HttpCache.get(req);
        // check the cache for a matching response;
        // if nothing's there we return null.
        cached = this.cache.match(key);
        // Prefer a completed response, if one already happens to be in the cache.
        if(cached) return cached;
      }


      // If there is a pending request to the same URL, return it.
      if (HttpClient.outbound[key])
      {
        return HttpClient.outbound[key];
      }


      // If we've made it this far, we need to go to the network to get the resource.
      pending = fetch(req).then((resp) => {

        // Remove the pending request, as we've now fulfilled it.
        delete HttpClient.outbound[key];


        // If we are using caching, store the response in the cache.
        if (usingCaching) {
            this.cache.put(key, resp.clone());
        } 


        return resp;
      });


      // Store the pending request.
      // This will prevent multiple unfulfilled requests to the same URL.
      HttpClient.outbound[key] = pending;


      return pending;

    } catch (e) {

      console.error(e);
      if (req.headers.get("Accept") == "application/json") {
        return Response.json({
          success: false,
          error: true,
          code: e.cause,
          message: e.message
        }, {status: 500});
      }

      else return new Response(e.message, {status: 500});
    }


  }

  static register(domain, mock) {
    let url = new _Url_js__WEBPACK_IMPORTED_MODULE_2__["default"](domain);
    domain = url.getDomain();

    HttpClient.mocks[domain] = mock;
  }

  getMock(req) {
    let url = new _Url_js__WEBPACK_IMPORTED_MODULE_2__["default"](req.url);
    let domain = url.getDomain();

    return HttpClient.mocks[domain];
  }

  static cyrb53(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }

}







/***/ }),

/***/ "./node_modules/@ocdla/lib-http/HttpHeader.js":
/*!****************************************************!*\
  !*** ./node_modules/@ocdla/lib-http/HttpHeader.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HttpHeader)
/* harmony export */ });

class HttpHeader {

    constructor(name, value) {
        this.name = name;
        this.values = HttpHeader.parseValues(value);
    }

    // 1. theres 1 value, no commas: pass
    // 2. theres multiple value, commas: pass
    // 3. some of those values are parameters, semicolons and commas: 
    // 4. some of those parameters have values, semicolons, commas, and equals:

    static parseValues(value) {
        let map = {};
        let values = value.split(",");
        
        for (let i = 0; i < values.length; i++) {
            let current = values[i].trim();
            let [k,v] = current.split("="); // at index 0, when no "=", k = current, v = undefined
            map[k] = v;
        }

        return map;
    }

    /**
   * 
   * @returns {bool}
   */
    hasValue(v) {
        // if v doesn't exist, it returns undefined which is falsy
        return this.values.hasOwnProperty(v);
    }

    getParameter(k) {
        return this.values[k];
    }
    
    getName() {
        return this.name;
    }
} 

/***/ }),

/***/ "./node_modules/@ocdla/lib-http/Url.js":
/*!*********************************************!*\
  !*** ./node_modules/@ocdla/lib-http/Url.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Url)
/* harmony export */ });

const URL_SCHEME_SEPARATOR = "://";

const URL_PATH_SEPARATOR = "/";

const URL_QUERYSTRING_SEPARATOR = "?";

const URL_FRAGMENT_SEPARATOR = "#";

const SCHEME_HTTP = "http";

const SCHEME_HTTPS = "https";

const SCHEME_FILE = "file";


class Url {
    
    url = null;

    scheme = SCHEME_HTTP;

    domain = null;

    path = "";

    query = {};

    constructor(url) {

        this.url = url;
        
        let re = /:\/\/|\?/gis;

        let parts = this.url.split(re);

        this.scheme = parts.shift();

        let qs;

        if (parts.length == 2) {
            qs = parts.pop();
        }

        let d = parts[0];

        parts = d.split(URL_PATH_SEPARATOR);

        this.domain = parts.shift();

        this.path = URL_PATH_SEPARATOR + parts.join(URL_PATH_SEPARATOR);
        
        if (qs != null) {
            this.query = Url.parseQueryString(qs);
        }
    }

    static parseQueryString(qs) {
        let queryParts = qs.split("&");
        let query = {};
        for (let i = 0; i < queryParts.length; i++) {
            let kvp = queryParts[i];
            let parts = kvp.split("=");
            let key = parts[0];
            let value = parts[1];
            query[key] = value;
        }

        return query;
    }


    static formatQueryString(obj) {
        let params = [];
        for (let prop in obj) {
            let kvp;
            kvp = prop + "=" + obj[prop];
            params.push(kvp);
        };
        return params.join("&");
    }

    getLastPathSegment() {
        let parts = this.path.split("/");
        let last = parts.pop();
        return last;
    }


    getDomain() {
        return this.domain;
    }

    getScheme() {
        return this.scheme;
    }

    getPath() {
        return this.path;
    }

    getQuery() {
        return this.query;
    }

    buildQuery(key, value) {
        this.query[key] = value;
    }

    toString() {
        let queryString = "";
        let fragment = "";

        let kvpa = [];
        // start with our query object and build a string
        for (var prop in this.query) {

            let value = this.query[prop];
            let kvp = !value ? prop : (prop + "=" + this.query[prop]);
            kvpa.push(kvp);
        }

        queryString = !kvpa.length ? "" : (URL_QUERYSTRING_SEPARATOR + kvpa.join("&"));

        return this.scheme + URL_SCHEME_SEPARATOR + this.domain + this.path + queryString + fragment;
    }
} 

/***/ }),

/***/ "./node_modules/@ocdla/lib-http/caches/HttpCache.js":
/*!**********************************************************!*\
  !*** ./node_modules/@ocdla/lib-http/caches/HttpCache.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HttpCache)
/* harmony export */ });
class HttpCache {

    static cache = {};

    put(key, resp) {
        HttpCache.cache[key] = resp;
    }

    get(key) {
        return HttpCache.cache[key] || null;
    }

    // Stay compatible with other cache interfaces.
    match(key) {
        return this.get(key);
    }


}

/***/ }),

/***/ "./node_modules/@ocdla/lib-http/caches/LocalStorage/LocalStorage.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ocdla/lib-http/caches/LocalStorage/LocalStorage.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LocalStorage)
/* harmony export */ });
class LocalStorage {
    // JSON Object that holds default string key names and default values if no values exist
    static DEFAULTS = {};

    constructor(config = {}) {
        // Define the default string keys to access the local storage. Expects JSON object with string keys and default value types.
        // EX. {"news": {lastFetch: new Date(), stories: null},  "favorites": new Array()}
        if (config.defaults !== undefined)
            LocalStorage.DEFAULTS = config.defaults;
    }

    // Using the string key, return from local storage the value stored. If it is undefined, search on the defaults object for a base structure
    getValue(key) { 
        return localStorage[key] === undefined ? LocalStorage.DEFAULTS[key] : JSON.parse(localStorage[key]); 
    }

    // Using the string key, set local storage to the passed value
    setValue(key, value) { 
        if (value !== undefined) 
            localStorage[key] = JSON.stringify(value); 
    }
   
    // Clear all local storage
    clearAll() { 
        // TODO: This should really be constrained to the keys that it accesses.
        localStorage.clear(); 
    }    
}

/***/ }),

/***/ "./node_modules/@ocdla/lib-http/caches/LocalStorage/LocalStorageResponse.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@ocdla/lib-http/caches/LocalStorage/LocalStorageResponse.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LocalStorageResponse)
/* harmony export */ });
class LocalStorageResponse {

    headers = {};

    body = null;

    expires = null;

    constructor(body, headers, expires) {
        this.body = body;
        this.headers = headers || this.headers;
        this.expires = expires || this.expires;
    }

    addHeader(k, v) {
        this.headers[k] = v;
    }

    getHeaders() {
        return this.headers;
    }

    getBody() {
        return this.body;
    }


    toString() {
        return JSON.stringify(this);
    }

    /*
     Convert this object to a standard JavaScript Response object.
    */
    toResponse() {
        return Response.json(JSON.parse(this.body), {headers: this.headers});
    }

    // Convert stored JSON in the format '{"headers":{"h1":"h1","h2":"h2","h3":"h3"},"body":"{"prop1":"val1"}"}'.
    static fromJson(cachedJson) {
        const {body,headers,expires} = JSON.parse(cachedJson);

        return new LocalStorageResponse(body,headers,expires);
    }

    // Convert an instance JavaScript Response to an instance of this class.
    static fromHttpResponse(httpResp, expires=null) {
        let headers = new Headers(httpResp.headers);
        return httpResp.text().then( body => new LocalStorageResponse(body,headers,expires) );
    }
}

/***/ }),

/***/ "./node_modules/@ocdla/lib-http/caches/LocalStorageCache.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ocdla/lib-http/caches/LocalStorageCache.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LocalStorageCache)
/* harmony export */ });
/* harmony import */ var _LocalStorage_LocalStorageResponse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LocalStorage/LocalStorageResponse.js */ "./node_modules/@ocdla/lib-http/caches/LocalStorage/LocalStorageResponse.js");
/* harmony import */ var _LocalStorage_LocalStorage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LocalStorage/LocalStorage.js */ "./node_modules/@ocdla/lib-http/caches/LocalStorage/LocalStorage.js");




class LocalStorageCache {
    // @params: refresh - If refresh is specified, the cache will be refreshed every refresh seconds.
    constructor(config = {}) {
        this.refreshTime = config.refresh || null;
    }
    put(key, httpResp) {
        let expires = this.refreshTime >= 0 ? Date.now() + (this.refreshTime * 1000) : false
        let resp = _LocalStorage_LocalStorageResponse_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromHttpResponse(httpResp, expires);
        resp.then( resp => {      
            let localStorage = new _LocalStorage_LocalStorage_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
            localStorage.setValue(key, resp.toString());
        });
    }

    get(key) {
        const localStorageParams = {
            defaults: {
                [key]: null
            }
        };

        // We get the value of the key. If there is nothing, we expect to get back null.
        let localStorage = new _LocalStorage_LocalStorage_js__WEBPACK_IMPORTED_MODULE_1__["default"](localStorageParams);
        let json = localStorage.getValue(key);

        if (json) {
            let cachedResp;
            cachedResp = _LocalStorage_LocalStorageResponse_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromJson(json);
            if (LocalStorageCache.isResponseFresh(cachedResp))
                return cachedResp.toResponse();
        }
        
        return null;

    }

    match(key) {
        return this.get(key);
    }

    // Returns true if the cached response is fresh: i.e. not stale.
    static isResponseFresh(entry) {
        let expires = entry.expires;
        if (!expires) return true;
        return Date.now() < new Date(expires).getTime();
    }
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Base_Content.jsx":
/*!********************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Base_Content.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   baseStyleLink: () => (/* binding */ baseStyleLink),
/* harmony export */   "default": () => (/* binding */ Base_Element_Link)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */


// defaultLinkStyle
var baseStyleLink = 'hover:underline-blue-500 text-blue-400 hover:opacity-[67.5%] hover:underline hover:underline-offset-2';

// Link
function Base_Element_Link(_ref) {
  var _ref$classes = _ref.classes,
    classes = _ref$classes === void 0 ? baseStyleLink : _ref$classes,
    extraClasses = _ref.extraClasses,
    href = _ref.href,
    label = _ref.label;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("a", {
    "class": "".concat(classes).concat(extraClasses ? " ".concat(extraClasses) : ''),
    href: href || null
  }, label);
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Body.jsx":
/*!************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Body.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Body)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Base_Content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base_Content */ "./node_modules/@ocdla/global-components/src/Base_Content.jsx");
/* harmony import */ var _Folder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Folder */ "./node_modules/@ocdla/global-components/src/Folder.jsx");
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */



/* eslint-enable */

function Body(_ref) {
  var view = _ref.view,
    type = _ref.type,
    html_body_ors_viewer = _ref.html_body_ors_viewer,
    test = _ref.test;
  var styleTabActive = 'tab-btn rounded-t-md border border-b-transparent p-4';
  var styleTabInactive = 'tab-btn rounded-t-md border border-transparent border-b-inherit p-4 text-blue-400 hover:text-blue-500 hover:underline hover:underline-offset-2';
  var toggleTabs = function toggleTabs(tabBtnClicked) {
    var tabBtns = document.getElementsByClassName('tab-btn');
    var tabBodies = document.getElementsByClassName('tab-body');
    Array.from(tabBtns).forEach(function (tabBtn) {
      tabBtn.className = tabBtnClicked.target === tabBtn ? styleTabActive : styleTabInactive;
    });
    Array.from(tabBodies).forEach(function (tabBody) {
      return tabBtnClicked.target.id.split('-')[2] === tabBody.id.split('-')[2] ? tabBody.classList.remove('hidden') : tabBody.classList.add('hidden');
    });
  };
  // const waitForElement = (id, callback) => {
  //     const intervalId = setTimeout(function () {
  //         const element = document.getElementById(id);

  //         if (element) {
  //             clearInterval(intervalId);

  //             callback(element);
  //         }
  //     }, 0);
  // };

  // waitForElement('body', element => {
  // element.innerHtml = html_body_ors_viewer;

  // console.log('Element is now available:', element);

  // view.render(
  //     <Body
  //         view={view}
  //         type={type}
  //         html_body_ors_viewer={html_body_ors_viewer}
  //         test={element.innerHtml}
  //     />
  // );
  // });

  // console.log(html_body_ors_viewer);

  // console.log(document.getElementById('body'));

  // document.body.innerHtml = html_body_ors_viewer;

  return (
    // <main id='body'></main>
    // <main id='body'>{html_body_ors_viewer}</main>
    // <main id='body'>abc</main>
    // <main id='body'>{test}</main>
    (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("main", {
      id: "body",
      "class": "flex w-full flex-col gap-4 p-4 lg:col-span-4 lg:col-start-2 lg:me-auto lg:border-x lg:p-8"
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
    }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", null, "Edited by:"), ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
      href: "/",
      label: "Jesse Wm. Barton"
    })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
      "class": "flex gap-4"
    }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Folder__WEBPACK_IMPORTED_MODULE_2__["default"], {
      href: "/",
      label: "\uD83D\uDCC1 Chapters"
    }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Folder__WEBPACK_IMPORTED_MODULE_2__["default"], {
      href: "/",
      label: "\uD83D\uDCC1 References"
    })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", null, "In 1977, the Oregon Legislature adopted the state\u2019s indeterminate (parole matrix) sentencing system. Effective November 1, 1989, the legislature replaced that system with the Oregon Sentencing Guidelines, a determinate sentencing system. The differences between indeterminate and determinate sentencing systems are discussed later in this chapter. Under either system:"), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("blockquote", {
      "class": "m-0 border border-l-8 border-neutral-200 border-l-blue-400 bg-blue-50 p-4 lg:mx-8"
    }, "ORS 138.005(5)(a)-(b) (5) \u201CSentence\u201D means all legal consequences established or imposed by the trial court after conviction of an offense, including but not limited to: (a) Forfeiture, imprisonment, cancellation of license, removal from office, monetary obligation, probation, conditions of probation, discharge, restitution and community service; and (b) Suspension of imposition or execution of any part of a sentence, extension of a period of probation, imposition of a new or modified condition of probation or of sentence suspension, and imposition or execution of a sentence upon revocation of probation or sentence suspension. [ORS 558.35; ORS 529.1]"), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", null, "See also State v. Trice, 146 Or App 15, 19, 933 P2d 345, rev den, 325 Or 280 (1997) (\u201C[t]he term \u2018sentence\u2019 is generally defined as \u2018the judgment passed by a court or judge on a person on trial as a criminal or offender\u2019 and as an \u2018order by which a court or judge imposes punishment or penalty upon a person found guilty\u2019\u201D; quoting Webster\u2019s Third New International Dictionary 2068[sic] (unabridged ed 1993)). Although the legislature and the Oregon electorate, subsequent to the adoption of the guidelines, approved additional felony sentencing systems, these additional systems supplement, rather than replace, the guidelines. Consequently, this manual primarily focuses on the guidelines. This chapter discusses the guidelines\u2019 stated principles and purposes, including \u201C[t]he centerpiece of the sentencing guidelines\u201D\u2014the \u201CSentencing Guidelines Grid.\u201D State v. Davis, 315 Or 484, 487, 847 P2d 834 (1993). The chapter then discusses the guidelines\u2019 historical development and the manner in which they may be amended. The chapter also provides a summary of the categories of crimes and defendants to which the guidelines apply. Following that are analyses of the guidelines\u2019 stated definitions and the various rules used in construing the guidelines. Finally, the chapter discusses certain questions regarding the guidelines\u2019 constitutionality and trial court authority to impose money judgments in guidelines cases."), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("h1", {
      "class": "text-3xl font-bold"
    }, "\xA7 1-1. OAR 213-002-0001 STATEMENT OF PURPOSES AND PRINCIPLES."), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("blockquote", {
      "class": "m-0 border border-l-8 border-neutral-200 border-l-blue-400 bg-blue-50 p-4 lg:mx-8"
    }, "213-002-0001Statement of Purposes and Principles (1) The primary objectives of sentencing are to punish each offender appropriately, and to insure the security of the people in person and property, within the limits of correctional resources provided by the Legislative Assembly, local governments and the people. (2) Sentencing guidelines are intended to forward the objectives described in section (1) by defining presumptive punishments for felony convictions, subject to judicial discretion to deviate for substantial and compelling reasons; and presumptive punishments for post-prison or probation supervision violations, again subject to deviation. (3) The basic principles which underlie these guidelines are: (a) The response of the corrections system to crime, and to violation of post-prison and probation supervision, must reflect the resources available for that response. A corrections system that overruns its resources is a system that cannot deliver its threatened punishment or its rehabilitative impact. This undermines the system\u2019s credibility with the public and the offender, and vitiates the objectives of prevention of recidivism and reformation of the offender. A corrections system that overruns its resources can produce costly litigation and the threat of loss of system control to the federal judiciary. A corrections system that overruns its resources can increase the risk to life and property within the system and to the public. (b) Oregon\u2019s current sentencing system combines indeterminate sentences with a parole matrix. Although many citizens believe the indeterminate sentence sets the length of imprisonment, that sentence only sets an offender\u2019s maximum period of incarceration and the matrix controls actual length of stay. The frequent disparity between the indeterminate sentence length and time served under the matrix confuses and angers the public and damages the corrections system\u2019s credibility with the public. Sentences of imprisonment should represent the time an offender will actually serve, subject only to any reduction authorized by law. (c) Under sentencing guidelines the response to many crimes will be state imprisonment. Other crimes will be punished by local penalties and restrictions imposed as part of probation. All offenders released from prison will be under post-prison supervision for a period of time. The ability of the corrections system to enforce swiftly and sternly the conditions of both probation and post-prison supervision, including by imprisonment, is crucial. Use of state institutions as the initial punishment for crime must, therefore, leave enough institutional capacity to permit imprisonment, when appropriate, for violation of probation and post-prison supervision conditions. (d) Subject to the discretion of the sentencing judge to deviate and impose a different sentence in recognition of aggravating and mitigating circumstances, the appropriate punishment for a felony conviction should depend on the seriousness of the crime of conviction when compared to all other crimes and the offender\u2019s criminal history. (e) Subject to the sentencing judge\u2019s discretion to deviate in recognition of aggravating and mitigating circumstances, the corrections system should seek to respond in a consistent way to like crimes combined with like criminal histories; and in a consistent way to like violations of probation and post-prison supervision conditions."), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("h1", {
      "class": "text-3xl font-bold"
    }, "\xA7 1-1.1. Intent of Provision."), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", null, "The commentary to this provision states: \u201CThe purposes of sentencing in Oregon and the principles that guide sentencing practices to achieve those purposes are legislative issues. This provision states the State Sentencing Guidelines Board\u2019s understanding of those purposes and principles as provided in the guidelines enabling legislation, Chapter 619, Oregon Laws 1987 (1987 legislation).\u201D Sentencing Guidelines Implementation Manual 6 (1989) (hereafter Implementation Manual). Regardless of what the legislature declared are the purposes and principles of sentencing, the Oregon Constitution states its own set of principles: \u201CLaws for the punishment of crime shall be founded on these principles: protection of society, personal responsibility, and accountability for one\u2019s actions and reformation.\u201D Or Const, Art I, \xA7 15. See also State v. Kinkel, 184 Or App 277, 287, 56 P3d 463, 469, rev den, 335 Or 142 (2002) (\u201C[t]o the extent that the four criteria [of Article I, section 15] can be applied on the level of individualized sentencing, their particular significance must vary depending on the circumstances of the crime or crimes being sentenced\u201D). It is noteworthy that although \u201Creformation\u201D is a constitutionally based sentencing principle, the legislative purposes and principles do not mention it. To the extent the principles set by legislature conflict with those set by the constitution, the constitutional principles control. See, e.g., State v. Baker, 328 Or 355, 364, 976 P2d 1132 (1999)."), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("blockquote", {
      "class": "m-0 border border-l-8 border-neutral-200 border-l-yellow-400 bg-blue-50 p-4 lg:mx-8"
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
    }, "The Legislative Assembly hereby declares that, as a matter of statewide concern, it is in the best interests of the people of this state that the judicial branch of state government, including the appellate, tax and circuit courts, be funded and operated at the state level. The Legislative Assembly finds that state funding and operation of the judicial branch can provide for best statewide allocation of governmental resources according to the actual needs of the people and of the judicial branch by establishing an accountable, equitably funded and uniformly administered system of justice for all the people of this state. [1981 s.s. c.3 \xA71]", (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("hr", null), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("small", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("i", null, "Source: Section 1.001 \u2014 State policy for courts,", ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
      href: "https://\xADoregonlegislature.\xADgov/bills_laws/ors/ors001.\xADhtml",
      label: "https://\xADoregonlegislature.\xADgov/bills_laws/ors/ors001.\xADhtml"
    })))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", {
      id: "tab-body-2",
      "class": "tab-body flex hidden flex-col gap-4"
    }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", null, "Law Review Citations"), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", null, "50 WLR 291 (2014)"))) : (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null))
  );
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Breadcrumbs.jsx":
/*!*******************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Breadcrumbs.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Breadcrumbs)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Breadcrumbs_Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Breadcrumbs_Item */ "./node_modules/@ocdla/global-components/src/Breadcrumbs_Item.jsx");
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Breadcrumbs(_ref) {
  var items = _ref.items;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("section", {
    "class": "flex items-center border border-t-0 p-4 text-black lg:h-16"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-wrap items-center whitespace-pre"
  }, items.map(function (item, i) {
    var seperatorString = i !== items.length - 1 ? ' / ' : ' ';
    return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Breadcrumbs_Item__WEBPACK_IMPORTED_MODULE_1__["default"], item), seperatorString);
  })));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Breadcrumbs_Item.jsx":
/*!************************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Breadcrumbs_Item.jsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Breadcrumbs_Item)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Base_Content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base_Content */ "./node_modules/@ocdla/global-components/src/Base_Content.jsx");
/** @jsx vNode */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Breadcrumbs_Item(_ref) {
  var href = _ref.href,
    label = _ref.label;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: href,
    label: label
  }));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Button.jsx":
/*!**************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Button.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */

function Button(_ref) {
  var href = _ref.href,
    label = _ref.label;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "size-full"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("a", {
    "class": "group flex h-16 items-center p-4",
    href: href
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "text-nowrap rounded-md border border-neutral-300 bg-neutral-50 px-4 py-2 text-neutral-500 group-hover:border-neutral-200 group-hover:bg-transparent group-hover:text-neutral-400"
  }, label)));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Dividers.jsx":
/*!****************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Dividers.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Divider_Desktop: () => (/* binding */ Divider_Desktop),
/* harmony export */   Divider_Mobile: () => (/* binding */ Divider_Mobile)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */

var Divider_Desktop = function Divider_Desktop() {
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "hidden text-neutral-300 lg:block"
  }, "|");
};
var Divider_Mobile = function Divider_Mobile() {
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "block size-full lg:hidden"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("hr", null));
};

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Dropdown.jsx":
/*!****************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Dropdown.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dropdown)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Base_Content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base_Content */ "./node_modules/@ocdla/global-components/src/Base_Content.jsx");
/** @jsx vNode */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Dropdown(_ref) {
  var href = _ref.href,
    label = _ref.label;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    classes: "border border-t-0 hover:border-neutral-200 bg-neutral-50 px-12 py-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-600",
    href: href,
    label: label
  }));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Folder.jsx":
/*!**************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Folder.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Folder)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Base_Content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base_Content */ "./node_modules/@ocdla/global-components/src/Base_Content.jsx");
/** @jsx vNode */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Folder(_ref) {
  var href = _ref.href,
    label = _ref.label;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    classes: "border border-blue-600 hover:opacity-[67.5%] text-blue-600 px-4 py-2 rounded-md contrast-[0] saturate-0",
    href: href,
    label: label
  }));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Footer.jsx":
/*!**************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Footer.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Base_Content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base_Content */ "./node_modules/@ocdla/global-components/src/Base_Content.jsx");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Logo */ "./node_modules/@ocdla/global-components/src/Logo.jsx");
/* harmony import */ var _Social__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Social */ "./node_modules/@ocdla/global-components/src/Social.jsx");
/* harmony import */ var _Google_Maps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Google_Maps */ "./node_modules/@ocdla/global-components/src/Google_Maps.jsx");
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */





/* eslint-enable */

function Footer(_ref) {
  var showFacebook = _ref.showFacebook,
    showTwitter = _ref.showTwitter,
    useGoogleMapsIFrame = _ref.useGoogleMapsIFrame;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("footer", {
    "class": "container mx-auto border border-b-0 p-4 pb-16 lg:p-8 lg:pb-32"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col gap-4 lg:gap-8"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col gap-4 lg:flex-row lg:gap-8"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col gap-1"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex items-center gap-1"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Logo__WEBPACK_IMPORTED_MODULE_2__["default"], null), showFacebook ? (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Social__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "facebook",
    handle: "OregonCriminalDefenseLawyersAssociation"
  }) : (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null), showTwitter ? (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Social__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "twitter",
    handle: "oregondefense"
  }) :
  //                                             <Social
  //     type='twitter'
  //     handle='oregondefense'
  // />
  (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "text-[0.625rem] font-thin leading-[0.75rem] text-neutral-500"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, "\xA9 2024 Oregon Criminal Defense Lawyers Association"), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "size-full text-wrap"
  }, "Oregon Criminal Defense Lawyers Association is a 501(c)(3) nonprofit educational association. Contributions to OCDLA may be tax deductible - check with your tax advisor. Electronic downloads are for the sole use of the purchasing member. Files may not be distributed to others."))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "text-neutral-300"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://ocdla.org",
    label: "ocdla.org"
  }), ' ', !useGoogleMapsIFrame ? (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null, "|", ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://maps.app.goo.gl/7dCYKBEyJbmo8tzS7",
    label: "101 East 14th Ave, Eugene, OR 97401 "
  }), ' ') : (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null), "|", ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "mailto:info@ocdla.org",
    label: "info@ocdla.org"
  }), ' ', "|", ' ', (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "tel:+15416868716",
    label: "(+1) 541-686-8716"
  }))))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "size-full"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col gap-8 text-nowrap text-[#516490] lg:flex-row lg:gap-16"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col gap-1"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", {
    "class": "text-base font-bold"
  }, "SERVICES")), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/directory/members",
    label: "Membership Directory"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/directory/experts",
    label: "Expert Directory"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "/",
    label: "Online store"
  })))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col gap-1"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", {
    "class": "text-base font-bold"
  }, "RESEARCH")), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://pubs.ocdla.org/car/list",
    label: "Research Criminal Appellate Review"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://lod.ocdla.org/",
    label: "Library of Defense"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://lod.ocdla.org/Public:Subscriptions",
    label: "Books Online"
  })))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col gap-1"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", {
    "class": "text-base font-bold"
  }, "RESOURCES")), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "/",
    label: "CLEs"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "/",
    label: "Videos"
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "/",
    label: "Seminars & Events"
  })))))))), useGoogleMapsIFrame ? (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Google_Maps__WEBPACK_IMPORTED_MODULE_4__["default"], {
    src: "https://google.com/maps/embed?pb=!1m18!1m12!1m3!1d2867.8775315978623!2d-123.09091950000001!3d44.0445852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54c11e41b2e3f7ad%3A0xa7600cd512aa10ed!2s101%20E%2014th%20Ave%2C%20Eugene%2C%20OR%2097401!5e0!3m2!1sen!2sus!4v1722628072318!5m2!1sen!2sus"
  }) : (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null)));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Google_Maps.jsx":
/*!*******************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Google_Maps.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Google_Maps)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */

function Google_Maps(_ref) {
  var src = _ref.src;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("iframe", {
    "class": "aspect-square w-full border-0 lg:w-64",
    src: src,
    allowfullscreen: true,
    referrerpolicy: "no-referrer-when-downgrade"
  })));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Logo.jsx":
/*!************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Logo.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Logo)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */

function Logo(_ref) {
  var type = _ref.type;
  // Default = 'footer'
  var li = type === 'navbar' ? 'size-full' : '';
  var a = type === 'navbar' ? 'flex p-4' : '';
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": li
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("a", {
    "class": a,
    href: "https://ocdla.org"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("img", {
    "class": "h-16",
    src: "https://ocdla.org/wp-content/uploads/2019/10/cropped-ocdla-logo.png"
  })));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Navbar.jsx":
/*!**************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Navbar.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Navbar)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Logo */ "./node_modules/@ocdla/global-components/src/Logo.jsx");
/* harmony import */ var _Navlink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Navlink */ "./node_modules/@ocdla/global-components/src/Navlink.jsx");
/* harmony import */ var _Dividers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Dividers */ "./node_modules/@ocdla/global-components/src/Dividers.jsx");
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Search */ "./node_modules/@ocdla/global-components/src/Search.jsx");
/* harmony import */ var _Profile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Profile */ "./node_modules/@ocdla/global-components/src/Profile.jsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Button */ "./node_modules/@ocdla/global-components/src/Button.jsx");
/** @jsx vNode */
/* eslint-disable no-unused-vars */







/* eslint-enable */

function Navbar() {
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("nav", {
    "class": "flex flex-col border border-0 border-b lg:h-16 lg:flex-row lg:border lg:border-t-0"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex size-full flex-col items-start lg:flex-row lg:items-center"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "size-full lg:size-max"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col items-center lg:flex-row"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: "navbar"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Navlink__WEBPACK_IMPORTED_MODULE_2__["default"], {
    href: "https://oregon.public.law/rules",
    label: "Oregon Administrative Rules"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Navlink__WEBPACK_IMPORTED_MODULE_2__["default"], {
    active: true,
    href: "https://oregon.public.law/statutes",
    label: "Oregon Revised Statutes"
  }))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Dividers__WEBPACK_IMPORTED_MODULE_3__.Divider_Mobile, null), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "size-full lg:ms-auto lg:size-max"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-col items-start lg:flex-row lg:items-center"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Search__WEBPACK_IMPORTED_MODULE_4__["default"], {
    placeholder: "Search"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Dividers__WEBPACK_IMPORTED_MODULE_3__.Divider_Desktop, null), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "size-full"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "flex flex-row-reverse items-center lg:flex-row"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Profile__WEBPACK_IMPORTED_MODULE_5__["default"], {
    bg: "bg-[#516490]",
    label: "G"
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Dividers__WEBPACK_IMPORTED_MODULE_3__.Divider_Desktop, null), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    href: "/",
    label: "Give Feedback"
  })))))));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Navlink.jsx":
/*!***************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Navlink.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Navlink)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Base_Content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base_Content */ "./node_modules/@ocdla/global-components/src/Base_Content.jsx");
/** @jsx vNode */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Navlink(_ref) {
  var active = _ref.active,
    href = _ref.href,
    label = _ref.label;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "size-full"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    classes: "".concat(active ? 'font-bold ' : '', " items-center lg:h-16 flex text-nowrap text-neutral-500 hover:opacity-[67.5%] hover:underline hover:underline-offset-2 p-4"),
    href: href,
    label: label
  }));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Profile.jsx":
/*!***************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Profile.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Profile)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/@ocdla/global-components/src/Dropdown.jsx");
/** @jsx vNode */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Profile(_ref) {
  var bg = _ref.bg,
    label = _ref.label;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "relative"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("button", {
    "class": "group peer flex h-16 items-center p-4"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "".concat(bg ? "".concat(bg, " ") : '', "h-[34px] w-[34px] flex items-center text-white justify-center rounded-full group-hover:opacity-[67.5%] focus-within:opacity-[67.5%]")
  }, label)), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", {
    "class": "absolute left-[-1rem] top-[calc(100%+0.5rem)] z-10 hidden -translate-x-1/2 flex-col text-nowrap shadow peer-focus-within:flex lg:left-1/2"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "https://oregon.public.law/users/sign_in",
    label: "Login"
  })));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Search.jsx":
/*!**************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Search.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Search)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */

function Search(_ref) {
  var placeholder = _ref.placeholder;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", {
    "class": "flex size-full justify-center p-4"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("input", {
    "class": "rounded-md border border-neutral-300 px-4 py-2 focus:border-neutral-200",
    type: "search",
    placeholder: placeholder
  }));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Sidebar.jsx":
/*!***************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Sidebar.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */

function Sidebar(_ref) {
  var children = _ref.children;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("aside", {
    "class": "hidden h-[87.5vh] overflow-scroll lg:block"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("ul", null, children));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Sidebar_Item.jsx":
/*!********************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Sidebar_Item.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar_Item)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Base_Content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base_Content */ "./node_modules/@ocdla/global-components/src/Base_Content.jsx");
/** @jsx vNode */
/* eslint-disable no-unused-vars */


/* eslint-enable */

function Sidebar_Item(_ref) {
  var href = _ref.href,
    label = _ref.label;
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    extraClasses: "flex border-b px-4 py-2",
    href: href,
    label: label
  }));
}

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/Social.jsx":
/*!**************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/Social.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Social)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _Base_Content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base_Content */ "./node_modules/@ocdla/global-components/src/Base_Content.jsx");
/* harmony import */ var _icons_twitter_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/twitter.png */ "./node_modules/@ocdla/global-components/src/icons/twitter.png");
/* harmony import */ var _icons_facebook_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons/facebook.png */ "./node_modules/@ocdla/global-components/src/icons/facebook.png");
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */


// import abc from './icons';


/* eslint-enable */

function Social(_ref) {
  var type = _ref.type,
    handle = _ref.handle,
    src = _ref.src;
  // require.context('./', true, /\.(svg|png)$/gim);

  var domain;
  handle = handle || '';

  // console.log(abc);

  switch (type) {
    case 'twitter':
    case 'x':
      domain = 'https://x.com/';
      src = src || _icons_twitter_png__WEBPACK_IMPORTED_MODULE_2__;
      break;
    case 'facebook':
    case 'meta':
      domain = 'https://facebook.com/';
      src = src || _icons_facebook_png__WEBPACK_IMPORTED_MODULE_3__;
      break;
    case 'youtube':
      domain = 'https://youtube.com/loremipsumloremipsum';
      domain = 'https://youtube.com/@abc';
      break;
    case 'reddit':
      domain = 'https://reddit.com/r/';
      break;
  }

  // const src =
  //     type === 'twitter'
  //         ? 'https://ocdla.org/wp-content/themes/wireframe/assets/images/default-twitter-icon.png'
  //         : 'https://ocdla.org/wp-content/themes/wireframe/assets/images/default-facebook-icon.png';
  var alt = type === 'twitter' ? 'Twitter logo' : 'Facebook logo';

  // r/abc
  var href = domain + handle;
  // const src = './icons/' + type + '.png';

  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_Base_Content__WEBPACK_IMPORTED_MODULE_1__["default"], {
    classes: "hover:opacity-[67.5%]",
    href: href,
    label: (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("img", {
      "class": "size-8"
      // src={src}
      ,
      src: src,
      alt: alt
    })
  }));
}

/***/ }),

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
/* harmony import */ var _ocdla_global_components_src_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ocdla/global-components/src/Navbar */ "./node_modules/@ocdla/global-components/src/Navbar.jsx");
/* harmony import */ var _ocdla_global_components_src_Breadcrumbs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ocdla/global-components/src/Breadcrumbs */ "./node_modules/@ocdla/global-components/src/Breadcrumbs.jsx");
/* harmony import */ var _ocdla_global_components_src_Sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ocdla/global-components/src/Sidebar */ "./node_modules/@ocdla/global-components/src/Sidebar.jsx");
/* harmony import */ var _components_ORS_Section_Link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ORS_Section_Link */ "./src/js/components/ORS_Section_Link.jsx");
/* harmony import */ var _ocdla_global_components_src_Sidebar_Item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ocdla/global-components/src/Sidebar_Item */ "./node_modules/@ocdla/global-components/src/Sidebar_Item.jsx");
/* harmony import */ var _ocdla_global_components_src_Body__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ocdla/global-components/src/Body */ "./node_modules/@ocdla/global-components/src/Body.jsx");
/* harmony import */ var _ocdla_global_components_src_Footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ocdla/global-components/src/Footer */ "./node_modules/@ocdla/global-components/src/Footer.jsx");
/* harmony import */ var _data_json_books_online_breadcrumbs_items_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../data/json/books-online/breadcrumbs/items.json */ "./src/data/json/books-online/breadcrumbs/items.json");
/* harmony import */ var _data_json_books_online_sidebar_left_items_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../data/json/books-online/sidebar_left/items.json */ "./src/data/json/books-online/sidebar_left/items.json");
/* harmony import */ var _data_json_books_online_sidebar_right_items_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../data/json/books-online/sidebar_right/items.json */ "./src/data/json/books-online/sidebar_right/items.json");
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */








/* eslint-enable */

// import Ors_Viewer_Breadcrumbs_Items from '../data/json/ors-viewer/breadcrumbs/items.json';

// import Ors_Viewer_Sidebar_Left_Items from '../data/json/ors-viewer/sidebar_left/items.json';

// import Ors_Viewer_Sidebar_Right_Items from '../data/json/ors-viewer/sidebar_right/items.json';

function App(_ref) {
  var view = _ref.view,
    currentAppType = _ref.currentAppType,
    headerPinned = _ref.headerPinned,
    currentVolume = _ref.currentVolume,
    currentTitle = _ref.currentTitle,
    currentChapter = _ref.currentChapter,
    currentSection = _ref.currentSection,
    items_breadcrumbs_ors_viewer = _ref.items_breadcrumbs_ors_viewer,
    items_sidebar_left_ors_viewer = _ref.items_sidebar_left_ors_viewer,
    items_sidebar_left_books_online = _ref.items_sidebar_left_books_online,
    html_body_ors_viewer = _ref.html_body_ors_viewer,
    items_sidebar_right_ors_viewer = _ref.items_sidebar_right_ors_viewer;
  var appTypeIndicators = currentAppType ? '📚' : '🔍';
  var appTypeString = currentAppType ? 'books-online' : 'ors-viewer';

  // console.log(items_sidebar_left_books_online);

  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("Fragment", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    // Preserve whitespace at end of top-0
    // prettier-ignore
    "class": "".concat(headerPinned === 'pinned' ? 'fixed ' : 'absolute ', "right-0 z-10 flex w-max gap-2 bg-white p-4 lg:left-0 lg:p-2")
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("button", {
    "class": "select-none font-bold",
    onclick: function onclick() {
      currentAppType = !currentAppType;
      view.render((0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(App, {
        view: view,
        currentAppType: currentAppType,
        headerPinned: headerPinned,
        currentVolume: currentVolume,
        currentTitle: currentTitle,
        currentChapter: currentChapter,
        currentSection: currentSection,
        items_breadcrumbs_ors_viewer: items_breadcrumbs_ors_viewer,
        items_sidebar_left_ors_viewer: items_sidebar_left_ors_viewer,
        items_sidebar_left_books_online: items_sidebar_left_books_online,
        html_body_ors_viewer: html_body_ors_viewer,
        items_sidebar_right_ors_viewer: items_sidebar_right_ors_viewer
      }));
    }
  }, appTypeIndicators, " | ", appTypeString)), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("header", {
    // Preserve whitespace at end of top-0
    // prettier-ignore
    "class": "".concat(headerPinned === 'pinned' ? 'sticky top-0 ' : '', "container mx-auto flex w-full flex-col bg-white lg:h-32")
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ocdla_global_components_src_Navbar__WEBPACK_IMPORTED_MODULE_1__["default"], null), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ocdla_global_components_src_Breadcrumbs__WEBPACK_IMPORTED_MODULE_2__["default"], {
    items: currentAppType ? _data_json_books_online_breadcrumbs_items_json__WEBPACK_IMPORTED_MODULE_8__ : currentAppType === false ? items_breadcrumbs_ors_viewer : []
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "container mx-auto border-x"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("div", {
    "class": "lg:grid lg:grid-cols-6"
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ocdla_global_components_src_Sidebar__WEBPACK_IMPORTED_MODULE_3__["default"], null, currentAppType ? _data_json_books_online_sidebar_left_items_json__WEBPACK_IMPORTED_MODULE_9__.map(function (item) {
    return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_components_ORS_Section_Link__WEBPACK_IMPORTED_MODULE_4__["default"], item);
  }) : items_sidebar_left_ors_viewer.map(function (item) {
    return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_components_ORS_Section_Link__WEBPACK_IMPORTED_MODULE_4__["default"], item);
  })), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ocdla_global_components_src_Body__WEBPACK_IMPORTED_MODULE_6__["default"], {
    view: view,
    type: appTypeString,
    html_body_ors_viewer: html_body_ors_viewer
  }), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ocdla_global_components_src_Sidebar__WEBPACK_IMPORTED_MODULE_3__["default"], null, currentAppType ? _data_json_books_online_sidebar_right_items_json__WEBPACK_IMPORTED_MODULE_10__.map(function (item) {
    return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ocdla_global_components_src_Sidebar_Item__WEBPACK_IMPORTED_MODULE_5__["default"], item);
  }) : items_sidebar_right_ors_viewer.map(function (item) {
    return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ocdla_global_components_src_Sidebar_Item__WEBPACK_IMPORTED_MODULE_5__["default"], item);
  })))), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)(_ocdla_global_components_src_Footer__WEBPACK_IMPORTED_MODULE_7__["default"], {
    showFacebook: true,
    showTwitter: true,
    useGoogleMapsIFrame: true
  }));
}

/***/ }),

/***/ "./src/js/components/ORS_Section_Link.jsx":
/*!************************************************!*\
  !*** ./src/js/components/ORS_Section_Link.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ORS_Section_Link)
/* harmony export */ });
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */

function ORS_Section_Link(_ref) {
  var active = _ref.active,
    href = _ref.href,
    heading = _ref.heading,
    label = _ref.label;
  var a = 'group hover:bg-neutral-100';
  var h = 'text-blue-400 group-hover:text-blue-500 ';
  var p = '';
  if (active) {
    a = 'text-white border-black bg-black';
    h = '';
    p = 'text-white';
  }
  return (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("li", null, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("a", {
    "class": "".concat(a, " flex flex-col gap-2 border-b px-4 py-2"),
    href: href
  }, (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("h1", {
    "class": "".concat(h, "font-bold")
  }, heading), (0,_ocdla_view__WEBPACK_IMPORTED_MODULE_0__.vNode)("p", {
    "class": p
  }, label)));
}

/***/ }),

/***/ "./src/js/functions/fetch_data.js":
/*!****************************************!*\
  !*** ./src/js/functions/fetch_data.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetch_body_ors_viewer: () => (/* binding */ fetch_body_ors_viewer),
/* harmony export */   fetch_breadcrumbs_ors_viewer: () => (/* binding */ fetch_breadcrumbs_ors_viewer),
/* harmony export */   fetch_sidebar_left_books_online: () => (/* binding */ fetch_sidebar_left_books_online),
/* harmony export */   fetch_sidebar_left_ors_viewer: () => (/* binding */ fetch_sidebar_left_ors_viewer),
/* harmony export */   fetch_sidebar_right_ors_viewer: () => (/* binding */ fetch_sidebar_right_ors_viewer)
/* harmony export */ });
/* harmony import */ var _ocdla_lib_http_Url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ocdla/lib-http/Url */ "./node_modules/@ocdla/lib-http/Url.js");
/* harmony import */ var _ocdla_lib_http_HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ocdla/lib-http/HttpClient */ "./node_modules/@ocdla/lib-http/HttpClient.js");
/* harmony import */ var _ocdla_ors_src_OrsChapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ocdla/ors/src/OrsChapter */ "./node_modules/@ocdla/ors/src/OrsChapter.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



// import Outline from '@ocdla/ors/src/Outline';

var fetch_breadcrumbs_ors_viewer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(currentVolume, currentTitle, currentChapter, currentSection) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", [{
            href: '/statutes',
            label: 'ORS'
          }, {
            href: '/statutes/ors_volume_' + currentVolume,
            label: 'Vol. ' + currentVolume
          }, {
            href: '/statutes/ors_title_' + currentTitle,
            label: 'Title ' + currentTitle
          }, {
            href: '/statutes/ors_chapter_' + currentChapter,
            label: 'Chap. ' + currentChapter + '. Courts & Judicial Officers Generally'
          }, {
            href: '/statutes/ors_' + currentSection,
            label: '§ ' + currentSection
          }]);
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetch_breadcrumbs_ors_viewer(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var fetch_sidebar_left_ors_viewer = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(currentChapter) {
    var url, client, req, resp, msword, xml, jsonArray;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          url = new _ocdla_lib_http_Url__WEBPACK_IMPORTED_MODULE_0__["default"]('https://appdev.ocdla.org/books-online/index.php'); // url.buildQuery('chapter', '1');
          // url.buildQuery('chapter', '2');
          url.buildQuery('chapter', currentChapter.toString());
          client = new _ocdla_lib_http_HttpClient__WEBPACK_IMPORTED_MODULE_1__["default"]();
          req = new Request(url.toString());
          _context2.next = 6;
          return client.send(req);
        case 6:
          resp = _context2.sent;
          _context2.next = 9;
          return _ocdla_ors_src_OrsChapter__WEBPACK_IMPORTED_MODULE_2__["default"].fromResponse(resp);
        case 9:
          msword = _context2.sent;
          msword.chapterNum = currentChapter;
          xml = _ocdla_ors_src_OrsChapter__WEBPACK_IMPORTED_MODULE_2__["default"].toStructuredChapter(msword);
          jsonArray = xml.sectionTitles.map(function (label, section) {
            var chapterString = xml.chapterNum + '.' + section.toString().padStart(3, '0');
            return {
              active: section === currentChapter ? true : undefined,
              // href: '/statutes/ors_' + chapterString,
              // href: `?chapter={chapterNum}#section-{sectionNum}`,
              // href: '#section-' + section,
              href: '?chapter=' + xml.chapterNum + '#section-' + section,
              heading: chapterString,
              label: label
            };
          });
          return _context2.abrupt("return", jsonArray);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function fetch_sidebar_left_ors_viewer(_x5) {
    return _ref2.apply(this, arguments);
  };
}();
var fetch_sidebar_left_books_online = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(currentChapter) {
    var client, req, resp, xml, parser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // const url = new Url('https://pubs.ocdla.org');
          // const url = new Url('https://pubs.ocdla.org/index');
          // const url = new Url('https://pubs.ocdla.org/index.php');
          // const url = new Url('https://pubs.ocdla.org/fsm/1');
          // const url = new Url('../../data/xml/volumes.xml');
          // const req = new Request(url.toString());
          // const client = new HttpClient();
          // const resp = await client.send(req);
          // const xml = await resp.text();
          // const parser = new DOMParser();
          // return parser.parseFromString(xml, 'application/xml');
          // console.log(resp);
          client = new _ocdla_lib_http_HttpClient__WEBPACK_IMPORTED_MODULE_1__["default"]();
          req = new Request('../../data/xml/volumes.xml');
          _context3.next = 4;
          return client.send(req);
        case 4:
          resp = _context3.sent;
          _context3.next = 7;
          return resp.text();
        case 7:
          xml = _context3.sent;
          parser = new DOMParser();
          return _context3.abrupt("return", parser.parseFromString(xml, 'application/xml'));
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function fetch_sidebar_left_books_online(_x6) {
    return _ref3.apply(this, arguments);
  };
}();
var fetch_body_ors_viewer = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(currentChapter) {
    var url, client, req, resp, msword, xml;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          url = new _ocdla_lib_http_Url__WEBPACK_IMPORTED_MODULE_0__["default"]('https://appdev.ocdla.org/books-online/index.php'); // url.buildQuery('chapter', '1');
          // url.buildQuery('chapter', '2');
          url.buildQuery('chapter', currentChapter.toString());
          client = new _ocdla_lib_http_HttpClient__WEBPACK_IMPORTED_MODULE_1__["default"]();
          req = new Request(url.toString());
          _context4.next = 6;
          return client.send(req);
        case 6:
          resp = _context4.sent;
          _context4.next = 9;
          return _ocdla_ors_src_OrsChapter__WEBPACK_IMPORTED_MODULE_2__["default"].fromResponse(resp);
        case 9:
          msword = _context4.sent;
          msword.chapterNum = currentChapter;
          xml = _ocdla_ors_src_OrsChapter__WEBPACK_IMPORTED_MODULE_2__["default"].toStructuredChapter(msword);
          return _context4.abrupt("return", xml.toString());
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function fetch_body_ors_viewer(_x7) {
    return _ref4.apply(this, arguments);
  };
}();
var fetch_sidebar_right_ors_viewer = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(currentChapter) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", [
          // {
          //     href: '/',
          //     label: 'Current through early 2024'
          // },
          {
            href: 'https://oregonlegislature.gov/bills_laws/ors/ors' + currentChapter.toString().padStart(3, '0') + '.html',
            label: '§ ' + currentChapter + '.001’s source a oregon​.gov'
          }]);
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function fetch_sidebar_right_ors_viewer(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_input_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/input.css */ "./src/css/input.css");
/* harmony import */ var _ocdla_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ocdla/view */ "./node_modules/@ocdla/view/view.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/js/App.jsx");
/* harmony import */ var _functions_fetch_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functions/fetch_data */ "./src/js/functions/fetch_data.js");

/** @jsx vNode */
/* eslint-disable no-unused-vars */


/* eslint-enable */

var $body = document.querySelector('body');
var root = _ocdla_view__WEBPACK_IMPORTED_MODULE_1__.View.createRoot($body);
// Switch boolean data type to string data type later on perhaps
var currentAppType = false;
// Available Positions: '' (absolute / static) || 'pinned' (fixed / sticky)
var headerPinned = '';
var currentVolume = 1;
var currentTitle = 1;
// Use string to workaround to prevent Prettier rounding decimals for now.
var currentSection = parseFloat('1.001').toFixed(3);
// const currentSection = parseFloat('2.010').toFixed(3);
var currentChapter = parseInt(currentSection.split('.')[0]);
var items_breadcrumbs_ors_viewer = await (0,_functions_fetch_data__WEBPACK_IMPORTED_MODULE_3__.fetch_breadcrumbs_ors_viewer)(currentVolume, currentTitle, currentChapter, currentSection);
var items_sidebar_left_ors_viewer = await (0,_functions_fetch_data__WEBPACK_IMPORTED_MODULE_3__.fetch_sidebar_left_ors_viewer)(currentChapter);
var items_sidebar_left_books_online = await (0,_functions_fetch_data__WEBPACK_IMPORTED_MODULE_3__.fetch_sidebar_left_books_online)(currentChapter);
var html_body_ors_viewer = await (0,_functions_fetch_data__WEBPACK_IMPORTED_MODULE_3__.fetch_body_ors_viewer)(currentChapter);
var items_sidebar_right_ors_viewer = await (0,_functions_fetch_data__WEBPACK_IMPORTED_MODULE_3__.fetch_sidebar_right_ors_viewer)(currentChapter);
root.render((0,_ocdla_view__WEBPACK_IMPORTED_MODULE_1__.vNode)(_App__WEBPACK_IMPORTED_MODULE_2__["default"], {
  view: root,
  currentAppType: currentAppType,
  headerPinned: headerPinned,
  currentVolume: currentVolume,
  currentTitle: currentTitle,
  currentChapter: currentChapter,
  currentSection: currentSection,
  items_breadcrumbs_ors_viewer: items_breadcrumbs_ors_viewer,
  items_sidebar_left_ors_viewer: items_sidebar_left_ors_viewer,
  items_sidebar_left_books_online: items_sidebar_left_books_online,
  html_body_ors_viewer: html_body_ors_viewer,
  items_sidebar_right_ors_viewer: items_sidebar_right_ors_viewer
}));

// document.title = 'Test';
// document.getElementById('body').innerHTML = html_body_ors_viewer;
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

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
! tailwindcss v3.4.10 | MIT License | https://tailwindcss.com
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
  font-family: "Open Sans", Verdana, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
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
.static {
  position: static;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.sticky {
  position: sticky;
}
.left-\\[-1rem\\] {
  left: -1rem;
}
.right-0 {
  right: 0px;
}
.top-0 {
  top: 0px;
}
.top-\\[calc\\(100\\%\\+0\\.5rem\\)\\] {
  top: calc(100% + 0.5rem);
}
.z-10 {
  z-index: 10;
}
.m-0 {
  margin: 0px;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
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
.aspect-square {
  aspect-ratio: 1 / 1;
}
.size-8 {
  width: 2rem;
  height: 2rem;
}
.size-full {
  width: 100%;
  height: 100%;
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
.min-h-screen {
  min-height: 100vh;
}
.w-\\[34px\\] {
  width: 34px;
}
.w-full {
  width: 100%;
}
.w-max {
  width: -moz-max-content;
  width: max-content;
}
.-translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-x-\\[28\\.75\\%\\] {
  --tw-translate-x: 28.75%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-\\[100\\%\\] {
  --tw-translate-y: 100%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-rotate-90 {
  --tw-rotate: -90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.select-none {
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
}
.flex-row-reverse {
  flex-direction: row-reverse;
}
.flex-col {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.items-start {
  align-items: flex-start;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.gap-1 {
  gap: 0.25rem;
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
.text-wrap {
  text-wrap: wrap;
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
.border-0 {
  border-width: 0px;
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
.border-blue-600 {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
}
.border-neutral-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 229 229 / var(--tw-border-opacity));
}
.border-neutral-300 {
  --tw-border-opacity: 1;
  border-color: rgb(212 212 212 / var(--tw-border-opacity));
}
.border-transparent {
  border-color: transparent;
}
.border-b-inherit {
  border-bottom-color: inherit;
}
.border-b-transparent {
  border-bottom-color: transparent;
}
.border-l-blue-400 {
  --tw-border-opacity: 1;
  border-left-color: rgb(96 165 250 / var(--tw-border-opacity));
}
.border-l-yellow-400 {
  --tw-border-opacity: 1;
  border-left-color: rgb(250 204 21 / var(--tw-border-opacity));
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
.bg-neutral-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 250 250 / var(--tw-bg-opacity));
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
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
.p-4 {
  padding: 1rem;
}
.px-12 {
  padding-left: 3rem;
  padding-right: 3rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.pb-16 {
  padding-bottom: 4rem;
}
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.text-\\[0\\.625rem\\] {
  font-size: 0.625rem;
}
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.font-bold {
  font-weight: 700;
}
.font-thin {
  font-weight: 100;
}
.leading-\\[0\\.75rem\\] {
  line-height: 0.75rem;
}
.text-\\[\\#516490\\] {
  --tw-text-opacity: 1;
  color: rgb(81 100 144 / var(--tw-text-opacity));
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
.focus-within\\:opacity-\\[67\\.5\\%\\]:focus-within {
  opacity: 67.5%;
}
.hover\\:border-neutral-200:hover {
  --tw-border-opacity: 1;
  border-color: rgb(229 229 229 / var(--tw-border-opacity));
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
.focus\\:border-neutral-200:focus {
  --tw-border-opacity: 1;
  border-color: rgb(229 229 229 / var(--tw-border-opacity));
}
.group:hover .group-hover\\:border-neutral-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 229 229 / var(--tw-border-opacity));
}
.group:hover .group-hover\\:bg-transparent {
  background-color: transparent;
}
.group:hover .group-hover\\:text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}
.group:hover .group-hover\\:text-neutral-400 {
  --tw-text-opacity: 1;
  color: rgb(163 163 163 / var(--tw-text-opacity));
}
.group:hover .group-hover\\:opacity-\\[67\\.5\\%\\] {
  opacity: 67.5%;
}
.peer:focus-within ~ .peer-focus-within\\:flex {
  display: flex;
}
@media (min-width: 1024px) {

  .lg\\:left-0 {
    left: 0px;
  }

  .lg\\:left-1\\/2 {
    left: 50%;
  }

  .lg\\:col-span-4 {
    grid-column: span 4 / span 4;
  }

  .lg\\:col-start-2 {
    grid-column-start: 2;
  }

  .lg\\:mx-8 {
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .lg\\:me-auto {
    margin-inline-end: auto;
  }

  .lg\\:ms-auto {
    margin-inline-start: auto;
  }

  .lg\\:block {
    display: block;
  }

  .lg\\:grid {
    display: grid;
  }

  .lg\\:hidden {
    display: none;
  }

  .lg\\:size-max {
    width: -moz-max-content;
    width: max-content;
    height: -moz-max-content;
    height: max-content;
  }

  .lg\\:h-16 {
    height: 4rem;
  }

  .lg\\:h-32 {
    height: 8rem;
  }

  .lg\\:w-64 {
    width: 16rem;
  }

  .lg\\:translate-x-\\[-25\\%\\] {
    --tw-translate-x: -25%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .lg\\:translate-y-\\[200\\%\\] {
    --tw-translate-y: 200%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
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

  .lg\\:gap-16 {
    gap: 4rem;
  }

  .lg\\:gap-8 {
    gap: 2rem;
  }

  .lg\\:border {
    border-width: 1px;
  }

  .lg\\:border-x {
    border-left-width: 1px;
    border-right-width: 1px;
  }

  .lg\\:border-t-0 {
    border-top-width: 0px;
  }

  .lg\\:p-2 {
    padding: 0.5rem;
  }

  .lg\\:p-8 {
    padding: 2rem;
  }

  .lg\\:pb-32 {
    padding-bottom: 8rem;
  }
}
`, "",{"version":3,"sources":["webpack://./src/css/input.css"],"names":[],"mappings":"AAAA;;CAAc,CAAd;;;CAAc;;AAAd;;;EAAA,sBAAc,EAAd,MAAc;EAAd,eAAc,EAAd,MAAc;EAAd,mBAAc,EAAd,MAAc;EAAd,qBAAc,EAAd,MAAc;AAAA;;AAAd;;EAAA,gBAAc;AAAA;;AAAd;;;;;;;;CAAc;;AAAd;;EAAA,gBAAc,EAAd,MAAc;EAAd,8BAAc,EAAd,MAAc;EAAd,gBAAc,EAAd,MAAc;EAAd,cAAc;KAAd,WAAc,EAAd,MAAc;EAAd,qJAAc,EAAd,MAAc;EAAd,6BAAc,EAAd,MAAc;EAAd,+BAAc,EAAd,MAAc;EAAd,wCAAc,EAAd,MAAc;AAAA;;AAAd;;;CAAc;;AAAd;EAAA,SAAc,EAAd,MAAc;EAAd,oBAAc,EAAd,MAAc;AAAA;;AAAd;;;;CAAc;;AAAd;EAAA,SAAc,EAAd,MAAc;EAAd,cAAc,EAAd,MAAc;EAAd,qBAAc,EAAd,MAAc;AAAA;;AAAd;;CAAc;;AAAd;EAAA,yCAAc;UAAd,iCAAc;AAAA;;AAAd;;CAAc;;AAAd;;;;;;EAAA,kBAAc;EAAd,oBAAc;AAAA;;AAAd;;CAAc;;AAAd;EAAA,cAAc;EAAd,wBAAc;AAAA;;AAAd;;CAAc;;AAAd;;EAAA,mBAAc;AAAA;;AAAd;;;;;CAAc;;AAAd;;;;EAAA,+GAAc,EAAd,MAAc;EAAd,6BAAc,EAAd,MAAc;EAAd,+BAAc,EAAd,MAAc;EAAd,cAAc,EAAd,MAAc;AAAA;;AAAd;;CAAc;;AAAd;EAAA,cAAc;AAAA;;AAAd;;CAAc;;AAAd;;EAAA,cAAc;EAAd,cAAc;EAAd,kBAAc;EAAd,wBAAc;AAAA;;AAAd;EAAA,eAAc;AAAA;;AAAd;EAAA,WAAc;AAAA;;AAAd;;;;CAAc;;AAAd;EAAA,cAAc,EAAd,MAAc;EAAd,qBAAc,EAAd,MAAc;EAAd,yBAAc,EAAd,MAAc;AAAA;;AAAd;;;;CAAc;;AAAd;;;;;EAAA,oBAAc,EAAd,MAAc;EAAd,8BAAc,EAAd,MAAc;EAAd,gCAAc,EAAd,MAAc;EAAd,eAAc,EAAd,MAAc;EAAd,oBAAc,EAAd,MAAc;EAAd,oBAAc,EAAd,MAAc;EAAd,uBAAc,EAAd,MAAc;EAAd,cAAc,EAAd,MAAc;EAAd,SAAc,EAAd,MAAc;EAAd,UAAc,EAAd,MAAc;AAAA;;AAAd;;CAAc;;AAAd;;EAAA,oBAAc;AAAA;;AAAd;;;CAAc;;AAAd;;;;EAAA,0BAAc,EAAd,MAAc;EAAd,6BAAc,EAAd,MAAc;EAAd,sBAAc,EAAd,MAAc;AAAA;;AAAd;;CAAc;;AAAd;EAAA,aAAc;AAAA;;AAAd;;CAAc;;AAAd;EAAA,gBAAc;AAAA;;AAAd;;CAAc;;AAAd;EAAA,wBAAc;AAAA;;AAAd;;CAAc;;AAAd;;EAAA,YAAc;AAAA;;AAAd;;;CAAc;;AAAd;EAAA,6BAAc,EAAd,MAAc;EAAd,oBAAc,EAAd,MAAc;AAAA;;AAAd;;CAAc;;AAAd;EAAA,wBAAc;AAAA;;AAAd;;;CAAc;;AAAd;EAAA,0BAAc,EAAd,MAAc;EAAd,aAAc,EAAd,MAAc;AAAA;;AAAd;;CAAc;;AAAd;EAAA,kBAAc;AAAA;;AAAd;;CAAc;;AAAd;;;;;;;;;;;;;EAAA,SAAc;AAAA;;AAAd;EAAA,SAAc;EAAd,UAAc;AAAA;;AAAd;EAAA,UAAc;AAAA;;AAAd;;;EAAA,gBAAc;EAAd,SAAc;EAAd,UAAc;AAAA;;AAAd;;CAAc;AAAd;EAAA,UAAc;AAAA;;AAAd;;CAAc;;AAAd;EAAA,gBAAc;AAAA;;AAAd;;;CAAc;;AAAd;EAAA,UAAc,EAAd,MAAc;EAAd,cAAc,EAAd,MAAc;AAAA;;AAAd;;EAAA,UAAc,EAAd,MAAc;EAAd,cAAc,EAAd,MAAc;AAAA;;AAAd;;CAAc;;AAAd;;EAAA,eAAc;AAAA;;AAAd;;CAAc;AAAd;EAAA,eAAc;AAAA;;AAAd;;;;CAAc;;AAAd;;;;;;;;EAAA,cAAc,EAAd,MAAc;EAAd,sBAAc,EAAd,MAAc;AAAA;;AAAd;;CAAc;;AAAd;;EAAA,eAAc;EAAd,YAAc;AAAA;;AAAd,wEAAc;AAAd;EAAA,aAAc;AAAA;;AAAd;EAAA,wBAAc;EAAd,wBAAc;EAAd,mBAAc;EAAd,mBAAc;EAAd,cAAc;EAAd,cAAc;EAAd,cAAc;EAAd,eAAc;EAAd,eAAc;EAAd,aAAc;EAAd,aAAc;EAAd,kBAAc;EAAd,sCAAc;EAAd,8BAAc;EAAd,6BAAc;EAAd,4BAAc;EAAd,eAAc;EAAd,oBAAc;EAAd,sBAAc;EAAd,uBAAc;EAAd,wBAAc;EAAd,kBAAc;EAAd,2BAAc;EAAd,4BAAc;EAAd,sCAAc;EAAd,kCAAc;EAAd,2BAAc;EAAd,sBAAc;EAAd,8BAAc;EAAd,YAAc;EAAd,kBAAc;EAAd,gBAAc;EAAd,iBAAc;EAAd,kBAAc;EAAd,cAAc;EAAd,gBAAc;EAAd,aAAc;EAAd,mBAAc;EAAd,qBAAc;EAAd,2BAAc;EAAd,yBAAc;EAAd,0BAAc;EAAd,2BAAc;EAAd,uBAAc;EAAd,wBAAc;EAAd,yBAAc;EAAd,sBAAc;EAAd,oBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd;AAAc;;AAAd;EAAA,wBAAc;EAAd,wBAAc;EAAd,mBAAc;EAAd,mBAAc;EAAd,cAAc;EAAd,cAAc;EAAd,cAAc;EAAd,eAAc;EAAd,eAAc;EAAd,aAAc;EAAd,aAAc;EAAd,kBAAc;EAAd,sCAAc;EAAd,8BAAc;EAAd,6BAAc;EAAd,4BAAc;EAAd,eAAc;EAAd,oBAAc;EAAd,sBAAc;EAAd,uBAAc;EAAd,wBAAc;EAAd,kBAAc;EAAd,2BAAc;EAAd,4BAAc;EAAd,sCAAc;EAAd,kCAAc;EAAd,2BAAc;EAAd,sBAAc;EAAd,8BAAc;EAAd,YAAc;EAAd,kBAAc;EAAd,gBAAc;EAAd,iBAAc;EAAd,kBAAc;EAAd,cAAc;EAAd,gBAAc;EAAd,aAAc;EAAd,mBAAc;EAAd,qBAAc;EAAd,2BAAc;EAAd,yBAAc;EAAd,0BAAc;EAAd,2BAAc;EAAd,uBAAc;EAAd,wBAAc;EAAd,yBAAc;EAAd,sBAAc;EAAd,oBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd;AAAc;AACd;EAAA;AAAoB;AAApB;;EAAA;IAAA;EAAoB;AAAA;AAApB;;EAAA;IAAA;EAAoB;AAAA;AAApB;;EAAA;IAAA;EAAoB;AAAA;AAApB;;EAAA;IAAA;EAAoB;AAAA;AAApB;;EAAA;IAAA;EAAoB;AAAA;AACpB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,iBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,WAAmB;EAAnB;AAAmB;AAAnB;EAAA,WAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,uBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,wBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,mBAAmB;EAAnB;AAAmB;AAAnB;EAAA,yBAAmB;KAAnB,sBAAmB;UAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,gCAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,sBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,4DAAmB;EAAnB,qEAAmB;EAAnB;AAAmB;AAAnB;EAAA,4DAAmB;EAAnB,qEAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA,mBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,mBAAmB;EAAnB;AAAmB;AAAnB;EAAA,kBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,eAAmB;EAAnB;AAAmB;AAAnB;EAAA,mBAAmB;EAAnB;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,oBAAmB;EAAnB;AAAmB;AAAnB;EAAA,mCAAmB;EAAnB;AAAmB;AAAnB;EAAA,0EAAmB;EAAnB,8FAAmB;EAAnB;AAAmB;AAAnB;EAAA,0BAAmB;EAAnB;AAAmB;AAAnB;EAAA,4BAAmB;EAAnB;AAAmB;AAAnB;EAAA,0BAAmB;EAAnB;AAAmB;AAFnB;EAAA;AAGA;AAHA;EAAA,sBAGA;EAHA;AAGA;AAHA;EAAA,kBAGA;EAHA;AAGA;AAHA;EAAA,oBAGA;EAHA;AAGA;AAHA;EAAA,oBAGA;EAHA;AAGA;AAHA;EAAA;AAGA;AAHA;EAAA;AAGA;AAHA;EAAA;AAGA;AAHA;EAAA,sBAGA;EAHA;AAGA;AAHA;EAAA,sBAGA;EAHA;AAGA;AAHA;EAAA;AAGA;AAHA;EAAA,oBAGA;EAHA;AAGA;AAHA;EAAA,oBAGA;EAHA;AAGA;AAHA;EAAA;AAGA;AAHA;EAAA;AAGA;AAHA;;EAAA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA,iBAGA;IAHA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA,uBAGA;IAHA,kBAGA;IAHA,wBAGA;IAHA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA,sBAGA;IAHA;EAGA;;EAHA;IAAA,sBAGA;IAHA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA,sBAGA;IAHA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;;EAHA;IAAA;EAGA;AAAA","sourcesContent":["@tailwind base;\n@tailwind components;\n@tailwind utilities;\n"],"sourceRoot":""}]);
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

/***/ "./node_modules/@ocdla/global-components/src/icons/facebook.png":
/*!**********************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/icons/facebook.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/facebook.png";

/***/ }),

/***/ "./node_modules/@ocdla/global-components/src/icons/twitter.png":
/*!*********************************************************************!*\
  !*** ./node_modules/@ocdla/global-components/src/icons/twitter.png ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/twitter.png";

/***/ }),

/***/ "./node_modules/@ocdla/ors/src/OrsChapter.js":
/*!***************************************************!*\
  !*** ./node_modules/@ocdla/ors/src/OrsChapter.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrsChapter)
/* harmony export */ });
/* harmony import */ var _Outline_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Outline.js */ "./node_modules/@ocdla/ors/src/Outline.js");


const gSubRe = /^\(([0-9a-zA-Z]+)\)(.*)/gm;
const subRe = /^\(([0-9a-zA-Z]+)\)(.*)/;

// Fetches the contents of the original ORS chapter from the Oregon Legislature web site.
// Transforms it in to a well-formed HTML document.
class OrsChapter {
    // The chapter number.
    chapterNum = null;

    // Title of this chapter - must be a string.
    title;

    // The chapter's underlying XML document.
    doc = null;

    // Parsed title of each section of this chapter.
    sectionTitles = {};

    // Contains references to DOM node <b> elements.
    // Might be unused.
    sectionHeadings = {};

    constructor(chapterNum) {
        this.chapterNum = chapterNum;
        this.doc = new Document();
    }

    // Convert one unstructured chapter into a structured chapter.
    // Use the anchors in the unstructured chapter to build a structured chapter
    // where each section and subsection(s) are grouped and wrapped in the appropriate node hierarchy.
    static toStructuredChapter(chapter) {
        let ch = new OrsChapter(chapter.chapterNum);
        let doc = ch.doc;
        ch.chapterTitle = chapter.chapterTitle;
        ch.sectionTitles = chapter.sectionTitles;

        let wordSection = doc.createElement('div');
        wordSection.setAttribute('class', 'WordSection1');

        for (var prop in chapter.sectionTitles) {
            // Create a new section element.
            const section = doc.createElement('div');
            section.setAttribute('id', 'section-' + prop);

            // console.log(prop);
            let startId = 'section-' + parseInt(prop);
            let endId = chapter.getNextSectionId(startId);
            let clonedSection = chapter.cloneFromIds(startId, endId);
            let [header, matches] = chapter.retrievePTags(clonedSection);

            // If matches are returned as just a string which means no subsections exist for that section then you just build the element with the text that is stored in matches and append it to the section
            if (typeof matches == 'string') {
                let element = _Outline_js__WEBPACK_IMPORTED_MODULE_0__["default"].buildSection(
                    doc,
                    'description',
                    'section-' + prop + '-description',
                    matches,
                    0
                );
                section.appendChild(element);
            } else {
                chapter.iterateMatches(matches, 0, section, prop);
            }
            wordSection.appendChild(section);
        }
        doc.appendChild(wordSection);

        return ch;
    }

    static fromResponse(resp, chapterNum) {
        return resp
            .arrayBuffer()
            .then(function (buffer) {
                const decoder = new TextDecoder('iso-8859-1');
                return decoder.decode(buffer);
            })
            .then(html => {
                const parser = new DOMParser();

                let chapter = new OrsChapter(chapterNum);
                // Tell the parser to look for html
                chapter.doc = parser.parseFromString(html, 'text/html');

                let [sectionTitles, sectionHeadings] =
                    _Outline_js__WEBPACK_IMPORTED_MODULE_0__["default"].retrieveSectionTitles(chapter.doc);
                chapter.sectionTitles = sectionTitles;
                chapter.sectionHeadings = sectionHeadings;
                chapter.injectAnchors();

                return chapter;
            });
    }

    // Inserts anchors as <div> tags in the doc.
    // Note: this affects the underlying structure
    //  of the XML document.
    injectAnchors() {
        for (var prop in this.sectionTitles) {
            let headingDiv = this.doc.createElement('div');
            headingDiv.setAttribute('id', 'section-' + prop);
            headingDiv.setAttribute('class', 'ocdla-heading');
            headingDiv.setAttribute('data-chapter', this.chapterNum);
            headingDiv.setAttribute('data-section', prop);

            let target = this.sectionHeadings[prop];
            target.parentNode.insertBefore(headingDiv, target);
        }
        var subset = this.doc.querySelector('.WordSection1');
        let headingDiv = this.doc.createElement('div');
        headingDiv.setAttribute('class', 'ocdla-heading');
        headingDiv.setAttribute('id', 'end');
        subset.appendChild(headingDiv);
    }

    /**
     *
     * @param {String} id
     * @returns DOMNode
     */
    getSection(id) {
        return this.doc.getElementById('section-' + id);
    }

    /**
     *
     * @param {String} id
     * @returns DOMNode
     */
    querySelectorAll(references) {
        let nodes = [];
        console.log('references length is: ', references);
        for (let i = 0; i < references.length; i++) {
            let reference = references[i];
            let chapter, section, subsection;
            let rangeStart, rangeEnd;
            [rangeStart, rangeEnd] = reference.split('-');
            console.log('Ranges', rangeStart, rangeEnd);
            [chapter, section, subsection] =
                OrsChapter.parseReference(rangeStart);
            console.log(chapter, section, subsection);
            let ids = subsection
                ? [parseInt(section), subsection].join('-')
                : parseInt(section);
            ids = '#section-' + ids;
            console.log(ids);
            let node = this.docTwo.querySelector(ids);
            if (null == node) return null;

            // If the selector specifies a range of subsections retrieve only those.
            if (rangeEnd) {
                console.log('RANGE DETECTED!');
                node = node.parentNode.cloneNode(true);
                node = OrsChapter.extractRange(node, rangeStart, rangeEnd);
            }

            nodes.push(node);
            console.log(nodes);
        }
        return nodes;
    }

    static extractRange(node, startRef, endRef) {
        console.log(node, startRef, endRef);
        // check node.children
        // match (1)(a)(A)(i) etc.

        let start = OrsChapter.parseSubsections(startRef);
        let end = OrsChapter.parseSubsections(endRef);
        let remove = [];
        let regEx, regStart, regEnd;

        regStart = start.pop();
        regEnd = end.pop();
        regEx = new RegExp('[' + regStart + '-' + regEnd + ']');

        let children = node.children;
        for (var i = 0; i < children.length; i++) {
            let child = children[i];
            let id = child.getAttribute('id');
            if (!id) continue;
            let parts = id.split('-');
            let compare = parts.pop();
            console.log('Comparing ', compare, regEx);
            if (!compare.match(regEx)) {
                console.log('match not found');
                remove.push(child);
            } else {
                console.log('match found');
            }
        }

        for (var n of remove) {
            node.removeChild(n);
        }

        return node;
    }

    static parseSubsections(reference) {
        let subs = reference.match(/(?<=\()([0-9a-zA-Z]+)(?=\))/g);

        console.log('parseSubsections()', subs);

        return subs;
    }

    static parseReference(reference) {
        let chapter, section, subsection;
        let parts = reference.match(/([0-9a-zA-Z]+)/g);
        chapter = parts.shift();
        section = parts.shift();

        // Parse a range of subsections.
        // Parse a comma-delimitted series of subsections.
        //this.references = reference.split(",");
        subsection = parts.length > 0 ? parts.join('-') : null;
        return [chapter, section, subsection];
    }

    // there are exceptions!!!
    // such as (5)(a).
    // it will find the 5, and put subsection level to 0.
    // HOWEVER, we are actually supposed to be on (a).
    // the level is supposed to be 1.
    // the next subsection in the list is (A).
    // this is ONLY EXPECTED when level is 1. Not when level is 0.
    // so it breaks. Hurray!

    retrievePTags(section) {
        let text = '';
        let pTags = section.children;

        let fn = function (match, p1, offset, original) {
            let duo = match.split(')(');
            return duo.join(')\n(');
        };

        let header = pTags[0].querySelector('b');
        header = pTags[0].removeChild(header);
        header = header.innerText;

        for (var index in pTags) {
            let child = pTags[index];
            let childText = '';

            if (child != null) {
                childText = child.innerText;
            }

            if (childText == null || childText == '') {
                continue;
            }

            childText = childText.trim().replaceAll('\n', ' ');
            text += childText + '\n';
        }

        let matches = text.replaceAll(
            /(^\([0-9a-zA-Z]+\)\([0-9a-zA-Z]+\))/gm,
            fn
        );

        matches = matches.match(gSubRe);

        return matches === null ? [header, text] : [header, matches];
    }

    iterateMatches(
        matches,
        currentIndex,
        parent,
        sectionNumber,
        lastLevel = '0'
    ) {
        //if we leave off at a roman numeral then

        //console.log(matches);
        // console.log(sectionNumber);
        if (sectionNumber == 555) {
            console.log(matches);
        }
        if (currentIndex >= matches.length) {
            return parent;
        }

        //for (var i = currentIndex; i < matches.length; i++) {
        // let match = fun(matches, currentIndex);
        let match = matches[currentIndex].match(subRe);
        let nextMatch = matches[currentIndex + 1];
        let id, divId, text, level;
        if (match == null) {
            // not a subsection
            // what do?
            // nothing. we shouldn't handle this case, this is either descriptive text or not..?
            // maybe handle for single section text like 701.002.
            id = 'description';
            text = matches[currentIndex];
            level = '0';
            return;
        } else {
            id = match[1];
            text = '(' + id + ')' + match[2];
            level = _Outline_js__WEBPACK_IMPORTED_MODULE_0__["default"].findLevel(id, nextMatch);
        }

        //console.log(match);
        // 0 should be full text?
        // 1 is id
        // 2 is text without subsection

        if (level > lastLevel) {
            parent = parent.lastChild;
        } else if (level < lastLevel) {
            if (lastLevel - level == 1) {
                parent = parent.parentNode;
            } else if (lastLevel - level == 2) {
                parent = parent.parentNode.parentNode;
            } else if (lastLevel - level == 3) {
                parent = parent.parentNode.parentNode.parentNode;
            }
        }
        if (parent == null) {
            console.warn('Parent is null');
            console.log(matches, sectionNumber);
            return;
        }
        divId = parent.getAttribute('id') + '-' + id;
        let element = _Outline_js__WEBPACK_IMPORTED_MODULE_0__["default"].buildSection(this.doc, id, divId, text, level);
        parent.appendChild(element);
        // identify subsections
        // build subsection grouping elements

        this.iterateMatches(
            matches,
            ++currentIndex,
            parent,
            sectionNumber,
            level
        );
    }

    removeNodes(selector) {
        let nodes = this.doc.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            node.parentNode.removeChild(node);
        }
    }

    buildToc() {
        let toc = [];

        for (let key in this.sectionTitles) {
            let val = this.sectionTitles[key];
            toc.push(
                `<li><span class="section-number">${this.chapterNum}.${key}</span><a data-action="view-section" data-section="${key}" href="#">${val}</a></li>`
            );
        }

        var joinedToc = toc.join(' ');
        return joinedToc;
    }

    // Highlights a selected section on the page
    highlight(section, endSection) {
        console.log(this.chapterNum);
        console.log(section);
        console.log(endSection);
        let range = this.doc.createRange();

        var firstNode = this.doc.getElementById(section);
        console.log(firstNode);
        var secondNode = this.doc.getElementById(endSection);
        console.log(secondNode);
        range.setStartBefore(firstNode);
        range.setEnd(
            secondNode.parentNode,
            secondNode.parentNode.childNodes.length
        );

        console.log(range);

        var newParent = this.doc.createElement('div');
        newParent.setAttribute('style', 'background-color:yellow;');

        var contents = range.extractContents();
        console.log(contents);
    }

    cloneFromIds(startId, endId) {
        var startNode = this.doc.getElementById(startId);
        if (null == startNode) {
            throw new Error('NODE_NOT_FOUND_ERROR: (#' + startId + ')');
        }
        var endNode = this.doc.getElementById(endId);
        if (null == startNode) {
            throw new Error('NODE_NOT_FOUND_ERROR: (#' + endId + ')');
        }

        return this.clone(startNode, endNode);
    }

    // Clones the contents inside a range.
    clone(startNode, endNode) {
        let range = document.createRange();

        range.setStartBefore(startNode);
        range.setEndBefore(endNode);

        var contents = range.cloneContents();

        var spans = contents.querySelectorAll('span');
        // remove styling from each span
        for (var elements in spans) {
            let element = spans[elements];
            if (element.style) {
                element.style = null;
            }
        }
        // console.log(contents);
        return contents;
    }

    // Given a valid section number,
    // returns the next section in this ORS chapter.
    // Used for building ranges.
    getNextSectionId(sectionNum) {
        var headings = this.doc.querySelectorAll('.ocdla-heading');
        var section = this.doc.getElementById(sectionNum);

        if (null == section) {
            throw new Error(
                'NODE_NOT_FOUND_ERROR: Could not locate ' + sectionNum
            );
        }
        for (let i = 0; i < headings.length; i++) {
            if (headings.item(i) == section) {
                let nextSection = headings.item(i + 1);
                return nextSection.getAttribute('id');
            }
        }
    }

    // Outputs the document as an HTML string
    toString() {
        const serializer = new XMLSerializer();
        const subset = this.doc.querySelector('.WordSection1');

        return serializer.serializeToString(subset);
    }
}


/***/ }),

/***/ "./node_modules/@ocdla/ors/src/Outline.js":
/*!************************************************!*\
  !*** ./node_modules/@ocdla/ors/src/Outline.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrsOutline)
/* harmony export */ });
/**
 * @class OrsOutline
 * @description This class is used to create an outline of the ORS chapter.
 */

class OrsOutline {
    /**
     * In an ORS chapter, the section titles are bolded.
     * This method retrieves the section titles and their corresponding section numbers.
     */
    static retrieveSectionTitles(doc) {
        // Createa nodeList of all the <b> elements in the body
        let headings = doc.querySelectorAll('b');
        let titles = [],
            elems = [];

        for (var i = 0; i < headings.length; i++) {
            let boldParent = headings[i];
            var trimmed = headings[i].textContent.trim();
            if (trimmed.indexOf('Note') === 0) continue;
            let strings = trimmed.split('\n');
            let chapter, section, key, val;

            // If array has only one element,
            // Then we know this doesn't follow the regular statute pattern.
            if (strings.length === 1) {
                key = strings[0];
                val = boldParent.nextSibling
                    ? boldParent.nextSibling.textContent
                    : '';
            } else {
                // otherwise our normal case.
                key = strings[0];
                val = strings[1];

                let numbers = key.split('.');
                chapter = numbers[0];
                section = numbers[1];
            }

            // Might need to change this one to remove parseInt
            titles[parseInt(section)] = val;
            elems[parseInt(section)] = boldParent;
        }

        return [titles, elems];
    }

    static findLevel(text, nextMatch) {
        let subNumRe = /^[0-9]+/;
        let subUpperRe = /^[A-Z]+/;
        let subRe = /^\(([0-9a-zA-Z]+)\)(.*)/;

        let nextId;

        if (nextMatch != null) {
            nextId = nextMatch.match(subRe)[1];
        }

        if (text.match(subNumRe)) {
            return '0';
        } else if (
            !OrsOutline.isRomanNumeral(text, nextId) &&
            !text.match(subUpperRe)
        ) {
            return '1';
        } else if (text.match(subUpperRe)) {
            return '2';
        } else if (OrsOutline.isRomanNumeral(text, nextId)) {
            return '3';
        }
    }

    static isRomanNumeral(text, nextText) {
        let romanReg = /^[ivx]+/;
        if (nextText == null) {
            return text.match(romanReg);
        }
        return (
            text.match(romanReg) &&
            (nextText.match(romanReg) || text.length > 1)
        );
    }

    static buildSection(doc, id, divId, text, level) {
        let sub = doc.createElement('div');
        sub.setAttribute('id', divId);
        sub.setAttribute('class', 'level-' + level);

        let span = doc.createElement('span');
        span.setAttribute('class', 'subsection');

        if (id !== 'description') {
            span.innerText = '(' + id + ')';
        }

        let theText = doc.createTextNode(text);

        sub.appendChild(span);
        sub.appendChild(theText);

        return sub;
    }
}


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





/***/ }),

/***/ "./src/data/json/books-online/breadcrumbs/items.json":
/*!***********************************************************!*\
  !*** ./src/data/json/books-online/breadcrumbs/items.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"href":"/","label":"Books Online"},{"href":"/","label":"Felony Sentencing in Oregon"}]');

/***/ }),

/***/ "./src/data/json/books-online/sidebar_left/items.json":
/*!************************************************************!*\
  !*** ./src/data/json/books-online/sidebar_left/items.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"href":"https://pubs.ocdla.org/fsm/foreword","heading":"Foreword","label":""},{"href":"https://pubs.ocdla.org/fsm/sentencing-outline","heading":"Sentencing Outline","label":""},{"href":"https://pubs.ocdla.org/fsm/1","heading":"Chapter 1","label":"Introduction"},{"href":"https://pubs.ocdla.org/fsm/2","heading":"Chapter 2","label":"Crime Seriousness Rankings"},{"href":"https://pubs.ocdla.org/fsm/3","heading":"Chapter 3","label":"Criminal History Scoring"},{"href":"https://pubs.ocdla.org/fsm/4","heading":"Chapter 4","label":"Prison Sentences and Post-Prison Supervision"},{"href":"https://pubs.ocdla.org/fsm/5","heading":"Chapter 5","label":"Probationary and Straight Jail Sentences"},{"href":"https://pubs.ocdla.org/fsm/6","heading":"Chapter 6","label":"Plea Agreements"},{"href":"https://pubs.ocdla.org/fsm/7","heading":"Chapter 7","label":"Departure Sentences"},{"href":"https://pubs.ocdla.org/fsm/8","heading":"Chapter 8","label":"Merger and Consecutive Sentences"},{"href":"https://pubs.ocdla.org/fsm/9","heading":"Chapter 9","label":"Appeals and Post-Sentencing/Resentencing Authority"},{"href":"https://pubs.ocdla.org/fsm/10","heading":"Chapter 10","label":"Sentencing Guidelines"}]');

/***/ }),

/***/ "./src/data/json/books-online/sidebar_right/items.json":
/*!*************************************************************!*\
  !*** ./src/data/json/books-online/sidebar_right/items.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"href":"/","label":"§ 1-1.1. Intent of Provision."},{"href":"/","label":"§ 1-1.2. Punishment and Public Safety."},{"href":"/","label":"§ 1-1.3. Presumptive Punishments."},{"href":"/","label":"§ 1-1.4. Basic Guidelines Principles."},{"href":"/","label":"§ 1-2.1. Intent of Provision."},{"href":"/","label":"§ 1-3.1. Guidelines Amendments."},{"href":"/","label":"June 2023 Update"},{"href":"/","label":"§ 1-3.2. OAR 213-001-0000 Notice Rule for Rulemaking."},{"href":"/","label":"§ 1-3.3. OAR 213-001-0005 Rulemaking Procedure."},{"href":"/","label":"§ 1-4.1 Intent of Provision."},{"href":"/","label":"§ 1-4.2. Date of Felony Uncertain."},{"href":"/","label":"§ 1-4.3. OAR 213-009-0002 Defendants Found Guilty Except for Insanity."},{"href":"/","label":"§ 1-4.4. Juvenile Defendants."},{"href":"/","label":"June 2023 Update"},{"href":"/","label":"§ 1-5.1. Intent of Provision."},{"href":"/","label":"§ 1-6.1. Effect of Guidelines’ Commentary and Staff Advisories."},{"href":"/","label":"§ 1-7.1. General Attacks."},{"href":"/","label":"§ 1-7.2. Specific Attacks—Jury Trial Rights."},{"href":"/","label":"June 2023 Update"},{"href":"/","label":"§ 1-7.3. Specific Attacks—Due Process."},{"href":"/","label":"June 2023 Update"},{"href":"/","label":"§ 1-7.4. Specific Attacks—Notice of Intent to Prove Enhancement Facts."},{"href":"/","label":"June 2023 Update"},{"href":"/","label":"§ 1-7.5. Specific Attacks—Right Against Self-Incrimination."},{"href":"/","label":"§ 1-7.6. Specific Attacks—Double Counting."},{"href":"/","label":"§ 1-7.7. Specific Attacks—Confrontation."},{"href":"/","label":"§ 1-7.8. Specific Attacks—Record of Prior Convictions."},{"href":"/","label":"June 2023 Update"},{"href":"/","label":"§ 1-7.9. Specific Attacks—Separate Criminal Episode Findings."},{"href":"/","label":"June 2023 Update"},{"href":"/","label":"§ 1-7.10. Ad Hoc Application of Sentencing Schemes."},{"href":"/","label":"§ 1-7.11. Specific Attacks—Speedy Trial."},{"href":"/","label":"§ 1-7.12. Specific Attacks—Special State Constitutional Provisions."},{"href":"/","label":"June 2023 Update"},{"href":"/","label":"June 2023 Update"},{"href":"/","label":"§ 1-8.1. Limitations on Money Judgments."},{"href":"/","label":"June 2023 Update"},{"href":"/","label":"June 2023 Update"}]');

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.bundle.js.map