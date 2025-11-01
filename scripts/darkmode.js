const themeSwitch = document.getElementById('theme-switch');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const getCookie = (name) => {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
};

const setCookie = (name, value, days = 365) => {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
};

const enableDarkmode = () => {
    document.body.classList.add('dark-mode');
};

const disableDarkmode = () => {
    document.body.classList.remove('dark-mode');
};

const saved = getCookie('theme');
if (saved === 'dark') {
    enableDarkmode();
} else if (saved === 'light') {
    disableDarkmode();
} else if (prefersDarkScheme.matches) {
    enableDarkmode();
} else {
    disableDarkmode();
}

if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        setCookie('theme', isDark ? 'dark' : 'light');
    });
}

const torAvailability = document.querySelector('.tor-availability');
if (torAvailability && window.location.hostname.endsWith('.onion')) {
    torAvailability.style.display = 'none';
}
