## From """Unit 5: Chemical Reactions and Everyday Materials 
 Students will learn about the occurrence of chemical reactions, the total mass of substances before and after a chemical reaction, heat changes in chemical reactions, chemical reactions found in daily life, the benefits and harms of chemical reactions to living organisms and surrounding things, methods to prevent and solve problems caused by chemical reactions, and chemical materials used in daily life, which can be utilized differently. Chapter 2: Everyday Materials 
 This chapter covers familiar materials used in daily life, including polymers, ceramics, and metals. It explores their properties, components, and the processes involved in producing these materials for various uses in everyday life. """ and please Create a  "Everyday Object Material Identification": Students are shown images of common objects and must identify the primary material they are made from (e.g., "plastic bottle," "ceramic mug," "metal spoon") by using the index.html, style.css, script.js?

Okay, I will create the "Everyday Object Material Identification" game.

This game will feature:
1.  **Object Images:** Displays images of common objects.
2.  **Material Options:** Provides selectable options for the primary material (Polymer/Plastic, Ceramic, Metal).
3.  **Identification:** Students select the correct material.
4.  **Feedback:** Instant feedback on correct/incorrect identification.
5.  **Progression:** Allows moving to the next object.

The core interaction will be clicking/selecting.

---

## Everyday Object Material Identification: Game Files

Here are the `index.html`, `style.css`, and `script.js` files for the "Everyday Object Material Identification" game.

To make this fully functional, you'll need to create an `images` subfolder in the same directory as your HTML file, and place the specified image files within it. For example, `images/plastic_bottle.jpg`, `images/ceramic_mug.jpg`, etc. You can find suitable free-to-use images from sites like Unsplash, Pexels, or Pixabay.

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Everyday Object Material Identification</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Everyday Object Material Identification</h1>
        <p>Look at the object and identify the primary material it's made from.</p>

        <div class="object-display">
            <img id="object-image" src="" alt="Object to identify">
            <p class="image-label" id="object-label"></p>
        </div>

        <div class="material-options" id="material-options">
            </div>

        <div class="controls">
            <button id="check-button">Check Answer</button>
            <button id="next-button" disabled>Next Object</button>
            <button id="reset-button">Restart Game</button>
        </div>

        <div id="feedback" class="feedback-message"></div>
        <div class="score-display">Score: <span id="current-score">0</span> / <span id="total-objects">0</span></div>
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
    max-width: 800px;
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

.object-display {
    background-color: #3b5063; /* Slightly lighter dark blue-gray */
    border-radius: 18px;
    padding: 25px;
    margin-bottom: 35px;
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 350px; /* Ensure space for image */
}

#object-image {
    max-width: 90%;
    max-height: 300px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    margin-bottom: 15px;
    object-fit: contain; /* Ensure image fits well */
}

.image-label {
    font-size: 1.3em;
    font-weight: 600;
    color: #81ecec; /* Light Aqua */
    margin: 0;
}

.material-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-bottom: 40px;
}

.material-button {
    background-color: #3498db; /* Blue */
    color: white;
    border: 2px solid transparent;
    padding: 15px 25px;
    border-radius: 10px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    user-select: none;
}

.material-button:hover:not(:disabled) {
    background-color: #2980b9; /* Darker Blue */
    transform: translateY(-2px);
}

.material-button.selected {
    background-color: #f1c40f; /* Gold when selected */
    border-color: #e67e22; /* Darker orange border */
    color: #2c3e50;
    font-weight: bold;
}

.material-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.material-button.correct {
    background-color: #2ecc71; /* Green for correct */
    border-color: #27ae60;
    color: white;
}

.material-button.incorrect {
    background-color: #e74c3c; /* Red for incorrect */
    border-color: #c0392b;
    color: white;
}


.controls {
    margin-top: 30px;
}

button {
    background-color: #1abc9c; /* Turquoise */
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 1.1em;
    cursor: pointer;
    margin: 0 15px;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 6px 15px rgba(26, 188, 156, 0.3);
}

button:hover:not(:disabled) {
    background-color: #16a085; /* Darker Turquoise */
    transform: translateY(-3px);
}

button:disabled {
    background-color: #7f8c8d; /* Silver for disabled */
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
}

#check-button {
    background-color: #f39c12; /* Orange */
    box-shadow: 0 6px 15px rgba(243, 156, 18, 0.3);
}
#check-button:hover:not(:disabled) {
    background-color: #e67e22; /* Darker Orange */
}

#next-button {
    background-color: #3498db; /* Blue */
    box-shadow: 0 6px 15px rgba(52, 152, 219, 0.3);
}
#next-button:hover:not(:disabled) {
    background-color: #2980b9; /* Darker Blue */
}

#reset-button {
    background-color: #95a5a6; /* Silver */
    box-shadow: 0 6px 15px rgba(149, 165, 166, 0.3);
}
#reset-button:hover:not(:disabled) {
    background-color: #7f8c8d; /* Darker Silver */
}

.feedback-message {
    margin-top: 30px;
    font-weight: bold;
    font-size: 1.4em;
    min-height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.feedback-message.correct {
    color: #2ecc71; /* Green */
}
.feedback-message.incorrect {
    color: #e74c3c; /* Red */
}

.score-display {
    margin-top: 25px;
    font-size: 1.3em;
    color: #bdc3c7;
    font-weight: 600;
}

.score-display span {
    color: #f1c40f; /* Gold for score numbers */
}
```

---

### `script.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const objects = [
        { name: "Plastic Water Bottle", image: "plastic_bottle.jpg", material: "Polymer/Plastic" },
        { name: "Ceramic Coffee Mug", image: "ceramic_mug.jpg", material: "Ceramic" },
        { name: "Stainless Steel Spoon", image: "metal_spoon.jpg", material: "Metal" },
        { name: "Wooden Chair", image: "wooden_chair.jpg", material: "Wood" },
        { name: "Glass Window Pane", image: "glass_window.jpg", material: "Glass" },
        { name: "Aluminum Soda Can", image: "aluminum_can.jpg", material: "Metal" },
        { name: "Clay Flower Pot", image: "clay_pot.jpg", material: "Ceramic" },
        { name: "Nylon Rope", image: "nylon_rope.jpg", material: "Polymer/Plastic" },
        { name: "Copper Wire", image: "copper_wire.jpg", material: "Metal" },
        { name: "Porcelain Toilet Bowl", image: "porcelain_toilet.jpg", material: "Ceramic" }
    ];

    const materialOptions = ["Polymer/Plastic", "Ceramic", "Metal", "Wood", "Glass"]; // The selectable material types

    const objectImage = document.getElementById('object-image');
    const objectLabel = document.getElementById('object-label');
    const materialOptionsContainer = document.getElementById('material-options');
    const checkButton = document.getElementById('check-button');
    const nextButton = document.getElementById('next-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');
    const currentScoreSpan = document.getElementById('current-score');
    const totalObjectsSpan = document.getElementById('total-objects');

    let currentObjectIndex = 0;
    let shuffledObjects = [];
    let selectedAnswer = null;
    let score = 0;

    function initializeGame() {
        shuffledObjects = shuffleArray([...objects]);
        currentObjectIndex = 0;
        score = 0;
        totalObjectsSpan.textContent = shuffledObjects.length;
        updateScoreDisplay();
        loadObject();
        nextButton.disabled = true;
        resetButton.disabled = false;
        checkButton.disabled = false;
    }

    function loadObject() {
        if (currentObjectIndex >= shuffledObjects.length) {
            endGame();
            return;
        }

        const currentObject = shuffledObjects[currentObjectIndex];
        objectImage.src = `images/${currentObject.image}`;
        objectImage.alt = currentObject.name;
        objectLabel.textContent = currentObject.name;
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');
        selectedAnswer = null;

        // Clear existing buttons and create new ones
        materialOptionsContainer.innerHTML = '';
        materialOptions.forEach(material => {
            const button = document.createElement('button');
            button.classList.add('material-button');
            button.textContent = material;
            button.dataset.material = material;
            button.addEventListener('click', () => selectAnswer(button));
            materialOptionsContainer.appendChild(button);
        });

        checkButton.disabled = false; // Enable check button for new question
        nextButton.disabled = true; // Disable next until checked
    }

    function selectAnswer(button) {
        // Deselect any previously selected button
        document.querySelectorAll('.material-button').forEach(btn => {
            btn.classList.remove('selected');
            btn.classList.remove('correct', 'incorrect'); // Clear feedback
        });

        button.classList.add('selected');
        selectedAnswer = button.dataset.material;
    }

    function checkAnswer() {
        if (!selectedAnswer) {
            feedbackDiv.textContent = "Please select a material!";
            feedbackDiv.classList.add('incorrect');
            return;
        }

        const currentObject = shuffledObjects[currentObjectIndex];
        const correctMaterial = currentObject.material;
        const selectedButton = document.querySelector(`.material-button[data-material="${selectedAnswer}"]`);

        // Disable all material buttons after checking
        document.querySelectorAll('.material-button').forEach(btn => btn.disabled = true);
        checkButton.disabled = true; // Disable check button

        if (selectedAnswer === correctMaterial) {
            feedbackDiv.textContent = "Correct! Well done!";
            feedbackDiv.classList.add('correct');
            feedbackDiv.classList.remove('incorrect');
            selectedButton.classList.add('correct');
            score++;
            updateScoreDisplay();
        } else {
            feedbackDiv.textContent = `Incorrect. The correct material is: ${correctMaterial}`;
            feedbackDiv.classList.add('incorrect');
            feedbackDiv.classList.remove('correct');
            selectedButton.classList.add('incorrect');
            // Highlight the correct answer
            document.querySelector(`.material-button[data-material="${correctMaterial}"]`).classList.add('correct');
        }
        nextButton.disabled = false; // Enable next button after feedback
    }

    function updateScoreDisplay() {
        currentScoreSpan.textContent = score;
    }

    function endGame() {
        objectImage.src = ''; // Clear image
        objectLabel.textContent = ''; // Clear label
        materialOptionsContainer.innerHTML = ''; // Clear buttons
        feedbackDiv.textContent = `Game Over! Your final score is ${score} out of ${shuffledObjects.length}.`;
        feedbackDiv.classList.add('correct');
        checkButton.disabled = true;
        nextButton.disabled = true;
        resetButton.disabled = false;
    }

    checkButton.addEventListener('click', checkAnswer);

    nextButton.addEventListener('click', () => {
        currentObjectIndex++;
        loadObject();
    });

    resetButton.addEventListener('click', initializeGame);

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

1.  **Create a Folder:** Make a new folder on your computer (e.g., `ObjectMaterialGame`).
2.  **Create `images` Subfolder:** Inside your `ObjectMaterialGame` folder, create another folder named `images`.
3.  **Download Images:** Find suitable images for the objects listed in `script.js` and save them into the `images` folder with the *exact same filenames* as specified in the `objects` array (e.g., `plastic_bottle.jpg`, `ceramic_mug.jpg`).
    * **Suggested image search terms (for free stock photos):**
        * `plastic bottle`
        * `ceramic mug`
        * `stainless steel spoon`
        * `wooden chair`
        * `glass window`
        * `aluminum soda can`
        * `clay flower pot`
        * `nylon rope`
        * `copper wire`
        * `porcelain toilet bowl`
    * **Example Image Sources (check licenses for use):** Unsplash.com, Pexels.com, Pixabay.com
4.  **Save the Files:**
    * Save the `index.html` code as `index.html` inside the `ObjectMaterialGame` folder.
    * Save the `style.css` code as `style.css` inside the `ObjectMaterialGame` folder.
    * Save the `script.js` code as `script.js` inside the `ObjectMaterialGame` folder.
5.  **Open in Browser:** Open the `index.html` file using your web browser (e.g., Chrome, Firefox).

### How to Play:

1.  **View the Object:** An image of a common object will appear, along with its name.
2.  **Choose the Material:** Below the image, you'll see several buttons, each representing a primary material type (Polymer/Plastic, Ceramic, Metal, Wood, Glass). Click the button that you think best describes the object's primary material.
3.  **Check Answer:** After selecting a material, click the **"Check Answer"** button.
4.  **Get Feedback:**
    * If you're correct, the selected button will turn green, and a "Correct!" message will appear. Your score will increase.
    * If you're incorrect, the selected button will turn red, and the correct material's button will turn green, along with an "Incorrect." message.
5.  **Next Object:** Click **"Next Object"** to move to the next item in the challenge.
6.  **Restart Game:** At any time, you can click **"Restart Game"** to begin from the first object with a shuffled order and reset your score.
7.  **Game End:** The game concludes after you've gone through all the objects, displaying your final score.

This game offers a visual and interactive way for students to practice identifying materials based on everyday objects.

```
แหล่งที่มา:
1. https://github.com/Ahmed5510-Mac/Card-Hover
2. https://github.com/ennavoi/task2
3. https://github.com/Hakesh/p2-gaming-quiz
4. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
5. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior