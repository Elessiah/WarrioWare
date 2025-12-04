const games = [
        /*Url vers pages des jeux*/
        "/pages/aimTrainer/aimTrainer.html",
        "/pages/cableConnect/cableConnect.html",
        "/pages/calculator/calculator.html",
        "/pages/catchTheDrop/catchTheDrop.html",
        "/pages/crossTheRoad/crossTheRoad.html",
        "/pages/matchColor/matchColor.html",
        "/pages/labyrinth/labyrinth.html"
    ];

    const startButton = document.getElementById("startButton");

    startButton.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * games.length);
        const randomUrl = games[randomIndex];
        window.location.href = randomUrl; 
    });