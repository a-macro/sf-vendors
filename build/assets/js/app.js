"use strict";

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
});