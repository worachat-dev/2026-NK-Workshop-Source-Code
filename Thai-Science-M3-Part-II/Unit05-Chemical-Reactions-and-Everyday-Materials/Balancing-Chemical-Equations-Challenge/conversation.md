## From """Unit 5: Chemical Reactions and Everyday Materials 
 Students will learn about the occurrence of chemical reactions, the total mass of substances before and after a chemical reaction, heat changes in chemical reactions, chemical reactions found in daily life, the benefits and harms of chemical reactions to living organisms and surrounding things, methods to prevent and solve problems caused by chemical reactions, and chemical materials used in daily life, which can be utilized differently. 

 Chapter 1: Chemical Reactions 
 A chemical reaction is a change in substances that results in the formation of new substances. Substances that participate in a chemical reaction are called reactants, while the new substances formed are called products. During a chemical reaction, atoms of each substance are neither lost nor created, but are rearranged. Therefore, the total mass of substances before and after a chemical reaction remains the same, which is in accordance with the law of conservation of mass. Chemical reactions can be both beneficial and harmful to living organisms and surrounding things. Therefore, we must learn to control, prevent, and solve problems that may arise from these chemical reactions.""" and please Create a "Balancing Chemical Equations Challenge": A quiz or interactive tool where students practice balancing simple chemical equations  by using the index.html, style.css, script.js?

Okay, I will create a "Balancing Chemical Equations Challenge" game.

This game will:
1.  **Present Unbalanced Equations:** Display a simple chemical equation with missing stoichiometric coefficients.
2.  **Input Fields:** Provide input fields for students to enter the coefficients.
3.  **Visual Atom Count (Optional but good):** Show a real-time count of each atom type on both reactant and product sides.
4.  **Check/Feedback:** Validate the entered coefficients and provide feedback.
5.  **New Equation:** Allow students to move to the next challenge.

---

## Balancing Chemical Equations Challenge: Game Files

Here are the `index.html`, `style.css`, and `script.js` files for the "Balancing Chemical Equations Challenge" game.

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Balancing Chemical Equations</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Balancing Chemical Equations Challenge</h1>
        <p>Enter the correct stoichiometric coefficients to balance the chemical equations. Remember the Law of Conservation of Mass!</p>

        <div class="equation-area">
            <div id="equation-display" class="equation-text">
                </div>
            <div id="input-fields" class="coefficient-inputs">
                </div>
        </div>

        <div class="atom-count-display">
            <h3>Atom Count Check:</h3>
            <div id="reactant-atom-counts" class="atom-counts">
                <h4>Reactants:</h4>
                <p>No atoms counted yet.</p>
            </div>
            <div id="product-atom-counts" class="atom-counts">
                <h4>Products:</h4>
                <p>No atoms counted yet.</p>
            </div>
        </div>

        <div class="controls">
            <button id="check-button">Check Equation</button>
            <button id="next-button" disabled>Next Equation</button>
            <button id="reset-button">Reset</button>
        </div>

        <div id="feedback" class="feedback-message"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

---

### `style.css`

```css
body {
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #2c3e50, #34495e, #1a202c); /* Dark space-like gradient */
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
    color: #81ecec; /* Light Aqua */
    margin-bottom: 20px;
    font-size: 2.8em;
    font-weight: 900;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
}

p {
    color: #bdc3c7; /* Lighter gray */
    margin-bottom: 30px;
    font-size: 1.1em;
    line-height: 1.6;
}

.equation-area {
    background-color: #4a6075;
    border-radius: 15px;
    padding: 25px 35px;
    margin-bottom: 35px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-height: 120px;
}

.equation-text {
    font-family: 'Courier New', monospace;
    font-size: 2em;
    font-weight: bold;
    color: #f1c40f; /* Gold */
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap; /* Allow wrapping */
}

.coefficient-input {
    width: 50px;
    padding: 8px;
    font-size: 1.2em;
    text-align: center;
    border: 2px solid #3498db; /* Blue border */
    border-radius: 8px;
    background-color: #ecf0f1; /* Light background */
    color: #2c3e50; /* Dark text */
    margin: 0 5px; /* Spacing between inputs and molecules */
}

.coefficient-inputs {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
}

.reaction-symbol {
    font-size: 1.5em;
    margin: 0 10px;
    color: #a2d2ff; /* Light blue for symbols */
}

.atom-count-display {
    background-color: #4a6075;
    border-radius: 15px;
    padding: 20px 30px;
    margin-bottom: 35px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
}

.atom-count-display h3 {
    width: 100%;
    color: #a2d2ff;
    font-size: 1.5em;
    margin-bottom: 15px;
}

.atom-counts {
    flex: 1;
    min-width: 250px;
    background-color: #5d7488;
    border-radius: 10px;
    padding: 15px 20px;
    text-align: left;
}

.atom-counts h4 {
    color: #2ecc71; /* Green for Reactants */
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.2em;
}

#product-atom-counts h4 {
    color: #e74c3c; /* Red for Products */
}

.atom-counts p {
    font-size: 0.95em;
    line-height: 1.5;
    margin: 5px 0;
    color: #bdc3c7;
}

.atom-counts .atom-match {
    color: #2ecc71; /* Green for balanced atoms */
    font-weight: bold;
}

.atom-counts .atom-mismatch {
    color: #f39c12; /* Orange for unbalanced atoms */
    font-weight: bold;
}


.controls {
    margin-top: 40px;
}

button {
    background-color: #1abc9c; /* Turquoise */
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 1.1em;
    cursor: pointer;
    margin: 0 15px;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 6px 15px rgba(26, 188, 156, 0.3);
}

button:hover {
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
    background-color: #f39c12; /* Orange */
    box-shadow: 0 6px 15px rgba(243, 156, 18, 0.3);
}
#check-button:hover:not(:disabled) {
    background-color: #e67e22; /* Darker Orange */
}

#next-button {
    background-color: #3498db; /* Blue */
    box-shadow: 0 6px 15px rgba(52, 152, 219, 0.3);
}
#next-button:hover:not(:disabled) {
    background-color: #2980b9; /* Darker Blue */
}

#reset-button {
    background-color: #e74c3c; /* Red */
    box-shadow: 0 6px 15px rgba(231, 76, 60, 0.3);
}
#reset-button:hover:not(:disabled) {
    background-color: #c0392b; /* Darker Red */
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
    color: #2ecc71; /* Green */
}
.feedback-message.incorrect {
    color: #e74c3c; /* Red */
}
```

---

### `script.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Array of chemical equations to balance
    // Each equation has:
    // - display: How it's shown initially (with blanks for coefficients)
    // - parts: Array of objects representing molecules and symbols
    //   - type: 'molecule' or 'symbol' (for '+' or '→')
    //   - formula: The chemical formula (e.g., 'H2O')
    //   - coefficientIndex: Which input field corresponds to this molecule (or -1 if none/fixed)
    // - correctCoefficients: The expected balanced coefficients
    const equations = [
        {
            display: "__H₂ + __O₂ → __H₂O",
            parts: [
                { type: 'molecule', formula: 'H2', coefficientIndex: 0 },
                { type: 'symbol', formula: '+' },
                { type: 'molecule', formula: 'O2', coefficientIndex: 1 },
                { type: 'symbol', formula: '→' },
                { type: 'molecule', formula: 'H2O', coefficientIndex: 2 }
            ],
            correctCoefficients: [2, 1, 2] // H2, O2, H2O
        },
        {
            display: "__N₂ + __H₂ → __NH₃",
            parts: [
                { type: 'molecule', formula: 'N2', coefficientIndex: 0 },
                { type: 'symbol', formula: '+' },
                { type: 'molecule', formula: 'H2', coefficientIndex: 1 },
                { type: 'symbol', formula: '→' },
                { type: 'molecule', formula: 'NH3', coefficientIndex: 2 }
            ],
            correctCoefficients: [1, 3, 2] // N2, H2, NH3
        },
        {
            display: "__CH₄ + __O₂ → __CO₂ + __H₂O",
            parts: [
                { type: 'molecule', formula: 'CH4', coefficientIndex: 0 },
                { type: 'symbol', formula: '+' },
                { type: 'molecule', formula: 'O2', coefficientIndex: 1 },
                { type: 'symbol', formula: '→' },
                { type: 'molecule', formula: 'CO2', coefficientIndex: 2 },
                { type: 'symbol', formula: '+' },
                { type: 'molecule', formula: 'H2O', coefficientIndex: 3 }
            ],
            correctCoefficients: [1, 2, 1, 2] // CH4, O2, CO2, H2O
        },
        {
            display: "__KClO₃ → __KCl + __O₂",
            parts: [
                { type: 'molecule', formula: 'KClO3', coefficientIndex: 0 },
                { type: 'symbol', formula: '→' },
                { type: 'molecule', formula: 'KCl', coefficientIndex: 1 },
                { type: 'symbol', formula: '+' },
                { type: 'molecule', formula: 'O2', coefficientIndex: 2 }
            ],
            correctCoefficients: [2, 2, 3] // KClO3, KCl, O2
        },
        {
            display: "__Fe + __O₂ → __Fe₂O₃",
            parts: [
                { type: 'molecule', formula: 'Fe', coefficientIndex: 0 },
                { type: 'symbol', formula: '+' },
                { type: 'molecule', formula: 'O2', coefficientIndex: 1 },
                { type: 'symbol', formula: '→' },
                { type: 'molecule', formula: 'Fe2O3', coefficientIndex: 2 }
            ],
            correctCoefficients: [4, 3, 2] // Fe, O2, Fe2O3
        }
    ];

    const equationDisplay = document.getElementById('equation-display');
    const inputFieldsContainer = document.getElementById('input-fields');
    const reactantAtomCountsDiv = document.getElementById('reactant-atom-counts');
    const productAtomCountsDiv = document.getElementById('product-atom-counts');
    const checkButton = document.getElementById('check-button');
    const nextButton = document.getElementById('next-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');

    let currentEquationIndex = 0;
    let coefficientInputs = []; // Array to hold references to the input fields

    // Helper to parse a chemical formula into atom counts (e.g., "H2O" -> {H:2, O:1})
    function parseFormula(formula) {
        const atoms = {};
        // Regex to match atoms and their counts. Handles "Fe", "Cl", "H2", "O3", "Fe2"
        const regex = /([A-Z][a-z]*)(\d*)/g;
        let match;
        while ((match = regex.exec(formula)) !== null) {
            const atom = match[1];
            const count = parseInt(match[2] || '1', 10);
            atoms[atom] = (atoms[atom] || 0) + count;
        }
        return atoms;
    }

    // Function to update the atom counts display
    function updateAtomCounts() {
        const currentEquation = equations[currentEquationIndex];
        const enteredCoefficients = coefficientInputs.map(input => parseInt(input.value || '0', 10));

        const reactantAtoms = {};
        const productAtoms = {};

        // Populate reactant and product atom counts
        let isReactantSide = true;
        currentEquation.parts.forEach(part => {
            if (part.type === 'symbol' && part.formula === '→') {
                isReactantSide = false;
                return;
            }
            if (part.type === 'molecule') {
                const coefficient = enteredCoefficients[part.coefficientIndex];
                if (isNaN(coefficient) || coefficient < 0) return; // Skip if coefficient is invalid
                const moleculeAtoms = parseFormula(part.formula);

                Object.keys(moleculeAtoms).forEach(atom => {
                    if (isReactantSide) {
                        reactantAtoms[atom] = (reactantAtoms[atom] || 0) + (moleculeAtoms[atom] * coefficient);
                    } else {
                        productAtoms[atom] = (productAtoms[atom] || 0) + (moleculeAtoms[atom] * coefficient);
                    }
                });
            }
        });

        // Display counts
        let reactantHtml = '<h4>Reactants:</h4>';
        let productHtml = '<h4>Products:</h4>';
        let allAtoms = new Set([...Object.keys(reactantAtoms), ...Object.keys(productAtoms)]);
        let isBalanced = true;

        if (allAtoms.size === 0) {
            reactantHtml += '<p>No atoms counted yet.</p>';
            productHtml += '<p>No atoms counted yet.</p>';
        } else {
            allAtoms.forEach(atom => {
                const rCount = reactantAtoms[atom] || 0;
                const pCount = productAtoms[atom] || 0;
                const className = (rCount === pCount && rCount > 0) ? 'atom-match' : 'atom-mismatch';
                reactantHtml += `<p>${atom}: <span class="${className}">${rCount}</span></p>`;
                productHtml += `<p>${atom}: <span class="${className}">${pCount}</span></p>`;
                if (rCount !== pCount) {
                    isBalanced = false;
                }
            });
        }

        reactantAtomCountsDiv.innerHTML = reactantHtml;
        productAtomCountsDiv.innerHTML = productHtml;
    }

    function initializeEquation() {
        if (currentEquationIndex >= equations.length) {
            feedbackDiv.textContent = "Congratulations! You've balanced all equations!";
            feedbackDiv.classList.add('correct');
            checkButton.disabled = true;
            nextButton.disabled = true;
            resetButton.disabled = true;
            return;
        }

        const currentEquation = equations[currentEquationIndex];
        equationDisplay.innerHTML = '';
        inputFieldsContainer.innerHTML = '';
        coefficientInputs = []; // Reset input references

        currentEquation.parts.forEach(part => {
            if (part.type === 'molecule') {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '0';
                input.value = '1'; // Default coefficient is 1
                input.classList.add('coefficient-input');
                input.addEventListener('input', updateAtomCounts); // Update on input change

                const moleculeSpan = document.createElement('span');
                moleculeSpan.textContent = part.formula;

                inputFieldsContainer.appendChild(input);
                equationDisplay.appendChild(input); // Add input field to equation display
                equationDisplay.appendChild(moleculeSpan); // Add molecule to equation display
                coefficientInputs.push(input);
            } else if (part.type === 'symbol') {
                const symbolSpan = document.createElement('span');
                symbolSpan.textContent = part.formula;
                symbolSpan.classList.add('reaction-symbol');
                equationDisplay.appendChild(symbolSpan);
            }
        });

        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');
        nextButton.disabled = true; // Disable next button until current is correct
        checkButton.disabled = false;
        resetButton.disabled = false;
        updateAtomCounts(); // Initial atom count display
    }

    checkButton.addEventListener('click', () => {
        const currentEquation = equations[currentEquationIndex];
        let allCorrect = true;

        coefficientInputs.forEach((input, index) => {
            const enteredValue = parseInt(input.value, 10);
            const correctValue = currentEquation.correctCoefficients[index];

            if (isNaN(enteredValue) || enteredValue !== correctValue) {
                allCorrect = false;
                // Optional: Highlight incorrect inputs
                input.style.borderColor = '#e74c3c'; // Red border
            } else {
                input.style.borderColor = '#2ecc71'; // Green border
            }
        });

        // Also check if atom counts are balanced (redundant if coefficients are correct, but good for robust check)
        const atomsBalanced = checkAtomsExactlyBalanced();

        if (allCorrect && atomsBalanced) {
            feedbackDiv.textContent = "Excellent! The equation is perfectly balanced!";
            feedbackDiv.classList.add('correct');
            feedbackDiv.classList.remove('incorrect');
            nextButton.disabled = false; // Enable next equation
            checkButton.disabled = true; // Disable check once correct
        } else {
            feedbackDiv.textContent = "Not quite. Review your coefficients and atom counts!";
            feedbackDiv.classList.add('incorrect');
            feedbackDiv.classList.remove('correct');
            nextButton.disabled = true;
        }
    });

    function checkAtomsExactlyBalanced() {
         const currentEquation = equations[currentEquationIndex];
        const enteredCoefficients = coefficientInputs.map(input => parseInt(input.value || '0', 10));

        const reactantAtoms = {};
        const productAtoms = {};

        let isReactantSide = true;
        currentEquation.parts.forEach(part => {
            if (part.type === 'symbol' && part.formula === '→') {
                isReactantSide = false;
                return;
            }
            if (part.type === 'molecule') {
                const coefficient = enteredCoefficients[part.coefficientIndex];
                if (isNaN(coefficient) || coefficient < 0) return; // Skip if coefficient is invalid
                const moleculeAtoms = parseFormula(part.formula);

                Object.keys(moleculeAtoms).forEach(atom => {
                    if (isReactantSide) {
                        reactantAtoms[atom] = (reactantAtoms[atom] || 0) + (moleculeAtoms[atom] * coefficient);
                    } else {
                        productAtoms[atom] = (productAtoms[atom] || 0) + (moleculeAtoms[atom] * coefficient);
                    }
                });
            }
        });

        // Compare atom counts
        const allAtoms = new Set([...Object.keys(reactantAtoms), ...Object.keys(productAtoms)]);
        for (const atom of allAtoms) {
            if ((reactantAtoms[atom] || 0) !== (productAtoms[atom] || 0)) {
                return false; // Mismatch found
            }
        }
        return true; // All atoms are balanced
    }


    nextButton.addEventListener('click', () => {
        currentEquationIndex++;
        initializeEquation();
    });

    resetButton.addEventListener('click', () => {
        // Reset inputs to default 1s
        coefficientInputs.forEach(input => {
            input.value = '1';
            input.style.borderColor = '#3498db'; // Reset border color
        });
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');
        nextButton.disabled = true;
        checkButton.disabled = false;
        updateAtomCounts(); // Update display after reset
    });

    // Initial game setup
    initializeEquation();
});
```

---

## How to Set Up and Play

1.  **Create a Folder:** Make a new folder on your computer (e.g., `BalancingEquationsGame`).
2.  **Save the Files:**
    * Save the `index.html` code as `index.html` inside the folder.
    * Save the `style.css` code as `style.css` inside the folder.
    * Save the `script.js` code as `script.js` inside the folder.
3.  **Open in Browser:** Open the `index.html` file using your web browser (e.g., Chrome, Firefox).

### How to Play:

1.  **Observe the Equation:** The game will display an unbalanced chemical equation with input fields for coefficients.
2.  **Enter Coefficients:** For each blank space (`__`), enter a numerical coefficient (usually starting with '1' and adjusting upwards) into the input field.
3.  **Real-time Atom Count:** As you type in coefficients, the "Atom Count Check" section will automatically update, showing you the number of each type of atom on both the reactant and product sides. This helps you visually track the balance.
4.  **Check Your Work:** Once you believe you have balanced the equation, click the **"Check Equation"** button.
5.  **Get Feedback:**
    * If correct, a "Excellent! The equation is perfectly balanced!" message will appear, and the "Next Equation" button will be enabled.
    * If incorrect, a "Not quite. Review your coefficients and atom counts!" message will appear, and the input fields for incorrect coefficients might highlight (e.g., with a red border).
6.  **Next Equation:** Click **"Next Equation"** to move to the next challenge.
7.  **Reset:** Click **"Reset"** to clear the input fields for the current equation and try again.

### Game Features:

* **Interactive Input:** Students directly type coefficients.
* **Real-time Atom Tracking:** The "Atom Count Check" is a powerful visual aid for understanding the conservation of mass. It updates dynamically, helping students pinpoint where the imbalance lies.
* **Sequential Challenges:** Equations are presented one by one, building confidence.
* **Clear Feedback:** Immediate visual and textual feedback on correctness.
* **Subscript Handling:** The `parseFormula` function is designed to handle standard chemical formulas with subscripts (e.g., H2O, N2, Fe2O3).

```
แหล่งที่มา:
1. https://github.com/AbrahamEstrada27/examen372
2. https://github.com/AlgoHussle/nomad-blog
3. https://github.com/Hakesh/p2-gaming-quiz