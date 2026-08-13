/* ==========================================================================
   Admin dashboard: stats, product CRUD, order status updates, customer list.
   All persistence via localStorage (same keys the storefront reads).
   ========================================================================== */

(function () {
  if (!window.Auth.adminCurrent()) { location.href = "/admin-login.html"; return; }

  const fmt = window.GX_PRODUCTS.formatNaira;
  const view = new URLSearchParams(location.search).get("view") || "dashboard";

  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: "fa-chart-line" },
    { id: "products", label: "Products", icon: "fa-box" },
    { id: "orders", label: "Orders", icon: "fa-receipt" },
    { id: "customers", label: "Customers", icon: "fa-users" },
  ];

  document.getElementById("adminRoot").innerHTML = `
    <div class="admin-layout">
      <aside class="admin-side">
        <div class="admin-logo">Gadget<span>X</span></div>
        <nav>
          <ul>
            ${NAV.map((n) => `<li><a href="?view=${n.id}" class="${n.id === view ? "active" : ""}"><i class="fas ${n.icon}"></i> ${n.label}</a></li>`).join("")}
          </ul>
        </nav>
        <div class="logout"><a href="#" id="adminLogout" style="color:rgba(255,255,255,0.75)"><i class="fas fa-sign-out-alt"></i> Logout</a></div>
      </aside>
      <main class="admin-main">
        <div class="admin-top">
          <h1>${NAV.find((n) => n.id === view).label}</h1>
          <div class="admin-user"><i class="fas fa-user-shield" style="color:var(--gold)"></i> admin@gadgetx.ng</div>
        </div>
        <div id="viewRoot"></div>
      </main>
    </div>`;

  document.getElementById("adminLogout").addEventListener("click", (e) => {
    e.preventDefault(); window.Auth.adminLogout(); location.href = "/admin-login.html";
  });

  const root = document.getElementById("viewRoot");
  if (view === "dashboard") renderDashboard();
  else if (view === "products") renderProducts();
  else if (view === "orders") renderOrders();
  else if (view === "customers") renderCustomers();

  function orders() { return JSON.parse(localStorage.getItem("gx_orders") || "[]"); }
  function saveOrders(list) { localStorage.setItem("gx_orders", JSON.stringify(list)); }

  function renderDashboard() {
    const os = orders();
    const products = window.GX_PRODUCTS.loadProducts();
    const users = window.Auth.users();
    const revenue = os.reduce((s, o) => s + o.total, 0);
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5);
    root.innerHTML = `
      <div class="stat-grid">
        <div class="stat-card"><div class="label"><i class="fas fa-receipt"></i> Total Orders</div><div class="value">${os.length}</div></div>
        <div class="stat-card"><div class="label"><i class="fas fa-coins"></i> Revenue</div><div class="value gold">${fmt(revenue)}</div></div>
        <div class="stat-card"><div class="label"><i class="fas fa-box"></i> Products</div><div class="value">${products.length}</div></div>
        <div class="stat-card"><div class="label"><i class="fas fa-users"></i> Customers</div><div class="value">${users.length}</div></div>
        <div class="stat-card"><div class="label"><i class="fas fa-triangle-exclamation"></i> Low Stock</div><div class="value" style="color:var(--danger)">${lowStock.length}</div></div>
      </div>
      <div class="panel">
        <h2>Recent orders</h2>
        <table class="data"><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead><tbody>
          ${os.slice(-8).reverse().map((o) => `<tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.customer.name}</td>
            <td>${fmt(o.total)}</td>
            <td>${o.status}</td>
            <td>${new Date(o.createdAt).toLocaleDateString()}</td>
          </tr>`).join("") || `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:24px">No orders yet</td></tr>`}
        </tbody></table>
      </div>
      ${lowStock.length ? `
      <div class="panel">
        <h2>Low stock alerts</h2>
        <table class="data"><thead><tr><th>Product</th><th>Category</th><th>Stock</th></tr></thead><tbody>
          ${lowStock.map((p) => `<tr><td>${p.name}</td><td>${p.category}</td><td class="low-stock">${p.stock}</td></tr>`).join("")}
        </tbody></table>
      </div>` : ""}`;
  }

  function renderProducts() {
    const products = window.GX_PRODUCTS.loadProducts();
    root.innerHTML = `
      <div class="panel">
        <div class="panel__head">
          <h2>All products (${products.length})</h2>
          <button class="btn btn--gold" id="addProdBtn"><i class="fas fa-plus"></i> Add product</button>
        </div>
        <table class="data"><thead><tr><th>Name</th><th>Category</th><th>Brand</th><th>Price</th><th>Stock</th><th>Variants</th><th></th></tr></thead>
        <tbody>
          ${products.map((p) => `<tr>
            <td><strong>${p.name}</strong><br><small style="color:var(--muted)">${p.version}</small></td>
            <td>${p.category}</td>
            <td>${p.brand}</td>
            <td>${fmt(p.price)}</td>
            <td class="${p.stock <= 5 ? "low-stock" : ""}">${p.stock}</td>
            <td><small>${Object.entries(p.variants || {}).map(([k, v]) => `${k}(${v.length})`).join(" · ") || "—"}</small></td>
            <td class="actions">
              <button class="btn btn--sm btn--outline" data-edit="${p.id}"><i class="fas fa-pen"></i></button>
              <button class="btn btn--sm btn--danger" data-del="${p.id}"><i class="fas fa-trash"></i></button>
            </td>
          </tr>`).join("")}
        </tbody></table>
      </div>`;
    document.getElementById("addProdBtn").addEventListener("click", () => productModal(null));
    root.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => productModal(b.dataset.edit)));
    root.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => {
      if (!confirm("Delete this product?")) return;
      const list = window.GX_PRODUCTS.loadProducts().filter((p) => p.id !== b.dataset.del);
      window.GX_PRODUCTS.saveProducts(list); renderProducts();
    }));
  }

  function productModal(id) {
    const p = id ? window.GX_PRODUCTS.getProduct(id) : {
      id: "new-" + Date.now(), name: "", category: "phones", brand: "", price: 0, oldPrice: null,
      rating: 4.5, reviews: 0, stock: 10, icon: "fa-box", version: "", images: ["fa-box"],
      variants: {}, description: "", specs: {},
    };
    const back = document.getElementById("modalBackdrop");
    document.getElementById("modalContent").innerHTML = `
      <h3>${id ? "Edit" : "Add"} product</h3>
      <form id="prodForm">
        <div class="form-grid">
          <div class="full"><label>Name</label><input name="name" value="${p.name}" required style="width:100%"></div>
          <div><label>Category</label><select name="category">
            ${window.GX_PRODUCTS.CATEGORIES.map((c) => `<option value="${c.id}" ${c.id === p.category ? "selected" : ""}>${c.name}</option>`).join("")}
          </select></div>
          <div><label>Brand</label><input name="brand" value="${p.brand}" required></div>
          <div><label>Price (₦)</label><input name="price" type="number" value="${p.price}" required min="0"></div>
          <div><label>Old price (₦, optional)</label><input name="oldPrice" type="number" value="${p.oldPrice || ""}" min="0"></div>
          <div><label>Stock</label><input name="stock" type="number" value="${p.stock}" min="0" required></div>
          <div><label>Version / Model</label><input name="version" value="${p.version}"></div>
          <div><label>Icon (fa-...)</label><input name="icon" value="${p.icon}"></div>
          <div><label>Rating (0-5)</label><input name="rating" type="number" step="0.1" min="0" max="5" value="${p.rating}"></div>
          <div class="full"><label>Description</label><textarea name="description" rows="3" style="width:100%">${p.description}</textarea></div>
          <div class="full"><label>Variants (JSON — e.g. {"color":["Black","White"]})</label><textarea name="variants" rows="2" style="width:100%">${JSON.stringify(p.variants || {})}</textarea></div>
          <div class="full"><label>Specs (JSON — e.g. {"Chip":"A17"})</label><textarea name="specs" rows="2" style="width:100%">${JSON.stringify(p.specs || {})}</textarea></div>
        </div>
        <div class="actions">
          <button type="button" class="btn btn--outline" id="modalCancel">Cancel</button>
          <button class="btn btn--gold" type="submit">Save</button>
        </div>
      </form>`;
    back.classList.add("open");
    document.getElementById("modalCancel").onclick = () => back.classList.remove("open");
    document.getElementById("prodForm").onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      let variants = {}, specs = {};
      try { variants = JSON.parse(fd.get("variants") || "{}"); specs = JSON.parse(fd.get("specs") || "{}"); }
      catch { alert("Variants / Specs must be valid JSON"); return; }
      const updated = {
        ...p, name: fd.get("name"), category: fd.get("category"), brand: fd.get("brand"),
        price: Number(fd.get("price")), oldPrice: fd.get("oldPrice") ? Number(fd.get("oldPrice")) : null,
        stock: Number(fd.get("stock")), version: fd.get("version"), icon: fd.get("icon"),
        rating: Number(fd.get("rating")), description: fd.get("description"), variants, specs,
        images: [fd.get("icon") || "fa-box"],
      };
      const list = window.GX_PRODUCTS.loadProducts();
      const idx = list.findIndex((x) => x.id === p.id);
      if (idx >= 0) list[idx] = updated; else list.push(updated);
      window.GX_PRODUCTS.saveProducts(list);
      back.classList.remove("open"); renderProducts();
    };
  }

  function renderOrders() {
    const os = orders().sort((a, b) => b.createdAt - a.createdAt);
    root.innerHTML = `
      <div class="panel">
        <h2>All orders (${os.length})</h2>
        <table class="data"><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          ${os.map((o) => `<tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.customer.name}<br><small style="color:var(--muted)">${o.email}</small></td>
            <td>${o.items.reduce((s, i) => s + i.qty, 0)}</td>
            <td>${fmt(o.total)}</td>
            <td>
              <select data-status="${o.id}">
                ${["Pending","Processing","Shipped","Delivered"].map((s) => `<option ${s === o.status ? "selected" : ""}>${s}</option>`).join("")}
              </select>
            </td>
            <td>${new Date(o.createdAt).toLocaleDateString()}</td>
          </tr>`).join("") || `<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:24px">No orders yet</td></tr>`}
        </tbody></table>
      </div>`;
    root.querySelectorAll("[data-status]").forEach((sel) => sel.addEventListener("change", () => {
      const list = orders();
      const o = list.find((x) => x.id === sel.dataset.status);
      if (o) { o.status = sel.value; saveOrders(list); }
    }));
  }

  function renderCustomers() {
    const users = window.Auth.users();
    const os = orders();
    root.innerHTML = `
      <div class="panel">
        <h2>Registered customers (${users.length})</h2>
        <table class="data"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Joined</th></tr></thead>
        <tbody>
          ${users.map((u) => `<tr>
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td>${u.phone || "—"}</td>
            <td>${os.filter((o) => o.email === u.email).length}</td>
            <td>${new Date(u.createdAt).toLocaleDateString()}</td>
          </tr>`).join("") || `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:24px">No customers yet</td></tr>`}
        </tbody></table>
      </div>`;
  }
})();
