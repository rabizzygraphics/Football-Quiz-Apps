const questions = [
    {
        question:  "Which country has won the most FIFA World Cup titles?",
        answers:[
            {text: "Ghana", correct: false},
            {text: "Germany", correct: false},
            {text: "Brazil", correct: true},
            {text: "Italy", correct: false},
        ]
    },
    {
        question: "Who is the all-time top scorer in UEFA Champions League history?",
        answers:[
            {text: "Cristiano Ronaldo", correct: true},
            {text: "Robert Lewandowski", correct: false},
            {text: "Karim Benzema", correct: false},
            {text: "Lionel Messi", correct: false},
        ]
    },
    {
        question:  "Which club has won the most Premier League titles?",
        answers:[
            {text: "Liverpool", correct: false},
            {text: "Manchester United", correct: true},
            {text: "Chelsea", correct: false},
            {text: "Arsenal", correct: false},
        ]
    },
    {
        question: "Which country hosted the 2010 FIFA World Cup?",
        answers:[
            {text: "Germany", correct: false},
            {text: "Russia", correct: false},
            {text: "Camerooon", correct: false},
            {text: "South Africa", correct: true},
        ]
    },
    {
        question: "Which team won the EUFA Champions League in 2024?",
        answers:[
            {text: "Man City", correct: true},
            {text: "Real Madrid", correct: false},
            {text: "PSG", correct: false},
            {text: "Bayern Munich", correct: false},
        ]
    },
];



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
        });
        nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})
startQuiz();