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

// แหล่งที่มา:
// 1. https://github.com/Adr246/miniproject-main
// 2. https://github.com/JosephJtech/quiz-application
// 3. https://github.com/vipullsingh/quiz-platform-frontend
// 4. https://github.com/OElksnitis/WebLietojumi
// 5. https://github.com/Shafi-shafs/expo-project