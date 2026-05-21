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

// แหล่งที่มา:
// 1. https://github.com/arcturusX1/PetBuddy_CSE470_Project_Group5
// 2. https://quizlet.com/616219863/exam-1-pe-488-flash-cards/