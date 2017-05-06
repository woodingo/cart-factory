var logo = document.getElementById("logo");
var animationStatus = false;
var stopAnimation = function() {
  logo.classList.remove("play");
  animationStatus = false;
  console.log('stop');
}

logo.addEventListener("mouseover", function(ev) {
  if (!animationStatus) {
    logo.classList.add("play");
    animationStatus = true;
    console.log('play');
    setTimeout(stopAnimation, 1500);
  }
});
