const apiKey ="YOUR_API_KEY"; //ENTER YOUR API KEY FROM openweathermap.org
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // API URL for weather data

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
let error = document.querySelector(".error");
let weather = document.querySelector(".weather");
let maps = document.querySelector(".maps");
let city = "Prague"; // default city --> re-do for users location in future

async function checkWeather (city) {
    const response = await fetch(apiURL + city + "&appid=" + apiKey);
    const data = await response.json();
    console.log(data);
    
    // controle of response
    if (response.status == 200) {
        console.log("OK 200");
    }

    if (response.status == 404) {
        console.log(data.message);
        weather.style.display = "none";
        error.style.display = "block";
        error.innerHTML = data.message.toUpperCase();
        maps.style.display = "none";
        return

    } else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = (Math.round(data.main.temp * 10) / 10).toFixed(1) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "assets/img/clouds.png";
                break;
            
            case "Clear":
                weatherIcon.src = "assets/img/clear.png";
                break;
                
            case "Rain":
                weatherIcon.src = "assets/img/rain.png";
                break;
            
            case "Drizzle":
                weatherIcon.src = "assets/img/drizzle.png";
                break;
            
            case "Mist":
                weatherIcon.src = "assets/img/mist.png";
                break;
    
            default:
                break;
        }
        weather.style.display = "block";
        error.style.display = "none";
        maps.style.display = "block";
        

        document.querySelector(".maps").innerHTML = `<iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/search?q=${city}&key=[YOUR_API_KEY]"></iframe>`; //enter your API key from google

    }
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value === "") {
        error.style.display = "block";
        error.innerHTML = "Please enter a city name";
        weather.style.display = "none";
        maps.style.display = "none";
        searchBox.value = ""; // clear the searchBox after every search
    } else {
        checkWeather(searchBox.value);
        searchBox.value = "";
    }
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchBtn.click();
        searchBox.value = "";
    }
});

checkWeather(city); // run app with default city