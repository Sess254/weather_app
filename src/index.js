import "./styles.css"
const API_KEY = '6f4a89ba09f1208eafb0a41a68e18522'
const userInputForm = document.querySelector('[data-user-input-form]')
const userInput = document.querySelector('[data-user-input]')
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&units=metric`

let input = ""

userInputForm.addEventListener('submit', e => {
    e.preventDefault()
    input = userInput.value
    console.log(userInput.value)
    fetchWeatherData(input)
    userInput.value = ""
})

async function fetchWeatherData(city){
   
    try{
        const res = await fetch(apiUrl + `&q=${city}`)
        const data = await res.json()
        
        console.log(data)


        if(!res.ok) {
            alert(`Opps!City not found`)
        }

    } catch (error) {
        console.log(`error fetching data`)
    }


    
}

// fetchWeatherData()