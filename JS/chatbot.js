/* ==========================================================================
   AI-style shopping assistant. Uses keyword/intent matching against the
   product catalog + FAQ knowledge base. Structured so the answer-generation
   step can later be swapped for a real API call.
   ========================================================================== */

const FAQ_KB = [
  { keys: ["hour", "open", "when"], answer: "GadgetX is online 24/7. Our customer support responds Mon-Sat, 9am-6pm WAT." },
  { keys: ["ship", "deliver", "shipping"], answer: "We deliver nationwide in Nigeria. Lagos: same-day / next-day. Other states: 2-5 business days." },
  { keys: ["track", "where is my order"], answer: "You can track your order on the <a href='/track.html'>Track Order</a> page using your order number." },
  { keys: ["return", "refund", "policy"], answer: "You have 7 days to return an item in its original condition. See our <a href='/returns.html'>Returns policy</a>." },
  { keys: ["warranty"], answer: "All gadgets come with at least a 6-month warranty covering manufacturing defects. Phones and consoles ship with a 1-year warranty." },
  { keys: ["pay", "payment", "method"], answer: "We accept bank transfer (upload receipt at checkout) and pay-on-delivery (Lagos and Abuja only)." },
  { keys: ["contact", "support", "help"], answer: "Reach us at hello@gadgetx.ng or the WhatsApp button at the bottom-left corner." },
  { keys: ["hi", "hello", "hey"], answer: "Hi! I'm the GadgetX assistant. Ask me about a product, price, warranty, or delivery." },
];

// Public API: answerQuestion(text, { productId? }) -> { html }
function answerQuestion(text, ctx = {}) {
  const q = text.toLowerCase().trim();
  if (!q) return { html: "Ask me something 🙂" };
  const products = window.GX_PRODUCTS.loadProducts();
  const fmt = window.GX_PRODUCTS.formatNaira;

  // 1) If scoped to a specific product, prefer product-scoped answers.
  if (ctx.productId) {
    const p = window.GX_PRODUCTS.getProduct(ctx.productId);
    if (p) {
      const scoped = answerAboutProduct(q, p, fmt);
      if (scoped) return { html: scoped };
    }
  }

  // 2) FAQ intent match
  for (const entry of FAQ_KB) {
    if (entry.keys.some((k) => q.includes(k))) return { html: entry.answer };
  }

  // 3) Price / spec / version lookup by product name mention
  const named = products.find((p) => q.includes(p.name.toLowerCase())) ||
                products.find((p) => q.includes(p.brand.toLowerCase()) && q.includes(p.category));
  if (named) {
    const a = answerAboutProduct(q, named, fmt);
    if (a) return { html: a };
    return { html: productCard(named, fmt) };
  }

  // 4) Category recommendation ("show me earbuds under 20000")
  const cat = window.GX_PRODUCTS.CATEGORIES.find((c) =>
    q.includes(c.id.replace("-", " ")) || q.includes(c.name.toLowerCase().split(" ")[0])
  );
  if (cat) {
    const priceCap = (q.match(/under\s*₦?\s*([\d,]+)/) || q.match(/below\s*₦?\s*([\d,]+)/) || [])[1];
    let matches = products.filter((p) => p.category === cat.id);
    if (priceCap) matches = matches.filter((p) => p.price <= Number(priceCap.replace(/,/g, "")));
    matches = matches.slice(0, 3);
    if (!matches.length) return { html: `Sorry, no ${cat.name.toLowerCase()} match that price. Try browsing <a href='/shop.html?category=${cat.id}'>${cat.name}</a>.` };
    return { html: `Here are some ${cat.name.toLowerCase()}:<br><br>` + matches.map((p) => productCard(p, fmt)).join("") };
  }

  // 5) Fallback
  return { html: "I can help with products, prices, specs, delivery, returns and warranty. Try asking \"show me earbuds under ₦30,000\" or a product name." };
}

