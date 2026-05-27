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

    /* ---- Logo: replace .png reference with the SVG we created ---- */
    if (attr.includes('logo')) {
      var svgPath = attr.replace('logo.png', 'logo.svg');
      img.src = svgPath;
      return;
    }

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
  var toggle  = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var closeBtn  = document.getElementById('mobile-nav-close');
  var overlay   = document.getElementById('mobile-nav-overlay');

  if (!toggle || !mobileNav) return;

  function open() {
    mobileNav.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    mobileNav.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', open);
  if (closeBtn)  closeBtn.addEventListener('click', close);
  if (overlay)   overlay.addEventListener('click', close);
  mobileNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', close);
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
   INIT
   =========================== */
document.addEventListener('DOMContentLoaded', function() {
  initImagePlaceholders(); /* must run first — before lazy images load */
  initSlideshows();
  initMobileMenu();
  initBackToTop();
  initFadeIn();
});
