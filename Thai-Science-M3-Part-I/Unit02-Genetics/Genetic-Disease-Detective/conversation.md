## From """Unit 2: Genetics 
 This unit covers genetics, focusing on how living organisms transmit characteristics from one generation to the next. These transmitted characteristics are called hereditary traits. The inheritance of traits involves DNA, which is the genetic material located in the nucleus of cells. 
 Chapter 1: Inheritance of Traits 
 This chapter involves studying and investigating chromosome structure, the relationship between genes, DNA, and chromosomes, Mendel's basic principles of heredity from monohybrid crosses, and calculating genotype and phenotype ratios in offspring. It also covers human chromosomes, the importance of mitosis and meiosis cell division, genetic diseases and the application of knowledge about them, and the benefits and impacts of genetically modified organisms (GMOs) on humans and the environment.""" and please Create a "Genetic Disease Detective": Students are given case studies of individuals with certain symptoms and a list of genetic diseases. They must identify the likely genetic disease and suggest potential implications or prevention methods.  by using the index.html, style.css, script.js?

This is an excellent idea for an interactive learning module! Here's a conceptual outline for a "Genetic Disease Detective" game using `index.html`, `style.css`, and `script.js`.

---

### `index.html` (Structure of the Genetic Disease Detective)

This file will lay out the case study, the list of diseases, and the interaction areas.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genetic Disease Detective</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Genetic Disease Detective</h1>
        <p>Analyze case studies, identify genetic diseases, and suggest implications.</p>
    </header>

    <main>
        <section id="case-study-section">
            <h2>Patient Case File <span id="case-number">#1</span></h2>
            <div id="case-study-content">
                <p id="patient-name">Patient Name: </p>
                <p id="patient-age">Age: </p>
                <p id="patient-symptoms">Symptoms: </p>
                <p id="patient-family-history">Family History: </p>
                <p id="patient-test-results">Lab/Test Results: </p>
            </div>
            <button id="next-case-button" style="display: none;">Next Case</button>
        </section>

        <section id="disease-selection-section">
            <h2>Identify the Disease</h2>
            <p>Select the genetic disease that best matches the patient's symptoms.</p>
            <div class="disease-list-container">
                <ul id="disease-list">
                    </ul>
            </div>
            <button id="submit-diagnosis">Submit Diagnosis</button>
            <p id="diagnosis-feedback"></p>
        </section>

        <section id="implications-section" style="display: none;">
            <h2>Implications and Management</h2>
            <p>Based on your diagnosis, suggest potential implications or prevention methods.</p>
            <div class="implications-prompts">
                <label for="implication-input-1">Potential health implications for the patient:</label>
                <textarea id="implication-input-1" rows="3" placeholder="e.g., increased risk of infections, developmental delays..."></textarea>

                <label for="implication-input-2">Potential prevention or management strategies:</label>
                <textarea id="implication-input-2" rows="3" placeholder="e.g., genetic counseling, specific therapies, lifestyle adjustments..."></textarea>
            </div>
            <button id="check-implications">Check Implications</button>
            <p id="implications-feedback"></p>
        </section>

        <section id="disease-info-reveal" style="display: none;">
            <h2>Correct Disease Information</h2>
            <div id="reveal-disease-name"></div>
            <div id="reveal-disease-description"></div>
            <h3>Key Implications:</h3>
            <ul id="reveal-disease-implications"></ul>
            <h3>Management/Prevention:</h3>
            <ul id="reveal-disease-prevention"></ul>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Genetic Learning Tools</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

---

### `style.css` (Visual Styling)

This CSS provides a clean and organized layout for the game elements.

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #e9f5f9;
    color: #333;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header {
    background-color: #2c3e50;
    color: white;
    padding: 25px 0;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

main {
    flex-grow: 1;
    padding: 20px;
    max-width: 900px;
    margin: 20px auto;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
}

