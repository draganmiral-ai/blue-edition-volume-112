(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var progressBar = document.getElementById('progressBar');
  var returnBtn = document.getElementById('returnCover');
  var yearEl = document.getElementById('year');
  var sections = Array.prototype.slice.call(document.querySelectorAll('.cover, .plate, .colophon'));

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var ticking = false;

  function updateOnScroll() {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var scrollHeight = doc.scrollHeight - doc.clientHeight;
    var ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

    if (progressBar) {
      progressBar.style.width = (ratio * 100).toFixed(2) + '%';
    }

    if (returnBtn) {
      if (scrollTop > window.innerHeight * 0.6) {
        returnBtn.classList.add('is-visible');
      } else {
        returnBtn.classList.remove('is-visible');
      }
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateOnScroll();

  if (returnBtn) {
    returnBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  // Optional keyboard navigation between editorial moments.
  // Only acts when focus is not inside an interactive control, and only
  // on ArrowDown/ArrowUp/Home/End, leaving all default scrolling untouched.
  document.addEventListener('keydown', function (event) {
    var active = document.activeElement;
    var isInteractive =
      active &&
      (active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.tagName === 'SELECT' ||
        active.isContentEditable);

    if (isInteractive || event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }

    var currentIndex = sections.findIndex(function (section) {
      var rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
    });

    if (currentIndex === -1) return;

    var behavior = reduceMotion ? 'auto' : 'smooth';

    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      var next = sections[Math.min(currentIndex + 1, sections.length - 1)];
      next.scrollIntoView({ behavior: behavior, block: 'start' });
      event.preventDefault();
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      var prev = sections[Math.max(currentIndex - 1, 0)];
      prev.scrollIntoView({ behavior: behavior, block: 'start' });
      event.preventDefault();
    } else if (event.key === 'Home') {
      sections[0].scrollIntoView({ behavior: behavior, block: 'start' });
      event.preventDefault();
    } else if (event.key === 'End') {
      sections[sections.length - 1].scrollIntoView({ behavior: behavior, block: 'start' });
      event.preventDefault();
    }
  });

  // Very subtle desktop-only parallax on plate imagery.
  var supportsParallax =
    !reduceMotion && window.matchMedia('(min-width: 900px)').matches && 'IntersectionObserver' in window;

  if (supportsParallax) {
    var parallaxImgs = Array.prototype.slice.call(document.querySelectorAll('.plate__figure img'));
    var visible = new Set();

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visible.add(entry.target);
          } else {
            visible.delete(entry.target);
            entry.target.style.transform = '';
          }
        });
      },
      { rootMargin: '10% 0px 10% 0px' }
    );

    parallaxImgs.forEach(function (img) {
      io.observe(img);
    });

    function updateParallax() {
      visible.forEach(function (img) {
        var rect = img.getBoundingClientRect();
        var center = rect.top + rect.height / 2 - window.innerHeight / 2;
        var shift = Math.max(-14, Math.min(14, center * -0.02));
        img.style.transform = 'translateY(' + shift.toFixed(2) + 'px)';
      });
      window.requestAnimationFrame(updateParallax);
    }

    window.requestAnimationFrame(updateParallax);
  }
})();
