/* ISVCA 2027 — progressive enhancements only.
   All content is readable and usable with JavaScript disabled. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---- mobile navigation -------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---- tabs (program days / any [data-tabs]) ------------------------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
    }
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { select(tab); });
    });
    group.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = tabs.length - 1;
      if (n === null) return;
      e.preventDefault();
      tabs[n].focus();
      select(tabs[n]);
    });
  });

  /* ---- current section in nav / table of contents -------------------- */
  function spy(linkSel, attr) {
    var links = Array.prototype.slice.call(document.querySelectorAll(linkSel));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    var targets = [];
    links.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#' || href.length < 2) return;
      var el = document.getElementById(href.slice(1));
      if (el) { map[href.slice(1)] = a; targets.push(el); }
    });
    if (!targets.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute(attr); });
        var a = map[en.target.id];
        if (a) a.setAttribute(attr, 'true');
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }
  spy('#site-nav a[href^="#"]', 'aria-current');
  spy('.toc a[href^="#"]', 'aria-current');

  /* ---- subscribe form (Formspree, stays on page) --------------------- */
  var nf = document.getElementById('notifyForm');
  if (nf) {
    nf.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('notifyMsg');
      var btn = nf.querySelector('button[type=submit]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      fetch(nf.action, {
        method: 'POST',
        body: new FormData(nf),
        headers: { Accept: 'application/json' }
      }).then(function (r) {
        if (msg) msg.textContent = r.ok
          ? 'Thank you — you are on the list.'
          : 'Sorry, something went wrong. Please email info@isvca2027.org.';
        if (r.ok) nf.reset();
      }).catch(function () {
        if (msg) msg.textContent = 'Network error. Please email info@isvca2027.org.';
      }).then(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Notify me'; }
      });
    });
  }

  /* ---- abstract form helpers ----------------------------------------- */
  var title = document.getElementById('title');
  var counter = document.getElementById('titleCount');
  if (title && counter) {
    var upd = function () {
      counter.textContent = title.value.length + ' / 100';
      counter.classList.toggle('is-over', title.value.length > 100);
    };
    title.addEventListener('input', upd); upd();
  }

  var wantAward = document.getElementById('wantAward');
  var awardBox = document.getElementById('awardBox');
  if (wantAward && awardBox) {
    var sync = function () {
      var on = wantAward.checked;
      awardBox.hidden = !on;
      awardBox.querySelectorAll('input[name="Award applied for"],input[name="Eligibility category"]')
        .forEach(function (el) { el.required = on; });
      var letter = document.getElementById('letter');
      var attend = document.getElementById('attendCommit');
      if (letter) letter.required = on;
      if (attend) attend.required = on;
    };
    wantAward.addEventListener('change', sync); sync();
  }

  var absForm = document.getElementById('absForm');
  if (absForm) {
    absForm.addEventListener('submit', function (e) {
      if (wantAward && wantAward.checked) {
        var pres = document.querySelector('input[name="Is presenting author"]:checked');
        if (pres && pres.value === 'No') {
          e.preventDefault();
          window.alert('Award applicants must be the presenting author. Please have the presenting author submit this abstract, or uncheck the award option.');
          return;
        }
      }
      var b = document.getElementById('submitBtn');
      if (b) { b.disabled = true; b.textContent = 'Submitting…'; }
    });
  }
})();
