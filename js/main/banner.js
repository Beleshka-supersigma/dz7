const bannerElem = document.querySelector(".banner__wrapper");
const buttonPrevElem = document.querySelector(".banner .arrow-prev");
const buttonNextElem = document.querySelector(".banner .arrow-next");
let moviesWithBanner = [];

let bannerI = 0;
let interval;

const setBanner = () => {
  if (moviesWithBanner.length)
    bannerElem.style.backgroundImage = `url(${moviesWithBanner[bannerI].bannerImage})`;
};

const slideNext = () => {
  if (bannerI < moviesWithBanner.length - 1) bannerI++;
  else bannerI = 0;

  setBanner();
};

const autoSlide = () => {
  interval = setInterval(slideNext, 3000);
};

buttonNextElem.addEventListener("click", () => {
  clearInterval(interval);
  autoSlide();
  slideNext();
});

buttonPrevElem.addEventListener("click", () => {
  clearInterval(interval);
  autoSlide();
  if (bannerI <= 0) bannerI = moviesWithBanner.length - 1;
  else bannerI--;

  setBanner();
});

const moviesWrapperElem = document.querySelector(".movies__inner");

const getBanner = async () => {
  try {
    const response = await fetch("https://68c7b9ad5d8d9f514732c30b.mockapi.io/api/v1/movie");
    const movies = await response.json();
    moviesWithBanner = movies.filter((movie) => movie.bannerImage);
    setBanner();
    autoSlide();
  } catch (err) {
    console.error(err);
  }
};

getBanner();
