document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. Data Sources
    // ---------------------------------------------------------

    // Forest Data (States)
    const forestData = {
        "Andhra Pradesh": { coords: [15.9129, 79.7400], loss: 3200 },
        "Arunachal Pradesh": { coords: [28.2180, 94.7278], loss: 12500 },
        "Assam": { coords: [26.2006, 92.9376], loss: 11200 },
        "Bihar": { coords: [25.0961, 85.3131], loss: 1500 },
        "Chhattisgarh": { coords: [21.2787, 81.8661], loss: 9800 },
        "Goa": { coords: [15.2993, 74.1240], loss: 800 },
        "Gujarat": { coords: [22.2587, 71.1924], loss: 1200 },
        "Haryana": { coords: [29.0588, 76.0856], loss: 500 },
        "Himachal Pradesh": { coords: [31.1048, 77.1734], loss: 2100 },
        "Jharkhand": { coords: [23.6102, 85.2799], loss: 5400 },
        "Karnataka": { coords: [15.3173, 75.7139], loss: 4500 },
        "Kerala": { coords: [10.8505, 76.2711], loss: 2800 },
        "Madhya Pradesh": { coords: [22.9734, 78.6569], loss: 8600 },
        "Maharashtra": { coords: [19.7515, 75.7139], loss: 6200 },
        "Manipur": { coords: [24.6637, 93.9063], loss: 5100 },
        "Meghalaya": { coords: [25.4670, 91.3662], loss: 9200 },
        "Mizoram": { coords: [23.1645, 92.9376], loss: 13100 },
        "Nagaland": { coords: [26.1584, 94.5624], loss: 8900 },
        "Odisha": { coords: [20.9517, 85.0985], loss: 12500 },
        "Punjab": { coords: [31.1471, 75.3412], loss: 400 },
        "Rajasthan": { coords: [27.0238, 74.2179], loss: 900 },
        "Sikkim": { coords: [27.5330, 88.5122], loss: 1100 },
        "Tamil Nadu": { coords: [11.1271, 78.6569], loss: 3100 },
        "Telangana": { coords: [18.1124, 79.0193], loss: 7500 },
        "Tripura": { coords: [23.9408, 91.9882], loss: 4800 },
        "Uttar Pradesh": { coords: [26.8467, 80.9462], loss: 1800 },
        "Uttarakhand": { coords: [30.0668, 79.0193], loss: 2500 },
        "West Bengal": { coords: [22.9868, 87.8550], loss: 4200 }
    };

    // State Specific News Headlines
    const stateNews = {
        "Maharashtra": "Mumbai Lost Over 21,000 Trees in 6 Years for Metro Projects.",
        "Delhi": "Delhi AQI hits 'Severe' category, schools closed indefinitely.",
        "Odisha": "Mining activities threaten 12,000 hectares of forest land in Odisha.",
        "Arunachal Pradesh": "Illegal logging cases rise by 40% near border regions.",
        "Assam": "Floods displace wildlife in Kaziranga; 11,200 acres at risk.",
        "Mizoram": "New highway project to cut through vital biodiversity corridors.",
        "Karnataka": "Bengaluru has lost 78% of its green cover in the last decade.",
        "Punjab": "Stubble burning contributes to 30% of North India's pollution.",
        "Kerala": "Landslides expected in Western Ghats due to deforestation.",
        "Uttarakhand": "Forest fires ravage 2,500 hectares in single season."
    };

    // Pollution Data (Cities)
    const pollutionData = {
        "Delhi": { coords: [28.7041, 77.1025], aqi: 350 }, // Hazardous
        "Mumbai": { coords: [19.0760, 72.8777], aqi: 180 }, // Moderate/Unhealthy
        "Bangalore": { coords: [12.9716, 77.5946], aqi: 85 }, // Good
        "Chennai": { coords: [13.0827, 80.2707], aqi: 110 },
        "Kolkata": { coords: [22.5726, 88.3639], aqi: 240 },
        "Hyderabad": { coords: [17.3850, 78.4867], aqi: 140 },
        "Pune": { coords: [18.5204, 73.8567], aqi: 95 },
        "Ahmedabad": { coords: [23.0225, 72.5714], aqi: 210 },
        "Jaipur": { coords: [26.9124, 75.7873], aqi: 190 },
        "Lucknow": { coords: [26.8467, 80.9462], aqi: 280 },
        "Patna": { coords: [25.5941, 85.1376], aqi: 310 }, // Hazardous
        "Indore": { coords: [22.7196, 75.8577], aqi: 80 }, // Cleanest
        "Nagpur": { coords: [21.1458, 79.0882], aqi: 120 },
        "Bhopal": { coords: [23.2599, 77.4126], aqi: 90 },
        "Surat": { coords: [21.1702, 72.8311], aqi: 170 },
        "Visakhapatnam": { coords: [17.6868, 83.2185], aqi: 130 },
        "Ludhiana": { coords: [30.9010, 75.8573], aqi: 290 },
        "Agra": { coords: [27.1767, 78.0081], aqi: 220 },
        "Vadodara": { coords: [22.3072, 73.1812], aqi: 150 },
        "Coimbatore": { coords: [11.0168, 76.9558], aqi: 65 }
    };

    // State Variables
    let currentMode = 'forest'; // 'forest' or 'pollution'
    let currentMarker = null;
    let cityMarkers = []; // For storing multiple city markers in pollution mode

    // ---------------------------------------------------------
    // 2. Initialization
    // ---------------------------------------------------------
    const map = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const ctx = document.getElementById('forestChart').getContext('2d');
    let dashboardChart = new Chart(ctx, {
        type: 'bar', // Initial type
        data: getForestChartData(),
        options: getChartOptions('Tree Loss in Hectares')
    });

    const stateInput = document.getElementById('stateInput');
    const searchBtn = document.getElementById('searchBtn');
    const datalist = document.getElementById('states');
    const dashboardTitle = document.querySelector('.news-header h1');
    const dashboardDesc = document.querySelector('.news-header p');
    const forestBtn = document.getElementById('forestModeBtn');
    const pollutionBtn = document.getElementById('pollutionModeBtn');

    // ---------------------------------------------------------
    // 3. Helper Functions
    // ---------------------------------------------------------

    function getForestChartData() {
        return {
            labels: ['Odisha', 'Arunachal', 'Assam', 'Chhattisgarh', 'Mizoram'],
            datasets: [{
                label: 'Tree Cover Loss (Hectares)',
                data: [12500, 12500, 11200, 9800, 13100],
                backgroundColor: 'rgba(231, 76, 60, 0.7)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 1
            }]
        };
    }

    function getChartOptions(yLabel, isHorizontal = false) {
        return {
            indexAxis: isHorizontal ? 'y' : 'x', // Horizontal logic
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true, title: { display: true, text: yLabel } }
            },
            plugins: {
                legend: { display: false },
                title: { display: true, text: isHorizontal ? 'Most vs Least Polluted Cities (AQI)' : 'Tree Cover Loss Statistics' }
            },
            animation: { duration: 1000 }
        };
    }

    function getPollutionColor(aqi) {
        if (aqi > 300) return '#7d3c98'; // Hazardous - Purple
        if (aqi > 200) return '#c0392b'; // Very Unhealthy - Red
        if (aqi > 100) return '#e67e22'; // Unhealthy - Orange
        if (aqi > 50) return '#f1c40f'; // Moderate - Yellow
        return '#27ae60'; // Good - Green
    }

    function updateDatalist(mode) {
        datalist.innerHTML = '';
        const source = mode === 'forest' ? forestData : pollutionData;
        Object.keys(source).forEach(key => {
            let option = document.createElement('option');
            option.value = key;
            datalist.appendChild(option);
        });
        stateInput.placeholder = mode === 'forest' ? "Search State (e.g. Assam)..." : "Search City (e.g. Delhi)...";
        stateInput.value = '';
    }

    function renderCityMarkers() {
        // Clear old single marker
        if (currentMarker) map.removeLayer(currentMarker);

        // Add new markers for all cities
        Object.keys(pollutionData).forEach(city => {
            const data = pollutionData[city];
            const color = getPollutionColor(data.aqi);

            const marker = L.circleMarker(data.coords, {
                color: color,
                fillColor: color,
                fillOpacity: 0.7,
                radius: data.aqi > 200 ? 12 : 8
            }).addTo(map).bindPopup(`<b>${city}</b><br>AQI: ${data.aqi}`);

            cityMarkers.push(marker);
        });
    }

    function clearCityMarkers() {
        cityMarkers.forEach(m => map.removeLayer(m));
        cityMarkers = [];
    }

    // ---------------------------------------------------------
    // 4. Main Event Handlers
    // ---------------------------------------------------------

    // Toggle Mode: Forest
    forestBtn.addEventListener('click', () => {
        if (currentMode === 'forest') return;
        currentMode = 'forest';

        // UI Updates
        forestBtn.classList.add('active');
        pollutionBtn.classList.remove('active');
        dashboardTitle.textContent = "India Forest Monitor";
        dashboardDesc.textContent = "Live tracking of deforestation hotspots and tree cover loss by state.";

        // Map Updates
        clearCityMarkers();
        map.flyTo([20.5937, 78.9629], 5);

        // Chart Updates
        dashboardChart.destroy();
        dashboardChart = new Chart(ctx, {
            type: 'bar',
            data: getForestChartData(),
            options: getChartOptions('Loss in Hectares', false)
        });

        // Hide special panels
        document.getElementById('statsPanel').style.display = 'none';
        document.getElementById('stateNewsFlash').style.display = 'none';

        updateDatalist('forest');
    });

    // Toggle Mode: Pollution
    pollutionBtn.addEventListener('click', () => {
        if (currentMode === 'pollution') return;
        currentMode = 'pollution';

        // UI Updates
        pollutionBtn.classList.add('active');
        forestBtn.classList.remove('active');
        dashboardTitle.textContent = "Air Pollution Monitor";
        dashboardDesc.textContent = "Real-time Air Quality Index (AQI) of major Indian cities.";

        // Map Updates
        if (currentMarker) map.removeLayer(currentMarker);
        map.flyTo([20.5937, 78.9629], 5);
        renderCityMarkers();

        // Chart Updates (Horizontal Bar - Top Polluted vs Cleanest)
        const labels = ['Delhi', 'Patna', 'Ludhiana', 'Kolkata', 'Bangalore', 'Indore'];
        const data = [350, 310, 290, 240, 85, 80];
        const colors = data.map(aqi => getPollutionColor(aqi));

        dashboardChart.destroy();
        dashboardChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Air Quality Index (AQI)',
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 1
                }]
            },
            options: getChartOptions('AQI Level', true) // true for horizontal
        });

        // Hide special panels
        document.getElementById('statsPanel').style.display = 'none';
        document.getElementById('stateNewsFlash').style.display = 'none';

        updateDatalist('pollution');
    });

    // Search Handler
    function handleSearch() {
        const query = stateInput.value.trim();
        const source = currentMode === 'forest' ? forestData : pollutionData;
        const key = Object.keys(source).find(k => k.toLowerCase() === query.toLowerCase());

        if (key && source[key]) {
            const data = source[key];
            map.flyTo(data.coords, 10);

            // --- Update Stats Panel ---
            const statsPanel = document.getElementById('statsPanel');
            const statAQI = document.getElementById('statAQI');
            const statTrees = document.getElementById('statTrees');
            const statPlastic = document.getElementById('statPlastic');
            const newsFlash = document.getElementById('stateNewsFlash');
            const flashText = document.getElementById('flashText');

            // Generate Mock values based on real data intensity
            let aqi, trees, plastic;
            if (currentMode === 'forest') {
                trees = data.loss.toLocaleString();
                aqi = Math.floor(data.loss / 50) + 50;
                if (aqi > 400) aqi = 400;
                plastic = Math.floor(data.loss / 200) + 10;
            } else {
                aqi = data.aqi;
                trees = (data.aqi * 10 + 500).toLocaleString();
                plastic = Math.floor(data.aqi / 3);
            }

            statAQI.innerText = aqi + (aqi > 200 ? " (Hazardous)" : (aqi > 100 ? " (Unhealthy)" : " (Good)"));
            statTrees.innerText = trees + " Ha";
            statPlastic.innerText = plastic + " Tons/Year";
            statAQI.style.color = getPollutionColor(aqi);

            statsPanel.style.display = 'flex';

            // --- Update News Flash ---
            // If explicit news exists for this state, use it. Else generic.
            let newsTitle = `${key}: Environmental Alert`;
            let newsDesc = `Latest reports from ${key} indicate needing urgent attention.`;

            let news = stateNews[key];
            if (!news) {
                if (currentMode === 'forest') {
                    news = `${key} Environmental Report: Authorities urge action as tree cover drops by ${Math.floor(Math.random() * 5)}% this year.`;
                    newsDesc = `Recent satellite imagery shows a significant reduction in green cover across ${key}. Experts warn of soil erosion and climate impact.`;
                } else {
                    news = `${key} City Update: Residents advised to wear masks as pollution levels fluctuate.`;
                    newsDesc = `PM2.5 levels in ${key} have shown erratic behavior this week. Health advisory issued for children and elderly.`;
                }
            } else {
                newsDesc = news;
            }
            flashText.textContent = news;
            newsFlash.style.display = 'flex';

            // --- Update News Cards Dynamically ---
            // Card 1: Tree/Forest Focus
            document.getElementById('card1Title').innerText = `${key} Green Cover Under Threat`;
            document.getElementById('card1Desc').innerText = `Deforestation in ${key} has reached alarming levels. ${trees} hectares of forest land lost recently. ${newsDesc}`;

            // Card 2: Pollution Focus
            document.getElementById('card2Title').innerText = `${key} Air Quality Update`;
            document.getElementById('card2Desc').innerText = `Air Quality Index in major areas of ${key} stands at ${aqi}. Residents are facing health challenges.`;

            // Card 3: General/Water Focus
            document.getElementById('card3Title').innerText = `Preserving ${key}'s Water Bodies`;
            document.getElementById('card3Desc').innerText = `Local rivers and lakes in ${key} are facing pollution from plastic waste (${plastic} Tons/Year). Urgent cleanup needed.`;

            // --- Map & Chart Logics ---
            if (currentMode === 'forest') {
                if (currentMarker) map.removeLayer(currentMarker);
                const color = data.loss > 10000 ? 'red' : 'green';
                currentMarker = L.circle(data.coords, {
                    color: color, fillColor: color, fillOpacity: 0.5, radius: 40000
                }).addTo(map).bindPopup(`<b>${key}</b><br>Loss: ${data.loss} Ha`).openPopup();

                dashboardChart.data.labels = [key];
                dashboardChart.data.datasets[0].data = [data.loss];
                dashboardChart.data.datasets[0].backgroundColor = color === 'red' ? '#e74c3c' : '#2ecc71';
                dashboardChart.update();

            } else {
                // Pollution Mode
                const existingMarker = cityMarkers.find(m => m.getPopup().getContent().includes(key));
                if (existingMarker) existingMarker.openPopup();

                const color = getPollutionColor(data.aqi);
                dashboardChart.data.labels = [key];
                dashboardChart.data.datasets[0].data = [data.aqi];
                dashboardChart.data.datasets[0].backgroundColor = color;
                dashboardChart.update();
            }
        } else {
            alert("Location not found! Please select from the suggestions.");
        }
    }

    searchBtn.addEventListener('click', handleSearch);
    stateInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });

    // Initialize list
    updateDatalist('forest');

    // ---------------------------------------------------------
    // 5. Live Stats Simulation (For News Cards)
    // ---------------------------------------------------------
    function simulateLiveStats() {
        const treeCounter = document.getElementById('treeCounter');
        const aqiCounter = document.getElementById('aqiCounter');
        const plasticCounter = document.getElementById('plasticCounter');

        if (treeCounter) {
            setInterval(() => {
                let current = parseInt(treeCounter.innerText);
                treeCounter.innerText = current + 1;
            }, 3000);
        }

        if (aqiCounter) {
            setInterval(() => {
                let current = parseInt(aqiCounter.innerText);
                let change = Math.floor(Math.random() * 3) - 1;
                aqiCounter.innerText = current + change;
            }, 2000);
        }

        if (plasticCounter) {
            setInterval(() => {
                let current = parseInt(plasticCounter.innerText);
                plasticCounter.innerText = current + 1;
            }, 5000);
        }
    }

    simulateLiveStats();

    // Global Read News Function (attached to window for HTML access)
    // ---------------------------------------------------------
    window.readNews = function (cardId) {
        let title, desc;
        if (cardId === 'card1') {
            title = document.getElementById('card1Title').innerText;
            desc = document.getElementById('card1Desc').innerText;
        } else if (cardId === 'card2') {
            title = document.getElementById('card2Title').innerText;
            desc = document.getElementById('card2Desc').innerText;
        } else if (cardId === 'card3') {
            title = document.getElementById('card3Title').innerText;
            desc = document.getElementById('card3Desc').innerText;
        }

        if (title && desc) {
            // Cancel any current speaking
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(`${title}. ${desc}`);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.access = "Microsoft David - English (United States)"; // Optional preference
            window.speechSynthesis.speak(utterance);
        }
    };
});
