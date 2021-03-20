class mobileSlider {
  constructor() {
    this.imagesContainer = document.querySelector(".slider__container--mobile");
    this.images = document.querySelectorAll(
      ".slider__container--mobile > .slider__image"
    );
    this.topCircles = document.querySelector(".top__circles");
    this.initialWidth = window.innerWidth;

    this.timer = null;
    this.isMobile = true;

    this.createSlider();
  }

  drawDots() {
    if (this.topCircles.children.length === 0) {
      this.images.forEach((_, index) => {
        const circle = document.createElement("div");
        circle.setAttribute("class", "top circle");
        circle.setAttribute("data-id", `${index + 1}`);
        this.topCircles.appendChild(circle);
      });
    }
  }

  deleteDots() {
    while (this.topCircles.hasChildNodes()) {
      this.topCircles.removeChild(this.topCircles.childNodes[0]);
    }
  }

  createSlider() {
    this.drawDots();
    this.checkWidth();
    this.resize();
  }

  animateSlider() {
    let currentIndex = 0;
    if (this.topCircles.hasChildNodes()) {
      this.topCircles.children[currentIndex].style.border = "2px solid #322B0F";
    }

    if (this.isMobile) {
      this.timer = setInterval(() => {
        this.images[currentIndex].classList.remove("fade-in");
        this.images[currentIndex].classList.add("fade-out");

        if (currentIndex < 2) {
          this.topCircles.children[currentIndex].style.border = "none";
          currentIndex++;
          this.images[currentIndex].classList.remove("fade-out");
          this.images[currentIndex].classList.add("fade-in");

          this.topCircles.children[currentIndex].style.border =
            "2px solid #322B0F";
        } else {
          currentIndex = 0;
          this.images[currentIndex].classList.add("fade-in");
          this.images[currentIndex].classList.remove("fade-out");
          this.topCircles.children[currentIndex].style.border =
            "2px solid #322B0F";
          this.topCircles.children[this.images.length - 1].style.border =
            "none";
          this.images[this.images.length - 1].classList.add("fade-out");
        }
      }, 6000);
    }
  }

  checkWidth() {
    if (this.initialWidth >= 800) {
      this.isMobile = false;
    } else {
      this.animateSlider();
    }
  }

  resize() {
    const debounce = (fn, delay) => {
      let timer;

      return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn();
        }, delay);
      };
    };

    let checkWidth = () => {
      if (window.innerWidth >= 800) {
        if (this.timer) {
          this.isMobile = false;
          window.clearInterval(this.timer);
          console.log("clear interval");
          this.timer = null;
          this.deleteDots();
        }
      } else if (window.innerWidth <= 800 && this.isMobile === false) {
        window.clearInterval(this.timer);
        this.isMobile = true;
        if (this.isMobile) {
          this.animateSlider();
        }
      }
    };

    // checkWidth = debounce(checkWidth, 500);

    window.addEventListener("resize", debounce(checkWidth, 500));
  }
}

const run = new mobileSlider();
