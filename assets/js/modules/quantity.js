export const initQuantityCounters = () => {
  const quantityBlocks = document.querySelectorAll(".quantity");

  quantityBlocks.forEach(block => {
    const btnMinus = block.querySelector(".quantity__btn--minus");
    const btnPlus = block.querySelector(".quantity__btn--plus");
    const input = block.querySelector(".quantity__input");

    if (!btnMinus || !btnPlus || !input) return;

    btnMinus.addEventListener("click", () => {
      let currentValue = parseInt(input.value, 10);
      if (currentValue > 1) {
        input.value = currentValue - 1;
      }
    });

    btnPlus.addEventListener("click", () => {
      let currentValue = parseInt(input.value, 10);
      // Можно добавить проверку на max значение, если нужно
      input.value = currentValue + 1;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
};
