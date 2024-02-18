// slider

class Slider {
  constructor(selector, options = {}) {
    this.sliderEl = document.querySelector(selector);
    if (!this.sliderEl) {
      throw new Error("wrong selector");
    }

    this.width = options.width ?? 1080;
    this.height = options.height ?? 720;
    this.slides = this.sliderEl.querySelectorAll(".slide");
    this.slideIdx = 0;
  }

  init() {
    this.sliderEl.style.height = `${this.height}px`;
    this.sliderEl.style.width = `${this.width}px`;

    // Создаем левую стрелку
    this.leftArrow = document.createElement("i");
    this.leftArrow.classList.add(
      "fa-solid",
      "fa-chevron-circle-left",
      "slider-leftArrow"
    );
    this.sliderEl.append(this.leftArrow);

    // Создаем правую стрелку
    this.rightArrow = document.createElement("i");
    this.rightArrow.classList.add(
      "fa-solid",
      "fa-chevron-circle-right",
      "slider-rigthArrow"
    );
    this.sliderEl.append(this.rightArrow);

    //создаем пагинацию

    this.pages = this.sliderEl.querySelector(".pagination");

    for (let index = 0; index < this.slides.length; index++) {
      this.page = document.createElement("div");
      this.page.classList.add("page");
      this.pages.appendChild(this.page);
    }

    this.pagination = document.querySelectorAll(".page");

    for (let i = 0; i < this.pagination.length; i++) {
      this.pagination[i].addEventListener("click", () => {
        for (const page of this.pagination) {
          page.classList.remove("page-active");
        }
        this.pagination[i].classList.add("page-active");
        for (const slide of this.slides) {
          slide.classList.add("hidden-slide");
        }
        this.slides[i].classList.remove("hidden-slide");
      });
    }

    // запуск стрелочек

    const run = () => {
      this.rightArrow.addEventListener("click", () => {
        this.setNextSlide();
      });

      this.leftArrow.addEventListener("click", () => {
        this.setPrevSlide();
      });

      this.slides[this.slideIdx].classList.remove("hidden-slide");
      this.pagination[this.slideIdx].classList.add("page-active");
    };

    run();
  }

  setNextSlide() {
    this.slides[this.slideIdx].classList.add("hidden-slide");
    this.pagination[this.slideIdx].classList.remove("page-active");
    if (this.slideIdx === this.slides.length - 1) {
      this.slideIdx = 0;
    } else {
      this.slideIdx++;
    }
    this.slides[this.slideIdx].classList.remove("hidden-slide");
    this.pagination[this.slideIdx].classList.add("page-active");
  }

  setPrevSlide() {
    this.slides[this.slideIdx].classList.add("hidden-slide");
    this.pagination[this.slideIdx].classList.remove("page-active");
    if (this.slideIdx === 0) {
      this.slideIdx = this.slides.length - 1;
    } else {
      this.slideIdx--;
    }

    this.slides[this.slideIdx].classList.remove("hidden-slide");
    this.pagination[this.slideIdx].classList.add("page-active");
  }
}

const slider = new Slider(".slider");
slider.init();
