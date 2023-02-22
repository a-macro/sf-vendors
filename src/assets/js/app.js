let openModal;
let closeModal;

document.addEventListener("DOMContentLoaded", () => {
  //= marat-js.js

  let height = window.innerHeight;
  let width = window.innerWidth;
  let header = document.querySelector(".header");
  document.documentElement.style.setProperty('--h', height + "px");
  document.documentElement.style.setProperty('--w', width + "px");
  document.documentElement.style.setProperty('--headerH', header.getBoundingClientRect().height + "px");

  let categories = document.querySelectorAll(".categories__block");
  if (categories.length > 0) {
    for (let i = 0; i < categories.length; i++) {
      if (i >= 6) {
        categories[i].classList.add("hide");
      }
    }
  }

  let topBtn = document.querySelectorAll(".btn-top");
  let velocity = .1;
  let pos = 0,
    topOffset = 0;
  let elemTop;
  let start;
  if (topBtn.length > 0) {
    topBtn.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        let winYOffset = window.pageYOffset,
          hash = "#top";
        elemTop = document.querySelector(hash).getBoundingClientRect().top - topOffset,
          start = null;
        requestAnimationFrame(step);
        function step(time) {
          if (start === null) start = time;
          let progress = time - start,
            r =
              elemTop < 0
                ? Math.max(
                  winYOffset - progress / velocity,
                  winYOffset + elemTop
                )
                : Math.min(
                  winYOffset + progress / velocity,
                  winYOffset + elemTop
                );
          window.scrollTo(0, r);
          if (r != winYOffset + elemTop) {
            requestAnimationFrame(step)
          } else return;
        }
      }
    });
  }

  let selectorTitle = document.querySelectorAll(".selector__title");
  if (selectorTitle.length > 0) {
    selectorTitle.forEach(title => {
      title.onclick = (e) => {
        e.preventDefault();
        title.parentNode.classList.toggle("active");
        let panel = title.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    });
  }

  let selectorItems = document.querySelectorAll(".selector__item");
  if (selectorItems.length > 0) {
    selectorItems.forEach(item => {
      let parent = item.closest(".selector");
      let block = item.parentNode;
      let title = parent.querySelector(".selector__title span");
      item.onclick = (e) => {
        e.preventDefault();
        if (item.classList.contains("active")) {
          block.style.maxHeight = null;
          parent.classList.remove("active");
        } else {
          let prev = parent.querySelector(".selector__item.active");
          if (prev) {
            prev.classList.remove("active");
          }
          item.classList.add("active");
          title.innerText = item.innerText;
          block.style.maxHeight = null;
          parent.classList.remove("active");
        }
      }
    });
  }

  let asideItems = document.querySelectorAll(".lk__aside_item");
  if (asideItems.length > 0) {
    asideItems.forEach(item => {
      item.onclick = (e) => {
        e.preventDefault();
        if (!item.classList.contains("active")) {
          let prev = document.querySelector(".lk__aside_item.active");
          if (prev) {
            prev.classList.remove("active");
          }
          item.classList.add("active");
        }
      }
    });
  }

  let introBlocks = document.querySelectorAll(".intro__changeable_block");
  if (introBlocks.length > 0) {
    let parent = document.querySelector(".intro__changeable_blocks");
    parent.setAttribute("data-num", introBlocks.length);
  }

  let sphereCont = document.querySelectorAll(".spheres__container");
  if(sphereCont.length > 0) {
      sphereCont.forEach(slider => {
        let prev = slider.querySelector(".swiper-button-prev");
        let next = slider.querySelector(".swiper-button-next");
        let sliderSw = new Swiper(slider, {
            navigation: {
                nextEl: next,
                prevEl: prev
            },
            slidesPerView: 3,
            pagination: {
              el: ".swiper-pagination",
              type: "progressbar"
            },
            watchOverflow: true,
            spaceBetween: 40,
            freeMode: "false",
            loop: false,
        });

        let pag = slider.querySelector(".slider__pag");
        let slides = sliderSw.slides.length;
        pag.innerText = 1 + "/" + slides;
        sliderSw.on('slideChange', function () {
          let curSlide = ++sliderSw.realIndex;
          pag.innerHTML = curSlide + "/" + slides;
        });
      });
  }

  let qualityCont = document.querySelectorAll(".quality__container");
  if(qualityCont.length > 0) {
    qualityCont.forEach(slider => {
        let prev = slider.querySelector(".swiper-button-prev");
        let next = slider.querySelector(".swiper-button-next");
        let sliderSw = new Swiper(slider, {
            navigation: {
                nextEl: next,
                prevEl: prev
            },
            slidesPerView: 2,
            pagination: {
              el: ".swiper-pagination",
              type: "progressbar"
            },
            watchOverflow: true,
            spaceBetween: 40,
            freeMode: "false",
            loop: false,
        });

        let pag = slider.querySelector(".slider__pag");
        let slides = sliderSw.slides.length;
        pag.innerText = 1 + "/" + slides;
        sliderSw.on('slideChange', function () {
          let curSlide = ++sliderSw.realIndex;
          pag.innerHTML = curSlide + "/" + slides;
        });
    });
  }

  let filtersBtn = document.querySelector(".lk__main_show-filters");
  if(filtersBtn) {
    openList(filtersBtn);
  }

  function openList(btn) {
    btn.onclick = (e) => {
      e.preventDefault();
      btn.classList.toggle("active");
      let block = btn.nextElementSibling;
      if (block.style.maxHeight) {
        block.style.maxHeight = null;
      } else {
        block.style.maxHeight = block.scrollHeight + "px";
      }
    }
  }

  let observerV = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        let el = entry.target;
        if(el.classList.contains("end")) {
            return;
        }
        let attr = +el.getAttribute("data-num");
        if(entry.isIntersecting) {
            let i = 1,
            num = attr,
            step = 2500 / num,
        
            int = setInterval(function() {
              if (i <= num) {
                el.innerHTML = `${i}`;
              } else {
                el.innerHTML = num;
                clearInterval(int);
                el.classList.add("end");
              }
              i+=5;
            }, step);
        }
    });
}, {threshold: 1.0});

