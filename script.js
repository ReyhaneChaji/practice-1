// Initialize the map
var map = L.map('map').setView([0, 0], 2);

// Set up the OSM layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marker for the ISS location
var issMarker = L.marker([0, 0]).addTo(map);

// Function to update ISS location
function updateISSLocation() {
    fetch('http://api.open-notify.org/iss-now.json')
        .then(response => response.json())
        .then(data => {
            var lat = data.iss_position.latitude;
            var lon = data.iss_position.longitude;
            issMarker.setLatLng([lat, lon]);
            map.setView([lat, lon], map.getZoom());
        })
        .catch(error => console.log('Error:', error));
}

// Update the ISS location every 5 seconds
setInterval(updateISSLocation, 5000);

// Initial call to set the ISS location on load
updateISSLocation();