function answerAboutProduct(q, p, fmt) {
  if (/price|how much|cost/.test(q)) {
    const was = p.oldPrice ? ` (was ${fmt(p.oldPrice)})` : "";
    return `<strong>${p.name}</strong> is ${fmt(p.price)}${was}.`;
  }
  if (/spec|specification|feature/.test(q)) {
    const rows = Object.entries(p.specs).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join("");
    return `<strong>${p.name}</strong> specs:<ul style="margin:6px 0 0;padding-left:18px">${rows}</ul>`;
  }
  if (/version|model/.test(q)) {
    return `<strong>${p.name}</strong> — model / version: <em>${p.version}</em>.`;
  }
  if (/stock|available|availability/.test(q)) {
    return p.stock > 0
      ? `Yes — ${p.name} is in stock (${p.stock} available).`
      : `Sorry, ${p.name} is currently out of stock.`;
  }
  if (/color|colour|variant/.test(q)) {
    const parts = [];
    if (p.variants?.color) parts.push(`Colors: ${p.variants.color.join(", ")}`);
    if (p.variants?.storage) parts.push(`Storage: ${p.variants.storage.join(", ")}`);
    if (p.variants?.edition) parts.push(`Editions: ${p.variants.edition.join(", ")}`);
    return parts.length ? parts.join("<br>") : `${p.name} has no variant options.`;
  }
  if (/compatible|work with|fit/.test(q)) {
    return `Compatibility for ${p.name}: ${p.specs.Compatibility || p.specs.Connector || p.specs.OS || "check the specs tab on the product page."}`;
  }
  return null;
}

function productCard(p, fmt) {
  return `<a href="product.html?id=${p.id}" style="display:flex;gap:8px;background:var(--white);border:1px solid var(--border);border-radius:8px;padding:8px;margin-bottom:8px;text-decoration:none;color:inherit">
    <div style="width:40px;height:40px;background:var(--ivory);border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--gold)"><i class="fas ${p.icon}"></i></div>
    <div style="flex:1;min-width:0">
      <div style="font-weight:600;font-size:0.85rem">${p.name}</div>
      <div style="color:var(--bronze);font-weight:700;font-size:0.85rem">${fmt(p.price)}</div>
    </div>
  </a>`;
}

// -------- Mount floating chat panel ----------------------------------------
function mountChatbot() {
  if (document.querySelector("[data-chatbot]")) return;
  const wrap = document.createElement("div");
  wrap.setAttribute("data-chatbot", "");
  wrap.innerHTML = `
    <button class="chat-fab" id="chatFab" aria-label="Chat with us"><i class="fas fa-comment-dots"></i></button>
    <div class="chat-panel" id="chatPanel" role="dialog" aria-label="GadgetX assistant">
      <div class="chat-head">
        <div>
          <strong>GadgetX Assistant</strong>
          <small>Ask about products, delivery, warranty</small>
        </div>
        <button id="chatClose" aria-label="Close"><i class="fas fa-times"></i></button>
      </div>
      <div class="chat-body" id="chatBody">
        <div class="chat-msg bot">Hi 👋 I'm the GadgetX assistant. Ask me about a product, price, delivery, or warranty.</div>
      </div>
      <form class="chat-input" id="chatForm">
        <input id="chatInput" placeholder="Type your question..." autocomplete="off">
        <button type="submit" aria-label="Send"><i class="fas fa-paper-plane"></i></button>
      </form>
    </div>`;
  document.body.appendChild(wrap);

  const panel = wrap.querySelector("#chatPanel");
  wrap.querySelector("#chatFab").addEventListener("click", () => panel.classList.toggle("open"));
  wrap.querySelector("#chatClose").addEventListener("click", () => panel.classList.remove("open"));
  wrap.querySelector("#chatForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = wrap.querySelector("#chatInput");
    const body = wrap.querySelector("#chatBody");
    const txt = input.value.trim();
    if (!txt) return;
    body.insertAdjacentHTML("beforeend", `<div class="chat-msg user">${escapeHtml(txt)}</div>`);
    input.value = "";
    setTimeout(() => {
      const { html } = answerQuestion(txt);
      body.insertAdjacentHTML("beforeend", `<div class="chat-msg bot">${html}</div>`);
      body.scrollTop = body.scrollHeight;
    }, 350);
    body.scrollTop = body.scrollHeight;
  });
}

window.mountChatbot = mountChatbot;
window.GX_CHAT = { answerQuestion };
