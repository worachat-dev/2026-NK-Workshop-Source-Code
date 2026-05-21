## From """Unit 6: Electricity
Students will learn about simple electrical circuits and electrical quantities: electric current, electric potential difference (voltage), electrical resistance, using instruments to measure electrical quantities, analyzing the relationship between electric current and potential difference, series and parallel circuits, calculating electrical energy and electricity costs, and the functions of electronic components such as resistors, diodes, capacitors, and transistors.

Chapter 1: Simple Electrical Circuits
A simple electrical circuit consists of a power source, a conductor, and an electrical device. When the circuit is complete, electric current flows from the positive terminal of the power source, through the electrical device, and back to the negative terminal of the power source. Electric current is the amount of electric charge flowing through a conductor from a point of high potential to a point of low potential per unit time, measured in amperes, which can be measured with an ammeter. The difference in electrical potential between two points is called electric potential difference or voltage, measured in volts, which can be measured with a voltmeter. """ and please Create a "Ohm's Law Calculator Game": Students are given two values (V, I, or R) and must calculate the third, reinforcing the relationship by using the index.html, style.css, script.js?

Okay, I will create an "Ohm's Law Calculator Game".

This game will:
1.  **Present a Challenge:** Randomly generate two of the three Ohm's Law values (Voltage (V), Current (I), Resistance (R)).
2.  **Input Field:** Provide an input field for the student to enter the calculated third value.
3.  **Unit Selection:** (Optional, but good for learning) Have students select the correct unit for their answer.
4.  **Check/Feedback:** Validate the student's answer and provide immediate feedback.
5.  **New Challenge:** Allow students to move to the next question.
6.  **Score Tracking:** Keep track of the correct answers.

I'll use Ohm's Law formula: $V = I \times R$ (Voltage = Current $\times$ Resistance).

---

## Ohm's Law Calculator Game: Game Files

Here are the `index.html`, `style.css`, and `script.js` files for the "Ohm's Law Calculator Game".

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ohm's Law Calculator Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Ohm's Law Calculator Challenge</h1>
        <p>Calculate the missing value using Ohm's Law ($V = I \times R$).</p>

        <div class="challenge-area">
            <div class="value-display">
                <p>Voltage (V): <span id="voltage-value">?</span> V</p>
                <p>Current (I): <span id="current-value">?</span> A</p>
                <p>Resistance (R): <span id="resistance-value">?</span> Ω</p>
            </div>

            <div class="answer-section">
                <label for="user-answer">Your Answer:</label>
                <input type="number" id="user-answer" step="0.01" placeholder="Enter value">
                <select id="unit-select">
                    <option value="">Select Unit</option>
                    <option value="V">Volts (V)</option>
                    <option value="A">Amperes (A)</option>
                    <option value="Ω">Ohms (Ω)</option>
                </select>
            </div>
        </div>

        <div class="controls">
            <button id="check-button">Check Answer</button>
            <button id="next-button" disabled>Next Challenge</button>
            <button id="reset-button">Restart Game</button>
        </div>

        <div id="feedback" class="feedback-message"></div>
        <div class="score-display">Score: <span id="current-score">0</span> / <span id="total-questions">0</span></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### `style.css`

```css
body {
    font-family: 'Inter', sans-serif; /* Modern, clean font */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1A2A3D, #2C3E50, #15202B); /* Dark blue gradient */
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    color: #ECF0F1; /* Light text */
}

.game-container {
    background-color: #2C3E50; /* Dark blue-gray */
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    padding: 40px;
    text-align: center;
    max-width: 700px;
    width: 100%;
    border: 1px solid #4A637F;
}

h1 {
    color: #FFD700; /* Gold */
    margin-bottom: 15px;
    font-size: 2.5em;
    font-weight: 800;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}

p {
    color: #BDC3C7; /* Lighter gray */
    margin-bottom: 30px;
    font-size: 1.05em;
    line-height: 1.6;
}

.challenge-area {
    background-color: #34495E; /* Slightly lighter blue-gray */
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 35px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.value-display p {
    margin: 10px 0;
    font-size: 1.4em;
    font-weight: 600;
    color: #ECF0F1;
}

.value-display span {
    color: #81ECEC; /* Light Aqua */
    font-family: 'Courier New', monospace;
    font-size: 1.1em;
}

.answer-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    flex-wrap: wrap; /* Allow wrapping */
}

.answer-section label {
    font-size: 1.2em;
    font-weight: bold;
    color: #BDC3C7;
}

#user-answer {
    padding: 10px 15px;
    font-size: 1.1em;
    border: 2px solid #3498DB; /* Blue border */
    border-radius: 8px;
    background-color: #ECF0F1; /* Light background */
    color: #2C3E50; /* Dark text */
    width: 120px;
    text-align: center;
}

#user-answer::placeholder {
    color: #999;
}

#unit-select {
    padding: 10px 15px;
    font-size: 1.1em;
    border: 2px solid #3498DB;
    border-radius: 8px;
    background-color: #ECF0F1;
    color: #2C3E50;
    cursor: pointer;
}

.controls {
    margin-top: 30px;
}

button {
    background-color: #2ECC71; /* Green */
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 1.1em;
    cursor: pointer;
    margin: 0 10px;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 6px 15px rgba(46, 204, 113, 0.3);
}

button:hover:not(:disabled) {
    background-color: #27AE60; /* Darker Green */
    transform: translateY(-3px);
}

button:disabled {
    background-color: #7F8C8D; /* Silver for disabled */
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
}

#check-button {
    background-color: #F39C12; /* Orange */
    box-shadow: 0 6px 15px rgba(243, 156, 18, 0.3);
}
#check-button:hover:not(:disabled) {
    background-color: #E67E22; /* Darker Orange */
}

#next-button {
    background-color: #3498DB; /* Blue */
    box-shadow: 0 6px 15px rgba(52, 152, 219, 0.3);
}
#next-button:hover:not(:disabled) {
    background-color: #2980B9; /* Darker Blue */
}

#reset-button {
    background-color: #E74C3C; /* Red */
    box-shadow: 0 6px 15px rgba(231, 76, 60, 0.3);
}
#reset-button:hover:not(:disabled) {
    background-color: #C0392B; /* Darker Red */
}

.feedback-message {
    margin-top: 30px;
    font-weight: bold;
    font-size: 1.4em;
    min-height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.feedback-message.correct {
    color: #2ECC71; /* Green */
}
.feedback-message.incorrect {
    color: #E74C3C; /* Red */
}

.score-display {
    margin-top: 25px;
    font-size: 1.3em;
    color: #BDC3C7;
    font-weight: 600;
}

.score-display span {
    color: #FFD700; /* Gold for score numbers */
}
```

### `script.js`

```javascript
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
```

---

## How to Set Up and Play

1.  **Create a Folder:** Make a new folder on your computer (e.g., `OhmsLawGame`).
2.  **Save the Files:**
    * Save the `index.html` code as `index.html` inside the folder.
    * Save the `style.css` code as `style.css` inside the folder.
    * Save the `script.js` code as `script.js` inside the folder.
3.  **Open in Browser:** Open the `index.html` file using your web browser (e.g., Chrome, Firefox).

### How to Play:

1.  **Observe the Problem:** The game will display two values from Voltage (V), Current (I), or Resistance (R), and one value will be marked with a `?`.
2.  **Calculate:** Use Ohm's Law ($V = I \times R$) to calculate the missing value.
    * If `V` is missing: `V = I * R`
    * If `I` is missing: `I = V / R`
    * If `R` is missing: `R = V / I`
3.  **Enter Answer:** Type your calculated answer into the "Your Answer" input field.
4.  **Select Unit:** Choose the correct unit for your answer from the "Select Unit" dropdown menu (Volts (V), Amperes (A), or Ohms (Ω)).
5.  **Check Answer:** Click the **"Check Answer"** button.
6.  **Get Feedback:** The game will tell you if your answer is correct or incorrect. If incorrect, it will reveal the correct value and unit.
7.  **Next Challenge:** Click **"Next Challenge"** to get a new problem.
8.  **Restart Game:** Click **"Restart Game"** to reset your score and start from the beginning.
9.  **Game End:** The game will run for 5 questions (`MAX_QUESTIONS`). After the last question, it will show your final score.

This game provides a practical and interactive way for students to apply Ohm's Law and reinforce their understanding of the relationship between voltage, current, and resistance.

```
แหล่งที่มา:
1. https://github.com/Hakesh/p2-gaming-quiz
2. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
3. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior