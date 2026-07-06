// mark that JS is active — scroll-reveal styles only apply then,
// so the page stays fully visible if JS is disabled.
document.documentElement.classList.add('js');

// mobile nav toggle
document.querySelector('.nav-toggle').addEventListener('click', function () {
  document.querySelector('.nav-links').classList.toggle('open');
});

// close the mobile menu after tapping a link
document.querySelectorAll('.nav-links a').forEach(function (a) {
  a.addEventListener('click', function () {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

/* ------------------------------------------------------------
   Scroll reveal — elements fade + slide up as they scroll in.
   Images get an extra slight zoom (.reveal-img).
   ------------------------------------------------------------ */
(function () {
  var textTargets = [
    '.about-text',
    '.news-title', '.news-list li',
    '.quote p',
    '.title-serif',
    '.paper-title', '.paper-venue', '.paper-date', '.paper-links', '.paper-body',
    '.proj-text',
    '.sub-serif', '.award-list', '.beyond-para'
  ];
  var imgTargets = [
    '.about-photo',
    '.paper-img',
    '.proj-img'
  ];

  var all = [];
  document.querySelectorAll(textTargets.join(',')).forEach(function (el) {
    el.classList.add('reveal');
    all.push(el);
  });
  document.querySelectorAll(imgTargets.join(',')).forEach(function (el) {
    el.classList.add('reveal', 'reveal-img');
    all.push(el);
  });

  // gentle stagger so news items cascade in one after another
  document.querySelectorAll('.news-list li').forEach(function (li, i) {
    li.style.transitionDelay = (i * 55) + 'ms';
  });

  if (!('IntersectionObserver' in window)) {
    all.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  all.forEach(function (el) { io.observe(el); });
})();

/* ------------------------------------------------------------
   Collapsible Research groups — when a group is expanded, make
   sure any not-yet-revealed content inside is shown immediately.
   ------------------------------------------------------------ */
document.querySelectorAll('.research-group').forEach(function (grp) {
  grp.addEventListener('toggle', function () {
    if (grp.open) {
      grp.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
    }
  });
});
