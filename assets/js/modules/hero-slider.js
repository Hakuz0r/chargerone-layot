// Импортируем сам Swiper и модуль навигации из node_modules
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export const initHeroSlider = () => {
  // Ищем слайдер на странице
  const sliderElement = document.querySelector('.hero-slider');
  
  // Если слайдера нет (например, мы на другой странице), прерываем функцию
  if (!sliderElement) return;

  // Инициализируем Swiper
  new Swiper(sliderElement, {
    modules: [Navigation],
    loop: false, // Важно! Оставляем false, чтобы работала прозрачность кнопок на 1 и 5 слайде
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};