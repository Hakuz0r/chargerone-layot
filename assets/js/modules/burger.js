export function burgerMenu() {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("ChargerOne theme scripts loaded.");

    // Мобильное меню
    const burger = document.querySelector(".header__burger");
    const mobileMenu = document.createElement("div");
    mobileMenu.classList.add("header__mobile-menu");

    // Переносим контент в мобильное меню
    // Нам нужно клонировать поиск и навигацию
    const search = document.querySelector(".header-search");
    const navList = document.querySelector(".header__nav-list");
    const catalogBtn = document.querySelector(".header__nav-catalog");
    const control = document.querySelector(".header__control");

    if (burger && navList) {
      // Клонируем элементы, чтобы не ломать десктопную верстку
      // (хотя можно и переносить, если они скрыты на десктопе, но клонирование безопаснее для адаптива)
      // В данном случае, так как мы скрываем элементы через CSS media queries,
      // лучше клонировать их в мобильное меню.

      if (search) {
        const mobileSearch = search.cloneNode(true);
        mobileMenu.appendChild(mobileSearch);
      }

      if (catalogBtn) {
        const mobileCatalog = catalogBtn.cloneNode(true);
        mobileMenu.appendChild(mobileCatalog);
      }

      const mobileNav = navList.cloneNode(true);
      mobileMenu.appendChild(mobileNav);

      if (control) {
        const mobileControl = control.cloneNode(true);
        mobileMenu.appendChild(mobileControl);
      }

      // Добавляем мобильное меню в header
      document.querySelector(".header").appendChild(mobileMenu);

      // Обработчик клика
      burger.addEventListener("click", function () {
        this.classList.toggle("active");
        mobileMenu.classList.toggle("active");

        // Анимация иконки бургера
        const spans = this.querySelectorAll("span");
        if (this.classList.contains("active")) {
          spans[0].style.transform = "rotate(45deg) translate(7px, 5px)";
          spans[1].style.opacity = "0";
          spans[2].style.transform = "rotate(-45deg) translate(8px, -5px)";
          document.body.style.overflow = "hidden"; // Блокируем скролл
        } else {
          spans[0].style.transform = "none";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "none";
          document.body.style.overflow = ""; // Разблокируем скролл
        }
      });
    }
  });
}
