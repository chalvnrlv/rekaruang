/* ============================================================
   REKA RUANG — Product Data v2
   Minimalist redesign — uses real asset paths from project folder
   ============================================================ */

const PRODUCTS = [
    {
        id: "rt-001",
        collection: "Reka Tiles",
        name: "Classic Blend",
        tagline: "Terrazzo from reclaimed material",
        description:
            "A signature terrazzo tile composed of upcycled ceramic and stone fragments set in a cement matrix. Each tile carries natural colour variation from its source materials — warm burgundy and cream tones with a matte surface that softens with light.",
        material: "Upcycled ceramic · Reclaimed stone fragments · Cement binder",
        finish: "Matte",
        dimensions: ["30 × 30 cm", "20 × 20 cm", "Custom"],
        thickness: "12 mm",
        weight: "4.5 kg/tile (30×30)",
        applications: ["Wall Cladding", "Feature Wall", "Flooring", "Commercial"],
        image: "assets/images/produk per tiles.png",
        badge: null,
    },
    {
        id: "rt-002",
        collection: "Reka Tiles",
        name: "Terrazzo Mix",
        tagline: "Three variants, one collection",
        description:
            "The full Reka Tiles collection in a single view — earthy crimson, teal mineral, and layered mixed aggregate. Each pair of tiles tells a different material story depending on installation pattern and light.",
        material: "Mixed reclaimed aggregate · Mineral pigment · Portland cement",
        finish: "Matte / Mineral",
        dimensions: ["30 × 30 cm", "20 × 20 cm", "15 × 15 cm"],
        thickness: "12–14 mm",
        weight: "4.0–5.0 kg/tile",
        applications: ["Wall Cladding", "Feature Wall", "Furniture Surface", "Commercial"],
        image: "assets/images/ASSET V4.png",
        badge: "Collection",
    },
    {
        id: "rt-003",
        collection: "Reka Tiles",
        name: "Crimson Earth",
        tagline: "Deep red from reclaimed clay",
        description:
            "A bold deep-crimson tile made from upcycled fired ceramic waste with a rich, dense texture. The colour draws from the natural iron oxide present in Indonesian clay — intense but warm, designed for statement surfaces.",
        material: "Upcycled fired ceramics · Iron oxide pigment · Cement matrix",
        finish: "Matte",
        dimensions: ["30 × 30 cm", "20 × 20 cm"],
        thickness: "13 mm",
        weight: "4.8 kg/tile (30×30)",
        applications: ["Feature Wall", "Wall Cladding", "Flooring"],
        image: "assets/images/produk per tiles (1).png",
        badge: null,
    },
    {
        id: "rt-004",
        collection: "Reka Tiles",
        name: "Teal Mineral",
        tagline: "Cyan from glass and mineral aggregate",
        description:
            "A cool, mineral tile made with upcycled coloured glass aggregate in shades of teal and cyan. The glass fragments catch directional light differently throughout the day — a material that changes with the space.",
        material: "Upcycled coloured glass · Mineral aggregate · Eco-resin binder",
        finish: "Matte / Mineral glint",
        dimensions: ["30 × 30 cm", "20 × 20 cm", "Mosaic sheet 30×30"],
        thickness: "11 mm",
        weight: "3.8 kg/tile (30×30)",
        applications: ["Wall Cladding", "Feature Wall", "Furniture Surface", "Commercial"],
        image: "assets/images/produk per tiles (2).png",
        badge: "Eco Pick",
    },
];

const ALL_APPLICATIONS = [...new Set(PRODUCTS.flatMap(p => p.applications))].sort();
const ALL_COLLECTIONS = [...new Set(PRODUCTS.map(p => p.collection))];

/* ── Render ── */
function renderProducts(products) {
    const grid = document.getElementById("products-grid");
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = `<div class="products-empty">No products match this filter.</div>`;
        updateCount(0);
        return;
    }

    grid.innerHTML = products.map(productCardHTML).join("");
    updateCount(products.length);

    grid.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", () => openModal(card.dataset.id));
        card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openModal(card.dataset.id); });
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `View details for ${card.dataset.name}`);
    });
}

function productCardHTML(p) {
    return `
  <article class="product-card" data-id="${p.id}" data-name="${p.name}">
    <div class="product-img-wrap">
      <img src="${p.image}" alt="${p.name} — ${p.collection}" loading="lazy">
    </div>
    <div class="product-info">
      <span class="label-accent">${p.collection}${p.badge ? ` — ${p.badge}` : ""}</span>
      <h3>${p.name}</h3>
      <p class="desc">${p.tagline}</p>
      <div class="product-info-footer">
        <div class="product-meta-chips">
          ${p.applications.slice(0, 3).map(a => `<span class="tag tag-muted" style="font-size:0.62rem;padding:3px 8px;">${a}</span>`).join("")}
        </div>
        <span class="link-arrow" style="font-size:0.7rem;">Details</span>
      </div>
    </div>
  </article>`;
}

function updateCount(n) {
    const el = document.getElementById("result-count");
    if (el) el.textContent = `${n} product${n !== 1 ? "s" : ""}`;
}

/* ── Filters ── */
let activeFilter = "all";

function buildFilters() {
    const container = document.getElementById("filter-btns");
    if (!container) return;

    const apps = ["all", ...ALL_APPLICATIONS];
    container.innerHTML = apps.map(app =>
        `<button class="filter-btn${app === "all" ? " active" : ""}" data-filter="${app}" aria-pressed="${app === "all"}">${app === "all" ? "All" : app}</button>`
    ).join("");

    container.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            activeFilter = btn.dataset.filter;
            container.querySelectorAll(".filter-btn").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");
            applyFilter();
        });
    });
}

function applyFilter() {
    const filtered = activeFilter === "all"
        ? PRODUCTS
        : PRODUCTS.filter(p => p.applications.includes(activeFilter));
    renderProducts(filtered);
    setTimeout(() => {
        document.querySelectorAll(".reveal:not(.visible)").forEach(el => el.classList.add("visible"));
    }, 50);
}

/* ── Modal ── */
function openModal(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const overlay = document.getElementById("product-modal");
    if (!overlay) return;

    overlay.querySelector(".modal-collection").textContent = p.collection;
    overlay.querySelector(".modal-product-name").textContent = p.name;
    overlay.querySelector(".modal-desc").textContent = p.description;
    overlay.querySelector(".modal-material").textContent = p.material;
    overlay.querySelector(".modal-finish").textContent = p.finish;
    overlay.querySelector(".modal-thickness").textContent = p.thickness;
    overlay.querySelector(".modal-weight").textContent = p.weight;
    overlay.querySelector(".modal-img img").src = p.image;
    overlay.querySelector(".modal-img img").alt = p.name;

    overlay.querySelector(".modal-dimensions").innerHTML = p.dimensions
        .map(d => `<li style="font-size:0.88rem;color:var(--text-secondary);padding:3px 0;border-bottom:1px solid var(--border);">— ${d}</li>`)
        .join("");

    overlay.querySelector(".modal-apps").innerHTML = p.applications
        .map(a => `<span class="tag">${a}</span>`).join("");

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    overlay.querySelector(".modal-close").focus();
}

function closeModal() {
    const overlay = document.getElementById("product-modal");
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
}

function initCatalog() {
    buildFilters();
    renderProducts(PRODUCTS);

    const overlay = document.getElementById("product-modal");
    if (overlay) {
        overlay.querySelector(".modal-close").addEventListener("click", closeModal);
        overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
        document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
    }
}

if (document.getElementById("products-grid")) {
    document.addEventListener("DOMContentLoaded", initCatalog);
}
