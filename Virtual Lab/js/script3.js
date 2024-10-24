// Global variables for level3
let essaySubmitted = false;
const essayResultContainer = document.getElementById('result-container');
const essayResultText = document.getElementById('result-text');
const essayInput = document.getElementById('essay-input');

// Handle essay submission
function submitEssay() {
    if (essayInput.value.length > 0) {
        essayResultText.innerText = "Your essay has been submitted!";
        essaySubmitted = true;
        showEssayResults();
    } else {
        alert("Please write something before submitting.");
    }
}

// Show essay results
function showEssayResults() {
    document.getElementById('quiz-container').style.display = 'none';
    essayResultContainer.style.display = 'block';
}

// Restart essay level
function restartEssayLevel() {
    document.getElementById('quiz-container').style.display = 'block';
    essayResultContainer.style.display = 'none';
    essayInput.value = '';
    essaySubmitted = false;
}

// Go back to try-course page
function goToTryCourse() {
    window.location.href = 'try-course.html';
}

// Attach event listener on load
window.onload = () => {
    document.getElementById('submit-essay').addEventListener('click', submitEssay);
};
