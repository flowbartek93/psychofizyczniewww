class mobileSlider {
  constructor() {
    this.imagesContainer = document.querySelector(".slider__container--mobile");
    this.images = document.querySelectorAll(".slider__image");
    this.topCircles = document.querySelector(".top__circles");
    this.initialWidth = window.innerWidth;
    this.width = null;
    this.timer = null;
    this.isMobile = true;
    this.createSlider();
  }

  drawDots() {
    this.images.forEach((_, index) => {
      const circle = document.createElement("div");
      circle.setAttribute("class", "top circle");
      circle.setAttribute("data-id", `${index + 1}`);
      this.topCircles.appendChild(circle);
    });
  }

  createSlider() {
    this.drawDots();
    this.checkWidth();
    this.resize();
  }

  animateSlider() {
    let currentIndex = 0;
    this.topCircles.children[currentIndex].style.border = "2px solid #322B0F";

    if (this.isMobile) {
      this.timer = setInterval(() => {
        this.images[currentIndex].classList.remove("fade-in");
        this.images[currentIndex].classList.add("fade-out");

        if (currentIndex < 2) {
          currentIndex++;
          this.images[currentIndex].classList.remove("fade-out");
          this.images[currentIndex].classList.add("fade-in");

          console.log(currentIndex);
        } else if (currentIndex >= 2) {
          currentIndex = 0;
          this.images[currentIndex].classList.add("fade-in");
          this.images[currentIndex].classList.remove("fade-out");
          this.images[currentIndex + 2].classList.add("fade-out");
          console.log("przekroczylo");
        }

        // if (currentIndex > 2) {
        //   currentIndex = 0;

        //   this.topCircles.children[this.images.length - 1].style.border =
        //     "none";
        // }

        // this.topCircles.children[currentIndex].style.border =
        //   "2px solid #322B0F";

        // if (currentIndex > 0) {
        //   this.topCircles.children[currentIndex - 1].style.border = "none";
        // } else {
        //   this.topCircles.children[currentIndex + 1].style.border = "none";
        // }
      }, 2000);
    } else if (!this.isMobile) {
      console.log("przekroczony");
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
        this.isMobile = false;
        console.log("clear interval");
        window.clearInterval(this.timer);
      } else if (window.innerWidth <= 800) {
        this.isMobile = true;
        this.animateSlider();
      }
    };

    // checkWidth = debounce(checkWidth, 500);

    window.addEventListener("resize", debounce(checkWidth, 500));
  }
}

const run = new mobileSlider();
