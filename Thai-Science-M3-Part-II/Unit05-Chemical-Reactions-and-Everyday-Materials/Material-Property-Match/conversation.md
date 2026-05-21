## From """Unit 5: Chemical Reactions and Everyday Materials
Students will learn about the occurrence of chemical reactions, the total mass of substances before and after a chemical reaction, heat changes in chemical reactions, chemical reactions found in daily life, the benefits and harms of chemical reactions to living organisms and surrounding things, methods to prevent and solve problems caused by chemical reactions, and chemical materials used in daily life, which can be utilized differently. Chapter 2: Everyday Materials
This chapter covers familiar materials used in daily life, including polymers, ceramics, and metals. It explores their properties, components, and the processes involved in producing these materials for various uses in everyday life. """ and please Create a  "Material Property Match": Students match different materials (e.g., plastic, ceramic, steel) to their key properties (e.g., flexibility, hardness, conductivity)  by using the index.html, style.css, script.js?

Okay, I will create the "Material Property Match" game.

This game will involve:
1.  **Material Cards:** Draggable cards representing common everyday materials (plastic, ceramic, steel, wood, glass, etc.).
2.  **Property Cards:** Draggable cards representing key properties (flexibility, hardness, conductivity, insulation, transparency, etc.).
3.  **Matching Areas:** Designated drop zones or pairing mechanism to connect a material with its relevant properties.
4.  **Feedback:** Instant feedback on correct/incorrect matches.

The core interaction will be drag-and-drop to establish relationships between materials and their properties.

---

## Material Property Match: Game Files

Here are the `index.html`, `style.css`, and `script.js` files for the "Material Property Match" game.

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Material Property Match</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Material Property Match</h1>
        <p>Drag and drop the properties to their corresponding materials. Some materials may have multiple relevant properties!</p>

        <div class="match-area">
            <div class="materials-column">
                <h2>Materials</h2>
                <div id="materials-display">
                    </div>
            </div>
            <div class="properties-column">
                <h2>Properties</h2>
                <div id="properties-palette">
                    </div>
            </div>
        </div>

        <div class="controls">
            <button id="check-button">Check Answers</button>
            <button id="reset-button">Reset Game</button>
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
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #2c3e50, #34495e, #1a202c); /* Dark blue-gray gradient */
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
    max-width: 1200px;
    width: 100%;
}

h1 {
    color: #81ecec; /* Light Aqua */
    margin-bottom: 20px;
    font-size: 3em;
    font-weight: 900;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
}

p {
    color: #bdc3c7; /* Lighter gray */
    margin-bottom: 30px;
    font-size: 1.1em;
    line-height: 1.6;
}

.match-area {
    display: flex;
    justify-content: space-around;
    gap: 30px;
    margin-bottom: 40px;
    flex-wrap: wrap; /* Allow wrapping for responsiveness */
}

.materials-column, .properties-column {
    flex: 1;
    min-width: 350px;
    background-color: #4a6075;
    border-radius: 18px;
    padding: 25px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
}

.materials-column h2, .properties-column h2 {
    color: #a2d2ff; /* Light Blue */
    margin-top: 0;
    margin-bottom: 25px;
    font-size: 1.8em;
}

#materials-display {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.material-card {
    background-color: #5d7488; /* Even lighter blue-gray */
    border: 2px solid #7f90a0;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    font-weight: bold;
    color: #f1c40f; /* Gold for names */
    font-size: 1.4em;
    position: relative;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.properties-drop-area {
    min-height: 80px; /* Space for dropped properties */
    background-color: rgba(129, 236, 236, 0.1); /* Transparent light aqua */
    border: 2px dashed #81ecec; /* Light aqua dashed border */
    border-radius: 10px;
    margin-top: 15px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

.properties-drop-area.drag-over {
    background-color: rgba(129, 236, 236, 0.3);
    border-color: #2ecc71; /* Green highlight */
}

.properties-drop-area .placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-style: italic;
    font-size: 0.9em;
}

#properties-palette {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
}

.property-card {
    background-color: #3498db; /* Blue */
    color: white;
    padding: 12px 18px;
    border-radius: 8px;
    cursor: grab;
    font-weight: 600;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s ease, transform 0.2s ease;
    font-size: 1.1em;
    user-select: none; /* Prevent text selection during drag */
}

.property-card:hover {
    background-color: #2980b9; /* Darker Blue */
    transform: translateY(-2px);
}

.property-card.dragging {
    opacity: 0.7;
    transform: scale(1.05);
}

/* Feedback styles for dropped property cards */
.property-card.correct {
    background-color: #27ae60; /* Darker Green for correct */
    box-shadow: 0 0 10px rgba(46, 204, 113, 0.6);
}

.property-card.incorrect {
    background-color: #c0392b; /* Darker Red for incorrect */
    box-shadow: 0 0 10px rgba(231, 76, 60, 0.6);
}


.controls {
    margin-top: 40px;
}

button {
    background-color: #1abc9c; /* Turquoise */
    color: white;
    border: none;
    padding: 15px 35px;
    border-radius: 12px;
    font-size: 1.25em;
    cursor: pointer;
    margin: 0 20px;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 8px 20px rgba(26, 188, 156, 0.3);
}

button:hover {
    background-color: #16a085; /* Darker Turquoise */
    transform: translateY(-3px);
}

#check-button {
    background-color: #f39c12; /* Orange */
    box-shadow: 0 8px 20px rgba(243, 156, 18, 0.3);
}
#check-button:hover {
    background-color: #e67e22; /* Darker Orange */
}

#reset-button {
    background-color: #95a5a6; /* Silver */
    box-shadow: 0 8px 20px rgba(149, 165, 166, 0.3);
}
#reset-button:hover {
    background-color: #7f8c8d; /* Darker Silver */
}

.feedback-message {
    margin-top: 40px;
    font-weight: bold;
    font-size: 1.6em;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.feedback-message.correct {
    color: #2ecc71;
}

.feedback-message.incorrect {
    color: #e74c3c;
}
```

---

### `script.js`

```javascript
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
```

---

## How to Set Up and Play

1.  **Create a Folder:** Make a new folder on your computer (e.g., `MaterialMatchGame`).
2.  **Save the Files:**
    * Save the `index.html` code as `index.html` inside the folder.
    * Save the `style.css` code as `style.css` inside the folder.
    * Save the `script.js` code as `script.js` inside the folder.
3.  **Open in Browser:** Open the `index.html` file using your web browser (e.g., Chrome, Firefox).

### How to Play:

1.  **Observe Materials:** On the left side, you'll see a list of common materials (e.g., Steel, Ceramic, Plastic). Each material has a "Drop properties here" area below it.
2.  **Observe Properties:** On the right side, you'll find a palette of "Properties" cards (e.g., "Flexible", "Hard", "Good thermal conductor").
3.  **Drag and Drop:**
    * **Drag** a property card from the "Properties" palette.
    * **Drop** it into the "Drop properties here" area under the material(s) that possess that property.
    * **Important:** Some properties may apply to multiple materials, and some materials have multiple properties. Drag a property to *all* applicable materials. If you drag it from one material's drop area to another, it will move. If you want to put it back to the palette, drag it there.
4.  **Check Answers:** Once you've placed all the property cards (or as many as you want to check), click the **"Check Answers"** button.
5.  **Get Feedback:**
    * Property cards correctly placed will turn darker green.
    * Property cards incorrectly placed (dropped under the wrong material) will turn darker red.
    * A feedback message will appear at the bottom indicating your score.
6.  **Reset Game:** Click **"Reset Game"** to clear all matches and start over with a fresh, shuffled set of cards.

This game offers an interactive way for students to learn and reinforce their understanding of the characteristics and uses of everyday materials.

```
แหล่งที่มา:
1. https://discuss.streamlit.io/t/how-to-get-value-from-html/5303
2. https://github.com/aadilmughal786/simple-web-project
3. https://github.com/GokuPrograming/DECO
4. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
5. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior