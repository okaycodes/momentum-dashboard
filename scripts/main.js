
const bodyEl = document.getElementById('body')


function getBackground(){
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
  .then(res => res.json())
  .then(data => {
    const url = data.urls.raw
    let img = new Image()
    img.onload = function () {
      bodyEl.style.backgroundImage = `url(${url})`
    }
    img.src =  url
})
}
// let interval = setInterval (getBackground, 8000)
setTimeout(getBackground, 8000)
