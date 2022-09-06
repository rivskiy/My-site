//Меню бургер
const menu = document.querySelector('.header__nav');
const menuBtn = document.querySelector('.menu-btn');
const menuLink = document.querySelectorAll('.header__link');

  menuBtn.onclick = function() {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    document.body.classList.toggle('lock')
  };

for(let i = menuLink.length; i--;) {
  menuLink[i].onclick = function() {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
  }
}
