document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            id: 'setup1',
            title: 'Plane Mirror',
            image: 'plane_mirror_setup.png',
            correctAnswer: 'Virtual, Upright, Same Size'
        },
        {
            id: 'setup2',
            title: 'Convex Lens (Object beyond 2F)',
            image: 'convex_lens_setup_real.png',
            correctAnswer: 'Real, Inverted, Diminished'
        },
        {
            id: 'setup3',
            title: 'Concave Mirror (Object between F and Pole)',
            image: 'concave_mirror_setup_virtual.png',
            correctAnswer: 'Virtual, Upright, Magnified'
        },
        {
            id: 'setup4',
            title: 'Concave Lens',
            image: 'concave_lens_setup.png',
            correctAnswer: 'Virtual, Upright, Diminished'
        }
    ];

    const allDescriptions = [
        "Real, Inverted, Diminished",
        "Virtual, Upright, Same Size",
        "Virtual, Upright, Magnified",
        "Virtual, Upright, Diminished",
        "Real, Upright, Magnified (Incorrect Type)", // Added some plausible but wrong descriptions
        "Real, Inverted, Magnified" // This is for convex lens object between F and 2F, not in current setups
    ];

    const diagramColumn = document.querySelector('.diagram-column');
    const labelsColumn = document.querySelector('.labels-column');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');

    let draggedItem = null;
    const initialLabelPositions = new Map(); // Store initial parent and nextSibling for reset

    function initializeGame() {
        diagramColumn.innerHTML = '';
        labelsColumn.innerHTML = '';
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');

        // Shuffle quizData to randomize diagram order
        const shuffledQuizData = shuffleArray([...quizData]);

        // Create optical setup elements
        shuffledQuizData.forEach(setup => {
            const setupDiv = document.createElement('div');
            setupDiv.classList.add('optical-setup');
            setupDiv.innerHTML = `
                <img src="${setup.image}" alt="${setup.title} Diagram">
                <div class="setup-title">${setup.title}</div>
                <div class="drop-target" data-correct-answer="${setup.correctAnswer}" data-setup-id="${setup.id}">
                    Drop description here
                </div>
            `;
            diagramColumn.appendChild(setupDiv);
        });

        // Create draggable labels
        const shuffledDescriptions = shuffleArray([...allDescriptions]); // Shuffle all descriptions
        shuffledDescriptions.forEach(description => {
            const labelDiv = document.createElement('div');
            labelDiv.classList.add('draggable-label');
            labelDiv.textContent = description;
            labelDiv.setAttribute('draggable', 'true');
            labelDiv.dataset.description = description; // Store the description for checking
            labelsColumn.appendChild(labelDiv);

            // Store initial position for reset
            initialLabelPositions.set(labelDiv, {
                parent: labelDiv.parentElement,
                nextSibling: labelDiv.nextElementSibling
            });
        });

        addDragDropListeners();
    }

    function addDragDropListeners() {
        const draggables = document.querySelectorAll('.draggable-label');
        const dropTargets = document.querySelectorAll('.drop-target');

        draggables.forEach(label => {
            label.addEventListener('dragstart', (e) => {
                draggedItem = label;
                e.dataTransfer.setData('text/plain', label.dataset.description);
                label.classList.add('dragging');
                feedbackDiv.textContent = ''; // Clear feedback on new drag
                feedbackDiv.classList.remove('correct', 'incorrect');
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
                        const existingChild = target.querySelector('.draggable-label');
                        if (existingChild) {
                            labelsColumn.appendChild(existingChild); // Move existing label back
                            existingChild.classList.remove('correct', 'incorrect'); // Clear feedback
                        }
                    }
                    target.innerHTML = ''; // Clear "Drop description here" text
                    target.appendChild(draggedItem);
                    draggedItem.style.position = 'static'; // Reset position after drop
                    draggedItem.style.left = 'unset';
                    draggedItem.style.top = 'unset';
                    draggedItem.style.transform = 'unset';
                }
            });
        });
    }

    checkButton.addEventListener('click', () => {
        let allCorrect = true;
        let score = 0;
        const totalTargets = dropTargets.length;

        const droppedLabels = document.querySelectorAll('.drop-target .draggable-label');
        const allLabels = document.querySelectorAll('.draggable-label');

        allLabels.forEach(label => label.classList.remove('correct', 'incorrect')); // Clear all feedback

        dropTargets.forEach(target => {
            const labelInside = target.querySelector('.draggable-label');
            const correctAnswer = target.dataset.correctAnswer;

            if (labelInside) {
                const droppedDescription = labelInside.dataset.description;
                if (droppedDescription === correctAnswer) {
                    labelInside.classList.add('correct');
                    score++;
                } else {
                    labelInside.classList.add('incorrect');
                    allCorrect = false;
                }
            } else {
                allCorrect = false; // Target is empty
            }
        });

        if (allCorrect && score === totalTargets) {
            feedbackDiv.textContent = 'Fantastic! All matches are correct!';
            feedbackDiv.classList.add('correct');
        } else {
            feedbackDiv.textContent = `You got ${score} out of ${totalTargets} correct. Keep trying!`;
            feedbackDiv.classList.add('incorrect');
        }
    });

    resetButton.addEventListener('click', () => {
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');

        // Reset all labels to their original column and clear feedback
        const allLabels = document.querySelectorAll('.draggable-label');
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
                // Fallback: just append if initial state not found (shouldn't happen)
                labelsColumn.appendChild(label);
            }
            label.style.position = 'static'; // Reset styling from drag/drop
            label.style.left = 'unset';
            label.style.top = 'unset';
            label.style.transform = 'unset';
        });

        // Reset all drop targets to their initial text
        dropTargets.forEach(target => {
            target.innerHTML = 'Drop description here';
            target.classList.remove('drag-over');
        });

        // Re-shuffle labels in the initial column (optional, but good for replayability)
        const currentLabelsInColumn = Array.from(labelsColumn.children);
        shuffleArray(currentLabelsInColumn).forEach(label => labelsColumn.appendChild(label));
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
// 1. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
// 2. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior