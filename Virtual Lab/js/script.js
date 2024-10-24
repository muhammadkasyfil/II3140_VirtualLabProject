const questionsLevel1 = [
    {
        question: "Choose the correct word to complete the sentence: I _____ to the park yesterday",
        answers: [
            { text: 'Go', correct: false },
            { text: 'Going', correct: false },
            { text: 'Went', correct: true },
            { text: 'Gone', correct: false }
        ]
    },
    {
        question: "Which of these is a fruit?",
        answers: [
            { text: 'Chair', correct: false },
            { text: 'Apple', correct: true },
            { text: 'Dog', correct: false },
            { text: 'Car', correct: false }
        ]
    },
    {
        question: "Which is the correct sentence?",
        answers: [
            { text: 'She is a teacher.', correct: true },
            { text: 'She are a teacher.', correct: false },
            { text: 'She am a teacher.', correct: false },
            { text: 'She be a teacher.', correct: false }
        ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            { text: 'Oxygen', correct: true },
            { text: 'Hydrogen', correct: false },
            { text: 'Gold', correct: false },
            { text: 'Silver', correct: false }
        ]
    },
    {
        question: "Choose the correct plural form: One cat, two ____.",
        answers: [
            { text: 'cats', correct: true },
            { text: 'cates', correct: false },
            { text: 'cat', correct: false },
            { text: 'catses', correct: false }
        ]
    }
];


// Global variables
let currentQuestionIndex = 0;
let correctAnswers = 0;
const totalQuestions = questionsLevel1.length;
const progressBar = document.getElementById('progress-bar');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const submitButton = document.getElementById('submit-btn');
let selectedAnswer = null;

// Load the next question
function loadQuestion() {
    resetState();
    const currentQuestion = questionsLevel1[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);  // User selects an answer
        answerButtons.appendChild(button);
    });

    updateProgressBar();
}

// Handle answer selection without changing the color
function selectAnswer(e) {
    selectedAnswer = e.target;
    Array.from(answerButtons.children).forEach(button => {
        button.classList.remove('selected');
    });
    selectedAnswer.classList.add('selected');
}

// Prevent showing color change until submit is clicked
submitButton.addEventListener('click', () => {
    if (selectedAnswer) {
        const correct = selectedAnswer.dataset.correct === "true";
        if (correct) {
            selectedAnswer.style.backgroundColor = 'green';
        } else {
            selectedAnswer.style.backgroundColor = 'red';
        }

        Array.from(answerButtons.children).forEach(button => {
            button.disabled = true; 
            if (button !== selectedAnswer) {
                button.style.backgroundColor = '#e1f5fe'; 
            }
        });

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < totalQuestions) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 1000);
    } else {
        alert("Please select an answer before submitting.");
    }
});

// Reset state for next question
function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    selectedAnswer = null;
}

// Update progress bar
function updateProgressBar() {
    const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = progressPercentage + '%';
}

// Show final results
function showResults() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    progressBar.style.display = 'none';  
    resultText.innerText = `You answered ${correctAnswers} out of ${totalQuestions} questions correctly.`;
}

// Restart level
function restartLevel() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    progressBar.style.display = 'block';  
    loadQuestion();
}

// Go back to try-course page
function goToTryCourse() {
    window.location.href = 'try-course.html';
}

// Start the quiz on load
window.onload = () => {
    loadQuestion();
};
