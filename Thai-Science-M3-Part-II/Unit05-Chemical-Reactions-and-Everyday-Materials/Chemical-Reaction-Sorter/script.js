document.addEventListener('DOMContentLoaded', () => {
    const chemicalReactions = [
        { name: "Rusting of iron", type: "harmful" },
        { name: "Cooking food (e.g., baking a cake)", type: "beneficial" },
        { name: "Digestion of food in the body", type: "beneficial" },
        { name: "Burning wood for heat", type: "beneficial" },
        { name: "Photosynthesis in plants", type: "beneficial" },
        { name: "Spoiling of food", type: "harmful" },
        { name: "Corrosion of metal structures", type: "harmful" },
        { name: "Battery discharging (producing electricity)", type: "beneficial" },
        { name: "Fermentation (e.g., making bread or yogurt)", type: "beneficial" },
        { name: "Acid rain damaging buildings", type: "harmful" },
        { name: "Explosion of fireworks", type: "beneficial" }, // Beneficial for entertainment, but can be harmful if misused. Keeping it beneficial here for simplicity.
        { name: "Combustion in a car engine", type: "beneficial" }
    ];

    const draggablePhenomenaContainer = document.getElementById('draggable-phenomena');
    const beneficialZone = document.querySelector('.beneficial-zone');
    const harmfulZone = document.querySelector('.harmful-zone');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');

    let draggedItem = null;
    let initialParentMap = new Map(); // To store initial parent for resetting

    function initializeGame() {
        draggablePhenomenaContainer.innerHTML = '';
        beneficialZone.innerHTML = '<h2>Beneficial Reactions</h2><p class="placeholder">Drag beneficial reactions here</p>';
        harmfulZone.innerHTML = '<h2>Harmful Reactions</h2><p class="placeholder">Drag harmful reactions here</p>';
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');

        // Shuffle the reactions for variety each time
        const shuffledReactions = shuffleArray([...chemicalReactions]);

        shuffledReactions.forEach(reaction => {
            const card = document.createElement('div');
            card.classList.add('phenomena-card');
            card.textContent = reaction.name;
            card.setAttribute('draggable', 'true');
            card.dataset.type = reaction.type; // Store the correct type
            card.dataset.originalParent = 'draggable-phenomena'; // Mark initial parent for reset

            draggablePhenomenaContainer.appendChild(card);
            initialParentMap.set(card, draggablePhenomenaContainer); // Store initial parent
        });

        addDragDropListeners();
        checkButton.disabled = false; // Enable check button on reset
    }

    function addDragDropListeners() {
        const phenomenaCards = document.querySelectorAll('.phenomena-card');
        const dropZones = document.querySelectorAll('.drop-zone');

        phenomenaCards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                draggedItem = card;
                e.dataTransfer.setData('text/plain', card.dataset.type); // Set data for Firefox
                card.classList.add('dragging');
                feedbackDiv.textContent = ''; // Clear feedback on new drag
                feedbackDiv.classList.remove('correct', 'incorrect');
                // Remove feedback classes from the dragged item itself
                card.classList.remove('correct', 'incorrect');
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
                draggedItem = null;
            });
        });

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
                    // Remove placeholder if exists
                    const placeholder = zone.querySelector('.placeholder');
                    if (placeholder) placeholder.remove();

                    // If dragged from another zone, remove it from there
                    const previousParent = draggedItem.parentElement;
                    if (previousParent && previousParent.classList.contains('drop-zone')) {
                        previousParent.removeChild(draggedItem);
                        // If previous zone is now empty, add its placeholder back
                        if (previousParent.children.length === 1 && previousParent.querySelector('h2')) { // Only H2 present
                            const p = document.createElement('p');
                            p.classList.add('placeholder');
                            p.textContent = `Drag ${previousParent.dataset.category} reactions here`;
                            previousParent.appendChild(p);
                        }
                    }

                    zone.appendChild(draggedItem);
                }
            });
        });

        // Allow dragging back to the palette
        draggablePhenomenaContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            draggablePhenomenaContainer.style.backgroundColor = 'rgba(162, 210, 255, 0.1)'; // Visual hint
        });
        draggablePhenomenaContainer.addEventListener('dragleave', () => {
            draggablePhenomenaContainer.style.backgroundColor = '';
        });
        draggablePhenomenaContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            draggablePhenomenaContainer.style.backgroundColor = '';
            if (draggedItem && draggedItem.parentElement.classList.contains('drop-zone')) {
                const previousZone = draggedItem.parentElement;
                previousZone.removeChild(draggedItem);
                draggablePhenomenaContainer.appendChild(draggedItem);
                draggedItem.classList.remove('correct', 'incorrect'); // Clear feedback

                // If previous zone is now empty, add its placeholder back
                if (previousZone.children.length === 1 && previousZone.querySelector('h2')) {
                    const p = document.createElement('p');
                    p.classList.add('placeholder');
                    p.textContent = `Drag ${previousZone.dataset.category} reactions here`;
                    previousZone.appendChild(p);
                }
            }
        });
    }

    checkButton.addEventListener('click', () => {
        let correctCount = 0;
        const totalCards = chemicalReactions.length; // Number of cards that *should* be placed

        // Check cards in Beneficial Zone
        const beneficialCards = Array.from(beneficialZone.querySelectorAll('.phenomena-card'));
        beneficialCards.forEach(card => {
            if (card.dataset.type === 'beneficial') {
                card.classList.add('correct');
                card.classList.remove('incorrect');
                correctCount++;
            } else {
                card.classList.add('incorrect');
                card.classList.remove('correct');
            }
        });

        // Check cards in Harmful Zone
        const harmfulCards = Array.from(harmfulZone.querySelectorAll('.phenomena-card'));
        harmfulCards.forEach(card => {
            if (card.dataset.type === 'harmful') {
                card.classList.add('correct');
                card.classList.remove('incorrect');
                correctCount++;
            } else {
                card.classList.add('incorrect');
                card.classList.remove('correct');
            }
        });

        // Check if any cards are left in the palette
        const unplacedCards = Array.from(draggablePhenomenaContainer.querySelectorAll('.phenomena-card')).length;
        if (unplacedCards > 0) {
            feedbackDiv.textContent = `You need to place all cards! ${correctCount}/${totalCards} placed correctly so far.`;
            feedbackDiv.classList.add('incorrect');
        } else if (correctCount === totalCards) {
            feedbackDiv.textContent = `Congratulations! You sorted all ${correctCount} reactions correctly!`;
            feedbackDiv.classList.add('correct');
            checkButton.disabled = true; // Disable check once all correct
        } else {
            feedbackDiv.textContent = `You got ${correctCount} out of ${totalCards} correct. Keep trying!`;
            feedbackDiv.classList.add('incorrect');
        }
    });

    resetButton.addEventListener('click', () => {
        initializeGame();
    });

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
// 1. https://github.com/Ahmed5510-Mac/Card-Hover
// 2. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
// 3. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior