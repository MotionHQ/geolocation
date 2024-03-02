const googleLocation = document.getElementById('get-location-button');
const weatherElement = document.getElementById('current-weather');
const restart = document.getElementById('restart-button');

// Function to fetch weather data from the OpenWeather API
function geoWeather(latitude, longitude) {
    const apiKey = '6ae663da59184d78c65f4d040c9a9670';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Extract relevant weather information
            // this determines the city (if available in the data)
            const locationName = data.name;
            console.log(locationName);
            // this determines the current temperature
            const currentTemperature = Math.trunc(data.main.temp);
            //this variable stores the perceived temperature
            const perceivedTemperature = Math.trunc(data.main.feels_like);
            // this determines the predicted maximum temperature for today
            const maxTemperature = Math.trunc(data.main.temp_max);
            //this is the current humidity
            const humidity = data.main.humidity;

            //show the div holding the weather information
            weatherElement.style.visibility = 'visible';  

            // Update the HTML with weather information
            weatherElement.innerHTML = `
            <h2>${locationName}</h2>
            <p>Current Temperature: ${currentTemperature}°C</p>
            <p>Feels Like: ${perceivedTemperature}°C</p>
            <p>Predicted Maximum Temperature: ${maxTemperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            `;
            // Append the "Try again" button to the weatherElement
            const tryAgainButton = document.createElement('button');
            tryAgainButton.textContent = 'Try again';
            tryAgainButton.id = 'restart-button';
            tryAgainButton.addEventListener('click', resetWeatherBox);
            weatherElement.appendChild(tryAgainButton);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Function to get user's location using Google Geolocation API
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.error('Geolocation is not supported by your browser');
    }
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Once you have the user's location, retrieve the weather data
    geoWeather(latitude, longitude);
}

function error() {
    console.error('Unable to retrieve your location');
}

// Function to reset the current weather box
function resetWeatherBox() {
    // Hide the div holding the weather information
    weatherElement.style.visibility = 'hidden';  
    // Hide the current weather section
    document.getElementById('current-weather').style.display = 'none';
    // Set the latitude and longitude values to ''
    longitude = '';
    latitude = '';
    // Make the get-location-button visible
    googleLocation.style.visibility = 'visible';
}

// Event listener for the "Try again" button
restart.addEventListener('click', () => {
    resetWeatherBox();
});

// Event listener for the "See how it Works!" button
googleLocation.addEventListener('click', () => {
    getUserLocation(); 
    // Hide the "See how it Works!" button
    googleLocation.style.visibility = 'hidden';
    // Show the weather section
    document.getElementById('current-weather').style.display = 'block';
    // Delay the visibility of the "Try again" button
    setTimeout(() => {
        restart.style.visibility = 'visible';
    }, 6000);
});


//hide the "Try again" button initially
restart.style.display = 'none';

