document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // Scroll-triggered reveal animations
  // ==========================================
  var revealElements = document.querySelectorAll('.reveal, .reveal-left');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ==========================================
  // Sticky nav — show after scrolling past hero
  // ==========================================
  var nav = document.querySelector('.nav');
  var hero = document.querySelector('.hero');

  if (nav && hero) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          nav.classList.remove('visible');
        } else {
          nav.classList.add('visible');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-60px 0px 0px 0px'
    });

    navObserver.observe(hero);
  }

  // ==========================================
  // Active nav link tracking
  // ==========================================
  var navLinks = document.querySelectorAll('.nav-links a');
  var sections = [];

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      var target = document.querySelector(href);
      if (target) {
        sections.push({ el: target, link: link });
      }
    }
  });

  if (sections.length > 0) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          var match = sections.find(function (s) { return s.el === entry.target; });
          if (match) match.link.classList.add('active');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(function (s) {
      sectionObserver.observe(s.el);
    });
  }

  // ==========================================
  // Project filtering with smooth transitions
  // ==========================================
  var filterButtons = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
