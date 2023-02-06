"use strict";

var lkSertifRows = document.querySelectorAll(".lk__sertif_row:not(.head)");
lkSertifRows.forEach(function (el) {
  var ckeckbox = el.querySelector("input");
  if (ckeckbox.checked) {
    el.classList.add("selected");
  } else {
    el.classList.remove("selected");
  }
  ckeckbox.addEventListener("change", function () {
    if (this.checked) {
      el.classList.add("selected");
    } else {
      el.classList.remove("selected");
    }
  });
});