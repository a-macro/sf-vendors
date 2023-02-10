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

// dropzone

let attachmentInput = document.querySelector("#files-attachment");
let attachmentArea = document.querySelector("#attachment-area");
let attachmentAreaContent = document.querySelector(".attachment-area__content");
let attachmentLabel = document.querySelector(".files-attachment__label");
let attachmentCount = document.querySelector(".attachment-count");

if (attachmentInput) {
  let highlight = function highlight(e) {
    attachmentArea.classList.add("highlight");
  };

  let unhighlight = function unhighlight(e) {
    attachmentArea.classList.remove("highlight");
  };

  let preventDefaults = function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  let handleDrop = function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    attachmentInput.files = files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      createAddAttachment(file);
    }

    for (let file of attachmentInput.files) {
      dto.items.add(file);
    }

    attachmentInput.files = dto.files;

    console.log(dto.files);

    deleteAttachment();
    toogleAreaContent();
  };

  let toogleAreaContent = function toogleAreaContent() {
    if (attachmentInput.files.length > 0) {
      attachmentAreaContent.style.display = "none";
      attachmentLabel.style.display = "block";
    } else {
      attachmentAreaContent.style.display = "block";
      attachmentLabel.style.display = "none";
    }
  };

  let createAddAttachment = function createAddAttachment(file) {
    let fileBlock = document.createElement("div");
    fileBlock.classList.add("attachment-item");
    let fileName = document.createElement("p");
    fileName.classList.add("attachment-item__name");
    fileName.file = file;
    fileName.setAttribute("name", file.name);
    fileName.innerText = file.name;
    fileBlock.appendChild(fileName);

    fileBlock.insertAdjacentHTML(
      "afterbegin",
      '<span class="attachment-delete">&times;</span>'
    );
    document.querySelector(".attachment-area__content-list").append(fileBlock);
  };

  let deleteAttachment = function deleteAttachment() {
    document.querySelectorAll("span.attachment-delete").forEach(function (el) {
      el.addEventListener("click", function (e) {
        let nameFile = el.nextElementSibling.getAttribute("name");

        if (el.parentElement !== null) {
          el.parentElement.remove();
        }

        for (let i = 0; i < dto.items.length; i++) {
          if (nameFile === dto.items[i].getAsFile().name) {
            dto.items.remove(i);
            continue;
          }
        }

        document.querySelector("#files-attachment").files = dto.files;
        toogleAreaContent();
      });
    });
  };

  ["dragenter", "dragover", "dragleave", "drop"].forEach(function (eventName) {
    attachmentArea.addEventListener(eventName, preventDefaults, false);
  });
  ["dragenter", "dragover"].forEach(function (eventName) {
    attachmentArea.addEventListener(eventName, highlight, false);
  });
  ["dragleave", "drop"].forEach(function (eventName) {
    attachmentArea.addEventListener(eventName, unhighlight, false);
  });

  let dto = new DataTransfer();

  attachmentArea.addEventListener("drop", handleDrop, false);
  attachmentInput.addEventListener("change", function (e) {
    for (let i = 0; i < attachmentInput.files.length; i++) {
      let file = attachmentInput.files[i];

      createAddAttachment(file);
    }

    for (let file of attachmentInput.files) {
      dto.items.add(file);
    }

    attachmentInput.files = dto.files;
    deleteAttachment();
    toogleAreaContent();
  });
}
