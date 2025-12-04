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
        const n1 = Math.floor(Math.random() * 20);
        const n2 = Math.floor(Math.random() * 20);
        const opeIndex = Math.floor(Math.random() * 4); // 0-3 pour 4 opérations

        // Calcul du résultat selon l'opération
        let result;
        switch(operation[opeIndex]) {
            case "+":
                result = n1 + n2;
                break;
            case "-":
                result = n1 - n2;
                break;
            case "*":
                result = n1 * n2;
                break;
            case "/":
                result = n1;
                break;
            default:
                result = n1 + n2;
        }

        currentResult = result;

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
            window.location.href = '../PageGameOver/GameOver.html';
        }, 2000);
    }

    // Fonction pour vérifier la réponse
    function checkAnswer() {
        const userAnswer = Number(answerText.value);

        if (userAnswer === currentResult) {
            gameTimer.stop();
            isValidAnswer.innerText = "✅ Correct !";
            isValidAnswer.className = "correct";

            if (typeof audioManager !== 'undefined') {
                audioManager.playWinSound();
            }

            setTimeout(() => {
                generateOperation();
            }, 1000);
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
