document.addEventListener('DOMContentLoaded', function () {
    console.log("go !");

    const operations = ["+", "-", "*", "/"];
    const calculText = document.getElementById("calcul");
    const answerText = document.getElementById("answer");
    const isValidAnswer = document.getElementById("isValidAnswer");

    const DURATION = 5000; // 5 secondes
    let gameTimer;
    let currentResult;

    function generateOperation() {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 5) + 1; // éviter division par 0
        const opeIndex = Math.floor(Math.random() * operations.length);
        const op = operations[opeIndex];

        switch (op) {
            case "+": currentResult = n1 + n2; break;
            case "-": currentResult = n1 - n2; break;
            case "*": currentResult = n1 * n2; break;
            case "/": currentResult = Math.floor(n1 / n2); break;
        }

        calculText.innerText = `${n1} ${op} ${n2}`;

        answerText.value = "";
        answerText.focus();

        isValidAnswer.innerText = "";
        isValidAnswer.className = "";

        startTimer();
    }

    function startTimer() {
        if (gameTimer) gameTimer.destroy();

        gameTimer = new TimerBomb(DURATION, onTimeUp);
        gameTimer.start();
    }

    function onTimeUp() {
        isValidAnswer.innerText = "💥 Trop tard !";
        isValidAnswer.className = "error";
        setTimeout(() => {
            window.location.href = "/pages/pageGameOver/gameOver.html";
        }, 1200);
    }

    function checkAnswer() {
        if (Number(answerText.value) === currentResult) {
            isValidAnswer.innerText = "Correct ✔️";
            isValidAnswer.className = "correct";

            setTimeout(() => {
                window.location.href = "/pages/Transition/Transition.html";
            }, 600);

        } else {
            isValidAnswer.innerText = "❌ Incorrect !";
            isValidAnswer.className = "error";

            setTimeout(() => {
                window.location.href = "/pages/pageGameOver/gameOver.html";
            }, 800);
        }
    }

    answerText.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (answerText.value.trim() !== "") {
                checkAnswer();
            }
        }
    });

    generateOperation();
});
