/* ===========================
   IMAGE PLACEHOLDERS
   Replaces any unloaded assets/ image with a picsum photo.
   Uses a hash of the src path for a consistent seed per slot.
   =========================== */
function hashSeed(str) {
  var h = 5381;
  for (var i = 0; i < str.length; i++) {
    h = ((h << 5) + h) + str.charCodeAt(i);
    h |= 0;
  }
  return (Math.abs(h) % 900) + 10;
}

function picsumUrl(seed, w, h) {
  return 'https://picsum.photos/seed/' + seed + '/' + w + '/' + h;
}

function initImagePlaceholders() {
  document.querySelectorAll('img').forEach(function(img) {
    var attr = img.getAttribute('src') || '';

    /* ---- Logo: skip — real PNG is in assets/fotos/ ---- */
    if (attr.includes('logo')) return;

    /* ---- Only act on assets/ images ---- */
    if (!attr.includes('assets/')) return;

    /* ---- Pick dimensions based on where the image lives ---- */
    var w = 1200, h = 800;
    if (img.closest('.project-image-wrap'))  { w = 1400; h = 900;  }
    if (img.closest('.detail-single-image')) { w = 1600; h = 1000; }
    if (img.closest('.slideshow-slide'))     { w = 1600; h = 900;  }
    if (img.closest('.freeform-gallery'))    { w = 1000; h = 760;  }
    if (img.closest('.gallery-grid-3'))      { w = 900;  h = 680;  }
    if (img.closest('.gallery-grid-4'))      { w = 800;  h = 600;  }
    if (img.closest('.gallery-grid-2'))      { w = 1000; h = 750;  }
    if (img.closest('.gallery-row'))         { w = 600;  h = 800;  }
    if (img.closest('.product-gallery'))     { w = 900;  h = 680;  }
    if (img.closest('.about-image-col'))     { w = 600;  h = 820;  }
    if (img.closest('.detail-gallery-top .gallery-inline-video')) return; // skip video poster slots

    var seed = hashSeed(attr);
    img.src = picsumUrl(seed, w, h);
  });

  /* ---- Add poster frames only to placeholder videos (not real files) ---- */
  document.querySelectorAll('video').forEach(function(video) {
    if (video.poster) return;
    var s = video.querySelector('source');
    var src = s ? (s.getAttribute('src') || '') : '';
    if (src.includes('fotos/')) return; /* real file — skip */
    video.poster = picsumUrl(hashSeed(src || String(Math.random())), 1600, 900);
  });
}

/* ===========================
   SLIDESHOW
   =========================== */
function initSlideshows() {
  document.querySelectorAll('[data-slideshow]').forEach(function(container) {
    var slides = container.querySelectorAll('.slideshow-slide');
    if (!slides.length) return;

    var current = 0;
    var wrapper = container.closest('.slideshow-wrapper') || container.parentElement;
    var prevBtn = wrapper.querySelector('.prev');
    var nextBtn = wrapper.querySelector('.next');
    var counter = wrapper.querySelector('.slideshow-counter');

    function show(index) {
      slides[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (counter) counter.textContent = (current + 1) + ' / ' + slides.length;
    }

    slides[0].classList.add('active');
    if (counter) counter.textContent = '1 / ' + slides.length;

    if (prevBtn) prevBtn.addEventListener('click', function() { show(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { show(current + 1); });

    /* Touch / swipe */
    var startX = 0;
    container.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    container.addEventListener('touchend', function(e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) show(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });
  });
}

/* ===========================
   MOBILE MENU
   =========================== */
function initMobileMenu() {
  var toggle         = document.getElementById('nav-toggle');
  var floatingNav    = document.getElementById('floating-nav');
  var floatingClose  = document.getElementById('floating-nav-close');
  var floatingOverlay = document.getElementById('floating-nav-overlay');
  var mobileNav      = document.getElementById('mobile-nav');
  var mobileClose    = document.getElementById('mobile-nav-close');
  var mobileOverlay  = document.getElementById('mobile-nav-overlay');

  if (!toggle) return;

  function openFloating() {
    if (floatingNav) floatingNav.classList.add('open');
    if (floatingOverlay) floatingOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function closeFloating() {
    if (floatingNav) floatingNav.classList.remove('open');
    if (floatingOverlay) floatingOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }
  function openMobile() {
    if (mobileNav) mobileNav.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function closeMobile() {
    if (mobileNav) mobileNav.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function() {
    if (window.innerWidth > 768) {
      openFloating();
    } else {
      openMobile();
    }
  });

  if (floatingClose) floatingClose.addEventListener('click', closeFloating);
  if (floatingOverlay) floatingOverlay.addEventListener('click', closeFloating);
  if (floatingNav) {
    floatingNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeFloating);
    });
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMobile);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobile);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMobile);
    });
  }
}

/* ===========================
   BACK TO TOP
   =========================== */
function initBackToTop() {
  var backTop = document.getElementById('back-to-top');
  if (!backTop) return;
  window.addEventListener('scroll', function() {
    backTop.classList.toggle('visible', window.scrollY > window.innerHeight);
  }, { passive: true });
}

/* ===========================
   FADE IN ON SCROLL
   =========================== */
function initFadeIn() {
  var elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function(el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(function(el) { observer.observe(el); });
}

/* ===========================
   VIMEO CUSTOM CONTROLS
   =========================== */
function initVimeoControls() {
  if (typeof Vimeo === 'undefined') return;

  document.querySelectorAll('.video-controls').forEach(function(controls) {
    var iframeId = controls.dataset.target;
    var iframe = document.getElementById(iframeId);
    if (!iframe) return;

    var player = new Vimeo.Player(iframe);
    var playBtn = controls.querySelector('.vc-play');
    var iconPlay = controls.querySelector('.vc-icon-play');
    var iconPause = controls.querySelector('.vc-icon-pause');
    var volumeSlider = controls.querySelector('.vc-volume');
    var volIcon = controls.querySelector('.vc-vol-icon');

    playBtn.addEventListener('click', function() {
      player.getPaused().then(function(paused) {
        if (paused) { player.play(); } else { player.pause(); }
      });
    });

    player.on('play', function() {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'inline';
    });
    player.on('pause', function() {
      iconPlay.style.display = 'inline';
      iconPause.style.display = 'none';
    });

    volumeSlider.addEventListener('input', function() {
      var val = parseFloat(this.value);
      player.setVolume(val);
      volIcon.textContent = val === 0 ? '🔇' : val < 0.5 ? '🔉' : '🔊';
    });

    volIcon.addEventListener('click', function() {
      player.getVolume().then(function(vol) {
        if (vol > 0) {
          player.setVolume(0);
          volumeSlider.value = 0;
          volIcon.textContent = '🔇';
        } else {
          player.setVolume(1);
          volumeSlider.value = 1;
          volIcon.textContent = '🔊';
        }
      });
    });
  });
}

/* ===========================
   INIT
   =========================== */
document.addEventListener('DOMContentLoaded', function() {
  initImagePlaceholders(); /* must run first — before lazy images load */
  initSlideshows();
  initMobileMenu();
  initBackToTop();
  initFadeIn();
  initVimeoControls();
});
