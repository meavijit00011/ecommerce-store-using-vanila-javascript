// select dom elements
const hamburger = document.querySelector(".hamburger");
const unorderList = document.querySelector(".navlist");
const navLinks = document.querySelectorAll("a");
const imageSlider = document.querySelector(".image-slider");
const imageSliderContainer = document.querySelector(".image-slider-container");
const rightIndicator = document.querySelector(".indicator-2");
const leftIndicator = document.querySelector(".indicator-1");
const circleIndicator1 = document.querySelector(".circle-indicator1");
const circleIndicator2 = document.querySelector(".circle-indicator2");
const circleIndicator3 = document.querySelector(".circle-indicator3");
const loginButton = document.querySelector(".login");
const loginModal = document.querySelector(".loginModal");
const closeModal = document.querySelector(".modal_close");
const homeLink = document.querySelector(".home-section");
const productsLink = document.querySelector(".product__section");
const helpLink = document.querySelector(".help");
const aboutLink = document.querySelector(".about");
const cartPage = document.querySelector(".cart-page");
const cartLink = document.querySelector(".cartLink");
const cartClose = document.querySelector(".cart-close");
// hamburger button functionality

const hamburgerShowAndHide = () => {
  return {
    Show: () => {
      hamburger.childNodes[1].classList.add("animation1");
      hamburger.childNodes[3].classList.add("animation2");
      hamburger.childNodes[5].classList.add("animation3");
      unorderList.classList.add("mobileview");
      hamburger.classList.add("clicked");
    },
    Hide: () => {
      hamburger.childNodes[1].classList.remove("animation1");
      hamburger.childNodes[3].classList.remove("animation2");
      hamburger.childNodes[5].classList.remove("animation3");
      unorderList.classList.remove("mobileview");
      hamburger.classList.remove("clicked");
    },
  };
};
// navLinks functionality
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburgerShowAndHide().Hide();
    unorderList.classList.remove("mobileview");
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    link.classList.add("active");
    link.classList[0] == "homeLink"
      ? homeLink.scrollIntoView({ behavior: "smooth" })
      : null;
    link.classList[0] == "productsLink"
      ? productsLink.scrollIntoView({ behavior: "smooth" })
      : null;
    link.classList[0] == "aboutLink"
      ? aboutLink.scrollIntoView({ behavior: "smooth" })
      : null;
    link.classList[0] == "helpLink"
      ? helpLink.scrollIntoView({ behavior: "smooth" })
      : null;
  });
});
hamburger.addEventListener("click", () => {
  if (hamburger.classList[1] == "clicked") {
    hamburgerShowAndHide().Hide();
  } else {
    hamburgerShowAndHide().Show();
  }
});
// login modal open
loginButton.addEventListener("click", () => {
  loginModal.style.display = "block";
  hamburgerShowAndHide().Hide();
});
// login modal close
closeModal.addEventListener("click", () => {
  loginModal.style.display = "none";
});
const imageSliderAnimation = (backward) => {
  imageSliderContainer.style.transition = ".4s ease";
  // images circle indicator
  const circleIndicator = () => {
    if (
      imageSliderContainer.style.marginLeft == "0px" ||
      !imageSliderContainer.style.marginLeft ||
      imageSliderContainer.style.marginLeft == "-2700px"
    ) {
      circleIndicator1.style.backgroundColor = "grey";
      circleIndicator2.style.backgroundColor = "transparent";
      circleIndicator3.style.backgroundColor = "transparent";
    }
    if (imageSliderContainer.style.marginLeft == "-900px") {
      circleIndicator1.style.backgroundColor = "transparent";
      circleIndicator2.style.backgroundColor = "grey";
      circleIndicator3.style.backgroundColor = "transparent";
    }
    if (imageSliderContainer.style.marginLeft == "-1800px") {
      circleIndicator1.style.backgroundColor = "transparent";
      circleIndicator2.style.backgroundColor = "transparent";
      circleIndicator3.style.backgroundColor = "grey";
    }
  };
  // if backward button is clicked
  if (backward) {
    if (
      !imageSliderContainer.style.marginLeft ||
      imageSliderContainer.style.marginLeft == "0px"
    ) {
      imageSliderContainer.style.transition = "none";
      imageSliderContainer.style.marginLeft = "-2700px";
      circleIndicator();
    } else {
      imageSliderContainer.style.marginLeft = `${
        parseInt(imageSliderContainer.style.marginLeft) + 900
      }px`;
      circleIndicator();
    }
  }
  // if forward button is clicked or every 3000 milisecond the function is called just forward the slider
  else {
    if (!imageSliderContainer.style.marginLeft) {
      imageSliderContainer.style.marginLeft = "-900px";
      circleIndicator();
    } else if (imageSliderContainer.style.marginLeft == "-1800px") {
      imageSliderContainer.style.marginLeft = "-2700px";
      // move back to first image without any animation
      setTimeout(() => {
        imageSliderContainer.style.transition = "none";
        imageSliderContainer.style.marginLeft = "0px";
      }, 400);

      circleIndicator();
    } else if (imageSliderContainer.style.marginLeft == "-2700px") {
      imageSliderContainer.style.transition = "none";
      imageSliderContainer.style.marginLeft = "0px";
    } else {
      imageSliderContainer.style.marginLeft = `${
        parseInt(imageSliderContainer.style.marginLeft) - 900
      }px`;
      circleIndicator();
    }
  }
};

const callImageSlider = (() => {
  // every 3000 miliseconds call the imageSliderAnimation function to move forward to the next image.
  setInterval(imageSliderAnimation, 3000);
  // when forward button is clicked
  rightIndicator.addEventListener("click", () => {
    imageSliderAnimation();
  });
  // when backward button is clicked
  leftIndicator.addEventListener("click", () => {
    imageSliderAnimation(true);
  });
})();
// show cart when cart link is clicked
cartLink.addEventListener("click", () => {
  cartPage.style.right = "0";
});
// close cart when cart close button is clicked
cartClose.addEventListener("click", () => {
  cartPage.style.right = "-100%";
});
