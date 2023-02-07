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

      if (this.maxHeight === null) {
        this.maxHeight = (this.container.offsetHeight * 2) / 10 + "rem";
      }

      this.btn.addEventListener("click", this.handleClick.bind(this));

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
      this.btnValue.innerText = text;
      this.btnValue.classList.remove("_placeholder");
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

});



