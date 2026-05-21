## From """Unit 3: Waves and Light
Students will learn about mechanical waves, wave components, the meaning of electromagnetic waves and their spectrum, the benefits and dangers of electromagnetic waves, light, reflection of light, refraction of light, brightness, light phenomena, and the functioning of optical instruments.  Chapter 2: Light
This chapter covers light, which is a type of electromagnetic wave within the frequency range we can see, allowing us to see objects when light from them enters our eyes. Light travels in straight lines in the same medium. When light strikes an object, reflection occurs according to the law of reflection. Light reflection can form images by the convergence of reflected light. When light travels through different media, refraction occurs at the boundary between the two media due to a change in light speed.""" and please Create a  "Light Ray Tracer" (Simplified): A game where students predict how light rays will behave when hitting different surfaces (mirrors, lenses) by drawing or selecting the correct reflected/refracted path by using the index.html, style.css, script.js? 

Okay, I will create a simplified "Light Ray Tracer" game using HTML, CSS, and JavaScript.

Given the constraints of a web browser and "drawing" functionality, a true free-form drawing ray tracer is quite complex. For a simplified game, we'll implement it as a **"select the correct path"** multiple-choice style game, where students choose from pre-drawn options for reflected/refracted rays.

This approach is much more feasible for a quick, educational web game and aligns with what would be achievable in a "Canva-like" simulation (though the logic is in JS).

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simplified Light Ray Tracer</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Simplified Light Ray Tracer</h1>
        <p>Select the path that the light ray will *correctly* take after hitting the surface.</p>

        <div id="ray-tracer-quiz">
            </div>

        <div class="navigation-buttons">
            <button id="previous-button" class="nav-button">Previous</button>
            <button id="next-button" class="nav-button">Next</button>
            <button id="submit-button" class="nav-button">Submit Quiz</button>
        </div>
        <div id="results" class="results-container"></div>
        <button id="restart-button" class="restart-button">Restart Quiz</button>
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
    background: linear-gradient(to right, #ece9e6, #ffffff); /* Soft gradient background */
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    color: #333;
}

.game-container {
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    padding: 40px;
    text-align: center;
    max-width: 900px;
    width: 100%;
}

h1 {
    color: #2c3e50; /* Dark blue-gray */
    margin-bottom: 15px;
    font-size: 2.8em;
    font-weight: 700;
}

p {
    color: #555;
    margin-bottom: 30px;
    font-size: 1.1em;
}

#ray-tracer-quiz {
    margin-bottom: 30px;
}

.question-slide {
    display: none; /* Hidden by default */
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
}

.question-slide.active {
    display: block; /* Active slide is visible */
}

.question-text {
    font-size: 1.3em;
    color: #34495e; /* Darker blue-gray */
    margin-bottom: 25px;
    font-weight: 600;
}

.diagram-container {
    position: relative;
    width: 100%;
    padding-bottom: 60%; /* Aspect ratio (e.g., 50% for 2:1, 75% for 4:3) */
    background-color: #e6f7ff; /* Light blue background for diagram */
    border: 1px solid #aaddff;
    border-radius: 8px;
    margin: 0 auto 30px;
    overflow: hidden; /* Ensure rays stay within bounds */
}

.diagram-container img.surface {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain; /* Adjust as needed */
    z-index: 1;
}

.ray-options {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2; /* On top of the background diagram */
    display: flex;
    justify-content: center; /* Center horizontally if using simple flex */
    align-items: center; /* Center vertically if using simple flex */
}

/* Base style for a ray option */
.ray-option {
    position: absolute; /* Allows precise positioning */
    cursor: pointer;
    border: 3px solid transparent; /* For selection highlight */
    transition: border-color 0.2s ease, transform 0.2s ease;
    opacity: 0.9;
}

.ray-option img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}

.ray-option:hover {
    border-color: #3498db; /* Blue on hover */
    transform: scale(1.02);
}

.ray-option.selected {
    border-color: #2ecc71; /* Green when selected */
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.5);
}

/* Feedback styles after submission */
.ray-option.correct-path {
    border-color: #28a745; /* Correct green */
    box-shadow: 0 0 20px rgba(40, 167, 69, 0.8);
    opacity: 1;
}

.ray-option.incorrect-path {
    border-color: #dc3545; /* Incorrect red */
    opacity: 0.5; /* Dim incorrect paths */
}

.ray-option.correct-path img {
    filter: drop-shadow(0 0 5px #28a745); /* Add a glow */
}
.ray-option.incorrect-path img {
    filter: grayscale(80%); /* Dim incorrect paths */
}


.navigation-buttons {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 20px;
}

.nav-button {
    background-color: #3498db; /* Blue */
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
}

.nav-button:hover {
    background-color: #2980b9; /* Darker Blue */
    transform: translateY(-2px);
}

.nav-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    box-shadow: none;
}

#submit-button {
    background-color: #2ecc71; /* Green */
    box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
}

#submit-button:hover {
    background-color: #27ae60; /* Darker Green */
}

.results-container {
    margin-top: 30px;
    font-size: 1.3em;
    font-weight: bold;
    color: #2c3e50;
    min-height: 40px; /* Prevent layout shift */
}

.results-container.pass {
    color: #28a745;
}

.results-container.fail {
    color: #dc3545;
}

.restart-button {
    background-color: #f39c12; /* Orange */
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    font-size: 1.1em;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 10px rgba(243, 156, 18, 0.3);
    display: none; /* Hidden until quiz is submitted */
}

.restart-button:hover {
    background-color: #e67e22; /* Darker Orange */
    transform: translateY(-2px);
}
```

**script.js:**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Each question contains the main surface image, and multiple ray options.
    // The 'path' property for each option is the image filename for that ray path.
    // The 'isCorrect' boolean marks the correct option.
    const quizData = [
        {
            question: "How will light reflect off a plane mirror?",
            surface: "plane_mirror.png", // Main image for the scenario
            options: [
                { path: "plane_mirror_ray_correct.png", isCorrect: true, top: '25%', left: '0%', width: '100%', height: '70%' },
                { path: "plane_mirror_ray_incorrect1.png", isCorrect: false, top: '25%', left: '0%', width: '100%', height: '70%' },
                { path: "plane_mirror_ray_incorrect2.png", isCorrect: false, top: '25%', left: '0%', width: '100%', height: '70%' }
            ],
            // Optional: For finer control, you can define position for each ray option relative to the diagram-container
            // These values (top, left, width, height) are for demonstration. You will need to adjust them for your images.
            rayOptionStyles: [
                { top: '20%', left: '0%', width: '100%', height: '70%' },
                { top: '20%', left: '0%', width: '100%', height: '70%' },
                { top: '20%', left: '0%', width: '100%', height: '70%' }
            ]
        },
        {
            question: "How will light refract through a convex lens, parallel to the principal axis?",
            surface: "convex_lens.png",
            options: [
                { path: "convex_lens_ray_correct.png", isCorrect: true },
                { path: "convex_lens_ray_incorrect1.png", isCorrect: false },
                { path: "convex_lens_ray_incorrect2.png", isCorrect: false }
            ],
            rayOptionStyles: [
                { top: '10%', left: '0%', width: '100%', height: '80%' },
                { top: '10%', left: '0%', width: '100%', height: '80%' },
                { top: '10%', left: '0%', width: '100%', height: '80%' }
            ]
        },
        {
            question: "How will light reflect off a concave mirror, parallel to the principal axis?",
            surface: "concave_mirror.png",
            options: [
                { path: "concave_mirror_ray_correct.png", isCorrect: true },
                { path: "concave_mirror_ray_incorrect1.png", isCorrect: false },
                { path: "concave_mirror_ray_incorrect2.png", isCorrect: false }
            ],
            rayOptionStyles: [
                { top: '5%', left: '0%', width: '100%', height: '90%' },
                { top: '5%', left: '0%', width: '100%', height: '90%' },
                { top: '5%', left: '0%', width: '100%', height: '90%' }
            ]
        }
    ];

    const quizDiv = document.getElementById('ray-tracer-quiz');
    const previousButton = document.getElementById('previous-button');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    const resultsDiv = document.getElementById('results');
    const restartButton = document.getElementById('restart-button');

    let currentQuestionIndex = 0;
    const userAnswers = new Array(quizData.length).fill(null); // Stores the index of the selected option

    function loadQuestion() {
        const questionData = quizData[currentQuestionIndex];
        const shuffledOptions = shuffleArray([...questionData.options]); // Shuffle options for variety

        quizDiv.innerHTML = `
            <div class="question-slide active">
                <p class="question-text">${questionData.question}</p>
                <div class="diagram-container">
                    <img src="${questionData.surface}" alt="Optical Surface Diagram" class="surface">
                    <div class="ray-options">
                        ${shuffledOptions.map((option, index) => {
                            // Apply specific styles if provided in quizData, otherwise use defaults
                            const style = questionData.rayOptionStyles && questionData.rayOptionStyles[index]
                                ? `top: ${questionData.rayOptionStyles[index].top}; left: ${questionData.rayOptionStyles[index].left}; width: ${questionData.rayOptionStyles[index].width}; height: ${questionData.rayOptionStyles[index].height};`
                                : ''; // Fallback to CSS defaults if no specific style

                            // Check if this option was previously selected by the user
                            const isSelected = userAnswers[currentQuestionIndex] !== null && shuffledOptions[userAnswers[currentQuestionIndex]] === option;
                            return `
                                <div class="ray-option ${isSelected ? 'selected' : ''}" data-option-index="${index}">
                                    <img src="${option.path}" alt="Ray path option ${index + 1}" style="${style}">
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;

        // Add event listeners for selecting ray options
        const rayOptions = quizDiv.querySelectorAll('.ray-option');
        rayOptions.forEach((optionDiv, index) => {
            optionDiv.addEventListener('click', () => {
                // Remove 'selected' from all other options
                rayOptions.forEach(op => op.classList.remove('selected'));
                // Add 'selected' to the clicked option
                optionDiv.classList.add('selected');
                // Store the index of the selected option from the shuffled array
                userAnswers[currentQuestionIndex] = index;
            });
        });

        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        previousButton.disabled = currentQuestionIndex === 0;
        nextButton.disabled = currentQuestionIndex === quizData.length - 1;
        submitButton.style.display = (currentQuestionIndex === quizData.length - 1) ? 'inline-block' : 'none';
    }

    function showResults() {
        let score = 0;
        quizDiv.innerHTML = ''; // Clear quiz questions

        quizData.forEach((question, qIndex) => {
            const userAnswerIndex = userAnswers[qIndex];
            const shuffledOptions = shuffleArray([...question.options]); // Re-shuffle to match initial rendering state if needed

            const resultItem = document.createElement('div');
            resultItem.classList.add('question-slide', 'active');
            resultItem.innerHTML = `
                <p class="question-text">Question ${qIndex + 1}: ${question.question}</p>
                <div class="diagram-container">
                    <img src="${question.surface}" alt="Optical Surface Diagram" class="surface">
                    <div class="ray-options">
                        ${shuffledOptions.map((option, optIndex) => {
                            const style = question.rayOptionStyles && question.rayOptionStyles[optIndex]
                                ? `top: ${question.rayOptionStyles[optIndex].top}; left: ${question.rayOptionStyles[optIndex].left}; width: ${question.rayOptionStyles[optIndex].width}; height: ${question.rayOptionStyles[optIndex].height};`
                                : '';

                            let classes = '';
                            if (option.isCorrect) {
                                classes += ' correct-path';
                            }
                            if (optIndex === userAnswerIndex && !option.isCorrect) {
                                classes += ' incorrect-path'; // Mark user's wrong choice
                            }
                            // If it's not the correct path AND not the user's wrong choice, dim it slightly
                            if (!option.isCorrect && optIndex !== userAnswerIndex) {
                                classes += ' incorrect-path'; // Apply dimming to unchosen wrong answers
                            }

                            return `
                                <div class="ray-option${classes}" data-option-index="${optIndex}">
                                    <img src="${option.path}" alt="Ray path option ${optIndex + 1}" style="${style}">
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            quizDiv.appendChild(resultItem);

            // Check if user's answer (from shuffled options) is correct
            if (userAnswerIndex !== null && shuffledOptions[userAnswerIndex].isCorrect) {
                score++;
            }
        });

        const percentage = (score / quizData.length) * 100;
        resultsDiv.textContent = `You scored ${score} out of ${quizData.length} (${percentage.toFixed(0)}%)!`;
        resultsDiv.classList.remove('pass', 'fail');
        if (percentage >= 70) { // Example pass threshold
            resultsDiv.classList.add('pass');
        } else {
            resultsDiv.classList.add('fail');
        }

        previousButton.style.display = 'none';
        nextButton.style.display = 'none';
        submitButton.style.display = 'none';
        restartButton.style.display = 'block';
    }

    // Utility function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Event Listeners
    previousButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });

    submitButton.addEventListener('click', showResults);

    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        userAnswers.fill(null); // Reset answers
        resultsDiv.textContent = ''; // Clear results
        resultsDiv.classList.remove('pass', 'fail');
        restartButton.style.display = 'none';
        previousButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';
        loadQuestion(); // Load first question again
    });

    // Initial load
    loadQuestion();
});
```

---

**Crucial Step: Creating the Image Assets**

This game relies heavily on images. You will need to create the following `.png` images and place them in the same folder as your HTML, CSS, and JS files:

* **`plane_mirror.png`**: An image of a flat mirror with an incoming light ray.
* **`plane_mirror_ray_correct.png`**: Just the reflected ray that follows the law of reflection (angle of incidence = angle of reflection), designed to perfectly overlay `plane_mirror.png`.
* **`plane_mirror_ray_incorrect1.png`**: An incorrect reflected ray for the plane mirror scenario.
* **`plane_mirror_ray_incorrect2.png`**: Another incorrect reflected ray for the plane mirror scenario.

* **`convex_lens.png`**: An image of a convex lens with an incoming parallel light ray.
* **`convex_lens_ray_correct.png`**: Just the refracted ray correctly passing through the focal point, designed to overlay `convex_lens.png`.
* **`convex_lens_ray_incorrect1.png`**: An incorrect refracted ray for the convex lens.
* **`convex_lens_ray_incorrect2.png`**: Another incorrect refracted ray for the convex lens.

* **`concave_mirror.png`**: An image of a concave mirror with an incoming parallel light ray.
* **`concave_mirror_ray_correct.png`**: Just the reflected ray correctly passing through the focal point, designed to overlay `concave_mirror.png`.
* **`concave_mirror_ray_incorrect1.png`**: An incorrect reflected ray for the concave mirror.
* **`concave_mirror_ray_incorrect2.png`**: Another incorrect reflected ray for the concave mirror.

**Tips for Image Creation:**

* **Consistency:** All ray path images for a given question should have the same dimensions and transparent backgrounds so they can be layered correctly over the main surface image.
* **Precision:** The ray paths in the `.png` files need to be drawn accurately according to the laws of reflection/refraction for the correct answers.
* **Overlaying:** Design your ray images so they represent *only* the reflected/refracted part of the light path, starting from where the incoming ray hits the surface. The incoming ray should be part of the `_surface.png` image.
* **Adjust `rayOptionStyles` in `script.js`:** The `top`, `left`, `width`, and `height` properties in the `quizData` array for `rayOptionStyles` are **crucial**. You will need to **experiment and adjust these values** for each question and its ray options to ensure they perfectly align and cover the relevant area on your specific diagram images. If these aren't right, the ray paths will look misaligned.

**File Structure:**

```
your-game-folder/
├── index.html
├── style.css
├── script.js
├── plane_mirror.png
├── plane_mirror_ray_correct.png
├── plane_mirror_ray_incorrect1.png
├── plane_mirror_ray_incorrect2.png
├── convex_lens.png
├── convex_lens_ray_correct.png
├── convex_lens_ray_incorrect1.png
├── convex_lens_ray_incorrect2.png
├── concave_mirror.png
├── concave_mirror_ray_correct.png
├── concave_mirror_ray_incorrect1.png
└── concave_mirror_ray_incorrect2.png
```

**How to Play:**

1.  Save the code blocks and create the necessary image files in the same folder.
2.  Open `index.html` in your web browser.
3.  Read the question and observe the optical setup.
4.  Click on the ray path option you believe is correct. It will be highlighted.
5.  Use "Next" and "Previous" to navigate questions.
6.  Click "Submit Quiz" on the last question to see your results and review answers.
7.  Click "Restart Quiz" to play again.

**Canva Considerations (Reiteration):**

As mentioned before, a functional interactive game like this, with JavaScript logic for selection, checking, and scoring, cannot be built directly within Canva's core features. Canva is a graphic design tool. This code provides a standalone web application. If you needed to integrate this with Canva, it would typically require embedding capabilities or a complete re-thinking of the "game" as a purely visual, pre-animated sequence within a Canva presentation.

```
แหล่งที่มา:
1. https://github.com/Ahmed5510-Mac/Card-Hover
2. https://github.com/jaranda-polo/randomcard
3. https://github.com/JosephJtech/quiz-application
4. https://github.com/vipullsingh/quiz-platform-frontend
5. https://github.com/OElksnitis/WebLietojumi
6. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
7. https://github.com/AdiletZumabai/work
8. https://github.com/Shafi-shafs/expo-project