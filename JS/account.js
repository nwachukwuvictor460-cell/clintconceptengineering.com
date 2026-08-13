/* ==========================================================================
   Customer account dashboard: orders / wishlist / addresses / profile tabs.
   ========================================================================== */

(function () {
  const user = window.Auth.current();
  const root = document.getElementById("accRoot");
  if (!user) {
    root.innerHTML = `<div class="empty-state"><i class="fas fa-user-lock"></i>
      <h3>Sign in to see your account</h3>
      <a class="btn btn--gold" href="login.html">Sign in</a>
      <a class="btn btn--outline" href="register.html" style="margin-left:8px">Create account</a></div>`;
    return;
  }
  const tab = new URLSearchParams(location.search).get("tab") || "orders";
  const tabs = [
    { id: "orders", label: "Orders", icon: "fa-box" },
    { id: "wishlist", label: "Wishlist", icon: "fa-heart" },
    { id: "addresses", label: "Addresses", icon: "fa-location-dot" },
    { id: "profile", label: "Profile", icon: "fa-user" },
  ];
  const fmt = window.GX_PRODUCTS.formatNaira;

  root.innerHTML = `
    <div class="account-layout">
      <ul class="account-nav">
        ${tabs.map((t) => `<li><a href="?tab=${t.id}" class="${t.id === tab ? "active" : ""}"><i class="fas ${t.icon}" style="margin-right:8px;color:var(--gold)"></i>${t.label}</a></li>`).join("")}
        <li><a href="#" id="logout2"><i class="fas fa-sign-out-alt" style="margin-right:8px;color:var(--gold)"></i>Logout</a></li>
      </ul>
      <div class="account-panel" id="panel"></div>
    </div>`;

  document.getElementById("logout2").addEventListener("click", (e) => {
    e.preventDefault(); window.Auth.logout(); location.href = "home.html";
  });

  const panel = document.getElementById("panel");
  if (tab === "orders") renderOrders();
  else if (tab === "wishlist") renderWishlist();
  else if (tab === "addresses") renderAddresses();
  else renderProfile();

  function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("gx_orders") || "[]")
      .filter((o) => o.email?.toLowerCase() === user.email.toLowerCase())
      .sort((a, b) => b.createdAt - a.createdAt);
    panel.innerHTML = `<h3>Order history</h3>` + (
      !orders.length
        ? `<div class="empty-state"><i class="fas fa-box-open"></i><h3>No orders yet</h3>
             <a class="btn btn--gold" href="shop.html">Start shopping</a></div>`
        : `<div class="order-row header"><div>Order</div><div>Date</div><div>Total</div><div>Status</div><div></div></div>` +
          orders.map((o) => `<div class="order-row">
            <div><strong>${o.id}</strong></div>
            <div>${new Date(o.createdAt).toLocaleDateString()}</div>
            <div>${fmt(o.total)}</div>
            <div><span class="status-pill status-${o.status}">${o.status}</span></div>
            <div><a class="btn btn--sm btn--outline" href="/track.html?id=${o.id}">Track</a></div>
          </div>`).join("")
    );
  }

  function renderWishlist() {
    const ids = window.Wishlist.read();
    const prods = ids.map((id) => window.GX_PRODUCTS.getProduct(id)).filter(Boolean);
    panel.innerHTML = `<h3>Your wishlist</h3>` + (
      !prods.length
        ? `<div class="empty-state"><i class="fas fa-heart"></i><h3>Your wishlist is empty</h3>
             <a class="btn btn--gold" href="shop.html">Discover gadgets</a></div>`
        : `<div class="product-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">${prods.map((p) => `
          <div class="product-card">
            <a href="product.html?id=${p.id}" style="display:contents">
              <div class="product-card__image"><i class="fas ${p.icon}"></i></div>
            </a>
            <div class="product-card__body">
              <div class="product-card__name">${window.escapeHtml(p.name)}</div>
              <div class="product-card__price"><strong>${fmt(p.price)}</strong></div>
              <div class="product-card__actions" style="display:flex;gap:6px">
                <button class="btn btn--gold btn--sm" data-add="${p.id}"><i class="fas fa-cart-plus"></i></button>
                <button class="btn btn--outline btn--sm" data-rem="${p.id}"><i class="fas fa-times"></i></button>
              </div>
            </div>
          </div>`).join("")}</div>`
    );
    panel.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", () => window.Cart.add(b.dataset.add)));
    panel.querySelectorAll("[data-rem]").forEach((b) => b.addEventListener("click", () => { window.Wishlist.toggle(b.dataset.rem); renderWishlist(); }));
  }

  function renderAddresses() {
    panel.innerHTML = `<h3>Saved address</h3>
      <form id="addrForm" style="max-width:520px">
        <div class="form-group"><label>Street address</label><input name="address" value="${window.escapeHtml(user.address || "")}"></div>
        <div class="form-group"><label>Phone</label><input name="phone" value="${window.escapeHtml(user.phone || "")}"></div>
        <button class="btn btn--gold" type="submit">Save address</button>
      </form>`;
    document.getElementById("addrForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      window.Auth.updateProfile({ address: fd.get("address"), phone: fd.get("phone") });
      window.toast("Address saved");
    });
  }

  function renderProfile() {
    panel.innerHTML = `<h3>Profile</h3>
      <form id="profForm" style="max-width:520px">
        <div class="form-group"><label>Full name</label><input name="name" value="${window.escapeHtml(user.name)}" required></div>
        <div class="form-group"><label>Email</label><input value="${window.escapeHtml(user.email)}" disabled></div>
        <div class="form-group"><label>New password (leave blank to keep)</label><input name="password" type="password" minlength="6"></div>
        <button class="btn btn--gold" type="submit">Save changes</button>
      </form>`;
    document.getElementById("profForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const patch = { name: fd.get("name") };
      if (fd.get("password")) patch.password = fd.get("password");
      window.Auth.updateProfile(patch);
      window.toast("Profile updated");
    });
  }
})();
