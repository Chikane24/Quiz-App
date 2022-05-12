const finalScore = document.getElementById("finalScore");
const userName = document.getElementById("userName");
const saveUser = document.getElementById("saveScoreBtn")

let recentScore = localStorage.getItem("recentScore");
finalScore.innerText = recentScore;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);
const MAX_HIGH_SCORE = 5

userName.addEventListener("keyup", () => {
    saveUser.disabled = !userName.value;
});

saveHighScore = e =>{
    e.preventDefault();

    const score = {
        score: recentScore,
        name: userName.value
    };
    highScores.push(score);
    highScores.sort((a,b)=> b.score-a.score);
    highScores.splice(5);
    console.log(highScores);

    localStorage.setItem("highScores",JSON.stringify(highScores));
    
}