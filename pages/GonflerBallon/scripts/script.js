const clicksNeeded = Math.floor(Math.random() * 10) + 20;
let clicks = 0;

let time = 5;
const timerEl = document.getElementById("timer");
const countdown = setInterval(() => {
    time--;
    timerEl.textContent = time;
    if (time <= 0) lose();
}, 1000);

const balloon = document.getElementById("balloon");
const bar = document.getElementById("progress-bar");
const percent = document.getElementById("percent");

document.getElementById("click-area").addEventListener("click", () => {
    clicks++;

    const progress = Math.min(100, Math.floor((clicks / clicksNeeded) * 100));

    bar.style.width = progress + "%";
    percent.textContent = progress + "%";

    const scale = 1 + progress / 80; // gonfle doucement
    balloon.style.transform = `scale(${scale})`;

    if (progress >= 100) win();
});



function win() {
    clearInterval(countdown);
    window.location.href = "page_success.html";
}

function lose() {
    clearInterval(countdown);
    window.location.href = "page_fail.html";
}