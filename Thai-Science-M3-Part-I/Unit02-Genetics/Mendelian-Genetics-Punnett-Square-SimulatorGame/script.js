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

// แหล่งที่มา:
// 1. https://www.classace.io/answers/can-you-code-me-the-game-2048-in-html-css-and-java-script_5866ed38c65a6ad517ba23957d9f3264
// 2. https://newspost.muragon.com/entry/2.html
// 3. https://github.com/6431503106/ProjectSeminar
// 4. https://github.com/analudms/AgeChecker