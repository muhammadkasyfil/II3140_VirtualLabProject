const questionsLevel2 = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Rome", "Berlin", "Madrid"], 
        correctAnswer: "Paris"
    },
    {
        question: "They _____ to the cinema last week",
        options: ["go", "goes", "went", "going"],
        correctAnswer: "went"
    },
    {
        question: "What is the opposite of 'expensive'?",
        options: ["cheap", "big", "slow", "beautiful"],
        correctAnswer: "went"
    },
    {
        question: "If it rains tomorrow, we _____ stay at home.",
        options: ["will", "would", "were", "was"],
        correctAnswer: "went"
    }
];

// Global variables for level2
let currentDragQuestionIndex = 0;
let correctDragAnswers = 0;
const totalDragQuestions = questionsLevel2.length;
const dragProgressBar = document.getElementById('progress-bar');
const dragQuestionContainer = document.getElementById('quiz-container');
const dragResultContainer = document.getElementById('result-container');
const dragResultText = document.getElementById('result-text');
const dragOptionsContainer = document.getElementById('drag-options');
const dropArea = document.getElementById('drop-area');

// Load the next drag-and-drop question
function loadDragQuestion() {
    resetDragState();
    const currentDragQuestion = questionsLevel2[currentDragQuestionIndex];
    document.getElementById('question').innerText = currentDragQuestion.question;

    const options = currentDragQuestion.options;

    // Create draggable items (options)
    options.forEach((option) => {
        const dragItem = document.createElement('div');
        dragItem.classList.add('drag-item');
        dragItem.innerText = option;
        dragItem.draggable = true;
        dragItem.dataset.correct = option === currentDragQuestion.correctAnswer; 
        dragItem.addEventListener('dragstart', handleDragStart);
        dragOptionsContainer.appendChild(dragItem);
    });

    updateDragProgressBar();
}

// Handle dragging and dropping
function handleDragStart(e) {
    e.dataTransfer.setData('text', e.target.innerText);  
}

function handleDragOver(e) {
    e.preventDefault();  
}

function handleDrop(e) {
    e.preventDefault();  
    const draggedAnswer = e.dataTransfer.getData('text');  
    const correctAnswer = questionsLevel2[currentDragQuestionIndex].correctAnswer; 

    if (draggedAnswer === correctAnswer) {
        dropArea.style.backgroundColor = 'green';  
        correctDragAnswers++;
    } else {
        dropArea.style.backgroundColor = 'red';  
    }

    setTimeout(() => {
        currentDragQuestionIndex++;
        if (currentDragQuestionIndex < totalDragQuestions) {
            loadDragQuestion();
        } else {
            showDragResults();
        }
    }, 1000);
}

// Reset state for the next question
function resetDragState() {
    dragOptionsContainer.innerHTML = '';  
    dropArea.style.backgroundColor = '';  
}

// Update progress bar
function updateDragProgressBar() {
    const progressPercentage = ((currentDragQuestionIndex + 1) / totalDragQuestions) * 100;
    dragProgressBar.style.width = progressPercentage + '%';
}

// Show drag results
function showDragResults() {
    dragQuestionContainer.style.display = 'none';
    dragResultContainer.style.display = 'block';
    dragProgressBar.style.display = 'none'; 
    dragResultText.innerText = `You answered ${correctDragAnswers} out of ${totalDragQuestions} correctly.`;
}

// Restart the level
function restartLevel2() {
    currentDragQuestionIndex = 0;
    correctDragAnswers = 0;
    dragQuestionContainer.style.display = 'block';
    dragResultContainer.style.display = 'none';
    dragProgressBar.style.display = 'block';  
    loadDragQuestion();
}

// Go back to try-course page
function goToTryCourse() {
    window.location.href = 'try-course.html';
}

// Start the drag-and-drop quiz on page load
window.onload = () => {
    loadDragQuestion();
};

// Attach dragover and drop event listeners to the drop area
dropArea.addEventListener('dragover', handleDragOver);  
dropArea.addEventListener('drop', handleDrop);  
