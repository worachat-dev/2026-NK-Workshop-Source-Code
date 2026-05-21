## From """Unit 2: Genetics
This unit covers genetics, focusing on how living organisms transmit characteristics from one generation to the next. These transmitted characteristics are called hereditary traits. The inheritance of traits involves DNA, which is the genetic material located in the nucleus of cells.
Chapter 1: Inheritance of Traits
This chapter involves studying and investigating chromosome structure, the relationship between genes, DNA, and chromosomes, Mendel's basic principles of heredity from monohybrid crosses, and calculating genotype and phenotype ratios in offspring. It also covers human chromosomes, the importance of mitosis and meiosis cell division, genetic diseases and the application of knowledge about them, and the benefits and impacts of genetically modified organisms (GMOs) on humans and the environment.""" and please Create a Mendelian Genetics Punnett Square Simulator/Game: A game where students can "cross" different parent organisms (e.g., pea plants with different traits) and predict the genotype and phenotype ratios of the offspring using a digital Punnett square. This could be a drag-and-drop activity or a quiz where they input ratios by using the index.html, style.css, script.js?

Given the request, I can create a conceptual outline for a Mendelian Genetics Punnett Square Simulator/Game using HTML, CSS, and JavaScript. This will describe the components and their interactions, but I won't be able to provide executable code in this text-based format.

Here's the breakdown for `index.html`, `style.css`, and `script.js`:

---

### `index.html` (Structure of the game)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mendelian Genetics Punnett Square Simulator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Mendelian Genetics Punnett Square Simulator</h1>
        <p>Cross different parent organisms and predict the genotype and phenotype ratios of the offspring.</p>
    </header>

    <main>
        <section id="parent-selection">
            <h2>Select Parent Organisms</h2>
            <div class="parent-container">
                <div class="parent" id="parent1">
                    <h3>Parent 1</h3>
                    <select id="trait1-parent1">
                        <option value="">Select Trait 1</option>
                        </select>
                    <select id="trait2-parent1">
                        <option value="">Select Trait 2 (if applicable for dihybrid)</option>
                    </select>
                    <div class="allele-display" id="allele-display-parent1">
                        </div>
                </div>
                <div class="parent" id="parent2">
                    <h3>Parent 2</h3>
                    <select id="trait1-parent2">
                        <option value="">Select Trait 1</option>
                    </select>
                    <select id="trait2-parent2">
                        <option value="">Select Trait 2 (if applicable for dihybrid)</option>
                    </select>
                    <div class="allele-display" id="allele-display-parent2">
                        </div>
                </div>
            </div>
            <button id="cross-button">Perform Cross</button>
        </section>

        <section id="punnett-square-section" style="display: none;">
            <h2>Punnett Square</h2>
            <div id="punnett-grid">
                </div>
            <div id="punnett-explanation">
                <p>Drag and drop alleles into the Punnett square, or click cells to populate.</p>
            </div>
        </section>

        <section id="results-section" style="display: none;">
            <h2>Offspring Ratios</h2>
            <div class="results-display">
                <h3>Genotype Ratios:</h3>
                <ul id="genotype-ratios">
                    </ul>
                <h3>Phenotype Ratios:</h3>
                <ul id="phenotype-ratios">
                    </ul>
                <div class="quiz-section">
                    <h3>Quiz: Predict the Ratios!</h3>
                    <p>Enter your predicted ratios (e.g., 1:2:1 for genotype, 3:1 for phenotype):</p>
                    <label for="genotype-input">Your Genotype Prediction:</label>
                    <input type="text" id="genotype-input" placeholder="e.g., 1:2:1">
                    <label for="phenotype-input">Your Phenotype Prediction:</label>
                    <input type="text" id="phenotype-input" placeholder="e.g., 3:1">
                    <button id="check-answers">Check Answers</button>
                    <p id="feedback"></p>
                </div>
            </div>
            <button id="reset-button">Start New Cross</button>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Mendelian Genetics Simulator</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

---

### `style.css` (Visual styling)

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header {
    background-color: #4CAF50;
    color: white;
    padding: 20px 0;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

main {
    flex-grow: 1;
    padding: 20px;
    max-width: 1000px;
    margin: 20px auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fdfdfd;
}

h2 {
    color: #333;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.parent-container {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    margin-bottom: 20px;
}

.parent {
    flex: 1;
    border: 1px solid #c9c9c9;
    padding: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.parent select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.allele-display {
    min-height: 40px;
    border: 1px dashed #ccc;
    padding: 10px;
    margin-top: 10px;
    text-align: center;
    font-weight: bold;
    color: #555;
    background-color: #eef;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-top: 10px;
}

button:hover {
    background-color: #45a049;
}

#punnett-grid {
    display: grid;
    border: 1px solid #333;
    margin-top: 20px;
    background-color: #fff;
}

.punnett-cell {
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    font-weight: bold;
    min-width: 80px; /* Adjust size as needed */
    min-height: 80px; /* Adjust size as needed */
    background-color: #f0f0f0;
}

.punnett-header {
    background-color: #ddd;
    font-weight: bold;
}

.droppable {
    border: 2px dashed #007bff;
    background-color: #e0f2ff;
}

.draggable {
    cursor: grab;
    padding: 5px 10px;
    margin: 2px;
    background-color: #ffeb3b;
    border: 1px solid #cddc39;
    border-radius: 3px;
}

#punnett-explanation {
    margin-top: 15px;
    font-style: italic;
    color: #666;
}

.results-display h3 {
    margin-top: 20px;
    color: #4CAF50;
}

.results-display ul {
    list-style: none;
    padding: 0;
}

.results-display li {
    background-color: #e6ffe6;
    padding: 8px;
    margin-bottom: 5px;
    border-left: 5px solid #4CAF50;
    border-radius: 3px;
}

.quiz-section {
    margin-top: 30px;
    padding: 20px;
    background-color: #fffacd;
    border: 1px solid #ffcc80;
    border-radius: 8px;
}

.quiz-section label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.quiz-section input[type="text"] {
    width: calc(100% - 22px); /* Account for padding and border */
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

#feedback {
    margin-top: 15px;
    font-weight: bold;
    color: red; /* Default for incorrect, will change with JS */
}

#reset-button {
    background-color: #f44336;
    margin-top: 20px;
}

#reset-button:hover {
    background-color: #da190b;
}

