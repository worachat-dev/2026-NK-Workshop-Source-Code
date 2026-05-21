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

// แหล่งที่มา:
// 1. https://github.com/Ahmed5510-Mac/Card-Hover
// 2. https://github.com/jaranda-polo/randomcard
// 3. https://github.com/JosephJtech/quiz-application
// 4. https://github.com/vipullsingh/quiz-platform-frontend
// 5. https://github.com/OElksnitis/WebLietojumi
// 6. https://intfiction.org/t/help-button-for-randomly-assigning-gifts-not-working/65760
// 7. https://github.com/AdiletZumabai/work
// 8. https://github.com/Shafi-shafs/expo-project