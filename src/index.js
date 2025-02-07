import "./styles.css"
import partlyCloudy from "./icons/partly-cloudy-day.svg"
import clear from "./icons/clear-day.svg"
import foggy from "./icons/fog.svg"
import rainy  from "./icons/rain.svg"
import thunderstorm from "./icons/thunder-rain.svg"
import snowy from "./icons/snow.svg"
import drizzle from "./icons/showers-day.svg"
import misty from "./icons/fog.svg"
import defaultWeatherIcon from "./icons/wind.svg"
const API_KEY = '6f4a89ba09f1208eafb0a41a68e18522'
const userInputForm = document.querySelector('[data-user-input-form]')
const userInput = document.querySelector('[data-user-input]')
const weatherIcon = document.querySelector('.weather-icon')
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&units=metric`


let input = ""

userInputForm.addEventListener('submit', e => {
    e.preventDefault()
    input = userInput.value
    fetchWeatherData(input)
    userInput.value = ""
    input = null
})

async function fetchWeatherData(city){
   
    try{
        const res = await fetch(apiUrl + `&q=${city}`)
        const data = await res.json()
        console.log(data)

        document.querySelector('.city').innerHTML = data.name
        document.querySelector('.temp').innerHTML = Math.ceil(data.main.temp) + `&deg;C`
        document.querySelector('.wind').innerHTML = data.wind.speed + `KM/H`
        document.querySelector('.humidity').innerHTML = data.main.humidity + `%`
        document.querySelector('.description').innerHTML = data.weather[0].description


        // if (data.weather[0].main == "Clouds") {
        //     weatherIcon.src = partlyCloudy
        // } 
        // else if (data.weather[0].main == "Clear") {
        //     weatherIcon.src = clear
        // } 
        // else if (data.weather[0].main == "Rain") {
        //     weatherIcon.scr = rainy
        // } 
        // else if (data.weather[0].main == "Thunderstorm") {
        //     weatherIcon.src = thunderstorm
        // } 
        // else if (data.weather[0].main == "Snow") {
        //     weatherIcon.src = snowy
        // } 
        // else if (data.weather[0].main == "Drizzle") {
        //     weatherIcon.src = drizzle
        // }
        // else if (data.weather[0].main == "Fog") {
        //     weatherIcon.src = foggy
        // } else if (data.weather[0].main == "Mist") {
        //     weatherIcon.src = misty
        // }

        switch (data.weather[0].main) {
            case "Clouds":
              weatherIcon.src = partlyCloudy;
              break;
            case "Clear":
              weatherIcon.src = clear;
              break;
            case "Rain":
              weatherIcon.src = rainy;
              break;
            case "Thunderstorm":
              weatherIcon.src = thunderstorm;
              break;
            case "Snow":
              weatherIcon.src = snowy;
              break;
            case "Drizzle":
              weatherIcon.src = drizzle;
              break;
            case "Fog":
              weatherIcon.src = foggy;
            case "Mist": // Mist and Fog could be handled the same way
              weatherIcon.src = misty;
              break;
            default:
              // Handle unknown weather conditions (optional)
              console.log("Unknown weather condition:", data.weather[0].main);
              weatherIcon.src = defaultWeatherIcon; // Or a placeholder icon
          }

        document.querySelector('.weather-card').style.display = "block"
        document.querySelector('.error-message').innerHTML = ""


        if(!res.ok) {
            alert(`Opps!City not found`)
            document.querySelector('.error-message').innerHTML = `City Not Found`
            document.querySelector('.weather-card').style.display = "none"
        }

    } catch (error) {
        document.querySelector('.error-message').innerHTML = `City Not Found`
        document.querySelector('.weather-card').style.display = "none"
    }


    
}