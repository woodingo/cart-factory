var headerMenu = document.querySelectorAll('.header-menu')[0];
var burgerTumblr = document.querySelectorAll('.burger-tumblr')[0];
var openMenu = function() {
  headerMenu.classList.toggle('open');
}

burgerTumblr.addEventListener('click', openMenu);