let changeNums = document.querySelectorAll(".rising-num__num");
if(changeNums && changeNums.length > 0) {
    changeNums.forEach(element => {
        observerV.observe(element);
    });
}

  let getCalendar = document.querySelectorAll(".get-calendar");
  if(getCalendar.length > 0) {
    let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    let date = new Date();
    let currentDay = date.getDate();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let userMonth = date.getMonth();
    let year = date.getFullYear();
    new ToCount(userMonth, year);

    function ToCount(userMonth, year) {
        this.month = userMonth;
        this.year = year;
        
        let wrapper = document.createElement("div");
    
        var date = "";
        date = new Date(this.year, this.month);
        var monthName = months[userMonth];
    
        var prevMonth = new Date(this.year, this.month);
        prevMonth.setDate(prevMonth.getDate() - 1);
        var lastPrevDate = prevMonth.getDate();         //посл. день предыд. мес.
        var lastPrevDay = weekDay(prevMonth);
        var firtWeekDay = lastPrevDate - lastPrevDay;
    
    
    
    var table = `<table>
            <tr>
            <th>
                <a class = "prev-year" title = "${monthName} прошлого года">
                <span class = "rect-left pr-year">	&#171;</span>
                </a>
            </th>

            <th>
                <a class = "prev-month" title = "предыдущий месяц">
                <span class = "rect-left pr-mon">&#8249;</span>
                </a>
            </th>
    
            <th colspan="3" class="month" data-month="${monthName}">
                ${monthName}&nbsp;${year}
            </th>
    
            <th>
                <a class = "next-month" title = "следующий месяц">
                <span class = "rect-right n-mon"> &#8250;</span>
                </a>
            </th>

            <th>
                <a class = "next-year" title = "${monthName} следующего года">
                <span class = "rect-right n-year">&#187;</span>
                </a>
            </th>

    
            </tr>
            <tr>
            <td>пн</td>
            <td>вт</td>
            <td>ср</td>
            <td>чт</td>
            <td>пт</td>
            <td>сб</td>
            <td>вс</td>
            </tr>
            <tr>`;
    
    for (let i = 0; i < weekDay(date); i++) {
        table += `<td class = 'prev_month' data-month="${date.getMonth()}" data-year="${date.getFullYear()}">` + firtWeekDay + "</td>";
        firtWeekDay++;
        }
        while (date.getMonth() == this.month) {
            if ( weekDay(date) % 7 !== 5 && weekDay(date) % 7 !== 6 ) { 
                if(date.getDate() === currentDay && date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                    table += `<td class = "current" data-month="${date.getMonth()}" data-year="${date.getFullYear()}">` + date.getDate() + '</td>';
                } else {
                    table += `<td data-month="${date.getMonth()}" data-year="${date.getFullYear()}">` + date.getDate() + '</td>';
                }
            } else if (weekDay(date) % 7 == 5) { 
                if(date.getDate() === currentDay && date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                    table += `<td class = "current weekend" data-month="${date.getMonth()}" data-year="${date.getFullYear()}">` + date.getDate() + '</td>';
                } else {
                    table += `<td class = "weekend" data-month="${date.getMonth()}" data-year="${date.getFullYear()}">` + date.getDate() + '</td>';
                }
            } else if (weekDay(date) % 7 == 6) { 
                if(date.getDate() === currentDay && date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                    table += `<td class = "current weekend" data-month="${date.getMonth()}" data-year="${date.getFullYear()}">` + date.getDate() + '</td></tr><tr>';
                } else {
                    table += `<td class = "weekend" data-month="${date.getMonth()}" data-year="${date.getFullYear()}">` + date.getDate() + '</td></tr><tr>';
                }
            }
            date.setDate(date.getDate() + 1);
        }
    
        var num = 1;
        if (weekDay(date) != 0) {
        for (let i = weekDay(date); i < 7; i++) {
            table += `<td class = "next_month" data-month="${date.getMonth()}" data-year="${date.getFullYear()}">` + num + "</td>";
            num++;
        }
        }
    
        table += '</tr></table>';
        function weekDay(date) { 
        let day = date.getDay();
        if (day == 0) day = 7; 
            return day - 1;
        }
    
        wrapper.innerHTML = table;
        wrapper.id = "calendar-table";
        wrapper.className = "calendar-table";
        let parent = document.querySelector(".lk-settings__wrap");
        if(!parent) {
          parent = document.querySelector(".lk__main_wrapper");
        }
        parent.appendChild(wrapper);
    
        wrapper.addEventListener("click", function(e) {
            let node = e.target.outerHTML;
            if( node.includes("prev-month") || node.includes("pr-mon")) {
                previousMonth();    
            } else if( node.includes("prev-year") || node.includes("pr-year")) {
                previousYear();    
            } else if( node.includes("next-month") || node.includes("n-mon")) {
                nextMonth();    
            } else if( node.includes("next-year") || node.includes("n-year")) {
                nextYear();    
            } else if(e.target.getAttribute("data-month")) {
                let dateText = +e.target.innerText;
                let monthNode = +e.target.getAttribute("data-month");
                let yaerNode = +e.target.getAttribute("data-year");

                if(e.target.classList.contains("prev_month")) {
                    return;
                }

                if(currentYear > year) {
                    return;
                }

                if(currentYear >= year && currentMonth > monthNode) {
                    return;
                }

                if(currentYear >= year && currentMonth ===  monthNode && currentDay > +e.target.innerText) {
                    return;
                }


                //dateText = dateText + " " + monthsCommon[monthNode];
                let parent = document.querySelector(".lk-settings__wrap");
                if(!parent) {
                  parent = document.querySelector(".lk__main_wrapper");
                }        
                let clickableParent = document.querySelector(".active-calendar");
                let parentDate = clickableParent.querySelector(".date-select");
                let inpDate = parentDate.querySelector(".select-value");
                let btnDate = parentDate.querySelector(".select-btn__value");
                let parentMonth = clickableParent.querySelector(".month-select");
                let inpMonth = parentMonth.querySelector(".select-value");
                let btnMonth = parentMonth.querySelector(".select-btn__value");
                let parentYear = clickableParent.querySelector(".year-select");
                let inpYear = parentYear.querySelector(".select-value");
                let btnYear = parentYear.querySelector(".select-btn__value");

                inpDate.value = dateText;
                btnDate.innerText = dateText;

                inpMonth.value = months[monthNode];
                btnMonth.innerText = months[monthNode];

                inpYear.value = yaerNode;
                btnYear.innerText = yaerNode;


                let calendar = document.querySelector("#calendar-table");
                calendar.classList.remove("show");
                setTimeout(() => {
                    calendar.style.display = "none";
                    parent.classList.remove("calendar-show");
                    clickableParent.classList.remove("active-calendar");
                }, 200);
            }
        });
    }


    function previousMonth() {
    
      let tab = document.getElementsByTagName("table")[0]; 
      let parent = tab.closest("div");
      parent.remove();
      tab.remove();
      if(userMonth == 0) {
          userMonth = 11;
          year--;
      } else {
          userMonth = userMonth - 1;
      }         
      new ToCount(userMonth, year);
      let calendar = document.querySelector("#calendar-table");
      calendar.style.display = "flex";
      setTimeout(() => {
          calendar.classList.add("show");
      }, 10);
    }

    function nextMonth() {
      let tab = document.getElementsByTagName("table")[0]; 
      let parent = tab.closest("div");
      parent.remove();
      tab.remove();
      
      if(userMonth == 11) {
          userMonth = 0;
          year++;
      } else {
          userMonth++;
      }  
      
      new ToCount(userMonth, year);
      let calendar = document.querySelector("#calendar-table");
      calendar.style.display = "flex";
      setTimeout(() => {
          calendar.classList.add("show");
      }, 10);
    }

    function previousYear() {
      let tab = document.getElementsByTagName("table")[0]; 
      let parent = tab.closest("div");
      parent.remove();
      tab.remove();
      
      year--;
      new ToCount(userMonth, year);
      let calendar = document.querySelector("#calendar-table");
      calendar.style.display = "flex";
      setTimeout(() => {
          calendar.classList.add("show");
      }, 10);
    }

    function nextYear() {
      let tab = document.getElementsByTagName("table")[0]; 
      let parent = tab.closest("div");
      parent.remove();
      tab.remove();
      
      year++;
      new ToCount(userMonth, year);
      let calendar = document.querySelector("#calendar-table");
      calendar.style.display = "flex";
      setTimeout(() => {
          calendar.classList.add("show");
      }, 10);
    }
    getCalendar.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        let calendar = document.querySelector("#calendar-table");
        if(!calendar.classList.contains("show")) {
          calendar.style.display = "flex";
          let parent = document.querySelector(".lk-settings__wrap");
          if(!parent) {
            parent = document.querySelector(".lk__main_wrapper");
          }  
          parent.classList.add("calendar-show");
          let clickableParent = btn.closest(".lkset-item");
          clickableParent.classList.add("active-calendar");
          setTimeout(() => {
              calendar.classList.add("show");
          }, 10);
        } else {
          calendar.classList.remove("show");
          let parent = document.querySelector(".lk-settings__wrap");
          if(!parent) {
            parent = document.querySelector(".lk__main_wrapper");
          }  
          let clickableParent = btn.closest(".lkset-item");
          clickableParent.classList.remove("active-calendar");
          setTimeout(() => {
              calendar.style.display = "none";
              parent.classList.remove("calendar-show");
          }, 200);
        }
      }
    });
  }
 
  let navTrigger = document.querySelectorAll(".nav__trigger");
  if(navTrigger.length > 0) {
    navTrigger.forEach(tigger => {
      tigger.onclick = (e) => {
        e.preventDefault();
        tigger.classList.toggle("active");
        let menu = tigger.querySelector(".nav__submenu");
        if (menu.style.maxHeight) {
          menu.style.maxHeight = null;
        } else {
          menu.style.maxHeight = menu.scrollHeight + "px";
        }
      }
    });
  }

  let lockGroupCheck = document.querySelectorAll(".lock-group input");
  if(lockGroupCheck.length > 0) {
    lockGroupCheck.forEach(el => {
      let parent = el.closest(".lock-group");
      let nextEl = parent.nextElementSibling;
      let checks = nextEl.querySelectorAll(".circle-checkbox");
      el.onchange = (e) => {
        if(el.checked) {
          checks.forEach(check => {
            check.removeAttribute("disabled");
          });
        } else {
          checks.forEach(check => {
            check.setAttribute("disabled", "disabled");
            check.checked = false;
          });
        }
      }
    });
  }


  // SELECT
  class Select {
    constructor(wrapper) {
      this.wrapper = wrapper;
      this.input = this.wrapper.querySelector(".select-value");
      this.btn = this.wrapper.querySelector(".select-btn");
      this.btnValue = this.btn.querySelector(".select-btn__value");
      this.container = this.wrapper.querySelector(".select-container");
      this.maxHeight = this.container.getAttribute("data-max-height");
      this.isOpen = this.wrapper.getAttribute("data-open") !== null ? true : false;

      if (this.wrapper && this.input && this.btn && this.btnValue && this.container) {
        this.init();
      }
    }

    init() {
      this.btnValue.innerText = this.input.placeholder;
      this.btnValue.classList.add("_placeholder");

      this.btnInfo = document.createElement("span");
      this.btnInfo.className = "select-btn__info";
      this.btn.appendChild(this.btnInfo);

      if (this.maxHeight === null) {
        this.maxHeight = (this.container.offsetHeight * 2) / 10 + "rem";
      }

      this.btn.addEventListener("click", this.handleClick.bind(this));
      this.btn.addEventListener("mouseenter", () => {
        this.btnInfo.innerText && this.btnInfo.classList.add("_active");
      });
      this.btn.addEventListener("mouseleave", () => {
        this.btnInfo.classList.remove("_active");
      });
      this.btn.addEventListener("mousemove", (e) => {
        this.btnInfo.style.top = `${e.clientY + 1}px`;
        this.btnInfo.style.left = `${e.clientX + 15}px`;
      });

      [...this.container.children].forEach(item => {
        item.addEventListener("click", this.setValue.bind(this, item));
        if (item.getAttribute("data-select") !== null) {
          this.setValue.call(this, item);
        }
      });

      this.isOpen ? this.open() : this.close();

      this.wrapper.addEventListener("click", (e) => e.stopPropagation())
      document.addEventListener("click", this.close.bind(this));
    }

    handleClick() {
      this.isOpen ? this.close() : this.open();
    }

    open() {
      this.wrapper.classList.add("_active");
      this.container.style.maxHeight = this.maxHeight;
      this.isOpen = true;
    }

    close() {
      this.wrapper.classList.remove("_active");
      this.container.style.maxHeight = 0;
      this.isOpen = false;
    }

    setValue(item) {
      const text = item.innerText;
      const value = item.getAttribute("data-value");
      this.input.value = value;
      this.btnValue.innerText = text.trim();
      this.btnValue.classList.remove("_placeholder");
      this.btnInfo.innerText = text;
      this.close();

      [...this.container.children].forEach(i => {
        i.classList.remove("_active");
      })

      item.classList.add("_active");
    }
  }

  const selects = document.querySelectorAll(".select");

  selects.forEach(item => new Select(item))

  // CHECKBOX 
  class Checkbox {
    constructor(label) {
      this.label = label;
      this.input = label.querySelector("input");

      if (this.label && this.input) {
        this.init();
      }
    }

    init() {
      this.label.addEventListener("click", this.handleClick.bind(this));
      this.input.checked && this.label.classList.add("_active");
    }

    handleClick() {
      if (this.input.checked) {
        this.label.classList.add("_active");
      } else this.label.classList.remove("_active");
    }
  }

  const checkboxItems = document.querySelectorAll(".checkbox");
  checkboxItems.forEach((item) => new Checkbox(item));

  class BankInfoItem {
    constructor(item) {
      this.item = item;
      this.description = this.item.querySelector(".bank-item-description");
      this.btn = this.item.querySelector(".bank-info-item-info-btn");
      this.isActive = this.item.getAttribute("data-open") !== null ? true : false;

      if (this.item && this.description && this.btn) {
        this.init()
      }
    }

    init() {
      this.maxHeight = this.description.offsetHeight * 4 / 10 + "rem";
      this.btn.addEventListener("click", this.handleClick.bind(this));
      if (this.isActive) {
        this.open()
      } else this.close()
    }

    handleClick() {
      if (this.isActive) {
        this.close();
      } else this.open();
      this.isActive = !this.isActive;
    }

    open() {
      this.item.classList.add("_active");
      this.description.style.maxHeight = this.maxHeight;
    }

    close() {
      this.item.classList.remove("_active");
      this.description.style.maxHeight = 0;
    }
  }

  const bankInfoItems = document.querySelectorAll(".bank-info-item");
  bankInfoItems.forEach(item => new BankInfoItem(item));

  // DROPDOWN MENU
  class DropdownMenu {
    constructor(wrapper) {
      this.wrapper = wrapper;
      this.btn = this.wrapper.querySelector(".dropdown-menu-btn");
      this.isActive = false;

      if (this.wrapper && this.btn) {
        this.init();
      }
    }

    init() {
      this.btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.handleClick.call(this);
      });

      document.addEventListener("click", this.close.bind(this))
    }

    handleClick() {
      this.isActive ? this.close() : this.open();
    }

    open() {
      this.wrapper.classList.add("_active");
      this.isActive = true;
    }

    close() {
      this.wrapper.classList.remove("_active");
      this.isActive = false;
    }
  }

  const dropdownMenuList = document.querySelectorAll(".dropdown-menu");
  dropdownMenuList.forEach(item => new DropdownMenu(item));

  class Dropdown {
    constructor(item) {
      this.wrapper = item;
      this.btn = this.wrapper.querySelector(".dropdown-btn");
      this.content = this.wrapper.querySelector(".dropdown-content");
      this.isActive = this.wrapper.getAttribute("data-active") === null ? false : true;

      if (this.wrapper && this.btn && this.content) {
        this.init();
      }
    }

    init() {
      this.maxHeight = this.content.offsetHeight * 2 / 10 + "rem";
      this.btn.addEventListener("click", this.handleClick.bind(this))

      if (this.isActive) {
        this.open();
      } else this.close();
    }

    handleClick() {
      this.isActive ? this.close() : this.open();
    }

    open() {
      this.wrapper.classList.add("_open");
      this.content.style.maxHeight = this.maxHeight;
      this.isActive = true;
    }

    close() {
      this.wrapper.classList.remove("_open");
      this.content.style.maxHeight = 0;
      this.isActive = false;
    }
  }

  const dropdownBtns = document.querySelectorAll(".dropdown");
  dropdownBtns.forEach(item => new Dropdown(item));

  function modalHandler() {
    const modal = document.querySelector(`${this.dataset?.modal}`) || this
    if (modal.dataset.modal) {
      return
    }
    if (modal.classList.contains('regModal') && modal.hidden) {
        scrollLock.disablePageScroll();
        scrollLock.addScrollableSelector('.regModal');
    } else {
        scrollLock.enablePageScroll();
    }
    if (modal) {
        if (modal.hidden) {
            modal.hidden = !modal.hidden
            modal.style.setProperty('pointer-events', 'auto')
            setTimeout(() => {
                modal.style.opacity = 1
            }, 10)
        } else {
            modal.style.opacity = 0
            modal.style.setProperty('pointer-events', null)
            modal.addEventListener('transitionend', hideaftertransition)
        }
    }
}

