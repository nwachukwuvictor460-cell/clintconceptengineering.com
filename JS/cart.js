/* ==========================================================================
   Shared cart + wishlist logic. Persisted to localStorage.
   Cart shape: [{ id, qty, variants: { color, storage, ... } }]
   Wishlist shape: [productId, ...]
   ========================================================================== */

const CART_KEY = "gx_cart";
const WISH_KEY = "gx_wishlist";

const Cart = {
  read() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } },
  write(items) { localStorage.setItem(CART_KEY, JSON.stringify(items)); updateCartBadge(); },
  count() { return this.read().reduce((s, i) => s + i.qty, 0); },
  add(productId, qty = 1, variants = {}) {
    const p = window.GX_PRODUCTS.getProduct(productId);
    if (!p || p.stock <= 0) { toast("This item is out of stock", "warn"); return; }
    const items = this.read();
    // Match by product id + variant fingerprint so different variants stack separately.
    const key = JSON.stringify(variants);
    const existing = items.find((i) => i.id === productId && JSON.stringify(i.variants || {}) === key);
    if (existing) {
      if (existing.qty + qty > p.stock) { toast("Not enough stock available", "warn"); return; }
      existing.qty += qty;
    } else {
      items.push({ id: productId, qty, variants });
    }
    this.write(items);
    toast(`Added to cart: ${p.name}`);
  },
  remove(index) {
    const items = this.read(); items.splice(index, 1); this.write(items);
  },
  updateQty(index, qty) {
    const items = this.read();
    if (!items[index]) return;
    const p = window.GX_PRODUCTS.getProduct(items[index].id);
    items[index].qty = Math.max(1, Math.min(qty, p?.stock || 99));
    this.write(items);
  },
  clear() { this.write([]); },
  subtotal() {
    return this.read().reduce((sum, i) => {
      const p = window.GX_PRODUCTS.getProduct(i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  },
};

const Wishlist = {
  read() { try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch { return []; } },
  write(ids) { localStorage.setItem(WISH_KEY, JSON.stringify(ids)); updateWishlistBadge(); },
  has(id) { return this.read().includes(id); },
  toggle(id) {
    const list = this.read();
    const i = list.indexOf(id);
    if (i >= 0) { list.splice(i, 1); toast("Removed from wishlist"); }
    else { list.push(id); toast("Added to wishlist"); }
    this.write(list);
    return this.has(id);
  },
};

function updateCartBadge() {
  document.querySelectorAll("[data-cart-badge]").forEach((el) => {
    const c = Cart.count();
    el.textContent = c;
    el.style.display = c ? "inline-flex" : "none";
  });
}
function updateWishlistBadge() {
  document.querySelectorAll("[data-wish-badge]").forEach((el) => {
    const c = Wishlist.read().length;
    el.textContent = c;
    el.style.display = c ? "inline-flex" : "none";
  });
}

window.Cart = Cart;
window.Wishlist = Wishlist;
window.updateCartBadge = updateCartBadge;
window.updateWishlistBadge = updateWishlistBadge;
