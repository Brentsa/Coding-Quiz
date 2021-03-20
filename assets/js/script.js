//Initialize the questions and answers
var questions = [
    {question: "1. What is the answer?", corAnswer: "correct", answers: ["1incorrect","2incorrect","3incorrect", "correct"]},
    {question: "2. What is the answer?", corAnswer: "correct", answers: ["1incorrect","2incorrect","3incorrect", "correct"]},
    {question: "3. What is the answer?", corAnswer: "correct", answers: ["1incorrect","2incorrect","3incorrect", "correct"]},
    {question: "4. What is the answer?", corAnswer: "correct", answers: ["1incorrect","2incorrect","3incorrect", "correct"]},
    {question: "5. What is the answer?", corAnswer: "correct", answers: ["1incorrect","2incorrect","3incorrect", "correct"]}
]

//Initialize reference to the quiz block
var quizBlockMain = document.querySelector(".quiz-block");

//Initialize the quiz parameters
var time = 0;
var questionCount = 0;
var totalQuestions = 5;



//Return a random number between a supplied range
function randBetween(min, max){
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function handleButtonPress(event){

    if(event.target.matches("#start-btn")){
        console.log("start button-pressed!");
        document.querySelector(".question-block").remove();
        initQuizQuestion();
    }
    else if(event.target.matches("button")){
        console.log("button-pressed!");
        document.querySelector(".question-block").remove();
        initQuizQuestion();
    }
}

function initQuizQuestion(){
    if(questionCount < totalQuestions){
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
    else{
        var textBlock = document.createElement("div");
        textBlock.className = "question-block";
    
        var text = document.createElement("h1");
        text.textContent = "Quiz finished!"

        textBlock.appendChild(text);
        quizBlockMain.appendChild(textBlock);
    }  
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

quizBlockMain.addEventListener("click", handleButtonPress);

