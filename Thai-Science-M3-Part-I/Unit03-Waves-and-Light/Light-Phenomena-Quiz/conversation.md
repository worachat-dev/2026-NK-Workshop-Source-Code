## From """Unit 3: Waves and Light
Students will learn about mechanical waves, wave components, the meaning of electromagnetic waves and their spectrum, the benefits and dangers of electromagnetic waves, light, reflection of light, refraction of light, brightness, light phenomena, and the functioning of optical instruments.  Chapter 2: Light
This chapter covers light, which is a type of electromagnetic wave within the frequency range we can see, allowing us to see objects when light from them enters our eyes. Light travels in straight lines in the same medium. When light strikes an object, reflection occurs according to the law of reflection. Light reflection can form images by the convergence of reflected light. When light travels through different media, refraction occurs at the boundary between the two media due to a change in light speed.""" and please Create a  "Light Phenomena Quiz": Multiple-choice questions about reflection, refraction, and brightness in everyday scenarios by using the index.html, style.css, script.js?

Okay, I will create the "Light Phenomena Quiz" using HTML, CSS, and JavaScript.

This will be a multiple-choice quiz featuring questions related to reflection, refraction, and brightness, often incorporating everyday scenarios as described in the unit.

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Light Phenomena Quiz</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="quiz-container">
        <h1>Light Phenomena Quiz</h1>
        <div id="quiz">
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
    font-family: 'Montserrat', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #fce4ec, #e0f2f7); /* Soft pink to light blue gradient */
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    color: #333;
}

.quiz-container {
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    padding: 45px;
    text-align: center;
    max-width: 850px;
    width: 100%;
}

h1 {
    color: #4a148c; /* Deep Purple */
    margin-bottom: 25px;
    font-size: 2.8em;
    font-weight: 800;
}

.question-slide {
    display: none; /* Hidden by default */
    text-align: left;
    margin-bottom: 30px;
}

.question-slide.active {
    display: block; /* Active slide is visible */
}

.question-number {
    font-size: 1.15em;
    color: #7b1fa2; /* Medium Purple */
    margin-bottom: 10px;
    font-weight: 600;
}

.question-text {
    font-size: 1.5em;
    color: #2c3e50; /* Dark Slate Gray */
    margin-bottom: 30px;
    font-weight: 700;
    line-height: 1.4;
}

.options-container {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.option-label {
    display: flex;
    align-items: center;
    background-color: #f3e5f5; /* Lightest purple */
    border: 2px solid #ce93d8; /* Light purple border */
    border-radius: 12px;
    padding: 18px 25px;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    font-size: 1.1em;
    color: #333;
}

.option-label:hover {
    background-color: #e1bee7; /* Lighter purple */
    border-color: #ab47bc; /* Stronger purple */
    box-shadow: 0 6px 15px rgba(156, 39, 176, 0.15);
}

.option-label input[type="radio"] {
    margin-right: 18px;
    transform: scale(1.6); /* Larger radio buttons */
    accent-color: #9c27b0; /* Purple accent for checked radio */
}

/* Styles for correct/incorrect answers after submission */
.option-label.correct-answer {
    background-color: #e8f5e9; /* Light green */
    border-color: #4CAF50; /* Green */
    box-shadow: 0 0 15px rgba(76, 175, 80, 0.4);
}

.option-label.incorrect-answer {
    background-color: #ffebee; /* Light red */
    border-color: #f44336; /* Red */
    box-shadow: 0 0 15px rgba(244, 67, 54, 0.4);
}

.option-label.selected-wrong {
    background-color: #f8bbd0; /* Selected wrong - light pink/red */
    border-color: #e91e63; /* Deeper pink/red */
}


.navigation-buttons {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 25px;
}

.nav-button {
    background-color: #673ab7; /* Deep Purple */
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 1.15em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 5px 15px rgba(103, 58, 183, 0.3);
}

.nav-button:hover {
    background-color: #512da8; /* Darker Deep Purple */
    transform: translateY(-2px);
}

.nav-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    box-shadow: none;
}

#submit-button {
    background-color: #4CAF50; /* Green */
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

#submit-button:hover {
    background-color: #388E3C; /* Darker Green */
}

.results-container {
    margin-top: 35px;
    font-size: 1.6em;
    font-weight: bold;
    color: #4a148c;
    min-height: 45px; /* Prevent layout shift */
}

.results-container.pass {
    color: #4CAF50;
}

.results-container.fail {
    color: #f44336;
}

.restart-button {
    background-color: #ff9800; /* Orange */
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 1.15em;
    cursor: pointer;
    margin-top: 25px;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 5px 15px rgba(255, 152, 0, 0.3);
    display: none; /* Hidden until quiz is submitted */
}

.restart-button:hover {
    background-color: #fb8c00; /* Darker Orange */
    transform: translateY(-2px);
}

.feedback-text {
    margin-top: 15px;
    font-size: 1.1em;
    font-weight: 500;
}
```

**script.js:**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "Why does a swimming pool appear shallower than it actually is?",
            options: ["Reflection of light from the bottom", "Absorption of light by water", "Refraction of light as it passes from water to air", "Scattering of light by impurities in water"],
            answer: "Refraction of light as it passes from water to air"
        },
        {
            question: "When you look at your reflection in a smooth, shiny mirror, what light phenomenon are you observing?",
            options: ["Refraction", "Diffraction", "Reflection", "Dispersion"],
            answer: "Reflection"
        },
        {
            question: "Which of the following best explains why the sky appears blue on a clear day?",
            options: ["Absorption of red light by the atmosphere", "Reflection of sunlight off the ocean", "Scattering of blue light by atmospheric particles", "Refraction of sunlight through water vapor"],
            answer: "Scattering of blue light by atmospheric particles" // Note: This is scattering, not strictly reflection/refraction/brightness, but common light phenomena. Can adjust if you want to stick *strictly* to the chapter text.
        },
        {
            question: "Why does a diamond sparkle so brightly?",
            options: ["Its surface reflects all incoming light", "It absorbs all colors except white", "Due to total internal reflection and dispersion of light", "It emits its own light"],
            answer: "Due to total internal reflection and dispersion of light"
        },
        {
            question: "If you move closer to a light source, the brightness of the light appears to increase. This is primarily because:",
            options: ["The light source emits more light", "The light rays spread out less over a smaller area", "Your eyes adjust to the new conditions", "The wavelength of the light changes"],
            answer: "The light rays spread out less over a smaller area"
        },
        {
            question: "What happens to the speed of light when it travels from air into glass?",
            options: ["It increases", "It decreases", "It remains the same", "It depends on the color of light"],
            answer: "It decreases"
        }
    ];

    const quizDiv = document.getElementById('quiz');
    const previousButton = document.getElementById('previous-button');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    const resultsDiv = document.getElementById('results');
    const restartButton = document.getElementById('restart-button');

    let currentQuestionIndex = 0;
    const userAnswers = new Array(quizData.length).fill(null); // To store user's selected answers

    function loadQuestion() {
        const questionData = quizData[currentQuestionIndex];
        quizDiv.innerHTML = `
            <div class="question-slide active">
                <p class="question-number">Question ${currentQuestionIndex + 1} of ${quizData.length}</p>
                <p class="question-text">${questionData.question}</p>
                <div class="options-container">
                    ${questionData.options.map((option, index) => `
                        <label class="option-label">
                            <input type="radio" name="question${currentQuestionIndex}" value="${option}" ${userAnswers[currentQuestionIndex] === option ? 'checked' : ''}>
                            ${option}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;

        // Add event listeners to radio buttons to record answer immediately
        const radios = quizDiv.querySelectorAll(`input[name="question${currentQuestionIndex}"]`);
        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                userAnswers[currentQuestionIndex] = e.target.value;
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

        quizData.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const correctAnswer = question.answer;

            const resultItem = document.createElement('div');
            resultItem.classList.add('question-slide', 'active'); // Re-use slide styling for results
            resultItem.innerHTML = `
                <p class="question-number">Question ${index + 1}:</p>
                <p class="question-text">${question.question}</p>
                <div class="options-container">
                    ${question.options.map(option => `
                        <label class="option-label 
                            ${option === correctAnswer ? 'correct-answer' : ''}
                            ${option === userAnswer && option !== correctAnswer ? 'selected-wrong' : ''}
                        ">
                            <input type="radio" disabled ${option === userAnswer ? 'checked' : ''}>
                            ${option}
                            ${option === correctAnswer ? ' (Correct)' : ''}
                            ${option === userAnswer && option !== correctAnswer ? ' (Your Answer)' : ''}
                        </label>
                    `).join('')}
                </div>
                <p class="feedback-text">
                    ${userAnswer === correctAnswer ? '<span style="color: #4CAF50;">Correct!</span>' : `<span style="color: #f44336;">Incorrect.</span> The correct answer was: <strong>${correctAnswer}</strong>`}
                </p>
                <hr style="margin: 20px 0; border: none; border-top: 1px dashed #eee;">
            `;
            quizDiv.appendChild(resultItem);

            if (userAnswer === correctAnswer) {
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

        // Hide navigation, show restart button
        previousButton.style.display = 'none';
        nextButton.style.display = 'none';
        submitButton.style.display = 'none';
        restartButton.style.display = 'block';
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
        restartButton.style.display = 'none'; // Hide restart button
        previousButton.style.display = 'inline-block'; // Show navigation buttons
        nextButton.style.display = 'inline-block';
        loadQuestion(); // Load first question again
    });

    // Initial load
    loadQuestion();
});
```

---

**To make this work:**

1.  **File Structure:**
    ```
    your-quiz-folder/
    ├── index.html
    ├── style.css
    └── script.js
    ```
2.  Save the three code blocks above into `index.html`, `style.css`, and `script.js` respectively, within the same folder.
3.  Open `index.html` in your web browser.

**How to Play:**

* Read the question.
* Select your answer by clicking on the radio button next to your chosen option.
* Click "Next" to go to the next question.
* Click "Previous" to go back to a previous question.
* Once you are on the last question, the "Submit Quiz" button will appear. Click it to see your score and the correct answers.
* Click "Restart Quiz" to play again.

**Canva Considerations (Reiteration):**

As discussed with the previous games, building a *fully functional* interactive quiz with answer checking, navigation, and score tallying directly within Canva's standard features is **not possible**. Canva is a design tool, not a platform for creating complex web applications with JavaScript logic.

This HTML, CSS, and JavaScript code provides a complete, standalone web-based quiz. If you were to use this in a Canva context, you would typically need to:

* **Embed it:** If Canva offers a way to embed external web content (e.g., via an iframe), you could host this quiz online and embed it. This depends on Canva's specific embedding capabilities.
* **Simulate with multiple slides and animations:** For a Canva-only presentation, you might create a slide for each question, using Canva's animation features to *reveal* the correct answer or feedback after a "click" or timed transition. However, this is a visual simulation and lacks true interactivity or scorekeeping.

The provided code is the best way to achieve the interactive "Light Phenomena Quiz" as described.

```
แหล่งที่มา:
1. https://github.com/Adr246/miniproject-main
2. https://github.com/JosephJtech/quiz-application
3. https://github.com/vipullsingh/quiz-platform-frontend
4. https://github.com/OElksnitis/WebLietojumi
5. https://github.com/Shafi-shafs/expo-project