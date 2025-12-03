const cloud = document.getElementById("cloud");
const drop = document.getElementById("drop");
const bucket = document.getElementById("bucket");
const message = document.getElementById("message");

let bucketSpeed = 10;
let dropFalling = true;
let dropSpeed = 2;

// Position initiale de la goutte
drop.style.left = cloud.offsetLeft + cloud.offsetWidth/2 - drop.offsetWidth/2 + "px";

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
    if(cloudPos > 520) cloudPos = 0; // retour au début
    cloud.style.left = cloudPos + "px";
    if (dropFalling) {
        drop.style.left = cloudPos + cloud.offsetWidth/2 - drop.offsetWidth/2 + "px";
    }
    requestAnimationFrame(moveCloud);
}
moveCloud();

// Déplacement du seau avec les flèches
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

// Faire tomber la goutte
function dropFall() {
    if(!dropFalling) return;
    let dropTop = drop.offsetTop;
    dropTop += dropSpeed;
    drop.style.top = dropTop + "px";

    // Vérifier collision avec seau
    let dropRect = drop.getBoundingClientRect();
    let bucketRect = bucket.getBoundingClientRect();

    if (!(dropRect.right < bucketRect.left || 
          dropRect.left > bucketRect.right || 
          dropRect.bottom < bucketRect.top || 
          dropRect.top > bucketRect.bottom)) {
        gameOver(true);
        return;
    }

    // Vérifier si la goutte touche le sol
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
