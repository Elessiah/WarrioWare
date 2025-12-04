document.addEventListener('DOMContentLoaded', function () {
    const mouth = document.getElementById("mouth");
    const info = document.getElementById("info");
    let calculBrossage = Math.random();

    let isBrushing = false;
    let startX = 0;
    let lastDirection = null;
    let passes = 0;
    const threshold = 80; // distance min pour valider une direction

    function addSparkle(x, y) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        sparkle.style.left = x + "px";
        sparkle.style.top = y + "px";
        mouth.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 500);
    }

    function start(e) {
        isBrushing = true;
        startX = e.clientX || e.touches[0].clientX;
        lastDirection = null;
    }

    function move(e) {
        if (!isBrushing) return;
        let currentX = e.clientX || e.touches[0].clientX;
        let diff = currentX - startX;

        if (Math.abs(diff) > threshold) {
            let direction = diff > 0 ? "right" : "left";
            if (direction !== lastDirection) {
                lastDirection = direction;
                passes++;
                info.textContent = `Passes : ${passes} / 3`;

                // feedback animation position approx de la souris
                const rect = mouth.getBoundingClientRect();
                addSparkle(currentX - rect.left, rect.height / 2);

                if (passes >= 3) {
                    if (calculBrossage > 0.7) window.close();
                    info.textContent = "✨ Victoire ! ✨";
                    mouth.style.borderColor = "#4CAF50";
                    isBrushing = false;
                }
            }
        }
    }

    function end() {
        isBrushing = false;
    }

    // Events souris + tactile
    mouth.addEventListener("mousedown", start);
    mouth.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);

    mouth.addEventListener("touchstart", start);
    mouth.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);
});