(function () {
  'use strict';

  var nav        = document.getElementById('site-nav');
  var hamburger  = document.getElementById('nav-hamburger');
  var navLinks   = document.getElementById('nav-links');
  var goTop      = document.getElementById('go-top');

  // --- Sticky navigation + go-top visibility ---
  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 80) {
      nav.classList.add('is-sticky');
    } else {
      nav.classList.remove('is-sticky');
    }

    if (scrollY > 400) {
      goTop.classList.add('active');
    } else {
      goTop.classList.remove('active');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Mobile hamburger toggle ---
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Smooth scroll for all anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Go top ---
  if (goTop) {
    goTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- WOW.js init ---
  if (typeof WOW !== 'undefined') {
    new WOW({
      boxClass:     'wow',
      animateClass: 'animated',
      offset:       80,
      mobile:       false,
      live:         false
    }).init();
  }

}());
