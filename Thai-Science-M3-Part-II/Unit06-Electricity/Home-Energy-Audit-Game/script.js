document.addEventListener('DOMContentLoaded', () => {
    // Define common appliances with typical power ratings (in Watts)
    const appliances = [
        { name: "Refrigerator", power: 150, defaultHours: 24 }, // Modern fridge, not running constantly
        { name: "LED TV (40-50 inch)", power: 80, defaultHours: 4 },
        { name: "Incandescent Light Bulb (Old)", power: 60, defaultHours: 6 }, // For comparison
        { name: "LED Light Bulb", power: 9, defaultHours: 6 },
        { name: "Washing Machine", power: 2000, defaultHours: 0.5 }, // Peak usage for short time
        { name: "Microwave Oven", power: 1000, defaultHours: 0.2 }, // Very short usage
        { name: "Electric Kettle", power: 2200, defaultHours: 0.1 }, // Very short usage
        { name: "Air Conditioner (12,000 BTU)", power: 1200, defaultHours: 8 }, // Common in Thailand
        { name: "Electric Fan", power: 50, defaultHours: 10 },
        { name: "Laptop Charger", power: 60, defaultHours: 5 },
        { name: "Hair Dryer", power: 1800, defaultHours: 0.1 },
        { name: "Rice Cooker", power: 700, defaultHours: 1 },
        { name: "Iron", power: 1500, defaultHours: 0.5 },
        { name: "Water Heater", power: 3000, defaultHours: 0.2 }, // For showers
    ];

    const applianceInputsDiv = document.getElementById('appliance-inputs');
    const electricityRateInput = document.getElementById('electricity-rate');
    const daysInMonthInput = document.getElementById('days-in-month');
    const calculateButton = document.getElementById('calculate-button');
    const resetButton = document.getElementById('reset-button');
    const dailyEnergyKwhSpan = document.getElementById('daily-energy-kwh');
    const monthlyEnergyKwhSpan = document.getElementById('monthly-energy-kwh');
    const monthlyCostSpan = document.getElementById('monthly-cost');
    const feedbackDiv = document.getElementById('feedback');

    let applianceUsageInputs = {}; // Stores references to input fields

    function initializeGame() {
        applianceInputsDiv.innerHTML = ''; // Clear previous inputs
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('success', 'error');

        appliances.forEach(appliance => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('appliance-item');

            const label = document.createElement('label');
            label.textContent = appliance.name;
            itemDiv.appendChild(label);

            const powerSpan = document.createElement('span');
            powerSpan.classList.add('power');
            powerSpan.textContent = `(${appliance.power} W)`;
            itemDiv.appendChild(powerSpan);

            const input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            input.step = '0.1';
            input.value = appliance.defaultHours; // Set default usage
            input.id = `usage-${appliance.name.replace(/\s/g, '_')}`; // Create unique ID
            input.dataset.power = appliance.power; // Store power rating
            itemDiv.appendChild(input);

            const unitSpan = document.createElement('span');
            unitSpan.textContent = 'hrs/day';
            itemDiv.appendChild(unitSpan);

            applianceInputsDiv.appendChild(itemDiv);
            applianceUsageInputs[appliance.name] = input; // Store reference to input
        });

        // Set default parameters
        electricityRateInput.value = '4.00'; // THB per kWh
        daysInMonthInput.value = '30';

        // Reset results display
        dailyEnergyKwhSpan.textContent = '0.00';
        monthlyEnergyKwhSpan.textContent = '0.00';
        monthlyCostSpan.textContent = '0.00';
    }

    function calculateAudit() {
        let totalDailyEnergyWh = 0;

        for (const appName in applianceUsageInputs) {
            const inputElement = applianceUsageInputs[appName];
            const usageHours = parseFloat(inputElement.value);
            const powerWatts = parseFloat(inputElement.dataset.power);

            if (isNaN(usageHours) || usageHours < 0) {
                feedbackDiv.textContent = `Please enter a valid number of hours for ${appName}.`;
                feedbackDiv.classList.add('error');
                feedbackDiv.classList.remove('success');
                return;
            }
            totalDailyEnergyWh += (powerWatts * usageHours);
        }

        const electricityRate = parseFloat(electricityRateInput.value);
        const daysInMonth = parseInt(daysInMonthInput.value);

        if (isNaN(electricityRate) || electricityRate <= 0) {
            feedbackDiv.textContent = "Please enter a valid electricity rate.";
            feedbackDiv.classList.add('error');
            feedbackDiv.classList.remove('success');
            return;
        }
        if (isNaN(daysInMonth) || daysInMonth <= 0) {
            feedbackDiv.textContent = "Please enter a valid number of days in the month.";
            feedbackDiv.classList.add('error');
            feedbackDiv.classList.remove('success');
            return;
        }

        const totalDailyEnergyKwh = totalDailyEnergyWh / 1000; // Convert Wh to kWh
        const totalMonthlyEnergyKwh = totalDailyEnergyKwh * daysInMonth;
        const estimatedMonthlyCost = totalMonthlyEnergyKwh * electricityRate;

        dailyEnergyKwhSpan.textContent = totalDailyEnergyKwh.toFixed(2);
        monthlyEnergyKwhSpan.textContent = totalMonthlyEnergyKwh.toFixed(2);
        monthlyCostSpan.textContent = estimatedMonthlyCost.toFixed(2);

        feedbackDiv.textContent = "Audit complete! Review your energy consumption and cost.";
        feedbackDiv.classList.add('success');
        feedbackDiv.classList.remove('error');
    }

    // Event listeners
    calculateButton.addEventListener('click', calculateAudit);
    resetButton.addEventListener('click', initializeGame);

    // Initial game setup
    initializeGame();
});

// แหล่งที่มา:
// 1. https://github.com/CalebATM/CalebRep
// 2. https://github.com/Gyani1610/Loan-Calculator