document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "What term describes the maximum displacement of a wave particle from its equilibrium position?",
            options: ["Wavelength", "Frequency", "Amplitude", "Period"],
            answer: "Amplitude"
        },
        {
            question: "Which property of a wave is measured in Hertz (Hz)?",
            options: ["Amplitude", "Wavelength", "Speed", "Frequency"],
            answer: "Frequency"
        },
        {
            question: "What is the distance between two consecutive crests or troughs of a wave called?",
            options: ["Amplitude", "Frequency", "Wavelength", "Period"],
            answer: "Wavelength"
        },
        {
            question: "If a wave has a high frequency, what can be said about its wavelength (assuming constant speed)?",
            options: ["It has a long wavelength", "It has a short wavelength", "Wavelength is unrelated to frequency", "It has a large amplitude"],
            answer: "It has a short wavelength"
        },
        {
            question: "Which wave property determines the loudness of a sound wave or the brightness of a light wave?",
            options: ["Wavelength", "Frequency", "Amplitude", "Speed"],
            answer: "Amplitude"
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
                    ${userAnswer === correctAnswer ? '<span style="color: #28a745;">Correct!</span>' : `<span style="color: #dc3545;">Incorrect.</span> The correct answer was: <strong>${correctAnswer}</strong>`}
                </p>
                <hr style="margin: 20px 0; border: none; border-top: 1px dashed #ccc;">
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
// 1. https://github.com/AbrahamEstrada27/examen372
// 2. https://github.com/AlgoHussle/nomad-blog
// 3. https://github.com/JosephJtech/quiz-application
// 4. https://github.com/vipullsingh/quiz-platform-frontend
// 5. https://github.com/OElksnitis/WebLietojumi
// 6. https://github.com/Shafi-shafs/expo-project