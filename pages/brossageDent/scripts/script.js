document.addEventListener("DOMContentLoaded", function (){
    const mouth = document.getElementById("mouth");
    const brush = document.getElementById("toothbrush");
    const info = document.getElementById("info");
    let calculBrossage = Math.random();

    let brushing = false;
    let startX = 0;
    let lastDir = null;
    let passes = 0;
    const minMove = 80; // distance min pour valider une direction

    function addSparkle(x, y) {
        const s = document.createElement("div");
        s.classList.add("sparkle");
        s.style.left = x + "px";
        s.style.top = y + "px";
        mouth.appendChild(s);
        setTimeout(() => s.remove(), 450);
    }

    function start(e) {
        brushing = true;
        brush.style.display = "block";
        startX = (e.clientX || e.touches[0].clientX);
        lastDir = null;
    }

    function move(e) {
        let x = (e.clientX || e.touches[0].clientX);
        let y = (e.clientY || e.touches[0].clientY);

        // Faire suivre la brosse
        brush.style.left = (x - 50) + "px";
        brush.style.top = (y - 20) + "px";

        if (!brushing) return;

        let diff = x - startX;
        if (Math.abs(diff) > minMove) {
            let dir = diff > 0 ? "right" : "left";
            if (dir !== lastDir) {
                lastDir = dir;
                passes++;
                info.textContent = `Passes : ${passes} / 3`;

                const rect = mouth.getBoundingClientRect();
                addSparkle(
                    x - rect.left,
                    rect.height / 2
                );

                if (passes >= 3) {
                    if (calculBrossage > 0.7) window.close();
                    info.textContent = "✨ Victoire ! ✨";
                    brushing = false;
                    brush.style.display = "none";
                }
            }
        }
    }

    function end() {
        brushing = false;
        brush.style.display = "none";
    }

// Souris
    mouth.addEventListener("mousedown", start);
    mouth.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);

// Tactile
    mouth.addEventListener("touchstart", start);
    mouth.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);

});
