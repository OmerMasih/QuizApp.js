
//Sitting my variables
var timer = document.getElementById("timer");
var timeButton = document.getElementById("timeButton");
var secondsLeft = 70
var timeInterval = 0;
var penalty = 10;
var score = 0;
var questionIndex = 0;
var divObject = document.getElementById("divObject");
var listUnorderd = document.getElementById("listUnorderd");
var highScore = document.getElementById("highScore");
var clear = document.getElementById("clear");
var goBack = document.getElementById("goBack");

//Questions for the Quiz.
var questions = [
    {
        title: " The function and var are known as:",
        choices: ["Data types", "Keywords", "Declaration Statement", "Prototypes"],
        answer: "Declaration Statement"
    },
    {
        title: "Which one of the following is the correct way for calling the JavaScript code?",
        choices: ["Preprocessor", "Triggering Event", "RMI", "Function/Method"],
        answer: "Function/Method"
    },
    {
        title: "How does a FOR loop start?",
        choices: ["for (i=0; i <= 5; i++)", "for (i <= 5; i++)", "for i= 1 to 5", "for (i = 0; i <= 5)"],
        answer: "for (i=0; i <= 5; i++)"
    },
    {
        title: "In JavaScript, what will be used to calling the function definition expression",
        choices: ["Function prototype", "Function literal", "Function calling", "Function declaration"],
        answer: "Function literal"
    },
    {
        title: "How do you write an IF statement in JavaScript?",
        choices: ["if i = 5 or else", "if i = 5 then", "if i == 5 then", "if(i == 5)"],
        answer: "if(i == 5)"
    },
    {
        title: "What we will get if we compare the (one) with (8) using the less than operator one<8)?",
        choices: ["Undefined", "True", "NaN", "False"],
        answer: "False"
    }
]

// WHEN I click the start button,GIVEN I am taking a code quiz.

timeButton.addEventListener("click", function () {

    // Interval timer starts
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            secondsLeft--;
            timer.textContent = "Time: " + secondsLeft + " seconds";

            if (secondsLeft <=  0) {
                clearInterval(timeInterval);
                timer.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
})

// Display questions and choices to page
function render(questionIndex) {
    divObject.innerHTML = "";
    listUnorderd.innerHTML = "";
    // THEN I am presented with another question
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        divObject.textContent = userQuestion;
        
    }
    // Choices for each question
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        divObject.appendChild(listUnorderd);
        listUnorderd.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
    timeButton.style.visibility = "hidden";
}

// compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var divTag = document.createElement("div");
        divTag.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            divTag.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // WHEN I answer a question incorrectly
        } else {
            // Will deduct 10 seconds off secondsLeft
            secondsLeft = secondsLeft - penalty;
            divTag.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        divTag.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    divObject.appendChild(divTag);
}

// All done function will append last page
function allDone() {
    divObject.innerHTML = "";
    timeButton.style.visibility = "hidden";

    var h1Creat = document.createElement("h1");
    h1Creat.setAttribute("id", "createH1");
    h1Creat.textContent = "Finish!"
    divObject.appendChild(h1Creat);

    // Paragraph
    var pCreat = document.createElement("p");
    pCreat.setAttribute("id", "createP");
    divObject.appendChild(pCreat);

    // WHEN all questions are answered or the timer reaches 0
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(timeInterval);
        pCreat.textContent = "Your final score is: " + timeRemaining;
        divObject.appendChild(createP2);
    }

    // THEN I can save my initials and score
    var lableCreat = document.createElement("label");
    lableCreat.setAttribute("id", "createLabel");
    lableCreat.textContent = "Enter your initials: ";

    divObject.appendChild(lableCreat);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    divObject.appendChild(createInput);

    // submit
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "Submit");
    submitButton.setAttribute("style", "background-color: green; color: white");
    submitButton.textContent = "Submit";
    divObject.appendChild(submitButton);

    submitButton.addEventListener("click", function (event) {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            // store initials and score
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.href = "highScores.html"
            
           
        }
    });
}