document.addEventListener('DOMContentLoaded', function () {
    console.log("go !");
    const $operation = ["+","-","*","/"];
    let $calculText = document.getElementById("calcul");
    let $answerText = document.getElementById("answer");
    let $isValidAnswer = document.getElementById("isValidAnswer");

    const $n1 = Math.floor(Math.random() * 10);
    const $n2 = Math.floor(Math.random() * 10);
    const $opeIndex = Math.floor(Math.random() * 4)
    const $result = $n1 + $n2;

    $calculText.innerText = `${$n1} ${$operation[$opeIndex]} ${$n2}`;

    document.addEventListener('keydown', function(event) {
        if (event.key === "Enter"){
            if (Number($answerText.value) === $result ) {
                $isValidAnswer.innerText = "Correct"
                $isValidAnswer.className = "correct";
            } else {
                $isValidAnswer.innerText = "Incorrect"
                $isValidAnswer.className = "error";
            }
        }

    });
});