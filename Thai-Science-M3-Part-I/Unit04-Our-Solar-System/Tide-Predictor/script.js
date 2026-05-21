document.addEventListener('DOMContentLoaded', () => {
    const sun = document.querySelector('.sun');
    const earth = document.querySelector('.earth');
    const moon = document.querySelector('.moon');
    const earthMoonSystem = document.querySelector('.earth-moon-system');
    const moonOrbitPath = document.querySelector('.moon-orbit-path');
    const tideMarkers = document.querySelectorAll('.tide-marker');
    const nextAlignmentButton = document.getElementById('next-alignment-button');
    const tideButtons = document.querySelectorAll('.tide-button');
    const checkPredictionButton = document.getElementById('check-prediction-button');
    const predictionFeedback = document.getElementById('prediction-feedback');
    const tideExplanation = document.getElementById('tide-explanation');
    const restartButton = document.getElementById('restart-button');
    const selectedLocationName = document.getElementById('selected-location-name');

    // Define Moon positions (angles in degrees relative to Sun-Earth line)
    // 0 degrees: New Moon (Moon between Sun and Earth)
    // 90 degrees: First Quarter
    // 180 degrees: Full Moon (Earth between Sun and Moon)
    // 270 degrees: Third Quarter
    const moonAlignments = [
        { angle: 0, phase: 'New Moon', type: 'spring' },
        { angle: 45, phase: 'Waxing Crescent', type: 'intermediate' },
        { angle: 90, phase: 'First Quarter', type: 'neap' },
        { angle: 135, phase: 'Waxing Gibbous', type: 'intermediate' },
        { angle: 180, phase: 'Full Moon', type: 'spring' },
        { angle: 225, phase: 'Waning Gibbous', type: 'intermediate' },
        { angle: 270, phase: 'Third Quarter', type: 'neap' },
        { angle: 315, phase: 'Waning Crescent', type: 'intermediate' }
    ];

    let currentAlignmentIndex = 0;
    let selectedMarker = null;
    let userPrediction = null;

    // Explanations for different tide types
    const tideExplanations = {
        'spring': `Spring tides occur when the Sun, Earth, and Moon are aligned (New Moon or Full Moon). Their combined gravitational pull creates extra high and extra low tides.`,
        'neap': `Neap tides occur when the Sun and Moon are at right angles to Earth (First Quarter or Third Quarter). Their gravitational pulls partially cancel each other, resulting in less extreme tides (moderate high and low).`,
        'high': `High tide occurs on the side of Earth facing the Moon and on the opposite side due to inertia.`,
        'low': `Low tide occurs on the sides of Earth perpendicular to the Earth-Moon line, where water is drawn away.`
    };

    function updateMoonPosition() {
        const currentAlignment = moonAlignments[currentAlignmentIndex];
        const angle = currentAlignment.angle; // Angle of Moon around Earth, relative to Sun-Earth line

        // Position Earth at the center of the Earth-Moon system
        const earthMoonSystemRect = earthMoonSystem.getBoundingClientRect();
        const earthCenterX = earthMoonSystemRect.width / 2;
        const earthCenterY = earthMoonSystemRect.height / 2;

        // Position Moon orbit path relative to Earth's center
        moonOrbitPath.style.left = `${earthCenterX - moonOrbitPath.offsetWidth / 2}px`;
        moonOrbitPath.style.top = `${earthCenterY - moonOrbitPath.offsetHeight / 2}px`;

        // Calculate Moon's position relative to its orbit path (around Earth)
        const moonOrbitRadius = moonOrbitPath.offsetWidth / 2 - moon.offsetWidth / 2;
        const moonX = moonOrbitRadius * Math.cos(angle * Math.PI / 180);
        const moonY = moonOrbitRadius * Math.sin(angle * Math.PI / 180);

        // Apply position to the Moon
        moon.style.transform = `translate(${moonX}px, ${moonY}px)`;

        // Reset UI for new round
        resetPredictionUI();
    }

    function resetPredictionUI() {
        tideMarkers.forEach(marker => marker.classList.remove('selected'));
        selectedMarker = null;
        selectedLocationName.textContent = '';
        tideButtons.forEach(btn => btn.classList.remove('selected')); // Clear selection from tide buttons
        userPrediction = null;
        predictionFeedback.textContent = '';
        predictionFeedback.classList.remove('correct', 'incorrect');
        tideExplanation.textContent = '';
        checkPredictionButton.disabled = true; // Disable until location and prediction are made
    }

    function getExpectedTide(location) {
        const currentAlignment = moonAlignments[currentAlignmentIndex];
        const alignmentType = currentAlignment.type; // 'spring', 'neap', 'intermediate'
        const moonAngle = currentAlignment.angle; // 0=New, 90=First Qtr, 180=Full, 270=Third Qtr

        // Normalize angle to be from the Sun-Earth line for simplicity
        // Markers: north (top, 90 deg relative to earth's center from Sun-Earth line if Earth is left)
        // south (bottom, -90 deg)
        // east (right, 0 deg)
        // west (left, 180 deg)

        // For Spring/Neap:
        // Spring (0, 180 deg Moon): High tides at East/West, Low at North/South
        // Neap (90, 270 deg Moon): High tides at North/South, Low at East/West
        // In this game, 'high'/'low' refer to the primary lunar tides, 'spring'/'neap' add the solar component.

        if (alignmentType === 'spring') {
            // New Moon (0 deg) or Full Moon (180 deg)
            if (location === 'east' || location === 'west') {
                return 'spring'; // Highest high or lowest low
            } else {
                return 'low'; // High tides are along the Sun-Moon line
            }
        } else if (alignmentType === 'neap') {
            // First Quarter (90 deg) or Third Quarter (270 deg)
            if (location === 'north' || location === 'south') {
                return 'neap'; // Moderate high or low
            } else {
                return 'low'; // High tides are along the Moon line, low along Sun line
            }
        } else {
            // Intermediate phases
            // This is a simplification. Real tides are complex.
            // We'll approximate:
            // High tide directly under the moon and opposite
            // Low tide 90 degrees away
            // Since we're not rotating earth, assume east is aligned with Sun-Earth.

            // This part needs adjustment for a full 360-degree model.
            // For simplicity, we'll just return generic high/low for intermediate.
            // Students should be guided to understand spring/neap are the main points.
            if (moonAngle % 180 === 0) { // Near new/full
                 if (location === 'east' || location === 'west') return 'high';
                 else return 'low';
            } else if (moonAngle % 90 === 0 && moonAngle % 180 !== 0) { // Near quarter
                if (location === 'north' || location === 'south') return 'high';
                else return 'low';
            } else { // Generic "high" or "low"
                // This is a massive simplification. Without simulating Earth rotation,
                // "high" and "low" are relative to the direct line of pull.
                return 'high'; // Placeholder: a "high" or "low" tide exists, just not extreme
            }
        }
    }


    // Event Listeners

    tideMarkers.forEach(marker => {
        marker.addEventListener('click', () => {
            tideMarkers.forEach(m => m.classList.remove('selected'));
            marker.classList.add('selected');
            selectedMarker = marker.dataset.location;
            selectedLocationName.textContent = selectedMarker.charAt(0).toUpperCase() + selectedMarker.slice(1);
            checkPredictionButton.disabled = (userPrediction === null); // Enable check if a tide type is already selected
        });
    });

    tideButtons.forEach(button => {
        button.addEventListener('click', () => {
            tideButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            userPrediction = button.dataset.tideType;
            checkPredictionButton.disabled = (selectedMarker === null); // Enable check if a location is already selected
        });
    });

    nextAlignmentButton.addEventListener('click', () => {
        currentAlignmentIndex = (currentAlignmentIndex + 1) % moonAlignments.length;
        updateMoonPosition();
    });

    checkPredictionButton.addEventListener('click', () => {
        if (!selectedMarker || !userPrediction) {
            predictionFeedback.textContent = 'Please select a location and a tide type.';
            predictionFeedback.classList.add('incorrect');
            return;
        }

        const expectedTide = getExpectedTide(selectedMarker);

        // Special handling for spring/neap as primary predictions
        // If the user selected 'spring' or 'neap', check that directly
        // Otherwise, if they selected 'high'/'low', give them a pass if the alignment type is generic,
        // but prefer 'spring'/'neap' for those alignments.
        const currentAlignmentType = moonAlignments[currentAlignmentIndex].type;

        let isCorrect = false;
        let explanationText = '';

        if (userPrediction === 'spring' && currentAlignmentType === 'spring') {
            isCorrect = true;
            explanationText = tideExplanations['spring'];
        } else if (userPrediction === 'neap' && currentAlignmentType === 'neap') {
            isCorrect = true;
            explanationText = tideExplanations['neap'];
        } else if (userPrediction === 'high' || userPrediction === 'low') {
            // For simple high/low prediction, ensure it's not a strong spring/neap phase
            // Or that the location is consistent with high/low for the current alignment.
            // This part is the most simplified and may need refinement for real-world accuracy.
            // For this game, we'll guide them towards Spring/Neap for those specific alignments.
            if (currentAlignmentType === 'spring' || currentAlignmentType === 'neap') {
                 predictionFeedback.textContent = `For ${moonAlignments[currentAlignmentIndex].phase}, it's a ${currentAlignmentType} tide. Try being more specific!`;
                 predictionFeedback.classList.add('incorrect');
                 tideExplanation.textContent = tideExplanations[currentAlignmentType];
                 return; // Exit early as we want them to pick spring/neap
            } else {
                 // For intermediate phases, 'high' or 'low' is generally acceptable depending on the marker position
                 // This requires more complex logic to simulate bulge.
                 // For simplicity, we'll mark any non-spring/neap as "high" or "low" if they pick it.
                 // This makes 'intermediate' phases less about "correctness" and more about moving to the next.
                 isCorrect = true; // Assume generic high/low is fine for intermediate
                 explanationText = tideExplanations[userPrediction]; // Use general high/low explanation
            }
        }


        if (isCorrect) {
            predictionFeedback.textContent = `Correct! It's a ${userPrediction.toUpperCase()} tide.`;
            predictionFeedback.classList.add('correct');
        } else {
            predictionFeedback.textContent = `Incorrect. Try again!`;
            predictionFeedback.classList.add('incorrect');
            // Show the correct explanation if user chose wrong but on a spring/neap moon
            if (currentAlignmentType === 'spring') explanationText = tideExplanations['spring'];
            else if (currentAlignmentType === 'neap') explanationText = tideExplanations['neap'];
            else explanationText = `Consider the gravitational pull of the Moon and Sun on water.`; // General hint
        }
        tideExplanation.textContent = explanationText;
        restartButton.style.display = 'block'; // Allow restart after checking
        // Disable prediction until next alignment
        checkPredictionButton.disabled = true;
        tideButtons.forEach(btn => btn.disabled = true);
        tideMarkers.forEach(marker => marker.style.pointerEvents = 'none');
    });

    restartButton.addEventListener('click', () => {
        currentAlignmentIndex = 0;
        updateMoonPosition();
        restartButton.style.display = 'none';
        checkPredictionButton.disabled = true;
        tideButtons.forEach(btn => btn.disabled = false);
        tideMarkers.forEach(marker => marker.style.pointerEvents = 'auto');
        resetPredictionUI(); // Fully reset the UI
    });

    // Initial setup
    updateMoonPosition(); // Place Moon at initial position
});

// แหล่งที่มา:
// 1. https://github.com/aadilmughal786/simple-web-project
// 2. https://github.com/Siphiwe1997/MyProjects