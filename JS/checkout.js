/* ==========================================================================
   Checkout: shipping form + payment method + validation + place order.
   Orders persisted to localStorage under `gx_orders`.
   ========================================================================== */

(function () {
  const root = document.getElementById("coRoot");
  const items = window.Cart.read();
  const fmt = window.GX_PRODUCTS.formatNaira;
  if (!items.length) {
    root.innerHTML = `<div class="empty-state"><i class="fas fa-shopping-bag"></i><h3>Your cart is empty</h3>
      <a class="btn btn--gold" href="shop.html">Browse gadgets</a></div>`;
    return;
  }

  const user = window.Auth.current();
  const NG_STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];

  const subtotal = window.Cart.subtotal();

  root.innerHTML = `
    <div class="checkout-layout">
      <form id="coForm" novalidate>
        <div class="form-card">
          <h3>Shipping details</h3>
          <div class="form-row">
            <div class="form-group"><label>Full name</label><input name="name" value="${user?.name || ""}" required><div class="error">Please enter your full name</div></div>
            <div class="form-group"><label>Phone</label><input name="phone" value="${user?.phone || ""}" placeholder="0803..." required pattern="^[0-9+\\s-]{7,15}$"><div class="error">Enter a valid phone number</div></div>
          </div>
          <div class="form-group"><label>Email</label><input name="email" type="email" value="${user?.email || ""}" required><div class="error">Enter a valid email</div></div>
          <div class="form-group"><label>Street address</label><input name="address" value="${user?.address || ""}" required><div class="error">Address is required</div></div>
          <div class="form-row">
            <div class="form-group"><label>City</label><input name="city" required><div class="error">City is required</div></div>
            <div class="form-group"><label>State</label>
              <select name="state" required>
                <option value="">Select state</option>
                ${NG_STATES.map((s) => `<option>${s}</option>`).join("")}
              </select>
              <div class="error">Select a state</div>
            </div>
          </div>
          <p class="muted" style="font-size:0.8rem;margin:0"><i class="fas fa-truck-fast" style="color:var(--gold)"></i> Estimated delivery: Lagos 1-2 days · Others 2-5 days</p>
        </div>

        <div class="form-card">
          <h3>Payment method</h3>
          <div class="pay-methods">
            <label class="pay-method active"><input type="radio" name="pay" value="transfer" checked>
              <div><strong>Bank Transfer</strong><br><span class="muted" style="font-size:0.85rem">Transfer to our account and upload proof.</span></div>
            </label>
            <label class="pay-method"><input type="radio" name="pay" value="pod">
              <div><strong>Pay on Delivery</strong><br><span class="muted" style="font-size:0.85rem">Cash / POS on delivery (Lagos & Abuja only).</span></div>
            </label>
          </div>
          <div id="transferInfo" style="margin-top:14px;padding:14px;background:var(--ivory);border-radius:8px;font-size:0.9rem">
            <strong>Account:</strong> GadgetX Nigeria Ltd · Zenith Bank · 1234567890<br>
            <div class="form-group" style="margin-top:10px"><label>Upload receipt</label><input type="file" name="receipt" accept="image/*"></div>
          </div>
        </div>

        <div class="form-card" style="text-align:center;background:var(--ivory)">
          <div style="display:flex;justify-content:center;gap:24px;flex-wrap:wrap;color:var(--bronze);font-size:0.85rem">
            <span><i class="fas fa-lock"></i> Secure Payment</span>
            <span><i class="fas fa-shield-halved"></i> Warranty</span>
            <span><i class="fas fa-truck-fast"></i> Fast Delivery</span>
          </div>
        </div>
      </form>

      <aside class="summary">
        <h3>Order summary</h3>
        <div id="summaryItems"></div>
        <div class="summary__row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
        <div class="summary__row"><span>Delivery</span><span id="deliveryCell">${fmt(3500)}</span></div>
        <div class="summary__row summary__row--total"><span>Total</span><strong id="totalCell">${fmt(subtotal + 3500)}</strong></div>
        <button class="btn btn--gold btn--block" id="placeBtn" type="button" style="margin-top:16px"><i class="fas fa-check"></i> Place Order</button>
      </aside>
    </div>`;

  // Summary items
  document.getElementById("summaryItems").innerHTML = items.map((it) => {
    const p = window.GX_PRODUCTS.getProduct(it.id);
    return p ? `<div class="summary__row"><span>${window.escapeHtml(p.name)} × ${it.qty}</span><span>${fmt(p.price * it.qty)}</span></div>` : "";
  }).join("");

  // Payment method toggle
  root.querySelectorAll('input[name="pay"]').forEach((r) => {
    r.addEventListener("change", (e) => {
      root.querySelectorAll(".pay-method").forEach((el) => el.classList.remove("active"));
      e.target.closest(".pay-method").classList.add("active");
      document.getElementById("transferInfo").style.display = e.target.value === "transfer" ? "" : "none";
    });
  });

  // State -> delivery estimate & fee
  const deliveryFor = (state) => {
    if (subtotal > 500000) return 0;
    if (state === "Lagos") return 2500;
    if (state === "FCT - Abuja") return 3000;
    return 4500;
  };
  root.querySelector('select[name="state"]').addEventListener("change", (e) => {
    const d = deliveryFor(e.target.value);
    document.getElementById("deliveryCell").textContent = d === 0 ? "FREE" : fmt(d);
    document.getElementById("totalCell").textContent = fmt(subtotal + d);
  });

  // Place order
  document.getElementById("placeBtn").addEventListener("click", () => {
    const form = document.getElementById("coForm");
    const fd = new FormData(form);
    let valid = true;
    form.querySelectorAll(".form-group").forEach((g) => g.classList.remove("invalid"));
    for (const [name] of fd.entries()) {
      const el = form.querySelector(`[name="${name}"]`);
      if (!el || el.type === "file" || el.type === "radio") continue;
      if (el.required && !el.value.trim()) { el.closest(".form-group").classList.add("invalid"); valid = false; }
      if (el.type === "email" && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) { el.closest(".form-group").classList.add("invalid"); valid = false; }
      if (el.pattern && el.value && !new RegExp("^" + el.pattern + "$").test(el.value)) { el.closest(".form-group").classList.add("invalid"); valid = false; }
    }
    if (!valid) { window.toast("Please complete the highlighted fields", "warn"); return; }

    const delivery = deliveryFor(fd.get("state"));
    const orderId = "GX-" + Date.now().toString().slice(-8);
    const order = {
      id: orderId,
      createdAt: Date.now(),
      email: fd.get("email"),
      customer: {
        name: fd.get("name"), phone: fd.get("phone"),
        address: fd.get("address"), city: fd.get("city"), state: fd.get("state"),
      },
      payment: fd.get("pay"),
      items: items.map((it) => {
        const p = window.GX_PRODUCTS.getProduct(it.id);
        return { id: it.id, name: p.name, qty: it.qty, price: p.price, variants: it.variants || {} };
      }),
      subtotal, delivery, total: subtotal + delivery,
      status: "Pending",
    };
    const orders = JSON.parse(localStorage.getItem("gx_orders") || "[]");
    orders.push(order);
    localStorage.setItem("gx_orders", JSON.stringify(orders));

    // Decrement stock
    const prods = window.GX_PRODUCTS.loadProducts();
    items.forEach((it) => {
      const p = prods.find((x) => x.id === it.id);
      if (p) p.stock = Math.max(0, p.stock - it.qty);
    });
    window.GX_PRODUCTS.saveProducts(prods);

    window.Cart.clear();
    location.href = `confirmation.html?id=${orderId}`;
  });
})();
