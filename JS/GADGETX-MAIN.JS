/* ==========================================================================
   GadgetX — Core site behavior (nav, search, wishlist, cart badge, rendering)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initProductsDropdown();
  initAccountMenu();
  initSearch();
  initMobileNav();
  renderCategoryGrid();
  renderFeaturedProducts();
  updateCartBadge();
  updateWishlistBadge();
});

/* ---------------- Products dropdown (click to keep open) ---------------- */
function initProductsDropdown() {
  const dropdowns = document.querySelectorAll(".has-dropdown");
  if (!dropdowns.length) return;

  const closeAllDropdowns = () => {
    dropdowns.forEach((dropdownParent) => {
      dropdownParent.classList.remove("open");
      const trigger = dropdownParent.querySelector(".nav-trigger");
      trigger?.setAttribute("aria-expanded", "false");
    });
  };

  dropdowns.forEach((dropdownParent) => {
    const trigger = dropdownParent.querySelector(".nav-trigger");
    const menu = dropdownParent.querySelector(".dropdown-menu");
    if (!trigger || !menu) return;

    const openMenu = () => {
      dropdownParent.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
      dropdownParent.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    };

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdownParent.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) {
        openMenu();
      }
    });

    menu.querySelectorAll("a, button").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) {
      closeAllDropdowns();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });
}

/* ---------------- Account menu (Login/Register vs logged-in state) ---------------- */
function initAccountMenu() {
  const area = document.querySelector(".account-area");
  if (!area) return;
  const trigger = area.querySelector(".account-trigger");

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    area.classList.toggle("open");
  });
  document.addEventListener("click", () => area.classList.remove("open"));

  renderAccountState();
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("gadgetx_current_user"));
  } catch {
    return null;
  }
}

function renderAccountState() {
  const trigger = document.querySelector(".account-trigger");
  const menu = document.querySelector(".account-menu");
  if (!trigger || !menu) return;
  const user = getCurrentUser();

  if (user) {
    trigger.innerHTML = `<i class="fa-solid fa-circle-user"></i><span>${user.name.split(" ")[0]}</span>`;
    menu.innerHTML = `
      <a href="account.html"><i class="fa-solid fa-user"></i>&nbsp; My Account</a>
      <a href="account.html#orders"><i class="fa-solid fa-box"></i>&nbsp; Orders</a>
      <a href="wishlist.html"><i class="fa-solid fa-heart"></i>&nbsp; Wishlist</a>
      <hr>
      <button id="logoutBtn"><i class="fa-solid fa-right-from-bracket"></i>&nbsp; Logout</button>
    `;
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("gadgetx_current_user");
      renderAccountState();
    });
  } else {
    trigger.innerHTML = `<i class="fa-regular fa-user"></i><span>Login / Register</span>`;
    menu.innerHTML = `
      <a href="login.html"><i class="fa-solid fa-right-to-bracket"></i>&nbsp; Login</a>
      <a href="register.html"><i class="fa-solid fa-user-plus"></i>&nbsp; Register</a>
    `;
  }
}

/* ---------------- Search overlay with live price-aware results ---------------- */
function initSearch() {
  const toggle = document.querySelector(".search-toggle");
  const overlay = document.querySelector(".search-overlay");
  const input = document.querySelector(".search-panel input");
  const resultsBox = document.querySelector(".search-results");
  if (!toggle || !overlay) return;

  toggle.addEventListener("click", () => {
    overlay.classList.add("open");
    input.focus();
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay.classList.remove("open");
  });

  input.addEventListener("input", () => {
    const results = searchProducts(input.value);
    renderSearchResults(results, resultsBox);
  });
}

function renderSearchResults(results, box) {
  if (!box) return;
  if (results.length === 0) {
    box.innerHTML = `<div class="search-empty">No products found. Try "earbuds", "PS5", or "charger".</div>`;
    return;
  }
  box.innerHTML = results.map(p => `
    <a class="search-result-row" href="product.html?id=${p.id}">
      <img src="${p.images[0]}" alt="${p.name}">
      <div>
        <div class="sr-name">${p.name}</div>
        <div class="sr-cat">${capitalize(p.category)} · ${p.version}</div>
      </div>
      <div class="sr-price">${formatNaira(p.price)}</div>
    </a>
  `).join("");
}

/* ---------------- Mobile nav ---------------- */
function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
    navLinks.style.display = navLinks.classList.contains("mobile-open") ? "flex" : "";
  });
}

