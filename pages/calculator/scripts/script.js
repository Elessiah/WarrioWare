document.addEventListener('DOMContentLoaded', function () {
    console.log("go !");

    const operation = ["+", "-", "*", "/"];
    const calculText = document.getElementById("calcul");
    const answerText = document.getElementById("answer");
    const isValidAnswer = document.getElementById("isValidAnswer");

    const DURATION = 5000; // 5 secondes
    let gameTimer; // Instance du TimerBomb
    let currentResult; // Résultat attendu

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
        answerText.focus();

        // Lancer le timer
        startTimer();
    }

    // Fonction pour démarrer le timer
    function startTimer() {
        if (gameTimer) {
            gameTimer.destroy();
        }

        gameTimer = new TimerBomb(DURATION, onTimeUp);
        gameTimer.start();
    }

    // Fonction appelée quand le temps est écoulé
    function onTimeUp() {
        isValidAnswer.innerText = "💥 Trop tard !";
        isValidAnswer.className = "error";

        if (typeof audioManager !== 'undefined') {
            audioManager.playGameOverSound();
        }


        setTimeout(() => {
            timerFill.style.transition = `width ${DURATION}ms linear`;
            timerFill.style.width = "0%";
        }, 50);

        // Quand le temps est écoulé
        timer = setTimeout(() => {
            window.location.href = "/pages/pageGameOver/gameOver.html"
        }, DURATION);

        // Détecter Enter
        const handler = function(event) {
            if (event.key === "Enter") {
                clearTimeout(timer);
                if (Number(answerText.value) === result) {
                    isValidAnswer.innerText = "Correct";
                    isValidAnswer.className = "correct";
                    window.location.href = "/pages/Transition/Transition.html"
                    window.location.href = "../../../index.html"
                } else {
                    window.location.href = "/pages/pageGameOver/gameOver.html";
                }
                document.removeEventListener('keydown', handler); // éviter plusieurs triggers
            } else {
                gameTimer.explode();
                isValidAnswer.innerText = "❌ Incorrect !";
                isValidAnswer.className = "error";

                setTimeout(() => {
                    if (typeof audioManager !== 'undefined') {
                        audioManager.playGameOverSound();
                    }
                    window.location.href = '../PageGameOver/GameOver.html';
                }, 2000);
            }

            setTimeout(() => {
                generateOperation();
            }, 1000);

        }
    }

    // Détecter la touche Enter
    answerText.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (answerText.value.trim() !== "") {
                checkAnswer();
            }
        }
    });

    // Générer la première opération
    generateOperation();
});
