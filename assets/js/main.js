// Mobile Nav Open/Close & FAQ Accordion
document.addEventListener('DOMContentLoaded', function () {
  // Hamburger + Sidebar
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeMobile = document.getElementById('closeMobile');
  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.onclick = () => mobileNav.style.right = "0";
    if (closeMobile) closeMobile.onclick = () => mobileNav.style.right = "-260px";
    mobileNav.onclick = (e) => { if (e.target === mobileNav) mobileNav.style.right = "-260px"; }
  }
  // Bottom nav activation (highlight active page)
  const bottomNav = document.getElementById('bottomNav');
  if (bottomNav) {
    const links = bottomNav.querySelectorAll('a');
    links.forEach(link => {
      if (window.location.pathname.endsWith(link.getAttribute('href'))) link.classList.add('active');
    });
  }
  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function(){
      const item = btn.closest('.faq-item');
      if (item.classList.contains('open')) item.classList.remove('open');
      else {
        document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
        item.classList.add('open');
      }
    });
  });
  // تعبئة اسم الدورة تلقائياً من رابط الحجز
  const urlParams = new URLSearchParams(window.location.search);
  if (document.getElementById('courseName') && urlParams.get('course')) {
    let course = urlParams.get('course');
    if (course === 'icdl-basic') document.getElementById('courseName').value = 'ICDL للمبتدئين';
    else if (course === 'icdl-teacher') document.getElementById('courseName').value = 'ICDL للمعلمين';
    else document.getElementById('courseName').value = course;
  }
  // نموذج الحجز
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = bookingForm.name.value.trim();
      const email = bookingForm.email.value.trim();
      const phone = bookingForm.phone.value.trim();
      const course = bookingForm.course.value.trim();
      if (!name || !email || !phone || !course) return;
      const user = { name, email, phone, course, isSubscribed: true };
      localStorage.setItem('icdlUser', JSON.stringify(user));
      document.getElementById('successMsg').innerHTML = "✅ تم التسجيل بنجاح! سيتم التواصل معك قريبًا.";
      bookingForm.reset();
    });
  }
  // عرض ملفات المشتركين
  if (window.location.pathname.includes('dashboard.html')) {
    let filesList = document.getElementById('filesList');
    let user = JSON.parse(localStorage.getItem('icdlUser'));
    if (user && user.isSubscribed) {
      filesList.innerHTML = `
        <ul>
          <li><a href="assets/files/icdl-basic.pdf" download><i class="fa fa-download"></i> ملف دورة ICDL للمبتدئين</a></li>
          <li><a href="assets/files/icdl-teacher.pdf" download><i class="fa fa-download"></i> ملف ICDL للمعلمين</a></li>
        </ul>
        <p style="color:#eec60a;font-weight:700"><i class="fa fa-exclamation-triangle"></i> يرجى عدم مشاركة هذه الملفات حفاظًا على حقوق الملكية.</p>
      `;
    } else {
      filesList.innerHTML = "<p style='color:#c00;font-weight:bold'><i class='fa fa-lock'></i> هذه الصفحة متاحة فقط للمشتركين. يرجى التسجيل أولاً.</p>";
    }
  }
});