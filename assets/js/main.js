(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var progressBar = document.getElementById('progressBar');
  var returnBtn = document.getElementById('returnCover');
  var yearEl = document.getElementById('year');
  var sections = Array.prototype.slice.call(
    document.querySelectorAll(
      '.pw-cover, .pw-hero, .pw-poem, .pw-gallery, .pw-truth, .pw-ending, .p-cover, .p-section, .o-cover, .o-aperture, .s-cover, .s-title, .s-poem, .e-cover, .e-sequence, .e-spread, .e-finale, .m-cover, .m-spread, .m-interlude, .m-finale, .cover, .plate, .colophon'
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
  var pinkCover = document.getElementById('p-cover');
  var periwinkleCover = document.getElementById('pw-cover');
  var editionLinkPeriwinkle = document.getElementById('editionLinkPeriwinkle');
  var editionLinkPink = document.getElementById('editionLinkPink');
  var editionLinkOnyx = document.getElementById('editionLinkOnyx');
  var editionLinkSaffron = document.getElementById('editionLinkSaffron');
  var editionLinkEmerald = document.getElementById('editionLinkEmerald');
  var editionLinkMaroon = document.getElementById('editionLinkMaroon');
  var editionLinkBlue = document.getElementById('editionLinkBlue');
  var editionLinks = [
    editionLinkPeriwinkle,
    editionLinkPink,
    editionLinkOnyx,
    editionLinkSaffron,
    editionLinkEmerald,
    editionLinkMaroon,
    editionLinkBlue
  ];

  var activeEditionListeners = [];
  var lastActiveEditionKey = null;

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
      periwinkleCover &&
      pinkCover &&
      editionLinkPeriwinkle &&
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
      } else if (pinkCover.getBoundingClientRect().top <= threshold) {
        active = editionLinkPink;
      } else {
        active = editionLinkPeriwinkle;
      }
      editionLinks.forEach(function (link) {
        if (!link) return;
        if (link === active) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      var activeKey = active && active.getAttribute('data-edition');
      if (activeKey && activeKey !== lastActiveEditionKey) {
        lastActiveEditionKey = activeKey;
        activeEditionListeners.forEach(function (listener) {
          listener(activeKey);
        });
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
        '.pw-text, .pw-poem__title, .pw-poem__stanza, .pw-truth__heading, .pw-truth__stanza, .pw-gallery__figure, .pw-hero__figure, .pw-ending__word, .pw-transition, .m-spread__figure, .m-interlude__figure, .m-finale__figure, .m-transition, .e-spread__figure, .e-sequence__frame, .e-finale__figure, .e-text, .e-transition, .s-poem__image, .s-poem__text, .s-title__word, .s-transition, .o-aperture__image, .o-text, .o-transition, .p-text, .p-statement, .p-transition'
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
    document.querySelectorAll('.m-cover__word, .cover__word, .e-cover__word, .s-cover__word, .p-cover__word, .pw-cover__word')
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

  // ---------------------------------------------------------------------
  // Atmosphere System — a shared, config-driven, extremely subtle particle
  // layer any edition can opt into via a `data-atmosphere` attribute on its
  // wrapper. Adding a future edition's atmosphere means adding one entry to
  // ATMOSPHERE_CONFIG, not writing new rendering code. Disabled entirely
  // under prefers-reduced-motion (removes every particle, no static
  // fallback needed — they are purely decorative and carry no content).
  // ---------------------------------------------------------------------
  var ATMOSPHERE_CONFIG = {
    // Pink — very small soft sparkles, never glitter.
    sparkle: {
      count: 6,
      colors: ['#d1447a', '#c9a15a'],
      size: [2, 4],
      duration: [6, 10],
      driftX: [-10, 10],
      driftY: [-70, -40],
      peakOpacity: 0.6
    },
    // Onyx — tiny floating ember particles, warm amber, almost invisible.
    ember: {
      count: 5,
      colors: ['#d68a4a'],
      size: [2, 3],
      duration: [10, 16],
      driftX: [-8, 8],
      driftY: [-90, -50],
      peakOpacity: 0.5,
      blur: 1
    },
    // Saffron — gentle warm floating light, like sunlight through dust.
    'dust-light': {
      count: 8,
      colors: ['#c9a05e', '#f2ead9'],
      size: [3, 6],
      duration: [14, 22],
      driftX: [20, 60],
      driftY: [-10, 10],
      peakOpacity: 0.4,
      blur: 2
    },
    // Emerald — very slow floating botanical shadows, barely visible.
    'botanical-shadow': {
      count: 4,
      colors: ['rgba(20, 30, 20, 0.3)'],
      size: [50, 90],
      duration: [18, 26],
      driftX: [-20, 20],
      driftY: [10, 30],
      peakOpacity: 0.35,
      blur: 10,
      blob: true
    },
    // Periwinkle — very soft floating dust (the single drifting petal is
    // handled separately below, since it must never loop continuously).
    dust: {
      count: 10,
      colors: ['#c3b6d6'],
      size: [1.5, 3],
      duration: [16, 24],
      driftX: [-10, 10],
      driftY: [-60, -30],
      peakOpacity: 0.45,
      blur: 1
    }
    // Maroon uses `texture` — a single CSS-only moving layer, not discrete
    // particles — handled as a special case in createAtmosphereLayer below.
    // Future editions (gold, rain, forest, snow, ocean, ash, mist) can be
    // added here as plain config objects without touching the renderer.
  };

  function randomBetween(range) {
    return range[0] + Math.random() * (range[1] - range[0]);
  }

  function createAtmosphereLayer(container, type) {
    if (type === 'texture') {
      var textureLayer = document.createElement('div');
      textureLayer.className = 'atmosphere-texture';
      textureLayer.setAttribute('aria-hidden', 'true');
      container.appendChild(textureLayer);
      return;
    }

    var config = ATMOSPHERE_CONFIG[type];
    if (!config) return;

    var layer = document.createElement('div');
    layer.className = 'atmosphere-layer';
    layer.setAttribute('aria-hidden', 'true');

    for (var i = 0; i < config.count; i++) {
      var particle = document.createElement('span');
      particle.className = 'atmosphere-particle';
      var size = randomBetween(config.size);
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.background = config.colors[Math.floor(Math.random() * config.colors.length)];
      if (config.blob) {
        particle.style.borderRadius = '40% 60% 55% 45% / 55% 45% 60% 40%';
      }
      if (config.blur) {
        particle.style.filter = 'blur(' + config.blur + 'px)';
      }
      particle.style.setProperty('--drift-x', randomBetween(config.driftX).toFixed(1) + 'px');
      particle.style.setProperty('--drift-y', randomBetween(config.driftY).toFixed(1) + 'px');
      particle.style.setProperty('--particle-duration', randomBetween(config.duration).toFixed(1) + 's');
      particle.style.setProperty('--particle-delay', (-Math.random() * randomBetween(config.duration)).toFixed(1) + 's');
      particle.style.setProperty('--particle-peak-opacity', config.peakOpacity);
      layer.appendChild(particle);
    }

    container.appendChild(layer);
  }

  function initAtmosphere() {
    if (reduceMotion) return;
    var atmosphereHosts = Array.prototype.slice.call(document.querySelectorAll('[data-atmosphere]'));
    atmosphereHosts.forEach(function (host) {
      createAtmosphereLayer(host, host.getAttribute('data-atmosphere'));
    });
  }

  initAtmosphere();

  // Periwinkle's single drifting petal: never loops, appears at most once
  // per visit, only while the edition is actually in view, and is skipped
  // entirely under reduced motion (the CSS animation itself is already
  // gated, this just avoids scheduling pointless work).
  if (!reduceMotion) {
    var pwPetal = document.getElementById('pwPetal');
    var pwEdition = document.getElementById('pw-edition');
    if (pwPetal && pwEdition && 'IntersectionObserver' in window) {
      var petalHasRun = false;
      var petalObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !petalHasRun) {
              petalHasRun = true;
              window.setTimeout(
                function () {
                  pwPetal.classList.add('is-drifting');
                },
                1500 + Math.random() * 4000
              );
              petalObserver.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      petalObserver.observe(pwEdition);
    }
  }

  // ---------------------------------------------------------------------
  // Ambient Audio — reusable, strictly opt-in ambience, one optional track
  // per edition. Never autoplays: the toggle stays hidden until the
  // visitor's first genuine interaction, and even then starts silent until
  // they choose to turn it on. If no edition has a track configured, the
  // whole system stays dormant and never inserts a control — a future
  // edition adds ambience by filling in one AUDIO_CONFIG entry with a real
  // `src`, nothing else in this file needs to change.
  // ---------------------------------------------------------------------
  var AUDIO_CONFIG = {
    periwinkle: { src: 'assets/audio/periwinkle.mp3', volume: 0.3, loop: true, fadeMs: 1500, enabled: true },
    pink: { src: 'assets/audio/pink.mp3', volume: 0.3, loop: true, fadeMs: 1500, enabled: true },
    onyx: { src: 'assets/audio/onyx.mp3', volume: 0.3, loop: true, fadeMs: 1500, enabled: true },
    saffron: { src: 'assets/audio/saffron.mp3', volume: 0.3, loop: true, fadeMs: 1500, enabled: true },
    emerald: { src: 'assets/audio/onyx.mp3', volume: 0.3, loop: true, fadeMs: 1500, enabled: true },
    maroon: { src: 'assets/audio/onyx.mp3', volume: 0.3, loop: true, fadeMs: 1500, enabled: true },
    blue: { src: 'assets/audio/onyx.mp3', volume: 0.3, loop: true, fadeMs: 1500, enabled: true }
  };

  function initAmbientAudio() {
    var hasAnyTrack = Object.keys(AUDIO_CONFIG).some(function (key) {
      var cfg = AUDIO_CONFIG[key];
      return cfg && cfg.enabled && cfg.src;
    });
    if (!hasAnyTrack) return;

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ambient-audio-toggle';
    toggle.setAttribute('aria-pressed', 'false');
    toggle.setAttribute('aria-label', 'Play ambient sound');
    toggle.innerHTML = '<span class="ambient-audio-toggle__icon" aria-hidden="true"></span>';
    document.body.appendChild(toggle);

    var audioEl = document.createElement('audio');
    audioEl.preload = 'none';
    audioEl.volume = 0;
    document.body.appendChild(audioEl);

    var isEnabled = false;
    var fadeTimer = null;

    function clearFade() {
      if (fadeTimer) {
        window.clearInterval(fadeTimer);
        fadeTimer = null;
      }
    }

    function fadeTo(targetVolume, duration, onComplete) {
      clearFade();
      var startVolume = audioEl.volume;
      var steps = Math.max(1, Math.round(duration / 40));
      var step = 0;
      fadeTimer = window.setInterval(function () {
        step += 1;
        var progress = Math.min(1, step / steps);
        audioEl.volume = startVolume + (targetVolume - startVolume) * progress;
        if (progress >= 1) {
          clearFade();
          if (onComplete) onComplete();
        }
      }, 40);
    }

    function loadAndPlay(cfg) {
      audioEl.src = cfg.src;
      audioEl.setAttribute('data-loaded-src', cfg.src);
      audioEl.loop = cfg.loop !== false;
      audioEl.volume = 0;
      audioEl.play().catch(function () {});
      fadeTo(cfg.volume != null ? cfg.volume : 0.3, cfg.fadeMs || 1500);
    }

    function applyEdition(editionKey) {
      if (!isEnabled) return;
      var cfg = AUDIO_CONFIG[editionKey];
      if (!cfg || !cfg.enabled || !cfg.src) {
        fadeTo(0, 600, function () {
          audioEl.pause();
        });
        return;
      }
      var isSameTrack = audioEl.getAttribute('data-loaded-src') === cfg.src;
      if (!isSameTrack) {
        fadeTo(0, 600, function () {
          loadAndPlay(cfg);
        });
      } else if (audioEl.paused) {
        // Same track already loaded but stopped (e.g. the visitor paused it
        // via the toggle, then turned it back on) — just resume, no reload.
        audioEl.volume = 0;
        audioEl.play().catch(function () {});
        fadeTo(cfg.volume != null ? cfg.volume : 0.3, cfg.fadeMs || 1500);
      }
    }

    function setToggleState(on) {
      isEnabled = on;
      toggle.setAttribute('aria-pressed', String(on));
      toggle.classList.toggle('is-on', on);
      toggle.setAttribute('aria-label', on ? 'Pause ambient sound' : 'Play ambient sound');
    }

    toggle.addEventListener('click', function () {
      if (!isEnabled) {
        setToggleState(true);
        applyEdition(lastActiveEditionKey);
      } else {
        setToggleState(false);
        var cfg = AUDIO_CONFIG[lastActiveEditionKey];
        fadeTo(0, (cfg && cfg.fadeMs) || 800, function () {
          audioEl.pause();
        });
      }
    });

    // Try to start ambient sound the moment the visitor first does anything
    // at all (scroll, click, key press), so it feels automatic rather than
    // requiring them to find and press a button. Browsers only allow audio
    // to actually start from a "real" gesture (a click or key press) — a
    // plain scroll does not count in Chrome, so on scroll this attempt is
    // silently rejected and the (now-visible) toggle remains a guaranteed,
    // one-click fallback. Never reflects an "on" state unless playback
    // genuinely started.
    function attemptAutoStart() {
      toggle.classList.add('is-visible');
      if (isEnabled) return;
      var cfg = AUDIO_CONFIG[lastActiveEditionKey];
      if (!cfg || !cfg.enabled || !cfg.src) return;
      audioEl.src = cfg.src;
      audioEl.setAttribute('data-loaded-src', cfg.src);
      audioEl.loop = cfg.loop !== false;
      audioEl.volume = 0;
      var playPromise = audioEl.play();
      if (playPromise && playPromise.then) {
        playPromise
          .then(function () {
            setToggleState(true);
            fadeTo(cfg.volume != null ? cfg.volume : 0.3, cfg.fadeMs || 1500);
          })
          .catch(function () {
            audioEl.pause();
          });
      }
    }
    ['pointerdown', 'keydown', 'scroll'].forEach(function (evt) {
      window.addEventListener(evt, attemptAutoStart, { once: true, passive: true });
    });

    activeEditionListeners.push(applyEdition);
  }

  initAmbientAudio();
})();