footer {
    text-align: center;
    padding: 15px 0;
    background-color: #333;
    color: white;
    margin-top: 20px;
}
```

---

### `script.js` (Game logic and interactivity)

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const parent1Trait1Select = document.getElementById('trait1-parent1');
    const parent2Trait1Select = document.getElementById('trait1-parent2');
    const alleleDisplayParent1 = document.getElementById('allele-display-parent1');
    const alleleDisplayParent2 = document.getElementById('allele-display-parent2');
    const crossButton = document.getElementById('cross-button');
    const punnettSquareSection = document.getElementById('punnett-square-section');
    const punnettGrid = document.getElementById('punnett-grid');
    const resultsSection = document.getElementById('results-section');
    const genotypeRatiosList = document.getElementById('genotype-ratios');
    const phenotypeRatiosList = document.getElementById('phenotype-ratios');
    const genotypeInput = document.getElementById('genotype-input');
    const phenotypeInput = document.getElementById('phenotype-input');
    const checkAnswersButton = document.getElementById('check-answers');
    const feedbackParagraph = document.getElementById('feedback');
    const resetButton = document.getElementById('reset-button');

    // Game State Variables
    let currentParents = {
        parent1: { trait1: '', genotype: [] },
        parent2: { trait1: '', genotype: [] }
    };
    let offspringGenotypes = [];
    let offspringPhenotypes = [];

    // Data for traits (can be extended for dihybrid crosses)
    const traits = {
        peaPlantHeight: {
            dominant: 'Tall (T)',
            recessive: 'Short (t)',
            alleles: {
                'Tall (TT)': ['T', 'T'],
                'Tall (Tt)': ['T', 't'],
                'Short (tt)': ['t', 't']
            },
            phenotypeMap: {
                'TT': 'Tall',
                'Tt': 'Tall',
                'tt': 'Short'
            }
        },
        // Add more traits here for future expansion (e.g., pea color, seed shape)
        peaPlantColor: {
            dominant: 'Yellow (Y)',
            recessive: 'Green (y)',
            alleles: {
                'Yellow (YY)': ['Y', 'Y'],
                'Yellow (Yy)': ['Y', 'y'],
                'Green (yy)': ['y', 'y']
            },
            phenotypeMap: {
                'YY': 'Yellow',
                'Yy': 'Yellow',
                'yy': 'Green'
            }
        }
    };

    // --- Initialization ---

    function initializeParentTraitOptions() {
        // Populate trait 1 selects with options
        for (const traitKey in traits) {
            if (traits.hasOwnProperty(traitKey)) {
                const trait = traits[traitKey];
                const optgroup1 = document.createElement('optgroup');
                optgroup1.label = `Pea Plant - ${traitKey.replace('peaPlant', '')}`;
                const optgroup2 = optgroup1.cloneNode(true); // Clone for parent 2

                for (const alleleCombination in trait.alleles) {
                    const option1 = document.createElement('option');
                    option1.value = `${traitKey}-${alleleCombination}`;
                    option1.textContent = alleleCombination;
                    optgroup1.appendChild(option1);

                    const option2 = document.createElement('option');
                    option2.value = `${traitKey}-${alleleCombination}`;
                    option2.textContent = alleleCombination;
                    optgroup2.appendChild(option2);
                }
                parent1Trait1Select.appendChild(optgroup1);
                parent2Trait1Select.appendChild(optgroup2);
            }
        }
    }

    // --- Event Listeners ---

    parent1Trait1Select.addEventListener('change', (event) => {
        const [traitKey, selectedGenotype] = event.target.value.split('-');
        if (traits[traitKey]) {
            currentParents.parent1.trait1 = traitKey;
            currentParents.parent1.genotype = traits[traitKey].alleles[selectedGenotype];
            alleleDisplayParent1.textContent = `Alleles: ${currentParents.parent1.genotype.join(', ')}`;
        } else {
            alleleDisplayParent1.textContent = '';
            currentParents.parent1.trait1 = '';
            currentParents.parent1.genotype = [];
        }
        hideSections();
    });

    parent2Trait1Select.addEventListener('change', (event) => {
        const [traitKey, selectedGenotype] = event.target.value.split('-');
        if (traits[traitKey]) {
            currentParents.parent2.trait1 = traitKey;
            currentParents.parent2.genotype = traits[traitKey].alleles[selectedGenotype];
            alleleDisplayParent2.textContent = `Alleles: ${currentParents.parent2.genotype.join(', ')}`;
        } else {
            alleleDisplayParent2.textContent = '';
            currentParents.parent2.trait1 = '';
            currentParents.parent2.genotype = [];
        }
        hideSections();
    });

    crossButton.addEventListener('click', () => {
        if (currentParents.parent1.genotype.length === 0 || currentParents.parent2.genotype.length === 0) {
            alert('Please select genotypes for both parents.');
            return;
        }
        if (currentParents.parent1.trait1 !== currentParents.parent2.trait1) {
            alert('Please select the same trait for both parents for a monohybrid cross.');
            return;
        }
        generatePunnettSquare();
        punnettSquareSection.style.display = 'block';
        resultsSection.style.display = 'none'; // Hide results until filled
        feedbackParagraph.textContent = '';
        genotypeInput.value = '';
        phenotypeInput.value = '';
    });

    checkAnswersButton.addEventListener('click', () => {
        const userGenotype = genotypeInput.value.trim();
        const userPhenotype = phenotypeInput.value.trim();

        const actualGenotypeRatios = calculateRatios(offspringGenotypes);
        const actualPhenotypeRatios = calculatePhenotypeRatios(offspringGenotypes, currentParents.parent1.trait1);

        const correctGenotype = formatRatio(actualGenotypeRatios);
        const correctPhenotype = formatRatio(actualPhenotypeRatios);

        let feedbackText = '';
        let isCorrect = true;

        if (userGenotype === correctGenotype) {
            feedbackText += 'Genotype prediction: Correct! ';
        } else {
            feedbackText += `Genotype prediction: Incorrect. Correct is ${correctGenotype}. `;
            isCorrect = false;
        }

        if (userPhenotype === correctPhenotype) {
            feedbackText += 'Phenotype prediction: Correct!';
        } else {
            feedbackText += `Phenotype prediction: Incorrect. Correct is ${correctPhenotype}.`;
            isCorrect = false;
        }

        feedbackParagraph.textContent = feedbackText;
        feedbackParagraph.style.color = isCorrect ? 'green' : 'red';
    });

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    // --- Core Logic ---

    function generatePunnettSquare() {
        punnettGrid.innerHTML = ''; // Clear previous grid
        offspringGenotypes = []; // Reset offspring data

        const parent1Gametes = currentParents.parent1.genotype.length === 2 ?
                                [currentParents.parent1.genotype[0], currentParents.parent1.genotype[1]] : [];
        const parent2Gametes = currentParents.parent2.genotype.length === 2 ?
                                [currentParents.parent2.genotype[0], currentParents.parent2.genotype[1]] : [];

        if (parent1Gametes.length === 0 || parent2Gametes.length === 0) {
            alert('Invalid parent genotypes selected.');
            return;
        }

        // Set up grid for monohybrid cross (3x3 including headers)
        punnettGrid.style.gridTemplateColumns = `repeat(${parent2Gametes.length + 1}, 1fr)`;
        punnettGrid.style.gridTemplateRows = `repeat(${parent1Gametes.length + 1}, 1fr)`;

        // Top-left empty cell
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('punnett-cell', 'punnett-header');
        punnettGrid.appendChild(emptyCell);

        // Parent 2 gametes (top row)
        parent2Gametes.forEach(gamete => {
            const cell = document.createElement('div');
            cell.classList.add('punnett-cell', 'punnett-header');
            cell.textContent = gamete;
            punnettGrid.appendChild(cell);
        });

        // Loop for parent 1 gametes (first column) and offspring cells
        parent1Gametes.forEach(gamete1 => {
            const cell1 = document.createElement('div');
            cell1.classList.add('punnett-cell', 'punnett-header');
            cell1.textContent = gamete1;
            punnettGrid.appendChild(cell1);

            parent2Gametes.forEach(gamete2 => {
                const offspringAlleles = [gamete1, gamete2].sort().join(''); // Ensure consistent order (e.g., Tt, not tT)
                const offspringCell = document.createElement('div');
                offspringCell.classList.add('punnett-cell', 'droppable');
                offspringCell.dataset.offspring = offspringAlleles; // Store the actual offspring genotype
                offspringCell.textContent = offspringAlleles; // Display for now, can be drag-and-drop later
                punnettGrid.appendChild(offspringCell);
                offspringGenotypes.push(offspringAlleles); // Collect for ratio calculation
            });
        });

        // Now calculate and display the ratios after the Punnett square is generated
        displayResults();
    }

    function calculateRatios(genotypes) {
        const counts = {};
        genotypes.forEach(genotype => {
            counts[genotype] = (counts[genotype] || 0) + 1;
        });
        return counts;
    }

    function calculatePhenotypeRatios(genotypes, traitKey) {
        const phenotypeCounts = {};
        const phenotypeMap = traits[traitKey].phenotypeMap;

        genotypes.forEach(genotype => {
            const phenotype = phenotypeMap[genotype];
            if (phenotype) {
                phenotypeCounts[phenotype] = (phenotypeCounts[phenotype] || 0) + 1;
            }
        });
        return phenotypeCounts;
    }

    function formatRatio(counts) {
        const sortedKeys = Object.keys(counts).sort();
        const ratios = sortedKeys.map(key => counts[key]);

        // Find GCD for simplification
        let gcd = ratios[0];
        for (let i = 1; i < ratios.length; i++) {
            gcd = findGCD(gcd, ratios[i]);
        }
        const simplifiedRatios = ratios.map(ratio => ratio / gcd);
        return simplifiedRatios.join(':');
    }

    function findGCD(a, b) {
        if (b === 0) return a;
        return findGCD(b, a % b);
    }

    function displayResults() {
        const genotypeCounts = calculateRatios(offspringGenotypes);
        const phenotypeCounts = calculatePhenotypeRatios(offspringGenotypes, currentParents.parent1.trait1);

        genotypeRatiosList.innerHTML = '';
        for (const genotype in genotypeCounts) {
            const li = document.createElement('li');
            li.textContent = `${genotype}: ${genotypeCounts[genotype]}`;
            genotypeRatiosList.appendChild(li);
        }

        phenotypeRatiosList.innerHTML = '';
        for (const phenotype in phenotypeCounts) {
            const li = document.createElement('li');
            li.textContent = `${phenotype}: ${phenotypeCounts[phenotype]}`;
            phenotypeRatiosList.appendChild(li);
        }
        resultsSection.style.display = 'block';
    }

    function hideSections() {
        punnettSquareSection.style.display = 'none';
        resultsSection.style.display = 'none';
        feedbackParagraph.textContent = '';
        genotypeInput.value = '';
        phenotypeInput.value = '';
    }

    function resetGame() {
        parent1Trait1Select.value = '';
        parent2Trait1Select.value = '';
        alleleDisplayParent1.textContent = '';
        alleleDisplayParent2.textContent = '';
        currentParents = {
            parent1: { trait1: '', genotype: [] },
            parent2: { trait1: '', genotype: [] }
        };
        offspringGenotypes = [];
        offspringPhenotypes = [];
        punnettGrid.innerHTML = '';
        hideSections();
    }

    // Initialize the game when the page loads
    initializeParentTraitOptions();
    resetGame(); // Ensure initial state is clean
});
```

