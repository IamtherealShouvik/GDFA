//Preloader
let totalPreloaderTime = 0;
let preloaderStartTime; 
function showPreloader() {
    document.querySelector('.preloader').style.display = 'flex';
    preloaderStartTime = new Date();
}
function hidePreloader() {
    document.querySelector('.preloader').style.display = 'none';
    const currentTime = new Date();
    const elapsedTime = currentTime - preloaderStartTime;
    totalPreloaderTime += elapsedTime;
    console.log("Preloader elapsed time: " + elapsedTime + " milliseconds");
    console.log("Total preloader time: " + totalPreloaderTime + " milliseconds");
    localStorage.setItem('totalPreloaderTime', totalPreloaderTime);
    document.getElementById('elapsed').innerText =  totalPreloaderTime + " ms";
}

window.addEventListener('load', function() {
    showPreloader();
    setTimeout(function() {
        hidePreloader();
    }, 100);
});

// Show image inside the mentioned div
document.addEventListener('DOMContentLoaded', function() {
    const imageSrc = localStorage.getItem('imageSrc');
    if (imageSrc) {
        const img = new Image();
        img.src = imageSrc;
        img.onload = function() {
            const displayImageWidth = document.querySelector('.displayimage').offsetWidth;
            const displayImageHeight = document.querySelector('.displayimage').offsetHeight;
            const aspectRatio = img.width / img.height;
            let newWidth, newHeight;
            if (aspectRatio > 1) {
                newWidth = displayImageWidth;
                newHeight = displayImageWidth / aspectRatio;
            } else {
                newHeight = displayImageHeight;
                newWidth = displayImageHeight * aspectRatio;
            }
            img.style.width = newWidth + 'px';
            img.style.height = newHeight + 'px';
            const marginLeft = (displayImageWidth - newWidth) / 2; //Centering
            img.style.marginLeft = marginLeft + 'px';
            document.querySelector('.displayimage').innerHTML = '';
            document.querySelector('.displayimage').appendChild(img);
        };
    } else {
        const symbol = document.createElement('i');
        symbol.classList.add('ri-error-warning-line');
        document.querySelector('.displayimage').innerHTML = '';
        document.querySelector('.displayimage').appendChild(symbol);
    }
    localStorage.removeItem('imageSrc');
});



// Accuracy Slider (to be edited)
var slider = document.getElementById("mapshift");
var counter = document.getElementById("counter");
slider.oninput = function() {
  var value = parseFloat(this.value).toFixed(2);
  counter.innerHTML = value + "%";
  var percent = (this.value - this.min) / (this.max - this.min);
   var color = 'linear-gradient(to right, #ff0 0%, #ff0 ' + percent*100 + '%, #d3d3d3 ' + percent*100 + '%)';
  this.style.background = color; }

  function smoothThumbTransition(newPosition) {
    var currentPosition = parseFloat(slider.value);
    var distance = newPosition - currentPosition;
    var steps = Math.abs(distance);
    var stepDuration = 10; // Duration for each step in milliseconds
    var stepValue = distance / steps;
    
    // Animate the thumb to the new position step by step
    var interval = setInterval(function() {
      currentPosition += stepValue;
      slider.value = currentPosition.toFixed(2);
      counter.innerHTML = currentPosition.toFixed(2);
      
      // Stop the animation when the thumb reaches the new position
      if ((stepValue > 0 && currentPosition >= newPosition) || (stepValue < 0 && currentPosition <= newPosition)) {
        clearInterval(interval);
      }
    }, stepDuration);
  }