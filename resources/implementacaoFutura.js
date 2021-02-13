// function para mudar img
function alterarImagem(objeto, caminhoNovaImagem) {

  document.getElementById(objeto).src = caminhoNovaImagem;

}


// theme switcher             
const themeSwitcher = document.getElementById("theme-switch");

themeSwitcher.checked = false;
function clickHandler() {
  if (this.checked) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
  totalImg()
  totalLightbackground()
}
themeSwitcher.addEventListener("click", clickHandler);

window.onload = checkTheme();
window.onload = totalImg();


function checkTheme() {
  const localStorageTheme = localStorage.getItem("theme");

  if (localStorageTheme !== null && localStorageTheme === "dark") {
    // set the theme of body
    document.body.className = localStorageTheme;

    // adjust the slider position
    const themeSwitch = document.getElementById("theme-switch");
    themeSwitch.checked = true;
  }
}

// implementando interatividade no card total
var totalImagem = './assets/total.svg'
function balanceCheck() {
  var balanceValue = Transaction.total()
  const localStorageTheme = localStorage.getItem("theme");
  if (localStorageTheme !== null && localStorageTheme === "dark" && balanceValue < 0) {
    totalImagem = './assets/negativedarktotal.svg'
  } else {
    totalImagem = './assets/darktotal.svg'
  }

}

function totalLightbackground() {
  var balanceValue = Transaction.total()
  const localStorageTheme = localStorage.getItem("theme");
  if (localStorageTheme !== null && localStorageTheme === "light" && balanceValue < 0) {
    document.getElementById('totalcard').style.backgroundColor = '#e92929'
  } else {
    document.getElementById('totalcard').style.backgroundColor = ''
  }
}

function totalImg() {
  const localStorageTheme = localStorage.getItem("theme");
  var totalSvg = document.getElementById('imgtotal');
  balanceCheck()
  if (localStorageTheme !== null && localStorageTheme === "dark") {
    // set img of total

    totalSvg.src = totalImagem

  } else {
    totalSvg.src = './assets/total.svg'
  }
}
