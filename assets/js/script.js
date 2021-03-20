//Initialize the questions and answers
var questions = [
    {question: "2. What is the answer?", answer: "correct", incorrect: ["1incorrect","2incorrect","3incorrect" ]},
    {question: "1. What is the answer?", answer: "correct", incorrect: ["1incorrect","2incorrect","3incorrect" ]},
    {question: "3. What is the answer?", answer: "correct", incorrect: ["1incorrect","2incorrect","3incorrect" ]},
    {question: "4. What is the answer?", answer: "correct", incorrect: ["1incorrect","2incorrect","3incorrect" ]},
    {question: "5. What is the answer?", answer: "correct", incorrect: ["1incorrect","2incorrect","3incorrect" ]}
]

//Initialize the time/score
var time = 0;

//Return a random number between a supplied range
function randBetween(min, max){
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

