const hightxt = document.querySelector('#highscore');
const scoretxt = document.querySelector('#score');
const lives = document.querySelector('#lives');
const soltxt = document.querySelector('#solution');

let countries;

let score = 0;
let high = 0;
let life = 3;

let image = document.querySelector('img');
let guess = document.querySelector('input');

function rando() {
  let x = Math.ceil(Math.random() * 249);
  return x;
}

(async function init() {
  countries = await (
    await fetch('https://restcountries.com/v3.1/all?fields=name,flags')
  ).json();
  let count = countries[rando()];
  image.src = count.flags.png;
  let solution = count.name.common.toLowerCase();
  soltxt.textContent = solution;

  document.querySelector('button').addEventListener('click', () => {
    let x = guess.value.toLowerCase();
    if (x == solution) {
      score++;
      scoretxt.textContent = 'Score: ' + score;
      guess.value = '';
      x = '';
      refresh();
    } else {
      reveal();
    }
  })

  document.querySelector('#skip').addEventListener('click', () => {
    reveal();
  });
})();

function refresh() {
  count = countries[rando()];
  image.src = count.flags.png;
  solution = count.name.common.toLowerCase();
  soltxt.textContent = solution;
  console.log(solution);
}

function reset() {
  score = 0;
  life = 3;
  scoretxt.textContent = 'Score: ' + score;
  lives.textContent = 'Life Counter : ✅ ✅ ✅';
  guess.value = '';
  soltxt.style.opacity = '0';
  refresh();
}

function reveal() {
  soltxt.style.opacity = '1';
  setTimeout(() => {
    refresh();
    liferundown();
    soltxt.style.opacity = '0';
  }, 2000);
}

function liferundown() {
  life -= 1;
  switch (life) {
    case 2:
      lives.textContent = 'Life Counter : ✅ ✅ ❌';
      break;
    case 1:
      lives.textContent = 'Life Counter : ✅ ❌ ❌';
      break;
    case 0:
      lives.textContent = 'Life Counter : ❌ ❌ ❌';
      soltxt.style.opacity = '1';
      setTimeout(() => {
        high = score || high;
        hightxt.textContent = 'Highscore: ' + high;
        reset();
      }, 2000);
      break;
  }
}