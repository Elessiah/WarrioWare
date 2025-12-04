const cloud = document.getElementById("cloud");
const drop = document.getElementById("drop");
const bucket = document.getElementById("bucket");
const message = document.getElementById("message");

let bucketSpeed = 10;
let dropFalling = true;
let dropSpeed = 2;

// Position initiale totalement aléatoire
let screenWidth = 600; // adapte selon ta scène
let minX = 0;
let maxX = screenWidth - drop.offsetWidth;

let posX = Math.random() * (maxX - minX) + minX;
drop.style.left = posX + "px";


// Timer 5 secondes
setTimeout(() => {
    if (dropFalling) {
        gameOver(false);
    }
}, 5000);

// Déplacement du nuage
let cloudPos = 0;
function moveCloud() {
    cloudPos += 1;
    if (cloudPos > 520) cloudPos = 0; // retour au début
    cloud.style.left = cloudPos + "px";

    requestAnimationFrame(moveCloud);
}
moveCloud();

/*Déplacement du seau
document.addEventListener("keydown", (e) => {
    let bucketLeft = bucket.offsetLeft;
    if (e.key === "ArrowLeft") {
        bucketLeft -= bucketSpeed;
        if(bucketLeft < 0) bucketLeft = 0;
        bucket.style.left = bucketLeft + "px";
    }
    if (e.key === "ArrowRight") {
        bucketLeft += bucketSpeed;
        if(bucketLeft > 540) bucketLeft = 540;
        bucket.style.left = bucketLeft + "px";
    }
});
*/ 
let leftPressed = false;
let rightPressed = false;

// Détection des touches pressées / relâchées
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") leftPressed = true;
    if (e.key === "ArrowRight") rightPressed = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") leftPressed = false;
    if (e.key === "ArrowRight") rightPressed = false;
});

// Boucle pour déplacer le seau de façon fluide
function moveBucket() {
    let bucketLeft = bucket.offsetLeft;
    if (leftPressed) {
        bucketLeft -= bucketSpeed;
        if (bucketLeft < 0) bucketLeft = 0;
    }
    if (rightPressed) {
        bucketLeft += bucketSpeed;
        if (bucketLeft > 540) bucketLeft = 540;
    }
    bucket.style.left = bucketLeft + "px";

    requestAnimationFrame(moveBucket);
}
moveBucket();


// Faire tomber la goutte
function dropFall() {
    if (!dropFalling) return;

    let dropTop = drop.offsetTop;
    dropTop += dropSpeed;
    drop.style.top = dropTop + "px";

    let dropRect = drop.getBoundingClientRect();
    let bucketRect = bucket.getBoundingClientRect();

    // Collision
    if (!(dropRect.right < bucketRect.left || 
          dropRect.left > bucketRect.right || 
          dropRect.bottom < bucketRect.top || 
          dropRect.top > bucketRect.bottom)) {
        gameOver(true);
        return;
    }

    // Sol
    if (dropTop > 370) {
        gameOver(false);
        return;
    }

    requestAnimationFrame(dropFall);
}
dropFall();

// Fin du jeu
function gameOver(success) {
    dropFalling = false;
    message.textContent = success ? "Succès ! Tu as attrapé la goutte !" : "Échec ! La goutte est tombée.";
    console.log(success ? "success" : "fail");
}
