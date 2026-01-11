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
        , "Andhra Pradesh": { coords: [15.9129, 79.7400], aqi: 114 },
        "Arunachal Pradesh": { coords: [28.2180, 94.7278], aqi: 300 },
        "Assam": { coords: [26.2006, 92.9376], aqi: 274 },
        "Bihar": { coords: [25.0961, 85.3131], aqi: 80 },
        "Chhattisgarh": { coords: [21.2787, 81.8661], aqi: 246 },
        "Goa": { coords: [15.2993, 74.1240], aqi: 66 },
        "Gujarat": { coords: [22.2587, 71.1924], aqi: 74 },
        "Haryana": { coords: [29.0588, 76.0856], aqi: 60 },
        "Himachal Pradesh": { coords: [31.1048, 77.1734], aqi: 92 },
        "Jharkhand": { coords: [23.6102, 85.2799], aqi: 158 },
        "Karnataka": { coords: [15.3173, 75.7139], aqi: 140 },
        "Kerala": { coords: [10.8505, 76.2711], aqi: 106 },
        "Madhya Pradesh": { coords: [22.9734, 78.6569], aqi: 222 },
        "Maharashtra": { coords: [19.7515, 75.7139], aqi: 174 },
        "Manipur": { coords: [24.6637, 93.9063], aqi: 152 },
        "Meghalaya": { coords: [25.4670, 91.3662], aqi: 234 },
        "Mizoram": { coords: [23.1645, 92.9376], aqi: 312 },
        "Nagaland": { coords: [26.1584, 94.5624], aqi: 228 },
        "Odisha": { coords: [20.9517, 85.0985], aqi: 300 },
        "Punjab": { coords: [31.1471, 75.3412], aqi: 58 },
        "Rajasthan": { coords: [27.0238, 74.2179], aqi: 68 },
        "Sikkim": { coords: [27.5330, 88.5122], aqi: 72 },
        "Tamil Nadu": { coords: [11.1271, 78.6569], aqi: 112 },
        "Telangana": { coords: [18.1124, 79.0193], aqi: 200 },
        "Tripura": { coords: [23.9408, 91.9882], aqi: 146 },
        "Uttarakhand": { coords: [30.0668, 79.0193], aqi: 100 },
        "Uttar Pradesh": { coords: [26.8467, 80.9462], aqi: 86 },
        "West Bengal": { coords: [22.9868, 87.8550], aqi: 134 }
    };

    // Population Data (States)
    const populationData = {
        "Andhra Pradesh": { coords: [15.9129, 79.7400], pop: 53903393 },
        "Arunachal Pradesh": { coords: [28.2180, 94.7278], pop: 1570458 },
        "Assam": { coords: [26.2006, 92.9376], pop: 35607039 },
        "Bihar": { coords: [25.0961, 85.3131], pop: 124799926 },
        "Chhattisgarh": { coords: [21.2787, 81.8661], pop: 29436231 },
        "Goa": { coords: [15.2993, 74.1240], pop: 1586250 },
        "Gujarat": { coords: [22.2587, 71.1924], pop: 63872399 },
        "Haryana": { coords: [29.0588, 76.0856], pop: 28204692 },
        "Himachal Pradesh": { coords: [31.1048, 77.1734], pop: 7451955 },
        "Jharkhand": { coords: [23.6102, 85.2799], pop: 38593948 },
        "Karnataka": { coords: [15.3173, 75.7139], pop: 67562686 },
        "Kerala": { coords: [10.8505, 76.2711], pop: 35699443 },
        "Madhya Pradesh": { coords: [22.9734, 78.6569], pop: 85358965 },
        "Maharashtra": { coords: [19.7515, 75.7139], pop: 123144223 },
        "Manipur": { coords: [24.6637, 93.9063], pop: 3091545 },
        "Meghalaya": { coords: [25.4670, 91.3662], pop: 3366710 },
        "Mizoram": { coords: [23.1645, 92.9376], pop: 1239244 },
        "Nagaland": { coords: [26.1584, 94.5624], pop: 2249695 },
        "Odisha": { coords: [20.9517, 85.0985], pop: 46356334 },
        "Punjab": { coords: [31.1471, 75.3412], pop: 30141373 },
        "Rajasthan": { coords: [27.0238, 74.2179], pop: 81032689 },
        "Sikkim": { coords: [27.5330, 88.5122], pop: 690251 },
        "Tamil Nadu": { coords: [11.1271, 78.6569], pop: 77841267 },
        "Telangana": { coords: [18.1124, 79.0193], pop: 39362732 },
        "Tripura": { coords: [23.9408, 91.9882], pop: 4169794 },
        "Uttar Pradesh": { coords: [26.8467, 80.9462], pop: 237882725 },
        "Uttarakhand": { coords: [30.0668, 79.0193], pop: 11250858 },
        "West Bengal": { coords: [22.9868, 87.8550], pop: 99609303 }
    };

    // River Data (States)
    const riverData = {
        "Andhra Pradesh": { coords: [15.9129, 79.7400], count: 40, major: ["Godavari", "Krishna", "Penna"] },
        "Arunachal Pradesh": { coords: [28.2180, 94.7278], count: 55, major: ["Brahmaputra", "Kameng", "Subansiri"] },
        "Assam": { coords: [26.2006, 92.9376], count: 50, major: ["Brahmaputra", "Barak", "Manas"] },
        "Bihar": { coords: [25.0961, 85.3131], count: 25, major: ["Ganga", "Kosi", "Gandak"] },
        "Chhattisgarh": { coords: [21.2787, 81.8661], count: 30, major: ["Mahanadi", "Indravati", "Hasdeo"] },
        "Goa": { coords: [15.2993, 74.1240], count: 9, major: ["Mandovi", "Zuari", "Terekhol"] },
        "Gujarat": { coords: [22.2587, 71.1924], count: 20, major: ["Narmada", "Tapi", "Sabarmati"] },
        "Haryana": { coords: [29.0588, 76.0856], count: 6, major: ["Yamuna", "Ghaggar"] },
        "Himachal Pradesh": { coords: [31.1048, 77.1734], count: 20, major: ["Satluj", "Beas", "Ravi"] },
        "Jharkhand": { coords: [23.6102, 85.2799], count: 35, major: ["Damodar", "Subarnarekha"] },
        "Karnataka": { coords: [15.3173, 75.7139], count: 45, major: ["Kaveri", "Tungabhadra", "Krishna"] },
        "Kerala": { coords: [10.8505, 76.2711], count: 44, major: ["Periyar", "Bharathapuzha", "Pamba"] },
        "Madhya Pradesh": { coords: [22.9734, 78.6569], count: 60, major: ["Narmada", "Chambal", "Betwa"] },
        "Maharashtra": { coords: [19.7515, 75.7139], count: 55, major: ["Godavari", "Krishna", "Tapi"] },
        "Manipur": { coords: [24.6637, 93.9063], count: 15, major: ["Barak", "Imphal"] },
        "Meghalaya": { coords: [25.4670, 91.3662], count: 22, major: ["Simsang", "Myntdu"] },
        "Mizoram": { coords: [23.1645, 92.9376], count: 18, major: ["Tlawng", "Tuirial"] },
        "Nagaland": { coords: [26.1584, 94.5624], count: 12, major: ["Dhansiri", "Doyang"] },
        "Odisha": { coords: [20.9517, 85.0985], count: 40, major: ["Mahanadi", "Brahmani", "Baitarani"] },
        "Punjab": { coords: [31.1471, 75.3412], count: 5, major: ["Sutlej", "Beas", "Ravi"] },
        "Rajasthan": { coords: [27.0238, 74.2179], count: 15, major: ["Chambal", "Luni", "Banas"] },
        "Sikkim": { coords: [27.5330, 88.5122], count: 8, major: ["Teesta", "Rangeet"] },
        "Tamil Nadu": { coords: [11.1271, 78.6569], count: 35, major: ["Kaveri", "Vaigai", "Palar"] },
        "Telangana": { coords: [18.1124, 79.0193], count: 38, major: ["Godavari", "Krishna"] },
        "Tripura": { coords: [23.9408, 91.9882], count: 10, major: ["Gomati", "Manu"] },
        "Uttar Pradesh": { coords: [26.8467, 80.9462], count: 32, major: ["Ganga", "Yamuna", "Gomti"] },
        "Uttarakhand": { coords: [30.0668, 79.0193], count: 28, major: ["Ganga", "Yamuna", "Alaknanda"] },
        "West Bengal": { coords: [22.9868, 87.8550], count: 30, major: ["Ganga", "Hooghly", "Damodar"] }
    };

    // State Variables
    let currentMode = null; // 'forest', 'pollution', 'river' - null until user selects
    let currentMarker = null;
    let cityMarkers = []; // For storing multiple city markers in pollution mode
    let cityMarkerMap = {}; // Map city name -> marker for reliable lookup
    let modeSelected = false; // user must select mode before searching

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
    const riverBtn = document.getElementById('riverModeBtn');

    // Disable search button until a mode is selected (keep input clickable)
    // Display search button always
    if (searchBtn) searchBtn.disabled = false;

    // Create a custom suggestions dropdown (appears below the search input)
    let suggestionsBox = null;
    const createSuggestionsBox = () => {
        if (suggestionsBox) return suggestionsBox;
        const wrapper = document.querySelector('.search-box') || document.body;
        suggestionsBox = document.createElement('div');
        suggestionsBox.style.position = 'absolute';
        suggestionsBox.style.zIndex = '10000';
        suggestionsBox.style.background = '#fff';
        suggestionsBox.style.border = '1px solid #ccc';
        suggestionsBox.style.borderTop = 'none';
        suggestionsBox.style.maxHeight = '240px';
        suggestionsBox.style.overflowY = 'auto';
        suggestionsBox.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
        suggestionsBox.style.display = 'none';
        suggestionsBox.className = 'custom-suggestions';
        // Ensure wrapper is positioned so absolute child aligns
        if (wrapper !== document.body) wrapper.style.position = wrapper.style.position || 'relative';
        wrapper.appendChild(suggestionsBox);
        return suggestionsBox;
    };

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

    // Populate datalist
    function updateDatalist(mode, filter = '') {
        datalist.innerHTML = '';
        let source;
        if (mode === 'forest') source = forestData;
        else if (mode === 'pollution') source = pollutionData;
        else if (mode === 'river') source = riverData;
        else source = populationData; // Default

        const q = (filter || '').trim().toLowerCase();
        if (q.length === 0) {
            stateInput.placeholder = mode === 'forest' ? "Search State..." : (mode === 'pollution' ? "Search City..." : (mode === 'river' ? "Search State (Rivers)..." : "Search State for Population..."));
            return;
        }

        Object.keys(source).filter(k => k.toLowerCase().includes(q)).forEach(key => {
            let option = document.createElement('option');
            option.value = key;
            datalist.appendChild(option);
        });

        stateInput.placeholder = mode === 'forest' ? "Search State..." : (mode === 'pollution' ? "Search City..." : (mode === 'river' ? "Search State (Rivers)..." : "Search State for Population..."));
    }

    function renderCityMarkers() {
        // Remove any previous city markers to avoid duplicates
        clearCityMarkers();

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

            // Attach city name to marker and map for reliable lookup
            marker.city = city;
            cityMarkers.push(marker);
            cityMarkerMap[city] = marker;
        });
    }

    function clearCityMarkers() {
        cityMarkers.forEach(m => map.removeLayer(m));
        cityMarkers = [];
        cityMarkerMap = {};
    }

    // ---------------------------------------------------------
    // 4. Main Event Handlers
    // ---------------------------------------------------------

    // Toggle Mode: Forest
    if (forestBtn) {
        forestBtn.addEventListener('click', () => {
            if (currentMode === 'forest') return; // already active
            currentMode = 'forest';
            modeSelected = true;

            if (searchBtn) searchBtn.disabled = false;

            // UI Updates
            forestBtn.classList.add('active');
            pollutionBtn.classList.remove('active');
            if (riverBtn) riverBtn.classList.remove('active');
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

            // Hide special panels (if present)
            const _statsPanel = document.getElementById('statsPanel');
            if (_statsPanel) _statsPanel.style.display = 'none';
            const _stateNewsFlash = document.getElementById('stateNewsFlash');
            if (_stateNewsFlash) _stateNewsFlash.style.display = 'none';

            updateDatalist('forest');
            // If user already has a state typed, trigger search in the new mode
            if (stateInput && stateInput.value.trim() !== '') {
                const q = stateInput.value.trim();
                const match = Object.keys(forestData).find(k => k.toLowerCase() === q.toLowerCase());
                if (match) handleSearch();
            }
        });
    }

    // Toggle Mode: Pollution
    if (pollutionBtn) {
        pollutionBtn.addEventListener('click', () => {
            if (currentMode === 'pollution') return;
            currentMode = 'pollution';
            modeSelected = true;

            if (searchBtn) searchBtn.disabled = false;

            // UI Updates
            pollutionBtn.classList.add('active');
            forestBtn.classList.remove('active');
            if (riverBtn) riverBtn.classList.remove('active');
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

            // Hide special panels (if present)
            const _statsPanel2 = document.getElementById('statsPanel');
            if (_statsPanel2) _statsPanel2.style.display = 'none';
            const _stateNewsFlash2 = document.getElementById('stateNewsFlash');
            if (_stateNewsFlash2) _stateNewsFlash2.style.display = 'none';

            updateDatalist('pollution');
            // If user already has a state/city typed, trigger search in the new mode
            if (stateInput && stateInput.value.trim() !== '') {
                const q = stateInput.value.trim();
                const match = Object.keys(pollutionData).find(k => k.toLowerCase() === q.toLowerCase());
                if (match) handleSearch();
            }
        });
    }

    // Toggle Mode: River
    if (riverBtn) {
        riverBtn.addEventListener('click', () => {
            if (currentMode === 'river') return;
            currentMode = 'river';
            modeSelected = true;
            if (searchBtn) searchBtn.disabled = false;

            // UI Updates
            riverBtn.classList.add('active');
            forestBtn.classList.remove('active');
            pollutionBtn.classList.remove('active');
            dashboardTitle.textContent = "India River Monitor";
            dashboardDesc.textContent = "Explore major rivers and water bodies across Indian states.";

            // Map Updates
            clearCityMarkers();
            if (currentMarker) map.removeLayer(currentMarker);
            map.flyTo([20.5937, 78.9629], 5);

            // Chart Updates - Generic River Count Chart
            const labels = ['MP', 'Karnataka', 'Maha', 'Assam', 'UP'];
            const data = [60, 45, 55, 50, 32];

            dashboardChart.destroy();
            dashboardChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Number of Rivers',
                        data: data,
                        backgroundColor: '#3498db',
                        borderColor: '#2980b9',
                        borderWidth: 1
                    }]
                },
                options: getChartOptions('Total Rivers')
            });

            updateDatalist('river');
            // If user already has a state typed, trigger search in the new mode
            if (stateInput && stateInput.value.trim() !== '') {
                const q = stateInput.value.trim();
                const match = Object.keys(riverData).find(k => k.toLowerCase() === q.toLowerCase());
                if (match) handleSearch();
            }
        });
    }

    // Search Handler
    function handleSearch() {
        if (!stateInput) return;

        const query = stateInput.value.trim();
        // If no mode selected, default is Population
        const effectiveMode = currentMode || 'population';

        let source;
        if (effectiveMode === 'forest') source = forestData;
        else if (effectiveMode === 'pollution') source = pollutionData;
        else if (effectiveMode === 'river') source = riverData;
        else source = populationData;

        // Prefer exact key (case-sensitive), otherwise case-insensitive exact match.
        let key = null;
        if (query in source) {
            key = query;
        } else {
            key = Object.keys(source).find(k => k.toLowerCase() === query.toLowerCase()) || null;
        }

        if (key && source[key]) {
            const data = source[key];
            // Use different zoom for state-level (forest) vs city-level (pollution)
            const zoom = currentMode === 'forest' ? 7 : 10;
            map.flyTo(data.coords, zoom);

            // --- Update Stats Panel --- (guarded: elements may not exist on this page)
            const statsPanel = document.getElementById('statsPanel');
            const statAQI = document.getElementById('statAQI');
            const statTrees = document.getElementById('statTrees');
            const statPlastic = document.getElementById('statPlastic');
            const newsFlash = document.getElementById('stateNewsFlash');
            const flashText = document.getElementById('flashText');

            // Generate Mock values based on real data intensity
            let aqi, trees, plastic;
            if (effectiveMode === 'forest') {
                trees = data.loss.toLocaleString();
                aqi = Math.floor(data.loss / 50) + 50;
                if (aqi > 400) aqi = 400;
                plastic = Math.floor(data.loss / 200) + 10;
            } else if (effectiveMode === 'river') {
                trees = (data.count * 150).toLocaleString(); // Mock based on river count
                aqi = 65; // Rivers usually imply better nature? Mock value.
                plastic = data.count * 120; // Plastic in rivers
            } else if (effectiveMode === 'pollution') {
                aqi = data.aqi;
                trees = (data.aqi * 10 + 500).toLocaleString();
                plastic = Math.floor(data.aqi / 3);
            } else {
                // Population Mode
                trees = "N/A";
                aqi = Math.floor(data.pop / 1000000) + 50;
                if (aqi > 300) aqi = 300;
                plastic = Math.floor(data.pop / 5000);
            }

            if (statAQI) statAQI.innerText = aqi + (aqi > 200 ? " (Hazardous)" : (aqi > 100 ? " (Unhealthy)" : " (Good)"));
            if (statTrees) statTrees.innerText = trees + " Ha";
            if (statPlastic) statPlastic.innerText = plastic + " Tons/Year";
            if (statAQI) statAQI.style.color = getPollutionColor(aqi);

            if (statsPanel) statsPanel.style.display = 'flex';

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
            if (flashText) flashText.textContent = news;
            if (newsFlash) newsFlash.style.display = 'flex';

            // --- Update News Cards Dynamically ---
            // Card 1: Tree/Forest Focus
            const c1t = document.getElementById('card1Title');
            const c1d = document.getElementById('card1Desc');
            const c2t = document.getElementById('card2Title');
            const c2d = document.getElementById('card2Desc');
            const c3t = document.getElementById('card3Title');
            const c3d = document.getElementById('card3Desc');

            if (c1t) c1t.innerText = `${key} Green Cover Under Threat`;
            if (c1d) c1d.innerText = `Deforestation in ${key} has reached alarming levels. ${trees} hectares of forest land lost recently. ${newsDesc}`;
            if (c2t) c2t.innerText = `${key} Air Quality Update`;
            if (c2d) c2d.innerText = `Air Quality Index in major areas of ${key} stands at ${aqi}. Residents are facing health challenges.`;
            if (c3t) c3t.innerText = `Preserving ${key}'s Water Bodies`;
            if (c3d) c3d.innerText = `Local rivers and lakes in ${key} are facing pollution from plastic waste (${plastic} Tons/Year). Urgent cleanup needed.`;

            // --- Map & Chart Logics ---
            if (effectiveMode === 'forest') {
                // Represent the whole state area (not just a city) so users see the state
                clearCityMarkers();
                if (currentMarker) map.removeLayer(currentMarker);
                const color = data.loss > 10000 ? 'red' : 'green';
                const stateRadius = 300000; // ~300km to indicate state area
                currentMarker = L.circle(data.coords, {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.2,
                    radius: stateRadius
                }).addTo(map).bindPopup(`<b>${key} (State Area)</b><br>Loss: ${data.loss} Ha`).openPopup();

                try {
                    map.fitBounds(currentMarker.getBounds(), { padding: [50, 50] });
                } catch (e) {
                    map.setView(data.coords, 6);
                }

                dashboardChart.data.labels = [key];
                dashboardChart.data.datasets[0].data = [data.loss];
                dashboardChart.data.datasets[0].backgroundColor = [color === 'red' ? '#e74c3c' : '#2ecc71'];
                dashboardChart.options.plugins.title.text = `Tree Cover Loss: ${key}`;
                dashboardChart.update();

            } else if (effectiveMode === 'pollution') {
                // Pollution Mode
                let existingMarker = cityMarkerMap[key];
                if (existingMarker) {
                    existingMarker.openPopup();
                } else {
                    const color = getPollutionColor(data.aqi);
                    const marker = L.circleMarker(data.coords, {
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.7,
                        radius: data.aqi > 200 ? 12 : 8
                    }).addTo(map).bindPopup(`<b>${key}</b><br>AQI: ${data.aqi}`);
                    marker.city = key;
                    cityMarkers.push(marker);
                    cityMarkerMap[key] = marker;
                    marker.openPopup();
                }

                const color = getPollutionColor(data.aqi);
                dashboardChart.data.labels = [key];
                dashboardChart.data.datasets[0].data = [data.aqi];
                dashboardChart.data.datasets[0].backgroundColor = [color];
                dashboardChart.options.plugins.title.text = `Current AQI Level: ${key}`;
                dashboardChart.update();
            } else if (effectiveMode === 'river') {
                // River Mode
                clearCityMarkers();
                if (currentMarker) map.removeLayer(currentMarker);
                const color = '#3498db'; // Blue for water
                const stateRadius = 300000;

                currentMarker = L.circle(data.coords, {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.3,
                    radius: stateRadius
                }).addTo(map).bindPopup(`<b>${key}</b><br>Rivers: ${data.count}<br>Major: ${data.major.join(', ')}`).openPopup();

                try {
                    map.fitBounds(currentMarker.getBounds(), { padding: [50, 50] });
                } catch (e) {
                    map.setView(data.coords, 6);
                }

                // Chart Update
                dashboardChart.data.labels = [key];
                dashboardChart.data.datasets[0].label = 'Number of Rivers';
                dashboardChart.data.datasets[0].data = [data.count];
                dashboardChart.data.datasets[0].backgroundColor = ['#3498db'];
                dashboardChart.options.plugins.title.text = `River Count: ${key}`;
                dashboardChart.update();

                // Update Info Cards
                if (c1t) c1t.innerText = `${key} River Network`;
                if (c1d) c1d.innerText = `${key} has approximately ${data.count} rivers. Major ones include ${data.major.join(', ')}.`;
                if (c2t) c2t.innerText = `Water Resources`;
                if (c2d) c2d.innerText = `Effectively managing these ${data.count} rivers is crucial for agriculture and drinking water in ${key}.`;
                if (c3t) c3t.innerText = `Conservation Status`;
                if (c3d) c3d.innerText = `Pollution control and river cleaning projects are ongoing for ${data.major[0] || 'rivers'} in this region.`;

            } else {
                // Population Mode
                clearCityMarkers();
                if (currentMarker) map.removeLayer(currentMarker);
                const color = '#3498db';
                const stateRadius = 300000;
                currentMarker = L.circle(data.coords, {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.2,
                    radius: stateRadius
                }).addTo(map).bindPopup(`<b>${key}</b><br>Population: ${data.pop.toLocaleString()}`).openPopup();

                try {
                    map.fitBounds(currentMarker.getBounds(), { padding: [50, 50] });
                } catch (e) {
                    map.setView(data.coords, 6);
                }

                // Reset/Show Chart for Population
                dashboardChart.data.labels = [key];
                dashboardChart.data.datasets[0].label = 'Population';
                dashboardChart.data.datasets[0].data = [data.pop];
                dashboardChart.data.datasets[0].backgroundColor = [color];
                dashboardChart.options.plugins.title.text = `Population: ${key}`;
                dashboardChart.update();

                // Update Info Cards for Population
                if (c1t) c1t.innerText = `${key} Population Stats`;
                if (c1d) c1d.innerText = `Total Population: ${data.pop.toLocaleString()}. High population density requires efficient resource management.`;
            }
        } else {
            alert("Location not found! Please select from the suggestions.");
        }
    }

    if (searchBtn) searchBtn.addEventListener('click', handleSearch);
    if (stateInput) stateInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });

    // Suggestions and auto-search behavior
    if (stateInput) stateInput.addEventListener('input', () => {
        const query = stateInput.value.trim();

        const box = createSuggestionsBox();
        box.innerHTML = '';
        if (query.length < 2) {
            box.style.display = 'none';
            return;
        }

        // If mode is selected, search that dataset; otherwise merge both for suggestions
        let keys = [];
        if (currentMode === 'forest') {
            keys = Object.keys(forestData);
        } else if (currentMode === 'pollution') {
            keys = Object.keys(pollutionData);
        } else if (currentMode === 'river') {
            keys = Object.keys(riverData);
        } else {
            // Default Population
            keys = Object.keys(populationData);
        }

        const lc = query.toLowerCase();
        const matches = keys.filter(k => k.toLowerCase().includes(lc));
        if (matches.length === 0) {
            box.style.display = 'none';
            return;
        }

        matches.slice(0, 100).forEach(key => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.style.padding = '8px 10px';
            item.style.cursor = 'pointer';
            item.style.borderTop = '1px solid #f0f0f0';
            item.innerText = key;
            item.addEventListener('click', () => {
                stateInput.value = key;
                box.style.display = 'none';
                // If the mode wasn't selected yet, pick the mode based on where the key exists
                // BUT user wants default to be Population if no mode selected, UNLESS they click a button.
                // WE should just respect the current visual mode.

                // However, the helper logic for suggestions might be tricky if we don't have a mode.
                // Let's stick to the visual mode. If visual mode is null, we are in population mode.

                handleSearch();
            });
            box.appendChild(item);
        });
        // Align and size suggestions box with input
        box.style.width = stateInput.offsetWidth + 'px';
        box.style.left = (stateInput.offsetLeft) + 'px';
        box.style.top = (stateInput.offsetTop + stateInput.offsetHeight) + 'px';
        box.style.display = 'block';
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!suggestionsBox) return;
        if (e.target === stateInput) return;
        if (!suggestionsBox.contains(e.target)) suggestionsBox.style.display = 'none';
    });

    // Initialize list (empty until typing)
    // Initialize list
    updateDatalist('population');

    // ---------------------------------------------------------
    // 5. Live Stats Simulation (Updated for New Dashboard)
    // ---------------------------------------------------------
    function simulateLiveStats() {
        const treeCounter = document.getElementById('globalTreeCounter');
        const aqiCounter = document.getElementById('globalAQICounter');
        const plasticCounter = document.getElementById('globalPlasticCounter');
        const fireCounter = document.getElementById('globalFireCounter');

        if (treeCounter) {
            setInterval(() => {
                let current = parseInt(treeCounter.innerText.replace(/,/g, ''));
                treeCounter.innerText = (current + 1).toLocaleString();
            }, 3000);
        }

        if (aqiCounter) {
            setInterval(() => {
                let current = parseInt(aqiCounter.innerText);
                let change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                aqiCounter.innerText = current + change;
            }, 4000);
        }

        if (plasticCounter) {
            setInterval(() => {
                let current = parseInt(plasticCounter.innerText.replace(/,/g, ''));
                plasticCounter.innerText = (current + 5).toLocaleString();
            }, 5000);
        }

        if (fireCounter) {
            setInterval(() => {
                let current = parseInt(fireCounter.innerText);
                let change = Math.floor(Math.random() * 3) - 1;
                fireCounter.innerText = current + change;
            }, 8000);
        }
    }

    simulateLiveStats();

    // Note: search/event listeners are attached above with guards; no re-attachment required.


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
            window.speechSynthesis.speak(utterance);
        }
    };
});
