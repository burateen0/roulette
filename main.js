
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
  if (isStarted) return;
  isStarted = true;

  if (money < 10) {
    alert("Недостаточно средств чтобы играть!");
    isStarted = false;
    return;
  }

  money -= 10;
  updateMoneyDisplay();

  const columns = ['col1', 'col2', 'col3'];
  const isJackpot = Math.random() < 0.11;
  let jackpotNumber = Math.floor(Math.random() * 10);

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

  setTimeout(() => {
    const index = -Math.floor((move + (elm('.scopeHidden').offsetWidth / 2) / -150) / 150) + 1;

    if (isJackpot) {
      // Вставляем одинаковое число в центр
      columns.forEach((column) => {
        elms(`.${column} > li`)[index].textContent = jackpotNumber;
      });
    }

    const results = columns.map((column) => parseInt(elms(`.${column} > li`)[index].textContent));

    setTimeout(() => {
      if (results[0] === results[1] && results[1] === results[2]) {
        setTimeout(() => {
          money += 10000;
          alert("🎉 Джекпот! Вы выигрываете 10 000 монет!");
          updateMoneyDisplay();
          isStarted = false;
        }, 100);
      } else {
        updateMoneyDisplay();
        isStarted = false;
      }
      console.log(results);
    }, 999); 
  }, 600); 
}



  // columns.forEach((column, i) => {
  //   elms(`.${column} > li`)[index].style.background = 'red';
  // });


window.onload = initialize;
