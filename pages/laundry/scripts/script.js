
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

// Fonction appelée quand le temps est écoulé
function onTimeUp() {
    lose();
}

// Initialiser le timer 5 secondes
gameTimer = new TimerBomb(5000, onTimeUp);
gameTimer.start();

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
    gameTimer.stop();

    if (typeof audioManager !== 'undefined') {
        audioManager.playWinSound();
    }

    setTimeout(() => {
        window.location.href = "page_success.html";
    }, 1000);
}

function lose() {
    clearInterval(countdown);
    window.location.href = "../pageGameOver/gameOver.html";
}