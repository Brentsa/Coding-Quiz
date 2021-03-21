//Initialize the questions and answers
var questions = [
    {question: "1. What is the answer?", corAnswer: "correct", answers: ["1incorrect","2incorrect","3incorrect", "correct"]},
    {question: "2. What is the answer?", corAnswer: "correct", answers: ["1incorrect","2incorrect","3incorrect", "correct"]},
    {question: "3. What is the answer?", corAnswer: "correct", answers: ["1incorrect","2incorrect","3incorrect", "correct"]},
    {question: "4. What is the answer?", corAnswer: "correct", answers: ["1incorrect","2incorrect","3incorrect", "correct"]},
    {question: "5. What is the answer?", corAnswer: "correct", answers: ["1incorrect","2incorrect","3incorrect", "correct"]}
]

//Array to hold the highscores
var highScores = [];

//Initialize reference to the quiz block
var quizBlockMain = document.querySelector(".quiz-block");

//Initialize the quiz parameters
var time = 100;
var questionCount = 0;
var totalQuestions = 5;


//Return a random number between a supplied range
function randBetween(min, max){
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function handleButtonPress(event){

    if(event.target.matches("#start-btn")){
        document.querySelector(".initial-block").remove();
        initQuizQuestion();
    }
    else if(event.target.matches(".submit-hs")){
        createScoreObject();
        for(var i = 0; i < highScores.length; i++){
            console.log(highScores[i]);
        }
        saveScores();
        document.querySelector(".question-block").remove();
        initHighScoresList();
    }
    else if(event.target.matches(".clear-hs")){
        console.log("clear high score");
        highScores = [];
        saveScores();
        
        document.querySelector(".question-block").remove();
        initQuiz();
    }
    else if(event.target.matches(".play-again")){
        console.log("play again");
        
        document.querySelector(".question-block").remove();
        initQuiz();
    }
    else if(event.target.matches("button") && questionCount < totalQuestions){
        document.querySelector(".question-block").remove();
        initQuizQuestion();
    }
    else if(event.target.matches("button")){
        document.querySelector(".question-block").remove();
        initHighScore();
    }
}

function initQuiz(){
    time = 100;
    questionCount = 0;
    loadScores();

    var initialBlock = document.createElement("div");
    initialBlock.className = "initial-block";
    initialBlock.innerHTML = "<h1 class='block-item'>Coding Quiz</h1><p class='block-item'>This is a quiz meant to text your knowledge of Javascript. Press start to begin!</p><button id='start-btn' class='btn centered block-item' type='click'>Start</button>";

    quizBlockMain.appendChild(initialBlock);
}

function initQuizQuestion(){
    var questionBlock = document.createElement("div");
    questionBlock.className = "question-block";

    var question = document.createElement("h1");
    question.textContent = questions[questionCount].question;
    questionCount++;

    var questionStatus = document.createElement("div");
    questionStatus.className = "status-box";
    questionStatus.textContent = "Correct!";

    questionBlock.appendChild(question);
    questionBlock.appendChild(createQuizButtons(questions[0].answers));
    questionBlock.appendChild(questionStatus);
    quizBlockMain.appendChild(questionBlock);
}

function createQuizButtons(answersArray){

    var buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    for(var i = 0; i < answersArray.length; i++){
        var button = document.createElement("button");
        button.textContent = answersArray[i];
        button.className = "btn centered block-item";
        buttonContainer.appendChild(button);
    }

    return buttonContainer;
}

function initHighScore(){
    var textBlock = document.createElement("div");
    textBlock.className = "question-block";

    var text = document.createElement("h1");
    text.textContent = "Quiz finished";

    var label = document.createElement("label");
    label.textContent = "Enter high score: ";
    
    var input = document.createElement("input");
    input.className = "initial-input"
    input.setAttribute("name", "hs-input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter Initials");

    var button = document.createElement("button");
    button.className = "btn centered block-item submit-hs";
    button.textContent = "Submit";

    textBlock.appendChild(text);
    textBlock.appendChild(label);
    textBlock.appendChild(input);
    textBlock.appendChild(button);
    quizBlockMain.appendChild(textBlock);
}

function createScoreObject(){
    var initials = document.querySelector("input[name='hs-input'").value;
    var scoreItem = {initials: initials, score: time};
    highScores.push(scoreItem);
}

function initHighScoresList(){
    var hsBlock = document.createElement("div");
    hsBlock.className = "question-block";

    var header = document.createElement("h1");
    header.textContent = "High Scores:";

    hsBlock.appendChild(header);

    for(var i = 0; i < highScores.length; i++){
        var highScoreBlock = document.createElement("div");
        highScoreBlock.textContent = highScores[i].initials + ": " + highScores[i].score;
        
        if(i % 2 === 0){
            highScoreBlock.className = "hs-even"
        }
        else{
            highScoreBlock.className = "hs-odd"
        }

        hsBlock.appendChild(highScoreBlock);
    }

    var button1 = document.createElement("button");
    button1.className = "btn centered block-item play-again";
    button1.textContent = "Play again?";

    var button2 = document.createElement("button");
    button2.className = "btn centered block-item clear-hs";
    button2.textContent = "Clear High Scores";

    hsBlock.appendChild(button1);
    hsBlock.appendChild(button2);
    
    quizBlockMain.appendChild(hsBlock);
}

function saveScores(){
    localStorage.setItem("scores", JSON.stringify(highScores));
}

function loadScores(){
    var savedScores = localStorage.getItem("scores");

    if(!savedScores){ highScores = [];}
   
    highScores = JSON.parse(savedScores);

    for(var i = 0; i < highScores.length; i++){
        console.log(highScores[i]);
    }
}



quizBlockMain.addEventListener("click", handleButtonPress);

initQuiz();
