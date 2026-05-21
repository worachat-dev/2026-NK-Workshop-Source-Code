document.addEventListener('DOMContentLoaded', () => {
    const moonPhasesData = [
        {
            name: "New Moon",
            image: "new_moon.png",
            explanation: "The side of the Moon facing Earth is not illuminated by the Sun. It's between the Earth and the Sun."
        },
        {
            name: "Waxing Crescent",
            image: "waxing_crescent.png",
            explanation: "A sliver of the Moon's right side is illuminated and growing larger each night."
        },
        {
            name: "First Quarter",
            image: "first_quarter.png",
            explanation: "The right half of the Moon is illuminated. It's a quarter of the way through its orbit."
        },
        {
            name: "Waxing Gibbous",
            image: "waxing_gibbous.png",
            explanation: "More than half of the Moon's right side is illuminated and growing larger."
        },
        {
            name: "Full Moon",
            image: "full_moon.png",
            explanation: "The entire side of the Moon facing Earth is illuminated by the Sun. Earth is between the Moon and the Sun."
        },
        {
            name: "Waning Gibbous",
            image: "waning_gibbous.png",
            explanation: "More than half of the Moon's left side is illuminated, but the illuminated portion is shrinking."
        },
        {
            name: "Third Quarter",
            image: "third_quarter.png",
            explanation: "The left half of the Moon is illuminated. It's three-quarters of the way through its orbit."
        },
        {
            name: "Waning Crescent",
            image: "waning_crescent.png",
            explanation: "A sliver of the Moon's left side is illuminated and shrinking, almost back to New Moon."
        }
    ];

    const moonPhasesColumn = document.querySelector('.moon-phases-column');
    const phaseNamesColumn = document.querySelector('.phase-names-column');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');

    let draggedItem = null;
    const initialLabelPositions = new Map(); // Store initial parent and nextSibling for reset

    function initializeGame() {
        moonPhasesColumn.innerHTML = '';
        phaseNamesColumn.innerHTML = '';
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');

        // Shuffle moonPhasesData for random image order
        const shuffledMoonPhases = shuffleArray([...moonPhasesData]);

        // Create moon phase cards and drop targets
        shuffledMoonPhases.forEach(phase => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('moon-phase-card');
            cardDiv.innerHTML = `
                <img src="${phase.image}" alt="${phase.name}">
                <div class="drop-target" data-correct-name="${phase.name}">
                    Drop name here
                </div>
                <div class="phase-name-display"></div>
                <div class="phase-explanation">${phase.explanation}</div>
            `;
            moonPhasesColumn.appendChild(cardDiv);
        });

        // Create draggable phase names
        const phaseNames = moonPhasesData.map(p => p.name);
        const shuffledPhaseNames = shuffleArray([...phaseNames]); // Shuffle the names
        shuffledPhaseNames.forEach(name => {
            const labelDiv = document.createElement('div');
            labelDiv.classList.add('draggable-name');
            labelDiv.textContent = name;
            labelDiv.setAttribute('draggable', 'true');
            labelDiv.dataset.name = name; // Store the name for checking
            phaseNamesColumn.appendChild(labelDiv);

            // Store initial position for reset
            initialLabelPositions.set(labelDiv, {
                parent: labelDiv.parentElement,
                nextSibling: labelDiv.nextElementSibling
            });
        });

        addDragDropListeners();
    }

    function addDragDropListeners() {
        const draggables = document.querySelectorAll('.draggable-name');
        const dropTargets = document.querySelectorAll('.drop-target');

        draggables.forEach(label => {
            label.addEventListener('dragstart', (e) => {
                draggedItem = label;
                e.dataTransfer.setData('text/plain', label.dataset.name);
                label.classList.add('dragging');
                feedbackDiv.textContent = ''; // Clear feedback on new drag
                feedbackDiv.classList.remove('correct', 'incorrect');
                // Hide explanations when new drag starts
                document.querySelectorAll('.phase-explanation').forEach(exp => exp.classList.remove('show'));
                document.querySelectorAll('.phase-name-display').forEach(display => display.style.display = 'none');
            });

            label.addEventListener('dragend', () => {
                label.classList.remove('dragging');
                draggedItem = null;
            });
        });

        dropTargets.forEach(target => {
            target.addEventListener('dragover', (e) => {
                e.preventDefault(); // Allow drop
                target.classList.add('drag-over');
            });

            target.addEventListener('dragleave', () => {
                target.classList.remove('drag-over');
            });

            target.addEventListener('drop', (e) => {
                e.preventDefault();
                target.classList.remove('drag-over');

                if (draggedItem) {
                    // If target already has a child, move it back to the labels column
                    if (target.hasChildNodes()) {
                        const existingChild = target.querySelector('.draggable-name');
                        if (existingChild) {
                            phaseNamesColumn.appendChild(existingChild); // Move existing label back
                            existingChild.classList.remove('correct', 'incorrect'); // Clear feedback
                        }
                    }
                    target.innerHTML = ''; // Clear "Drop name here" text
                    target.appendChild(draggedItem);
                }
            });
        });
    }

    checkButton.addEventListener('click', () => {
        let allCorrect = true;
        let score = 0;
        const totalTargets = document.querySelectorAll('.moon-phase-card').length; // Number of cards/targets

        const allLabels = document.querySelectorAll('.draggable-name');
        allLabels.forEach(label => label.classList.remove('correct', 'incorrect')); // Clear all previous feedback

        document.querySelectorAll('.moon-phase-card').forEach(card => {
            const dropTarget = card.querySelector('.drop-target');
            const labelInside = dropTarget.querySelector('.draggable-name');
            const phaseNameDisplay = card.querySelector('.phase-name-display');
            const phaseExplanation = card.querySelector('.phase-explanation');
            const correctAnswer = dropTarget.dataset.correctName;

            phaseNameDisplay.style.display = 'block'; // Show the correct/incorrect label space
            phaseExplanation.classList.remove('show'); // Hide previous explanations

            if (labelInside) {
                const droppedName = labelInside.dataset.name;
                phaseNameDisplay.textContent = correctAnswer; // Always show correct answer here
                if (droppedName === correctAnswer) {
                    labelInside.classList.add('correct');
                    phaseNameDisplay.style.color = '#4CAF50'; // Green text for correct display
                    score++;
                } else {
                    labelInside.classList.add('incorrect');
                    phaseNameDisplay.style.color = '#f44336'; // Red text for incorrect display
                    allCorrect = false;
                }
                phaseExplanation.classList.add('show'); // Show explanation for all dropped items
            } else {
                // If a drop target is empty
                phaseNameDisplay.textContent = `Missing: ${correctAnswer}`;
                phaseNameDisplay.style.color = '#ff9800'; // Orange for missing
                allCorrect = false;
            }
        });

        if (allCorrect && score === totalTargets) {
            feedbackDiv.textContent = 'Excellent! All moon phases are correctly matched!';
            feedbackDiv.classList.add('correct');
        } else {
            feedbackDiv.textContent = `You got ${score} out of ${totalTargets} correct. Review your answers!`;
            feedbackDiv.classList.add('incorrect');
        }
    });

    resetButton.addEventListener('click', () => {
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');

        // Reset all draggable labels to their original column and clear feedback
        const allLabels = document.querySelectorAll('.draggable-name');
        allLabels.forEach(label => {
            label.classList.remove('correct', 'incorrect');
            const initialState = initialLabelPositions.get(label);
            if (initialState) {
                // Insert back into its original parent at its original position
                if (initialState.nextSibling) {
                    initialState.parent.insertBefore(label, initialState.nextSibling);
                } else {
                    initialState.parent.appendChild(label);
                }
            } else {
                phaseNamesColumn.appendChild(label); // Fallback: just append if initial state not found
            }
        });

        // Reset all drop targets and hide explanations/displays
        document.querySelectorAll('.moon-phase-card').forEach(card => {
            const dropTarget = card.querySelector('.drop-target');
            const phaseNameDisplay = card.querySelector('.phase-name-display');
            const phaseExplanation = card.querySelector('.phase-explanation');

            dropTarget.innerHTML = 'Drop name here';
            dropTarget.classList.remove('drag-over');
            phaseNameDisplay.style.display = 'none'; // Hide the display
            phaseExplanation.classList.remove('show'); // Hide explanation
        });

        // Re-shuffle labels in the initial column (optional, but good for replayability)
        const currentLabelsInColumn = Array.from(phaseNamesColumn.children);
        shuffleArray(currentLabelsInColumn).forEach(label => phaseNamesColumn.appendChild(label));
    });

    // Utility function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initialize the game when the page loads
    initializeGame();
});

// แหล่งที่มา:
// 1. https://github.com/Ahmed5510-Mac/Card-Hover
// 2. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
// 3. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior