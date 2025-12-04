const d = 10;
const h = "black";
const c = 40; 
const e = 10;
const m = "red";
const a = document.getElementById("game");
const k = "green";
const b = a.getContext("2d");
const l = "white";
let inactivityTimer;
let gameEnded = false;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (!gameEnded) {
            endGame(false);
        }
    }, 5000); // 5 secondes pour atteindre la sortie
}


const f = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,1,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,0,1],
    [1,0,1,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,1,0,1,0,1],
    [1,1,1,1,0,1,0,1,0,1],
    [1,0,0,1,0,0,0,1,0,1],
    [1,0,0,0,0,1,0,0,3,1],
    [1,1,1,1,1,1,1,1,1,1],
];

let g = { x: 0, y: 0 };

for (let y = 0; y < d; y++) {
    for (let x = 0; x < e; x++) {
        if (f[y][x] === 2) {
            g.x = x;
            g.y = y;
        }
    }
}

function endGame(win = false) {
    gameEnded = true;
    clearTimeout(inactivityTimer);
    
    if (typeof audioManager !== 'undefined') {
        if (win) {
            audioManager.playWinSound();
        } else {
            audioManager.playLoseSound();
        }
    }
    
    setTimeout(() => {
        window.location.href = "../pageGameOver/gameOver.html";
    }, 500);
}

function func() {
    // Vérifier si le joueur est sur la case de sortie
    if (f[g.y][g.x] === 3 && !gameEnded) {
        endGame(true);
        return;
    }
    
    for (let y = 0; y < d; y++) {
        for (let x = 0; x < e; x++) {
            if (f[y][x] === 1) b.fillStyle = h;       
            else if (f[y][x] === 3) {
                b.fillStyle = k;
                console.log("Gagné")}
            else b.fillStyle = l;                       

            b.fillRect(x * c, y * c, c, c);
            b.strokeRect(x * c, y * c, c, c);
        }
    }

    b.fillStyle = m;
    b.fillRect(g.x * c, g.y * c, c, c);
}

function fonc(dx, dy) {
    const o = g.x + dx;
    const p = g.y + dy;

    if (f[p][o] === 1 ) return;

    g.x = o;
    g.y = p;

    // Vérifier si le joueur a atteint la sortie (case 3)
    if (f[p][o] === 3 && !gameEnded) {
        gameEnded = true;
        if (typeof audioManager !== 'undefined') {
            audioManager.playWinSound();
        }
        setTimeout(() => {
            alert("Félicitations ! Tu as trouvé la sortie !");
        }, 500);
    }

    func();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") fonc(0, -1);
    if (e.key === "ArrowDown") fonc(0, 1);
    if (e.key === "ArrowLeft") fonc(-1, 0);
    if (e.key === "ArrowRight") fonc(1, 0);
});

func();
resetInactivityTimer();
