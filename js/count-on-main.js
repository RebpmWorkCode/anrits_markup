let date = new Date()
let dateY = date.getFullYear() - 2000

document.getElementById("oldYearVal").innerHTML = dateY;


function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let q_online = getRandom(2, 30);

document.getElementById("qOnline").innerHTML = q_online;

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

let transactionsCarriedCount = getCookie('transactionsCarriedCount');
if (!transactionsCarriedCount) {
    transactionsCarriedCount = 15000;
    setCookie('transactionsCarriedCount', transactionsCarriedCount, {expires: new Date(Date.now() + 86400e7)}) //+20 year
    setCookie('transactionsCarriedCounter', true, {expires: new Date(Date.now() + 86400e3)}) //+1 day
}

let transactionsCarriedCounter = getCookie('transactionsCarriedCounter');
if (!transactionsCarriedCounter) {
    transactionsCarriedCount = Number(transactionsCarriedCount);
    transactionsCarriedCount += 4;
    setCookie('transactionsCarriedCount', transactionsCarriedCount, {expires: new Date(Date.now() + 86400e7)}) //+20 year
    setCookie('transactionsCarriedCounter', true, {expires: new Date(Date.now() + 86400e3)}) //+1 day
}
document.getElementById("transactionsCarried").innerHTML = transactionsCarriedCount;
