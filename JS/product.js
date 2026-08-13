/* ==========================================================================
   Product detail page.
   Gallery + variant selection + qty + Add to Cart + Buy Now + reviews.
   Also mounts the per-product "Ask about this product" chat helper.
   ========================================================================== */

(function () {
  const id = new URLSearchParams(location.search).get("id");
  const p = window.GX_PRODUCTS.getProduct(id);
  const root = document.getElementById("pdpRoot");
  if (!p) {
    root.innerHTML = `<div class="empty-state"><i class="fas fa-box-open"></i><h3>Product not found</h3><a class="btn btn--gold btn--sm" href="shop.html">Back to shop</a></div>`;
    return;
  }

  document.title = `${p.name} — GadgetX`;

  const fmt = window.GX_PRODUCTS.formatNaira;
  const catName = window.GX_PRODUCTS.CATEGORIES.find((c) => c.id === p.category)?.name || "";

  // Selected variants — default to first option of each.
  const selected = {};
  Object.entries(p.variants || {}).forEach(([k, arr]) => (selected[k] = arr[0]));

  const stars = "★".repeat(Math.round(p.rating)) + "☆".repeat(5 - Math.round(p.rating));
  const reviews = window.GX_PRODUCTS.SEED_REVIEWS[p.id] || [];

  // Breadcrumbs enriched with category + product name
  document.getElementById("pdpCrumbs").innerHTML = `
    <a href="home.html">Home</a><span>›</span>
    <a href="shop.html?category=${p.category}">${catName}</a><span>›</span>
    <span>${window.escapeHtml(p.name)}</span>`;

  root.innerHTML = `
    <div class="pdp">
      <div class="pdp__gallery">
        <div class="pdp__main-image" id="pdpMain"><i class="fas ${p.images[0]}"></i></div>
        <div class="pdp__thumbs">
          ${p.images.map((ic, i) => `<div class="pdp__thumb ${i === 0 ? 'active' : ''}" data-thumb="${ic}" data-idx="${i}"><i class="fas ${ic}"></i></div>`).join("")}
        </div>
      </div>
      <div>
        <div class="pdp__cat">${catName}</div>
        <h1 class="pdp__title">${window.escapeHtml(p.name)}</h1>
        <div class="pdp__rating">${stars} <span>${p.rating} · ${p.reviews} reviews</span></div>
        <div class="pdp__price">
          ${fmt(p.price)}
          ${p.oldPrice ? `<s>${fmt(p.oldPrice)}</s><span class="save">Save ${fmt(p.oldPrice - p.price)}</span>` : ''}
        </div>
        <p class="pdp__desc">${window.escapeHtml(p.description)}</p>

        <div id="variantsWrap"></div>

        <div class="qty-row">
          <div class="qty">
            <button id="qtyMinus" aria-label="Decrease">−</button>
            <input id="qtyInput" type="text" value="1" readonly aria-label="Quantity">
            <button id="qtyPlus" aria-label="Increase">+</button>
          </div>
          <span class="muted" style="font-size:0.85rem">
            ${p.stock > 0 ? `<i class="fas fa-check" style="color:var(--success)"></i> In stock — ${p.stock} available` : `<i class="fas fa-times" style="color:var(--danger)"></i> Out of stock`}
          </span>
        </div>

        <div class="pdp__buttons">
          <button class="btn btn--gold" id="addBtn" ${p.stock === 0 ? "disabled" : ""}><i class="fas fa-cart-plus"></i> Add to Cart</button>
          <button class="btn" id="buyBtn" ${p.stock === 0 ? "disabled" : ""}><i class="fas fa-bolt"></i> Buy Now</button>
          <button class="btn btn--outline" id="wishBtn"><i class="fas fa-heart"></i> Wishlist</button>
          <button class="btn btn--outline" id="askBtn"><i class="fas fa-comment"></i> Ask about this</button>
        </div>

        <div style="background:var(--ivory);border-radius:12px;padding:16px;margin-top:12px;font-size:0.85rem">
          <div style="margin-bottom:6px"><i class="fas fa-truck-fast" style="color:var(--gold)"></i> <strong>Delivery:</strong> Lagos 1-2 days · Other states 2-5 days</div>
          <div><i class="fas fa-shield-halved" style="color:var(--gold)"></i> <strong>Warranty:</strong> Covered for at least 6 months</div>
        </div>
      </div>
    </div>

    <div class="pdp-tabs">
      <div class="pdp-tabs__nav">
        <button class="active" data-tab="desc">Description</button>
        <button data-tab="specs">Specs</button>
        <button data-tab="reviews">Reviews (${reviews.length})</button>
      </div>
      <div id="tabDesc" class="tab-content">
        <p>${window.escapeHtml(p.description)}</p>
        <p class="muted">Model / Version: ${window.escapeHtml(p.version)} · Brand: ${window.escapeHtml(p.brand)}</p>
      </div>
      <div id="tabSpecs" class="tab-content" style="display:none">
        <table class="specs-table">
          ${Object.entries(p.specs).map(([k, v]) => `<tr><td>${k}</td><td>${window.escapeHtml(v)}</td></tr>`).join("")}
          <tr><td>Model / Version</td><td>${window.escapeHtml(p.version)}</td></tr>
        </table>
      </div>
      <div id="tabReviews" class="tab-content" style="display:none">
        <div class="reviews-list">
          ${reviews.length ? reviews.map((r) => `
            <div class="review">
              <div class="review__head">
                <div><div class="review__author">${window.escapeHtml(r.author)}</div><div class="review__stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div></div>
                <div class="review__date">${r.date}</div>
              </div>
              <p style="margin:8px 0 0">${window.escapeHtml(r.text)}</p>
            </div>`).join("") : `<p class="muted">No reviews yet. Be the first!</p>`}
        </div>
      </div>
    </div>
  `;

  // Variant selectors
  const variantsWrap = document.getElementById("variantsWrap");
  Object.entries(p.variants || {}).forEach(([key, opts]) => {
    const group = document.createElement("div");
    group.className = "variant-group";
    group.innerHTML = `<h5>${key}</h5><div class="variant-options">
      ${opts.map((o, i) => `<button class="variant-btn ${i === 0 ? 'active' : ''}" data-key="${key}" data-val="${window.escapeHtml(o)}">${window.escapeHtml(o)}</button>`).join("")}
    </div>`;
    variantsWrap.appendChild(group);
  });
  variantsWrap.addEventListener("click", (e) => {
    const b = e.target.closest(".variant-btn");
    if (!b) return;
    b.parentElement.querySelectorAll(".variant-btn").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    selected[b.dataset.key] = b.dataset.val;
  });

  // Gallery thumbs
  document.querySelectorAll(".pdp__thumb").forEach((t) => {
    t.addEventListener("click", () => {
      document.querySelectorAll(".pdp__thumb").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      document.getElementById("pdpMain").innerHTML = `<i class="fas ${t.dataset.thumb}"></i>`;
    });
  });

  // Qty
  const qtyInput = document.getElementById("qtyInput");
  const getQty = () => Math.max(1, Math.min(Number(qtyInput.value) || 1, p.stock || 1));
  document.getElementById("qtyMinus").addEventListener("click", () => { qtyInput.value = Math.max(1, getQty() - 1); });
  document.getElementById("qtyPlus").addEventListener("click", () => { qtyInput.value = Math.min(p.stock || 1, getQty() + 1); });

  // Buttons
  document.getElementById("addBtn").addEventListener("click", () => window.Cart.add(p.id, getQty(), { ...selected }));
  document.getElementById("buyBtn").addEventListener("click", () => { window.Cart.add(p.id, getQty(), { ...selected }); setTimeout(() => (location.href = "/checkout.html"), 400); });
  const wishBtn = document.getElementById("wishBtn");
  if (window.Wishlist.has(p.id)) wishBtn.classList.add("btn--gold");
  wishBtn.addEventListener("click", () => {
    const on = window.Wishlist.toggle(p.id);
    wishBtn.classList.toggle("btn--gold", on);
  });

  // Per-product "Ask about this" — opens the main chat panel with a scoped prompt.
  document.getElementById("askBtn").addEventListener("click", () => {
    const panel = document.getElementById("chatPanel");
    if (!panel) return;
    panel.classList.add("open");
    const body = document.getElementById("chatBody");
    body.insertAdjacentHTML("beforeend",
      `<div class="chat-msg bot">Ask me anything about <strong>${window.escapeHtml(p.name)}</strong> — specs, version, compatibility, or stock.</div>`);
    // Rebind the form to include productId context for this session.
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    form.onsubmit = (e) => {
      e.preventDefault();
      const txt = input.value.trim();
      if (!txt) return;
      body.insertAdjacentHTML("beforeend", `<div class="chat-msg user">${window.escapeHtml(txt)}</div>`);
      input.value = "";
      setTimeout(() => {
        const { html } = window.GX_CHAT.answerQuestion(txt, { productId: p.id });
        body.insertAdjacentHTML("beforeend", `<div class="chat-msg bot">${html}</div>`);
        body.scrollTop = body.scrollHeight;
      }, 300);
    };
  });

  // Tabs
  document.querySelectorAll(".pdp-tabs__nav button").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".pdp-tabs__nav button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      ["desc", "specs", "reviews"].forEach((t) => {
        document.getElementById("tab" + t[0].toUpperCase() + t.slice(1)).style.display = (t === b.dataset.tab) ? "" : "none";
      });
    });
  });

  // Sticky mobile bar
  document.getElementById("pdpSticky").innerHTML = `
    <div><div style="font-size:0.85rem">${window.escapeHtml(p.name)}</div><strong>${fmt(p.price)}</strong></div>
    <button class="btn btn--gold btn--sm" id="stickyAdd" ${p.stock === 0 ? "disabled" : ""}><i class="fas fa-cart-plus"></i> Add</button>`;
  document.getElementById("stickyAdd").addEventListener("click", () => window.Cart.add(p.id, getQty(), { ...selected }));

  // Related products (same category)
  const related = window.GX_PRODUCTS.loadProducts().filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const rel = document.getElementById("relatedGrid");
  if (!related.length) rel.parentElement.style.display = "none";
  rel.innerHTML = related.map((r) => `
    <a class="product-card" href="product.html?id=${r.id}" style="text-decoration:none;color:inherit">
      <div class="product-card__image"><i class="fas ${r.icon}"></i></div>
      <div class="product-card__body">
        <div class="product-card__name">${window.escapeHtml(r.name)}</div>
        <div class="product-card__price"><strong>${fmt(r.price)}</strong></div>
      </div>
    </a>`).join("");
})();
