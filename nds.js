/* ============================================================
   NDS — Narayan Digital Studio  |  nds.js
   All JavaScript for every page in nds.html
============================================================ */

/* ─── PAGE SWITCHING ─────────────────────────────────────── */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) { target.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  updateNav(pageId);
  if (pageId === 'page-gallery') { setTimeout(filterGallery, 50); }
}

function updateNav(pageId) {
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => a.classList.remove('active'));
  const map = { 'page-home': 'nav-home', 'page-gallery': 'nav-gallery', 'page-payment': 'nav-payment', 'page-login': 'nav-login', 'page-dashboard': 'nav-dashboard', 'page-admin': 'nav-admin' };
  if (map[pageId]) { const el = document.getElementById(map[pageId]); if (el) el.classList.add('active'); }
}

function scrollToSection(id) {
  showPage('page-home');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 120);
}

/* ─── NAV SCROLL ─────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── MOBILE MENU ────────────────────────────────────────── */
function toggleMobile() {
  const m = document.getElementById('mobile-menu');
  if (m) m.classList.toggle('open');
}
document.addEventListener('click', (e) => {
  const m = document.getElementById('mobile-menu');
  const h = document.querySelector('.hamburger');
  if (m && h && m.classList.contains('open') && !m.contains(e.target) && !h.contains(e.target)) {
    m.classList.remove('open');
  }
});

/* ─── TABS ───────────────────────────────────────────────── */
function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add('active');
  if (btn) btn.classList.add('active');
}

/* ─── FORMS ──────────────────────────────────────────────── */
function handleLogin(e) {
  e.preventDefault();
  showNotification('Login successful! Welcome back.');
  setTimeout(() => showPage('page-dashboard'), 900);
}

function handleRegister(e) {
  e.preventDefault();
  showNotification('Account created! Please sign in.');
  setTimeout(() => {
    const loginTab    = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const btns        = document.querySelectorAll('.tab-btn');
    if (loginTab && registerTab) { registerTab.classList.remove('active'); loginTab.classList.add('active'); }
    if (btns.length >= 2)        { btns[1].classList.remove('active');     btns[0].classList.add('active'); }
  }, 900);
}

function handleContact(e) {
  e.preventDefault();
  showNotification("Message sent! We'll contact you within 24 hours.");
  e.target.reset();
}

/* ─── PAYMENT ────────────────────────────────────────────── */
let selectedPkg = { name: 'Wedding Photography Full Day', price: 25000 };

function selectPackage(el, price, name) {
  document.querySelectorAll('.package-option').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  selectedPkg = { name, price };
  const gst = Math.round(price * 0.18), total = price + gst;
  const set = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  set('pkg-name-display', name);
  set('gst-display',   '₹' + gst.toLocaleString('en-IN'));
  set('total-display', '₹' + total.toLocaleString('en-IN'));
  set('pay-btn-amount','₹' + total.toLocaleString('en-IN'));
}

function selectPayMethod(el) {
  document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
}

function processPayment() {
  showNotification('Processing payment...');
  setTimeout(() => {
    const f = document.getElementById('payment-form-view');
    const s = document.getElementById('payment-success');
    if (f) f.style.display = 'none';
    if (s) s.style.display = 'block';
  }, 1800);
}

function downloadReceipt() { showNotification('Receipt downloaded successfully!'); }

/* ─── ADMIN ──────────────────────────────────────────────── */
function setAdminSection(sec, el) {
  document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');
}

/* ─── MODALS ─────────────────────────────────────────────── */
function showModal(id) { const m = document.getElementById(id); if (m) m.classList.add('open'); }
function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('open'); }

/* ─── NOTIFICATIONS ──────────────────────────────────────── */
function showNotification(msg) {
  const n = document.getElementById('notification');
  const t = document.getElementById('notification-msg');
  if (!n) return;
  if (t) t.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 3500);
}

/* ─── LOADER ─────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) { l.style.opacity = '0'; setTimeout(() => { l.style.display = 'none'; }, 600); }
  }, 1600);
});

/* ─── GALLERY DATA ───────────────────────────────────────── */
const galleryItems = [
  { src:'d01.png',  cat:'wedding',    title:'Eternal Vows',    subtitle:'Wedding Photography' },
  { src:'d02.jpg',  cat:'prewedding', title:'Before Forever',  subtitle:'Pre-Wedding Shoot'   },
  { src:'d03.jpg',  cat:'baby',       title:'Tiny Wonder',     subtitle:'Baby Shoot'          },
  { src:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', cat:'birthday', title:'Celebrate Joy', subtitle:'Birthday Events' },
  { src:'d05.jpg',  cat:'family',     title:'Family Legacy',   subtitle:'Family Portraits'    },
  { src:'d06.jpg',  cat:'wedding',    title:'Golden Moments',  subtitle:'Wedding Photography' },
  { src:'d07.jpg',  cat:'prewedding', title:'Love in Bloom',   subtitle:'Pre-Wedding Shoot'   },
  { src:'d08.jpg',  cat:'ceremony',   title:'Indian Rituals',  subtitle:'Maternity'           },
  { src:'d09.jpg',  cat:'baby',       title:'Sweet Dreams',    subtitle:'Newborn Shoot'       },
  { src:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', cat:'birthday', title:'Party Time', subtitle:'Birthday Events' },
  { src:'d11.jpg',  cat:'wedding',    title:'Timeless Love',   subtitle:'Wedding Photography' },
  { src:'d12.jpg',  cat:'ceremony',   title:'Sacred Moments',  subtitle:'Maternity'           },
  { src:'d13.jpg',  cat:'family',     title:'Together Always', subtitle:'Family Portraits'    },
];

let activeFilter = 'all';

function renderGallery(items) {
  const c = document.getElementById('gallery-masonry');
  if (!c) return;
  if (!items.length) { c.innerHTML = '<p style="color:var(--gray);text-align:center;padding:40px;grid-column:1/-1">No photos found.</p>'; return; }
  c.innerHTML = items.map(i => `
    <div class="gallery-card" data-cat="${i.cat}">
      <img src="${i.src}" alt="${i.title}" loading="lazy">
      <div class="gallery-card-overlay">
        <div class="gallery-card-title">${i.title}</div>
        <div class="gallery-card-cat">${i.subtitle}</div>
      </div>
    </div>`).join('');
}

function setFilter(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterGallery();
}

function filterGallery() {
  const q = (document.getElementById('gallery-search')?.value || '').toLowerCase();
  renderGallery(galleryItems.filter(i => {
    const mc = activeFilter === 'all' || i.cat === activeFilter;
    const ms = !q || i.title.toLowerCase().includes(q) || i.subtitle.toLowerCase().includes(q);
    return mc && ms;
  }));
}

/* ─── DOM READY ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Gallery init
  renderGallery(galleryItems);

  // Modal backdrop click
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });

  // Fade-in on scroll
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
});
