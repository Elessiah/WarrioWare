document.addEventListener('DOMContentLoaded', function () {
    console.log("go !");
    const $operation = ["+","-","*","/"];
    let $calculText = document.getElementById("calcul");
    let $answerText = document.getElementById("answer");
    let $isValidAnswer = document.getElementById("isValidAnswer");

    //Génération des valeurs aléatoire
    const $n1 = Math.floor(Math.random() * 20);
    const $n2 = Math.floor(Math.random() * 20);
    const $opeIndex = Math.floor(Math.random() * 5)

    //Calcul du résultat
    const $result = $n1 + $n2;

    //Affichage du calcul
    $calculText.innerText = `${$n1} ${$operation[$opeIndex]} ${$n2}`;

    //Détection du clique et vérification du résultat
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