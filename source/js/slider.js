'use strict';

function Slider(name) {
  this.name = name;
  this.controls = document.getElementById(this.name + '-controls');
  this.btnLeft = document.getElementById(this.name + '-btn-left');
  this.btnRight = document.getElementById(this.name + '-btn-right');
  this.slides = document.getElementsByClassName(this.name + '__item');

  this.slideLeft = this.slideLeft.bind(this);
  this.slideRight = this.slideRight.bind(this); 
  this.changeSlide = this.changeSlide.bind(this);
}

Slider.prototype.slideLeft = function() {
  var self = this;

  if (this.checkAnimations()) {
    return;
  }

  for (var i = 0, max = this.slides.length; i < max; i++) {
    if (!this.slides[i].classList.contains(this.name + '__item--hide')) {
      var currentBtn = self.controls.querySelector('span[data-number="' + i + '"]');
      var nextBtn = self.controls.querySelector(
        'span[data-number="' + ((i != 0) ? i - 1 : max - 1) + '"]'
      );

      currentBtn.classList.remove(self.name + '__control-btn--active');
      nextBtn.classList.add(self.name + '__control-btn--active');
      this.slides[i].classList.add(this.name + '__item--slide-left');

      this.slides[(i != 0) ? i - 1 : max - 1].classList.add(this.name + '__item--slide-left-reverse');
      this.slides[(i != 0) ? i - 1 : max - 1].classList.remove(this.name + '__item--hide');

      this.timerLeft = setTimeout(function() {
        self.slides[i].classList.add(self.name + '__item--hide');
        self.slides[(i != 0) ? i - 1 : max - 1].classList.remove(self.name + '__item--slide-left-reverse');
        self.slides[i].classList.remove(self.name + '__item--slide-left');
      }, 900);

      break;
    }
  }
}

Slider.prototype.slideRight = function() {
  var self = this;

  if (this.checkAnimations()) {
    return;
  }

  for (var i = 0, max = this.slides.length; i < max; i++) {
    if (!this.slides[i].classList.contains(this.name + '__item--hide')) {
      var currentBtn = self.controls.querySelector('span[data-number="' + i + '"]');
      var nextBtn = self.controls.querySelector(
        'span[data-number="' + ((i != max - 1) ? i + 1 : 0) + '"]'
      );

      currentBtn.classList.remove(self.name + '__control-btn--active');
      nextBtn.classList.add(self.name + '__control-btn--active');
      this.slides[i].classList.add(this.name + '__item--slide-right');

      this.slides[(i != max - 1) ? i + 1 : 0].classList.add(this.name + '__item--slide-right-reverse');
      this.slides[(i != max - 1) ? i + 1 : 0].classList.remove(this.name + '__item--hide');

      this.timerRight = setTimeout(function() {
        self.slides[i].classList.add(self.name + '__item--hide')
        self.slides[(i != max - 1) ? i + 1 : 0].classList.remove(self.name + '__item--slide-right-reverse');
        self.slides[i].classList.remove(self.name + '__item--slide-right');
      }, 900);

      break;
    }
  }
}

Slider.prototype.checkAnimations = function() {
  for (var i = 0, max = this.slides.length; i < max; i++) {
    if (this.slides[i].classList.contains(this.name + '__item--slide-right')
        || this.slides[i].classList.contains(this.name + '__item--slide-right-reverse')
        || this.slides[i].classList.contains(this.name + '__item--slide-left')
        || this.slides[i].classList.contains(this.name + '__item--slide-left-reverse')) {

      return true;
    }
  }

  return false;
}

Slider.prototype.changeSlide = function(e) {
  var target = e.target;
  var self = this;

  while (target !== this.controls) {
    if (target.dataset.number) {
      changeSlide(target.dataset.number)
    }

    target = target.parentElement;
  }

  function changeSlide(number) {
    var currentSlide;

    for (var i = 0, max = self.slides.length; i < max; i++) {
      if (!self.slides[i].classList.contains(self.name + '__item--hide')) {
        currentSlide = i;

        break;
      }
    }

    if (self.checkAnimations() || number == currentSlide) {
      return;
    }

    var currentBtn = self.controls.querySelector('span[data-number="' + currentSlide + '"]');
    var nextBtn = self.controls.querySelector('span[data-number="' + number + '"]');
    var side = (currentSlide < number) ? 'left' : 'right'

    self.slides[currentSlide].classList.add(self.name + '__item--slide-' + side);

    self.slides[number].classList.add(self.name + '__item--slide-' + side + '-reverse');
    self.slides[number].classList.remove(self.name + '__item--hide');

    currentBtn.classList.remove(self.name + '__control-btn--active');
    nextBtn.classList.add(self.name + '__control-btn--active');

    self.timerRight = setTimeout(function() {
      self.slides[currentSlide].classList.add(self.name + '__item--hide');
      self.slides[number].classList.remove(self.name + '__item--slide-' + side + '-reverse');
      self.slides[currentSlide].classList.remove(self.name + '__item--slide-'  + side);
    }, 900);
  }
}

var promoSlider = new Slider('promo-slider');

promoSlider.btnLeft.addEventListener('click', promoSlider.slideLeft);
promoSlider.btnRight.addEventListener('click', promoSlider.slideRight);
promoSlider.controls.addEventListener('click', promoSlider.changeSlide);

var testimonialsSlider = new Slider('testimonials');

testimonialsSlider.btnLeft.addEventListener('click', testimonialsSlider.slideLeft);
testimonialsSlider.btnRight.addEventListener('click', testimonialsSlider.slideRight);
testimonialsSlider.controls.addEventListener('click', testimonialsSlider.changeSlide);
