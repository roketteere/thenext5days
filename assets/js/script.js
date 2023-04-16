// global
var searchbox = document.getElementById('search-box');
var searchButton = document.getElementById('search-button');
var historyBody = document.getElementById('history-body');
var locate = document.getElementById('location');
var historyItem = document.querySelector('.history-item')
var his = document.getElementById('history-ph');

his.setAttribute('style',"display:none;")

// add last searched city to the history-box 
function saveSearch(city,parentElement) {
    let history = `<button class="history-item">${city}</button>`;
    let hisItem = document.createElement('button')
    hisItem.className = "history-item"
    hisItem.innerHTML = `${city}`
    parentElement.innerHTML += history;

}
// using the input city name, fetch weather information
function getCityCoords(city) {
    let lat = 0.0;
    let lon = 0.0;
    let savedHistory = [];
    let url = new URL(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=501097da5c0ccc04bda86f2d077d16bb`)
    savedHistory.push(city);
    fetch(url).then(response => response.json()).then(data => {
        lat = data[0].lat.toFixed(4);
        lon = data[0].lon.toFixed(4);
        // console.log('Data', data);
        data.forEach(function (day) {
            console.log('City: ', day.name);
            console.log('State: ',day.state);
            console.log('Latitude: ', day.lat.toFixed(4));
            console.log('Longitude: ',day.lon.toFixed(4));
            
            
        })

        fecthForecast(lat, lon);

        
    })
}

// get users current position and fill in the cards and dashboard
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentGPSConditions);
    } else {
        console.log('Could Not Get Current Location!');
        
    }
    
}
function fecthForecast(lat,lon) {
    let city = ''
    let temp = 0.0
    let wind = 0
    let humid = 0
    let icon = ''
    let description = ''
    let date = ''
    let API_KEY = "501097da5c0ccc04bda86f2d077d16bb"
    let url = new URL(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&units=imperial&appid=${API_KEY}`)
    var weather = []
    fetch(url).then(response => response.json()).then(data => {
        city = data.city.name
        
        for (var i = 0; i < data.list.length; i++) {
            weather.push(data.list[i])
            i += 7
        }
        weather.forEach((day, index) => {
            
            // console.log('Weather', day);
            console.log('day',day);
            console.log('Temp: ', temp = day.main.temp);
            console.log('Wind: ', wind = day.wind.speed);
            console.log('Humidity: ', humid = day.main.humidity,'%');
            console.log('Date: ', date = dayjs(day.dt_txt).format("M/DD/YYYY"));
            console.log('Description: ', description = day.weather[0].description);
            console.log('icon: ', icon = day.weather[0].icon);
            var iconURL = new URL(`https://openweathermap.org/img/wn/${icon}@2x.png`)
            var img = new Image('20')
            img.setAttribute("style",`"background-image:url${iconURL};"`)
            console.log('icon url: ', iconURL)
            var id = document.getElementById(`${index + 1}`)
            id.innerHTML=`<h2 class="dashcard-tile">${date}</h2>
                        <i class="dashcard-icon"><img src=${iconURL} height="80px" width="100px"/>
                        <p class="dashcard-temp">Temp: ${temp}F<span>&#176;</span></p>
                        <p class="dashcard-wind">Wind: ${wind} MPH</p>
                        <p class="dashcard-humidity">Humidity: ${humid} %</p>`
           
        })  
        var currentCity = document.getElementById('dash-city');
        var currentDate = document.getElementById('date');
        var currentTemp = document.getElementById('temp');
        var currentWind = document.getElementById('wind');
        var currentHumid = document.getElementById('humidity');
        var iconURL = new URL(`https://openweathermap.org/img/wn/${icon}@2x.png`)
        var img = new Image();
        img.setAttribute("style",`"background-image:url${iconURL};"`)
        currentCity.textContent = city;
        currentDate.textContent = dayjs().format("MMM DD, YYYY");
        currentTemp.innerHTML = `Temperature: ${weather[0].main.temp} F<span>&#176;</span>`;
        currentWind.textContent = `Wind: ${weather[0].wind.speed} MPH`;
        currentHumid.textContent = `Humidity: ${weather[0].main.humidity} %`
        console.log('',weather);
        
        
    })
    
}
// based on lat/lon fetch 5 day weather forecast from OpenWeather
function currentGPSConditions(currentPosition) {
    let lat = currentPosition.coords.latitude.toFixed(4);
    let lon = currentPosition.coords.longitude.toFixed(4);
    let city = ''
    let temp = 0.0
    let wind = 0
    let humid = 0
    let icon = ''
    let description = ''
    let date = ''
    let API_KEY = "501097da5c0ccc04bda86f2d077d16bb"
    let url = new URL(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&units=imperial&appid=${API_KEY}`)
    var weather = []
    fetch(url).then(response => response.json()).then(data => {
        city = data.city.name
        
        for (var i = 0; i < data.list.length; i++) {
            weather.push(data.list[i])
            i += 7
        }
        weather.forEach((day, index) => {
            
            // console.log('Weather', day);
            console.log('day',day);
            console.log('Temp: ', temp = day.main.temp);
            console.log('Wind: ', wind = day.wind.speed);
            console.log('Humidity: ', humid = day.main.humidity,'%');
            console.log('Date: ', date = dayjs(day.dt_txt).format("M/DD/YYYY"));
            console.log('Description: ', description = day.weather[0].description);
            console.log('icon: ', icon = day.weather[0].icon);
            var iconURL = new URL(`https://openweathermap.org/img/wn/${icon}@2x.png`)
            var img = new Image('20')
            img.setAttribute("style",`"background-image:url${iconURL};"`)
            console.log('icon url: ', iconURL)
            var id = document.getElementById(`${index + 1}`)
            id.innerHTML=`<h2 class="dashcard-tile">${date}</h2>
                        <i class="dashcard-icon"><img src=${iconURL} height="80px" width="100px"/>
                        <p class="dashcard-temp">Temp: ${temp}F<span>&#176;</span></p>
                        <p class="dashcard-wind">Wind: ${wind} MPH</p>
                        <p class="dashcard-humidity">Humidity: ${humid} %</p>`
           
        })  
        var currentCity = document.getElementById('dash-city');
        var currentDate = document.getElementById('date');
        var currentTemp = document.getElementById('temp');
        var currentWind = document.getElementById('wind');
        var currentHumid = document.getElementById('humidity');
        var iconURL = new URL(`https://openweathermap.org/img/wn/${icon}@2x.png`)
        var img = new Image();
        img.setAttribute("style",`"background-image:url${iconURL};"`)
        currentCity.textContent = city;
        currentDate.textContent = dayjs().format("MMM DD, YYYY");
        currentTemp.innerHTML = `Temperature: ${weather[0].main.temp} F<span>&#176;</span>`;
        currentWind.textContent = `Wind: ${weather[0].wind.speed} MPH`;
        currentHumid.textContent = `Humidity: ${weather[0].main.humidity} %`
        console.log('',weather);
        
        
    })
    
}
var inputString = ''
// event listener for history items
document.body.addEventListener('click', function (event) {
    console.log('ID/Class', event.target.className);
    if (event.target.className == 'history-item') {
        console.log('City', event.target.textContent);
        getCityCoords(event.target.textContent.toLowerCase())
        
    }
    
})

// event listener for search box "keyup" (as they type)
searchbox.addEventListener('keyup', function (event) {
    inputString = event.target.value
});

// event listener for the search box "keypress" (when they hit enter)
searchbox.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        saveSearch(event.target.value.toLowerCase(),historyBody)
        console.log('City: ', event.target.value);
        getCityCoords(event.target.value.toLowerCase())
        
    }
    
})

// event listener for the search button
searchButton.addEventListener('click', function (event) {
    event.target;
    console.log('Search Box: ', inputString);
    saveSearch(inputString,historyBody)
    getCityCoords(inputString.toLowerCase());
    
    
})

// event listener for location button
locate.addEventListener('click', function (event) {
    event.target;
    console.log('Location Requested');
    getCurrentLocation();
   
})



