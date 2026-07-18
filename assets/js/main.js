(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var progressBar = document.getElementById('progressBar');
  var returnBtn = document.getElementById('returnCover');
  var yearEl = document.getElementById('year');
  var sections = Array.prototype.slice.call(
    document.querySelectorAll(
      '.p-cover, .p-section, .o-cover, .o-aperture, .s-cover, .s-title, .s-poem, .e-cover, .e-sequence, .e-spread, .e-finale, .m-cover, .m-spread, .m-interlude, .m-finale, .cover, .plate, .colophon'
    )
  );

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var ticking = false;
  var onyxCover = document.getElementById('o-cover');
  var saffronCover = document.getElementById('s-cover');
  var emeraldCover = document.getElementById('e-cover');
  var maroonCover = document.getElementById('m-cover');
  var blueCover = document.getElementById('cover');
  var editionLinkPink = document.getElementById('editionLinkPink');
  var editionLinkOnyx = document.getElementById('editionLinkOnyx');
  var editionLinkSaffron = document.getElementById('editionLinkSaffron');
  var editionLinkEmerald = document.getElementById('editionLinkEmerald');
  var editionLinkMaroon = document.getElementById('editionLinkMaroon');
  var editionLinkBlue = document.getElementById('editionLinkBlue');
  var editionLinks = [
    editionLinkPink,
    editionLinkOnyx,
    editionLinkSaffron,
    editionLinkEmerald,
    editionLinkMaroon,
    editionLinkBlue
  ];

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

    if (
      onyxCover &&
      saffronCover &&
      emeraldCover &&
      maroonCover &&
      blueCover &&
      editionLinkPink &&
      editionLinkOnyx &&
      editionLinkSaffron &&
      editionLinkEmerald &&
      editionLinkMaroon &&
      editionLinkBlue
    ) {
      var threshold = window.innerHeight * 0.5;
      var active;
      if (blueCover.getBoundingClientRect().top <= threshold) {
        active = editionLinkBlue;
      } else if (maroonCover.getBoundingClientRect().top <= threshold) {
        active = editionLinkMaroon;
      } else if (emeraldCover.getBoundingClientRect().top <= threshold) {
        active = editionLinkEmerald;
      } else if (saffronCover.getBoundingClientRect().top <= threshold) {
        active = editionLinkSaffron;
      } else if (onyxCover.getBoundingClientRect().top <= threshold) {
        active = editionLinkOnyx;
      } else {
        active = editionLinkPink;
      }
      editionLinks.forEach(function (link) {
        if (!link) return;
        if (link === active) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
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

  // Edition index click handling: smooth-scroll to the target edition's
  // cover instead of relying on a native anchor jump (consistent with the
  // return-to-top button above). Active-state tracking lives in
  // updateOnScroll, keyed off the same scroll loop.
  editionLinks.forEach(function (link) {
    if (!link) return;
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href');
      var target = targetId && document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  // Maroon Edition: gentle reveal-on-scroll for spread images and the
  // transition band. Progressive enhancement only — everything is fully
  // visible by default; this merely arms a hidden-until-revealed state.
  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal-armed');

    var revealTargets = Array.prototype.slice.call(
      document.querySelectorAll(
        '.m-spread__figure, .m-interlude__figure, .m-finale__figure, .m-transition, .e-spread__figure, .e-sequence__frame, .e-finale__figure, .e-text, .e-transition, .s-poem__image, .s-poem__text, .s-title__word, .s-transition, .o-aperture__image, .o-text, .o-transition, .p-text, .p-statement, .p-transition'
      )
    );

    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
    });
  }

  // Oversized masthead words (SAFFRON, EMERALD, MAROON, BLUE) are sized with CSS
  // clamp(), but actual glyph metrics vary by which font in the stack a
  // given device resolves (e.g. iOS renders the real Didot, wider than
  // desktop fallbacks; font-stretch: condensed is not honoured everywhere).
  // Measure the rendered word against its available box and shrink in small
  // steps until it fits, so the masthead can never clip on any device.
  // EMERALD is set in vertical writing-mode, so its "length" axis is height
  // rather than width — detect that and compare the matching dimension.
  function fitMastheadWord(el) {
    if (!el) return;
    el.style.fontSize = '';
    var computed = window.getComputedStyle(el);
    var size = parseFloat(computed.fontSize);
    if (!size) return;
    var isVertical = computed.writingMode.indexOf('vertical') === 0;
    var minSize = size * 0.72;
    var guard = 40;
    function overflowing() {
      return isVertical ? el.scrollHeight > el.clientHeight + 1 : el.scrollWidth > el.clientWidth + 1;
    }
    while (overflowing() && size > minSize && guard-- > 0) {
      size -= 1;
      el.style.fontSize = size + 'px';
    }
  }

  var mastheadWords = Array.prototype.slice.call(
    document.querySelectorAll('.m-cover__word, .cover__word, .e-cover__word, .s-cover__word, .p-cover__word')
  );

  function fitAllMastheads() {
    mastheadWords.forEach(fitMastheadWord);
  }

  fitAllMastheads();

  var resizeTicking = false;
  window.addEventListener(
    'resize',
    function () {
      if (!resizeTicking) {
        window.requestAnimationFrame(function () {
          fitAllMastheads();
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    },
    { passive: true }
  );

  // Pink Edition: the Living Light — a small warm point of light present
  // throughout the edition. Its resting position per chapter is driven by
  // a class on the sticky track (set via IntersectionObserver, so it works
  // identically on touch and desktop — a "predetermined path"). On fine
  // pointers only, a small additional offset nudges it gently toward the
  // cursor; a gentle tap on the Tinkerbell chapter gives it one brief pulse.
  // None of this gates the text, which reveals automatically regardless.
  var pLightTrack = document.querySelector('.p-light-track');
  var pLight = document.getElementById('pLight');

  if (pLightTrack && 'IntersectionObserver' in window) {
    var lightChapters = [
      { id: 'p-cover', state: 'at-cover' },
      { id: 'p-arrives', state: 'at-arrives' },
      { id: 'p-effect', state: 'at-effect' },
      { id: 'p-tinkerbell', state: 'at-tinkerbell' },
      { id: 'p-centre', state: 'at-centre' },
      { id: 'p-letter', state: 'at-letter' },
      { id: 'p-blush', state: 'at-blush' },
      { id: 'p-transition', state: 'at-transition' }
    ];

    var lightStates = lightChapters.map(function (c) {
      return c.state;
    });

    var lightObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var match = lightChapters.filter(function (c) {
            return document.getElementById(c.id) === entry.target;
          })[0];
          if (!match) return;
          lightStates.forEach(function (state) {
            pLightTrack.classList.remove(state);
          });
          pLightTrack.classList.add(match.state);
        });
      },
      { threshold: 0.5 }
    );

    lightChapters.forEach(function (c) {
      var el = document.getElementById(c.id);
      if (el) lightObserver.observe(el);
    });
  }

  if (pLight && !reduceMotion) {
    var supportsFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (supportsFinePointer) {
      var targetDx = 0;
      var targetDy = 0;
      var currentDx = 0;
      var currentDy = 0;
      var pointerTicking = false;
      var pEditionVisible = false;
      var easingActive = false;

      window.addEventListener(
        'mousemove',
        function (event) {
          if (pointerTicking) return;
          pointerTicking = true;
          window.requestAnimationFrame(function () {
            var vw = window.innerWidth;
            var vh = window.innerHeight;
            targetDx = ((event.clientX - vw / 2) / vw) * 24;
            targetDy = ((event.clientY - vh / 2) / vh) * 24;
            pointerTicking = false;
          });
        },
        { passive: true }
      );

      // Only run the continuous easing loop while Pink Edition is actually
      // in view, so this doesn't become a forever-running animation loop
      // for the rest of the page's lifetime after the visitor scrolls on.
      function easeLight() {
        if (!pEditionVisible) {
          easingActive = false;
          return;
        }
        currentDx += (targetDx - currentDx) * 0.05;
        currentDy += (targetDy - currentDy) * 0.05;
        pLight.style.setProperty('--p-light-dx', currentDx.toFixed(1) + 'px');
        pLight.style.setProperty('--p-light-dy', currentDy.toFixed(1) + 'px');
        window.requestAnimationFrame(easeLight);
      }

      var pEdition = document.getElementById('p-edition');
      if (pEdition && 'IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            pEditionVisible = entry.isIntersecting;
            if (pEditionVisible && !easingActive) {
              easingActive = true;
              window.requestAnimationFrame(easeLight);
            }
          });
        }).observe(pEdition);
      }
    }

    var tinkerbellSection = document.getElementById('p-tinkerbell');
    if (tinkerbellSection) {
      tinkerbellSection.addEventListener(
        'pointerdown',
        function () {
          pLight.classList.add('is-touched');
          window.setTimeout(function () {
            pLight.classList.remove('is-touched');
          }, 700);
        },
        { passive: true }
      );
    }
  }
})();
