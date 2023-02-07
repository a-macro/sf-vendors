const lkSertifRows = document.querySelectorAll(".lk__table_row:not(.head)");

if (lkSertifRows.length) {
  lkSertifRows.forEach((el) => {
    let ckeckbox = el.querySelector("input");

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
}

const enableDateBtns = document.querySelectorAll(".enable-date");

if (enableDateBtns.length) {
  enableDateBtns.forEach((el) => {
    let input = el.querySelector("input");
    let label = el.querySelector("label");
    let fields = el.parentElement.querySelector(".lkset-item__fields");

    if (el.checked) {
      fields.classList.add("disabled");
    } else {
      fields.classList.remove("disabled");
    }

    input.addEventListener("change", function () {
      if (this.checked) {
        label.innerText = "Включить";
        fields.classList.add("disabled");
      } else {
        label.innerText = "Выключить";
        fields.classList.remove("disabled");
      }
    });
  });
}
