const track = document.querySelector(".carousel_container");
const slides = Array.from(track.children);
const nextbutton = document.querySelector(".carousel--right");
const prevButton = document.querySelector(".carousel--left");
const dotsNav = document.querySelector(".carousel_nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setslidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setslidePosition);

const moveToslide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-Slide");
  targetSlide.classList.add("current-Slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-Slide");
  targetDot.classList.add("current-Slide");
};

const hideshowarrows = (slides, prevButton, nextbutton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextbutton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextbutton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextbutton.classList.remove("is-hidden");
  }
};

prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-Slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-Slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToslide(track, currentSlide, prevSlide);
  hideshowarrows(slides, prevButton, nextbutton, nextIndex);
  updateDots(currentDot, prevDot);
});

// right
nextbutton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-Slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-Slide");
  const nextDot = currentDot.nextElementSibling;

  moveToslide(track, currentSlide, nextSlide);
  updateDots(currentDot, targetDot);
  hideshowarrows(slides, prevButton, nextbutton, nextIndex);
});

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closet("button");

  if (!targetDot) return;
  const currentSlide = track.querySelector(".current-Slide");
  const currentDot = dotsNav.querySelector(".current-Slide");

  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToslide(track, currentSlide, targetSlide);

  updateDots(currentDot, targetDot);
  hideshowarrows(slides, prevButton, nextbutton, targetIndex);
});
