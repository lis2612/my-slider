const slides = document.getElementsByClassName("slider__circle");
const slider = document.querySelector(".slider");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

let sliderHeight = slider.getBoundingClientRect().height;
let sliderWidth = slider.getBoundingClientRect().width;

let elHeight = slides[1].getBoundingClientRect().height;
let elWidth = slides[1].getBoundingClientRect().width;

function clearStyles(el) {
  el.style.translate = "";
  el.style.height = "";
  el.style.width = "";
}

function findActiveSlideIndex(elCollection) {
  for (let i = 0; i < elCollection.length; i++) {
    if (elCollection[i].classList.contains("slider__circle_active")) return i;
  }
}

function shakeElements(elCollection) {
  console.clear();
  for (el of elCollection) {
    let elScale = 1;

    if (!el.classList.contains("slider__circle_active")) {
      let posX = Math.random() * (sliderWidth - elWidth);
      let posY = Math.random() * (sliderHeight - elHeight);

      el.style.translate = `${posX}px ${posY}px`;
      el.style.height = `${elHeight * elScale}px`;
      el.style.width = `${elWidth * elScale}px`;
    } else {
      clearStyles(el);
    }
  }
}



shakeElements(slides);

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

nextButton.addEventListener("click", () => nextSlide(slides));
prevButton.addEventListener("click", () => prevSlide(slides));

function clickSlide(el, elCollection) {
  let centeredElementIdx = findActiveSlideIndex(elCollection);
  elCollection[centeredElementIdx].classList.remove("slider__circle_active");
  el.classList.add("slider__circle_active");
  shakeElements(elCollection);
}


for (el of slides) {
el.addEventListener("click", (e) => clickSlide(e.target,slides));
}


//TODO: fix overhidden elements
