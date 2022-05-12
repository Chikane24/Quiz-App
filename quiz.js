const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const hudQueCounter = document.getElementById("questionCounter");
const hudScore = document.getElementById("score");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptAns = false;
let score = 0;
let availableQuestion = [];
let questionCounter = 0;

const BONUS = 10;
const MAX_QUE = 10

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
    .then(res => {
        return res.json()
    }).then(loadedQues => {
        //questions = loadedQues;
        //startQuiz();
        console.log(loadedQues.results);
        questions = loadedQues.results.map(loadedQues => {
            const formattedQuestion = {
                question: loadedQues.question
            };

            const answerChoices = [...loadedQues.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQues.correct_answer);

            answerChoices.forEach((choice,index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

        startQuiz();
    })

let startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    // console.log(availableQuestion);
    // console.log(question);
    nextQuestion();
    loader.classList.add("hidden");
    game.classList.remove("hidden");
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

