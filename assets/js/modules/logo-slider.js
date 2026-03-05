import Swiper from "swiper/bundle";

export const initLogoSliders = () => {
  // Находим все секции с логотипами
  const logoSections = document.querySelectorAll(".logo-slider");

  logoSections.forEach(section => {
    const swiperContainer = section.querySelector(".swiper");
    const btnPrev = section.querySelector(".logo-slider__btn--prev");
    const btnNext = section.querySelector(".logo-slider__btn--next");

    if (swiperContainer) {
      new Swiper(swiperContainer, {
        slidesPerView: 6, // 6 логотипов в ряд
        spaceBetween: 20, // Расстояние между ними
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        // Делаем адаптив, чтобы на телефонах всё не слиплось
        breakpoints: {
          320: { slidesPerView: 2, spaceBetween: 10 },
          576: { slidesPerView: 3, spaceBetween: 15 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
        },
      });
    }
  });
};
