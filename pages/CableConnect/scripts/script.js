function placeTargetsRandomly() {
    const targets = document.querySelectorAll(".target");
    const W = window.innerWidth - 180;
    const H = window.innerHeight - 60;

    targets.forEach(t => {
        t.style.left = (Math.random() * W) + "px";
        t.style.top = (Math.random() * H) + "px";
    });
}
placeTargetsRandomly();

let time = 5;
const timer = document.getElementById("timer");

const countdown = setInterval(() => {
    time--;
    timer.textContent = time;
    if (time <= 0) {
        clearInterval(countdown);
        window.location.href = "../pageGameOver/gameOver.html";
    }
}, 1000);

let dragged = null;
const cable = document.getElementById("cable");

document.querySelectorAll(".item").forEach(elem => {
    elem.addEventListener("dragstart", e => {
        dragged = e.target;

        const r = dragged.getBoundingClientRect();
        cable.setAttribute("x1", r.right);
        cable.setAttribute("y1", r.top + r.height / 2);

        cable.setAttribute("visibility", "visible");

        document.addEventListener("dragover", drawCable);
    });

    elem.addEventListener("dragend", () => {
        cable.setAttribute("visibility", "hidden");
        document.removeEventListener("dragover", drawCable);
    });
});

function drawCable(e) {
    cable.setAttribute("x2", e.clientX);
    cable.setAttribute("y2", e.clientY);

    const colorMap = { rouge: "#e63946", jaune: "#ffb703", bleu: "#0077b6" };
    cable.setAttribute("stroke", colorMap[dragged.id]);
}

document.querySelectorAll(".target").forEach(target => {
    target.addEventListener("dragover", e => e.preventDefault());

    target.addEventListener("drop", e => {
        if (!dragged) return;

        const good = dragged.id === target.dataset.color;

        if (good) {
            target.style.background = "#90ee90";
            target.textContent = "✔ Correct";
            dragged.style.opacity = "0.4";
            dragged.draggable = false;
            checkWin();
        } else {
            target.style.background = "#ff7b7b";
            target.textContent = "❌ Faux";
            clearInterval(countdown);
            window.location.href = "page_fail.html";
        }
    });
});

function checkWin() {
    const ok = [...document.querySelectorAll(".target")]
        .every(t => t.textContent === "✔ Correct");
    if (ok) {
        clearInterval(countdown);
        window.location.href = "page_success.html";
    }
}