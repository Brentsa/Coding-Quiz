//Initialize the questions and answers
var questions = [
    {question: "1. What variable type holds a sequence of chararcters?", corAnswer: "string", answers: ["string","number","boolean", "null"]},
    {question: "2. What operator do you use to initialize an array?", corAnswer: "[]", answers: ["{}","[]","()", "//"]},
    {question: "3. What keyword is used to initialize a variable?", corAnswer: "var", answers: ["for","return","function", "var"]},
    {question: "4. What function is used to add data to an array?", corAnswer: "push()", answers: ["sort()","pop()","push()", "appendChild()"]},
    {question: "5. What object provides access to the random() function?", corAnswer: "Math", answers: ["window","Math","JSON", "document"]}
]

//Array to hold the highscores
var highScores = [];

//Initialize reference to the quiz block
var quizBlockMain = document.querySelector(".quiz-block");
var viewHighScores = document.querySelector(".view-scores");

//Initialize the quiz parameters
var time = 100;
var timer;
var questionCount = 0;
var totalQuestions = 5;
var pageIndex = 1;


//Return a random number between a supplied range
function randBetween(min, max){
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function startCountdown(){
    timer = setInterval(function(){
        if(time > 0){
            time--;
        }
        document.querySelector("#time").textContent = "Time: " + time;
    },1000);
}

function endCountdown(){
    clearInterval(timer);
}

function handleButtonPress(event){

    if(event.target.matches("button")){

        if(event.target.matches(".clear-hs")){
            highScores = [];
            saveScores();
        }

        if(pageIndex === -1){
            document.querySelector(".question-block").remove();
            initQuiz();
        }
        else if(pageIndex === totalQuestions + 3){
            document.querySelector(".question-block").remove();
            initQuiz();
        }
        else{
            renderPage(event);
            pageIndex++;
        }
    }
}

function renderPage(event){

    switch(pageIndex){
        case (1):
            document.querySelector(".question-block").remove();
            initQuizQuestion();
            startCountdown();
            break;

        case (totalQuestions + 1):

            var questionCorrect = isQuestionCorrect(event);

            document.querySelector(".question-block").remove();
            endCountdown();
            initHighScore();

            printAnswer(questionCorrect);
            break;

        case (totalQuestions + 2):
            createScoreObject();
            document.querySelector(".question-block").remove();
            saveScores();
            initHighScoresList();
            break;

        default:
        
            var questionCorrect = isQuestionCorrect(event);

            document.querySelector(".question-block").remove();
            initQuizQuestion();

            printAnswer(questionCorrect);
            break;
    }
}

function isQuestionCorrect(event){
    if(event.target.textContent === questions[questionCount-1].corAnswer){
        console.log("correct");
        return true;
    }
    else{
        console.log("wrong");
        time -= 20;
        document.querySelector("#time").textContent = "Time: " + time;
        return false;
    }
}

function printAnswer(isCorrect){
    var questionStatus = document.querySelector(".status-box");
    if(isCorrect){
        questionStatus.textContent = "Correct.";
    }
    else{
        questionStatus.textContent = "Wrong.";
    }     
}

function viewScores(event){
    if(pageIndex == 1){
        document.querySelector(".question-block").remove();
        initHighScoresList();
        pageIndex = -1;
    }
}

function initQuiz(){
    time = 100;
    questionCount = 0;
    pageIndex = 1;
    document.querySelector("#time").textContent = "Time: " + time;

    loadScores();

    initStartScreen();
}

function initStartScreen(){
    var initialBlock = document.createElement("div");
    initialBlock.className = "initial-block question-block";
    initialBlock.innerHTML = "<h1 class='block-item'>Coding Quiz</h1><p class='block-item'>This is a quiz meant to text your knowledge of Javascript. Press start to begin!</p><button id='start-btn' class='btn centered block-item' type='click'>Start</button>";

    quizBlockMain.appendChild(initialBlock);
}

function initQuizQuestion(){
    var questionBlock = document.createElement("div");
    questionBlock.className = "question-block";

    var question = document.createElement("h1");
    question.textContent = questions[questionCount].question;

    var questionStatus = document.createElement("div");
    questionStatus.className = "status-box";

    questionBlock.appendChild(question);
    questionBlock.appendChild(createQuizButtons(questions[questionCount].answers));
    questionBlock.appendChild(questionStatus);
    quizBlockMain.appendChild(questionBlock);

    questionCount++;
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

    var questionStatus = document.createElement("div");
    questionStatus.className = "status-box";

    textBlock.appendChild(text);
    textBlock.appendChild(label);
    textBlock.appendChild(input);
    textBlock.appendChild(button);
    textBlock.appendChild(questionStatus);
    quizBlockMain.appendChild(textBlock);
}

function createScoreObject(){
    var initials = document.querySelector("input[name='hs-input'").value;
    var scoreItem = {initials: initials, score: time};
    highScores.push(scoreItem);
}

function sort_by_key(array, key){
    return array.sort(function(a, b){
        var x = a[key]; var y = b[key];
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

function initHighScoresList(){

    sort_by_key(highScores, 'score');

    var hsBlock = document.createElement("div");
    hsBlock.className = "question-block";

    var header = document.createElement("h1");
    header.textContent = "High Scores:";

    hsBlock.appendChild(header);

    for(var i = 0; i < highScores.length; i++){
        var highScoreBlock = document.createElement("div");
        highScoreBlock.textContent = highScores[i].initials + ": " + highScores[i].score;
        
        if((i+1) % 2 === 0){
            highScoreBlock.className = "hs-even"
        }
        else{
            highScoreBlock.className = "hs-odd"
        }

        hsBlock.appendChild(highScoreBlock);
    }

    if(questionCount === totalQuestions){
        var button1 = document.createElement("button");
        button1.className = "btn centered block-item play-again";
        button1.textContent = "Play again?";
    
        var button2 = document.createElement("button");
        button2.className = "btn centered block-item clear-hs";
        button2.textContent = "Clear High Scores";
    
        hsBlock.appendChild(button1);
        hsBlock.appendChild(button2);
    }
    else{
        var button1 = document.createElement("button");
        button1.className = "btn centered block-item";
        button1.textContent = "Go Back";

        hsBlock.appendChild(button1);
    }
    
    quizBlockMain.appendChild(hsBlock);
}

function saveScores(){
    localStorage.setItem("scores", JSON.stringify(highScores));
}

function loadScores(){
    var savedScores = localStorage.getItem("scores");

    if(!savedScores){ highScores = [];}
   
    highScores = JSON.parse(savedScores);
}

quizBlockMain.addEventListener("click", handleButtonPress);

viewHighScores.addEventListener("click", viewScores);

initQuiz();
