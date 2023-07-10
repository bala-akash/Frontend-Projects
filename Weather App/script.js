const apiKey='5b5a32733aec3f7148c5d0ef678f8668'
const weatherDataEl=document.getElementById('weather-data')
const cityInputEl=document.getElementById('userInput')
const formEl= document.querySelector('form')
formEl.addEventListener('submit', (event)=>{
    event.preventDefault();//inorder to controll the submission
    const cityName=cityInputEl.value;
    console.log(cityName)
    getweatherData(cityName)
})
console.log(weatherDataEl,cityInputEl,formEl)

async /* <== delay the funtion*/function getweatherData(cityName){
    //The best way to Fetch data  from API is by using Try & Catch Method
    try {
        const response= await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error (NetworkError)
        }
        const data= await response.json()
        const temperature= Math.round(data.main.temp);
        const description= data.weather[0].description;
        const icon= data.weather[0].icon;
        const details= [
            `Feels Like : ${Math.round(data.main.feels_like)}`,
            `Humidity : ${data.main.humidity}%`,
            `Wind Speed : ${data.wind.speed} m/s`

        ]
        console.log(data)
        weatherDataEl.querySelector('.icon').innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather">`
        weatherDataEl.querySelector('.temperature').textContent=`${temperature}° C`
        weatherDataEl.querySelector('.description').textContent=`${description}`
        weatherDataEl.querySelector('.details').innerHTML= details.map((detail)=>`<div>${detail}</div>`).join('')
    } catch (error) {
        weatherDataEl.querySelector('.icon').innerHTML='';
        weatherDataEl.querySelector('.details').innerHTML="";
        weatherDataEl.querySelector('.temperature').textContent="";
        weatherDataEl.querySelector('.description').textContent="An Error occurred  Please try again";
    }
}
