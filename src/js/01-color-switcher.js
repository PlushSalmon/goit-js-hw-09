const buttonStart = document.querySelector("button[data-start]");
const buttonStop = document.querySelector("button[data-stop]");
let timerId = null

buttonStop.disabled = true
buttonStart.addEventListener("click", () => {
    document.body.style.backgroundColor = getRandomHexColor ()
    buttonStart.disabled = true
    buttonStop.disabled = false
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor() ;
    }, 1000);
});

buttonStop.addEventListener("click", () => {
    buttonStop.disabled = true
    buttonStart.disabled = false
    clearInterval(timerId);
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}