---

### How to use these files:

1.  **Save them:**
    * Save the first block as `index.html`.
    * Save the second block as `style.css` in the same directory.
    * Save the third block as `script.js` in the same directory.
2.  **Open `index.html`:** Open the `index.html` file in your web browser.

### Game Features Explained:

* **Parent Selection:**
    * Two dropdowns allow users to select the genotype of Parent 1 and Parent 2 for a specific trait (e.g., "Tall (TT)", "Tall (Tt)", "Short (tt)" for pea plant height).
    * The `allele-display` sections will show the individual alleles that parent carries (e.g., "T, T" for TT).
* **Perform Cross Button:**
    * Once parents are selected, clicking this button generates the Punnett Square.
    * It checks if the same trait is selected for both parents for a monohybrid cross.
* **Punnett Square:**
    * A dynamically generated grid based on the parent genotypes.
    * For a monohybrid cross (2x2), it will generate a 3x3 grid (including headers for parent gametes).
    * Initially, the offspring genotypes are directly shown in the cells. For a drag-and-drop game, you would need to:
        * Make the individual alleles (`T`, `t`) draggable elements.
        * Make the Punnett square cells droppable targets.
        * Implement `dragstart`, `dragover`, `dragleave`, `drop` event listeners in `script.js`.
        * Validate dropped alleles to form correct genotypes in the cells.
        * A quiz mode would then be the student filling in the predicted genotypes or phenotypes.
