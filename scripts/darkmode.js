const themeSwitch = document.getElementById('theme-switch');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
let currentTheme = localStorage.getItem('theme');

const enableDarkmode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'active');
};

const disableDarkmode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.removeItem('dark-mode');
};

if (currentTheme === 'dark') {
    enableDarkmode();
} else if (currentTheme === null && prefersDarkScheme.matches) {
    enableDarkmode();
} else {
    disableDarkmode();
}

themeSwitch.addEventListener('click', () => {
    darkMode = localStorage.getItem('dark-mode');
    if (darkMode !== 'active') {
        enableDarkmode();
    } else {
        disableDarkmode();
    }
});