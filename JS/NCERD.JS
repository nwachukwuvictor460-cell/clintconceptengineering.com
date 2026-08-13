javascript
// ===== MOBILE NAV TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // ===== MARK ACTIVE NAV LINK BASED ON CURRENT PAGE =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // ===== CONTACT FORM VALIDATION (contact.html) =====
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();
      const status = document.querySelector('#form-status');

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields before submitting.';
        status.className = 'form-status error';
        return;
      }
      if (!emailPattern.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.className = 'form-status error';
        return;
      }
      const cursorRing=
      document.querySelector('.cursor-ring');

      document.addEventListener('mousemove', (e)=> {
        //Move the mouse to move x and y cordinates

        cursorRing.computedStyleMap.left =`$(e.clientX) px`;
        
      })

      // Placeholder: no backend yet, just confirm to the user
      status.textContent = `Thanks, ${name}! Your message has been noted. We'll get back to you at ${email}.`;
      status.className = 'form-status success';
      form.reset();
    });
  }
});