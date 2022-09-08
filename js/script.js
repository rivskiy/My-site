//Мобильное меню

const menu = document.querySelector('.header__nav');
const menuBtn = document.querySelector('.menu-btn');
const menuLinks = document.querySelectorAll('.header__link');
const menuOverlay = document.querySelector('.menu-overlay');

function showMenu() {
  menu.classList.toggle('active');
  menuBtn.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  document.body.classList.toggle('lock');
};

menuBtn.onclick = function() {
  showMenu();
};

menuOverlay.onclick = function() {
 showMenu();
};

for (const link of menuLinks) {
  link.onclick = function() {
    showMenu();
  };
};

