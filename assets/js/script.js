// Hamburger menu for mobile nav
document.addEventListener('DOMContentLoaded', function () {
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileNav = document.getElementById('mobileNav');
  var closeMobile = document.getElementById('closeMobile');

  if (hamburgerBtn && mobileNav && closeMobile) {
    hamburgerBtn.addEventListener('click', function (e) {
      mobileNav.classList.add('open');
      document.body.style.overflow = "hidden";
      e.stopPropagation();
    });
    closeMobile.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      document.body.style.overflow = "";
    });
    // close on click outside
    document.addEventListener('click', function (e) {
      if (mobileNav.classList.contains('open')) {
        if (!mobileNav.contains(e.target) && e.target !== hamburgerBtn && !hamburgerBtn.contains(e.target)) {
          mobileNav.classList.remove('open');
          document.body.style.overflow = "";
        }
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        mobileNav.classList.remove('open');
        document.body.style.overflow = "";
      }
    });
  }
});