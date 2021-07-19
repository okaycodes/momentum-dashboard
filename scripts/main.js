
const bodyEl = document.getElementById('body')
const timeEl = document.getElementById('time-data')
const coinIdEl = document.getElementById('coin-id')
const coinImgEl = document.getElementById('coin-img')
const dogecoinEl = document.getElementById('dogecoin-data')
const bgCreatorEl = document.getElementById('bg-creator')

async function getBackground(){
  const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
  const data = await response.json()
  const url = data.urls.raw
  const creator = `By: ${data.user.name}`
  const img = new Image()
  img.src =  url
  img.onload = function () {
      bodyEl.style.backgroundImage = `url(${url})`
      bgCreatorEl.textContent = creator
      getCoin()
  }
}
// let interval = setInterval (getBackground, 8000)
setTimeout(getBackground, 8000)


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
  timeEl.textContent = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}
