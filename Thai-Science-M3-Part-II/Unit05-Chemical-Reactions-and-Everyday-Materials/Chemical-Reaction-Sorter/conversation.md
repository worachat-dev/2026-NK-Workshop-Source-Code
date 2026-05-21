## From """Unit 5: Chemical Reactions and Everyday Materials
Students will learn about the occurrence of chemical reactions, the total mass of substances before and after a chemical reaction, heat changes in chemical reactions, chemical reactions found in daily life, the benefits and harms of chemical reactions to living organisms and surrounding things, methods to prevent and solve problems caused by chemical reactions, and chemical materials used in daily life, which can be utilized differently.

Chapter 1: Chemical Reactions
A chemical reaction is a change in substances that results in the formation of new substances. Substances that participate in a chemical reaction are called reactants, while the new substances formed are called products. During a chemical reaction, atoms of each substance are neither lost nor created, but are rearranged. Therefore, the total mass of substances before and after a chemical reaction remains the same, which is in accordance with the law of conservation of mass. Chemical reactions can be both beneficial and harmful to living organisms and surrounding things. Therefore, we must learn to control, prevent, and solve problems that may arise from these chemical reactions.""" and please Create a "Chemical Reaction Sorter": Students sort various everyday phenomena (e.g., rusting, baking, digestion) into "beneficial chemical reaction" or "harmful chemical reaction" categories  by using the index.html, style.css, script.js?

Okay, I will create the "Chemical Reaction Sorter" game.

This game will feature:
1.  **Everyday Phenomena:** Cards describing common occurrences involving chemical reactions.
2.  **Sorting Categories:** "Beneficial Chemical Reaction" and "Harmful Chemical Reaction" drop zones.
3.  **Feedback:** Instant feedback on correct/incorrect sorting.

The core interaction will be drag-and-drop.

---

## Chemical Reaction Sorter: Game Files

Here are the `index.html`, `style.css`, and `script.js` files for the "Chemical Reaction Sorter" game.

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chemical Reaction Sorter</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Chemical Reaction Sorter</h1>
        <p>Sort the everyday phenomena into "Beneficial" or "Harmful" chemical reactions.</p>

        <div class="sorting-area">
            <div class="category-zone beneficial-zone drop-zone" data-category="beneficial">
                <h2>Beneficial Reactions</h2>
                <p class="placeholder">Drag beneficial reactions here</p>
            </div>
            <div class="category-zone harmful-zone drop-zone" data-category="harmful">
                <h2>Harmful Reactions</h2>
                <p class="placeholder">Drag harmful reactions here</p>
            </div>
        </div>

        <div class="phenomena-palette">
            <h3>Phenomena to Sort</h3>
            <div id="draggable-phenomena">
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
    font-family: 'Open Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1c2b36, #2a3d4f, #15202b); /* Deep blue-gray */
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    color: #ecf0f1; /* Light text */
}

.game-container {
    background-color: #2c3e50; /* Darker blue-gray */
    border-radius: 25px;
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.5);
    padding: 50px;
    text-align: center;
    max-width: 1000px;
    width: 100%;
}

h1 {
    color: #f1c40f; /* Gold */
    margin-bottom: 20px;
    font-size: 3em;
    font-weight: 800;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
}

p {
    color: #bdc3c7; /* Lighter gray */
    margin-bottom: 30px;
    font-size: 1.1em;
    line-height: 1.6;
}

.sorting-area {
    display: flex;
    justify-content: space-around;
    gap: 30px;
    margin-bottom: 40px;
    flex-wrap: wrap; /* Allow wrapping */
}

.category-zone {
    flex: 1;
    min-width: 350px;
    min-height: 300px; /* Ample space for cards */
    background-color: #3b5063; /* Slightly lighter dark blue-gray */
    border-radius: 18px;
    padding: 25px;
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);
    border: 2px dashed #44bdd4; /* Aqua dashed border */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

.category-zone h2 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.8em;
    font-weight: 700;
}

.beneficial-zone h2 {
    color: #2ecc71; /* Green */
}

.harmful-zone h2 {
    color: #e74c3c; /* Red */
}

.category-zone.drag-over {
    background-color: rgba(68, 189, 212, 0.25);
    border-color: #81ecec; /* Brighter aqua on drag-over */
}

.category-zone .placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-style: italic;
    font-size: 0.9em;
    margin-top: auto; /* Push placeholder to bottom */
}

.phenomena-palette {
    background-color: #3b5063;
    border-radius: 18px;
    padding: 25px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
    margin-top: 30px;
}

.phenomena-palette h3 {
    color: #a2d2ff; /* Light Blue */
    margin-top: 0;
    margin-bottom: 25px;
    font-size: 1.4em;
}

#draggable-phenomena {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.phenomena-card {
    background-color: #3498db; /* Blue */
    color: white;
    padding: 18px 25px;
    border-radius: 12px;
    cursor: grab;
    font-weight: 600;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
    transition: background-color 0.2s ease, transform 0.2s ease;
    text-align: center;
    line-height: 1.4;
    min-width: 180px;
    max-width: 250px;
    user-select: none; /* Prevent text selection during drag */
}

.phenomena-card:hover {
    background-color: #2980b9; /* Darker Blue */
    transform: translateY(-4px);
}

.phenomena-card.dragging {
    opacity: 0.7;
    transform: scale(1.05);
}

/* Feedback styles for dropped cards */
.phenomena-card.correct {
    background-color: #27ae60; /* Darker Green for correct */
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.6);
}

.phenomena-card.incorrect {
    background-color: #c0392b; /* Darker Red for incorrect */
    box-shadow: 0 0 15px rgba(231, 76, 60, 0.6);
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
```

---

## How to Set Up and Play

1.  **Create a Folder:** Make a new folder on your computer (e.g., `ChemicalSorterGame`).
2.  **Save the Files:**
    * Save the `index.html` code as `index.html` inside the folder.
    * Save the `style.css` code as `style.css` inside the folder.
    * Save the `script.js` code as `script.js` inside the folder.
3.  **Open in Browser:** Open the `index.html` file using your web browser (e.g., Chrome, Firefox).

### How to Play:

1.  **Observe the Cards:** You'll see a list of everyday phenomena on the bottom right ("Phenomena to Sort"). Each describes a chemical reaction.
2.  **Identify Type:** For each phenomenon, decide if it's a "Beneficial Chemical Reaction" or a "Harmful Chemical Reaction."
3.  **Drag and Drop:**
    * **Drag** a phenomenon card from the "Phenomena to Sort" area.
    * **Drop** it into the "Beneficial Reactions" zone on the left, or the "Harmful Reactions" zone on the right.
    * You can drag cards between zones or back to the "Phenomena to Sort" area if you change your mind.
4.  **Check Answers:** Once you've sorted all the cards (or think you have), click the **"Check Answers"** button.
5.  **Get Feedback:** Cards correctly placed will turn darker green, and incorrectly placed cards will turn darker red. A feedback message will also appear at the bottom.
6.  **Reset Game:** Click **"Reset Game"** to start over with a fresh, shuffled set of cards.

This game provides a simple yet effective way for students to classify real-world examples of chemical reactions based on their impact.

```
แหล่งที่มา:
1. https://github.com/Ahmed5510-Mac/Card-Hover
2. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
3. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior