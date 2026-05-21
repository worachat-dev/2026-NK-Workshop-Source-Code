document.addEventListener('DOMContentLoaded', () => {
    const voltageValueSpan = document.getElementById('voltage-value');
    const currentValueSpan = document.getElementById('current-value');
    const resistanceValueSpan = document.getElementById('resistance-value');
    const userAnswerInput = document.getElementById('user-answer');
    const unitSelect = document.getElementById('unit-select');
    const checkButton = document.getElementById('check-button');
    const nextButton = document.getElementById('next-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');
    const currentScoreSpan = document.getElementById('current-score');
    const totalQuestionsSpan = document.getElementById('total-questions');

    let currentQuestion = {}; // Stores V, I, R for the current problem
    let score = 0;
    let totalQuestionsAttempted = 0;
    const MAX_QUESTIONS = 5; // Set a limit for the game

    const questionsHistory = []; // To avoid immediate repeats

    // Function to generate a new Ohm's Law problem
    function generateProblem() {
        let v, i, r;
        let known1, known2;
        let missingVariable;

        // Ensure distinct values are chosen for the knowns
        const variables = ['V', 'I', 'R'];
        let shuffledVariables = shuffleArray([...variables]);
        known1 = shuffledVariables[0];
        known2 = shuffledVariables[1];
        missingVariable = shuffledVariables[2];

        // Generate values (keeping them relatively simple for a game)
        // V: 1 to 20V
        // I: 0.1 to 5A (steps of 0.1 or 0.5)
        // R: 1 to 100 Ohms (can be higher for variety)

        const generateValue = (type) => {
            if (type === 'V') return parseFloat((Math.random() * 19 + 1).toFixed(1)); // 1.0 to 20.0
            if (type === 'I') return parseFloat((Math.random() * 4.9 + 0.1).toFixed(1)); // 0.1 to 5.0
            if (type === 'R') return Math.floor(Math.random() * 99) + 1; // 1 to 100
        };

        // Assign knowns and calculate missing
        if (missingVariable === 'V') {
            i = generateValue('I');
            r = generateValue('R');
            v = parseFloat((i * r).toFixed(2)); // V = I * R
        } else if (missingVariable === 'I') {
            v = generateValue('V');
            r = generateValue('R');
            // Ensure I is not tiny for reasonable answers
            if (r === 0) r = 1; // Prevent division by zero
            i = parseFloat((v / r).toFixed(2)); // I = V / R
        } else { // missingVariable === 'R'
            v = generateValue('V');
            i = generateValue('I');
            // Ensure I is not tiny for reasonable answers
            if (i < 0.1) i = 0.1; // Prevent division by tiny number leading to huge R
            r = parseFloat((v / i).toFixed(2)); // R = V / I
        }

        return { v, i, r, missingVariable };
    }

    // Function to display the problem
    function displayProblem() {
        currentQuestion = generateProblem();

        voltageValueSpan.textContent = currentQuestion.missingVariable === 'V' ? '?' : currentQuestion.v;
        currentValueSpan.textContent = currentQuestion.missingVariable === 'I' ? '?' : currentQuestion.i;
        resistanceValueSpan.textContent = currentQuestion.missingVariable === 'R' ? '?' : currentQuestion.r;

        userAnswerInput.value = '';
        userAnswerInput.disabled = false;
        unitSelect.value = '';
        unitSelect.disabled = false;
        checkButton.disabled = false;
        nextButton.disabled = true;
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');
    }

    // Event listener for Check Answer button
    checkButton.addEventListener('click', () => {
        const userAnswer = parseFloat(userAnswerInput.value);
        const selectedUnit = unitSelect.value;
        let isCorrect = false;
        let correctValue;
        let correctUnit;
        const tolerance = 0.02; // 2% tolerance for floating point comparisons

        if (currentQuestion.missingVariable === 'V') {
            correctValue = currentQuestion.v;
            correctUnit = 'V';
        } else if (currentQuestion.missingVariable === 'I') {
            correctValue = currentQuestion.i;
            correctUnit = 'A';
        } else { // missingVariable === 'R'
            correctValue = currentQuestion.r;
            correctUnit = 'Ω';
        }

        // Check if value is a number and within tolerance
        if (!isNaN(userAnswer) && Math.abs(userAnswer - correctValue) / correctValue <= tolerance) {
            if (selectedUnit === correctUnit) {
                isCorrect = true;
            }
        }

        totalQuestionsAttempted++;
        totalQuestionsSpan.textContent = totalQuestionsAttempted;

        if (isCorrect) {
            feedbackDiv.textContent = "Correct! Great job!";
            feedbackDiv.classList.add('correct');
            feedbackDiv.classList.remove('incorrect');
            score++;
            currentScoreSpan.textContent = score;
        } else {
            feedbackDiv.textContent = `Incorrect. The correct answer is ${correctValue} ${correctUnit}.`;
            feedbackDiv.classList.add('incorrect');
            feedbackDiv.classList.remove('correct');
        }

        // Disable inputs and buttons after checking
        userAnswerInput.disabled = true;
        unitSelect.disabled = true;
        checkButton.disabled = true;
        nextButton.disabled = false; // Enable next button
        if (totalQuestionsAttempted >= MAX_QUESTIONS) {
            nextButton.disabled = true;
            feedbackDiv.textContent += ` Game Over! Your final score: ${score} out of ${MAX_QUESTIONS}.`;
            feedbackDiv.classList.add(score / MAX_QUESTIONS >= 0.6 ? 'correct' : 'incorrect'); // Green if pass, red if fail
            resetButton.textContent = "Play Again";
        }
    });

    // Event listener for Next Challenge button
    nextButton.addEventListener('click', () => {
        if (totalQuestionsAttempted < MAX_QUESTIONS) {
            displayProblem();
        } else {
            // This case should be handled by the check button's logic
            // but as a fallback.
            feedbackDiv.textContent = `Game Over! Your final score: ${score} out of ${MAX_QUESTIONS}.`;
            feedbackDiv.classList.add(score / MAX_QUESTIONS >= 0.6 ? 'correct' : 'incorrect');
            nextButton.disabled = true;
        }
    });

    // Event listener for Restart Game button
    resetButton.addEventListener('click', () => {
        score = 0;
        totalQuestionsAttempted = 0;
        currentScoreSpan.textContent = score;
        totalQuestionsSpan.textContent = totalQuestionsAttempted;
        resetButton.textContent = "Restart Game";
        initializeGame();
    });

    // Utility function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initial game setup
    function initializeGame() {
        totalQuestionsSpan.textContent = MAX_QUESTIONS; // Set total questions display
        displayProblem();
    }

    initializeGame();
});

// แหล่งที่มา:
// 1. https://github.com/Hakesh/p2-gaming-quiz
// 2. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
// 3. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior