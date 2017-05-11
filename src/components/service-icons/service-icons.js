var iconDev = document.getElementById("service-icon-dev");
var iconDevAnimationStatus = false;
var iconDevStopAnimation = function() {
  iconDev.classList.remove("play");
  iconDevAnimationStatus = false;
  console.log('stop');
}

iconDev.addEventListener("mouseover", function(ev) {
  if (!animationStatus) {
    iconDev.classList.add("play");
    iconDevAnimationStatus = true;
    console.log('play');
    setTimeout(iconDevStopAnimation, 9000);
  }
});