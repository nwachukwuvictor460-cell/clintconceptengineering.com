
    const openSignInModal = document.getElementById('openSignInModal');
    const closeSignInModal = document.getElementById('closeSignInModal');
    const signInModal = document.getElementById('signInModal');
    const signInForm = signInModal?.querySelector('form');
    const signedInKey = 'shopbuddySignedIn';

    function isSignedIn() {
      return localStorage.getItem(signedInKey) === 'true';
    }

    function updateAuthUI() {
      if (!openSignInModal) return;

      if (isSignedIn()) {
        openSignInModal.innerHTML = '<i class="fas fa-check-circle"></i><span>Signed In</span>';
        openSignInModal.disabled = true;
      } else {
        openSignInModal.innerHTML = '<i class="fas fa-user-lock"></i><span>Sign In</span>';
        openSignInModal.disabled = false;
      }
    }

    function openModal() {
      if (isSignedIn()) return;
      signInModal.classList.add('active');
      signInModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      signInModal.classList.remove('active');
      signInModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function requireSignIn(event) {
      if (isSignedIn()) return true;

      event.preventDefault();
      event.stopPropagation();
      openModal();
      return false;
    }

    updateAuthUI();

    if (openSignInModal && signInModal) {
      openSignInModal.addEventListener('click', (event) => {
        if (isSignedIn()) return;
        event.preventDefault();
        openModal();
      });
    }

    if (closeSignInModal && signInModal) {
      closeSignInModal.addEventListener('click', closeModal);
    }

    if (signInModal) {
      signInModal.addEventListener('click', (event) => {
        if (event.target === signInModal) {
          closeModal();
        }
      });
    }

    document.querySelectorAll('.add-to-cart-btn, .wishlist-btn, .nav-btn-1, .nav-btn-2, .nav-btn-3').forEach((button) => {
      button.addEventListener('click', (event) => {
        requireSignIn(event);
      });
    });

    if (signInForm) {
      signInForm.addEventListener('submit', (event) => {
        event.preventDefault();
        localStorage.setItem(signedInKey, 'true');
        updateAuthUI();
        closeModal();
      });
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && signInModal?.classList.contains('active')) {
        closeModal();
      }
    });