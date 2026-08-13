/* ==========================================================================
   Shared UI: nav render, mobile menu, search, toasts, chatbot mount.
   Every page calls GX.mount() after the DOM is ready.
   ========================================================================== */

function toast(message, kind = "ok") {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; document.body.appendChild(wrap); }
  const t = document.createElement("div");
  t.className = "toast";
  const icon = kind === "warn" ? "fa-triangle-exclamation" : "fa-circle-check";
  t.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}
window.toast = toast;

// --------- Header rendering (injected into <header data-header>) -----------
function renderHeader() {
  const host = document.querySelector("[data-header]");
  if (!host) return;
  const cats = window.GX_PRODUCTS.CATEGORIES;
  const user = window.Auth.current();
  const accountLinks = user
    ? `<div class="dropdown" style="min-width:180px">
         <a href="account.html">My Account</a>
         <a href="account.html?tab=orders">Orders</a>
         <a href="account.html?tab=wishlist">Wishlist</a>
         <a href="#" id="logoutLink">Logout</a>
       </div>`
    : "";
  const accountLabel = user ? `<i class="fas fa-user-circle"></i> ${user.name.split(" ")[0]}` : `<i class="fas fa-user"></i> Login`;
  const accountHref = user ? "account.html" : "login.html";

  host.innerHTML = `
    <div class="trust-bar">
      <div class="container trust-bar__inner">
        <span><i class="fas fa-lock"></i> Secure Payment</span>
        <span><i class="fas fa-truck-fast"></i> Fast Delivery Nationwide</span>
        <span><i class="fas fa-shield-halved"></i> Warranty on All Gadgets</span>
        <span><i class="fas fa-headset"></i> 7-Day Support</span>
      </div>
    </div>
    <div class="header">
      <div class="container">
        <div class="nav">
          <a href="home.html" class="logo">Gadget<span>X</span></a>

          <button class="hamburger" aria-label="Menu" id="hamburgerBtn"><i class="fas fa-bars"></i></button>

          <ul class="nav__links" id="navLinks">
            <li><a href="home.html">Home</a></li>
            <li class="has-dropdown">
              <a href="shop.html">Products <i class="fas fa-chevron-down" style="font-size:0.7rem"></i></a>
              <ul class="dropdown">
                ${cats.map((c) => `<li><a href="shop.html?category=${c.id}"><i class="fas ${c.icon}" style="margin-right:8px;color:var(--gold)"></i>${c.name}</a></li>`).join("")}
              </ul>
            </li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="track.html">Track Order</a></li>
            <li><a href="returns.html">Returns</a></li>
            <li class="has-dropdown">
              <a href="${accountHref}">${accountLabel}</a>
              ${accountLinks}
            </li>
          </ul>

          <div class="search-wrap">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search gadgets..." id="siteSearch" autocomplete="off">
            <div class="search-results" id="searchResults"></div>
          </div>

          <div class="nav__actions">
            <a href="account.html?tab=wishlist" class="icon-btn" aria-label="Wishlist">
              <i class="fas fa-heart"></i>
              <span class="badge" data-wish-badge style="display:none">0</span>
            </a>
            <a href="cart.html" class="icon-btn" aria-label="Cart">
              <i class="fas fa-shopping-bag"></i>
              <span class="badge" data-cart-badge style="display:none">0</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Hamburger toggle
  document.getElementById("hamburgerBtn")?.addEventListener("click", () => {
    document.getElementById("navLinks")?.classList.toggle("open");
  });

  // Logout
  document.getElementById("logoutLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.Auth.logout();
    toast("Signed out");
    setTimeout(() => (location.href = "home.html"), 500);
  });

  // Mobile dropdown toggle
  document.querySelectorAll(".nav__links.has-dropdown, .nav__links li.has-dropdown > a").forEach((a) => {
    a.addEventListener("click", (e) => {
      if (window.innerWidth <= 900) { e.preventDefault(); a.parentElement.classList.toggle("open"); }
    });
  });

  setupSearch();
  updateCartBadge();
  updateWishlistBadge();
}

// --------- Live search dropdown --------------------------------------------
function setupSearch() {
  const input = document.getElementById("siteSearch");
  const results = document.getElementById("searchResults");
  if (!input || !results) return;
  const products = window.GX_PRODUCTS.loadProducts();

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.classList.remove("open"); results.innerHTML = ""; return; }
    const matches = products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.includes(q)
    ).slice(0, 6);
    if (!matches.length) {
      results.innerHTML = `<div class="search-result muted" style="justify-content:center;color:var(--muted)">No products match "${escapeHtml(q)}"</div>`;
    } else {
      results.innerHTML = matches.map((p) => `
        <a class="search-result" href="product.html?id=${p.id}">
          <div style="width:44px;height:44px;background:var(--ivory);border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:1.2rem;flex:none">
            <i class="fas ${p.icon}"></i>
          </div>
          <div style="flex:1;min-width:0">
            <div class="search-result__name">${escapeHtml(p.name)}</div>
            <div style="color:var(--muted);font-size:0.75rem;text-transform:uppercase">${p.brand}</div>
          </div>
          <div class="search-result__price">${window.GX_PRODUCTS.formatNaira(p.price)}</div>
        </a>
      `).join("");
    }
    results.classList.add("open");
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrap")) results.classList.remove("open");
  });
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c])); }
window.escapeHtml = escapeHtml;

// --------- Footer -----------------------------------------------------------
function renderFooter() {
  const host = document.querySelector("[data-footer]");
  if (!host) return;
  host.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="logo" style="color:#fff">Gadget<span style="color:var(--gold)">X</span></div>
            <p>Nigeria's boutique gadget store. Premium electronics, warranty on every device, nationwide delivery.</p>
            <div class="footer__social">
              <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="#" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>
              <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="https://wa.me/2348000000000" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href="shop.html?category=phones">Phones</a></li>
              <li><a href="shop.html?category=tablets">Tablets</a></li>
              <li><a href="shop.html?category=gaming">Gaming / PS5</a></li>
              <li><a href="shop.html?category=earbuds">Earbuds</a></li>
              <li><a href="shop.html?category=chargers">Chargers</a></li>
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li><a href="track.html">Track Order</a></li>
              <li><a href="returns.html">Returns & Refunds</a></li>
              <li><a href="#">Warranty</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="admin-login.html">Admin</a></li>
              <li><a href="mailto:hello@gadgetx.ng">hello@gadgetx.ng</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          &copy; ${new Date().getFullYear()} GadgetX Nigeria. All rights reserved.
        </div>
      </div>
    </footer>
    <a href="https://wa.me/2348000000000" class="whatsapp-fab" aria-label="Chat on WhatsApp"><i class="fab fa-whatsapp"></i></a>
  `;
}

// --------- Mount ------------------------------------------------------------
window.GX = {
  mount() {
    renderHeader();
    renderFooter();
    window.mountChatbot?.();
  },
};

document.addEventListener("DOMContentLoaded", () => window.GX.mount());
