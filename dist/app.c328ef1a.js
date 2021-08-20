// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"stylesheets/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../fonts/Josefin_Sans/static/JosefinSans-Regular.ttf":[["JosefinSans-Regular.2749132e.ttf","fonts/Josefin_Sans/static/JosefinSans-Regular.ttf"],"fonts/Josefin_Sans/static/JosefinSans-Regular.ttf"],"./../icomoon/fonts/icomoon.eot":[["icomoon.5a1ed617.eot","icomoon/fonts/icomoon.eot"],"icomoon/fonts/icomoon.eot"],"./../icomoon/fonts/icomoon.ttf":[["icomoon.0e5398f3.ttf","icomoon/fonts/icomoon.ttf"],"icomoon/fonts/icomoon.ttf"],"./../icomoon/fonts/icomoon.woff":[["icomoon.ca850f60.woff","icomoon/fonts/icomoon.woff"],"icomoon/fonts/icomoon.woff"],"./../icomoon/fonts/icomoon.svg":[["icomoon.e519d691.svg","icomoon/fonts/icomoon.svg"],"icomoon/fonts/icomoon.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"app.js":[function(require,module,exports) {
"use strict";

require("./stylesheets/style.scss");

var app = function () {
  var s;
  var app = {
    settings: {
      header: document.querySelector(".header"),
      navTab: document.querySelector(".header__nav"),
      scrollDown: document.getElementById("scrollDown"),
      contentTop: document.querySelector(".content"),
      navLine: document.querySelector(".navigation-line"),
      triggerMenu: document.getElementById("triggerMenu"),
      projectItems: document.querySelectorAll(".content__overlay"),
      year: document.getElementById("year"),
      form: document.getElementById('contactForm'),
      mobileBreakPoint: 768,
      scrollAboveIntro: false,
      scrollBelowIntro: false,
      previousScrollPosition: 0
    },
    init: function () {
      s = this.settings;
      s.year.innerHTML = new Date().getFullYear();
      this.bindUIActions();
    },
    closeProjectDetails: function () {
      document.querySelector(".project-details").classList.remove("is-active");
      document.querySelector(".overlay").classList.remove("is-active");
      document.querySelector(".content__overlay.is-active").classList.remove("is-active");
    },
    validateContactForm: function () {
      let inputName = document.getElementById("name"),
          inputEmail = document.getElementById("email"),
          inputMessage = document.getElementById("message"),
          validName = false,
          validEmail = false,
          validMessage = false;
      inputName.addEventListener("change", function (e) {
        if (e.keyCode !== 9 && e.keyCode !== 16) {
          validName = app.validInput(app.validName, inputName);
          app.handleSubmitButtonAccess(validName, validEmail, validMessage);
        }
      });
      inputEmail.addEventListener("change", function (e) {
        if (e.keyCode !== 9 && e.keyCode !== 16) {
          validEmail = app.validInput(app.validEmail, inputEmail);
          app.handleSubmitButtonAccess(validName, validEmail, validMessage);
        }
      });
      inputMessage.addEventListener("input", function (e) {
        if (e.keyCode !== 9 && e.keyCode !== 16) {
          validMessage = app.validMessage(inputMessage);
          app.handleSubmitButtonAccess(validName, validEmail, validMessage);
        }
      });
      s.form.addEventListener("submit", app.handleContactFormSubmission);
    },
    handleSubmitButtonAccess: function (validName, validEmail, validMessage) {
      if (validName && validEmail && validMessage) {
        document.getElementById("submitButton").removeAttribute("disabled");
      } else {
        document.getElementById("submitButton").setAttribute("disabled", "disabled");
      }
    },
    validInput: function (valid, input) {
      if (!valid(input.value)) {
        //this.displayErrorMark(input);
        return false;
      } else {//this.displaySuccessMark(input);
      }

      return true;
    },
    validName: function (name) {
      return name !== "";
    },
    validEmail: function (email) {
      return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email);
    },
    validMessage: function (message) {
      if (message.value !== "" && message.value.length >= 10 && message.value.length <= 400) {
        //message.removeClass('error').addClass('success');
        //message.next('.contact-form__error').addClass('hide');
        return true;
      } else {//message.removeClass('success').addClass('error');
        //message.next('.contact-form__error').removeClass('hide');
      }

      return false;
    },
    handleContactFormSubmission: async function (event) {
      event.preventDefault();
      var status = document.getElementById("formStatus");
      console.log(event.target);
      var data = new FormData(event.target);
      console.log(data);
      fetch(event.target.action, {
        method: s.form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        status.innerHTML = "Thanks for your submission!";
        s.form.reset();
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form.";
      });
    },
    openProject: function (element) {
      element.classList.add("is-active");
      document.querySelector(".project-details").classList.add("is-active");
      document.querySelector(".overlay").classList.add("is-active");
      document.querySelector(".project-details__text").innerHTML = element.nextSibling.nextSibling.innerHTML;
    },
    bindUIActions: function () {
      window.addEventListener("DOMContentLoaded", function () {
        document.body.classList.remove("preload");
      });
      window.addEventListener("scroll", function (e) {
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        s.navLine.style.width = winScroll / height * 100 + "%";

        if (this.window.scrollY < document.getElementById("scrollDown").offsetTop + document.getElementById("scrollDown").offsetHeight) {
          s.header.classList.add("hide");
        } else {
          s.header.classList.remove("hide");
        }

        let currentScrollPosition = this.window.scrollY + this.window.outerHeight;

        if (currentScrollPosition > s.previousScrollPosition && currentScrollPosition > document.getElementById('intro').offsetHeight && currentScrollPosition < document.querySelector('[data-content="work"]').offsetTop) {
          if (!s.scrollAboveIntro) {
            window.scrollTo({
              top: document.querySelector("[data-content='work']").offsetTop,
              behavior: "smooth"
            });
            s.scrollAboveIntro = true;
            s.scrollBelowIntro = false;
            console.log('scroll down');
          }
        } else if (currentScrollPosition < s.previousScrollPosition && this.window.scrollY < document.querySelector('[data-content="work"]').offsetTop && this.window.scrollY > document.getElementById('intro').offsetHeight) {
          if (!s.scrollBelowIntro) {
            window.scrollTo({
              top: document.querySelector("#intro"),
              behavior: "smooth"
            });
            s.scrollBelowIntro = true;
            s.scrollAboveIntro = false;
            console.log('scroll up');
          }
        }

        s.previousScrollPosition = currentScrollPosition;
      });
      s.scrollDown.addEventListener("click", function () {
        window.scrollTo({
          top: document.querySelector("[data-content='work']").offsetTop,
          behavior: "smooth"
        });
      });
      s.triggerMenu.addEventListener("click", function () {
        this.classList.toggle("is-active");
        s.navTab.classList.toggle("is-active");
      });
      let tabs = document.querySelectorAll(".navtab");

      for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function () {
          let dataTab = this.getAttribute("data-tab");
          let element = document.querySelector("[data-content='" + dataTab + "']");
          let offset = s.header.offsetHeight - s.navTab.offsetHeight;
          s.navTab.classList.remove("is-active");
          s.triggerMenu.classList.remove("is-active");
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          let offsetPosition = elementPosition - offset;

          if (window.innerWidth >= s.mobileBreakPoint) {
            offsetPosition = elementPosition;
          }

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        });
      }

      for (let i = 0; i < s.projectItems.length; i++) {
        s.projectItems[i].addEventListener("click", function () {
          app.openProject(this);
        });
        s.projectItems[i].addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            app.openProject(this);
          }
        });
      }

      document.getElementById("closeDetails").addEventListener("click", function () {
        app.closeProjectDetails();
      });
      document.addEventListener("keydown", function (e) {
        if (document.querySelector(".project-details").classList.contains("is-active") && e.key === "Escape") {
          app.closeProjectDetails();
        }
      });
      document.querySelector(".overlay").addEventListener("click", function () {
        app.closeProjectDetails();
      });
      app.validateContactForm();
    }
  };
  return app;
}();

app.init();
},{"./stylesheets/style.scss":"stylesheets/style.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37625" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map