/* ---------------- Category grid (homepage) ---------------- */
const CATEGORY_META = {
  phones:   { label: "Phones",       icon: "fa-mobile-screen" },
  tablets:  { label: "Tablets",      icon: "fa-tablet-screen-button" },
  gaming:   { label: "Gaming / PS5", icon: "fa-gamepad" },
  earbuds:  { label: "Earbuds",      icon: "fa-headphones" },
  glasses:  { label: "Smart Glasses",icon: "fa-glasses" },
  mp3:      { label: "MP3 Players",  icon: "fa-music" },
  chargers: { label: "Chargers",     icon: "fa-bolt" }
};

function renderCategoryGrid() {
  const grid = document.querySelector(".category-grid");
  if (!grid) return;
  grid.innerHTML = Object.entries(CATEGORY_META).map(([key, meta]) => `
    <a class="category-tile" href="shop.html?category=${key}">
      <span class="cat-icon"><i class="fa-solid ${meta.icon}"></i></span>
      <span>${meta.label}</span>
    </a>
  `).join("");
}

/* ---------------- Featured products (homepage) ---------------- */
function renderFeaturedProducts() {
  const grid = document.querySelector(".product-grid[data-featured]");
  if (!grid) return;
  const featured = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 8);
  grid.innerHTML = featured.map(productCardHTML).join("");
  attachCardEvents(grid);
}

function productCardHTML(p) {
  const wishlisted = isWishlisted(p.id);
  const outOfStock = p.stock === 0;
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-media">
        <a href="product.html?id=${p.id}">
          <img src="${p.images[0]}" alt="${p.name}">
        </a>
        ${outOfStock
          ? `<span class="stock-badge out">Out of Stock</span>`
          : p.oldPrice ? `<span class="stock-badge sale">Sale</span>` : ""
        }
        <button class="wishlist-btn ${wishlisted ? "active" : ""}" data-wishlist="${p.id}" aria-label="Toggle wishlist">
          <i class="fa-${wishlisted ? "solid" : "regular"} fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <span class="product-cat">${capitalize(p.category)}</span>
        <a href="product.html?id=${p.id}" class="product-name">${p.name}</a>
        <span class="product-rating"><i class="fa-solid fa-star"></i> ${p.rating} (${p.reviews})</span>
        <div class="product-price-row">
          <span class="product-price">${formatNaira(p.price)}</span>
          ${p.oldPrice ? `<span class="product-price-old">${formatNaira(p.oldPrice)}</span>` : ""}
        </div>
        <button class="add-cart-btn" data-add-cart="${p.id}" ${outOfStock ? "disabled" : ""}>
          ${outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  `;
}

function attachCardEvents(scope) {
  scope.querySelectorAll("[data-wishlist]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleWishlist(btn.dataset.wishlist);
      btn.classList.toggle("active");
      btn.querySelector("i").classList.toggle("fa-solid");
      btn.querySelector("i").classList.toggle("fa-regular");
      updateWishlistBadge();
    });
  });
  scope.querySelectorAll("[data-add-cart]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(btn.dataset.addCart, 1);
      const original = btn.textContent;
      btn.textContent = "Added ✓";
      updateCartBadge();
      setTimeout(() => { btn.textContent = original; }, 1200);
    });
  });
}

/* ---------------- Cart (localStorage) ---------------- */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("gadgetx_cart")) || [];
  } catch {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem("gadgetx_cart", JSON.stringify(cart));
}
function addToCart(productId, qty) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
}
function updateCartBadge() {
  const badge = document.querySelector("[data-cart-count]");
  if (!badge) return;
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

/* ---------------- Wishlist (localStorage) ---------------- */
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem("gadgetx_wishlist")) || [];
  } catch {
    return [];
  }
}
function toggleWishlist(productId) {
  let list = getWishlist();
  if (list.includes(productId)) {
    list = list.filter(id => id !== productId);
  } else {
    list.push(productId);
  }
  localStorage.setItem("gadgetx_wishlist", JSON.stringify(list));
}
function isWishlisted(productId) {
  return getWishlist().includes(productId);
}
function updateWishlistBadge() {
  const badge = document.querySelector("[data-wishlist-count]");
  if (!badge) return;
  const count = getWishlist().length;
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

/* ---------------- Utils ---------------- */
function capitalize(str) {
  if (str === "mp3") return "MP3";
  return str.charAt(0).toUpperCase() + str.slice(1);
}