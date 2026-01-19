// import the data from the file edit.js
import { questionsEditList } from "../edit/edit.js";

// DOMS ELEMENTS  ---------------------------------------------------------
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_score = document.querySelector("#scoreContainer");
const dom_start = document.querySelector("#start");
const dom_progress = document.querySelector("#progress");
const dom_done = document.querySelector("#done");

dom_start.addEventListener("click", onStart);

// DATA  ---------------------------------------------------------
let questions = questionsEditList;
let runningQuestionIndex = 0;
let score = 0;

// add event listener for 4 choice
dom_choiceA.addEventListener("click", () => onPlayerSubmit("A"));
dom_choiceB.addEventListener("click", () => onPlayerSubmit("B"));
dom_choiceC.addEventListener("click", () => onPlayerSubmit("C"));
dom_choiceD.addEventListener("click", () => onPlayerSubmit("D"));

// FUNCTIONS ---------------------------------------------------------

// Hide a given element
function hide(element) {
  // TODO
  element.style.display = "none";
}

function show(element) {
  // TODO
  element.style.display = "block";
}

function onStart() {
  hide(dom_start);
  show(dom_quiz);
  // Render the current question
  renderQuestion();
  // Display the quiz view,
}

function renderQuestion() {
  // Render the current question on the quiz view
  let q = questions[runningQuestionIndex];

  dom_question.innerText = q.title;
  dom_choiceA.innerText = q.choiceA;
  dom_choiceB.innerText = q.choiceB;
  dom_choiceC.innerText = q.choiceC;
  dom_choiceD.innerText = q.choiceD;

  show(dom_progress);
  dom_done.style.width = `${Math.round(((runningQuestionIndex + 1) / questions.length) * 100)}%`;
}

function onPlayerSubmit(answer) {
  // Update the score, display the next question or the score view
  let q = questions[runningQuestionIndex];

  // check correct answer
  if (answer === q.correct) {
    score++;
  }

  runningQuestionIndex++;

  // next question or show score
  if (runningQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    hide(dom_quiz);
    hide(dom_progress);
    renderScore();
    show(dom_score);
    setTimeout(() => {
      window.location.href = "/START_CODE/index.html";
    }, 2000);
  }
}

function renderScore() {
  // dom_score.innerHTML = '';
  // calculate the amount of question percent answered by the user
  const scorePercent = Math.round((score / questions.length) * 100);

  // choose the image based on the scorePerCent
  const img = document.createElement("img");
  const print = document.createElement("h5");
  if (scorePercent > 80) {
    img.src = "../../asset/emoji_5.svg";
  } else if (scorePercent > 60 && scorePercent <= 80) {
    img.src = "../../asset/emoji_4.svg";
  } else if (scorePercent > 40 && scorePercent <= 60) {
    img.src = "../../asset/emoji_3.svg";
  } else if (scorePercent > 20 && scorePercent <= 40) {
    img.src = "../../asset/emoji_2.svg";
  } else {
    img.src = "../../asset/emoji_1.svg";
  }
  print.innerText = `Score: ${scorePercent} %`;
  dom_score.appendChild(img);
  dom_score.appendChild(print);
}

// FUNCTIONS ---------------------------------------------------------
show(dom_start);
hide(dom_quiz);
hide(dom_score);
hide(dom_progress);
