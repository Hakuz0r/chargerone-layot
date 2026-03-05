import noUiSlider from "nouislider";

export const initRangeSlider = () => {
  const slider = document.getElementById("power-slider");

  if (slider) {
    noUiSlider.create(slider, {
      start: [30, 240], // Начальные значения мощности в кВт
      connect: true,
      step: 1,
      range: {
        min: 0,
        max: 360,
      },
    });

    const inputMin = document.getElementById("power-input-min");
    const inputMax = document.getElementById("power-input-max");
    const inputs = [inputMin, inputMax];

    slider.noUiSlider.on("update", (values, handle) => {
      inputs[handle].value = Math.round(values[handle]);
    });

    inputs.forEach((input, index) => {
      input.addEventListener("change", () => {
        slider.noUiSlider.setHandle(index, input.value);
      });
    });
  }
};
