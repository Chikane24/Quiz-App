const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const hudQueCounter = document.getElementById("questionCounter");
const hudScore = document.getElementById("score");

let currentQuestion = {};
let acceptAns = false;
let score = 0;
let availableQuestion = [];
let questionCounter = 0;

const BONUS = 10;
const MAX_QUE = 3

let questions = [];

fetch("http://localhost:3000/questions")
    .then(res => {
        return res.json()
    }).then(loadedQues => {
        questions = loadedQues;
        startQuiz();
    })

let startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    // console.log(availableQuestion);
    // console.log(question);
    nextQuestion();
}

let nextQuestion = () =>{

    if(availableQuestion.length === 0 || availableQuestion >= MAX_QUE)
    {
        localStorage.setItem("recentScore",score);
        //go to the end page
        return window.location.assign("end.html")
    }

    questionCounter++;
    hudQueCounter.innerText = questionCounter + "/" + MAX_QUE;

    let questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestion.splice(questionIndex,1);
    acceptAns = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptAns) return;
        acceptAns = false;
        // console.log(e.target);

        let selectedChoice = e.target;
        let selectedAns = selectedChoice.dataset['number'];
        //console.log(selectedAns);

        let classToApply = (selectedAns == currentQuestion.answer) ? 'correct' : 'incorrect';

        if(classToApply == 'correct')
        {
            incrementScore();
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            nextQuestion();
        },1000)
       
    })
})

let incrementScore = () => {
    score += BONUS;
    hudScore.innerText = score;
}

