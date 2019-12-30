const canvas = document.querySelector('#drawer');
canvas.width = window.innerWidth * 2
canvas.height = window.innerHeight * 2
canvas.style.width = `${window.innerWidth}px`
canvas.style.height = `${window.innerHeight}px)`

// which context are we drawing things in? 2D, 3D?
const context = canvas.getContext('2d')
context.scale(2, 2)

// slow it down :)
let aimx = null
let aimY = null
let currentX = null
let currentY = null

let i = 0
const images = ['images/furbygif.gif', 'images/gem.png'].map(src => {
  const image = document.createElement('img')
  image.src = src
  return image
})

document.addEventListener('mousemove', function(event) {
  aimX = event.pageX
  aimY = event.pageY
  if (currentX === null) {
    currentX = event.pageX
    currentY = event.pageY
  }
})

// for mobile 
canvas.addEventListener('touchmove', function(event) {
  event.preventDefault();
  aimX = event.pageX
  aimY = event.pageY
  if (currentX === null) {
    currentX = event.pageX
    currentY = event.pageY
  }
})

canvas.addEventListener('click', function() {
  i++
  if (i >= images.length) {
    i = 0
  }
})

const draw = function() {
  if (currentX) {
    if (images[i].complete) {
      // on 2D context, draw! 400 width, 600 height
      // page location of mousemove event
      // shift over so not always from top left corner (200 & 300)

      context.drawImage(images[i], currentX - 200, currentY - 200, 200, 200)
    }
    currentX = currentX + (aimX - currentX) * 0.1;
    currentY = currentY + (aimY - currentY) * 0.1;
  }
//   wait for the next frame and then do this again 
  requestAnimationFrame(draw)
}

const button = document.querySelector('#drawBegin');
var clickCount = 0;
button.addEventListener('click', function(event){
  clickCount++;
  draw();
  if (clickCount > 1) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  button.innerHTML = 'clean gems';
  button.style="background: white;";
});

// draw();