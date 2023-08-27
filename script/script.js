const slides = document.getElementsByClassName("slider__circle");
const slider = document.querySelector(".slider");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const activeSlide = document.getElementsByClassName("slider__circle_active")[0];

let sliderX = slider.offsetLeft;
let sliderY = slider.offsetTop;
let sliderHeight = slider.offsetHeight;
let sliderWidth = slider.offsetWidth;

// const activeSlideX = activeSlide.clientLeft;
// const activeSlideY = activeSlide.clientTop;

const activeSlideX = 450;
const activeSlideY = 100;
const activeSlideH = activeSlide.offsetHeight;
const activeSlideW = activeSlide.offsetWidth;

const activeRect = {
  left: 450,
  right: 450 + activeSlide.clientWidth,
  top: 100,
  bottom: 100 + activeSlide.clientHeight,
  centerX: 450 + activeSlide.clientWidth / 2,
  centerY: 100 + activeSlide.clientHeight / 2,
};
// let curH = 100;
// let curH = 100;

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

function getElRect(el) {
  // return {
  //   left: el.getBoundingClientRect().left,
  //   right: el.getBoundingClientRect().left + el.getBoundingClientRect().width,
  //   top: el.getBoundingClientRect().top,
  //   bottom: el.getBoundingClientRect().top + el.getBoundingClientRect().height,
  //   width: el.getBoundingClientRect().width,
  //   height: el.getBoundingClientRect().height,
  //   centerX: el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2,
  //   centerY: el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2,
  // };
  return {
    left: el.offsetLeft,
    right: el.offsetLeft + el.offsetWidth,
    top: el.offsetTop,
    bottom: el.offsetTop + el.offsetHeight,
    width: el.offsetWidth,
    height: el.offsetHeight,
    centerX: el.offsetLeft + el.offsetWidth / 2,
    centerY: el.offsetTop + el.offsetHeight / 2,
  };
}

function shakeElements(elCollection) {
  scale(elCollection);
  console.clear();
  for (el of elCollection) {
    if (!el.classList.contains("slider__circle_active")) {
      let cX = Math.random() * sliderWidth;
      // let cX=-100
      if (cX - getElRect(el).width <= 0) cX = getElRect(el).width;
      if (cX + getElRect(el).width >= sliderWidth) cX = sliderWidth;


      let cY = Math.random() * sliderHeight;
      // let cY = -100;
      if (cY - getElRect(el).height <= 0) cY = getElRect(el).height;
      if (cY + getElRect(el).height >=sliderHeight) cY = sliderHeight;


      el.style.left = `${cX - getElRect(el).width}px`;
      el.style.top = `${cY - getElRect(el).height}px`;
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
      elCollection[centeredElementIdx + i].style.height = `${activeSlideH * (baseScale - i / 10)}px`;
      elCollection[centeredElementIdx + i].style.width = `${activeSlideW * (baseScale - i / 10)}px`;
    }

    if (centeredElementIdx - i >= 0) {
      elCollection[centeredElementIdx - i].style.height = `${activeSlideH * (baseScale - i / 10)}px`;
      elCollection[centeredElementIdx - i].style.width = `${activeSlideW * (baseScale - i / 10)}px`;
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
