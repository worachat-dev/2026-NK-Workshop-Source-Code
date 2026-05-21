document.addEventListener('DOMContentLoaded', () => {
    const spaceTechData = [
        {
            name: "Communication Satellite",
            image: "communication_satellite.png",
            correctUse: "Relays phone calls, internet data, and TV signals globally."
        },
        {
            name: "Hubble Space Telescope",
            image: "hubble_telescope.png",
            correctUse: "Captures high-resolution images of distant galaxies and nebulae."
        },
        {
            name: "Weather Satellite",
            image: "weather_satellite.png",
            correctUse: "Monitors Earth's atmosphere for weather forecasting and climate study."
        },
        {
            name: "Mars Rover (e.g., Curiosity)",
            image: "mars_rover.png",
            correctUse: "Explores planetary surfaces, collecting samples and images."
        },
        {
            name: "GPS Satellite",
            image: "gps_satellite.png",
            correctUse: "Provides precise location and navigation services worldwide."
        },
        {
            name: "International Space Station (ISS)",
            image: "iss.png",
            correctUse: "Serves as a research lab and habitable outpost in low Earth orbit."
        }
    ];

    // All possible uses, including some plausible distractors if needed
    const allUses = [
        "Relays phone calls, internet data, and TV signals globally.",
        "Captures high-resolution images of distant galaxies and nebulae.",
        "Monitors Earth's atmosphere for weather forecasting and climate study.",
        "Explores planetary surfaces, collecting samples and images.",
        "Provides precise location and navigation services worldwide.",
        "Serves as a research lab and habitable outpost in low Earth orbit.",
        "Used for deep-sea exploration and underwater mapping.", // Distractor
        "Measures seismic activity and earthquake magnitudes." // Distractor
    ];


    const technologyColumn = document.querySelector('.technology-column');
    const usesColumn = document.querySelector('.uses-column');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');

    let draggedItem = null;
    const initialLabelPositions = new Map(); // Store initial parent and nextSibling for reset

    function initializeGame() {
        technologyColumn.innerHTML = '';
        usesColumn.innerHTML = '';
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');

        // Shuffle spaceTechData to randomize card order
        const shuffledTechData = shuffleArray([...spaceTechData]);

        // Create technology cards with drop targets
        shuffledTechData.forEach(tech => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('tech-card');
            cardDiv.innerHTML = `
                <img src="${tech.image}" alt="${tech.name}">
                <div class="tech-name">${tech.name}</div>
                <div class="drop-target" data-correct-use="${tech.correctUse}">
                    Drop use here
                </div>
            `;
            technologyColumn.appendChild(cardDiv);
        });

        // Create draggable use cards
        const shuffledUses = shuffleArray([...allUses]); // Shuffle all uses (including distractors)
        shuffledUses.forEach(use => {
            const labelDiv = document.createElement('div');
            labelDiv.classList.add('draggable-use');
            labelDiv.textContent = use;
            labelDiv.setAttribute('draggable', 'true');
            labelDiv.dataset.use = use; // Store the use for checking
            usesColumn.appendChild(labelDiv);

            // Store initial position for reset
            initialLabelPositions.set(labelDiv, {
                parent: labelDiv.parentElement,
                nextSibling: labelDiv.nextElementSibling
            });
        });

        addDragDropListeners();
    }

    function addDragDropListeners() {
        const draggables = document.querySelectorAll('.draggable-use');
        const dropTargets = document.querySelectorAll('.drop-target');

        draggables.forEach(label => {
            label.addEventListener('dragstart', (e) => {
                draggedItem = label;
                e.dataTransfer.setData('text/plain', label.dataset.use); // Set data for Firefox compatibility
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
                    // If target already has a child, move it back to the uses column
                    if (target.hasChildNodes()) {
                        const existingChild = target.querySelector('.draggable-use');
                        if (existingChild) {
                            usesColumn.appendChild(existingChild); // Move existing label back
                            existingChild.classList.remove('correct', 'incorrect'); // Clear feedback
                        }
                    }
                    target.innerHTML = ''; // Clear "Drop use here" text
                    target.appendChild(draggedItem);
                }
            });
        });
    }

    checkButton.addEventListener('click', () => {
        let allCorrect = true;
        let score = 0;
        const totalTargets = document.querySelectorAll('.tech-card').length;

        const allLabels = document.querySelectorAll('.draggable-use');
        allLabels.forEach(label => label.classList.remove('correct', 'incorrect')); // Clear all previous feedback

        document.querySelectorAll('.tech-card').forEach(card => {
            const dropTarget = card.querySelector('.drop-target');
            const labelInside = dropTarget.querySelector('.draggable-use');
            const correctUse = dropTarget.dataset.correctUse;

            if (labelInside) {
                const droppedUse = labelInside.dataset.use;
                if (droppedUse === correctUse) {
                    labelInside.classList.add('correct');
                    score++;
                } else {
                    labelInside.classList.add('incorrect');
                    allCorrect = false;
                    // Optional: show correct answer next to incorrect one
                    // dropTarget.innerHTML += `<br><span style="color: #2ecc71; font-size: 0.8em;">(Correct: ${correctUse})</span>`;
                }
            } else {
                allCorrect = false; // Target is empty
            }
        });

        if (allCorrect && score === totalTargets) {
            feedbackDiv.textContent = 'Excellent! All technologies are correctly matched!';
            feedbackDiv.classList.add('correct');
        } else {
            feedbackDiv.textContent = `You got ${score} out of ${totalTargets} correct. Keep exploring!`;
            feedbackDiv.classList.add('incorrect');
        }
    });

    resetButton.addEventListener('click', () => {
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');

        // Reset all draggable labels to their original column and clear feedback
        const allLabels = document.querySelectorAll('.draggable-use');
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
                usesColumn.appendChild(label); // Fallback: just append if initial state not found
            }
        });

        // Reset all drop targets to their initial text
        document.querySelectorAll('.tech-card').forEach(card => {
            const dropTarget = card.querySelector('.drop-target');
            dropTarget.innerHTML = 'Drop use here';
            dropTarget.classList.remove('drag-over');
        });

        // Re-shuffle labels in the initial column (optional, but good for replayability)
        const currentLabelsInColumn = Array.from(usesColumn.children);
        shuffleArray(currentLabelsInColumn).forEach(label => usesColumn.appendChild(label));
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