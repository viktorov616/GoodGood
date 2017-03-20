'use strict';

function Menu() {
  this.btnOpen = document.getElementById('nav-toggle-open');
  this.btnClose = document.getElementById('nav-toggle-close');
  this.mainNav = document.getElementById('main-nav');

  this.open = this.open.bind(this);
  this.close = this.close.bind(this);
}

Menu.prototype.open = function() {
  clearTimeout(this.timerMainNavShow);
  clearTimeout(this.timerMainNavHide);

  this.mainNav.classList.remove('main-nav--hide')

  this.btnOpen.classList.add('main-header__nav-controls-btn--hide');
  this.btnClose.classList.remove('main-header__nav-controls-btn--hide');
  this.mainNav.classList.add('main-nav--show');
}

Menu.prototype.close = function() {
  var self = this;

  this.btnOpen.classList.remove('main-header__nav-controls-btn--hide');
  this.btnClose.classList.add('main-header__nav-controls-btn--hide');

  this.mainNav.classList.add('main-nav--hide');

  this.timerMainNavShow = setTimeout(function() { self.mainNav.classList.remove('main-nav--show') }, 900),
  this.timerMainNavHide = setTimeout(function() { self.mainNav.classList.remove('main-nav--hide') }, 900);  
}

var menu = new Menu();

menu.btnOpen.addEventListener('click', menu.open);
menu.btnClose.addEventListener('click', menu.close);


