/* ==========================================================================
   Simulated auth via localStorage. Users are stored plaintext for Phase 1.
   Never do this in production — Phase 2 will move to a real backend.
   ========================================================================== */

const USERS_KEY = "gx_users";
const SESSION_KEY = "gx_session";
const ADMIN_SESSION_KEY = "gx_admin_session";

const Auth = {
  users() { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; } },
  saveUsers(list) { localStorage.setItem(USERS_KEY, JSON.stringify(list)); },

  register({ name, email, password, phone = "", address = "" }) {
    email = email.toLowerCase().trim();
    const users = this.users();
    if (users.some((u) => u.email === email)) return { ok: false, error: "An account with that email already exists" };
    const user = { id: "usr-" + Date.now(), name: name.trim(), email, password, phone, address, createdAt: Date.now() };
    users.push(user);
    this.saveUsers(users);
    this.login(email, password);
    return { ok: true, user };
  },
  login(email, password) {
    email = email.toLowerCase().trim();
    const u = this.users().find((x) => x.email === email && x.password === password);
    if (!u) return { ok: false, error: "Invalid email or password" };
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: u.email, name: u.name }));
    return { ok: true, user: u };
  },
  logout() { localStorage.removeItem(SESSION_KEY); },
  current() {
    try {
      const s = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (!s) return null;
      return this.users().find((u) => u.email === s.email) || null;
    } catch { return null; }
  },
  updateProfile(patch) {
    const u = this.current();
    if (!u) return null;
    const users = this.users();
    const i = users.findIndex((x) => x.email === u.email);
    users[i] = { ...users[i], ...patch };
    this.saveUsers(users);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: users[i].email, name: users[i].name }));
    return users[i];
  },

  // Admin uses a hardcoded credential for Phase 1 (documented on the login page).
  ADMIN_EMAIL: "admin@gadgetx.ng",
  ADMIN_PASSWORD: "admin123",
  adminLogin(email, password) {
    if (email.toLowerCase().trim() === this.ADMIN_EMAIL && password === this.ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ email: this.ADMIN_EMAIL, role: "admin", at: Date.now() }));
      return { ok: true };
    }
    return { ok: false, error: "Invalid admin credentials" };
  },
  adminCurrent() { try { return JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY)); } catch { return null; } },
  adminLogout() { localStorage.removeItem(ADMIN_SESSION_KEY); },
};

window.Auth = Auth;
