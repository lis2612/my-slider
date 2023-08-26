const slides = document.getElementsByClassName("slider__circle");
const slider = document.querySelector(".slider");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

let sliderX = slider.clientLeft;
let sliderY = slider.clientTop;

let sliderHeight = slider.clientHeight;
let sliderWidth = slider.clientWidth;
const activeElHeight = document.getElementsByClassName("slider__circle_active")[0].clientHeight;
const activeElWidth = document.getElementsByClassName("slider__circle_active")[0].clientWidth;

// let elHeight = slides[1].clientHeight;
// let elWidth = slides[1].clientWidth;

let elHeight = 100;
let elWidth = 100;

function clearStyles(el) {
  el.style.translate = "";
  el.style.height = "";
  el.style.width = "";
  el.style.scale = "";
  el.style.left = "";
  el.style.top = "";

}

function findActiveSlideIndex(elCollection) {
  for (let i = 0; i < elCollection.length; i++) {
    if (elCollection[i].classList.contains("slider__circle_active")) return i;
  }
}

function shakeElements(elCollection) {
  scale(elCollection);
  for (el of elCollection) {
    if (!el.classList.contains("slider__circle_active")) {
      let curX = el.clientLeft
      let curY = el.clientTop;
      let curW = el.clientWidth;
      let curH = el.clientHeight;

      let newX = Math.random() * (sliderWidth - elWidth);
      let newY = Math.random() * (sliderHeight - elHeight);

      el.style.left = `${newX}px`
      el.style.top = `${newY}px`;
    } else {
      clearStyles(el);
    }
  }
}

function scale(elCollection) {
  let centeredElementIdx = findActiveSlideIndex(elCollection);
  let countElements = elCollection.length;
  let baseScale = 0.7;
  for (let i = 1; i < countElements; i++) {
    if (centeredElementIdx + i < countElements) {
      elCollection[centeredElementIdx + i].style.height = `${activeElHeight * (baseScale - i / 10)}px`;
      elCollection[centeredElementIdx + i].style.width = `${activeElWidth * (baseScale - i / 10)}px`;
    }

    if (centeredElementIdx - i >= 0) {
      elCollection[centeredElementIdx - i].style.height = `${activeElHeight * (baseScale - i / 10)}px`;
      elCollection[centeredElementIdx - i].style.width = `${activeElWidth * (baseScale - i / 10)}px`;
    }
  }
}

function nextSlide(elCollection) {
  let centeredElementIdx = findActiveSlideIndex(elCollection);
  elCollection[centeredElementIdx].classList.remove("slider__circle_active");
  centeredElementIdx++;
  if (centeredElementIdx == elCollection.length) centeredElementIdx = 0;
  elCollection[centeredElementIdx].classList.add("slider__circle_active");
  shakeElements(slides);
}

function prevSlide(elCollection) {
  let centeredElementIdx = findActiveSlideIndex(elCollection);
  elCollection[centeredElementIdx].classList.remove("slider__circle_active");
  centeredElementIdx--;
  if (centeredElementIdx < 0) centeredElementIdx = elCollection.length - 1;
  elCollection[centeredElementIdx].classList.add("slider__circle_active");
  shakeElements(slides);
}

function clickSlide(el, elCollection) {
  let centeredElementIdx = findActiveSlideIndex(elCollection);
  elCollection[centeredElementIdx].classList.remove("slider__circle_active");
  el.classList.add("slider__circle_active");
  shakeElements(elCollection);
}

shakeElements(slides);
scale(slides);

nextButton.addEventListener("click", () => nextSlide(slides));
prevButton.addEventListener("click", () => prevSlide(slides));

for (el of slides) {
  el.addEventListener("click", (e) => clickSlide(e.target, slides));
}

//TODO: fix overhidden elements
