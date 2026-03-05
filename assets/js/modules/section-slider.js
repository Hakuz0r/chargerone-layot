import Swiper from "swiper/bundle";

export const initSectionSliders = () => {
  // Находим все секции, построенные по нашему универсальному шаблону
  const sliderSections = document.querySelectorAll(".section-slider");

  sliderSections.forEach(section => {
    // Ищем контейнер и кнопки только ВНУТРИ текущей секции
    const swiperContainer = section.querySelector(".swiper");
    const btnPrev = section.querySelector(".section-slider__btn--prev");
    const btnNext = section.querySelector(".section-slider__btn--next");

    if (swiperContainer) {
      new Swiper(swiperContainer, {
        slidesPerView: 4, // По умолчанию 4 карточки
        spaceBetween: 20, // Расстояние между ними
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        // Адаптив
        breakpoints: {
          320: {
            slidesPerView: 1.2, // На мобилке видно одну и кусочек второй
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2.5, // На планшете 2 с половиной
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4, // На десктопе 4
            spaceBetween: 20,
          },
        },
      });
    }
  });
};
