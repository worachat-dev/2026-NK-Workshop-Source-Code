document.addEventListener('DOMContentLoaded', () => {
    const equationsData = [
        {
            equation: "H₂ + O₂ → H₂O",
            reactants: { "H₂": 2, "O₂": 1 },
            products: { "H₂O": 2 },
            atoms: { "H": 4, "O": 2 },
            draggableElements: ["H₂", "H₂", "O₂", "H₂O", "H₂O"] // More elements than needed for challenge
        },
        {
            equation: "N₂ + H₂ → NH₃",
            reactants: { "N₂": 1, "H₂": 3 },
            products: { "NH₃": 2 },
            atoms: { "N": 2, "H": 6 },
            draggableElements: ["N₂", "H₂", "H₂", "H₂", "NH₃", "NH₃"]
        },
        {
            equation: "CH₄ + O₂ → CO₂ + H₂O",
            reactants: { "CH₄": 1, "O₂": 2 },
            products: { "CO₂": 1, "H₂O": 2 },
            atoms: { "C": 1, "H": 4, "O": 4 },
            draggableElements: ["CH₄", "O₂", "O₂", "CO₂", "H₂O", "H₂O"]
        }
    ];

    const currentEquationDisplay = document.getElementById('current-equation');
    const draggableElementsPalette = document.getElementById('draggable-elements');
    const reactantsZone = document.querySelector('.reactants-zone');
    const productsZone = document.querySelector('.products-zone');
    const checkButton = document.getElementById('check-button');
    const nextButton = document.getElementById('next-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');
    const massConservationFeedback = document.getElementById('mass-conservation-feedback');

    let currentEquationIndex = 0;
    let draggedItem = null;
    let availableElements = []; // Store elements initially available in palette

    function initializeGame() {
        if (currentEquationIndex >= equationsData.length) {
            currentEquationIndex = 0; // Loop back to start
            feedbackDiv.textContent = "You've completed all reactions!";
            feedbackDiv.classList.add('correct');
            nextButton.disabled = true;
            return;
        }

        const currentReaction = equationsData[currentEquationIndex];
        currentEquationDisplay.textContent = currentReaction.equation;
        resetZones();
        populateDraggableElements(currentReaction.draggableElements);
        updateConservationFeedback(); // Initial check for 0 atoms
        nextButton.disabled = false; // Enable next button for subsequent rounds
    }

    function resetZones() {
        reactantsZone.innerHTML = '<h2>Reactants</h2><p>Drag molecules here to form reactants</p>';
        productsZone.innerHTML = '<h2>Products</h2><p>Drag molecules here to form products</p>';
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');
        massConservationFeedback.textContent = '';
        massConservationFeedback.classList.remove('balanced', 'unbalanced');
        // Re-enable all buttons
        checkButton.disabled = false;
        resetButton.disabled = false;
    }

    function populateDraggableElements(elements) {
        draggableElementsPalette.innerHTML = '';
        availableElements = []; // Clear previous elements
        elements.forEach(elementText => {
            const el = createDraggableElement(elementText);
            draggableElementsPalette.appendChild(el);
            availableElements.push(el); // Keep track of elements in palette
        });
    }

    function createDraggableElement(text) {
        const el = document.createElement('div');
        el.classList.add('draggable-element');
        el.textContent = text;
        el.setAttribute('draggable', 'true');
        el.dataset.molecule = text; // Store the molecule text
        el.addEventListener('dragstart', (e) => {
            draggedItem = el;
            e.dataTransfer.setData('text/plain', el.dataset.molecule);
            el.classList.add('dragging');
            feedbackDiv.textContent = ''; // Clear feedback on new drag
            feedbackDiv.classList.remove('correct', 'incorrect');
        });
        el.addEventListener('dragend', () => {
            el.classList.remove('dragging');
            draggedItem = null;
            updateConservationFeedback(); // Update feedback after drag
        });
        return el;
    }

    function addDropZoneListeners() {
        const dropZones = document.querySelectorAll('.drop-zone');

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault(); // Allow drop
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');

                if (draggedItem) {
                    // Remove placeholder text if present
                    const placeholder = zone.querySelector('p');
                    if (placeholder) placeholder.remove();

                    // If item was dragged from palette, clone it to keep original in palette
                    if (draggedItem.parentElement === draggableElementsPalette) {
                        const clonedItem = createDraggableElement(draggedItem.dataset.molecule);
                        clonedItem.classList.remove('draggable-element'); // Remove original style
                        clonedItem.classList.add('dropped-element'); // Add new style for dropped items
                        zone.appendChild(clonedItem);
                    } else {
                        // If item was moved between zones or within a zone
                        draggedItem.classList.remove('draggable-element'); // Remove original style
                        draggedItem.classList.add('dropped-element'); // Add new style for dropped items
                        zone.appendChild(draggedItem);
                    }
                    updateConservationFeedback();
                }
            });
            // Allow dragging elements back to palette if needed
            zone.addEventListener('dragstart', (e) => {
                if (e.target.classList.contains('dropped-element')) {
                    draggedItem = e.target;
                    e.dataTransfer.setData('text/plain', e.target.dataset.molecule);
                    e.target.classList.add('dragging');
                }
            });
        });

        // Add a drop target for elements to return to palette if needed
        draggableElementsPalette.addEventListener('dragover', (e) => {
            e.preventDefault();
            draggableElementsPalette.style.backgroundColor = 'rgba(162, 210, 255, 0.1)'; // Light blue overlay
        });
        draggableElementsPalette.addEventListener('dragleave', () => {
            draggableElementsPalette.style.backgroundColor = '';
        });
        draggableElementsPalette.addEventListener('drop', (e) => {
            e.preventDefault();
            draggableElementsPalette.style.backgroundColor = '';
            if (draggedItem && draggedItem.classList.contains('dropped-element')) {
                // Return to original palette item
                const originalElement = availableElements.find(el => el.dataset.molecule === draggedItem.dataset.molecule);
                if (originalElement) {
                    // Just remove the dropped instance, the original is still there
                    draggedItem.remove();
                } else {
                    // If it was a cloned element, re-add it to palette
                    draggedItem.classList.remove('dropped-element');
                    draggedItem.classList.add('draggable-element');
                    draggableElementsPalette.appendChild(draggedItem);
                }
            }
            updateConservationFeedback();
        });
    }

    function parseMolecules(elements) {
        const counts = {};
        elements.forEach(el => {
            // Simple parsing for common molecules like H2O, O2, N2, CH4, CO2, NH3
            const match = el.match(/([A-Z][a-z]?)(\d*)/g); // Matches "H2", "O", "CH4" etc.
            if (match) {
                match.forEach(m => {
                    const atomMatch = m.match(/([A-Z][a-z]?)(?:(\d+))?/);
                    if (atomMatch) {
                        const atom = atomMatch[1];
                        const count = parseInt(atomMatch[2] || '1');
                        counts[atom] = (counts[atom] || 0) + count;
                    }
                });
            }
        });
        return counts;
    }


    function getAtomsInZone(zone) {
        const droppedElements = Array.from(zone.querySelectorAll('.dropped-element'));
        const elementTexts = droppedElements.map(el => el.textContent);
        return parseMolecules(elementTexts);
    }

    function checkConservationOfMass() {
        const reactantsAtoms = getAtomsInZone(reactantsZone);
        const productsAtoms = getAtomsInZone(productsZone);

        const allAtoms = new Set([...Object.keys(reactantsAtoms), ...Object.keys(productsAtoms)]);
        let isBalanced = true;
        let massFeedbackText = "Mass Conservation: ";

        if (Object.keys(reactantsAtoms).length === 0 && Object.keys(productsAtoms).length === 0) {
            massConservationFeedback.textContent = ""; // Don't show feedback if zones are empty
            massConservationFeedback.classList.remove('balanced', 'unbalanced');
            return;
        }

        allAtoms.forEach(atom => {
            const reactantCount = reactantsAtoms[atom] || 0;
            const productCount = productsAtoms[atom] || 0;
            if (reactantCount !== productCount) {
                isBalanced = false;
            }
            massFeedbackText += `${atom}: In=${reactantCount}, Out=${productCount}; `;
        });

        massConservationFeedback.textContent = massFeedbackText.trim();
        if (isBalanced) {
            massConservationFeedback.classList.add('balanced');
            massConservationFeedback.classList.remove('unbalanced');
        } else {
            massConservationFeedback.classList.add('unbalanced');
            massConservationFeedback.classList.remove('balanced');
        }
        return isBalanced;
    }

    function updateConservationFeedback() {
        checkConservationOfMass(); // This will update the display in real-time
    }


    checkButton.addEventListener('click', () => {
        const currentReaction = equationsData[currentEquationIndex];

        const reactantsAtoms = getAtomsInZone(reactantsZone);
        const productsAtoms = getAtomsInZone(productsZone);

        let correctReactants = true;
        for (const mol in currentReaction.reactants) {
            const actualCount = Array.from(reactantsZone.querySelectorAll(`.dropped-element[data-molecule="${mol}"]`)).length;
            if (actualCount !== currentReaction.reactants[mol]) {
                correctReactants = false;
                break;
            }
        }
        // Also check for any extra molecules that shouldn't be there
        const droppedReactantMolecules = Array.from(reactantsZone.querySelectorAll('.dropped-element')).map(el => el.dataset.molecule);
        if (droppedReactantMolecules.length !== Object.values(currentReaction.reactants).reduce((a,b) => a+b, 0)) {
            correctReactants = false; // More or less molecules than expected
        }
        for (const mol of droppedReactantMolecules) {
            if (!(mol in currentReaction.reactants)) {
                correctReactants = false; // Contains unexpected molecules
                break;
            }
        }


        let correctProducts = true;
        for (const mol in currentReaction.products) {
            const actualCount = Array.from(productsZone.querySelectorAll(`.dropped-element[data-molecule="${mol}"]`)).length;
            if (actualCount !== currentReaction.products[mol]) {
                correctProducts = false;
                break;
            }
        }
        const droppedProductMolecules = Array.from(productsZone.querySelectorAll('.dropped-element')).map(el => el.dataset.molecule);
        if (droppedProductMolecules.length !== Object.values(currentReaction.products).reduce((a,b) => a+b, 0)) {
            correctProducts = false;
        }
         for (const mol of droppedProductMolecules) {
            if (!(mol in currentReaction.products)) {
                correctProducts = false;
                break;
            }
        }


        const conservationCorrect = checkConservationOfMass(); // Check mass conservation based on current dropped elements

        if (correctReactants && correctProducts && conservationCorrect) {
            feedbackDiv.textContent = "Correct! You've balanced the equation and conserved mass!";
            feedbackDiv.classList.add('correct');
            feedbackDiv.classList.remove('incorrect');
            nextButton.disabled = false; // Enable next only on full correctness
            checkButton.disabled = true; // Disable check once correct
        } else {
            feedbackDiv.textContent = "Not quite. Check your reactants, products, and atom counts!";
            feedbackDiv.classList.add('incorrect');
            feedbackDiv.classList.remove('correct');
        }
    });

    nextButton.addEventListener('click', () => {
        currentEquationIndex++;
        initializeGame();
    });

    resetButton.addEventListener('click', () => {
        initializeGame(); // Re-initialize to reset current puzzle
    });

    // Initial game load
    addDropZoneListeners();
    initializeGame();
});

// แหล่งที่มา:
// 1. https://github.com/Adr246/miniproject-main
// 2. https://github.com/Hakesh/p2-gaming-quiz
// 3. https://github.com/cKirkktoh/Caspe_Kirk_MusicMixer