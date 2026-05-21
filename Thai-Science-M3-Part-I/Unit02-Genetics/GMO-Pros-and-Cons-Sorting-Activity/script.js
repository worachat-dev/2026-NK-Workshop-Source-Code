document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const statementsBank = document.getElementById('statements-bank');
    const gmoBenefitsTarget = document.getElementById('gmo-benefits');
    const gmoDrawbacksTarget = document.getElementById('gmo-drawbacks');
    const checkSortButton = document.getElementById('check-sort');
    const resetSortButton = document.getElementById('reset-sort');
    const sortFeedback = document.getElementById('sort-feedback');

    // Data: GMO Statements
    // 'type': 'benefit' or 'drawback'
    const gmoStatements = [
        { id: 's1', text: 'Increased crop yields for more food production.', type: 'benefit' },
        { id: 's2', text: 'Reduced need for pesticides and herbicides.', type: 'benefit' },
        { id: 's3', text: 'Enhanced nutritional content (e.g., Vitamin A enriched rice).', type: 'benefit' },
        { id: 's4', text: 'Improved resistance to pests and diseases.', type: 'benefit' },
        { id: 's5', text: 'Potential for allergen transfer to new foods.', type: 'drawback' },
        { id: 's6', text: 'Concerns about long-term human health impacts.', type: 'drawback' },
        { id: 's7', text: 'Development of herbicide-resistant weeds (superweeds).', type: 'drawback' },
        { id: 's8', text: 'Loss of biodiversity in natural plant populations.', type: 'drawback' },
        { id: 's9', text: 'Extended shelf life of produce, reducing food waste.', type: 'benefit' },
        { id: 's10', text: 'Cost savings for farmers due to fewer chemical inputs.', type: 'benefit' },
        { id: 's11', text: 'Potential for gene flow to wild relatives of crops.', type: 'drawback' },
        { id: 's12', text: 'Ethical concerns about manipulating natural organisms.', type: 'drawback' },
        { id: 's13', text: 'Faster development of new plant varieties.', type: 'benefit' },
        { id: 's14', text: 'Ability to grow crops in challenging environmental conditions.', type: 'benefit' },
        { id: 's15', text: 'Reduced carbon footprint through less tillage.', type: 'benefit' },
    ];

    // Game State
    let draggedItem = null; // Stores the currently dragged element

    // --- Initialization ---

    function loadStatements() {
        statementsBank.innerHTML = '<h3>Statements to Sort</h3>'; // Clear previous statements
        // Shuffle the statements to vary the order each time
        const shuffledStatements = [...gmoStatements].sort(() => Math.random() - 0.5);

        shuffledStatements.forEach(statement => {
            const div = document.createElement('div');
            div.classList.add('draggable-statement');
            div.textContent = statement.text;
            div.setAttribute('draggable', 'true');
            div.dataset.id = statement.id; // Store ID for identification
            div.dataset.type = statement.type; // Store type for checking
            statementsBank.appendChild(div);

            div.addEventListener('dragstart', (e) => {
                draggedItem = e.target;
                e.dataTransfer.setData('text/plain', e.target.dataset.id);
                // Add a class for visual feedback during drag
                setTimeout(() => { draggedItem.style.opacity = '0.5'; }, 0);
            });

            div.addEventListener('dragend', () => {
                draggedItem.style.opacity = '1';
                draggedItem = null;
            });
        });
    }

    // --- Drag & Drop Event Listeners ---

    [gmoBenefitsTarget, gmoDrawbacksTarget].forEach(target => {
        target.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            target.classList.add('drag-over');
        });

        target.addEventListener('dragleave', () => {
            target.classList.remove('drag-over');
        });

        target.addEventListener('drop', (e) => {
            e.preventDefault();
            target.classList.remove('drag-over');
            const statementId = e.dataTransfer.getData('text/plain');
            const statementElement = document.querySelector(`.draggable-statement[data-id="${statementId}"]`);

            if (statementElement && target.contains(e.target)) { // Ensure drop happened inside the target
                // Remove from previous parent (statementsBank or other target)
                statementElement.parentNode.removeChild(statementElement);
                // Append to new target
                target.appendChild(statementElement);
            }
        });
    });

    // --- Check and Reset Logic ---

    checkSortButton.addEventListener('click', () => {
        let correctCount = 0;
        let totalCount = gmoStatements.length;

        // Check benefits target
        gmoBenefitsTarget.querySelectorAll('.draggable-statement').forEach(statement => {
            if (statement.dataset.type === 'benefit') {
                correctCount++;
            }
        });

        // Check drawbacks target
        gmoDrawbacksTarget.querySelectorAll('.draggable-statement').forEach(statement => {
            if (statement.dataset.type === 'drawback') {
                correctCount++;
            }
        });

        if (correctCount === totalCount && 
            gmoBenefitsTarget.children.length - 1 === gmoStatements.filter(s => s.type === 'benefit').length &&
            gmoDrawbacksTarget.children.length - 1 === gmoStatements.filter(s => s.type === 'drawback').length) { // -1 for h3 element
            
            sortFeedback.textContent = `Excellent! You sorted all ${correctCount} statements correctly.`;
            sortFeedback.className = 'feedback-correct';
        } else {
            sortFeedback.textContent = `You got ${correctCount} out of ${totalCount} statements correct. Keep trying!`;
            sortFeedback.className = 'feedback-incorrect';
        }
    });

    resetSortButton.addEventListener('click', () => {
        gmoBenefitsTarget.innerHTML = '<h3>Benefits of GMOs</h3>';
        gmoDrawbacksTarget.innerHTML = '<h3>Drawbacks of GMOs</h3>';
        sortFeedback.textContent = '';
        sortFeedback.className = '';
        loadStatements(); // Reload all statements into the bank
    });

    // Initial load of statements
    loadStatements();
});