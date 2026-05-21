## From """Unit 1: Science and Problem Solving
In this unit, students will learn and recognize the importance of science and technology's influence on humans, both in daily life and in solving various problems. They will also learn and understand a constantly changing world.""" and please Create a "Science in Everyday Life" Scenario Game: Create a game where students are presented with real-world problems (e.g., pollution, food shortages, energy crisis). They must choose scientific and technological solutions from a given set of options, explaining why their chosen solution is effective. This could be a "choose your own adventure" style game or a drag-and-drop where solutions are matched to problems by using the index.html, style.css, script.js?

This is an excellent idea for an engaging activity! The "Science in Everyday Life" Scenario Game will help students connect scientific principles to real-world problem-solving.

For this, a "choose your own adventure" style game with a clear problem, options, and explanations for effectiveness would be most impactful. We'll use HTML for structure, CSS for styling, and JavaScript for the game logic.

---

### `index.html` (The Structure)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Science in Everyday Life Scenario Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Science in Everyday Life: Problem Solver</h1>
        <p>You are a scientist! Read the scenario and choose the best scientific or technological solution to solve the problem.</p>

        <div id="gameScreen">
            <div class="scenario-box" id="scenarioBox">
                </div>

            <div class="options-box" id="optionsBox">
                </div>

            <div class="explanation-box" id="explanationBox">
                </div>

            <button id="nextScenarioButton" class="hidden">Next Scenario</button>
            <button id="restartGameButton" class="hidden">Restart Game</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**Explanation for `index.html`:**

* **`container`**: A main wrapper for the entire game.
* **`gameScreen`**: This will hold all the dynamic content of the game.
* **`scenario-box` (`scenarioBox`)**: This `div` will display the current real-world problem.
* **`options-box` (`optionsBox`)**: This `div` will present the multiple-choice solutions to the problem.
* **`explanation-box` (`explanationBox`)**: This `div` will reveal whether the chosen solution was effective and explain *why*.
* **`nextScenarioButton` & `restartGameButton`**: Buttons to navigate or restart, initially `hidden` and controlled by JavaScript.

---

### `style.css` (The Styling)

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    margin: 0;
    background-color: #f4f7f6; /* Light grey-blue background */
    padding: 20px;
    box-sizing: border-box;
}

.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 30px;
    gap: 25px;
    align-items: center;
    text-align: center;
}

h1 {
    color: #2c3e50;
    margin-bottom: 10px;
}

p {
    color: #555;
    font-size: 1.05em;
    line-height: 1.6;
}

.scenario-box {
    border: 1px solid #a7d9f7; /* Soft blue border */
    border-radius: 10px;
    padding: 25px;
    background-color: #e9f5ff; /* Lighter blue background */
    width: 100%;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
    text-align: left;
}

.scenario-box h2 {
    color: #34495e;
    margin-top: 0;
    margin-bottom: 15px;
}

.options-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.option-button {
    background-color: #3498db; /* Blue for options */
    color: white;
    padding: 15px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    transition: background-color 0.3s ease, transform 0.1s ease;
    text-align: left; /* Align text within button */
}

.option-button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
}

.option-button:active {
    transform: translateY(0);
}

.explanation-box {
    border: 1px solid #dcdcdc; /* Light grey border */
    border-radius: 10px;
    padding: 25px;
    background-color: #f9f9f9;
    width: 100%;
    text-align: left;
    margin-top: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.explanation-box p {
    margin-bottom: 10px;
    color: #333;
    font-size: 1em;
}

.explanation-box .effective {
    color: #27ae60; /* Green for effective solutions */
    font-weight: bold;
}

.explanation-box .not-effective {
    color: #e74c3c; /* Red for not effective solutions */
    font-weight: bold;
}

button:not(#restartGameButton):not(#nextScenarioButton) {
    /* Style for generic buttons like options, if they were directly in HTML */
    margin-top: 20px;
    padding: 12px 25px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.05em;
    transition: background-color 0.3s ease;
}

button.hidden {
    display: none;
}

#nextScenarioButton, #restartGameButton {
    margin-top: 20px;
    padding: 12px 25px;
    background-color: #4CAF50; /* Green for Next Scenario */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.05em;
    transition: background-color 0.3s ease;
}

#restartGameButton {
    background-color: #e74c3c; /* Red for Restart */
}

#nextScenarioButton:hover {
    background-color: #45a049;
}

