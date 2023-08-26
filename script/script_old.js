const slides = document.getElementsByClassName("slider__circle");
const slider = document.querySelector(".slider");
const nextButton = document.getElementById("next-button");
console.log(nextButton);
const prevButton = document.getElementById("prev-button");

let sliderHeight = slider.getBoundingClientRect().height;
let sliderWidth = slider.getBoundingClientRect().width;

function centeredElementSize() {
  let height = slides[centeredElementIdx].getBoundingClientRect().height;
  let width = slides[centeredElementIdx].getBoundingClientRect().width;
  return [height, width];
}

function setToCenter(el) {
  let centerX = (sliderWidth - el.getBoundingClientRect().width) / 2;
  let centerY = (sliderHeight - el.getBoundingClientRect().height) / 2;

  el.style.translate = `${centerX}px ${centerY}px`;
  el.style.scale = "2";
}

// function shakeElements(elCollection) {
//   let i = 1;
//   for (el of elCollection) {
//     console.log(i);
//     let widthPosition=sliderWidth/(elCollection.length+1)
//     // let posX = Math.random() * (sliderWidth - el.getBoundingClientRect().width); ;
//     let posX = widthPosition * i - el.getBoundingClientRect().width;
//     console.log(posX);

//     let posY = Math.random() * (sliderHeight - el.getBoundingClientRect().height);
//     el.style.translate = `${posX}px ${posY}px`;
//     el.style.scale = "";

//     el.style.transition = "all 1s ease-in-out";
//     i++;
//   }
// }

function shakeElements(elCollection) {
  for (let i = 0; i <= elCollection.length; i++) {
    let widthPosition = sliderWidth / (elCollection.length - 1);

    elCollection[i].style.translate = `${posX}px ${posY}px`;
    elCollection[i].style.scale = "";

    elCollection[i].style.transition = "all 1s ease-in-out";
  }
}

let centeredElementIdx = 0;

function nextSlide(elCollection) {
  centeredElementIdx++;
  if (centeredElementIdx == elCollection.length) centeredElementIdx = 0;
  shakeElements(slides);
  setToCenter(slides[centeredElementIdx]);
}

function prevSlide(elCollection) {
  centeredElementIdx--;
  if (centeredElementIdx < 0) centeredElementIdx = elCollection.length - 1;
  shakeElements(slides);
  setToCenter(slides[centeredElementIdx]);
}

nextButton.addEventListener("click", () => nextSlide(slides));
prevButton.addEventListener("click", () => prevSlide(slides));

shakeElements(slides);
setToCenter(slides[0]);

// let timerId = setTimeout(function tick() {
//   shakeElements(slides);
//   setToCenter(slides[centeredElementId]);
//   timerId = setTimeout(tick, 3000);
//   centeredElementId++;
//   if (centeredElementId == slides.length) centeredElementId = 0;
// }, 3000);
