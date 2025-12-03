
function placeTargetsRandomly() {
    const targets = document.querySelectorAll(".target");
    const screenW = window.innerWidth - 170;
    const screenH = window.innerHeight - 70;

    targets.forEach(t => {
        const x = Math.random() * screenW;
        const y = Math.random() * screenH;

        t.style.left = x + "px";
        t.style.top = y + "px";
    });
}

placeTargetsRandomly();

let time = 5;
const timerDiv = document.getElementById("timer");

const countdown = setInterval(() => {
    time--;
    timerDiv.textContent = time;

    if (time <= 0) {
        clearInterval(countdown);
        window.location.href = "page_fail.html";
    }
}, 1000);

let dragged = null;

document.querySelectorAll(".item").forEach(elem => {
    elem.addEventListener("dragstart", e => {
        dragged = e.target;
    });
});

document.querySelectorAll(".target").forEach(target => {
    target.addEventListener("dragover", e => e.preventDefault());

    target.addEventListener("drop", e => {
        if (!dragged) return;

        if (dragged.id === target.dataset.color) {
            target.style.background = "#b6fcb6";
            target.textContent = "✔ Correct";
            dragged.style.opacity = "0.5";
            dragged.draggable = false;
            checkWin();
        } else {
            target.style.background = "#fcb6b6";
            target.textContent = "❌ Faux";
            clearInterval(countdown);
            window.location.href = "page_fail.html";
        }
    });
});

function checkWin() {
    const allCorrect = [...document.querySelectorAll(".target")]
        .every(t => t.textContent === "✔ Correct");

    if (allCorrect) {
        clearInterval(countdown);
        window.location.href = "page_success.html";
    }
}