export function initAboutAccordion() {
  const interactiveCards = document.querySelectorAll('[data-accordion]');

  interactiveCards.forEach(card => {
    const toggleBtn = card.querySelector('.feature-card__toggle');
    const collapsePanel = card.querySelector('.feature-card__collapse');

    if (!toggleBtn || !collapsePanel) return;

    toggleBtn.addEventListener('click', () => {
      // Переключаем класс для запуска CSS-анимации
      const isOpen = collapsePanel.classList.toggle('is-open');
      
      // Обновляем атрибут доступности
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });
  });
}