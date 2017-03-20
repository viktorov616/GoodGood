'use strict';

function Slider(name) {
  this.name = name;
  this.controls = document.getElementById(this.name + '-controls');
  this.btnLeft = document.getElementById(this.name + '-btn-left');
  this.btnRight = document.getElementById(this.name + '-btn-right');
  this.slides = document.getElementsByClassName(this.name + '__item');

  this.slideLeft = this.slideLeft.bind(this);
  this.slideRight = this.slideRight.bind(this); 
  this.manageSlideChange = this.manageSlideChange.bind(this);
}

Slider.prototype._checkAnimations = function() {
  for (var i = 0; i < this.slides.length; i++) {
    if (this.slides[i].classList.contains(this.name + '__item--slide-right')
        || this.slides[i].classList.contains(this.name + '__item--slide-right-reverse')
        || this.slides[i].classList.contains(this.name + '__item--slide-left')
        || this.slides[i].classList.contains(this.name + '__item--slide-left-reverse')) {

      return true;
    }
  }

  return false;
}

Slider.prototype._setActiveBtn = function(currentSlide, nextSlide) {
  var currentBtn = this.controls.querySelector('span[data-number="' + currentSlide + '"]');
  var nextBtn = this.controls.querySelector('span[data-number="' + nextSlide + '"]');

  currentBtn.classList.remove(this.name + '__control-btn--active');
  nextBtn.classList.add(this.name + '__control-btn--active');
}

Slider.prototype._computeCurrentSlide = function() {
  var currentSlide;

  for (var i = 0; i < this.slides.length; i++) {
    if (!this.slides[i].classList.contains(this.name + '__item--hide')) {
      currentSlide = i;

      break;
    }
  }

  return currentSlide;
}

Slider.prototype._changeSlide = function(nextSlide, direction) {
  var currentSlide = this._computeCurrentSlide();

  if (this._checkAnimations() || nextSlide == currentSlide) {
    return;
  }

  var self = this;
  var computedDirection = direction || ((currentSlide < nextSlide) ? 'left' : 'right');

  this.slides[currentSlide].classList.add(this.name + '__item--slide-' + computedDirection);

  this.slides[nextSlide].classList.add(
    this.name + '__item--slide-' + computedDirection + '-reverse'
  );
  this.slides[nextSlide].classList.remove(this.name + '__item--hide');
  this._setActiveBtn(currentSlide, nextSlide)

  this.timerRight = setTimeout(function() {
    self.slides[currentSlide].classList.add(self.name + '__item--hide');
    self.slides[nextSlide].classList.remove(
      self.name + '__item--slide-' + computedDirection + '-reverse'
    );
    self.slides[currentSlide].classList.remove(self.name + '__item--slide-'  + computedDirection);
  }, 900);
}

Slider.prototype.slideLeft = function() {
  var currentSlide = this._computeCurrentSlide();
  var nextSlide = (currentSlide != 0) ? (currentSlide - 1) : (this.slides.length - 1);

  this._changeSlide(nextSlide, 'right');
}

Slider.prototype.slideRight = function() {
  var currentSlide = this._computeCurrentSlide();
  var nextSlide = (currentSlide != this.slides.length - 1) ? (currentSlide + 1) : 0;

  this._changeSlide(nextSlide, 'left');
}

Slider.prototype.manageSlideChange = function(e) {
  var target = e.target;

  while (target !== this.controls) {
    if (target.dataset.number) {
      this._changeSlide(target.dataset.number);

      return;
    }

    target = target.parentElement;
  }
}

var promoSlider = new Slider('promo-slider');

promoSlider.btnLeft.addEventListener('click', promoSlider.slideLeft);
promoSlider.btnRight.addEventListener('click', promoSlider.slideRight);
promoSlider.controls.addEventListener('click', promoSlider.manageSlideChange);

var testimonialsSlider = new Slider('testimonials');

testimonialsSlider.btnLeft.addEventListener('click', testimonialsSlider.slideLeft);
testimonialsSlider.btnRight.addEventListener('click', testimonialsSlider.slideRight);
testimonialsSlider.controls.addEventListener('click', testimonialsSlider.manageSlideChange);
