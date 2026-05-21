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

// แหล่งที่มา:
// 1. https://github.com/AbrahamEstrada27/examen372
// 2. https://github.com/AlgoHussle/nomad-blog
// 3. https://github.com/Hakesh/p2-gaming-quiz