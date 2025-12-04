const a = [
"assets/1-20.jpg",
"assets/i102000-cerise-nu.jpg",
"assets/Mangue.webp",
"assets/peches-plates-1024x768.jpg",
"assets/shutterstock_518328943.jpg",
"assets/Titel_Apfel-1200x900.jpg",
"assets/7110_Poire-Abate.png",
];
const aa = document.getElementById("message");
const aaa = Math.floor(Math.random() * 4) + 5;
const b = a.sort(() => Math.random() - 0.5).slice(0, aaa);
const aaaaa ="assets/00006440-2-600x400.webp";
const aaaa = b.concat(aaaaa).sort(() => Math.random() - 0.5);
aaaa.forEach(src => {
const aaaaaa = document.createElement("img");
aaaaaa.src = src;
const aaaaaaa = window.innerWidth - 120;
const aaaaaaaa = window.innerHeight - 120;
const aaaaaaaaa = Math.random() * aaaaaaa;
const aaaaaaaaaa = Math.random() * aaaaaaaa;
aaaaaa.style.left = `${aaaaaaaaa}px`;
aaaaaa.style.top = `${aaaaaaaaaa}px`;
const aaaaaaaaaaa = Math.random() * 360;
aaaaaa.style.transform = `rotate(${aaaaaaaaaaa}deg)`;
aaaaaa.addEventListener("click", () => {
if (src === aaaaa) {
    aa.textContent = "Gagné !";
    aa.style.color = "green";
    window.location.href = "/pages/Transition/Transition.html"
} else {
    aa.textContent = "Perdu !";
    aa.style.color = "red";
    window.location.href = "/pages/pageGameOver/gameOver.html"
}
});
document.body.appendChild(aaaaaa);
});