let money = 1000;

function calcColumn(column) {
  const columnElement = document.querySelector(`.${column}`);
  columnElement.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const random = Math.floor(Math.random() * 7) + 1;
    const cellColor = (i % 2) ? 'middle' : '';
    columnElement.innerHTML += `<li class="${cellColor}">${random}</li>`;
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
    ulElement.style.transition = `0.7s ease`;
  }, 10);
}


function start() {
  if (money < 10) {
    alert("Недостаточно средств чтобы играть!");
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

  setTimeout(() => {
    const index = -Math.floor((move + (elm('.scopeHidden').offsetWidth / 2) / -150) / 150) + 1;
    const results = columns.map((column) => parseInt(elms(`.${column} > li`)[index].textContent));

    if (results[0] === results[1] && results[1] === results[2]) {
      money += 777777;
      alert("🎉 Джекпот! Вы выигрываете 777 777 монет!");
    }

    updateMoneyDisplay();
    console.log(results);
  }, 700);
}


window.onload = initialize;
