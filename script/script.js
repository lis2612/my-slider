const slides = document.getElementsByClassName("slider__circle");
const slider = document.querySelector(".slider");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const activeSlide = document.getElementsByClassName("slider__circle_active")[0];

const sliderRect = {
  left: 0,
  right: slider.offsetWidth,
  top: 0,
  bottom: slider.offsetHeight,
  width: slider.offsetWidth,
  height: slider.offsetHeight,
  centerX: slider.offsetWidth / 2,
  centerY: slider.offsetHeight / 2,
};

const activeRect = {
  left: activeSlide.offsetLeft,
  right: activeSlide.offsetLeft + activeSlide.offsetWidth,
  top: activeSlide.offsetTop,
  bottom: activeSlide.offsetTop + activeSlide.clientHeight,
  width: activeSlide.offsetWidth,
  height: activeSlide.offsetHeight,
  centerX: activeSlide.offsetLeft + activeSlide.offsetWidth / 2,
  centerY: activeSlide.offsetTop + activeSlide.offsetHeight / 2,
};

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
  const sizesArr = scale(elCollection);
  console.clear();
  let i = 0;
  // TODO half elements to left and half to right
  for (el of elCollection) {
    if (!el.classList.contains("slider__circle_active")) {
      let left = Math.random() * sliderRect.width;
      if (left >= sliderRect.right - sizesArr[i]) left = sliderRect.width - sizesArr[i];

      let top = Math.random() * sliderRect.height;
      if (top >= sliderRect.bottom - sizesArr[i]) top = sliderRect.height - sizesArr[i];

      if (
        left <= activeRect.right &&
        left + sizesArr[i] >= activeRect.left &&
        top <= activeRect.bottom &&
        top + sizesArr[i] >= activeRect.top
      ) {
        if (activeRect.left - left + sizesArr[i] < activeRect.right - left) {
          left = left + activeRect.right - left;
        } else {
          left = left - activeRect.left - left + sizesArr[i];
        }

        if (activeRect.bottom - top > top + sizesArr[i] - activeRect.top) {
          top = top + activeRect.bottom - top;
        } else {
          top = top - top + sizesArr[i] - activeRect.top;
        }
      }

      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    } else {
      clearStyles(el);
    }
    i++;
  }
}

function scale(elCollection) {
  let centeredElementIdx = findActiveSlideIndex(elCollection);
  let countElements = elCollection.length;
  let baseScale = 0.7;
  let elSizes = [];
  for (let i = 0; i < countElements; i++) {
    elSizes[i] = 1;
  }
  for (let i = 1; i < countElements; i++) {
    if (centeredElementIdx + i < countElements) {
      elCollection[centeredElementIdx + i].style.height = `${activeRect.height * (baseScale - i / 10)}px`;
      elCollection[centeredElementIdx + i].style.width = `${activeRect.width * (baseScale - i / 10)}px`;
      elSizes[centeredElementIdx + i] = activeRect.height * (baseScale - i / 10);
    }

    if (centeredElementIdx - i >= 0) {
      elCollection[centeredElementIdx - i].style.height = `${activeRect.height * (baseScale - i / 10)}px`;
      elCollection[centeredElementIdx - i].style.width = `${activeRect.width * (baseScale - i / 10)}px`;
      elSizes[centeredElementIdx - i] = activeRect.height * (baseScale - i / 10);
    }
  }
  return elSizes;
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
