const get = (id) => document.getElementById(id)

const bodyEl = get('body')
const timeEl = get('time-data')
const inputEl = get('input')
const coinIdEl = get('coin-id')
const weatherEl = get('weather')
const coinImgEl = get('coin-img')
const dogecoinEl = get('dogecoin-data')
const settingsEl = get('settings')
const bgCreatorEl = get('bg-creator')
const bgLocationEl = get('bg-location')
const weatherIconEl = get('weather-icon')
const weatherLocationEl = get('weather-location')
const weatherDescriptionEl = get('weather-desc')
let weatherLocation = "Lagos"




function getBackground(){
  fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
      const url = data.urls.full
      const img = new Image()
      img.src =  url
      img.onload = function () {
          bodyEl.style.backgroundImage = `url(${url})`
          bgCreatorEl.textContent = `Pic by: ${data.user.name}`
          bgLocationEl.textContent = `Location: ${data.location.name}`
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
  timeEl.appendChild(time)
}

function getWeather(){
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${weatherLocation}&units=metric`)
      .then(response => response.json())
      .then(data=>{

        let img = new Image()
        let currentLocation = document.createElement('p')
        let tempEl = document.createElement('p')
        img.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
        tempEl.innerHTML = `<p class="temp">${Math.floor(data.main.temp)}<sup>o</sup>C</p>`
        img.onload = function(){
          weatherIconEl.innerHTML = ""
          weatherIconEl.appendChild(img)
          weatherIconEl.appendChild(tempEl)
          weatherLocationEl.textContent = `Location: ${weatherLocation}`
          weatherDescriptionEl.textContent =  data.weather[0].description
        }
      })
}

getWeather()


settingsEl.addEventListener('click', function(){
  if(inputEl.style.display === "none"){
    inputEl.style.display = "block"
    hideBar()
  }else{
    inputEl.style.display = "none"
  }
})

document.addEventListener('keypress', function(event){
  if(event.keyCode === 13){
    console.log('keypressed')
    weatherLocation = inputEl.value
    inputEl.value = ""
    inputEl.style.display = "none"
    getWeather()
  }
})

function hideBar(){
  document.addEventListener('click', function(event){
    let isClicked = inputEl.contains(event.target)
    let settingsIsClicked = settingsEl.contains(event.target)
    if(!isClicked && !settingsIsClicked){
      inputEl.style.display = "none"
    }
  })
}
