//Initialize the questions and answers
var questions = [
    {question: "1. What variable type holds a sequence of chararcters?", corAnswer: "string", answers: ["string","number","boolean", "null"]},
    {question: "2. What operator do you use to initialize an array?", corAnswer: "[]", answers: ["{}","[]","()", "//"]},
    {question: "3. What keyword is used to initialize a variable?", corAnswer: "var", answers: ["for","return","function", "var"]},
    {question: "4. What function is used to add data to an array?", corAnswer: "push()", answers: ["sort()","pop()","push()", "appendChild()"]},
    {question: "5. What object provides access to the random() function?", corAnswer: "Math", answers: ["window","Math","JSON", "document"]}
]

//Array to hold the highscores
var highScores = new Array();

//Initialize reference to the quiz block
var quizBlockMain = document.querySelector(".quiz-block");
var viewHighScores = document.querySelector(".view-scores");

//Initialize the quiz parameters
var time = 100;
var timer;
var questionCount = 0;
var totalQuestions = 5;
var pageIndex = 1;

//Begin the time countdown and decrement the users score every second
function startCountdown(){
    timer = setInterval(function(){
        //only decrement the score if the user has score left
        time--;
        document.querySelector("#time").textContent = "Score: " + time;

        if(time < 0){
            document.querySelector(".question-block").remove();
            alert("Game Over!");
            initQuiz();
        }
    },1000);
}

//End the time countdown
function endCountdown(){
    clearInterval(timer);
}

//Determines the html to render based on the button clicked
function handleButtonPress(event){

    //checks if button was pressed
    if(event.target.matches("button")){
        
        //If a button with the clear class is pressed, clear the highscores
        if(event.target.matches(".clear-hs")){
            highScores = [];
            saveScores();
        }

        if(pageIndex === -1){
            //only called when we check the highscore via the top left button
            document.querySelector(".question-block").remove();
            initQuiz();
        }
        else if(pageIndex === totalQuestions + 3){
            //restarts the quiz if we reach the final high score page
            document.querySelector(".question-block").remove();
            initQuiz();
        }
        else{
            //render the next page and increase the page index
            renderPage(event);
            pageIndex++;
        }
    }
}

//Renders dynamically generated HTML depending on the page index we are on
function renderPage(event){

    switch(pageIndex){
        //renders the first question and starts the quiz and countdown
        case (1):
            document.querySelector(".question-block").remove();
            initQuizQuestion();
            startCountdown();
            break;

        //renders the submit score page when all of the questions have been answered
        case (totalQuestions + 1):
            var questionCorrect = isQuestionCorrect(event);

            document.querySelector(".question-block").remove();
            endCountdown();
            initHighScore();

            printAnswer(questionCorrect);
            break;

        //renders the high scores after a score has bee submitted
        case (totalQuestions + 2):
            createScoreObject();
            document.querySelector(".question-block").remove();
            saveScores();
            initHighScoresList();
            break;

        //renders the question based on the page index, it will always render through all the questions
        default:
            var questionCorrect = isQuestionCorrect(event);

            document.querySelector(".question-block").remove();
            initQuizQuestion();

            printAnswer(questionCorrect);
            break;
    }
}

//Returns true or false if the user selected the right or wrong answer
function isQuestionCorrect(event){
    if(event.target.textContent === questions[questionCount-1].corAnswer){
        return true;
    }
    else{
        //subtract 20 points from the user time/score and do not allow the score to go below 0
        time = Math.max(0, time - 20);
        document.querySelector("#time").textContent = "Score: " + time;
        return false;
    }
}

//Print if the answer given by the user is correct or not in the log
function printAnswer(isCorrect){
    var questionStatus = document.querySelector(".status-box");
    if(isCorrect){
        questionStatus.textContent = "Correct.";
    }
    else{
        questionStatus.textContent = "Wrong.";
    }     
}

//We can only view the high scores from the quiz start page and then sets the index to -1 to restart the quiz
function viewScores(event){
    if(pageIndex == 1){
        document.querySelector(".question-block").remove();
        initHighScoresList();
        pageIndex = -1;
    }
}

//Called whenever the user starts a new quiz scenario
function initQuiz(){
    //Resets game parameters and loads scores from storage
    endCountdown();
    time = 100;
    questionCount = 0;
    pageIndex = 1;
    document.querySelector("#time").textContent = "Score: " + time;
    loadScores();

    initStartScreen();
}

//Builds the start screen page html
function initStartScreen(){
    var initialBlock = document.createElement("div");
    initialBlock.className = "initial-block question-block";
    initialBlock.innerHTML = "<h1 class='block-item'>Coding Quiz</h1><p class='block-item'>This is a coding quiz meant to text your knowledge of Javascript. Once the game has started, you will lose one score per second. If you answer a question incorrectly, you will lose 20pts. Press the start button below to begin!</p><button id='start-btn' class='btn centered block-item' type='click'>Start</button>";

    quizBlockMain.appendChild(initialBlock);
}

//Builds quiz question html with possible answers
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

//Builds the answers that are selectable by the user in button format
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

//Builds the html that allows the user to enter a high score
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

//Adds the score object entered by the user into our highscore array
function createScoreObject(){
    var initials = document.querySelector("input[name='hs-input'").value;
    var scoreItem = {initials: initials, score: time};
    highScores.push(scoreItem);
}

//Generic function that allows us to sort objects in an array by a specified key
function sort_by_key(array, key){
    return array.sort(function(a, b){
        var x = a[key]; var y = b[key];
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

//Sorts the high scores from highest to lowest and then builds the html to display the scores
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

    //Changes the buttons available to the user if they click to view high scores or arrive there by reaching the end of the quiz loop
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

//Saves the scores in our score array to local storage
function saveScores(){
    localStorage.setItem("scores", JSON.stringify(highScores));
}

//Loads the scores from our local storage to our global array
function loadScores(){
    var savedScores = localStorage.getItem("scores");

    if(!savedScores){ highScores = new Array();}
   
    highScores = JSON.parse(savedScores);
}

//Handles all button press clicks
quizBlockMain.addEventListener("click", handleButtonPress);

//Handles the click when a user wants to check the high scores in the start screen
viewHighScores.addEventListener("click", viewScores);

//Start the quiz when the page loads
initQuiz();