* **Offspring Ratios (Results Section):**
    * Automatically calculates and displays the Genotype Ratios (e.g., 1 TT : 2 Tt : 1 tt) and Phenotype Ratios (e.g., 3 Tall : 1 Short) after the Punnett Square is generated.
* **Quiz Feature:**
    * Students can input their predicted genotype and phenotype ratios as text (e.g., "1:2:1" or "3:1").
    * The "Check Answers" button compares their input with the calculated correct ratios and provides feedback.
* **Reset Button:** Clears all selections and generated content to start a new cross.

### Enhancements and Future Scope:

* **Drag-and-Drop Punnett Square:** This is a significant addition.
    * Instead of just showing the offspring, the cells would be empty.
    * Users would drag alleles from parent gametes into the appropriate cells to combine them.
    * Validation would be needed to ensure correct allele combinations.
* **Dihybrid Crosses:**
    * This would require significant changes to the `script.js` to handle two traits, four gametes per parent (e.g., TY, Ty, tY, ty), and a 5x5 Punnett Square grid.
    * The ratio calculation would also become more complex.
    * Additional dropdowns for a second trait for each parent.
* **Visual Representation of Organisms:** Instead of just text, display images of pea plants (tall/short, yellow/green peas).
* **More Traits/Organisms:** Expand the `traits` object in `script.js` to include more examples.
* **Scoring System:** Implement a scoring system for the quiz.
* **Clearer UI for Drag-and-Drop:** Add visual cues for draggable and droppable areas.
* **User Feedback:** More dynamic feedback for incorrect answers, perhaps highlighting specific errors.
* **Error Handling:** More robust error handling for invalid user inputs.

```
แหล่งที่มา:
1. https://www.classace.io/answers/can-you-code-me-the-game-2048-in-html-css-and-java-script_5866ed38c65a6ad517ba23957d9f3264
2. https://newspost.muragon.com/entry/2.html
3. https://github.com/6431503106/ProjectSeminar
4. https://github.com/analudms/AgeChecker