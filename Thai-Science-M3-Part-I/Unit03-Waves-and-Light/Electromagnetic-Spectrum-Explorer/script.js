document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable-item');
    const spectrumBands = document.querySelectorAll('.spectrum-band');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');
    const initialItemsContainer = document.querySelector('.items-to-drag-container');

    let draggedItem = null;

    // Store initial parent and order for reset
    const initialItemStates = new Map(); // Map to store {element: {parent: element, nextSibling: element}}
    draggables.forEach(item => {
        initialItemStates.set(item, {
            parent: item.parentElement,
            nextSibling: item.nextElementSibling // Store the element that was originally after it
        });
    });

    draggables.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            e.dataTransfer.setData('text/plain', item.dataset.type); // Set the expected type
            item.classList.add('dragging');
            feedbackDiv.textContent = ''; // Clear feedback when dragging starts
            feedbackDiv.classList.remove('correct', 'incorrect');
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            draggedItem = null;
        });
    });

    spectrumBands.forEach(band => {
        const droppedItemsContainer = band.querySelector('.dropped-items');

        droppedItemsContainer.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            band.classList.add('drag-over');
        });

        droppedItemsContainer.addEventListener('dragleave', () => {
            band.classList.remove('drag-over');
        });

        droppedItemsContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            band.classList.remove('drag-over');

            if (draggedItem) {
                // Remove from its previous parent if it was already dropped
                if (draggedItem.parentElement && draggedItem.parentElement.classList.contains('dropped-items')) {
                    draggedItem.parentElement.removeChild(draggedItem);
                }
                droppedItemsContainer.appendChild(draggedItem);
                draggedItem.style.position = 'relative'; // Reset positioning after drop
                draggedItem.style.top = 'unset';
                draggedItem.style.left = 'unset';
                draggedItem.style.transform = 'unset';
            }
        });
    });

    checkButton.addEventListener('click', () => {
        let allCorrect = true;
        let correctCount = 0;
        let totalItems = draggables.length;

        draggables.forEach(item => {
            const currentParent = item.parentElement;
            const expectedType = item.dataset.type;

            if (currentParent && currentParent.classList.contains('dropped-items')) {
                const parentBand = currentParent.closest('.spectrum-band');
                const bandType = parentBand.dataset.spectrumType;

                if (expectedType === bandType) {
                    item.classList.add('correct');
                    item.classList.remove('incorrect');
                    correctCount++;
                } else {
                    item.classList.add('incorrect');
                    item.classList.remove('correct');
                    allCorrect = false;
                }
            } else {
                // Item is not in any drop zone (still in initial container or outside)
                item.classList.remove('correct', 'incorrect'); // Clear previous feedback
                allCorrect = false; // Missing items mean not all correct
            }
        });

        if (allCorrect && correctCount === totalItems) {
            feedbackDiv.textContent = `Fantastic! All ${correctCount} items are correctly placed!`;
            feedbackDiv.classList.add('correct');
        } else {
            feedbackDiv.textContent = `You got ${correctCount} out of ${totalItems} correct. Keep trying!`;
            feedbackDiv.classList.add('incorrect');
        }
    });

    resetButton.addEventListener('click', () => {
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('correct', 'incorrect');

        // Reset all draggables to their initial container and state
        draggables.forEach(item => {
            const initialState = initialItemStates.get(item);
            item.classList.remove('correct', 'incorrect'); // Clear color feedback

            // Re-insert into its original parent at its original position
            if (initialState.nextSibling) {
                initialState.parent.insertBefore(item, initialState.nextSibling);
            } else {
                initialState.parent.appendChild(item);
            }

            item.style.position = 'relative'; // Reset any inline styles from dragging
            item.style.top = 'unset';
            item.style.left = 'unset';
            item.style.transform = 'unset';
        });

        // Clear any highlight on drop targets
        spectrumBands.forEach(band => {
            band.classList.remove('drag-over');
        });
    });
});

// แหล่งที่มา:
// 1. https://github.com/Alan-Fernandez/kong_webhook