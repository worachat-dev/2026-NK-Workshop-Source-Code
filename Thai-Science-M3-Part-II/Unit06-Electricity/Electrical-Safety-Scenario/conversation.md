## From """Unit 6: Electricity
Students will learn about simple electrical circuits and electrical quantities: electric current, electric potential difference (voltage), electrical resistance, using instruments to measure electrical quantities, analyzing the relationship between electric current and potential difference, series and parallel circuits, calculating electrical energy and electricity costs, and the functions of electronic components such as resistors, diodes, capacitors, and transistors. Chapter 2: Electricity in Daily Life
Electrical energy used per unit time is called electric power, with the SI unit of joules per second or watts. The electrical energy consumed by an appliance can be calculated by multiplying the appliance's power by the time it is used, which can then be used to calculate the monthly electricity bill. Choosing electrical appliances correctly, safely, and economically can be done by selecting appliances that match the specified voltage and appropriate power for use, and by using them correctly.  and please Create a  "Electrical Safety Scenario": Students are presented with unsafe electrical situations and must identify the hazards and choose the correct safety actions by using the index.html, style.css, script.js?

Okay, I will create an "Electrical Safety Scenario" game.

This game will:
1.  **Present Scenarios:** Display an image or description of an unsafe electrical situation.
2.  **Identify Hazards:** Ask students to identify the potential hazards.
3.  **Choose Actions:** Provide multiple-choice options for the correct safety actions.
4.  **Feedback:** Give immediate feedback on their choices, explaining why an action is safe or unsafe.
5.  **Progression:** Allow students to move through several different scenarios.
6.  **Score Tracking:** Keep track of correct identifications.

---

## Electrical Safety Scenario: Game Files

Here are the `index.html`, `style.css`, and `script.js` files for the "Electrical Safety Scenario" game.

**Important:** You will need to create an `images` subfolder in the same directory as your HTML file and place the specified image files (`exposed_wire.jpg`, `overloaded_socket.jpg`, `wet_area_appliance.jpg`, `damaged_cord.jpg`, `touching_power_line.jpg`) within it. You can find suitable free-to-use images from sites like Unsplash, Pexels, or Pixabay.

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electrical Safety Scenario</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Electrical Safety Challenge</h1>
        <p>Identify the electrical hazards and choose the safest action in each scenario.</p>

        <div class="scenario-display">
            <img id="scenario-image" src="" alt="Electrical Safety Scenario">
            <p id="scenario-description" class="description"></p>
        </div>

        <div class="question-area">
            <h2>What is the hazard? (Select all that apply)</h2>
            <div id="hazard-options" class="options-container">
                </div>

            <h2>What is the SAFEST action? (Select ONE)</h2>
            <div id="action-options" class="options-container">
                </div>
        </div>

        <div class="controls">
            <button id="check-button">Check Answers</button>
            <button id="next-button" disabled>Next Scenario</button>
            <button id="reset-button">Restart Game</button>
        </div>

        <div id="feedback" class="feedback-message"></div>
        <div class="score-display">Score: <span id="current-score">0</span> / <span id="total-scenarios">0</span></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### `style.css`

