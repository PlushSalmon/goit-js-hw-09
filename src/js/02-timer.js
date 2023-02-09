// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import Notiflix from 'notiflix';

// const buttonStart = document.querySelector("button[data-start]")
// const days = document.querySelector("span[data-days]")
// const hours = document.querySelector("span[data-hours]")
// const minutes = document.querySelector("span[data-minutes]")
// const seconds = document.querySelector("span[data-seconds]")
// const text = document.querySelector("#datetime - picker")

// buttonStart.disabled = true

// --------------------------------------------------------------

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

btnStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Будь ласка, виберіть дату в майбутньому', { fontSize: '15px', },);
            btnStart.disabled = true;
        } else {
            Notiflix.Notify.success('Вітаю, врубайте відлік', { fontSize: '15px', },);
            btnStart.disabled = false;
        }
    },
};

flatpickr(text, options);

function convertMs(ms) {
    // Кількість мілісекунд на одиницю часу
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Решта днів
    const days = Math.floor(ms / day);
    // Решта часів
    const hours = Math.floor((ms % day) / hour);
    // Решта хвилин
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Решта секунд
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

btnStart.addEventListener('click', () => {
    let timer = setInterval(() => {
        let countdown = new Date(text.value) - new Date();
        btnStart.disabled = true;
        if (countdown >= 0) {
            let timeObject = convertMs(countdown);
            days.textContent = addLeadingZero(timeObject.days);
            hours.textContent = addLeadingZero(timeObject.hours);
            minutes.textContent = addLeadingZero(timeObject.minutes);
            seconds.textContent = addLeadingZero(timeObject.seconds);
            if (countdown <= 10000) {
                timerHtml.style.color = 'tomato';
            }
        } else {
            Notiflix.Notify.success('Зворотний відлік завершено', { fontSize: '15px', },);
            timerHtml.style.color = 'black';
            clearInterval(timer);
        }
    }, 1000);
});