export const initCatalog = () => {
  const filterBtns = document.querySelectorAll(".js-filter-btn");

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();

      filterBtns.forEach(b => {
        b.classList.remove('active')
        b.classList.add("white-btn");
      });

      btn.classList.add('active');
      btn.classList.remove('white-btn')
    });
  });

};
