
const bodyEl = document.getElementById('body')


async function getBackground(){
  const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
  const data = await response.json()
  const url = data.urls.raw
  let img = new Image()
  img.onload = function () {
      bodyEl.style.backgroundImage = `url(${url})`
  }
  img.src =  url
}
// let interval = setInterval (getBackground, 8000)
setTimeout(getBackground, 8000)


async function getCoin(){
  const response = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  const data = await response.json()
  const imgUrl = data.image.thumb
  const  currentPrice = data.market_data.current_price.usd
}
