import Swiper from "swiper/bundle";

export const initReviewSliders = () => {
  const reviewSections = document.querySelectorAll(".reviews-slider");

  reviewSections.forEach(section => {
    const swiperContainer = section.querySelector(".swiper");
    const btnPrev = section.querySelector(".reviews-slider__btn--prev");
    const btnNext = section.querySelector(".reviews-slider__btn--next");

    if (swiperContainer) {
      new Swiper(swiperContainer, {
        slidesPerView: 3, // 3 отзыва на десктопе
        spaceBetween: 30, // Расстояние между ними
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        },
      });
    }
  });
};
