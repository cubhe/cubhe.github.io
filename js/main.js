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
   Visitor IP + location — client-side only.
   The visitor's own browser asks a public geo-IP service and
   shows the result to the visitor. This site stores nothing.
   Primary: ipwho.is  ·  Fallback: ipapi.co
   ------------------------------------------------------------ */
(function () {
  var statusEl = document.getElementById('visitor-status');
  var detailEl = document.getElementById('visitor-detail');
  var ipEl  = document.getElementById('v-ip');
  var locEl = document.getElementById('v-loc');
  var ispEl = document.getElementById('v-isp');
  if (!statusEl) return;

  function render(d) {
    ipEl.textContent = d.ip || '—';

    var parts = [d.city, d.region, d.country].filter(Boolean).join(', ');
    var label = (d.flag ? d.flag + ' ' : '') + (parts || 'Unknown');
    if (d.lat != null && d.lon != null) {
      locEl.textContent = label + ' ';
      var a = document.createElement('a');
      a.href = 'https://www.openstreetmap.org/?mlat=' + d.lat +
               '&mlon=' + d.lon + '#map=10/' + d.lat + '/' + d.lon;
      a.target = '_blank'; a.rel = 'noopener';
      a.textContent = '(map)';
      locEl.appendChild(a);
    } else {
      locEl.textContent = label;
    }

    ispEl.textContent = d.isp || '—';
    statusEl.hidden = true;
    detailEl.hidden = false;
  }

  function fromIpwho(j) {
    if (!j || j.success === false) throw new Error('ipwho.is failed');
    return {
      ip: j.ip, city: j.city, region: j.region, country: j.country,
      flag: j.flag && j.flag.emoji,
      lat: j.latitude, lon: j.longitude,
      isp: (j.connection && (j.connection.isp || j.connection.org)) || null
    };
  }
  function fromIpapi(j) {
    if (!j || j.error) throw new Error('ipapi.co failed');
    return {
      ip: j.ip, city: j.city, region: j.region, country: j.country_name,
      flag: null, lat: j.latitude, lon: j.longitude, isp: j.org
    };
  }

  fetch('https://ipwho.is/')
    .then(function (r) { return r.json(); })
    .then(function (j) { render(fromIpwho(j)); })
    .catch(function () {
      return fetch('https://ipapi.co/json/')
        .then(function (r) { return r.json(); })
        .then(function (j) { render(fromIpapi(j)); });
    })
    .catch(function () {
      statusEl.textContent =
        'Could not detect your connection — a privacy extension or ad-blocker may have blocked the lookup.';
    });
})();
