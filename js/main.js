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

    /* ---- Skip real files in assets/fotos/ ---- */
    if (attr.includes('assets/fotos/')) return;

    /* ---- Only act on placeholder assets/ paths ---- */
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
   LIGHTBOX
   =========================== */
function initLightbox() {
  var lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML =
    '<button class="lightbox-close" aria-label="Cerrar">✕</button>' +
    '<button class="lightbox-prev" aria-label="Anterior">←</button>' +
    '<div class="lightbox-img-wrap"><img class="lightbox-img" src="" alt=""></div>' +
    '<button class="lightbox-next" aria-label="Siguiente">→</button>' +
    '<span class="lightbox-counter"></span>';
  document.body.appendChild(lb);

  var lbImg     = lb.querySelector('.lightbox-img');
  var lbClose   = lb.querySelector('.lightbox-close');
  var lbPrev    = lb.querySelector('.lightbox-prev');
  var lbNext    = lb.querySelector('.lightbox-next');
  var lbCounter = lb.querySelector('.lightbox-counter');

  var group = [];
  var idx   = 0;

  function openLb(images, i) {
    group = images;
    idx   = i;
    updateLb();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLb() {
  if (!group[idx]) return;
lbImg.src = group[idx].src;
    lbImg.alt = group[idx].alt || '';
    var many = group.length > 1;
    lbPrev.style.display = many ? '' : 'none';
    lbNext.style.display = many ? '' : 'none';
    lbCounter.textContent = many ? (idx + 1) + ' / ' + group.length : '';
  }

  function prevLb() { idx = (idx - 1 + group.length) % group.length; updateLb(); }
  function nextLb() { idx = (idx + 1) % group.length; updateLb(); }

  lbClose.addEventListener('click', closeLb);
  lbPrev.addEventListener('click', function(e) { e.stopPropagation(); prevLb(); });
  lbNext.addEventListener('click', function(e) { e.stopPropagation(); nextLb(); });
  lb.addEventListener('click', function(e) {
    if (e.target === lb || e.target === lb.querySelector('.lightbox-img-wrap')) closeLb();
  });

  document.addEventListener('keydown', function(e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLb();
    if (e.key === 'ArrowLeft')  prevLb();
    if (e.key === 'ArrowRight') nextLb();
  });

  var swipeX = 0;
  lb.addEventListener('touchstart', function(e) {
    swipeX = e.touches[0].clientX;
  }, { passive: true });
  lb.addEventListener('touchend', function(e) {
    var diff = swipeX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? nextLb() : prevLb(); }
  }, { passive: true });

/* Slideshow containers — desktop top strips use clicked image; all real sliders use active image */
document.querySelectorAll('[data-slideshow]').forEach(function(slideshow) {
  var imgs = Array.from(slideshow.querySelectorAll('.slideshow-slide img'));
  if (!imgs.length) return;

  imgs.forEach(function(img) {
    img.style.cursor = 'zoom-in';
  });

  slideshow.addEventListener('click', function(e) {
    var clickedImg = e.target.closest('img');
    if (!clickedImg) return;

    e.preventDefault();
    e.stopPropagation();

var isDesktopTopStrip =
  window.innerWidth > 1024 &&
  (
    slideshow.closest('.detail-gallery-top') ||
    slideshow.closest('.de-vice-responsive-gallery') ||
     slideshow.closest('.product-gallery')
  );

var imgToOpen;

if (isDesktopTopStrip) {
  imgToOpen = clickedImg;
} else {
      var activeSlide = slideshow.querySelector('.slideshow-slide.active');
      imgToOpen = activeSlide ? activeSlide.querySelector('img') : clickedImg;
    }

    var idx = imgs.indexOf(imgToOpen);
    if (idx < 0) idx = 0;

    openLb(imgs, idx);
  });
});

   
/* Static lightbox galleries — open clicked image */
document.querySelectorAll('[data-lightbox-gallery]').forEach(function(gallery) {
  var imgs = Array.from(gallery.querySelectorAll('img'));
  if (!imgs.length) return;

  imgs.forEach(function(img, i) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openLb(imgs, i);
    });
  });
});
   
  /* Plain image containers — attach directly to each image */
  var PLAIN = [
    '.gallery-row',
    '.freeform-gallery',
    '.product-gallery',
    '.detail-single-image',
    '.about-image-col'
  ];
  PLAIN.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(container) {
      var imgs = Array.from(container.querySelectorAll('img'));
      if (!imgs.length) return;
      imgs.forEach(function(img, i) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          openLb(imgs, i);
        });
      });
    });
  });
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

function initMobileSliders() {
  document.querySelectorAll('.mobile-slider-wrapper').forEach(function(wrapper) {
    var slider = wrapper.querySelector('.mobile-slider');
    var prev = wrapper.querySelector('.mobile-prev');
    var next = wrapper.querySelector('.mobile-next');

    if (!slider || !prev || !next) return;

    prev.addEventListener('click', function() {
      slider.scrollBy({
        left: -slider.clientWidth * 0.9,
        behavior: 'smooth'
      });
    });

    next.addEventListener('click', function() {
      slider.scrollBy({
        left: slider.clientWidth * 0.9,
        behavior: 'smooth'
      });
    });
  });
}

/* ===========================
   INIT
   =========================== */
document.addEventListener('DOMContentLoaded', function() {
  initImagePlaceholders();
  initSlideshows();
  initMobileSliders();
  initMobileMenu();
  initBackToTop();
  initFadeIn();
  initVimeoControls();
  initLightbox();
});
