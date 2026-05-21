## From """Unit 4: Our Solar System
This unit covers the relationships within the solar system, planetary orbits around the sun due to gravity, creating models to explain seasons, the apparent motion of the sun, phases of the moon, changes in moonrise and moonset times, tides, and explaining the uses of space technology, as well as studying the advancements in space exploration projects.

Chapter 1: Interactions in the Solar System
This chapter discusses objects in our solar system orbiting the sun due to gravity, which is the attractive force between objects with mass. The magnitude of gravitational force is related to the masses of the two objects. Planets orbit the sun in elliptical paths. The Earth rotates on its tilted axis while simultaneously orbiting the sun with its axis remaining tilted. As Earth orbits the sun at different positions, various areas on Earth receive different amounts of sunlight, resulting in Earth's seasons. Furthermore, the moon's orbit around Earth causes everyone to see different illuminated portions of the moon each day, leading to the phenomena of moon phases and tides, which are also a result of the gravitational forces between Earth, the moon, and the sun.""" and please Create a  "Solar System Orbit Simulator": A simple drag-and-drop or interactive diagram where students can adjust parameters to see how planets orbit or how the Earth's tilt affects seasons by using the index.html, style.css, script.js?

Creating a full-fledged, accurate orbital simulator or a complex seasons simulator with adjustable parameters using only HTML, CSS, and vanilla JavaScript for a browser is a significant undertaking, often requiring a strong understanding of physics, trigonometry, and potentially a graphics library (like Canvas or WebGL) for rendering. Building a truly "simple" version that still demonstrates principles effectively while being manageable for a single response is a balance.

Given the constraints, I will create a **simplified visual simulator focusing on two key aspects** mentioned in the unit:

1.  **Planetary Orbits (Visual/Conceptual):** A simple animation showing a planet orbiting a sun. We won't allow complex parameter adjustments for actual gravitational physics but will provide a visual representation of elliptical orbits and orbital speed.
2.  **Earth's Tilt and Seasons (Interactive Diagram):** A static diagram of Earth orbiting the Sun with a tilted axis, where students can "drag" or select Earth's position in its orbit to see how the amount of sunlight hitting different hemispheres changes, conceptually explaining seasons.

This approach balances the "simulator" idea with what's reasonably achievable without a full-blown physics engine.

---

**1. Solar System Orbit Simulator (Simplified Animation)**

This part will be a **visual animation** of an elliptical orbit, demonstrating the concept without complex user-adjustable physics parameters.

**index.html:** (This `index.html` will be for the *entire* simulator, combining both parts)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solar System & Seasons Simulator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="simulator-container">
        <h1>Our Solar System & Seasons Simulator</h1>

        <div class="simulator-section" id="orbit-simulator-section">
            <h2>1. Planetary Orbit (Simplified)</h2>
            <p>Observe how a planet orbits the Sun in an elliptical path.</p>
            <div class="orbit-display">
                <div class="sun"></div>
                <div class="orbit-path">
                    <div class="planet" id="orbiting-planet"></div>
                </div>
            </div>
            <button id="toggle-orbit-animation">Pause/Play Orbit</button>
            <p class="explanation">Planets orbit the Sun due to gravity. Their paths are elliptical, not perfect circles.</p>
        </div>

        <div class="simulator-section" id="seasons-simulator-section">
            <h2>2. Earth's Tilt and Seasons</h2>
            <p>Click or drag the Earth around its orbit to observe how the tilted axis affects seasons.</p>
            <div class="seasons-display">
                <img src="sun_seasons.png" alt="Sun" class="sun-seasons">
                <div class="earth-orbit-path-seasons" id="seasons-orbit-path">
                    </div>
            </div>
            <div class="seasons-controls">
                <button data-position="winter">Dec (Winter in N. H.)</button>
                <button data-position="spring">Mar (Spring in N. H.)</button>
                <button data-position="summer">June (Summer in N. H.)</button>
                <button data-position="autumn">Sep (Autumn in N. H.)</button>
            </div>
            <div class="seasons-info">
                <p><strong>Current Season (Northern Hemisphere):</strong> <span id="current-season">Click on Earth's position</span></p>
                <p class="explanation">Earth's axis is tilted. As it orbits the Sun, different hemispheres receive more direct sunlight at different times of the year, causing seasons.</p>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**style.css:**

```css
body {
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #2c3e50, #34495e); /* Dark blue-gray gradient */
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    color: #ecf0f1; /* Light gray text */
}

.simulator-container {
    background-color: #3b5063; /* Slightly lighter dark blue-gray */
    border-radius: 25px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    padding: 50px;
    text-align: center;
    max-width: 1000px;
    width: 100%;
}

h1 {
    color: #f1c40f; /* Gold */
    margin-bottom: 30px;
    font-size: 3.2em;
    font-weight: 900;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

h2 {
    color: #81ecec; /* Light Aqua */
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 2.2em;
    font-weight: 700;
}

p {
    color: #bdc3c7; /* Lighter gray */
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 20px;
}

.explanation {
    font-size: 0.95em;
    color: #95a5a6;
    font-style: italic;
    margin-top: 25px;
}

.simulator-section {
    background-color: #4a6075;
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 40px;
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);
}

/* --- Orbit Simulator --- */
.orbit-display {
    position: relative;
    width: 300px; /* Diameter of the overall orbit area */
    height: 300px;
    margin: 40px auto;
    border-radius: 50%;
    /* background-color: rgba(255, 255, 255, 0.05); /* Very subtle background for the area */
    display: flex;
    justify-content: center;
    align-items: center;
}

.sun {
    width: 50px;
    height: 50px;
    background: radial-gradient(circle at 30% 30%, #ffeb3b, #fbc02d); /* Yellow to orange gradient */
    border-radius: 50%;
    box-shadow: 0 0 20px 5px rgba(255, 235, 59, 0.7);
    position: absolute;
    z-index: 2;
}

.orbit-path {
    position: absolute;
    width: 100%; /* Make it match orbit-display for elliptical path */
    height: 100%;
    border: 2px dashed rgba(255, 255, 255, 0.1); /* Subtle orbit path */
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.planet {
    width: 20px;
    height: 20px;
    background-color: #3498db; /* Blue for the planet */
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(52, 152, 219, 0.6);
    position: absolute;
    top: 50%; /* Start at the center relative to its parent */
    left: 50%;
    transform: translate(-50%, -50%); /* Center the planet */
    z-index: 3;
}

/* Animation for the orbit */
@keyframes ellipticalOrbit {
    0% { transform: rotate(0deg) translateX(120px) scaleY(0.8); } /* Wider part of ellipse */
    25% { transform: rotate(90deg) translateX(150px) scaleY(1); } /* End of major axis */
    50% { transform: rotate(180deg) translateX(120px) scaleY(0.8); } /* Wider part of ellipse */
    75% { transform: rotate(270deg) translateX(150px) scaleY(1); } /* End of major axis */
    100% { transform: rotate(360deg) translateX(120px) scaleY(0.8); }
}

.planet.animating {
    animation: ellipticalOrbit 12s linear infinite; /* Adjust time for speed */
    transform-origin: center; /* Important for rotation */
}

#toggle-orbit-animation {
    background-color: #27ae60; /* Green */
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin-top: 20px;
}

#toggle-orbit-animation:hover {
    background-color: #2ecc71; /* Lighter Green */
    transform: translateY(-2px);
}

/* --- Seasons Simulator --- */
.seasons-display {
    position: relative;
    width: 550px; /* Overall size for the Earth's orbit */
    height: 550px;
    margin: 40px auto;
    border-radius: 50%;
    border: 2px dashed rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.05); /* Background for the solar system view */
}

.sun-seasons {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #ffeb3b, #fbc02d);
    box-shadow: 0 0 30px 10px rgba(255, 235, 59, 0.7);
    z-index: 1;
}

.earth-orbit-path-seasons {
    position: absolute;
    width: 100%;
    height: 100%;
    /* No border here, the main .seasons-display has it */
    z-index: 0;
}

.earth-position {
    position: absolute;
    width: 120px; /* Image width */
    height: 120px; /* Image height */
    cursor: pointer;
    transform: translate(-50%, -50%); /* Centers the image on its x,y point */
    transition: transform 0.1s ease-out; /* Smooth movement when dragging */
    z-index: 2; /* Earth on top of orbit path */
}

.earth-position.active-season {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0 0 15px 5px #81ecec;
    border-radius: 50%; /* To highlight the circular image */
}

.seasons-controls {
    margin-top: 30px;
}

.seasons-controls button {
    background-color: #3498db; /* Blue */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 0.95em;
    cursor: pointer;
    margin: 0 8px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.seasons-controls button:hover {
    background-color: #2980b9; /* Darker Blue */
    transform: translateY(-2px);
}

.seasons-info {
    margin-top: 30px;
    padding: 15px;
    background-color: #2c3e50;
    border-radius: 10px;
    border: 1px solid #1abc9c;
}

#current-season {
    color: #1abc9c; /* Turquoise */
    font-size: 1.3em;
    font-weight: bold;
}
```

**script.js:**

```javascript
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
```

---

**Crucial Step: Creating the Image Assets**

You will need the following `.png` images and place them in the same folder as your HTML, CSS, and JS files. These images are critical for the visual demonstration of seasons due to tilt.

* **`sun_seasons.png`**: A simple image of the Sun for the seasons simulator.
* **`earth_winter.png`**: An image of Earth tilted *away* from the sun (showing the Northern Hemisphere receiving less direct sunlight).
* **`earth_spring.png`**: An image of Earth with its axis tilted, but with sunlight hitting both hemispheres relatively equally (equinox).
* **`earth_summer.png`**: An image of Earth tilted *towards* the sun (showing the Northern Hemisphere receiving more direct sunlight).
* **`earth_autumn.png`**: Another equinox image, similar to spring.

**Tips for Image Creation:**

* **`earth_winter.png`, `earth_spring.png`, `earth_summer.png`, `earth_autumn.png`**: These should be images of Earth that visually demonstrate the tilt. For example:
    * **Winter:** Earth with its North Pole visibly tilted *away* from the sun, perhaps with more shadow on the Northern Hemisphere.
    * **Summer:** Earth with its North Pole visibly tilted *towards* the sun, with more illumination on the Northern Hemisphere.
    * **Spring/Autumn:** Earth still tilted, but the direct sunlight is hitting the equator, making both hemispheres equally lit (though still tilted). You might use the same image for spring and autumn, as the tilt relative to the sun is similar, just on opposite sides of the orbit.
* **Transparent Backgrounds:** Ensure all your `.png` images have transparent backgrounds for better visual integration.
* **Consistent Size:** Make sure the Earth images are roughly the same size so they don't jump visually when changing positions. The `earth-position` class in CSS is set to 120px by 120px, so create your images to fit well within that.

**File Structure:**

```
your-simulator-folder/
├── index.html
├── style.css
├── script.js
├── sun_seasons.png
├── earth_winter.png
├── earth_spring.png
├── earth_summer.png
└── earth_autumn.png
```

**How to Use:**

1.  Save the code blocks and create the necessary image files in the same folder.
2.  Open `index.html` in your web browser.

**Features:**

* **Planetary Orbit Simulator:**
    * Visual animation of a planet in an elliptical orbit around a sun.
    * A "Pause/Play" button to control the animation.
* **Earth's Tilt and Seasons Simulator:**
    * A static diagram of Earth orbiting the Sun.
    * Click on one of the four Earth positions (Winter, Spring, Summer, Autumn) to "snap" to that season and see how the tilt affects sunlight.
    * (Simplified Drag Functionality): You can attempt to drag the Earth around the circular path. The code has a basic attempt to constrain it to the orbit and update the season, but it's more conceptual for this simplified version than a precise physics simulation.
    * Buttons to directly jump to specific seasonal positions.
    * A display showing the current "season" (Northern Hemisphere perspective).

This simulator provides a good visual and interactive foundation for understanding the concepts of orbits and seasons, directly aligning with the unit description.

```
แหล่งที่มา:
1. https://github.com/Aadarshs12/Solar-System
2. https://github.com/AbrahamEstrada27/examen372
3. https://github.com/AlgoHussle/nomad-blog
4. https://github.com/Geicomo/Geicomo.com