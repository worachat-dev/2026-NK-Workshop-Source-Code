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

// แหล่งที่มา:
// 1. https://github.com/Ahmed5510-Mac/Card-Hover
// 2. https://github.com/ennavoi/task2
// 3. https://github.com/Hakesh/p2-gaming-quiz
// 4. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
// 5. https://github.com/AxelCotonGutierrez/Juego-dia-anterior-dia-posterior