#restartGameButton:hover {
    background-color: #c0392b;
}
```

**Explanation for `style.css`:**

* **General Layout**: Uses `flexbox` for centering and organizing the content.
* **`.container`**: A clean, card-like container for the game.
* **`.scenario-box`**: Styles the problem description area with a light blue background.
* **`.options-box`**: Arranges the solution buttons vertically.
* **`.option-button`**: Styles the choice buttons, including hover and active effects.
* **`.explanation-box`**: Styles the feedback area, making it distinct. Includes specific classes (`.effective`, `.not-effective`) for coloring the outcome message.
* **`button.hidden`**: A utility class to hide elements using JavaScript.
* **Navigation Buttons**: Distinct styling for the "Next Scenario" (green) and "Restart Game" (red) buttons.

---

### `script.js` (The Game Logic)

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const scenarioBox = document.getElementById('scenarioBox');
    const optionsBox = document.getElementById('optionsBox');
    const explanationBox = document.getElementById('explanationBox');
    const nextScenarioButton = document.getElementById('nextScenarioButton');
    const restartGameButton = document.getElementById('restartGameButton');

    // Define your scenarios
    const scenarios = [
        {
            id: 1,
            title: "Problem: Air Pollution in the City",
            description: "A large city is experiencing severe air pollution, primarily from vehicle emissions and industrial factories. Residents are reporting increased respiratory problems, and visibility is very low.",
            options: [
                {
                    text: "Option A: Build more highways to ease traffic congestion.",
                    isCorrect: false,
                    explanation: "Building more highways might temporarily ease congestion but often encourages more driving in the long term, potentially worsening emissions. It doesn't address industrial pollution directly."
                },
                {
                    text: "Option B: Implement stricter emission standards for vehicles and factories, invest in public transportation, and promote renewable energy sources.",
                    isCorrect: true,
                    explanation: "<span class='effective'>Effective!</span> This multi-faceted approach directly tackles the sources of pollution. Stricter standards reduce harmful output, improved public transport reduces reliance on private vehicles, and renewable energy lessens industrial emissions by shifting away from fossil fuels. This demonstrates applying **environmental science and engineering** principles."
                },
                {
                    text: "Option C: Encourage citizens to wear face masks at all times.",
                    isCorrect: false,
                    explanation: "While wearing face masks can protect individuals, it does not solve the root cause of air pollution. It's a temporary measure, not a sustainable solution."
                }
            ]
        },
        {
            id: 2,
            title: "Problem: Increasing Food Shortages",
            description: "A growing global population combined with climate change impacts (droughts, floods) is leading to widespread food shortages and a decline in crop yields in many regions.",
            options: [
                {
                    text: "Option A: Clear more forests to create new farmland.",
                    isCorrect: false,
                    explanation: "Clearing forests contributes to deforestation and habitat loss, which can worsen climate change (less CO2 absorption) and reduce biodiversity. It's not a sustainable long-term solution for food security."
                },
                {
                    text: "Option B: Invest in genetically modified crops (GMOs) that are drought-resistant and high-yielding, and develop sustainable agricultural practices like vertical farming and efficient irrigation.",
                    isCorrect: true,
                    explanation: "<span class='effective'>Effective!</span> GMOs can significantly increase crop resilience and yield, addressing immediate food needs. Sustainable practices like vertical farming reduce land and water usage, and efficient irrigation conserves resources, demonstrating the application of **biotechnology and agricultural science**."
                },
                {
                    text: "Option C: Rely solely on traditional farming methods without any technological advancements.",
                    isCorrect: false,
                    explanation: "While traditional methods have their place, relying solely on them without advancements may not be sufficient to feed a rapidly growing population in a changing climate. Innovation is needed."
                }
            ]
        },
        {
            id: 3,
            title: "Problem: Global Energy Crisis",
            description: "The world is facing an energy crisis due to dwindling fossil fuel reserves and the environmental impact of their combustion, leading to rising energy costs and climate change concerns.",
            options: [
                {
                    text: "Option A: Drill for more oil and natural gas in previously untouched areas.",
                    isCorrect: false,
                    explanation: "This would provide a short-term increase in supply but exacerbates the core problem of finite resources and increased greenhouse gas emissions, worsening climate change."
                },
                {
                    text: "Option B: Massively expand investment in renewable energy sources like solar, wind, and geothermal power, and promote energy efficiency and conservation.",
                    isCorrect: true,
                    explanation: "<span class='effective'>Effective!</span> Shifting to renewable energy sources provides a sustainable and environmentally friendly power supply. Promoting energy efficiency and conservation reduces overall demand. This is a solution based on **physics, environmental engineering, and sustainable technology**."
                },
                {
                    text: "Option C: Reduce overall electricity usage by implementing mandatory power outages during peak hours.",
                    isCorrect: false,
                    explanation: "Mandatory power outages would be highly disruptive to daily life and the economy, only addressing demand temporarily without solving the underlying supply and environmental issues."
                }
            ]
        }
        // Add more scenarios here
    ];

    let currentScenarioIndex = 0;

    // --- Game Functions ---

    function loadScenario() {
        if (currentScenarioIndex >= scenarios.length) {
            endGame();
            return;
        }

        const scenario = scenarios[currentScenarioIndex];
        scenarioBox.innerHTML = `<h2>${scenario.title}</h2><p>${scenario.description}</p>`;
        optionsBox.innerHTML = '';
        explanationBox.innerHTML = ''; // Clear previous explanation
        explanationBox.classList.remove('visible'); // Hide explanation box
        nextScenarioButton.classList.add('hidden');
        restartGameButton.classList.add('hidden'); // Ensure restart button is hidden initially

        scenario.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option-button');
            button.textContent = option.text;
            button.addEventListener('click', () => chooseOption(option));
            optionsBox.appendChild(button);
        });
    }

    function chooseOption(chosenOption) {
        // Disable all option buttons after a choice is made
        Array.from(optionsBox.children).forEach(button => {
            button.disabled = true;
        });

        // Display explanation
        explanationBox.innerHTML = `<p>${chosenOption.explanation}</p>`;
        explanationBox.classList.add('visible'); // Make explanation box visible

        // Show Next Scenario or Restart Game button
        if (currentScenarioIndex < scenarios.length - 1) {
            nextScenarioButton.classList.remove('hidden');
        } else {
            restartGameButton.classList.remove('hidden');
        }
    }

    function endGame() {
        scenarioBox.innerHTML = '<h2>Congratulations!</h2><p>You have completed all scenarios and demonstrated your problem-solving skills using science and technology!</p>';
        optionsBox.innerHTML = ''; // Clear options
        explanationBox.innerHTML = ''; // Clear explanation
        explanationBox.classList.remove('visible');
        nextScenarioButton.classList.add('hidden');
        restartGameButton.classList.remove('hidden'); // Show restart button at the end
    }

    function restartGame() {
        currentScenarioIndex = 0;
        explanationBox.innerHTML = '';
        explanationBox.classList.remove('visible');
        restartGameButton.classList.add('hidden');
        loadScenario();
    }

    // --- Event Listeners for Navigation ---
    nextScenarioButton.addEventListener('click', () => {
        currentScenarioIndex++;
        loadScenario();
    });

    restartGameButton.addEventListener('click', restartGame);

    // --- Start the game ---
    loadScenario();
});
```

**Explanation for `script.js`:**

1.  **`DOMContentLoaded`**: Ensures the script runs only after the entire HTML is loaded.
2.  **Constants**: Get references to all interactive elements.
3.  **`scenarios` Array**: This is the core data structure of your game. Each object in the array represents a scenario and contains:
    * **`id`**: A unique identifier for the scenario.
    * **`title`**: The title of the problem.
    * **`description`**: A detailed explanation of the real-world problem.
    * **`options`**: An array of possible solutions for that problem. Each option has:
        * **`text`**: The text displayed on the solution button.
        * **`isCorrect`**: A boolean (`true`/`false`) indicating if this is the effective scientific/technological solution.
        * **`explanation`**: A detailed explanation of *why* this solution is (or isn't) effective, linking it back to science and technology where possible. Notice the use of `<span class='effective'>` for styling.
4.  **`currentScenarioIndex`**: A variable to keep track of which scenario the player is currently on.
5.  **`loadScenario()` Function**:
    * Checks if all scenarios have been played. If so, calls `endGame()`.
    * Populates the `scenarioBox` with the current scenario's title and description.
    * Clears previous options and explanations.
    * Dynamically creates a **`<button>`** for each `option` in the current scenario.
    * Attaches an `event listener` to each button so that `chooseOption()` is called when clicked.
6.  **`chooseOption(chosenOption)` Function**:
    * **Disables all option buttons** after a choice to prevent multiple selections for the same scenario.
    * Populates the `explanationBox` with the `explanation` from the chosen option.
    * Shows either the "Next Scenario" button (if there are more scenarios) or the "Restart Game" button (if it's the last scenario).
7.  **`endGame()` Function**:
    * Displays a "Congratulations!" message when all scenarios are completed.
    * Hides navigation buttons except for "Restart Game."
8.  **`restartGame()` Function**:
    * Resets `currentScenarioIndex` to 0.
    * Clears explanation and hides buttons.
    * Calls `loadScenario()` to start from the beginning.
9.  **Event Listeners for Navigation Buttons**: Attach `click` listeners to `nextScenarioButton` and `restartGameButton` to trigger the respective game functions.
10. **Initial Call**: `loadScenario()` is called once when the script loads to start the game.

---

**To make this work, you'll need:**

1.  **Project Folder Structure:**
    ```
    your-project-folder/
    ├── index.html
    ├── style.css
    └── script.js
    ```

Save these three code blocks into their respective files within the same directory. Open `index.html` in your web browser, and you'll have your "Science in Everyday Life" Scenario Game! You can easily extend it by adding more scenarios to the `scenarios` array in `script.js`.

```
แหล่งที่มา:
1. https://www.americaloaded.com/2023/03/21/googles-bard-lags-behind-gpt-4-and-claude-in-head-to-head-comparison/
2. https://github.com/Shehan524/Dashboard-with-Login
3. https://github.com/Avantika-t8/Myntra-HackerRamp-WeForShe