function hideaftertransition () {
    this.hidden = true
    this.removeEventListener('transitionend', hideaftertransition)
}

const buttonsModal = document.querySelectorAll('[data-modal]')

if (buttonsModal.length) {
    buttonsModal.forEach(el => el.addEventListener('click', modalHandler))
}

const closeButton = document.querySelectorAll('.regModal .close-button')

if (closeButton) {
  closeButton.forEach(el => {
    el.addEventListener('click', function () {
      const modal = this.closest('.regModal')
      if (modal) {
        modalHandler.apply(modal)
      }
    })
  })
}

const modals = document.querySelectorAll('.regModal')

if (modals.length) {
  modals.forEach(el => {
    el.addEventListener('click', () => {
      if (event.target.classList.contains('regModal')) {
        modalHandler.apply(event.target)
      }
    })
  })
}

const hideafterload = document.querySelectorAll('.hideafterload')

if (hideafterload.length) {
  hideafterload.forEach(el => {
    console.log(el)
    setTimeout(el.hidden = true)
  })
}

const modalCreate = document.querySelectorAll('.modal__create .modal__create-item')
const modalText = document.querySelector('.modal__text')

if (modalCreate.length) {
  modalCreate.forEach(el => {
    el.addEventListener('click', function () {
      modalCreate.forEach(el => {
        el.classList.remove('active')
      })
      this.classList.add('active')
      const panel = this.querySelector('.modal__panel')
      if (modalText && panel) {
        modalText.innerHTML = panel.innerHTML
      }
    })
  })
}

const $fileInput = $(".file-input");
const $droparea = $(".file-drop-area");
const $fileButton = $(".file-button");
let droppedFiles = null;

$fileButton.on('click', () => {
  if ($fileInput[0]) {
    $fileInput[0].click()
  }
})
// highlight drag area
$fileInput.on("dragenter focus click", function () {
  $droparea.addClass("is-active");
});

// back to normal state
$fileInput.on("dragleave blur drop", function () {
  $droparea.removeClass("is-active");
});

$fileInput.on("drop", function (e) {
  droppedFiles = e.originalEvent.dataTransfer.files;
  if (droppedFiles.length) {
    $(this)[0].files = droppedFiles
    changeFile.apply($(this)[0])
  }
});

// change inner text
$fileInput.on("change", changeFile);

function changeFile () {
  var filesCount = $(this)[0].files.length;
  var $textContainer = $(this).prev();

  if (filesCount === 1) {
    // if single file is selected, show file name
    var fileName = $(this).val().split("\\").pop();
    $textContainer.text(fileName);
    if ($fileButton[0]) {
      $fileButton.text(fileName)
    }
  } else {
    // otherwise show number of files
    $textContainer.text(filesCount + " files selected");
    if ($fileButton[0]) {
      $fileButton.text(filesCount + " files selected")
    }
  }
}

});