```css
body {
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #2c3e50, #34495e, #1a202c); /* Dark blue-gray gradient */
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    color: #ecf0f1; /* Light text */
}

.game-container {
    background-color: #3b5063; /* Slightly lighter dark blue-gray */
    border-radius: 25px;
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.5);
    padding: 50px;
    text-align: center;
    max-width: 900px;
    width: 100%;
}

h1 {
    color: #FF6347; /* Tomato Red for safety theme */
    margin-bottom: 20px;
    font-size: 3em;
    font-weight: 900;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
}

p {
    color: #bdc3c7; /* Lighter gray */
    margin-bottom: 30px;
    font-size: 1.1em;
    line-height: 1.6;
}

.scenario-display {
    background-color: #4a6075; /* Even lighter blue-gray */
    border-radius: 18px;
    padding: 25px;
    margin-bottom: 35px;
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);
    min-height: 300px; /* Ensure space for image */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#scenario-image {
    max-width: 90%;
    max-height: 250px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    margin-bottom: 15px;
    object-fit: contain; /* Ensure image fits well */
}

.scenario-display .description {
    font-size: 1.2em;
    font-weight: 500;
    color: #a2d2ff; /* Light Blue */
    margin: 0;
}

.question-area h2 {
    color: #f1c40f; /* Gold */
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 1.8em;
}

.options-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-bottom: 25px;
}

.option-button {
    background-color: #3498db; /* Blue */
    color: white;
    border: 2px solid transparent;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    user-select: none;
    flex: 1 1 auto; /* Allow items to grow/shrink, but not below content size */
    min-width: 150px; /* Ensure buttons don't get too small */
    max-width: 30%; /* Limit width */
    text-align: center;
}

.option-button:hover:not(:disabled) {
    background-color: #2980b9; /* Darker Blue */
    transform: translateY(-2px);
}

.option-button.selected {
    background-color: #f1c40f; /* Gold when selected */
    border-color: #e67e22; /* Darker orange border */
    color: #2c3e50;
    font-weight: bold;
}

.option-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Feedback styles for buttons */
.option-button.correct-feedback {
    background-color: #27ae60; /* Darker Green for correct */
    border-color: #2ecc71;
    color: white;
}

.option-button.incorrect-feedback {
    background-color: #c0392b; /* Darker Red for incorrect */
    border-color: #e74c3c;
    color: white;
}


.controls {
    margin-top: 30px;
}

button {
    background-color: #1abc9c; /* Turquoise */
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 12px;
    font-size: 1.25em;
    cursor: pointer;
    margin: 0 15px;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 8px 20px rgba(26, 188, 156, 0.3);
}

button:hover:not(:disabled) {
    background-color: #16a085; /* Darker Turquoise */
    transform: translateY(-3px);
}

button:disabled {
    background-color: #7f8c8d; /* Silver for disabled */
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
}

#check-button {
    background-color: #e74c3c; /* Red for checking hazards */
    box-shadow: 0 8px 20px rgba(231, 76, 60, 0.3);
}
#check-button:hover:not(:disabled) {
    background-color: #c0392b; /* Darker Red */
}

#next-button {
    background-color: #2ecc71; /* Green for next */
    box-shadow: 0 8px 20px rgba(46, 204, 113, 0.3);
}
#next-button:hover:not(:disabled) {
    background-color: #27ae60; /* Darker Green */
}

#reset-button {
    background-color: #95a5a6; /* Silver */
    box-shadow: 0 8px 20px rgba(149, 165, 166, 0.3);
}
#reset-button:hover:not(:disabled) {
    background-color: #7f8c8d; /* Darker Silver */
}

.feedback-message {
    margin-top: 40px;
    font-weight: bold;
    font-size: 1.6em;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.feedback-message.correct {
    color: #2ecc71;
}

.feedback-message.incorrect {
    color: #e74c3c;
}

.score-display {
    margin-top: 25px;
    font-size: 1.3em;
    color: #bdc3c7;
    font-weight: 600;
}

.score-display span {
    color: #f1c40f; /* Gold for score numbers */
}
```

