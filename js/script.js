//Меню бургер
const menu = document.querySelector('.header__nav');
const menuBtn = document.querySelector('.menu-btn');
const menuLink = document.querySelectorAll('.header__link');
const menuOverlay = document.querySelector('.menu-overlay');

 menuBtn.onclick = function() {
  menu.classList.toggle('active');
  menuBtn.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  document.body.classList.toggle('lock');
};

for(let i = menuLink.length; i--;) {
  menuLink[i].onclick = function() {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('lock');
  }
}

menuOverlay.onclick = function() {
  menu.classList.toggle('active');
  menuBtn.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  document.body.classList.toggle('lock');
}
