let openModal;
let closeModal;

document.addEventListener("DOMContentLoaded", () => {
    let height = window.innerHeight;
    let width = window.innerWidth;
    let header = document.querySelector(".header");
    document.documentElement.style.setProperty('--h', height + "px");
    document.documentElement.style.setProperty('--w', width + "px");
    document.documentElement.style.setProperty('--headerH', header.getBoundingClientRect().height + "px");

    let categories = document.querySelectorAll(".categories__block");
    if(categories.length > 0) {
        for(let i = 0; i < categories.length; i++) {
            if(i >= 6) {
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
    if(topBtn.length > 0) {
        topBtn.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                let winYOffset = window.pageYOffset, 
                hash = "#top";
                elemTop = document.querySelector(hash).getBoundingClientRect().top-topOffset,
                    start = null;
                requestAnimationFrame(step); 
                function step(time) {
                    if (start === null) start = time;
                    let progress = time - start,
                        r = (elemTop < 0 ? Math.max(winYOffset - progress / velocity, winYOffset + elemTop) : Math.min(winYOffset + progress / velocity, winYOffset + elemTop));
                    window.scrollTo(0, r);
                    if (r != winYOffset + elemTop) {
                        requestAnimationFrame(step)
                    } else 	return;
                }
            }
        });
    }

    let selectorTitle = document.querySelectorAll(".selector__title");
    if(selectorTitle.length > 0) {
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
    if(selectorItems.length > 0) {
        selectorItems.forEach(item => {
            let parent = item.closest(".selector");
            let block = item.parentNode;
            let title = parent.querySelector(".selector__title span");
            item.onclick = (e) => {
                e.preventDefault();
                if(item.classList.contains("active")) {
                    block.style.maxHeight = null;
                    parent.classList.remove("active");
                } else {
                    let prev = parent.querySelector(".selector__item.active");
                    if(prev) {
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
    if(asideItems.length > 0) {
        asideItems.forEach(item => {
            item.onclick = (e) => {
                e.preventDefault();
                if(!item.classList.contains("active")) {
                    let prev = document.querySelector(".lk__aside_item.active");
                    if(prev) {
                        prev.classList.remove("active");
                    }
                    item.classList.add("active");
                }
            }
        });
    }

    let introBlocks = document.querySelectorAll(".intro__changeable_block");
    if(introBlocks.length > 0) {
        let parent = document.querySelector(".intro__changeable_blocks");
        parent.setAttribute("data-num", introBlocks.length);
    }

    let sphereCont = document.querySelectorAll(".spheres__container");
    if(sphereCont.length > 0) {
        sphereCont.forEach(slider => {
            let prev = slider.querySelector(".swiper-button-prev");
            let next = slider.querySelector(".swiper-button-next");
            new Swiper(slider, {
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                slidesPerView: 3,
                watchOverflow: true,
                spaceBetween: 40,
                freeMode: "false",
                loop: true,
            });
    
        });
    }
});



