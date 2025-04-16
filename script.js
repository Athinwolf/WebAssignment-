const questions = [
  { question: "Fastest land animal?", answers: ["Lion", "Cheetah", "Tiger"], correct: 1 },
  { question: "2 * 6 = ?", answers: ["10", "12", "14"], correct: 1 },
  { question: "Water freezes at?", answers: ["0°C", "100°C", "50°C"], correct: 0 }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  nextBtn.disabled = true;
  selectedAnswer = null;

  // Fade-in refresh
  quizContainer.classList.remove("fade-in");
  void quizContainer.offsetWidth;
  quizContainer.classList.add("fade-in");

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.className = "option-btn";
    btn.addEventListener("click", () => selectAnswer(index, btn));
    answersEl.appendChild(btn);
  });
}

function selectAnswer(index, btn) {
  selectedAnswer = index;
  nextBtn.disabled = false;

  // Remove active state from all
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b => b.style.background = "linear-gradient(135deg, #8e44ad, #9b59b6)");

  // Highlight selected
  btn.style.background = "linear-gradient(135deg, #2980b9, #3498db)";
}

nextBtn.addEventListener("click", () => {
  if (selectedAnswer === null) return;

  if (selectedAnswer === questions[currentQuestion].correct) score++;

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    localStorage.setItem("quizScore", score);
    questionEl.textContent = `🎉 You scored ${score}/${questions.length}`;
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";
  }
});

showQuestion();
