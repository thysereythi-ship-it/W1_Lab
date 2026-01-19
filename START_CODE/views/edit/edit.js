// Data
export let questionsEditList = [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  },
];

let editingIndex = null;

// DOM Elements
const questionsEdit = document.getElementById("questions");
const btnEdit = document.getElementById("btn-edit");
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalClose = document.getElementById("modal-close");
const btnCancel = document.getElementById("btn-cancel");
const btnCreate = document.getElementById("btn-create");

const inputTitle = document.getElementById("input-title");
const inputChoiceA = document.getElementById("input-choiceA");
const inputChoiceB = document.getElementById("input-choiceB");
const inputChoiceC = document.getElementById("input-choiceC");
const inputChoiceD = document.getElementById("input-choiceD");
const inputCorrect = document.getElementById("input-correct");

// Functions
function createQuestionCard(question, index) {
  const qCard = document.createElement("div");
  const questionText = document.createElement("p");
  const rightOption = document.createElement("div");
  const iEdit = document.createElement("img");
  const iDelete = document.createElement("img");

  questionText.innerText = question.title;
  iEdit.src = "/START_CODE/asset/edit.svg";
  iDelete.src = "/START_CODE/asset/delete.svg";

  // Add event listeners - using index instead of id
  iEdit.addEventListener("click", () => openEditModal(index));
  iDelete.addEventListener("click", () => deleteQuestion(index));

  rightOption.appendChild(iEdit);
  rightOption.appendChild(iDelete);
  rightOption.classList.add("right-option");

  questionText.setAttribute("id", "question");
  qCard.setAttribute("id", "question-card");
  qCard.appendChild(questionText);
  qCard.appendChild(rightOption);

  return qCard;
}

function renderQuestionEdit() {
  questionsEdit.innerHTML = "";
  for (let i = 0; i < questionsEditList.length; i++) {
    questionsEdit.appendChild(createQuestionCard(questionsEditList[i], i));
  }
}

function openAddModal() {
  editingIndex = null;
  modalTitle.textContent = "Create new question";
  btnCreate.textContent = "Create";

  inputTitle.value = "";
  inputChoiceA.value = "";
  inputChoiceB.value = "";
  inputChoiceC.value = "";
  inputChoiceD.value = "";
  inputCorrect.value = "A";

  modalOverlay.classList.add("show");
}

function openEditModal(index) {
  editingIndex = index;
  modalTitle.textContent = "Edit question";
  btnCreate.textContent = "Update";

  const question = questionsEditList[index];
  inputTitle.value = question.title;
  inputChoiceA.value = question.choiceA;
  inputChoiceB.value = question.choiceB;
  inputChoiceC.value = question.choiceC;
  inputChoiceD.value = question.choiceD;
  inputCorrect.value = question.correct;

  modalOverlay.classList.add("show");
}

function closeModal() {
  modalOverlay.classList.remove("show");
}

function saveQuestion() {
  const title = inputTitle.value.trim();

  if (!title) {
    alert("Please enter a question title");
    return;
  }

  const questionData = {
    title: title,
    choiceA: inputChoiceA.value.trim(),
    choiceB: inputChoiceB.value.trim(),
    choiceC: inputChoiceC.value.trim(),
    choiceD: inputChoiceD.value.trim(),
    correct: inputCorrect.value,
  };

  if (editingIndex !== null) {
    // Update existing question
    questionsEditList[editingIndex] = questionData;
  } else {
    // Add new question
    questionsEditList.push(questionData);
  }

  renderQuestionEdit();
  closeModal();
}

function deleteQuestion(index) {
  const question = questionsEditList[index];
  const confirmMessage = `Are you sure you want to delete "${question.title}"?`;

  if (confirm(confirmMessage)) {
    // Remove from array using splice
    questionsEditList.splice(index, 1);
    // Re-render the list
    renderQuestionEdit();
  }
}

// Event Listeners - Only add if we're on the edit page
if (questionsEdit) {
  btnEdit.addEventListener("click", openAddModal);
  modalClose.addEventListener("click", closeModal);
  btnCancel.addEventListener("click", closeModal);
  btnCreate.addEventListener("click", saveQuestion);

  // Close modal when clicking outside
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Initial render
  renderQuestionEdit();
}
