//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
    {
      question: "What book holds the record for the fastest selling book in history?",
      answers: [
        { text: "1984", correct: false },
        { text: "The Picture of Dorian Grey", correct: false },
        { text: "Harry Potter and the Deathly Hallows", correct: true },
        { text: "Farenheight 451", correct: false },
      ],
    },
    {
      question: "The iconic “Hollywood” sign originally spelled out what word?",
      answers: [
        { text: "Hollywoo", correct: false },
        { text: "Hollywoodland", correct: true },
        { text: "Holly-Wood", correct: false },
        { text: "Welcome to Hollywood!", correct: false },
      ],
    },
    {
      question: "Beyoncé was in a girl group before Destiny's Child, but what was it called?",
      answers: [
        { text: "Flo", correct: false },
        { text: "The Dreamettes", correct: false },
        { text: "TLC Jr.", correct: false },
        { text: "Girls Tyme", correct: true },
      ],
    },
    {
      question: "Fans of The Office will remember that “I want my baby back, baby back, baby back” is the main repeated line in a commercial jingle for what restaurant chain?",
      answers: [
        { text: "Taco Bell", correct: false },
        { text: "Applebee's", correct: false },
        { text: "Chili's", correct: true },
        { text: "McDonald's", correct: false },
      ],
    },
    {
      question: "What is the highest-grossing film of all time",
      answers: [
        { text: "Shawshank Redemption", correct: false },
        { text: "My Cousin Vinnie", correct: false },
        { text: "Avatar", correct: true },
        { text: "The Godfather", correct: false },
      ],
    },
  ];

  // QUIZ STATE VARS
  let currentQuestionIndex = 0;
  let score = 0;
  let answersDisabled = false //double clicking wont increment score

  totalQuestionsSpan.textContent = quizQuestions.length;
  maxScoreSpan.textContent = quizQuestions.length;

  //event listeners
  startButton.addEventListener("click", startQuiz) // these are functions we're building, invokes them at the click 
  restartButton.addEventListener("click", restartQuiz)

  function startQuiz(){ //built this to happen when button is clicked 
    //console.log("quiz started") <-- just testing in the  console 
    //reset vars everytime quiz is started 
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active"); //once button is clicked, startScreen not active, so not visible
    quizScreen.classList.add("active"); // button clikced --> quiz starts --> quiz active 

    showQuestion() //new function
  }

  function showQuestion(){
    //reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question

    answersContainer.innerHTML = ""; // previous answers are equal to nothing, only next answers shown 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")

        //dataset is property of button element that stores custom data
        button.dataset.correct = answer.correct

        button.addEventListener("click", selectAnswer)

        answersContainer.appendChild(button);
    });
  }
  function selectAnswer(event){
    if(answersDisabled) return

    answersDisabled = true

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

    //Array.from turns the list of answers (answer container) into and array
    //this way, we can use forEach on it
    Array.from(answersContainer.children).forEach(button => { 
        if(button.dataset.correct === "true") {
            button.classList.add("correct")
        } else if (button === selectedButton) {
            button.classList.add("incorrect")
        }
    });
    if(isCorrect){
        score ++;
        scoreSpan.textContent = score
    }
    setTimeout(() => {
        currentQuestionIndex++;

        //check if there are more question or quiz over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        }else {
            showResults()
        }
    },900)
}

function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

    if(percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
         resultMessage.textContent = "Great Job! You know your stuff!"
    } else if (percentage >= 60) {
         resultMessage.textContent = "Good effort!";
    } else if (percentage >= 40) {
         resultMessage.textContent = "Not bad! Try again to improve!";
    } else{
         resultMessage.textContent = "Keep trying! You'll get better!";
    }
}

  function restartQuiz(){
    //console.log("quiz re-started")
    resultScreen.classList.remove("active");
    startQuiz();
  }