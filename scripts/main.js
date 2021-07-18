
const bodyEl = document.getElementById('body')



fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
  .then(res => res.json())
  .then(data => {
          const url = `url(${data.urls.raw})`
  // let image = new Image()
  // image.src = url
  bodyEl.style.backgroundImage = url
})

// let interval = setInterval (getBackground, 4000)
setTimeout(getBackground(), 3000)
