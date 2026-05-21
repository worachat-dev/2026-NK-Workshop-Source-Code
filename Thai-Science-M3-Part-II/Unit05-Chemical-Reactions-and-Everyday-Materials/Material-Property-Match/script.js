document.addEventListener('DOMContentLoaded', () => {
    const materialsData = [
        {
            name: "Steel",
            properties: ["High strength", "Malleable", "Ductile", "Good thermal conductor", "Good electrical conductor", "Corrodes (rusts)"]
        },
        {
            name: "Ceramic (e.g., pottery, tiles)",
            properties: ["Very hard", "Brittle", "High melting point", "Good thermal insulator", "Good electrical insulator"]
        },
        {
            name: "Plastic (e.g., PVC, PET)",
            properties: ["Flexible (some types)", "Lightweight", "Poor thermal conductor", "Poor electrical conductor", "Durable (slow to degrade)", "Can be molded"]
        },
        {
            name: "Glass",
            properties: ["Transparent", "Brittle", "Hard", "Good thermal insulator", "Good electrical insulator", "Non-crystalline"]
        },
        {
            name: "Wood",
            properties: ["Strong (relative to weight)", "Good thermal insulator", "Poor electrical conductor", "Flammable", "Renewable", "Natural grain"]
        },
        {
            name: "Copper",
            properties: ["Excellent electrical conductor", "Excellent thermal conductor", "Ductile", "Malleable", "Corrodes (forms patina)"]
        }
    ];

    // Collect all unique properties from the data for the palette
    const allProperties = [...new Set(materialsData.flatMap(material => material.properties))];

    const materialsDisplay = document.getElementById('materials-display');
    const propertiesPalette = document.getElementById('properties-palette');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');

    let draggedItem = null;
    // Map to store the original parent of each property card for easy reset
    const initialPropertyCardParents = new Map();

    function initializeGame() {
        materialsDisplay.innerHTML = '';
        propertiesPalette.innerHTML = '';
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');
        checkButton.disabled = false; // Enable check button

        // Create material cards with drop areas
        shuffleArray(materialsData).forEach(material => {
            const materialCard = document.createElement('div');
            materialCard.classList.add('material-card');
            materialCard.innerHTML = `
                ${material.name}
                <div class="properties-drop-area" data-material="${material.name}">
                    <p class="placeholder">Drop properties here</p>
                </div>
            `;
            materialsDisplay.appendChild(materialCard);
        });

        // Create draggable property cards
        shuffleArray(allProperties).forEach(propText => {
            const propertyCard = document.createElement('div');
            propertyCard.classList.add('property-card');
            propertyCard.textContent = propText;
            propertyCard.setAttribute('draggable', 'true');
            propertyCard.dataset.property = propText; // Store property text
            propertiesPalette.appendChild(propertyCard);

            initialPropertyCardParents.set(propertyCard, propertiesPalette); // Store initial parent
        });

        addDragDropListeners();
    }

    function addDragDropListeners() {
        const propertyCards = document.querySelectorAll('.property-card');
        const dropAreas = document.querySelectorAll('.properties-drop-area');

        propertyCards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                draggedItem = card;
                e.dataTransfer.setData('text/plain', card.dataset.property); // For Firefox
                card.classList.add('dragging');
                feedbackDiv.textContent = ''; // Clear feedback on new drag
                feedbackDiv.classList.remove('correct', 'incorrect');
                card.classList.remove('correct', 'incorrect'); // Clear previous feedback on drag
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
                draggedItem = null;
            });
        });

        dropAreas.forEach(area => {
            area.addEventListener('dragover', (e) => {
                e.preventDefault(); // Allow drop
                area.classList.add('drag-over');
            });

            area.addEventListener('dragleave', () => {
                area.classList.remove('drag-over');
            });

            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.classList.remove('drag-over');

                if (draggedItem) {
                    // Remove placeholder if exists
                    const placeholder = area.querySelector('.placeholder');
                    if (placeholder) placeholder.remove();

                    // If dragged from another drop area, remove it from there
                    const previousParent = draggedItem.parentElement;
                    if (previousParent.classList.contains('properties-drop-area')) {
                        previousParent.removeChild(draggedItem);
                        // If previous drop area is now empty, add its placeholder back
                        if (previousParent.children.length === 0) {
                            const p = document.createElement('p');
                            p.classList.add('placeholder');
                            p.textContent = 'Drop properties here';
                            previousParent.appendChild(p);
                        }
                    } else if (previousParent === propertiesPalette) {
                        // If dragged from palette, remove from palette to prevent duplicates
                        // (we'll re-add it to palette on reset)
                        propertiesPalette.removeChild(draggedItem);
                    }

                    area.appendChild(draggedItem);
                }
            });
        });

        // Add drop target for returning cards to the palette
        propertiesPalette.addEventListener('dragover', (e) => {
            e.preventDefault();
            propertiesPalette.style.backgroundColor = 'rgba(162, 210, 255, 0.1)'; // Visual hint
        });
        propertiesPalette.addEventListener('dragleave', () => {
            propertiesPalette.style.backgroundColor = '';
        });
        propertiesPalette.addEventListener('drop', (e) => {
            e.preventDefault();
            propertiesPalette.style.backgroundColor = '';
            if (draggedItem && draggedItem.classList.contains('property-card')) {
                // If it was dropped from a drop area, remove it from there
                const previousParent = draggedItem.parentElement;
                if (previousParent.classList.contains('properties-drop-area')) {
                    previousParent.removeChild(draggedItem);
                    // If previous drop area is now empty, add its placeholder back
                    if (previousParent.children.length === 0) {
                        const p = document.createElement('p');
                        p.classList.add('placeholder');
                        p.textContent = 'Drop properties here';
                        previousParent.appendChild(p);
                    }
                }
                // Return it to the palette (it might already be there or just added back)
                propertiesPalette.appendChild(draggedItem);
                draggedItem.classList.remove('correct', 'incorrect'); // Clear feedback
            }
        });
    }

    checkButton.addEventListener('click', () => {
        let totalCorrectMatches = 0;
        let totalPossibleMatches = 0; // Number of correct properties that *could* be placed

        // First, reset all property card feedback
        document.querySelectorAll('.property-card').forEach(card => {
            card.classList.remove('correct', 'incorrect');
        });

        materialsData.forEach(material => {
            const dropArea = document.querySelector(`.properties-drop-area[data-material="${material.name}"]`);
            const droppedProperties = Array.from(dropArea.querySelectorAll('.property-card'));
            const correctPropertiesForMaterial = material.properties;

            // Count how many properties were correctly placed for this material
            let materialCorrectCount = 0;
            droppedProperties.forEach(droppedCard => {
                if (correctPropertiesForMaterial.includes(droppedCard.dataset.property)) {
                    droppedCard.classList.add('correct');
                    totalCorrectMatches++;
                    materialCorrectCount++;
                } else {
                    droppedCard.classList.add('incorrect');
                }
            });

            // Mark any *missing* correct properties as unattempted or incorrect (visually not done here, just for score logic)
            // Or, for simplicity, just check if all *dropped* properties are correct and if the count is correct.
            // A more complex scoring might penalize for missing correct properties as well.

            totalPossibleMatches += correctPropertiesForMaterial.length;
        });

        // Count properties still in the palette
        const propertiesInPalette = Array.from(propertiesPalette.querySelectorAll('.property-card')).length;
        const totalCards = allProperties.length;

        if (totalCorrectMatches === totalCards && propertiesInPalette === 0) {
            feedbackDiv.textContent = `Fantastic! You matched all properties correctly!`;
            feedbackDiv.classList.add('correct');
            feedbackDiv.classList.remove('incorrect');
            checkButton.disabled = true; // Disable check once all correct
        } else {
            feedbackDiv.textContent = `You got ${totalCorrectMatches} out of ${totalCards} properties correctly matched. Keep trying!`;
            feedbackDiv.classList.add('incorrect');
            feedbackDiv.classList.remove('correct');
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
// 1. https://discuss.streamlit.io/t/how-to-get-value-from-html/5303
// 2. https://github.com/aadilmughal786/simple-web-project
// 3. https://github.com/GokuPrograming/DECO
// 4. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
// 5. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior