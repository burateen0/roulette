
let money = 100;

function calcColumn(column) {
  const columnElement = document.querySelector(`.${column}`);
  columnElement.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const random = Math.floor(Math.random() * 10);
    const cellColor = (i % 2) ? 'middle' : '';
    columnElement.innerHTML += `
      <li class="${cellColor}">${random}</li>
    `;
  }
}

function updateMoneyDisplay() {
  document.querySelector('.money-display').textContent = `💰 Баланс: ${money}`;
}

function initialize() {
  const columns = ['col1', 'col2', 'col3'];
  columns.forEach(calcColumn);
  updateMoneyDisplay();
}

function resetAnimation(column) {
  const ulElement = document.querySelector(`.${column}`);
  ulElement.style.transition = 'none';
  ulElement.style.left = '0';
  setTimeout(() => {
    const randomDuration = Math.random() * 6 + 3; 
    ulElement.style.transition = `${randomDuration}s ease`; 
  }, 10);
}

let isStarted = false;

function start() {
  if (isStarted) return; // Блокируем повторный запуск
  isStarted = true; // Устанавливаем флаг, что игра началась

  if (money < 10) {
    alert("Недостаточно средств чтобы играть!");
    isStarted = false; // Разблокируем для новой попытки
    return;
  }

  money -= 10;
  updateMoneyDisplay();

  const columns = ['col1', 'col2', 'col3'];
  columns.forEach((column) => {
    calcColumn(column);
    resetAnimation(column);
  });

  const move = -150 * 15;
  const elm = (str) => document.querySelector(str);
  const elms = (str) => document.querySelectorAll(str);

  setTimeout(() => {
    columns.forEach((column) => {
      elm(`.${column}`).style.left = move + 'px';
    });
  }, 50);

  const index = -Math.floor((move + (elm('.scopeHidden').offsetWidth / 2) / -150) / 150) + 1;
  const results = columns.map((column) => parseInt(elms(`.${column} > li`)[index].textContent));

  setTimeout(() => {
    if (results[0] === results[1] && results[1] === results[2]) {
      setTimeout(() => {
        money += 10000; 
        alert("🎉 Джекпот! Вы выигрываете 10 000 монет!");
        updateMoneyDisplay(); 
        isStarted = false; 
      }, 1000);
    } else {
      updateMoneyDisplay();
      isStarted = false; // если джекпота нет
    }
    console.log(results);
  }, 900); // Таймер для завершения основной анимации
}


  // columns.forEach((column, i) => {
  //   elms(`.${column} > li`)[index].style.background = 'red';
  // });


window.onload = initialize;
