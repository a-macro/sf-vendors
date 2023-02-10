const lkTableRows = document.querySelectorAll(".lk__table_row:not(.head)");

if (lkTableRows.length) {
  lkTableRows.forEach((el) => {
    let ckeckbox = el.querySelector(".table-row__select-checkbox");

    if (!ckeckbox) return;

    if (ckeckbox.checked) {
      el.classList.add("selected");
      isSelectedAllRows(el);
    } else {
      el.classList.remove("selected");
      isSelectedAllRows(el);
    }

    ckeckbox.addEventListener("change", function () {
      if (ckeckbox.checked) {
        el.classList.add("selected");
        isSelectedAllRows(el);
      } else {
        el.classList.remove("selected");
        isSelectedAllRows(el);
      }
    });
  });
}

const tableAllCheckbox = document.querySelector(".table-num_all");

if (tableAllCheckbox) {
  tableAllCheckbox.addEventListener("change", () => {
    if (tableAllCheckbox.checked) {
      lkTableRows.forEach((el) => {
        el.querySelector(".table-row__select-checkbox").checked = true;
      });
    } else {
      lkTableRows.forEach((el) => {
        el.querySelector(".table-row__select-checkbox").checked = false;
      });
    }
  });
}

function isSelectedAllRows(row) {
  let flag = true;

  if (!row.parentElement.querySelector(".table-num_all")) return;

  lkTableRows.forEach((el) => {
    if (!el.querySelector(".table-row__select-checkbox").checked) {
      flag = false;
    }
  });

  if (flag) {
    row.parentElement.querySelector(".table-num_all").checked = true;
  } else {
    row.parentElement.querySelector(".table-num_all").checked = false;
  }
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
      if (input.checked) {
        label.innerText = "Включить";
        fields.classList.add("disabled");
      } else {
        label.innerText = "Выключить";
        fields.classList.remove("disabled");
      }
    });
  });
}

const passwordControls = document.querySelectorAll(".password-control");

if (passwordControls.length) {
  passwordControls.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      let input = el.parentElement.querySelector(".password-input");

      if (input.getAttribute("type") == "password") {
        el.classList.add("view");
        input.setAttribute("type", "text");
      } else {
        el.classList.remove("view");
        input.setAttribute("type", "password");
      }
      return false;
    });
  });
}
