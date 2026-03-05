export const initModals = () => {
  // Находим кнопку, которая должна открывать модалку
  // Добавь класс .js-open-modal к кнопке "Подобрать" в HTML!
  const openBtns = document.querySelectorAll(".js-open-modal");
  const modal = document.getElementById("modal-selection");

  // Элементы, которые закрывают модалку (крестик и темный фон)
  const closeBtns = document.querySelectorAll("[data-close]");

  if (!modal) return;

  // Открытие
  openBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      modal.classList.add("is-active");
      document.body.style.overflow = "hidden"; // Запрещаем скролл сайта под модалкой
    });
  });

  // Закрытие
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.remove("is-active");
      document.body.style.overflow = ""; // Возвращаем скролл
    });
  });
};
