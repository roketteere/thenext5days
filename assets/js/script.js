function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fecthForecast);
    } else {
        console.log('Could Not Get Current Location!');
        
    }
    
}
//TODO Create event listeners for searchbox
//TODO Create input listeners for buttons
//TODO fetch api via city etc...
function getCityCoords(city) {
    var url = new URL(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=501097da5c0ccc04bda86f2d077d16bb`)
}

function fecthForecast(currentPosition) {
    let lat = currentPosition.coords.latitude.toFixed(4);
    let lon = currentPosition.coords.longitude.toFixed(4);
    let city = ''
    let temp = 0.0
    let wind = 0
    let humid = 0
    let icon = ''
    let description = ''
    let date = ''
    let api = new URL(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=501097da5c0ccc04bda86f2d077d16bb`)
    let API_KEY = "501097da5c0ccc04bda86f2d077d16bb"
    let url = new URL(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&units=imperial&appid=${API_KEY}`)
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

getCurrentLocation()

// console.log(`<div id="day-one" class="dashcard">
// <h2 class="dashcard-tile">4/15/2023</h2>
// <i class="dashcard-icon fa fa-sun"></i>
// <p class="dashcard-temp">Temp: 40.89 F<span>&#176;</span></p>
// <p class="dashcard-wind">Wind: 15 MPH</p>
// <p class="dashcard-humidity">Humidity: 10 %</p>
// </div>`);
