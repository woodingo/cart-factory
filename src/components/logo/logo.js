var topPanelLogo = document.getElementById("top-panel-logo");
var animationStatus = false;
var stopAnimation = function() {
  topPanelLogo.classList.remove("play");
  animationStatus = false;
  console.log('stop');
}

topPanelLogo.addEventListener("mouseover", function(ev) {
  if (!animationStatus) {
    topPanelLogo.classList.add("play");
    animationStatus = true;
    console.log('play');
    setTimeout(stopAnimation, 1500);
  }
});
