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

// แหล่งที่มา:
// 1. https://www.expertsphp.com/electricity-bill-tool-create-using-javascript-with-html/
// 2. https://github.com/AbrahamEstrada27/examen372
// 3. https://github.com/AlgoHussle/nomad-blog
// 4. https://github.com/ennavoi/task2
// 5. https://github.com/Hakesh/p2-gaming-quiz
// 6. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
// 7. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior