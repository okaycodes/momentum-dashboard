
const bodyEl = document.getElementById('body')
const dogecoinEl = document.getElementById('dogecoin-data')


async function getBackground(){
  const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
  const data = await response.json()
  const url = data.urls.raw
  const img = new Image()
  img.src =  url
  img.onload = function () {
      bodyEl.style.backgroundImage = `url(${url})`
  }
}
// let interval = setInterval (getBackground, 8000)
// setTimeout(getBackground, 8000)


async function getCoin(){
  const response = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  const data = await response.json()
  const unorderedList = document.createElement('ul')
  const html = `<li> 🎯:  $${data.market_data.current_price.usd}</li>
          <li> ↗️:  $${data.market_data.high_24h.usd}</li>
          <li> ↘️:  $${data.market_data.low_24h.usd}</li>`
  unorderedList.innerHTML = html
  const img = new Image()
  const imgUrl = data.image.thumb
  img.src = imgUrl
  img.onload = function(){
    dogecoinEl.appendChild(img)
    dogecoinEl.appendChild(unorderedList)
  }
}

getCoin()
