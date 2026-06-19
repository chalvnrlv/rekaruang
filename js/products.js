/* ============================================================
   REKA RUANG — Product Data v2
   Minimalist redesign — uses real asset paths from project folder
   ============================================================ */

const PRODUCTS = [
    {
        id: "rt-01",
        collection: "Reka Tiles 01",
        name: "Material Limbah Kain",
        tagline: "Eksklusivitas dari sisa tekstil",
        description:
            "Material dekoratif inovatif berbasis limbah tekstil yang diolah melalui proses pewarnaan dan pencetakan khusus. Menghasilkan tekstur visual yang unik dengan nilai eksklusivitas tinggi pada setiap kepingnya.",
        material: "Limbah tekstil (upcycled) · Pewarna khusus · Resin binder",
        finish: "Tekstur Halus / Custom",
        dimensions: ["20 × 20 cm", "Custom"],
        thickness: "10–12 mm",
        weight: "Proporsional",
        applications: ["Wall Cladding", "Feature Wall", "Elemen Dekoratif", "Interior Retail"],
        image: "assets/images/produk per tiles.png",
        badge: "Kain",
    },
    {
        id: "rt-02",
        collection: "Reka Tiles 02",
        name: "Material Limbah Kain",
        tagline: "Eksklusivitas dari sisa tekstil",
        description:
            "Varian kedua dari koleksi material berbasis tekstil upcycling. Memiliki karakteristik warna yang lebih berani namun tetap mempertahankan tekstur serat yang organik dan elegan untuk aplikasi interior premium.",
        material: "Limbah tekstil (upcycled) · Pewarna khusus · Resin binder",
        finish: "Tekstur Halus / Custom",
        dimensions: ["20 × 20 cm", "Custom"],
        thickness: "10–12 mm",
        weight: "Proporsional",
        applications: ["Wall Cladding", "Feature Wall", "Elemen Dekoratif", "Interior Retail"],
        image: "assets/images/produk per tiles (1).png",
        badge: "Kain",
    },
    {
        id: "rt-03",
        collection: "Reka Tiles 03",
        name: "Material Limbah Kayu",
        tagline: "Estetika serbuk kayu daur ulang",
        description:
            "Material dekoratif berbasis limbah serbuk kayu yang dipadukan dengan resin dan pigmen warna. Menampilkan karakter material yang hangat namun kontemporer, ideal untuk aksen ruang interior modern.",
        material: "Limbah serbuk kayu · Pigmen warna · Resin premium",
        finish: "Matte / Custom Texture",
        dimensions: ["20 × 20 cm", "Custom"],
        thickness: "12 mm",
        weight: "Proporsional",
        applications: ["Wall Cladding", "Feature Wall", "Panel Dinding", "Interior Kafe"],
        image: "assets/images/produk per tiles (2).png",
        badge: "Kayu",
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
        <span class="link-arrow" style="font-size:0.7rem;">Detail</span>
      </div>
    </div>
  </article>`;
}

function updateCount(n) {
    const el = document.getElementById("result-count");
    if (el) el.textContent = `${n} produk`;
}

/* ── Filters ── */
let activeFilter = "all";

function buildFilters() {
    const container = document.getElementById("filter-btns");
    if (!container) return;

    const apps = ["all", ...ALL_APPLICATIONS];
    container.innerHTML = apps.map(app =>
        `<button class="filter-btn${app === "all" ? " active" : ""}" data-filter="${app}" aria-pressed="${app === "all"}">${app === "all" ? "Semua" : app}</button>`
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
