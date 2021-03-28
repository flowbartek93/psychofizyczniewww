class mobileSlider {
  constructor() {
    this.imagesContainer = document.querySelector(".slider__container");
    this.images = document.querySelectorAll(".container__image");
    this.circles = document.querySelector(".circles");
    this.sliderTexts = document.querySelectorAll(".textarea__text");
    this.initialWidth = window.innerWidth;
    this.timer = null;
    this.isMobile = true;
    this.createSlider();
  }

  events() {
    window.addEventListener("resize", () => {
      console.log("resize events");
      this.checkResize();
    });
  }

  drawDots() {
    if (this.circles.children.length === 0) {
      this.images.forEach((_, index) => {
        const circle = document.createElement("div");
        circle.setAttribute("class", "circles__circle");
        circle.setAttribute("data-id", `${index + 1}`);
        this.circles.appendChild(circle);
      });
    }
  }

  createSlider() {
    this.drawDots();
    this.checkWidth();
    this.events();
  }

  switchSlider() {
    if (!this.isMobile) {
      this.imagesContainer.classList.add("container--desktop");
    }

    if (this.isMobile) {
      this.imagesContainer.classList.remove("container--desktop");
    }
  }

  animateSlider() {
    let currentIndex = 0;

    // Setting default display for all effects before first interval
    this.images[currentIndex].classList.add("fade");
    this.circles.children[currentIndex].classList.add("active");
    this.sliderTexts[currentIndex].classList.add("show");

    this.timer = setInterval(() => {
      currentIndex++;

      // First interval until current index gets bigger than 2
      if (currentIndex <= this.images.length - 1) {
        // Switching circles
        this.circles.children[currentIndex - 1].classList.toggle("active");
        this.circles.children[currentIndex].classList.toggle("active");

        // Switching images
        this.images[currentIndex - 1].classList.toggle("fade");
        this.images[currentIndex].classList.toggle("fade");

        // Switching texts

        this.sliderTexts[currentIndex - 1].classList.replace("show", "hide");
        this.sliderTexts[currentIndex].classList.add("show");
        this.sliderTexts[currentIndex].classList.remove("hide");
      }

      // If index gets bigger than 2
      if (currentIndex > this.images.length - 1) {
        currentIndex = 0;

        // Switching circles
        this.circles.children[currentIndex].classList.toggle("active");
        this.circles.children[this.images.length - 1].classList.toggle(
          "active"
        );

        // Switching images
        this.images[currentIndex].classList.toggle("fade");
        this.images[this.images.length - 1].classList.toggle("fade");

        // Switching texts

        this.sliderTexts[this.images.length - 1].classList.replace(
          "show",
          "hide"
        );
        this.sliderTexts[currentIndex].classList.add("show");
        this.sliderTexts[currentIndex].classList.remove("hide");
      }
    }, 4000);
  }

  checkWidth() {
    if (this.initialWidth >= 800) {
      this.isMobile = false;

      this.switchSlider();
      this.animateSlider();
    } else {
      this.animateSlider();
    }
  }

  checkResize() {
    if (window.innerWidth <= 800) {
      this.isMobile = true;
      this.switchSlider();
      console.log("mniej niz 800");
    }

    if (window.innerWidth >= 800) {
      this.isMobile = false;
      this.switchSlider();
      console.log("więcej niz 800");
    }
  }
}

const run = new mobileSlider();
