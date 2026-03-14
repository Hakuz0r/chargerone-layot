import noUiSlider from "nouislider"; // Путь зависит от твоей сборки

export const initFilterSliders = () => {
  // Находим все блоки слайдеров
  const priceSlider = document.getElementById("filter-price-slider");
  const powerSlider = document.getElementById("filter-power-slider");

  // 1. Инициализация ползунка ЦЕНЫ
  if (priceSlider) {
    const inputMin = document.getElementById("filter-price-min");
    const inputMax = document.getElementById("filter-price-max");

    noUiSlider.create(priceSlider, {
      start: [300000, 440000], // Стартовые значения из макета
      connect: true,
      range: {
        min: 0,
        max: 1000000,
      },
      format: {
        to: value => Math.round(value),
        from: value => Math.round(value),
      },
    });

    // Синхронизируем слайдер с инпутами
    priceSlider.noUiSlider.on("update", function (values, handle) {
      if (handle === 0) {
        inputMin.value = values[0];
      } else {
        inputMax.value = values[1];
      }
    });

    // Если вписали руками в инпут - двигаем слайдер
    inputMin.addEventListener("change", function () {
      priceSlider.noUiSlider.set([this.value, null]);
    });
    inputMax.addEventListener("change", function () {
      priceSlider.noUiSlider.set([null, this.value]);
    });
  }

  // 2. Инициализация ползунка МОЩНОСТИ
  if (powerSlider) {
    const inputMin = document.getElementById("filter-power-min");
    const inputMax = document.getElementById("filter-power-max");

    noUiSlider.create(powerSlider, {
      start: [30, 400],
      connect: true,
      range: {
        min: 0,
        max: 500,
      },
      format: {
        to: value => Math.round(value),
        from: value => Math.round(value),
      },
    });

    powerSlider.noUiSlider.on("update", function (values, handle) {
      if (handle === 0) {
        inputMin.value = values[0];
      } else {
        inputMax.value = values[1];
      }
    });

    inputMin.addEventListener("change", function () {
      powerSlider.noUiSlider.set([this.value, null]);
    });
    inputMax.addEventListener("change", function () {
      powerSlider.noUiSlider.set([null, this.value]);
    });
  }
};

// accordions

export const initAccordions = () => {
  // Ищем все группы фильтров, которые являются аккордеонами
  const accordions = document.querySelectorAll(".filter-group--accordion");

  accordions.forEach(accordion => {
    const toggleBtn = accordion.querySelector(".filter-group__toggle");

    if (!toggleBtn) return;

    // Вешаем клик на кнопку
    toggleBtn.addEventListener("click", e => {
      e.preventDefault(); // На всякий случай блокируем стандартное поведение
      // Тогглим (переключаем) класс is-open на самом родительском блоке
      accordion.classList.toggle("is-open");
    });
  });
};
