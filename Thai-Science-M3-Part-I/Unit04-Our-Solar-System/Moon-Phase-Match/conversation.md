## From """Unit 4: Our Solar System
This unit covers the relationships within the solar system, planetary orbits around the sun due to gravity, creating models to explain seasons, the apparent motion of the sun, phases of the moon, changes in moonrise and moonset times, tides, and explaining the uses of space technology, as well as studying the advancements in space exploration projects.

Chapter 1: Interactions in the Solar System
This chapter discusses objects in our solar system orbiting the sun due to gravity, which is the attractive force between objects with mass. The magnitude of gravitational force is related to the masses of the two objects. Planets orbit the sun in elliptical paths. The Earth rotates on its tilted axis while simultaneously orbiting the sun with its axis remaining tilted. As Earth orbits the sun at different positions, various areas on Earth receive different amounts of sunlight, resulting in Earth's seasons. Furthermore, the moon's orbit around Earth causes everyone to see different illuminated portions of the moon each day, leading to the phenomena of moon phases and tides, which are also a result of the gravitational forces between Earth, the moon, and the sun.""" and please Create a "Moon Phase Match": Students match images of moon phases to their names and explain how they occur  by using the index.html, style.css, script.js?

Okay, I will create the "Moon Phase Match" game.

This game will involve:
1.  **Images of Moon Phases:** Students will see visual representations.
2.  **Names of Moon Phases:** Draggable text labels.
3.  **Explanation of Occurrence:** A static text explanation associated with each correct match, appearing upon checking answers.

The core interaction will be drag-and-drop, matching the image to its correct name.

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moon Phase Match</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Moon Phase Match</h1>
        <p>Drag and drop the moon phase names to their correct images. Then, read the explanation!</p>

        <div class="match-area">
            <div class="moon-phases-column">
                </div>
            <div class="phase-names-column">
                </div>
        </div>

        <button id="check-button">Check Answers</button>
        <div id="feedback" class="feedback-message"></div>
        <button id="reset-button">Reset</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**style.css:**

```css
body {
    font-family: 'Open Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a237e, #424242); /* Deep blue to dark gray */
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    color: #ecf0f1; /* Light text */
}

.game-container {
    background-color: #2c3e50; /* Darker blue-gray */
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    padding: 45px;
    text-align: center;
    max-width: 1200px;
    width: 100%;
}

h1 {
    color: #ffee58; /* Amber Yellow */
    margin-bottom: 15px;
    font-size: 2.8em;
    font-weight: 800;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

p {
    color: #bdc3c7; /* Lighter gray */
    margin-bottom: 35px;
    font-size: 1.1em;
    line-height: 1.6;
}

.match-area {
    display: flex;
    justify-content: space-around;
    gap: 30px;
    margin-bottom: 40px;
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.moon-phases-column {
    flex: 2.5; /* Takes more space for images and explanations */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive grid */
    gap: 25px;
    padding: 20px;
    background-color: #3b5063; /* Slightly lighter dark blue-gray */
    border-radius: 15px;
    border: 1px solid #5a7082;
}

.moon-phase-card {
    background-color: #4a6075; /* Even lighter blue-gray for cards */
    border: 2px solid #6c7a89;
    border-radius: 12px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden; /* For explanations sliding in */
}

.moon-phase-card img {
    width: 120px; /* Standard size for moon images */
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 15px;
    transition: transform 0.3s ease;
}

.moon-phase-card img:hover {
    transform: scale(1.05);
}

.drop-target {
    width: 90%;
    min-height: 50px; /* Space for the dropped label */
    background-color: rgba(68, 189, 212, 0.1); /* Transparent aqua */
    border: 2px dashed #44bdd4; /* Aqua dashed border */
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: italic;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.9em;
    padding: 10px;
    box-sizing: border-box;
    margin-top: auto; /* Push to bottom within flex column */
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

.drop-target.drag-over {
    background-color: rgba(68, 189, 212, 0.3);
    border-color: #1abc9c; /* Turquoise highlight */
}

.phase-name-display {
    display: none; /* Hidden by default, shown after check */
    margin-top: 10px;
    font-weight: bold;
    color: #ffee58;
    font-size: 1.1em;
}

.phase-explanation {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0; /* Starts hidden */
    background-color: rgba(0, 0, 0, 0.7);
    color: #ecf0f1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px; /* No padding when hidden */
    box-sizing: border-box;
    font-size: 0.9em;
    opacity: 0;
    overflow: hidden;
    transition: height 0.4s ease-out, opacity 0.4s ease-out, padding 0.4s ease-out;
}

.phase-explanation.show {
    height: 100%; /* Expands to full height */
    opacity: 1;
    padding: 15px 10px;
}


.phase-names-column {
    flex: 1; /* Takes less space */
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    background-color: #3b5063;
    border-radius: 15px;
    border: 1px solid #5a7082;
}

.draggable-name {
    background-color: #1abc9c; /* Turquoise */
    color: white;
    padding: 14px 20px;
    border-radius: 10px;
    cursor: grab;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s ease, transform 0.2s ease;
    text-align: center;
    flex-shrink: 0; /* Prevent shrinking in flex column */
}

.draggable-name:hover {
    background-color: #16a085; /* Darker Turquoise */
    transform: translateY(-3px);
}

.draggable-name.dragging {
    opacity: 0.7;
    transform: scale(1.05);
}

/* Feedback styles */
.draggable-name.correct {
    background-color: #28a745; /* Green */
    box-shadow: 0 0 12px rgba(40, 167, 69, 0.5);
}

.draggable-name.incorrect {
    background-color: #dc3545; /* Red */
    box-shadow: 0 0 12px rgba(220, 53, 69, 0.5);
}

button {
    background-color: #44bdd4; /* Aqua */
    color: white;
    border: none;
    padding: 15px 32px;
    border-radius: 12px;
    font-size: 1.2em;
    cursor: pointer;
    margin: 0 18px;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 6px 18px rgba(68, 189, 212, 0.3);
}

button:hover {
    background-color: #39a7b9; /* Darker Aqua */
    transform: translateY(-2px);
}

#reset-button {
    background-color: #95a5a6; /* Silver */
    box-shadow: 0 6px 18px rgba(149, 165, 166, 0.3);
}

#reset-button:hover {
    background-color: #7f8c8d; /* Darker Silver */
}

.feedback-message {
    margin-top: 35px;
    font-weight: bold;
    font-size: 1.5em;
    min-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.feedback-message.correct {
    color: #28a745;
}

.feedback-message.incorrect {
    color: #dc3545;
}
```

**script.js:**

```javascript
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
```

---

**Crucial Step: Creating the Image Assets**

You will need 8 `.png` images, one for each moon phase, representing its appearance from Earth. These should be clear, circular images of the moon with the correct illuminated portion.

* `new_moon.png` (Completely dark)
* `waxing_crescent.png`
* `first_quarter.png`
* `waxing_gibbous.png`
* `full_moon.png`
* `waning_gibbous.png`
* `third_quarter.png`
* `waning_crescent.png`

**Tips for Image Creation:**

* **Consistency:** All moon images should be the same size and ideally circular with transparent backgrounds.
* **Accuracy:** Ensure the illuminated portion accurately represents the phase.

**File Structure:**

```
your-game-folder/
├── index.html
├── style.css
├── script.js
├── new_moon.png
├── waxing_crescent.png
├── first_quarter.png
├── waxing_gibbous.png
├── full_moon.png
├── waning_gibbous.png
├── third_quarter.png
└── waning_crescent.png
```

**How to Play:**

1.  Save the code blocks and create the necessary image files in the same folder.
2.  Open `index.html` in your web browser.
3.  Drag the moon phase name cards from the right column.
4.  Drop them onto the "Drop name here" boxes under the corresponding moon phase images.
5.  Click "Check Answers" to see which matches are correct (green) or incorrect (red). The correct name will appear, and an explanation will slide up from the bottom of the card.
6.  Click "Reset" to return all cards to their starting positions and try again.

**Canva Considerations:**

As reiterated in previous responses, creating a *functional* interactive drag-and-drop game with JavaScript logic directly within Canva's interface is **not possible** using its standard features. This is a standalone web application. If you needed to integrate this with Canva, it would involve embedding capabilities or a visual simulation approach within Canva itself (e.g., pre-animated slides showing the drag-and-drop actions and then revealing explanations).

```
แหล่งที่มา:
1. https://github.com/Ahmed5510-Mac/Card-Hover
2. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
3. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior