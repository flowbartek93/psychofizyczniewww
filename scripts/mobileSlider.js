class mobileSlider {
  constructor() {
    this.image = document.querySelector(".mobile__top-slider");
    this.topCircles = document.querySelector(".top__circles");
    this.paths = ["xgarda.jpg", "logofinal.png", "my.jpg"];
    this.initialWidth = window.innerWidth;
    this.width = null;
    this.timer = null;
    this.isMobile = true;
    this.createSlider();
  }

  drawDots() {
    this.paths.forEach((_, index) => {
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

    this.image.style.backgroundImage = `url(./images/${this.paths[currentIndex]})`;
    this.topCircles.children[currentIndex].style.border = "2px solid #322B0F";

    if (this.isMobile) {
      this.timer = setInterval(() => {
        currentIndex++;
        if (currentIndex > 2) {
          currentIndex = 0;
          this.topCircles.children[this.paths.length - 1].style.border = "none";
        }

        this.image.style.backgroundImage = `url(./images/${this.paths[currentIndex]})`;
        this.topCircles.children[currentIndex].style.border =
          "2px solid #322B0F";

        if (currentIndex > 0) {
          this.topCircles.children[currentIndex - 1].style.border = "none";
        } else {
          this.topCircles.children[currentIndex + 1].style.border = "none";
        }
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
