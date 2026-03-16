import noUiSlider from "nouislider";

export const initFilterSliders = () => {
  const priceSlider = document.getElementById("filter-price-slider");
  const powerSlider = document.getElementById("filter-power-slider");

  const rubFormatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });

  if (priceSlider) {
    const inputMinVisible = document.getElementById("filter-price-min-visible");
    const inputMaxVisible = document.getElementById("filter-price-max-visible");
    const inputMinReal = document.getElementById("filter-price-min-real");
    const inputMaxReal = document.getElementById("filter-price-max-real");

    const rubFormatter = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    });

    noUiSlider.create(priceSlider, {
      start: [300000, 440000],
      connect: true,
      range: {
        min: 0,
        max: 1000000,
      },
      format: {
        to: value => Math.round(value),
        // Жестко очищаем строку от всего, кроме цифр, прямо в ядре слайдера
        from: value => Number(String(value).replace(/\D/g, "")),
      },
    });

    priceSlider.noUiSlider.on("update", function (values, handle) {
      const rawValue = values[handle];
      const formattedValue = rubFormatter.format(rawValue);

      if (handle === 0) {
        if (inputMinVisible) inputMinVisible.value = formattedValue;
        if (inputMinReal) inputMinReal.value = rawValue;
      } else {
        if (inputMaxVisible) inputMaxVisible.value = formattedValue;
        if (inputMaxReal) inputMaxReal.value = rawValue;
      }
    });

    // Новая пуленепробиваемая функция ввода
    const setPriceSliderValue = (index, inputElement) => {
      // Убираем всё лишнее и превращаем в чистое число
      let cleanValue = String(inputElement.value).replace(/\D/g, "");
      // Если стерли всё, ставим 0, иначе парсим число
      cleanValue = cleanValue === "" ? 0 : Number(cleanValue);

      const arr = [null, null];
      arr[index] = cleanValue;

      // Двигаем ползунок
      priceSlider.noUiSlider.set(arr);

      // ПРИНУДИТЕЛЬНО возвращаем красивый формат (с пробелами и ₽) в инпут.
      // Это спасает ситуацию, если ввели то же самое число (например было 250 000,
      // а ввели 250000), ползунок не сдвинулся, и событие update не отработало.
      const currentValues = priceSlider.noUiSlider.get();
      inputElement.value = rubFormatter.format(currentValues[index]);
    };

    // Функция для перехвата Enter
    const preventEnterSubmit = function (e) {
      if (e.key === "Enter") {
        e.preventDefault(); // Блокируем перезагрузку страницы
        this.blur(); // Снимаем фокус, чтобы сработало событие "change"
      }
    };

    if (inputMinVisible) {
      inputMinVisible.addEventListener("change", function (e) {
        setPriceSliderValue(0, e.target);
      });
      inputMinVisible.addEventListener("keydown", preventEnterSubmit);
    }

    if (inputMaxVisible) {
      inputMaxVisible.addEventListener("change", function (e) {
        setPriceSliderValue(1, e.target);
      });
      inputMaxVisible.addEventListener("keydown", preventEnterSubmit);
    }
  }

  // 2. Инициализация ползунка МОЩНОСТИ
  if (powerSlider) {
    const inputMinVisible = document.getElementById("filter-power-min-visible");
    const inputMaxVisible = document.getElementById("filter-power-max-visible");
    const inputMinReal = document.getElementById("filter-power-min-real");
    const inputMaxReal = document.getElementById("filter-power-max-real");

    noUiSlider.create(powerSlider, {
      start: [30, 400],
      connect: true,
      range: {
        min: 0,
        max: 500,
      },
      format: {
        to: value => Math.round(value),
        from: value => Number(String(value).replace(/\D/g, "")),
      },
    });

    powerSlider.noUiSlider.on("update", function (values, handle) {
      const rawValue = values[handle];
      const formattedValue = `${rawValue} кВт`;

      if (handle === 0) {
        if (inputMinVisible) inputMinVisible.value = formattedValue;
        if (inputMinReal) inputMinReal.value = rawValue;
      } else {
        if (inputMaxVisible) inputMaxVisible.value = formattedValue;
        if (inputMaxReal) inputMaxReal.value = rawValue;
      }
    });

    // Функция для очистки и установки значения (аналогично цене)
    const setPowerSliderValue = (index, inputElement) => {
      let cleanValue = String(inputElement.value).replace(/\D/g, "");
      cleanValue = cleanValue === "" ? 0 : Number(cleanValue);

      const arr = [null, null];
      arr[index] = cleanValue;
      powerSlider.noUiSlider.set(arr);

      // Принудительно возвращаем "кВт" в инпут, если значение не изменилось
      const currentValues = powerSlider.noUiSlider.get();
      inputElement.value = `${currentValues[index]} кВт`;
    };

    // Функция для перехвата Enter
    const preventEnterSubmit = function (e) {
      if (e.key === "Enter") {
        e.preventDefault(); // Блокируем перезагрузку страницы
        this.blur(); // Снимаем фокус
      }
    };

    if (inputMinVisible) {
      inputMinVisible.addEventListener("change", function (e) {
        setPowerSliderValue(0, e.target);
      });
      inputMinVisible.addEventListener("keydown", preventEnterSubmit);
    }

    if (inputMaxVisible) {
      inputMaxVisible.addEventListener("change", function (e) {
        setPowerSliderValue(1, e.target);
      });
      inputMaxVisible.addEventListener("keydown", preventEnterSubmit);
    }
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
