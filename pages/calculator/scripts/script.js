document.addEventListener('DOMContentLoaded', function () {
    console.log("go !");

    const operation = ["+", "-", "*", "/"];
    const calculText = document.getElementById("calcul");
    const answerText = document.getElementById("answer");
    const isValidAnswer = document.getElementById("isValidAnswer");
    const timerFill = document.getElementById("timer-fill");

    const DURATION = 5000; // 5 secondes
    let timer; // Pour clearTimeout

    // Fonction pour générer une nouvelle opération
    function generateOperation() {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 5);
        const opeIndex = Math.floor(Math.random() * 5);
        let result;

        // Calcul du résultat
        if (operation[opeIndex] === "+"){
            result = n1 + n2;
        } else if (operation[opeIndex] === "-"){
            result = n1 - n2;
        } else if (operation[opeIndex] === "*"){
            result = n1 * n2
        } else {
            result = n1 / n2
        }


        // Affichage du calcul
        calculText.innerText = `${n1} ${operation[opeIndex]} ${n2}`;

        // Reset input et message
        answerText.value = "";
        isValidAnswer.innerText = "";
        isValidAnswer.className = "";

        // Lancer le timer
        startTimer(result);
    }

    // Fonction pour démarrer le timer
    function startTimer(result) {
        // Reset barre
        timerFill.style.transition = "none";
        timerFill.style.width = "100%";

        // Déclencher l’animation
        setTimeout(() => {
            timerFill.style.transition = `width ${DURATION}ms linear`;
            timerFill.style.width = "0%";
        }, 50);

        // Quand le temps est écoulé
        timer = setTimeout(() => {
            window.location.href = "../pageGameOver/gameOver.html";
        }, DURATION);

        // Détecter Enter
        const handler = function(event) {
            if (event.key === "Enter") {
                clearTimeout(timer);
                if (Number(answerText.value) === result) {
                    isValidAnswer.innerText = "Correct";
                    isValidAnswer.className = "correct";
                    window.location.href = "../../../index.html"
                } else {
                    window.location.href = "../pageGameOver/gameOver.html";
                }
                document.removeEventListener('keydown', handler); // éviter plusieurs triggers
            }
        };
        document.addEventListener('keydown', handler);
    }

    // Générer la première opération
    generateOperation();
});
