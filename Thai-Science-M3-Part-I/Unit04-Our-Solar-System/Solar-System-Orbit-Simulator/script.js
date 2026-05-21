document.addEventListener('DOMContentLoaded', () => {
    // --- Part 1: Planetary Orbit Simulator ---
    const orbitingPlanet = document.getElementById('orbiting-planet');
    const toggleOrbitButton = document.getElementById('toggle-orbit-animation');
    let isOrbiting = true; // Initial state

    // Start animation on load
    orbitingPlanet.classList.add('animating');

    toggleOrbitButton.addEventListener('click', () => {
        if (isOrbiting) {
            orbitingPlanet.style.animationPlayState = 'paused';
            toggleOrbitButton.textContent = 'Resume Orbit';
        } else {
            orbitingPlanet.style.animationPlayState = 'running';
            toggleOrbitButton.textContent = 'Pause Orbit';
        }
        isOrbiting = !isOrbiting;
    });


    // --- Part 2: Earth's Tilt and Seasons Simulator ---
    const seasonsOrbitPath = document.getElementById('seasons-orbit-path');
    const seasonsControls = document.querySelector('.seasons-controls');
    const currentSeasonDisplay = document.getElementById('current-season');

    // Earth positions for distinct seasons (using radians for calculations)
    // Values are approximate for visual representation on a circle.
    // Top-left is 0,0, so adjusting positions to be relative to center.
    const earthPositions = [
        { name: 'winter', month: 'December', x: 275, y: 50, img: 'earth_winter.png' },  // Northern Hemisphere tilted away
        { name: 'spring', month: 'March', x: 500, y: 275, img: 'earth_spring.png' },   // Equinox
        { name: 'summer', month: 'June', x: 275, y: 500, img: 'earth_summer.png' },   // Northern Hemisphere tilted towards
        { name: 'autumn', month: 'September', x: 50, y: 275, img: 'earth_autumn.png' }  // Equinox
    ];

    let activeEarthElement = null; // To keep track of the currently dragged/clicked Earth
    let isDragging = false;

    function renderEarths() {
        seasonsOrbitPath.innerHTML = ''; // Clear previous Earths

        const containerRect = seasonsOrbitPath.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        const radius = containerRect.width / 2 - 60; // Adjust for Earth image size

        earthPositions.forEach(posData => {
            const earthDiv = document.createElement('img');
            earthDiv.src = posData.img;
            earthDiv.alt = `Earth in ${posData.name}`;
            earthDiv.classList.add('earth-position');
            earthDiv.dataset.season = posData.name;
            earthDiv.dataset.month = posData.month;

            // Calculate actual pixel positions based on circular orbit
            // We use sin/cos for circular positioning, but adjust the initial setup's fixed points
            // For a perfect circle, use (centerX + radius * cos(angle)), (centerY + radius * sin(angle))
            // Here, we're using fixed x,y from earthPositions array, which makes the layout fixed.
            // If you want true circular drag, the logic below would need to calculate angle.

            // Set initial position based on pre-defined x,y
            earthDiv.style.left = `${posData.x}px`;
            earthDiv.style.top = `${posData.y}px`;

            seasonsOrbitPath.appendChild(earthDiv);

            // Add event listeners for direct clicks
            earthDiv.addEventListener('click', () => {
                selectEarthPosition(earthDiv);
            });

            // Add drag functionality
            earthDiv.addEventListener('mousedown', (e) => {
                isDragging = true;
                draggedElement = earthDiv;
                draggedElement.classList.add('active-season'); // Highlight while dragging

                let shiftX = e.clientX - earthDiv.getBoundingClientRect().left;
                let shiftY = e.clientY - earthDiv.getBoundingClientRect().top;

                function moveAt(pageX, pageY) {
                    let newLeft = pageX - shiftX;
                    let newTop = pageY - shiftY;

                    // Constrain to the circular path (conceptually for a simple drag)
                    // This is a simplified constraint: find point on circle closest to mouse
                    const newX = newLeft + earthDiv.offsetWidth / 2; // Center of earth
                    const newY = newTop + earthDiv.offsetHeight / 2;

                    const dx = newX - centerX;
                    const dy = newY - centerY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > 0) { // Avoid division by zero
                        const ratio = radius / dist;
                        earthDiv.style.left = `${centerX + dx * ratio - earthDiv.offsetWidth / 2}px`;
                        earthDiv.style.top = `${centerY + dy * ratio - earthDiv.offsetHeight / 2}px`;

                        // Update season display based on approximate angle
                        const angle = Math.atan2(dy, dx); // Angle from center to earth
                        updateSeasonDisplay(angle);
                    }
                }

                function onMouseMove(event) {
                    if (isDragging) {
                        moveAt(event.pageX, event.pageY);
                    }
                }

                document.addEventListener('mousemove', onMouseMove);

                draggedElement.onmouseup = () => {
                    isDragging = false;
                    draggedElement.classList.remove('active-season'); // Remove highlight after drag
                    document.removeEventListener('mousemove', onMouseMove);
                    draggedElement.onmouseup = null;
                    selectEarthPosition(draggedElement); // Set exact position to closest snap point
                };
            });

            earthDiv.ondragstart = () => false; // Prevent default browser drag behavior
        });
    }

    function selectEarthPosition(selectedEarthDiv) {
        // Remove active class from previously selected Earth
        if (activeEarthElement) {
            activeEarthElement.classList.remove('active-season');
        }
        activeEarthElement = selectedEarthDiv;
        selectedEarthDiv.classList.add('active-season');

        currentSeasonDisplay.textContent = `${selectedEarthDiv.dataset.month} (${selectedEarthDiv.dataset.season.charAt(0).toUpperCase() + selectedEarthDiv.dataset.season.slice(1)} in N. H.)`;

        // Snap to predefined positions for clarity
        const selectedPosData = earthPositions.find(p => p.name === selectedEarthDiv.dataset.season);
        if (selectedPosData) {
            selectedEarthDiv.style.left = `${selectedPosData.x}px`;
            selectedEarthDiv.style.top = `${selectedPosData.y}px`;
        }
    }

    function updateSeasonDisplay(angle) {
        // Simplified mapping from angle to season
        // 0 (right) to PI/2 (bottom) to PI (left) to 3PI/2 (top) to 2PI (right)
        // Adjust for typical coordinate system vs. astronomical models
        let seasonName = 'Unknown';
        let monthName = '';

        // Angles:
        // Winter (Dec): ~-PI/2 (top) or 3PI/2
        // Spring (Mar): ~0 (right)
        // Summer (June): ~PI/2 (bottom)
        // Autumn (Sep): ~PI (left)

        // Convert angle to be 0-2PI
        if (angle < 0) angle += 2 * Math.PI;

        if (angle >= 0 && angle < Math.PI / 4) { // Around right (March)
            seasonName = 'Spring'; monthName = 'March';
        } else if (angle >= Math.PI / 4 && angle < 3 * Math.PI / 4) { // Around bottom (June)
            seasonName = 'Summer'; monthName = 'June';
        } else if (angle >= 3 * Math.PI / 4 && angle < 5 * Math.PI / 4) { // Around left (September)
            seasonName = 'Autumn'; monthName = 'September';
        } else if (angle >= 5 * Math.PI / 4 && angle <= 2 * Math.PI) { // Around top (December)
            seasonName = 'Winter'; monthName = 'December';
        }

        // Snap to nearest defined season if dragged close
        const closestSeason = earthPositions.reduce((prev, curr) => {
            const dx = (parseFloat(selectedEarthDiv.style.left) + selectedEarthDiv.offsetWidth / 2) - curr.x;
            const dy = (parseFloat(selectedEarthDiv.style.top) + selectedEarthDiv.offsetHeight / 2) - curr.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            return (dist < prev.dist) ? { dist, season: curr.name, month: curr.month } : prev;
        }, { dist: Infinity });


        currentSeasonDisplay.textContent = `${closestSeason.month} (${closestSeason.season.charAt(0).toUpperCase() + closestSeason.season.slice(1)} in N. H.)`;
    }


    seasonsControls.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const seasonName = e.target.dataset.position;
            const targetEarth = document.querySelector(`.earth-position[data-season="${seasonName}"]`);
            if (targetEarth) {
                selectEarthPosition(targetEarth);
            }
        }
    });

    // Initial render of Earths for seasons
    renderEarths();
});

// แหล่งที่มา:
// 1. https://github.com/Aadarshs12/Solar-System
// 2. https://github.com/AbrahamEstrada27/examen372
// 3. https://github.com/AlgoHussle/nomad-blog
// 4. https://github.com/Geicomo/Geicomo.com