section {
    margin-bottom: 30px;
    padding: 25px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    background-color: #ffffff;
}

h2 {
    color: #2c3e50;
    border-bottom: 2px solid #aec6d9;
    padding-bottom: 12px;
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#case-study-content p {
    margin-bottom: 10px;
    line-height: 1.6;
}

#case-study-content strong {
    color: #34495e;
}

.disease-list-container {
    max-height: 250px; /* Limit height and add scroll if many diseases */
    overflow-y: auto;
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 10px;
}

#disease-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

#disease-list li {
    padding: 12px 15px;
    margin-bottom: 8px;
    background-color: #f0f8ff;
    border: 1px solid #d0e8f8;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

#disease-list li:hover {
    background-color: #e0f2fd;
    border-color: #a7d9f7;
}

#disease-list li.selected {
    background-color: #d1ecf1;
    border-color: #bee5eb;
    box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.5);
}

button {
    background-color: #3498db;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
    margin-top: 15px;
}

button:hover {
    background-color: #2980b9;
}

#submit-diagnosis, #check-implications {
    background-color: #2ecc71; /* Green for submission */
}

#submit-diagnosis:hover, #check-implications:hover {
    background-color: #27ae60;
}

#next-case-button {
    background-color: #f39c12; /* Orange for next case */
    float: right;
    margin-top: 0;
}

#next-case-button:hover {
    background-color: #e67e22;
}

#diagnosis-feedback, #implications-feedback {
    margin-top: 15px;
    font-weight: bold;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
}

.feedback-correct {
    color: #28a745;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
}

.feedback-incorrect {
    color: #dc3545;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
}

.feedback-neutral {
    color: #6c757d;
    background-color: #e2e3e5;
    border: 1px solid #d6d8db;
}

.implications-prompts label {
    display: block;
    margin-top: 20px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #4a698a;
}

.implications-prompts textarea {
    width: calc(100% - 24px); /* Account for padding and border */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1em;
    resize: vertical; /* Allow vertical resizing */
    min-height: 80px;
}

#disease-info-reveal {
    background-color: #ecf0f1;
    border-color: #bdc3c7;
}

#reveal-disease-name {
    font-size: 1.5em;
    font-weight: bold;
    color: #e74c3c;
    margin-bottom: 10px;
}

#reveal-disease-description {
    margin-bottom: 15px;
    line-height: 1.6;
}

#reveal-disease-implications, #reveal-disease-prevention {
    list-style: disc;
    margin-left: 20px;
    padding-left: 0;
    line-height: 1.5;
}

footer {
    text-align: center;
    padding: 20px 0;
    background-color: #34495e;
    color: white;
    margin-top: 20px;
}
```

---

### `script.js` (Game Logic and Interactivity)

This script will manage the case studies, disease selection, and feedback.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const caseNumberSpan = document.getElementById('case-number');
    const patientName = document.getElementById('patient-name');
    const patientAge = document.getElementById('patient-age');
    const patientSymptoms = document.getElementById('patient-symptoms');
    const patientFamilyHistory = document.getElementById('patient-family-history');
    const patientTestResults = document.getElementById('patient-test-results');
    const nextCaseButton = document.getElementById('next-case-button');

    const diseaseList = document.getElementById('disease-list');
    const submitDiagnosisButton = document.getElementById('submit-diagnosis');
    const diagnosisFeedback = document.getElementById('diagnosis-feedback');

    const implicationsSection = document.getElementById('implications-section');
    const implicationInput1 = document.getElementById('implication-input-1');
    const implicationInput2 = document.getElementById('implication-input-2');
    const checkImplicationsButton = document.getElementById('check-implications');
    const implicationsFeedback = document.getElementById('implications-feedback');

    const diseaseInfoRevealSection = document.getElementById('disease-info-reveal');
    const revealDiseaseName = document.getElementById('reveal-disease-name');
    const revealDiseaseDescription = document.getElementById('reveal-disease-description');
    const revealDiseaseImplications = document.getElementById('reveal-disease-implications');
    const revealDiseasePrevention = document.getElementById('reveal-disease-prevention');

    // Game State
    let currentCaseIndex = 0;
    let selectedDisease = null;

    // Data: Case Studies and Genetic Diseases
    const geneticDiseases = {
        'Cystic Fibrosis': {
            description: 'An inherited disorder that causes severe damage to the lungs, digestive system, and other organs. Affects the cells that produce mucus, sweat, and digestive juices, making them thick and sticky.',
            symptomsKeywords: ['persistent cough', 'thick mucus', 'frequent lung infections', 'poor growth', 'salty skin', 'pancreatic insufficiency'],
            genetics: 'Autosomal recessive; mutation in CFTR gene.',
            implications: ['Chronic lung disease', 'digestive problems (malabsorption)', 'diabetes', 'infertility (males)', 'liver disease'],
            management: ['Mucus-thinning drugs', 'antibiotics for infections', 'pancreatic enzyme supplements', 'nutritional support', 'physiotherapy', 'CFTR modulators'],
        },
        'Sickle Cell Anemia': {
            description: 'A group of inherited red blood cell disorders. Red blood cells become misshapen (sickle-shaped), break down prematurely, and can block blood flow, causing pain and organ damage.',
            symptomsKeywords: ['fatigue', 'shortness of breath', 'pain crises', 'swelling in hands/feet', 'jaundice', 'increased infection risk', 'anemia'],
            genetics: 'Autosomal recessive; mutation in HBB gene.',
            implications: ['Chronic pain', 'organ damage (spleen, kidneys, lungs)', 'stroke', 'acute chest syndrome', 'vision problems'],
            management: ['Pain management', 'hydroxyurea', 'blood transfusions', 'bone marrow transplant (curative for some)', 'vaccinations to prevent infections'],
        },
        'Huntington\'s Disease': {
            description: 'A progressive neurodegenerative disorder that causes uncontrolled movements, cognitive decline, and psychiatric problems.',
            symptomsKeywords: ['involuntary jerking movements (chorea)', 'difficulty walking', 'speech problems', 'memory loss', 'mood changes', 'depression'],
            genetics: 'Autosomal dominant; mutation in HTT gene.',
            implications: ['Progressive physical and mental deterioration', 'loss of independence', 'increased risk of suicide'],
            management: ['Medications to manage symptoms (e.g., chorea)', 'physical/occupational/speech therapy', 'psychiatric care', 'genetic counseling for family'],
        },
        'Down Syndrome (Trisomy 21)': {
            description: 'A genetic disorder caused by the presence of all or part of a third copy of chromosome 21. It causes developmental and intellectual delays and can be associated with other health problems.',
            symptomsKeywords: ['intellectual disability', 'characteristic facial features (e.g., upward slanting eyes, flattened facial profile)', 'short stature', 'heart defects', 'hypotonia (low muscle tone)'],
            genetics: 'Chromosomal abnormality (extra copy of chromosome 21).',
            implications: ['Varying degrees of intellectual disability', 'increased risk of heart defects, thyroid problems, leukemia, Alzheimer\'s disease'],
            management: ['Early intervention therapies (physical, speech, occupational)', 'special education', 'medical management of associated conditions', 'supportive care'],
        },
        // Add more diseases as needed for variety
    };

    const caseStudies = [
        {
            name: 'Case #1: Liam M.',
            age: '6 years old',
            symptoms: 'Liam has experienced recurrent severe lung infections since infancy, often requiring hospitalization. His parents also report that he has trouble gaining weight despite eating a lot, and his skin sometimes tastes unusually salty when they kiss him. He frequently produces thick, sticky mucus.',
            familyHistory: 'No known family history of genetic disorders, though his parents are carriers of a specific gene mutation.',
            testResults: 'Sweat chloride test showed elevated chloride levels. Stool analysis revealed malabsorption of fats. Genetic testing confirmed a mutation in the CFTR gene.',
            correctDisease: 'Cystic Fibrosis'
        },
        {
            name: 'Case #2: Aisha K.',
            age: '12 years old',
            symptoms: 'Aisha frequently complains of extreme fatigue and shortness of breath, especially after minimal exertion. She has also experienced several episodes of severe, sudden pain in her joints and chest, which her doctors call "crises." Her eyes sometimes have a yellowish tint.',
            familyHistory: 'Her maternal grandfather also had a "blood disorder" that caused chronic pain.',
            testResults: 'Blood test revealed abnormally shaped red blood cells (sickle-shaped) and low hemoglobin levels. Genetic testing confirmed homozygous mutation in the HBB gene.',
            correctDisease: 'Sickle Cell Anemia'
        },
        {
            name: 'Case #3: Mr. David P.',
            age: '48 years old',
            symptoms: 'Mr. P\'s wife reports that he has recently started having uncontrollable, jerky movements in his arms and legs, often dropping things. He has also become increasingly irritable, forgetful, and struggles with planning daily tasks. His speech has become slurred.',
            familyHistory: 'His father experienced similar symptoms starting in his late 50s and gradually deteriorated.',
            testResults: 'MRI showed brain atrophy. Genetic testing revealed an expanded CAG repeat in the HTT gene.',
            correctDisease: 'Huntington\'s Disease'
        },
        // Add more case studies, ensuring they link to a defined geneticDisease
    ];

    // --- Initialization ---

    function loadCaseStudy(index) {
        if (index >= caseStudies.length) {
            caseNumberSpan.textContent = 'Complete!';
            patientName.textContent = 'All cases reviewed.';
            patientAge.textContent = '';
            patientSymptoms.textContent = '';
            patientFamilyHistory.textContent = '';
            patientTestResults.textContent = '';
            nextCaseButton.style.display = 'none';
            submitDiagnosisButton.style.display = 'none';
            implicationsSection.style.display = 'none';
            diseaseInfoRevealSection.style.display = 'none';
            diagnosisFeedback.textContent = 'Congratulations! You have completed all case studies.';
            diagnosisFeedback.classList.remove('feedback-correct', 'feedback-incorrect');
            diagnosisFeedback.classList.add('feedback-neutral');
            return;
        }

        const currentCase = caseStudies[index];
        caseNumberSpan.textContent = `#${index + 1}`;
        patientName.textContent = `Patient Name: ${currentCase.name}`;
        patientAge.textContent = `Age: ${currentCase.age}`;
        patientSymptoms.textContent = `Symptoms: ${currentCase.symptoms}`;
        patientFamilyHistory.textContent = `Family History: ${currentCase.familyHistory}`;
        patientTestResults.textContent = `Lab/Test Results: ${currentCase.testResults}`;

        // Reset UI for new case
        resetUI();
    }

    function populateDiseaseList() {
        diseaseList.innerHTML = '';
        Object.keys(geneticDiseases).forEach(diseaseName => {
            const listItem = document.createElement('li');
            listItem.textContent = diseaseName;
            listItem.dataset.disease = diseaseName;
            listItem.addEventListener('click', () => {
                // Remove 'selected' from previously selected item
                const previouslySelected = diseaseList.querySelector('.selected');
                if (previouslySelected) {
                    previouslySelected.classList.remove('selected');
                }
                // Add 'selected' to the clicked item
                listItem.classList.add('selected');
                selectedDisease = diseaseName;
            });
            diseaseList.appendChild(listItem);
        });
    }

    // --- Event Listeners ---

    submitDiagnosisButton.addEventListener('click', () => {
        if (!selectedDisease) {
            diagnosisFeedback.textContent = 'Please select a disease first!';
            diagnosisFeedback.classList.add('feedback-incorrect');
            return;
        }

        const correctDisease = caseStudies[currentCaseIndex].correctDisease;
        if (selectedDisease === correctDisease) {
            diagnosisFeedback.textContent = `Correct! You have identified ${correctDisease}.`;
            diagnosisFeedback.className = 'feedback-correct';
            implicationsSection.style.display = 'block'; // Show implications section
            submitDiagnosisButton.style.display = 'none'; // Hide diagnosis button
            nextCaseButton.style.display = 'inline-block'; // Show next case button
            revealDiseaseInfo(correctDisease); // Show detailed info
        } else {
            diagnosisFeedback.textContent = `Incorrect. You selected ${selectedDisease}. Try again!`;
            diagnosisFeedback.className = 'feedback-incorrect';
            implicationsSection.style.display = 'none'; // Hide implications if incorrect
            diseaseInfoRevealSection.style.display = 'none'; // Hide reveal
        }
    });

    checkImplicationsButton.addEventListener('click', () => {
        const userImplications1 = implicationInput1.value.trim().toLowerCase();
        const userImplications2 = implicationInput2.value.trim().toLowerCase();
        const correctDisease = caseStudies[currentCaseIndex].correctDisease;
        const diseaseData = geneticDiseases[correctDisease];

        // Simple check: see if some keywords from correct implications are present
        let score = 0;
        const totalKeywords = diseaseData.implications.length + diseaseData.management.length;
        let foundKeywords = [];

        diseaseData.implications.forEach(imp => {
            const keyword = imp.toLowerCase().split(' ')[0]; // Take first word as simple keyword
            if (userImplications1.includes(keyword) && !foundKeywords.includes(keyword)) {
                score++;
                foundKeywords.push(keyword);
            }
        });

        diseaseData.management.forEach(mgmt => {
            const keyword = mgmt.toLowerCase().split(' ')[0]; // Take first word as simple keyword
            if (userImplications2.includes(keyword) && !foundKeywords.includes(keyword)) {
                score++;
                foundKeywords.push(keyword);
            }
        });

        if (score > totalKeywords / 2) { // Arbitrary threshold for 'good'
            implicationsFeedback.textContent = 'Good job! Your suggestions are relevant.';
            implicationsFeedback.className = 'feedback-correct';
        } else if (score > 0) {
            implicationsFeedback.textContent = 'Your suggestions are partially relevant. Review the correct information below.';
            implicationsFeedback.className = 'feedback-neutral';
        } else {
            implicationsFeedback.textContent = 'Please provide some relevant implications and management strategies.';
            implicationsFeedback.className = 'feedback-incorrect';
        }
    });

    nextCaseButton.addEventListener('click', () => {
        currentCaseIndex++;
        loadCaseStudy(currentCaseIndex);
    });

    // --- Helper Functions ---

    function resetUI() {
        // Reset disease selection
        const previouslySelected = diseaseList.querySelector('.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }
        selectedDisease = null;

        // Reset feedbacks and sections
        diagnosisFeedback.textContent = '';
        diagnosisFeedback.className = '';
        implicationsFeedback.textContent = '';
        implicationsFeedback.className = '';

        implicationInput1.value = '';
        implicationInput2.value = '';

        implicationsSection.style.display = 'none';
        diseaseInfoRevealSection.style.display = 'none';
        nextCaseButton.style.display = 'none';
        submitDiagnosisButton.style.display = 'block'; // Show submit button for new case
    }

    function revealDiseaseInfo(diseaseName) {
        const diseaseData = geneticDiseases[diseaseName];
        revealDiseaseName.textContent = diseaseName;
        revealDiseaseDescription.textContent = diseaseData.description;

        revealDiseaseImplications.innerHTML = '';
        diseaseData.implications.forEach(imp => {
            const li = document.createElement('li');
            li.textContent = imp;
            revealDiseaseImplications.appendChild(li);
        });

        revealDiseasePrevention.innerHTML = '';
        diseaseData.management.forEach(mgmt => {
            const li = document.createElement('li');
            li.textContent = mgmt;
            revealDiseasePrevention.appendChild(li);
        });

        diseaseInfoRevealSection.style.display = 'block';
    }

    // Initial load
    populateDiseaseList();
    loadCaseStudy(currentCaseIndex);
});
```

---

### How to use these files:

1.  **Save them:**
    * Save the first block as `index.html`.
    * Save the second block as `style.css` in the same directory.
    * Save the third block as `script.js` in the same directory.
2.  **Open `index.html`:** Open the `index.html` file in your web browser.

### Game Features Explained:

1.  **Case Study Presentation:**
    * **Patient File:** Displays the patient's name, age, a detailed description of their symptoms, relevant family history, and key lab/test results. This mimics real-world medical records.
    * **Navigation:** A "Next Case" button (appears after correct diagnosis) allows students to move through a series of predefined case studies.

2.  **Disease Identification:**
    * **Disease List:** A scrollable list of potential genetic diseases. Students click to select one they believe matches the case study.
    * **Submit Diagnosis:** After selecting, students click this button to check their answer.
    * **Feedback:** Immediate feedback indicates whether the diagnosis was correct or incorrect.

3.  **Implications and Management (Interactive Text Area):**
    * **Prompted Input:** If the diagnosis is correct, a new section appears with text areas asking students to suggest:
        * Potential health implications for the patient.
        * Potential prevention or management strategies.
    * **Check Implications:** Students submit their written answers.
    * **Feedback:** Provides general feedback on the relevance of their suggestions. (Note: The keyword-based check is a simple implementation. A more robust solution would involve natural language processing or pre-defined grading criteria).

4.  **Correct Disease Information Reveal:**
    * After a correct diagnosis, and after students attempt the implications, a section expands to show comprehensive information about the correctly identified disease, including:
        * Its general description.
        * Key health implications.
        * Typical management and prevention strategies. This serves as an immediate learning reinforcement.

### Data Structure (`geneticDiseases` and `caseStudies`):

* `geneticDiseases` object: Stores detailed information about each genetic disease. This is crucial for verifying answers and providing educational content. Each disease entry includes:
    * `description`: A brief overview.
    * `symptomsKeywords`: An array of keywords found in the symptoms. (Could be used for more complex matching logic).
    * `genetics`: A brief note on the genetic basis.
    * `implications`: A list of health consequences.
    * `management`: A list of treatment or prevention methods.
* `caseStudies` array: Each object represents a unique patient scenario, linking to the `correctDisease` from the `geneticDiseases` object.

### Potential Enhancements:

* **More Sophisticated Implication Checking:** Instead of simple keyword matching, implement a system where students select from predefined options for implications/management, or use a more advanced text analysis (requires more complex JavaScript or a backend).
* **Difficulty Levels:** Introduce different levels of difficulty for case studies (e.g., more subtle symptoms, diseases with overlapping symptoms).
* **Scoring System:** Keep track of correct diagnoses and well-explained implications to give students a score at the end.
* **Search/Filter Disease List:** For a very long list of diseases, adding a search bar or filters would be helpful.
* **Visual Elements:** Incorporate images related to symptoms or genetic conditions (e.g., a diagram of sickle cells for Sickle Cell Anemia).
* **Interactive Diagrams:** For the "reveal" section, include simple diagrams of chromosome abnormalities or gene mutations relevant to the disease.
* **Pre-quiz/Post-quiz:** Add small quizzes before or after a case to test understanding.
* **Printable Summary:** Allow students to print a summary of a case study with their diagnosis and the correct information.
* **Audio Narration:** Add optional audio narration for case studies or disease descriptions.

```
แหล่งที่มา:
1. https://github.com/arcturusX1/PetBuddy_CSE470_Project_Group5
2. https://quizlet.com/616219863/exam-1-pe-488-flash-cards/