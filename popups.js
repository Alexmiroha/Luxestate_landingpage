const popupLinks = document.querySelectorAll('.popup-link');
// for get all popups
const body = document.querySelector('body');
const html = document.querySelector('html');
// for get body and block global skroller
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
// чтоб не было двойных нажатий

const timeout = 800;
const timeout2 = 400;

if (popupLinks.length > 0) {
    // перевірка на існування попапів на сторінці
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        // перебираєм кожен попап і отримуєм в змінній popupLink
        popupLink.addEventListener("click", function (e) {
            // вішаєм подію по кліку
            const popupName = popupLink.getAttribute('href').replace('#', '');
            // реплейсить на батоні # на пусте місце
            const curentPopup = document.getElementById(popupName);
            // получає елемент по айді і закидає в змінну curentPopup
            popupOpen(curentPopup);
            // function for open pupup
            e.preventDefault();
            // убирає редірект
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close_popup');

if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            // шукає найближчий обєкт з класом popup від close-popup(хрестика)
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup_content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function bodyLock() {
    // функція для того, щоб не було здвига всього контента, коли скривається скролл
    const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';


    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    html.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}


function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}


function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
        html.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout2);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
})



















