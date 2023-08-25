const circles = document.getElementsByClassName("slider__circle");
const slider = document.querySelector(".slider");

let sliderHeight = slider.getBoundingClientRect().height;
let sliderWidth = slider.getBoundingClientRect().width;
console.log(sliderWidth);
console.log(sliderHeight);

i = 0;
let timerId = setTimeout(function tick() {
  shakeElements(circles);
  setToCenter(circles[i]);
  timerId = setTimeout(tick, 3000);
  i++;
  if(i==circles.length) i=0
}, 3000);

function setToCenter(el) {
  el.style.translate = `${(sliderWidth - el.getBoundingClientRect().width) / 2}px ${
    (sliderHeight - el.getBoundingClientRect().height) / 2
  }px`;
}

function shakeElements(elCollection) {
  for (el of elCollection) {
    let posX = Math.random() * (sliderWidth - el.getBoundingClientRect().width);
    let posY = Math.random() * (sliderHeight - el.getBoundingClientRect().height);
    el.style.translate = `${posX}px ${posY}px`;
    el.style.transition = "translate 3s ease-in-out";
  }
}
