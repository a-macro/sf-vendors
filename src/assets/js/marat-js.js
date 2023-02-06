const lkSertifRows = document.querySelectorAll(".lk__table_row:not(.head)");

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
