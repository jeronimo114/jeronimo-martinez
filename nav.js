/* nav.js – Global navigation: overlay toggle + submenu accordion */
(function () {
  const menuBtn = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.nav-overlay');
  if (!menuBtn || !overlay) return;

  // Toggle overlay
  menuBtn.addEventListener('click', function () {
    document.body.classList.toggle('nav-open');
  });

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      document.body.classList.remove('nav-open');
    }
  });

  // Close when clicking overlay background (not menu content)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      document.body.classList.remove('nav-open');
    }
  });

  // Submenu accordion – one open at a time
  var toggles = overlay.querySelectorAll('.nav-overlay-toggle');
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.nav-overlay-item');
      var submenu = item.querySelector('.nav-submenu');
      var isOpen = item.classList.contains('open');

      // Close all
      overlay.querySelectorAll('.nav-overlay-item.open').forEach(function (el) {
        el.classList.remove('open');
        el.querySelector('.nav-submenu').style.maxHeight = null;
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
      }
    });
  });
})();
