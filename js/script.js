//                          Мобильное меню

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

menuBtn.addEventListener('click', showMenu);

menuOverlay.addEventListener('click', showMenu);

for (const link of menuLinks) {
  link.addEventListener('click', showMenu);
};

//                                  Слайдер

const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const sidebar = document.querySelector('.slider__sidebar');
const mainSlide = document.querySelector('.slider__main-slide');
const container = document.querySelector('.slider');
const slidesCount = mainSlide.querySelectorAll('.slider__item').length;

let activeSlideIndex = 0;

sidebar.style.top = `-${(slidesCount - 1) * 100}%`;

upBtn.addEventListener('click', () => {
    chengeSlide('up');
});

downBtn.addEventListener('click', () => {
    chengeSlide('down');
});

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
        chengeSlide('up');
    } else if (event.key === 'ArrowDown') {
        chengeSlide('down');
    };
});

function chengeSlide(direction) {
    if (direction === 'up') {
        activeSlideIndex++;
        if (activeSlideIndex === slidesCount) {
            activeSlideIndex = 0;
        };
    } else if (direction === 'down') {
        activeSlideIndex--;
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesCount - 1;
        };
    };

    const height = container.clientHeight;

    mainSlide.style.transform =`translateY(-${activeSlideIndex * height}px)`;

    sidebar.style.transform =`translateY(${activeSlideIndex * height}px)`;
};

//                                  XOGame

const area = document.querySelector('.xo-game__area');
const contentContainer = document.querySelector('.xo-game__content');
const modalResult = document.querySelector('.xo-game__modal-result');
const overlay = document.querySelector('.xo-game__modal-overlay');
const btnClose = document.querySelector('.xo-game__btn-close');
const boxes = document.querySelectorAll('.xo-game__box');

let move = 0;
let result = '';

area.addEventListener('click', e => {
    if (e.target.className === 'xo-game__box') {
        if (move % 2 === 0) {
          e.target.innerHTML = 'X'
          e.target.classList.add('no-select');
          move++;
          check();
          setTimeout(zeroStep, 500);
        };
    };
});

function zeroStep() {
  for (let i = 0; i < boxes.length; i++) {
      let r = Math.floor(Math.random() * 9);
      if (boxes[r].innerHTML !== 'X' && boxes[r].innerHTML !== 'O') {
          boxes[r].innerHTML = 'O';
          move++;
          console.log(boxes[r]);
          check();
          break;
      };
  };
};

function check() {
    const arr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (i = 0; i < arr.length; i++) {
        if (boxes[arr[i][0]].innerHTML === 'X' && boxes[arr[i][1]].innerHTML === 'X' && boxes[arr[i][2]].innerHTML === 'X') {
            result = 'крестики';
            howWin(result);
        } else if (boxes[arr[i][0]].innerHTML === 'O' && boxes[arr[i][1]].innerHTML === 'O' && boxes[arr[i][2]].innerHTML === 'O') {
            result = 'нолики';
            howWin(result);
        } else if (move === 9) {
            noWin();
        };
    };
};

function howWin(winner) {
    contentContainer.innerHTML = `Победили ${winner}!`;
    modalResult.style.display = 'block';
}

function noWin() {
    contentContainer.innerHTML = `Ничья!`;
    modalResult.style.display = 'block';
}

function closeModal() {
    modalResult.style.display = 'none';
    location.reload();
}

overlay.addEventListener('click', closeModal);

btnClose.addEventListener('click', closeModal);

//                                AIMGame

const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.aim-game__screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const newBtn = document.querySelector('#new');

const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']


let time = 0;
let score = 0;

startBtn.addEventListener('click', () => {
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('aim-game__time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    };
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    };
});

newBtn.addEventListener('click', () => {
 location.reload();
});


function startGame() {
    setInterval(decreeseTime, 1000);
    createRandomCircle();
    setTime(time);
};

function decreeseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        };
        setTime(current);
    };
};

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
};

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class="aim-game__points">${score}</span></h1>`;
    newBtn.style.display = 'block';
};

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 40);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = getRandomColor();

    board.append(circle);
};

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
};
