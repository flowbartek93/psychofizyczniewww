class Hamburger {
  constructor() {
    this.lines = document.querySelectorAll(".line");
    this.hamburgerBtn = document.querySelector(".nav__hamburger");
    this.navmobile = document.querySelector(".nav-mobile");
    this.events();
  }

  events() {
    this.hamburgerBtn.addEventListener("click", () => {
      this.toggle();
    });
  }
  toggle() {
    this.lines.forEach((line) => {
      line.classList.toggle("active");
    });

    this.navmobile.classList.toggle("active");
    console.log("ok");
  }
}

const run = new Hamburger();
