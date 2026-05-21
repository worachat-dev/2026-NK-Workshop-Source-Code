## From """Unit 3: Waves and Light
Students will learn about mechanical waves, wave components, the meaning of electromagnetic waves and their spectrum, the benefits and dangers of electromagnetic waves, light, reflection of light, refraction of light, brightness, light phenomena, and the functioning of optical instruments.  Chapter 2: Light
This chapter covers light, which is a type of electromagnetic wave within the frequency range we can see, allowing us to see objects when light from them enters our eyes. Light travels in straight lines in the same medium. When light strikes an object, reflection occurs according to the law of reflection. Light reflection can form images by the convergence of reflected light. When light travels through different media, refraction occurs at the boundary between the two media due to a change in light speed.""" and please Create a  "Image Formation Match": Students match descriptions of images formed by mirrors/lenses (e.g., "real, inverted, magnified") to the correct optical setup by using the index.html, style.css, script.js?

Okay, I will create the "Image Formation Match" game using HTML, CSS, and JavaScript.

This game will present diagrams of various optical setups (mirrors/lenses with objects) and text cards describing the images they form. Students will drag the description cards to the correct diagram.

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Formation Match</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Image Formation Match</h1>
        <p>Drag and drop the image descriptions to the correct optical setup.</p>

        <div class="match-area">
            <div class="diagram-column">
                </div>
            <div class="labels-column">
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
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #e0f7fa, #b2ebf2); /* Light aqua gradient */
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    color: #333;
}

.game-container {
    background-color: #ffffff;
    border-radius: 18px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
    padding: 45px;
    text-align: center;
    max-width: 1100px;
    width: 100%;
}

h1 {
    color: #006064; /* Dark Cyan */
    margin-bottom: 15px;
    font-size: 2.6em;
    font-weight: 700;
}

p {
    color: #555;
    margin-bottom: 35px;
    font-size: 1.1em;
}

.match-area {
    display: flex;
    justify-content: space-around;
    gap: 30px;
    margin-bottom: 40px;
}

.diagram-column {
    flex: 2; /* Takes more space */
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two columns for diagrams */
    gap: 25px;
    padding: 15px;
    background-color: #e0f2f7;
    border-radius: 12px;
    border: 1px solid #cceeff;
}

.optical-setup {
    background-color: #ffffff;
    border: 2px solid #80deea; /* Light teal border */
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative; /* For drop target positioning */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.2s ease;
}

.optical-setup img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
}

.setup-title {
    font-weight: bold;
    color: #00796b; /* Darker Teal */
    margin-bottom: 10px;
    font-size: 0.95em;
}

.drop-target {
    width: 90%;
    min-height: 60px; /* Space for the dropped label */
    background-color: rgba(0, 150, 136, 0.08); /* Transparent green */
    border: 2px dashed #009688; /* Teal dashed border */
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: italic;
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.9em;
    padding: 10px;
    box-sizing: border-box;
    margin-top: auto; /* Push to bottom */
}

.drop-target.drag-over {
    background-color: rgba(0, 150, 136, 0.2);
    border-color: #004d40;
}

.labels-column {
    flex: 1; /* Takes less space */
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    background-color: #e0f7fa;
    border-radius: 12px;
    border: 1px solid #b2ebf2;
}

.draggable-label {
    background-color: #00bcd4; /* Cyan */
    color: white;
    padding: 12px 18px;
    border-radius: 8px;
    cursor: grab;
    font-weight: 600;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    transition: background-color 0.2s ease, transform 0.2s ease;
    text-align: center;
}

.draggable-label:hover {
    background-color: #0097a7; /* Darker Cyan */
    transform: translateY(-3px);
}

.draggable-label.dragging {
    opacity: 0.7;
    transform: scale(1.05);
}

/* Feedback styles */
.draggable-label.correct {
    background-color: #4CAF50; /* Green */
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.draggable-label.incorrect {
    background-color: #f44336; /* Red */
    box-shadow: 0 0 10px rgba(244, 67, 54, 0.5);
}

button {
    background-color: #009688; /* Teal */
    color: white;
    border: none;
    padding: 14px 30px;
    border-radius: 10px;
    font-size: 1.15em;
    cursor: pointer;
    margin: 0 15px;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 150, 136, 0.3);
}

button:hover {
    background-color: #00796b; /* Darker Teal */
    transform: translateY(-2px);
}

#reset-button {
    background-color: #607d8b; /* Blue Gray */
}

#reset-button:hover {
    background-color: #455a64; /* Darker Blue Gray */
}

.feedback-message {
    margin-top: 30px;
    font-weight: bold;
    font-size: 1.4em;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.feedback-message.correct {
    color: #4CAF50;
}

.feedback-message.incorrect {
    color: #f44336;
}
```

**script.js:**

```javascript
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
```

---

**Crucial Step: Creating the Image Assets**

You will need the following `.png` images representing the optical setups. These should be clear diagrams showing the mirror/lens and the object's position, *without* the image formed by the rays.

* **`plane_mirror_setup.png`**: Diagram of a plane mirror with an object in front.
* **`convex_lens_setup_real.png`**: Diagram of a convex lens with an object placed beyond 2F (twice the focal length), designed to form a real, inverted, diminished image.
* **`concave_mirror_setup_virtual.png`**: Diagram of a concave mirror with an object placed between the focal point (F) and the pole, designed to form a virtual, upright, magnified image.
* **`concave_lens_setup.png`**: Diagram of a concave lens with an object in front (always forms virtual, upright, diminished image).

**File Structure:**

```
your-game-folder/
├── index.html
├── style.css
├── script.js
├── plane_mirror_setup.png
├── convex_lens_setup_real.png
├── concave_mirror_setup_virtual.png
└── concave_lens_setup.png
```

**How to Play:**

1.  Save the code blocks and create the necessary image files in the same folder.
2.  Open `index.html` in your web browser.
3.  Drag the image description cards from the right column.
4.  Drop them onto the corresponding "Drop description here" boxes under the optical setup diagrams in the left column.
5.  Click "Check Answers" to see which matches are correct (green) or incorrect (red).
6.  Click "Reset" to return all cards to their starting positions and try again.

**Canva Considerations (as a platform):**

As with the previous examples, creating a *functional* drag-and-drop game with JavaScript logic directly within Canva's interface is **not possible** using its standard features. Canva is a design tool for static and animated graphics.

This HTML, CSS, and JavaScript code provides a complete, interactive web-based game. If you needed to use this in a Canva context, you would typically need to:

* **Embed it:** If Canva offers a way to embed external web content (e.g., via an iframe), you could host this game online and embed it. This depends entirely on Canva's current embedding capabilities.
* **Simulate with animations/multiple slides:** For a presentation, you could create a series of slides in Canva. One slide shows the diagrams and descriptions. Subsequent slides would animate the descriptions moving to the correct places, followed by a "correct/incorrect" visual reveal. This is a visual simulation, not an interactive game with true user input and logic.

```
แหล่งที่มา:
1. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
2. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior