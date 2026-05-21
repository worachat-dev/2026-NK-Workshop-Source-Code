## From """Unit 6: Electricity Students will learn about simple electrical circuits and electrical quantities: electric current, electric potential difference (voltage), electrical resistance, using instruments to measure electrical quantities, analyzing the relationship between electric current and potential difference, series and parallel circuits, calculating electrical energy and electricity costs, and the functions of electronic components such as resistors, diodes, capacitors, and transistors. Chapter 2: Electricity in Daily Life Electrical energy used per unit time is called electric power, with the SI unit of joules per second or watts. The electrical energy consumed by an appliance can be calculated by multiplying the appliance's power by the time it is used, which can then be used to calculate the monthly electricity bill. Choosing electrical appliances correctly, safely, and economically can be done by selecting appliances that match the specified voltage and appropriate power for use, and by using them correctly.  and please Create a "Home Energy Audit Game": Students are given a virtual house with various appliances and their power ratings. They must "use" the appliances for certain durations and then calculate the total energy consumed and estimated cost by using the index.html, style.css, script.js?

Okay, I will create a "Home Energy Audit Game".

This game will:
1.  **Present a Virtual House/Rooms:** Show a simplified view of a house or a list of rooms.
2.  **Appliances and Power Ratings:** List various common household appliances with their typical power ratings (in Watts).
3.  **Usage Input:** Allow students to input the duration each appliance is "used" (e.g., hours per day).
4.  **Calculate Energy:** Calculate the total energy consumed (in kWh) based on inputs.
5.  **Calculate Cost:** Calculate the estimated electricity cost based on a given electricity rate.
6.  **Feedback:** Provide feedback on the calculation and maybe tips for energy saving.
7.  **Reset/New Scenario:** Allow resetting the audit.

---

## Home Energy Audit Game: Game Files

Here are the `index.html`, `style.css`, and `script.js` files for the "Home Energy Audit Game".

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Energy Audit Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Home Energy Audit Challenge</h1>
        <p>Imagine you're auditing your home's electricity usage. Enter how many hours per day each appliance is used. Then, calculate the total energy consumed and the estimated monthly cost!</p>

        <div class="audit-area">
            <div class="appliances-list">
                <h2>Appliances & Usage (Hours/Day)</h2>
                <div id="appliance-inputs">
                    </div>
            </div>

            <div class="calculation-parameters">
                <h2>Audit Settings</h2>
                <div class="parameter-group">
                    <label for="electricity-rate">Electricity Rate (per kWh):</label>
                    <input type="number" id="electricity-rate" value="4.00" step="0.01">
                    <span>THB</span> </div>
                <div class="parameter-group">
                    <label for="days-in-month">Days in Month:</label>
                    <input type="number" id="days-in-month" value="30" step="1">
                </div>
            </div>
        </div>

        <div class="controls">
            <button id="calculate-button">Calculate Energy & Cost</button>
            <button id="reset-button">Reset Audit</button>
        </div>

        <div class="results-area">
            <h2>Your Audit Results</h2>
            <p>Total Daily Energy: <span id="daily-energy-kwh">0.00</span> kWh</p>
            <p>Total Monthly Energy: <span id="monthly-energy-kwh">0.00</span> kWh</p>
            <p>Estimated Monthly Cost: <span id="monthly-cost">0.00</span> THB</p>
        </div>

        <div id="feedback" class="feedback-message"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### `style.css`

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1f2f3d, #2a3a49, #17202c); /* Dark, muted blue gradient */
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    color: #e0e0e0; /* Off-white text */
}

.game-container {
    background-color: #2c3e50; /* Darker blue-gray */
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    padding: 40px;
    text-align: center;
    max-width: 900px;
    width: 100%;
    border: 1px solid #4a637f;
}

h1 {
    color: #4CAF50; /* Green highlight */
    margin-bottom: 15px;
    font-size: 2.8em;
    font-weight: 800;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}

p {
    color: #b0b0b0; /* Lighter gray */
    margin-bottom: 25px;
    font-size: 1.05em;
    line-height: 1.6;
}

