/* ==========================================================================
   Shop / category page — filters, sort, and paginated product grid.
   ========================================================================== */

(function () {
  const params = new URLSearchParams(location.search);
  const initialCat = params.get("category") || "all";
  const catsList = [{ id: "all", name: "All Products" }, ...window.GX_PRODUCTS.CATEGORIES];

  // Filter state
  const state = {
    category: initialCat,
    priceMin: null,
    priceMax: null,
    brands: new Set(),
    sort: "popular",
    page: 1,
    perPage: 9,
  };

  // Render category radios
  const catsWrap = document.getElementById("filterCats");
  catsWrap.innerHTML = catsList.map((c) => `
    <label><input type="radio" name="cat" value="${c.id}" ${c.id === state.category ? "checked" : ""}> ${c.name}</label>
  `).join("");
  catsWrap.addEventListener("change", (e) => {
    state.category = e.target.value; state.page = 1; render();
    document.getElementById("crumbCat").textContent = catsList.find((c) => c.id === state.category)?.name || "Shop";
  });

  // Render brand checkboxes (from ALL products, so filters are consistent)
  const brandsWrap = document.getElementById("filterBrands");
  const brands = [...new Set(window.GX_PRODUCTS.loadProducts().map((p) => p.brand))].sort();
  brandsWrap.innerHTML = brands.map((b) => `<label><input type="checkbox" value="${b}"> ${b}</label>`).join("");
  brandsWrap.addEventListener("change", (e) => {
    const v = e.target.value;
    if (e.target.checked) state.brands.add(v); else state.brands.delete(v);
    state.page = 1; render();
  });

  // Price inputs (debounced)
  let priceTimer;
  ["priceMin", "priceMax"].forEach((id) => {
    document.getElementById(id).addEventListener("input", (e) => {
      clearTimeout(priceTimer);
      priceTimer = setTimeout(() => {
        state[id] = e.target.value ? Number(e.target.value) : null;
        state.page = 1; render();
      }, 250);
    });
  });

  document.getElementById("sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value; render();
  });

  document.getElementById("clearFilters").addEventListener("click", () => {
    state.category = "all"; state.brands.clear(); state.priceMin = null; state.priceMax = null;
    document.querySelectorAll('#filterBrands input').forEach((i) => (i.checked = false));
    document.querySelectorAll('#filterCats input').forEach((i) => (i.checked = i.value === "all"));
    document.getElementById("priceMin").value = "";
    document.getElementById("priceMax").value = "";
    state.page = 1; render();
    document.getElementById("crumbCat").textContent = "Shop";
  });

  document.getElementById("loadMore").addEventListener("click", () => { state.page += 1; render(true); });

  document.getElementById("crumbCat").textContent = catsList.find((c) => c.id === state.category)?.name || "Shop";

  render();

  function render(append) {
    const all = window.GX_PRODUCTS.loadProducts();
    let list = all.filter((p) => {
      if (state.category !== "all" && p.category !== state.category) return false;
      if (state.priceMin != null && p.price < state.priceMin) return false;
      if (state.priceMax != null && p.price > state.priceMax) return false;
      if (state.brands.size && !state.brands.has(p.brand)) return false;
      return true;
    });
    switch (state.sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.reverse(); break;
      default: list.sort((a, b) => b.reviews - a.reviews);
    }

    const total = list.length;
    document.getElementById("resultCount").textContent =
      `${total} product${total === 1 ? "" : "s"}`;

    const shown = list.slice(0, state.page * state.perPage);
    const host = document.getElementById("shopGrid");

    if (!shown.length) {
      host.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <i class="fas fa-search"></i>
          <h3>No products match your filters</h3>
          <p>Try widening the price range or clearing brand filters.</p>
          <button class="btn btn--gold btn--sm" onclick="document.getElementById('clearFilters').click()">Clear filters</button>
        </div>`;
      document.getElementById("loadMore").style.display = "none";
      return;
    }
    host.innerHTML = shown.map(renderProductCardShop).join("");
    wireProductCardsShop(host);
    document.getElementById("loadMore").style.display = shown.length < total ? "inline-flex" : "none";
  }

  // Inline card renderer (same as home) — duplicated so shop.js is standalone.
  function renderProductCardShop(p) {
    const fmt = window.GX_PRODUCTS.formatNaira;
    const cat = window.GX_PRODUCTS.CATEGORIES.find((c) => c.id === p.category)?.name || "";
    const inWish = window.Wishlist.has(p.id);
    const stars = "★".repeat(Math.round(p.rating)) + "☆".repeat(5 - Math.round(p.rating));
    return `
      <div class="product-card">
        <a href="product.html?id=${p.id}" style="display:contents">
          <div class="product-card__image">
            ${p.oldPrice ? '<div class="product-card__badge product-card__badge--sale">SALE</div>' : ''}
            ${p.stock === 0 ? '<div class="product-card__badge product-card__badge--out">Out of Stock</div>' : ''}
            <i class="fas ${p.icon}"></i>
          </div>
        </a>
        <button class="product-card__wishlist ${inWish ? 'active' : ''}" data-wish="${p.id}" aria-label="Wishlist"><i class="fas fa-heart"></i></button>
        <div class="product-card__body">
          <div class="product-card__cat">${cat}</div>
          <a href="product.html?id=${p.id}" style="color:inherit"><div class="product-card__name">${p.name}</div></a>
          <div class="product-card__rating">${stars} <span>(${p.reviews})</span></div>
          <div class="product-card__price">
            <strong>${fmt(p.price)}</strong>
            ${p.oldPrice ? `<s>${fmt(p.oldPrice)}</s>` : ''}
          </div>
          <div class="product-card__actions">
            <button class="btn btn--gold btn--sm btn--block" data-add="${p.id}" ${p.stock === 0 ? 'disabled' : ''}>
              <i class="fas fa-cart-plus"></i> ${p.stock === 0 ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>`;
  }
  function wireProductCardsShop(scope) {
    scope.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", (e) => { e.preventDefault(); window.Cart.add(btn.dataset.add, 1, {}); });
    });
    scope.querySelectorAll("[data-wish]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const on = window.Wishlist.toggle(btn.dataset.wish);
        btn.classList.toggle("active", on);
      });
    });
  }
})();
