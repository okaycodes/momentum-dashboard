
const bodyEl = document.getElementById('body')
const timeEl = document.getElementById('time-data')
const inputEl = document.getElementById('input')
const coinIdEl = document.getElementById('coin-id')
const weatherEl = document.getElementById('weather')
const coinImgEl = document.getElementById('coin-img')
const dogecoinEl = document.getElementById('dogecoin-data')
const bgCreatorEl = document.getElementById('bg-creator')
const bgLocationEl = document.getElementById('bg-location')
const weatherIconEl = document.getElementById('weather-icon')
const weatherLocationEl = document.getElementById('weather-location')
let weatherLocation = "Lagos"




function getBackground(){
  fetch("https://apis.scrimba.ocom/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
      const url = data.urls.full
      const img = new Image()
      img.src =  url
      img.onload = function () {
          bodyEl.style.backgroundImage = `url(${url})`
          bgCreatorEl.textContent = `Pic by: ${data.user.name}`
          bgLocationEl.textContent = `Location: ${data.location.name}`
          getCoin()
      }
    }).catch( err => {
      console.log(err)
      const url = "https://images.unsplash.com/photo-1486673748761-a8d18475c757?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2ODUzODQ&ixlib=rb-1.2.1&q=85"
      const img = new Image()
      img.src =  url
      img.onload = function () {
          bodyEl.style.backgroundImage = `url(${url})`
          bgCreatorEl.textContent = `Pic by: Karsten Würth`
          bgLocationEl.textContent = `Location: Alsheim, Germany`
          getCoin()
      }
    })
}
// let interval = setInterval (getBackground, 8000)
// setTimeout(getBackground, 800)
getBackground()


async function getCoin(){
  const response = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  const data = await response.json()
  const imgUrl = data.image.thumb
  coinImgEl.src = imgUrl
  coinImgEl.onload = function(){
    const coinDataEl = document.createElement('ul')
    const html = `<li> 🎯:  $${data.market_data.current_price.usd}</li>
            <li> ↗️:  $${data.market_data.high_24h.usd}</li>
            <li> ↘️:  $${data.market_data.low_24h.usd}</li>`
    coinDataEl.innerHTML = html
    coinIdEl.textContent = `${data.id}`
    dogecoinEl.appendChild(coinDataEl)
    currentTime()
  }
}


function currentTime(){
  date = new Date()
  let time = document.createElement('p')
  time.textContent = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  input.classList.add('input')
  timeEl.appendChild(time)
}

function getWeather(){
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${weatherLocation}&units=metric`)
      .then(response => response.json())
      .then(data=>{
        let img = new Image()
        let input = document.createElement('input')
        let weatherLocationEl = document.createElement(p)
        let weatherDescriptionEl =  document.createElement('p')
        let temperatureEl = `<p class="temp">${Math.floor(data.main.temp)}<sup>o</sup>C`
        input.placeholder = "Enter Weather Location e.g. Lagos, New York"
        weatherDescriptionEl.textContent =  data.weather[0].description
        img.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
        img.onload = function(){
          weatherIconEl.innerHTML = temperatureEl
          weatherIconEl.appendChild(img)
          weatherEl.appendChild(weatherDescriptionEl)
        }
      }).catch (error => {
        console.log(error)
      })
}

getWeather()


document.addEventListener('keypress', function(event){
  if(event.keyCode === 13 && inputEl.value>1){
    location = inputEl.value
    getWeather()
  }
  })