.audit-area {
    display: flex;
    justify-content: space-around;
    gap: 30px;
    margin-bottom: 35px;
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.appliances-list, .calculation-parameters {
    flex: 1;
    min-width: 300px;
    background-color: #34475c;
    border-radius: 15px;
    padding: 25px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    border: 1px solid #4c627a;
}

.appliances-list h2, .calculation-parameters h2 {
    color: #ADD8E6; /* Light Blue */
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.5em;
}

.appliance-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    background-color: #3b5063;
    padding: 12px 18px;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.appliance-item label {
    font-size: 1.1em;
    font-weight: 600;
    color: #ECF0F1;
    flex: 2; /* Give more space to label */
    text-align: left;
}

.appliance-item .power {
    font-size: 0.9em;
    color: #BDC3C7;
    margin-left: 10px;
    flex: 1;
    text-align: right;
}

.appliance-item input[type="number"] {
    width: 60px;
    padding: 8px;
    font-size: 1em;
    border: 1px solid #666;
    border-radius: 5px;
    background-color: #ECF0F1;
    color: #2c3e50;
    text-align: center;
    margin-left: 10px;
}

.appliance-item input[type="number"]::-webkit-inner-spin-button,
.appliance-item input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.appliance-item input[type="number"] {
    -moz-appearance: textfield;
}


.parameter-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    background-color: #3b5063;
    padding: 12px 18px;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.parameter-group label {
    font-size: 1.1em;
    font-weight: 600;
    color: #ECF0F1;
}

.parameter-group input[type="number"] {
    width: 80px;
    padding: 8px;
    font-size: 1em;
    border: 1px solid #666;
    border-radius: 5px;
    background-color: #ECF0F1;
    color: #2c3e50;
    text-align: center;
    margin: 0 10px;
}

.parameter-group span {
    font-size: 1.1em;
    font-weight: bold;
    color: #FFD700; /* Gold for units */
}


.controls {
    margin-top: 30px;
}

button {
    background-color: #2196F3; /* Blue */
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 1.1em;
    cursor: pointer;
    margin: 0 15px;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 6px 15px rgba(33, 150, 243, 0.3);
}

button:hover {
    background-color: #1976D2; /* Darker Blue */
    transform: translateY(-3px);
}

#reset-button {
    background-color: #E53935; /* Red */
    box-shadow: 0 6px 15px rgba(229, 57, 53, 0.3);
}
#reset-button:hover {
    background-color: #C62828; /* Darker Red */
}

.results-area {
    background-color: #34475c;
    border-radius: 15px;
    padding: 25px;
    margin-top: 40px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    border: 1px solid #4c627a;
}

.results-area h2 {
    color: #4CAF50; /* Green */
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.6em;
}

.results-area p {
    font-size: 1.3em;
    margin: 10px 0;
    color: #ECF0F1;
}

.results-area span {
    color: #FFD700; /* Gold for values */
    font-weight: bold;
    font-family: 'Courier New', monospace;
}

.feedback-message {
    margin-top: 30px;
    font-weight: bold;
    font-size: 1.4em;
    min-height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e0e0e0;
}

.feedback-message.success {
    color: #8BC34A; /* Light Green */
}
.feedback-message.error {
    color: #FF7043; /* Light Red/Orange */
}
```

### `script.js`

```javascript
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
```

---

## How to Set Up and Play

1.  **Create a Folder:** Make a new folder on your computer (e.g., `HomeEnergyAuditGame`).
2.  **Save the Files:**
    * Save the `index.html` code as `index.html` inside the folder.
    * Save the `style.css` code as `style.css` inside the folder.
    * Save the `script.js` code as `script.js` inside the folder.
3.  **Open in Browser:** Open the `index.html` file using your web browser (e.g., Chrome, Firefox).

### How to Play:

1.  **Appliance List:** You'll see a list of common household appliances, each with its typical power rating in Watts (W).
2.  **Enter Usage:** For each appliance, enter the number of hours per day you imagine it being used. Default values are provided as a starting point.
    * You can use decimal values (e.g., 0.5 for half an hour, 0.1 for 6 minutes).
3.  **Audit Settings:**
    * **Electricity Rate (per kWh):** This is pre-filled with `4.00 THB` (Thai Baht), a common rate. You can change this if you wish to simulate different rates.
    * **Days in Month:** Pre-filled with `30` days. You can adjust this as well.
4.  **Calculate:** Click the **"Calculate Energy & Cost"** button.
5.  **View Results:**
    * **Total Daily Energy (kWh):** Shows the total kilowatt-hours consumed by all appliances in one day.
    * **Total Monthly Energy (kWh):** The total energy consumed over the specified number of days in a month.
    * **Estimated Monthly Cost (THB):** Your estimated electricity bill for the month based on the energy consumed and the rate.
6.  **Feedback:** A message will appear below the buttons, confirming the audit is complete or flagging any errors in your input.
7.  **Reset Audit:** Click **"Reset Audit"** to clear all usage inputs and start fresh.

This game allows students to directly interact with the concepts of electric power, energy consumption (kWh), and calculating electricity costs, making the abstract ideas tangible and relevant to daily life.

```
แหล่งที่มา:
1. https://github.com/CalebATM/CalebRep
2. https://github.com/Gyani1610/Loan-Calculator