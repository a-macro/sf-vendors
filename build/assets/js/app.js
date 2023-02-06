"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var openModal;
var closeModal;
document.addEventListener("DOMContentLoaded", function () {
  var height = window.innerHeight;
  var width = window.innerWidth;
  var header = document.querySelector(".header");
  document.documentElement.style.setProperty('--h', height + "px");
  document.documentElement.style.setProperty('--w', width + "px");
  document.documentElement.style.setProperty('--headerH', header.getBoundingClientRect().height + "px");

  //el.style.setProperty("--r", right + "px");
  //scrollLock.enablePageScroll(openedModal); отключить
  //scrollLock.disablePageScroll(mobMenu);

  var categories = document.querySelectorAll(".categories__block");
  if (categories.length > 0) {
    for (var i = 0; i < categories.length; i++) {
      if (i >= 6) {
        categories[i].classList.add("hide");
      }
    }
  }
  var topBtn = document.querySelectorAll(".btn-top");
  var velocity = .1;
  var pos = 0,
    topOffset = 0;
  var elemTop;
  var start;
  if (topBtn.length > 0) {
    topBtn.forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault();
        var winYOffset = window.pageYOffset,
          hash = "#top";
        elemTop = document.querySelector(hash).getBoundingClientRect().top - topOffset, start = null;
        requestAnimationFrame(step);
        function step(time) {
          if (start === null) start = time;
          var progress = time - start,
            r = elemTop < 0 ? Math.max(winYOffset - progress / velocity, winYOffset + elemTop) : Math.min(winYOffset + progress / velocity, winYOffset + elemTop);
          window.scrollTo(0, r);
          if (r != winYOffset + elemTop) {
            requestAnimationFrame(step);
          } else return;
        }
      };
    });
  }

  /*let showMore = document.querySelectorAll(".show-more");
  if(showMore.length > 0) {
      showMore.forEach(btn => {
          let parent = btn.closest("div");
          btn.onclick = (e) => {
              e.preventDefault();
              let hidden = parent.querySelectorAll(".hide");
              if(hidden.length > 0) {
                  hidden.forEach(elem => {
                      elem.classList.remove("hide");
                  });
              }
              btn.style.display = "none";
          }
      });
  }*/

  var selectorTitle = document.querySelectorAll(".selector__title");
  if (selectorTitle.length > 0) {
    selectorTitle.forEach(function (title) {
      title.onclick = function (e) {
        e.preventDefault();
        title.parentNode.classList.toggle("active");
        var panel = title.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      };
    });
  }
  var selectorItems = document.querySelectorAll(".selector__item");
  if (selectorItems.length > 0) {
    selectorItems.forEach(function (item) {
      var parent = item.closest(".selector");
      var block = item.parentNode;
      var title = parent.querySelector(".selector__title span");
      item.onclick = function (e) {
        e.preventDefault();
        if (item.classList.contains("active")) {
          block.style.maxHeight = null;
          parent.classList.remove("active");
        } else {
          var prev = parent.querySelector(".selector__item.active");
          if (prev) {
            prev.classList.remove("active");
          }
          item.classList.add("active");
          title.innerText = item.innerText;
          block.style.maxHeight = null;
          parent.classList.remove("active");
        }
      };
    });
  }
  var asideItems = document.querySelectorAll(".lk__aside_item");
  if (asideItems.length > 0) {
    asideItems.forEach(function (item) {
      item.onclick = function (e) {
        e.preventDefault();
        if (!item.classList.contains("active")) {
          var prev = document.querySelector(".lk__aside_item.active");
          if (prev) {
            prev.classList.remove("active");
          }
          item.classList.add("active");
        }
      };
    });
  }

  // SELECT
  var Select = /*#__PURE__*/function () {
    function Select(wrapper) {
      _classCallCheck(this, Select);
      this.wrapper = wrapper;
      this.input = this.wrapper.querySelector(".select-value");
      this.btn = this.wrapper.querySelector(".select-btn");
      this.btnValue = this.btn.querySelector(".select-btn__value");
      this.container = this.wrapper.querySelector(".select-container");
      this.isOpen = this.wrapper.getAttribute("data-open") !== null ? true : false;
      if (this.wrapper && this.input && this.btn && this.btnValue && this.container) {
        this.init();
      }
    }
    _createClass(Select, [{
      key: "init",
      value: function init() {
        var _this = this;
        this.btnValue.innerText = this.input.placeholder;
        this.btnValue.classList.add("_placeholder");
        this.maxHeight = this.container.offsetHeight * 2 / 10 + "rem";
        this.btn.addEventListener("click", this.handleClick.bind(this));
        _toConsumableArray(this.container.children).forEach(function (item) {
          item.addEventListener("click", _this.setValue.bind(_this, item));
        });
        this.isOpen ? this.open() : this.close();
        this.wrapper.addEventListener("click", function (e) {
          return e.stopPropagation();
        });
        document.addEventListener("click", this.close.bind(this));
      }
    }, {
      key: "handleClick",
      value: function handleClick() {
        this.isOpen ? this.close() : this.open();
      }
    }, {
      key: "open",
      value: function open() {
        this.wrapper.classList.add("_active");
        this.container.style.maxHeight = this.maxHeight;
        this.isOpen = true;
      }
    }, {
      key: "close",
      value: function close() {
        this.wrapper.classList.remove("_active");
        this.container.style.maxHeight = 0;
        this.isOpen = false;
      }
    }, {
      key: "setValue",
      value: function setValue(item) {
        var text = item.innerText;
        var value = item.getAttribute("data-value");
        this.input.value = value;
        this.btnValue.innerText = text;
        this.btnValue.classList.remove("_placeholder");
        this.close();
        _toConsumableArray(this.container.children).forEach(function (i) {
          i.classList.remove("_active");
        });
        item.classList.add("_active");
      }
    }]);
    return Select;
  }();
  var selects = document.querySelectorAll(".select");
  selects.forEach(function (item) {
    return new Select(item);
  });

  // CHECKBOX 
  var Checkbox = /*#__PURE__*/function () {
    function Checkbox(label) {
      _classCallCheck(this, Checkbox);
      this.label = label;
      this.input = label.querySelector("input");
      if (this.label && this.input) {
        this.init();
      }
    }
    _createClass(Checkbox, [{
      key: "init",
      value: function init() {
        this.label.addEventListener("click", this.handleClick.bind(this));
        this.input.checked && this.label.classList.add("_active");
      }
    }, {
      key: "handleClick",
      value: function handleClick() {
        if (this.input.checked) {
          this.label.classList.add("_active");
        } else this.label.classList.remove("_active");
      }
    }]);
    return Checkbox;
  }();
  var checkboxItems = document.querySelectorAll(".checkbox");
  checkboxItems.forEach(function (item) {
    return new Checkbox(item);
  });
});