document.addEventListener('DOMContentLoaded', () => {
    const scenarioBox = document.getElementById('scenarioBox');
    const optionsBox = document.getElementById('optionsBox');
    const explanationBox = document.getElementById('explanationBox');
    const nextScenarioButton = document.getElementById('nextScenarioButton');
    const restartGameButton = document.getElementById('restartGameButton');

    // Define your scenarios
    const scenarios = [
        {
            id: 1,
            title: "Problem: Air Pollution in the City",
            description: "A large city is experiencing severe air pollution, primarily from vehicle emissions and industrial factories. Residents are reporting increased respiratory problems, and visibility is very low.",
            options: [
                {
                    text: "Option A: Build more highways to ease traffic congestion.",
                    isCorrect: false,
                    explanation: "Building more highways might temporarily ease congestion but often encourages more driving in the long term, potentially worsening emissions. It doesn't address industrial pollution directly."
                },
                {
                    text: "Option B: Implement stricter emission standards for vehicles and factories, invest in public transportation, and promote renewable energy sources.",
                    isCorrect: true,
                    explanation: "<span class='effective'>Effective!</span> This multi-faceted approach directly tackles the sources of pollution. Stricter standards reduce harmful output, improved public transport reduces reliance on private vehicles, and renewable energy lessens industrial emissions by shifting away from fossil fuels. This demonstrates applying **environmental science and engineering** principles."
                },
                {
                    text: "Option C: Encourage citizens to wear face masks at all times.",
                    isCorrect: false,
                    explanation: "While wearing face masks can protect individuals, it does not solve the root cause of air pollution. It's a temporary measure, not a sustainable solution."
                }
            ]
        },
        {
            id: 2,
            title: "Problem: Increasing Food Shortages",
            description: "A growing global population combined with climate change impacts (droughts, floods) is leading to widespread food shortages and a decline in crop yields in many regions.",
            options: [
                {
                    text: "Option A: Clear more forests to create new farmland.",
                    isCorrect: false,
                    explanation: "Clearing forests contributes to deforestation and habitat loss, which can worsen climate change (less CO2 absorption) and reduce biodiversity. It's not a sustainable long-term solution for food security."
                },
                {
                    text: "Option B: Invest in genetically modified crops (GMOs) that are drought-resistant and high-yielding, and develop sustainable agricultural practices like vertical farming and efficient irrigation.",
                    isCorrect: true,
                    explanation: "<span class='effective'>Effective!</span> GMOs can significantly increase crop resilience and yield, addressing immediate food needs. Sustainable practices like vertical farming reduce land and water usage, and efficient irrigation conserves resources, demonstrating the application of **biotechnology and agricultural science**."
                },
                {
                    text: "Option C: Rely solely on traditional farming methods without any technological advancements.",
                    isCorrect: false,
                    explanation: "While traditional methods have their place, relying solely on them without advancements may not be sufficient to feed a rapidly growing population in a changing climate. Innovation is needed."
                }
            ]
        },
        {
            id: 3,
            title: "Problem: Global Energy Crisis",
            description: "The world is facing an energy crisis due to dwindling fossil fuel reserves and the environmental impact of their combustion, leading to rising energy costs and climate change concerns.",
            options: [
                {
                    text: "Option A: Drill for more oil and natural gas in previously untouched areas.",
                    isCorrect: false,
                    explanation: "This would provide a short-term increase in supply but exacerbates the core problem of finite resources and increased greenhouse gas emissions, worsening climate change."
                },
                {
                    text: "Option B: Massively expand investment in renewable energy sources like solar, wind, and geothermal power, and promote energy efficiency and conservation.",
                    isCorrect: true,
                    explanation: "<span class='effective'>Effective!</span> Shifting to renewable energy sources provides a sustainable and environmentally friendly power supply. Promoting energy efficiency and conservation reduces overall demand. This is a solution based on **physics, environmental engineering, and sustainable technology**."
                },
                {
                    text: "Option C: Reduce overall electricity usage by implementing mandatory power outages during peak hours.",
                    isCorrect: false,
                    explanation: "Mandatory power outages would be highly disruptive to daily life and the economy, only addressing demand temporarily without solving the underlying supply and environmental issues."
                }
            ]
        }
        // Add more scenarios here
    ];

    let currentScenarioIndex = 0;

    // --- Game Functions ---

    function loadScenario() {
        if (currentScenarioIndex >= scenarios.length) {
            endGame();
            return;
        }

        const scenario = scenarios[currentScenarioIndex];
        scenarioBox.innerHTML = `<h2>${scenario.title}</h2><p>${scenario.description}</p>`;
        optionsBox.innerHTML = '';
        explanationBox.innerHTML = ''; // Clear previous explanation
        explanationBox.classList.remove('visible'); // Hide explanation box
        nextScenarioButton.classList.add('hidden');
        restartGameButton.classList.add('hidden'); // Ensure restart button is hidden initially

        scenario.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option-button');
            button.textContent = option.text;
            button.addEventListener('click', () => chooseOption(option));
            optionsBox.appendChild(button);
        });
    }

    function chooseOption(chosenOption) {
        // Disable all option buttons after a choice is made
        Array.from(optionsBox.children).forEach(button => {
            button.disabled = true;
        });

        // Display explanation
        explanationBox.innerHTML = `<p>${chosenOption.explanation}</p>`;
        explanationBox.classList.add('visible'); // Make explanation box visible

        // Show Next Scenario or Restart Game button
        if (currentScenarioIndex < scenarios.length - 1) {
            nextScenarioButton.classList.remove('hidden');
        } else {
            restartGameButton.classList.remove('hidden');
        }
    }

    function endGame() {
        scenarioBox.innerHTML = '<h2>Congratulations!</h2><p>You have completed all scenarios and demonstrated your problem-solving skills using science and technology!</p>';
        optionsBox.innerHTML = ''; // Clear options
        explanationBox.innerHTML = ''; // Clear explanation
        explanationBox.classList.remove('visible');
        nextScenarioButton.classList.add('hidden');
        restartGameButton.classList.remove('hidden'); // Show restart button at the end
    }

    function restartGame() {
        currentScenarioIndex = 0;
        explanationBox.innerHTML = '';
        explanationBox.classList.remove('visible');
        restartGameButton.classList.add('hidden');
        loadScenario();
    }

    // --- Event Listeners for Navigation ---
    nextScenarioButton.addEventListener('click', () => {
        currentScenarioIndex++;
        loadScenario();
    });

    restartGameButton.addEventListener('click', restartGame);

    // --- Start the game ---
    loadScenario();
});

// แหล่งที่มา:
// 1. https://www.americaloaded.com/2023/03/21/googles-bard-lags-behind-gpt-4-and-claude-in-head-to-head-comparison/
// 2. https://github.com/Shehan524/Dashboard-with-Login
// 3. https://github.com/Avantika-t8/Myntra-HackerRamp-WeForShe