// script.js

// 1) Helpers: get/set cookies
function setCookie(name, value, days = 30) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : '';
}

// 2) Language & Theme data
const langs = {
  en: {
    appName: 'kenz',
    welcome: 'Welcome to kenz!',
    skip: 'Skip',
    loginTitle: 'Login',
    userLabel: 'User',
    passLabel: 'Password',
    loginBtn: 'Sign In'
  },
  ar: {
    appName: 'كنز',
    welcome: 'مرحبًا بك في kenz!',
    skip: 'تخطي',
    loginTitle: 'تسجيل الدخول',
    userLabel: 'المستخدم',
    passLabel: 'كلمة المرور',
    loginBtn: 'دخول'
  }
};

// 3) Apply / Toggle Theme
let currentTheme = getCookie('theme') || 'light';
function applyTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
  setCookie('theme', theme);
}
function toggleTheme() {
  applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
}
applyTheme(currentTheme);

// 4) Apply / Toggle Language
let currentLang = getCookie('lang') || 'en';
function applyLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    el.textContent = langs[lang][key];
  });
  setCookie('lang', lang);
}
function toggleLang() {
  const next = currentLang === 'en' ? 'ar' : 'en';
  currentLang = next;
  applyLang(next);
}
applyLang(currentLang);

// 5) Welcome → Login flow
const welcome = document.getElementById('welcome-screen');
const loginScreen = document.getElementById('login-screen');
document.getElementById('skip-btn').addEventListener('click', () => {
  welcome.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  Toastify({
    text: langs[currentLang].loginTitle,
    duration: 1500,
    gravity: 'bottom',
    position: 'center'
  }).showToast();
});

// 6) Initialize Lottie animation
lottie.loadAnimation({
  container: document.getElementById('lottie-welcome'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets1.lottiefiles.com/packages/lf20_touohxv0.json'
});

// 7) Popper.js tooltip example
const themeBtn = document.querySelector('.controller button:first-child');
const tooltipEl = document.createElement('div');
tooltipEl.className = 'custom-tooltip';
tooltipEl.textContent = 'Toggle theme';
document.body.appendChild(tooltipEl);
Popper.createPopper(themeBtn, tooltipEl, { placement: 'top' });

// 8) Login form handler with SweetAlert2
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  Swal.fire({
    icon: 'success',
    title: langs[currentLang].loginBtn,
    text: `${document.getElementById('username').value} ✓`,
    showClass: { popup: 'swal2-show' }
  });
});
