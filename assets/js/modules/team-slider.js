import Swiper from "swiper";
import { Navigation } from "swiper/modules";

export const initTeamSlider = () => {
  const teamSliderElement = document.querySelector(".team__slider");

  if (teamSliderElement) {
    new Swiper(teamSliderElement, {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".team__btn--next",
        prevEl: ".team__btn--prev",
      },
      breakpoints: {
        576: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 24 },
        1024: { slidesPerView: 4, spaceBetween: 30 },
      },
    });
  }
};
