const lkTableRows = document.querySelectorAll(".lk__table_row:not(.head)");

if (lkTableRows.length) {
  lkTableRows.forEach((el) => {
    let ckeckbox = el.querySelector(".table-row__select-checkbox");

    if (ckeckbox.checked) {
      el.classList.add("selected");
      isSelectedAllRows(el);
    } else {
      el.classList.remove("selected");
      isSelectedAllRows(el);
    }

    ckeckbox.addEventListener("change", function () {
      if (this.checked) {
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
