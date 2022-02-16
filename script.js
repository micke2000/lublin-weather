const mainImg = document.querySelector("div.img")
const tomImg = document.querySelector("div.img.tom")
const main = document.querySelector('h2.main')
const mainTom = document.querySelector('div.tomorrow h2.main')
const temp_real = document.querySelector('h2.temp_real')
const temp_tom = document.querySelector('div.tomorrow h2.temp')
const temp_feel = document.querySelector('h2.temp_feel')
const wind = document.querySelector('h2.wind')
const body = document.querySelector("body")
const currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat=51.246452&lon=22.568445&appid=c643bbec04494f57c471fe8b667da972&units=metric"
const timeAPI = "https://www.timeapi.io/api/Time/current/coordinate?latitude=51.246452&longitude=22.568445"
const dailyWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=51.246452&lon=22.568445&exclude=current,minutely,hourly,alerts&appid=c643bbec04494f57c471fe8b667da972&units=metric"

function setData(data) {
    // console.log()
    mainImg.style.backgroundImage = `url('https://openweathermap.org/img/wn/${data['weather']['0'].icon}@4x.png')`;
    main.textContent = data['weather']['0'].main
    temp_real.innerHTML = "Temperature: " + Number(data['main'].temp).toFixed() + '&#176C'
    temp_feel.innerHTML = "Feels like: " + Number(data['main'].feels_like).toFixed() + '&#176C'
    wind.innerHTML = "Wind: " + data['wind'].speed + " m/s"
    if (Number(data['dt']) > Number(data['sys'].sunset) || Number(data['dt']) < Number(data['sys'].sunrise)) {
        body.style.backgroundImage = 'url("./img/z19642579V,Choc-Lublinowi-daleko-do-amerykanskiego-Las-Vegas-.jpg")'
        document.querySelector('html').classList.add("dark")
    }
}
function setDaily(data){
    data = data.daily[1]
    console.log(data)
    tomImg.style.backgroundImage = `url('https://openweathermap.org/img/wn/${data['weather']['0'].icon}@4x.png')`;
    mainTom.textContent = data['weather']['0'].main
    temp_tom.innerHTML = Number(data.temp.day).toFixed() + '&#176C'
}
const dailyWeatherResponse = fetch(dailyWeatherAPI).then(res => {
        if (res.ok) return res
        else throw new Error("Error weather daily api")
    }).then(data => {
        return data.json();
    }).then(data=>setDaily(data))
    .catch(error => console.log(error))
const weatherResponse = fetch(currentWeatherAPI)
    .then(res => {
        if (res.ok) return res
        else throw new Error("Error weather api")
    })
    .then(data => {
        return data.json();
    })
    .then(data => {
        console.log(data);
        setData(data)
    })
    .catch(error => console.log(error));