
const sockCount = Math.floor(Math.random() * 3) + 1;

const screenW = window.innerWidth - 120;
const screenH = window.innerHeight - 120;

let remaining = sockCount;

for (let i = 0; i < sockCount; i++) {
    const sock = document.createElement("div");
    sock.className = "sock";
    sock.id = "sock" + i;
    sock.textContent = "🧦";

    sock.style.left = (Math.random() * screenW) + "px";
    sock.style.top  = (Math.random() * screenH) + "px";

    sock.draggable = true;
    document.body.appendChild(sock);
}

let time = 5;
const timer = document.getElementById("timer");

const countdown = setInterval(() => {
    time--;
    timer.textContent = time;

    if (time <= 0) lose();
}, 1000);

let dragged = null;

document.querySelectorAll(".sock").forEach(sock => {
    sock.addEventListener("dragstart", e => {
        dragged = e.target;
    });
});

const bin = document.getElementById("bin");

bin.addEventListener("dragover", e => e.preventDefault());

bin.addEventListener("drop", e => {
    if (!dragged) return;

    dragged.style.display = "none";
    remaining--;

    if (remaining === 0) win();
});


function win() {
    clearInterval(countdown);
    window.location.href = "page_success.html";
}

function lose() {
    clearInterval(countdown);
    window.location.href = "../pageGameOver/gameOver.html";
}