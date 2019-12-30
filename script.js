const canvas = document.querySelector('#drawer');
canvas.width = window.innerWidth * 2
canvas.height = window.innerHeight * 2
canvas.style.width = `${window.innerWidth}px`
canvas.style.height = `${window.innerHeight}px)`
const context = canvas.getContext('2d')
context.scale(2, 2)

let aimx = null
let aimY = null
let currentX = null
let currentY = null


image = document.createElement('img');
image.src = 'images/furbygif.gif';

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

const draw = function() {
  if (currentX) {
    if (image.complete) {
      context.drawImage(image, currentX - 100, currentY - 100, 200, 200)
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
  button.style="color: white;";
});