### `script.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const scenarios = [
        {
            image: "exposed_wire.jpg",
            description: "You see an electrical cord with frayed insulation and exposed wires near a common pathway in your home.",
            hazards: ["Electric shock", "Fire hazard"],
            correctHazardIndices: [0, 1],
            actions: [
                { text: "Cover the exposed wire with tape and continue using it.", correct: false, explanation: "Tape is not sufficient insulation and the hazard remains. This is very dangerous." },
                { text: "Unplug the cord immediately (if safe to do so from the plug), warn others, and get it repaired or replaced.", correct: true, explanation: "Unplugging removes the power. Repair or replacement by a qualified person is essential for safety." },
                { text: "Ignore it, it's just a small wire.", correct: false, explanation: "Even a small exposed wire can cause severe shock or a fire." }
            ],
            correctActionIndex: 1
        },
        {
            image: "overloaded_socket.jpg",
            description: "A single wall socket has multiple extension cords plugged into it, powering a TV, computer, fan, and phone charger, with wires looking strained.",
            hazards: ["Overheating", "Fire hazard", "Damage to appliances"],
            correctHazardIndices: [0, 1, 2],
            actions: [
                { text: "Add another extension cord to power more devices.", correct: false, explanation: "This will worsen the overload, significantly increasing fire risk." },
                { text: "Distribute appliances to other available sockets, or use a power strip with surge protection and circuit breaker for high-power devices.", correct: true, explanation: "Distributing the load prevents overheating. A good power strip adds safety features but doesn't allow infinite devices." },
                { text: "Unplug the phone charger, as it uses the least power.", correct: false, explanation: "While a small step, it doesn't address the core issue of an overloaded socket." }
            ],
            correctActionIndex: 1
        },
        {
            image: "wet_area_appliance.jpg",
            description: "You're in a bathroom and see a portable electric heater plugged in dangerously close to the bathtub, which is partially filled with water.",
            hazards: ["Electric shock", "Electrocution", "Water and electricity contact"],
            correctHazardIndices: [0, 1, 2],
            actions: [
                { text: "Move the heater further away from the tub and ensure your hands are dry before touching it.", correct: true, explanation: "Always keep electrical appliances away from water. Water is an excellent conductor and can cause fatal shocks." },
                { text: "Finish your bath quickly, then unplug the heater.", correct: false, explanation: "The immediate danger of electrocution remains. Water and electricity are a deadly combination." },
                { text: "It's fine, as long as the heater isn't directly in the water.", correct: false, explanation: "Splashing water or a fall could still lead to electrocution. Always maintain a safe distance." }
            ],
            correctActionIndex: 0
        },
        {
            image: "damaged_cord.jpg",
            description: "While vacuuming, you accidentally run over the vacuum cleaner's cord, causing a visible cut in the outer insulation.",
            hazards: ["Electric shock", "Short circuit", "Fire hazard"],
            correctHazardIndices: [0, 1, 2],
            actions: [
                { text: "Put electrical tape over the cut and keep using the vacuum.", correct: false, explanation: "Tape is a temporary fix and does not fully insulate. The cord is compromised and remains dangerous." },
                { text: "Immediately unplug the vacuum cleaner, and do not use it again until the cord is professionally replaced.", correct: true, explanation: "Unplugging removes the immediate danger. A damaged cord must be replaced to ensure safety." },
                { text: "Just be careful not to touch the cut part.", correct: false, explanation: "The cut cord is an exposed hazard that can cause shock or fire even without direct contact if it short circuits." }
            ],
            correctActionIndex: 1
        },
        {
            image: "touching_power_line.jpg",
            description: "You are outside and see a metal ladder that has fallen and is touching a low-hanging outdoor power line after a storm.",
            hazards: ["Electrocution", "Electric shock", "Arcing and fire"],
            correctHazardIndices: [0, 1, 2],
            actions: [
                { text: "Grab the ladder and try to move it away from the power line.", correct: false, explanation: "Never touch anything in contact with a power line. The ladder is energized and touching it will cause immediate electrocution." },
                { text: "Call emergency services (e.g., 191 in Thailand for police, who can contact electricity authority) immediately and warn others to stay far away.", correct: true, explanation: "This is a life-threatening situation. Only trained professionals from the electricity authority can safely handle live power lines. Maintain a significant distance (at least 10 meters)." },
                { text: "Throw a stick at the ladder to knock it off the line.", correct: false, explanation: "Throwing objects could cause further arcing or even make the stick conductive. It's too risky." }
            ],
            correctActionIndex: 1
        }
    ];

    const scenarioImage = document.getElementById('scenario-image');
    const scenarioDescription = document.getElementById('scenario-description');
    const hazardOptionsContainer = document.getElementById('hazard-options');
    const actionOptionsContainer = document.getElementById('action-options');
    const checkButton = document.getElementById('check-button');
    const nextButton = document.getElementById('next-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');
    const currentScoreSpan = document.getElementById('current-score');
    const totalScenariosSpan = document.getElementById('total-scenarios');

    let currentScenarioIndex = 0;
    let shuffledScenarios = [];
    let score = 0;
    let selectedHazards = new Set(); // Using a Set to store selected hazard texts
    let selectedAction = null; // Stores the text of the selected action

    function initializeGame() {
        shuffledScenarios = shuffleArray([...scenarios]);
        currentScenarioIndex = 0;
        score = 0;
        totalScenariosSpan.textContent = shuffledScenarios.length;
        updateScoreDisplay();
        loadScenario();
        resetButton.disabled = false;
    }

    function loadScenario() {
        if (currentScenarioIndex >= shuffledScenarios.length) {
            endGame();
            return;
        }

        const currentScenario = shuffledScenarios[currentScenarioIndex];
        scenarioImage.src = `images/${currentScenario.image}`;
        scenarioDescription.textContent = currentScenario.description;
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');
        selectedHazards.clear();
        selectedAction = null;

        checkButton.disabled = false;
        nextButton.disabled = true;

        // Populate Hazard Options
        hazardOptionsContainer.innerHTML = '';
        currentScenario.hazards.forEach((hazard, index) => {
            const button = document.createElement('button');
            button.classList.add('option-button', 'hazard-option');
            button.textContent = hazard;
            button.dataset.hazard = hazard; // Store hazard text
            button.addEventListener('click', () => toggleSelection(button, selectedHazards, hazard));
            hazardOptionsContainer.appendChild(button);
        });

        // Populate Action Options
        actionOptionsContainer.innerHTML = '';
        currentScenario.actions.forEach((action) => {
            const button = document.createElement('button');
            button.classList.add('option-button', 'action-option');
            button.textContent = action.text;
            button.dataset.action = action.text; // Store action text
            button.addEventListener('click', () => selectSingleAction(button, action.text));
            actionOptionsContainer.appendChild(button);
        });

        // Re-enable all buttons from previous checks
        document.querySelectorAll('.option-button').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct-feedback', 'incorrect-feedback', 'selected');
        });
    }

    function toggleSelection(button, selectionSet, value) {
        if (selectionSet.has(value)) {
            selectionSet.delete(value);
            button.classList.remove('selected');
        } else {
            selectionSet.add(value);
            button.classList.add('selected');
        }
    }

    function selectSingleAction(button, actionText) {
        // Deselect any previously selected action button
        document.querySelectorAll('.action-option').forEach(btn => {
            btn.classList.remove('selected');
        });

        button.classList.add('selected');
        selectedAction = actionText;
    }

    function checkAnswers() {
        const currentScenario = shuffledScenarios[currentScenarioIndex];
        let hazardsCorrect = true;
        let actionCorrect = false;

        // Check Hazards
        const allHazardButtons = document.querySelectorAll('.hazard-option');
        allHazardButtons.forEach(button => {
            const isCorrectHazard = currentScenario.hazards.includes(button.dataset.hazard);
            const isSelected = selectedHazards.has(button.dataset.hazard);

            if (isCorrectHazard && isSelected) {
                button.classList.add('correct-feedback');
            } else if (!isCorrectHazard && isSelected) {
                button.classList.add('incorrect-feedback'); // User selected wrong hazard
                hazardsCorrect = false;
            } else if (isCorrectHazard && !isSelected) {
                button.classList.add('correct-feedback'); // Highlight correct hazard if not selected
                hazardsCorrect = false; // User missed a correct hazard
            }
            button.disabled = true; // Disable after checking
        });

        // Check Action
        const allActionButtons = document.querySelectorAll('.action-option');
        allActionButtons.forEach(button => {
            const actionData = currentScenario.actions.find(a => a.text === button.dataset.action);
            const isSelected = (button.dataset.action === selectedAction);

            if (actionData && actionData.correct) {
                button.classList.add('correct-feedback'); // Always show the correct one
                if (isSelected) {
                    actionCorrect = true;
                }
            } else if (!actionData.correct && isSelected) {
                button.classList.add('incorrect-feedback'); // User selected wrong action
            }
            button.disabled = true; // Disable after checking
        });

        let scenarioPassed = false;
        if (hazardsCorrect && actionCorrect) {
            feedbackDiv.textContent = "Excellent! You identified all hazards and chose the safest action.";
            feedbackDiv.classList.add('correct');
            feedbackDiv.classList.remove('incorrect');
            score++;
            scenarioPassed = true;
        } else if (hazardsCorrect && !actionCorrect) {
            feedbackDiv.textContent = "You identified the hazards, but the action wasn't the safest. Review the correct action!";
            feedbackDiv.classList.add('incorrect');
            feedbackDiv.classList.remove('correct');
        } else if (!hazardsCorrect && actionCorrect) {
            feedbackDiv.textContent = "You chose the safest action, but missed some hazards. Review the potential dangers!";
            feedbackDiv.classList.add('incorrect');
            feedbackDiv.classList.remove('correct');
        }
        else {
            feedbackDiv.textContent = "Review both the hazards and the safest action for this scenario.";
            feedbackDiv.classList.add('incorrect');
            feedbackDiv.classList.remove('correct');
        }

        updateScoreDisplay();
        checkButton.disabled = true; // Disable check after feedback
        nextButton.disabled = false; // Enable next button
    }

    function updateScoreDisplay() {
        currentScoreSpan.textContent = score;
    }

    function endGame() {
        scenarioImage.src = '';
        scenarioDescription.textContent = "All scenarios completed!";
        hazardOptionsContainer.innerHTML = '';
        actionOptionsContainer.innerHTML = '';
        feedbackDiv.textContent = `Game Over! You correctly navigated ${score} out of ${shuffledScenarios.length} scenarios.`;
        feedbackDiv.classList.add(score / shuffledScenarios.length >= 0.6 ? 'correct' : 'incorrect'); // Green if pass, red if fail
        checkButton.disabled = true;
        nextButton.disabled = true;
        resetButton.textContent = "Play Again";
    }

    // Event listeners
    checkButton.addEventListener('click', checkAnswers);

    nextButton.addEventListener('click', () => {
        currentScenarioIndex++;
        loadScenario();
    });

    resetButton.addEventListener('click', initializeGame);

    // Utility function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initial game setup
    initializeGame();
});
```

---

## How to Set Up and Play

1.  **Create a Folder:** Make a new folder on your computer (e.g., `ElectricalSafetyGame`).
2.  **Create `images` Subfolder:** Inside your `ElectricalSafetyGame` folder, create another folder named `images`.
3.  **Download Images:** Find suitable images for the scenarios listed in `script.js` and save them into the `images` folder with the *exact same filenames* as specified (e.g., `exposed_wire.jpg`, `overloaded_socket.jpg`, etc.).
    * **Suggested image search terms (for free stock photos, look for clear representations of hazards):**
        * `exposed electrical wire`
        * `overloaded power strip` or `many plugs in socket`
        * `electrical appliance near water` or `heater in bathroom`
        * `damaged electrical cord`
        * `power line fallen` or `ladder on power line`
    * **Example Image Sources (check licenses for use):** Unsplash.com, Pexels.com, Pixabay.com
4.  **Save the Files:**
    * Save the `index.html` code as `index.html` inside the `ElectricalSafetyGame` folder.
    * Save the `style.css` code as `style.css` inside the `ElectricalSafetyGame` folder.
    * Save the `script.js` code as `script.js` inside the `ElectricalSafetyGame` folder.
5.  **Open in Browser:** Open the `index.html` file using your web browser (e.g., Chrome, Firefox).

### How to Play:

1.  **Observe the Scenario:** An image and a description of an unsafe electrical situation will be displayed.
2.  **Identify Hazards:** Below the scenario, you'll see a list of potential hazards. Click on **all** the buttons that you believe represent a hazard in the presented scenario. You can select multiple.
3.  **Choose Safest Action:** Below the hazards, you'll see a list of possible actions. Click on the **single** button that represents the safest and most appropriate action to take in that situation.
4.  **Check Answers:** Once you've made your selections for both hazards and actions, click the **"Check Answers"** button.
5.  **Get Feedback:**
    * Buttons you selected (for hazards) will highlight: green if correct, red if incorrect. Missed correct hazards will also turn green.
    * For actions, the correct action will turn green. If you selected an incorrect action, it will turn red.
    * A detailed feedback message will appear at the bottom explaining your performance.
6.  **Next Scenario:** Click **"Next Scenario"** to move to the next challenge.
7.  **Restart Game:** Click **"Restart Game"** to begin from the first scenario with a shuffled order and reset your score.
8.  **Game End:** The game concludes after you've gone through all the scenarios, displaying your final score.

This game provides a crucial and engaging way for students to learn about and practice electrical safety in common situations.

```
แหล่งที่มา:
1. https://www.expertsphp.com/electricity-bill-tool-create-using-javascript-with-html/
2. https://github.com/AbrahamEstrada27/examen372
3. https://github.com/AlgoHussle/nomad-blog
4. https://github.com/ennavoi/task2
5. https://github.com/Hakesh/p2-gaming-quiz
6. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
7. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior