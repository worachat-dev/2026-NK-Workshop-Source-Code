## From """Unit 4: Our Solar System
This unit covers the relationships within the solar system, planetary orbits around the sun due to gravity, creating models to explain seasons, the apparent motion of the sun, phases of the moon, changes in moonrise and moonset times, tides, and explaining the uses of space technology, as well as studying the advancements in space exploration projects.

Chapter 1: Interactions in the Solar System
This chapter discusses objects in our solar system orbiting the sun due to gravity, which is the attractive force between objects with mass. The magnitude of gravitational force is related to the masses of the two objects. Planets orbit the sun in elliptical paths. The Earth rotates on its tilted axis while simultaneously orbiting the sun with its axis remaining tilted. As Earth orbits the sun at different positions, various areas on Earth receive different amounts of sunlight, resulting in Earth's seasons. Furthermore, the moon's orbit around Earth causes everyone to see different illuminated portions of the moon each day, leading to the phenomena of moon phases and tides, which are also a result of the gravitational forces between Earth, the moon, and the sun.""" and please Create a "Space Technology Explorer": A matching game connecting space technologies (e.g., satellites, telescopes) to their uses (e.g., communication, weather forecasting)  by using the index.html, style.css, script.js?

Okay, I will create the "Space Technology Explorer" matching game.

This game will have:
1.  **Images of Space Technologies:** Visuals of items like satellites, telescopes, rovers, etc.
2.  **Names of Space Technologies:** Text labels for identification.
3.  **Uses/Applications:** Draggable text cards describing what each technology is used for.

The core interaction will be drag-and-drop, matching the *use* to the correct *technology image/name*.

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Technology Explorer</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Space Technology Explorer</h1>
        <p>Drag and drop the "Uses" cards to their correct Space Technology.</p>

        <div class="match-area">
            <div class="technology-column">
                </div>
            <div class="uses-column">
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
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #2c3e50, #34495e, #1a202c); /* Dark space-like gradient */
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    color: #ecf0f1; /* Light gray text */
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
    font-size: 3.2em;
    font-weight: 900;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
}

p {
    color: #bdc3c7; /* Lighter gray */
    margin-bottom: 40px;
    font-size: 1.1em;
    line-height: 1.6;
}

.match-area {
    display: flex;
    justify-content: space-around;
    gap: 35px;
    margin-bottom: 40px;
    flex-wrap: wrap; /* Allow wrapping for responsiveness */
}

.technology-column {
    flex: 2.5; /* Takes more space for technology cards */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); /* Responsive grid */
    gap: 30px;
    padding: 25px;
    background-color: #4a6075;
    border-radius: 18px;
    border: 1px solid #5a7082;
}

.tech-card {
    background-color: #5d7488; /* Even lighter blue-gray for cards */
    border: 2px solid #7f90a0;
    border-radius: 15px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
    position: relative;
    transition: transform 0.2s ease-out;
}

.tech-card:hover {
    transform: translateY(-5px);
}

.tech-card img {
    width: 150px;
    height: 150px;
    object-fit: contain; /* Keep aspect ratio */
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.05); /* Subtle background for image area */
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.tech-name {
    font-size: 1.2em;
    font-weight: bold;
    color: #f1c40f; /* Gold for names */
    margin-bottom: 15px;
}

.drop-target {
    width: 95%;
    min-height: 80px; /* Space for the dropped use card */
    background-color: rgba(129, 236, 236, 0.1); /* Transparent light aqua */
    border: 2px dashed #81ecec; /* Light aqua dashed border */
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: italic;
    color: rgba(255, 255, 255, 0.4);
    font-size: 1em;
    padding: 15px;
    box-sizing: border-box;
    margin-top: auto; /* Pushes to bottom within flex column */
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

.drop-target.drag-over {
    background-color: rgba(129, 236, 236, 0.3);
    border-color: #2ecc71; /* Green highlight */
}

.uses-column {
    flex: 1; /* Takes less space */
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 25px;
    background-color: #4a6075;
    border-radius: 18px;
    border: 1px solid #5a7082;
}

.draggable-use {
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
    flex-shrink: 0; /* Prevent shrinking in flex column */
}

.draggable-use:hover {
    background-color: #2980b9; /* Darker Blue */
    transform: translateY(-4px);
}

.draggable-use.dragging {
    opacity: 0.7;
    transform: scale(1.05);
}

/* Feedback styles */
.draggable-use.correct {
    background-color: #2ecc71; /* Green */
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.6);
}

.draggable-use.incorrect {
    background-color: #e74c3c; /* Red */
    box-shadow: 0 0 15px rgba(231, 76, 60, 0.6);
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

**script.js:**

```javascript
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
```

---

**Crucial Step: Creating the Image Assets**

You will need the following `.png` images and place them in the same folder as your HTML, CSS, and JS files. Ensure they have transparent backgrounds for the best visual integration.

* `communication_satellite.png` (Image of a communication satellite)
* `hubble_telescope.png` (Image of the Hubble Space Telescope or a generic space telescope)
* `weather_satellite.png` (Image of a weather satellite)
* `mars_rover.png` (Image of a Mars rover like Curiosity or Perseverance)
* `gps_satellite.png` (Image of a GPS satellite)
* `iss.png` (Image of the International Space Station)

**Tips for Image Creation:**

* **Clarity:** Images should clearly represent the technology.
* **Transparent Backgrounds:** Crucial for a clean look.
* **Consistent Aspect Ratio/Padding:** Try to make them visually cohesive. The CSS sets them to 150x150px and `object-fit: contain`, so they'll scale down if larger but keep their aspect ratio.

**File Structure:**

```
your-game-folder/
├── index.html
├── style.css
├── script.js
├── communication_satellite.png
├── hubble_telescope.png
├── weather_satellite.png
├── mars_rover.png
├── gps_satellite.png
└── iss.png
```

**How to Play:**

1.  Save the code blocks and create the necessary image files in the same folder.
2.  Open `index.html` in your web browser.
3.  Drag the "Uses" cards from the right column.
4.  Drop them onto the "Drop use here" boxes under the corresponding Space Technology images.
5.  Click "Check Answers" to see which matches are correct (green) or incorrect (red).
6.  Click "Reset" to return all cards to their starting positions and try again.

**Canva Considerations:**

As previously stated, creating a fully interactive drag-and-drop game with JavaScript logic directly within Canva's standard features is **not possible**. Canva is a design tool for static and animated graphics. This HTML, CSS, and JavaScript code provides a complete, standalone web-based game. If you needed to use this in a Canva context, you would typically need to:

* **Embed it:** Host this game online and embed it within a Canva design if Canva offers a robust way to embed external web content (e.g., via an iframe). This depends entirely on Canva's current embedding capabilities.
* **Simulate with animations/multiple slides:** For a presentation, you could create a series of slides in Canva. One slide shows the technologies and uses. Subsequent slides would animate the "uses" moving to the correct places, followed by a "correct/incorrect" visual reveal. This is a visual simulation, not an interactive game with true user input and logic.

```
แหล่งที่มา:
1. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
2. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior