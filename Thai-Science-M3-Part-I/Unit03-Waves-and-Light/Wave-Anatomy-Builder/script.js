document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable-label');
    const dropTargets = document.querySelectorAll('.drop-target');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');
    const initialLabelsContainer = document.querySelector('.labels-container');

    let draggedItem = null;

    // Store initial positions of labels for reset
    const initialLabelPositions = {};
    draggables.forEach(label => {
        initialLabelPositions[label.id] = {
            parent: label.parentElement.id, // Store parent container ID
            index: Array.from(label.parentElement.children).indexOf(label) // Store original index
        };
    });

    draggables.forEach(label => {
        label.addEventListener('dragstart', (e) => {
            draggedItem = label;
            e.dataTransfer.setData('text/plain', label.id); // Set data for transfer
            label.classList.add('dragging');
        });

        label.addEventListener('dragend', () => {
            label.classList.remove('dragging');
            draggedItem = null;
        });
    });

    dropTargets.forEach(target => {
        target.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            target.style.borderColor = '#0056b3'; // Highlight target
        });

        target.addEventListener('dragleave', () => {
            target.style.borderColor = '#007bff'; // Revert highlight
        });

        target.addEventListener('drop', (e) => {
            e.preventDefault();
            target.style.borderColor = '#007bff'; // Revert highlight

            if (draggedItem && !target.hasChildNodes()) { // Only drop if target is empty
                target.appendChild(draggedItem);
                draggedItem.style.position = 'relative'; // Reset positioning after drop
                draggedItem.style.top = 'unset';
                draggedItem.style.left = 'unset';
                draggedItem.style.transform = 'unset';
            }
        });
    });

    checkButton.addEventListener('click', () => {
        let allCorrect = true;
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');

        dropTargets.forEach(target => {
            const partExpected = target.dataset.part;
            const labelInside = target.querySelector('.draggable-label');

            if (labelInside) {
                const partDropped = labelInside.dataset.part;
                if (partExpected === partDropped) {
                    labelInside.style.backgroundColor = '#28a745'; // Correct color
                } else {
                    labelInside.style.backgroundColor = '#dc3545'; // Incorrect color
                    allCorrect = false;
                }
            } else {
                // If a target is empty, it's incorrect (or at least incomplete)
                allCorrect = false;
            }
        });

        if (allCorrect) {
            feedbackDiv.textContent = 'Excellent! All labels are correct!';
            feedbackDiv.classList.add('correct');
        } else {
            feedbackDiv.textContent = 'Some labels are incorrect or missing. Keep trying!';
            feedbackDiv.classList.add('incorrect');
        }
    });

    resetButton.addEventListener('click', () => {
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');

        // Move all labels back to the initial labels container
        draggables.forEach(label => {
            initialLabelsContainer.appendChild(label);
            label.style.backgroundColor = '#007bff'; // Reset color
            label.style.position = 'relative'; // Ensure relative positioning in the initial container
            label.style.top = 'unset';
            label.style.left = 'unset';
            label.style.transform = 'unset';
        });

        // Clear any labels accidentally left in drop targets (shouldn't happen with correct logic)
        dropTargets.forEach(target => {
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }
        });

        // Re-append labels in their original order (optional, but good for consistency)
        const sortedLabels = Array.from(draggables).sort((a, b) => {
            const indexA = initialLabelPositions[a.id].index;
            const indexB = initialLabelPositions[b.id].index;
            return indexA - indexB;
        });
        sortedLabels.forEach(label => initialLabelsContainer.appendChild(label));
    });
});

// แหล่งที่มา:
// 1. https://www.zhaoping.com/i/542.html
// 2. https://github.com/n3ur0m4ncr/n3ur0m4ncrr.github.io