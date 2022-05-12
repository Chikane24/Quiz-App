const finalScore = document.getElementById("finalScore");
const userName = document.getElementById("userName");
const saveUser = document.getElementById("saveScoreBtn")

let recentScore = localStorage.getItem("recentScore");
finalScore.innerText = recentScore;

userName.addEventListener("keyup", () => {
    saveUser.disabled = !userName.value;
});

saveHighScore = e =>{
    e.preventDefault();
}