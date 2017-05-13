'use strict'

var preloader = document.querySelectorAll('.preloader')[0];

$(function() {
  setTimeout(function() {
    preloader.classList.toggle('hide');
  }, 600);
  setTimeout(function() {
    preloader.classList.toggle('show');
  }, 900);
});