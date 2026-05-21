document.addEventListener('DOMContentLoaded', () => {
    const paletteItems = document.getElementById('palette-items');
    const circuitBoard = document.getElementById('circuit-board');
    const simulateButton = document.getElementById('simulate-button');
    const resetButton = document.getElementById('reset-button');
    const feedbackDiv = document.getElementById('feedback');
    const placeholder = circuitBoard.querySelector('.placeholder');

    let draggedComponent = null;
    let placedComponents = []; // Stores objects { element: DOM_Element, type: string, x: number, y: number }

    // --- Drag and Drop Logic ---

    // Make components in palette draggable
    paletteItems.querySelectorAll('.component').forEach(component => {
        component.addEventListener('dragstart', (e) => {
            draggedComponent = component;
            e.dataTransfer.setData('text/plain', component.dataset.type); // Store component type
            e.dataTransfer.setDragImage(component, 0, 0); // Optional: improves drag visual
            component.classList.add('dragging');
        });

        component.addEventListener('dragend', () => {
            component.classList.remove('dragging');
            draggedComponent = null;
        });
    });

    // Make circuit board a drop zone
    circuitBoard.addEventListener('dragover', (e) => {
        e.preventDefault(); // Allow drop
        circuitBoard.classList.add('drag-over');
    });

    circuitBoard.addEventListener('dragleave', () => {
        circuitBoard.classList.remove('drag-over');
    });

    circuitBoard.addEventListener('drop', (e) => {
        e.preventDefault();
        circuitBoard.classList.remove('drag-over');

        if (draggedComponent) {
            // Remove placeholder if present
            if (placeholder) {
                placeholder.style.display = 'none';
            }

            // Create a new component instance for the board
            const newComponent = createDroppedComponent(draggedComponent.dataset.type, draggedComponent.dataset.state);

            // Calculate position relative to the circuit board
            const boardRect = circuitBoard.getBoundingClientRect();
            let x = e.clientX - boardRect.left - (newComponent.offsetWidth / 2);
            let y = e.clientY - boardRect.top - (newComponent.offsetHeight / 2);

            // Keep within board boundaries (optional, but good for UX)
            x = Math.max(0, Math.min(x, boardRect.width - newComponent.offsetWidth));
            y = Math.max(0, Math.min(y, boardRect.height - newComponent.offsetHeight));

            newComponent.style.left = `${x}px`;
            newComponent.style.top = `${y}px`;

            circuitBoard.appendChild(newComponent);
            placedComponents.push({
                element: newComponent,
                type: newComponent.dataset.type,
                x: x,
                y: y,
                state: newComponent.dataset.state // Store switch state if applicable
            });

            // Make the new component draggable on the board
            makeComponentMovable(newComponent);
            feedbackDiv.textContent = ''; // Clear feedback on new component placement
            feedbackDiv.classList.remove('success', 'error');
        }
    });

    function createDroppedComponent(type, state = '') {
        const div = document.createElement('div');
        div.classList.add('component', 'dropped-component', type);
        div.dataset.type = type;

        // Set dimensions consistent with palette for easy recognition
        if (type === 'lightbulb') {
            div.style.width = '60px';
            div.style.height = '60px';
        } else if (type === 'switch') {
            div.style.width = '80px';
            div.style.height = '40px';
            div.dataset.state = state || 'open'; // Default to open
            div.classList.add(div.dataset.state); // Add class for styling
            div.addEventListener('click', toggleSwitch); // Add click listener for switch
        } else {
            div.style.width = '100px'; // Default width for wires/batteries
            div.style.height = '60px'; // Default height for wires/batteries
        }

        // Add text labels if needed (e.g., "+" and "-" for battery)
        if (type === 'battery') {
             div.innerHTML = '<span style="position:absolute; left: 5px;">+</span><span style="position:absolute; right: 5px;">-</span>';
             div.dataset.polarity = 'positive'; // Convention: left is positive, right is negative
        } else if (type === 'lightbulb') {
            div.textContent = 'Bulb';
        } else if (type === 'wire') {
            div.textContent = 'Wire';
        } else if (type === 'switch') {
             // Styling handled by ::before pseudo-element
        }

        return div;
    }

    function makeComponentMovable(componentElement) {
        let offsetX, offsetY;

        componentElement.addEventListener('mousedown', (e) => {
            if (e.target === componentElement || e.target.classList.contains('component')) {
                draggedComponent = componentElement;
                offsetX = e.clientX - componentElement.getBoundingClientRect().left;
                offsetY = e.clientY - componentElement.getBoundingClientRect().top;
                componentElement.classList.add('dragging');
                e.stopPropagation(); // Prevent board from detecting drag if moving component
            }
        });

        circuitBoard.addEventListener('mousemove', (e) => {
            if (draggedComponent && draggedComponent === componentElement) {
                const boardRect = circuitBoard.getBoundingClientRect();
                let x = e.clientX - boardRect.left - offsetX;
                let y = e.clientY - boardRect.top - offsetY;

                // Keep within board boundaries
                x = Math.max(0, Math.min(x, boardRect.width - draggedComponent.offsetWidth));
                y = Math.max(0, Math.min(y, boardRect.height - draggedComponent.offsetHeight));

                draggedComponent.style.left = `${x}px`;
                draggedComponent.style.top = `${y}px`;

                // Update stored position
                const index = placedComponents.findIndex(p => p.element === draggedComponent);
                if (index !== -1) {
                    placedComponents[index].x = x;
                    placedComponents[index].y = y;
                }
            }
        });

        circuitBoard.addEventListener('mouseup', () => {
            if (draggedComponent && draggedComponent === componentElement) {
                draggedComponent.classList.remove('dragging');
                draggedComponent = null;
            }
        });
    }

    function toggleSwitch(e) {
        const sw = e.currentTarget;
        if (sw.dataset.state === 'open') {
            sw.dataset.state = 'closed';
            sw.classList.remove('open');
            sw.classList.add('closed');
        } else {
            sw.dataset.state = 'open';
            sw.classList.remove('closed');
            sw.classList.add('open');
        }
        // Update the state in placedComponents array
        const index = placedComponents.findIndex(p => p.element === sw);
        if (index !== -1) {
            placedComponents[index].state = sw.dataset.state;
        }
        // If the circuit was lit, turn it off if switch opens
        if (sw.dataset.state === 'open' && document.querySelector('.lightbulb.on')) {
            document.querySelector('.lightbulb').classList.remove('on');
            feedbackDiv.textContent = "Circuit is open. Bulb is off.";
            feedbackDiv.classList.add('error');
            feedbackDiv.classList.remove('success');
        }
    }


    // --- Circuit Simulation Logic ---

    simulateButton.addEventListener('click', simulateCircuit);
    resetButton.addEventListener('click', resetBoard);

    function resetBoard() {
        circuitBoard.innerHTML = ''; // Clear all components
        if (placeholder) {
            placeholder.style.display = 'block'; // Show placeholder again
        }
        placedComponents = [];
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('success', 'error');
    }

    function simulateCircuit() {
        feedbackDiv.textContent = '';
        feedbackDiv.classList.remove('success', 'error');
        // Turn off all bulbs first
        document.querySelectorAll('.lightbulb').forEach(bulb => bulb.classList.remove('on'));

        if (placedComponents.length === 0) {
            feedbackDiv.textContent = "No components on the board!";
            feedbackDiv.classList.add('error');
            return;
        }

        const batteries = placedComponents.filter(c => c.type === 'battery');
        const lightbulbs = placedComponents.filter(c => c.type === 'lightbulb');
        const switches = placedComponents.filter(c => c.type === 'switch');
        const wires = placedComponents.filter(c => c.type === 'wire');

        if (batteries.length === 0) {
            feedbackDiv.textContent = "A circuit needs a power source (battery)!";
            feedbackDiv.classList.add('error');
            return;
        }
        if (lightbulbs.length === 0) {
            feedbackDiv.textContent = "A circuit needs an electrical device (light bulb)!";
            feedbackDiv.classList.add('error');
            return;
        }
        if (switches.some(s => s.state === 'open')) {
            feedbackDiv.textContent = "Switch is open! Close all switches to complete the circuit.";
            feedbackDiv.classList.add('error');
            return;
        }


        // Simplified circuit detection based on proximity and component count
        // This is a *very* basic heuristic. A robust circuit simulator requires
        // graph traversal algorithms (BFS/DFS) on component connection points.

        // Heuristic: Check for a plausible "series" circuit or simple closed loop
        // Needs at least one battery, one bulb, one switch (closed), and enough wires
        if (batteries.length >= 1 && lightbulbs.length >= 1 && switches.every(s => s.state === 'closed')) {
            // Check if components are "close enough" to form a loop
            // A simple way is to check the bounding boxes.
            // For a series circuit, all components must connect sequentially.
            // For parallel, multiple branches.

            // This basic simulation will only check for a single, full series circuit.
            // More complex logic would involve creating a graph of connections.

            let totalComponents = batteries.length + lightbulbs.length + switches.length + wires.length;

            // If only one of each main component, assume simple series check
            if (batteries.length === 1 && lightbulbs.length === 1 && switches.length <= 1) {
                // Check if components roughly form a loop.
                // This is still very basic and prone to false positives/negatives.
                // A better approach involves creating explicit connection points (terminals)
                // for each component and checking if they are linked.

                // For a highly simplified check:
                // Check if a bulb is relatively close to a battery AND a switch
                const battery = batteries[0];
                const bulb = lightbulbs[0];
                const sw = switches[0] || null; // Might not have a switch

                const distBatteryBulb = Math.sqrt(
                    Math.pow(battery.x - bulb.x, 2) + Math.pow(battery.y - bulb.y, 2)
                );

                const threshold = 200; // Arbitrary distance threshold for "connection"

                let circuitLikely = false;

                if (sw) {
                    const distBulbSwitch = Math.sqrt(
                        Math.pow(bulb.x - sw.x, 2) + Math.pow(bulb.y - sw.y, 2)
                    );
                    const distSwitchBattery = Math.sqrt(
                        Math.pow(sw.x - battery.x, 2) + Math.pow(sw.y - battery.y, 2)
                    );

                    // If all are "close enough" in a triangle, assume circuit. Very rough.
                    if (distBatteryBulb < threshold * 2 && distBulbSwitch < threshold * 2 && distSwitchBattery < threshold * 2) {
                        circuitLikely = true;
                    }
                } else { // No switch, just battery and bulb
                    if (distBatteryBulb < threshold * 2) { // Just check if battery and bulb are near
                        circuitLikely = true;
                    }
                }

                // Also need to ensure wires are present to bridge gaps, but for simplicity,
                // we'll just say "if they're roughly connected and all main components are there".
                // The number of wires should roughly match the gaps.
                if (circuitLikely && wires.length >= (sw ? 3 : 2)) { // At least 2 wires for battery-bulb-wire-wire-battery, or 3 for switch
                     // This is where actual circuit logic (like DFS/BFS on nodes) would go.
                     // For now, we light the bulb if the heuristic passes.
                    lightbulbs.forEach(bulb => bulb.element.classList.add('on'));
                    feedbackDiv.textContent = "Circuit complete and closed! The bulb lights up!";
                    feedbackDiv.classList.add('success');
                } else {
                     feedbackDiv.textContent = "Circuit might be incomplete or poorly connected. Try connecting all components in a loop!";
                     feedbackDiv.classList.add('error');
                }

            } else if (batteries.length >= 1 && lightbulbs.length >= 1 && switches.every(s => s.state === 'closed')) {
                // More than one of a type, implies potential parallel or more complex series
                // For this simplified game, we'll give a general positive feedback if essentials are met.
                // A true parallel simulation is complex.
                feedbackDiv.textContent = "Basic circuit components are present and switches are closed. This could be a working circuit!";
                feedbackDiv.classList.add('success');
                lightbulbs.forEach(bulb => bulb.element.classList.add('on'));

            } else {
                 feedbackDiv.textContent = "Circuit is incomplete. Make sure you have a battery, light bulb, and closed switches, all connected!";
                 feedbackDiv.classList.add('error');
            }


        } else {
            feedbackDiv.textContent = "Circuit is incomplete. Make sure you have a battery, light bulb, and closed switches, all connected!";
            feedbackDiv.classList.add('error');
        }
    }
});

// แหล่งที่มา:
// 1. https://github.com/TristonBabers/Portfolio-Website