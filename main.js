// ============================================================
//  TEMPURA POTATO — main.js  (Firebase Edition v3)
//  ✅ Google Auth fully wired
//  ✅ Promo codes: Firebase-first, no hardcoded bypass
//  ✅ User profile saved to Firebase on login
//  ✅ PWA 20% off only — no sign-in discount
// ============================================================

import { initializeApp }              from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getDatabase, ref, set, get, push, update, remove, onValue }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

// ─── FIREBASE CONFIG ────────────────────────────────────────
const FB_CFG = {
  apiKey:            'AIzaSyDdwoxZEnbhqk92V5LqW9NdfGlXwyIjUC4',
  authDomain:        'tempura-final.firebaseapp.com',
  databaseURL:       'https://tempura-final-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId:         'tempura-final',
  storageBucket:     'tempura-final.firebasestorage.app',
  messagingSenderId: '103063903953',
  appId:             '1:103063903953:web:377b5caecf0a59f6f5aff0',
  measurementId:     'G-5DC9S4321L',
};

const fbApp = initializeApp(FB_CFG);
const db    = getDatabase(fbApp);
const auth  = getAuth(fbApp);

const WA_NUM    = '923044888775';
const IMGBB_KEY = 'ab7a51eaed988c67582fc8bcc877df5a';

// ─── MENU DATA ──────────────────────────────────────────────
export const MENU = [
  { id:'b1', name:'Grill Burger',         cat:'burgers', price:320,  img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',  desc:'Flame-grilled patty, fresh veggies & signature sauce', hot:true },
  { id:'b2', name:'Zinger Burger',        cat:'burgers', price:350,  img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',  desc:'Crispy zinger patty, crunchy lettuce, special sauce', hot:true, bestseller:true },
  { id:'b3', name:'Zinger Twister',       cat:'burgers', price:380,  img:'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&q=80',  desc:'Crispy zinger in a soft tortilla with fresh veggies' },
  { id:'b4', name:'Patty Burger',         cat:'burgers', price:300,  img:'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80',  desc:'Double patty with classic sauce & toppings' },
  { id:'w1', name:'Chicken Bhayari Roll', cat:'wraps',   price:300,  img:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80',  desc:'Classic chicken bhayari in soft flaky paratha' },
  { id:'w2', name:'Seekh Kabab Roll',     cat:'wraps',   price:250,  img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80',  desc:'Juicy seekh kababs rolled in fresh paratha' },
  { id:'w3', name:'Mala Boti Wrap',       cat:'wraps',   price:450,  img:'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=600&q=80',  desc:'Spicy mala boti with fries inside a wrap', hot:true },
  { id:'w4', name:'Zinger Wrap',          cat:'wraps',   price:350,  img:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',  desc:'Zinger patty with lettuce & sauce in a tortilla' },
  { id:'w5', name:'Shapath Roll',         cat:'wraps',   price:390,  img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',  desc:'Loaded shapath in flaky paratha, street-style' },
  { id:'w6', name:'Dhamaka Roll',         cat:'wraps',   price:490,  img:'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80',  desc:'The ultimate roll — fully loaded, fully flavoured', bestseller:true },
  { id:'w7', name:'Malai Boti Roll',      cat:'wraps',   price:420,  img:'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80',  desc:'Creamy malai boti wrapped in hot paratha' },
  { id:'w8', name:'Chicken Shawarma',     cat:'wraps',   price:280,  img:'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80',  desc:'Fresh grilled chicken shawarma with garlic sauce', bestseller:true },
  { id:'w9', name:'Special Shawarma',     cat:'wraps',   price:380,  img:'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80',  desc:'Upgraded shawarma — extra toppings, extra flavour' },
  { id:'w10',name:'2 Shawarma',           cat:'wraps',   price:380,  img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',  desc:'Two classic shawarmas — great value' },
  { id:'c1', name:'Chicken Taka Roll',    cat:'wraps',   price:280,  img:'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80',  desc:'Taka-style spiced chicken in crispy paratha' },
  { id:'c2', name:'Taka Grilled Chicken', cat:'sides',   price:250,  img:'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=600&q=80',  desc:'Perfectly grilled taka-style chicken pieces' },
  { id:'s1', name:'Plane Fries',          cat:'sides',   price:120,  img:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80',  desc:'Classic golden crispy fries' },
  { id:'s2', name:'Loaded Fries',         cat:'sides',   price:180,  img:'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&q=80',  desc:'Fries loaded with cheese sauce & toppings', hot:true },
  { id:'s3', name:'Next Cola 1L',         cat:'sides',   price:120,  img:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80',  desc:'Chilled Next Cola 1 litre' },
  { id:'d1', name:'Deal 1',               cat:'deals',   price:600,  img:'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80',  desc:'2 Zinger Burgers + 2 Next Colas', includes:['2 Zinger Burgers','2 Next Colas'] },
  { id:'d2', name:'Deal 2',               cat:'deals',   price:420,  img:'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80',  desc:'2 Zinger Twisters + 1 Plane Fries', includes:['2 Zinger Twisters','1 Plane Fries'] },
  { id:'d3', name:'Deal 3',               cat:'deals',   price:380,  img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',  desc:'1 Zinger + 1 Fries + 1 Drink', includes:['1 Zinger Burger','1 Plane Fries','1 Drink'] },
  { id:'d4', name:'Deal 4',               cat:'deals',   price:480,  img:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80',  desc:'2 Patty Burgers + 1L Cola', includes:['2 Patty Burgers','1L Next Cola'] },
  { id:'d5', name:'Deal 5',               cat:'deals',   price:550,  img:'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',  desc:'1 Zinger + 1 Shawarma + Half Drink', includes:['1 Zinger Burger','1 Shawarma','Half Drink'] },
  { id:'d6', name:'Family Deal',          cat:'deals',   price:1000, img:'https://images.unsplash.com/photo-1552895638-f7fe08d2f7d5?w=600&q=80',  desc:'2 Patty + 2 Zingers + 1L Cola + Loaded Fries', includes:['2 Patty Burgers','2 Zingers','1L Cola','Loaded Fries'], bestseller:true },
  { id:'d7', name:'Mega Deal',            cat:'deals',   price:1250, img:'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=600&q=80',  desc:'4 Zingers + 1L Cola + Loaded Fries', includes:['4 Zinger Burgers','1L Cola','Loaded Fries'] },
  { id:'d8', name:'Feast Deal',           cat:'deals',   price:1480, img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',  desc:'5 Grill Burgers + 2 Loaded Fries + 1L Cola', includes:['5 Grill Burgers','2 Loaded Fries','1L Cola'] },
  { id:'d9', name:'Party Deal',           cat:'deals',   price:1500, img:'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80',  desc:'6 Patty + 1L Cola + Loaded Fries', includes:['6 Patty Burgers','1L Cola','Loaded Fries'] },
  { id:'d10',name:'Legendary Deal',       cat:'deals',   price:2000, img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',  desc:'Ultimate party pack', includes:['2 Patty','2 Zingers','2 Grill','2 Loaded Fries','2L Cola'] },
];

// ─── CART ───────────────────────────────────────────────────
const CART_KEY = 'tp_cart_v4';
export function getCart()   { try { return JSON.parse(localStorage.getItem(CART_KEY)||'[]'); } catch { return []; } }
export function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); }
export function clearCart() { localStorage.removeItem(CART_KEY); updateBadge(); }

export function addToCart(item, qty=1) {
  const cart = getCart();
  const idx  = cart.findIndex(c => c.id === item.id);
  if (idx >= 0) cart[idx].qty += qty;
  else cart.push({ id:item.id, name:item.name, price:item.price, img:item.img||'', cat:item.cat||'', qty });
  saveCart(cart); updateBadge();
  showToast(item.name + ' added to cart 🛒');
  flyToCart();
}
export function removeFromCart(id) { saveCart(getCart().filter(c => c.id !== id)); updateBadge(); }
export function updateCartQty(id, qty) {
  const cart = getCart();
  const idx  = cart.findIndex(c => c.id === id);
  if (idx >= 0) { if (qty <= 0) cart.splice(idx,1); else cart[idx].qty = qty; }
  saveCart(cart); updateBadge();
}
export function updateBadge() {
  const total = getCart().reduce((s,c) => s+c.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = total);
  const f = document.getElementById('cart-float');
  if (f) f.classList.toggle('show', total > 0);
}

// ─── FIREBASE HELPERS ───────────────────────────────────────
export async function fbSave(path, data)   { await set(ref(db, path), data); return data; }
export async function fbPush(path, data)   { const r = await push(ref(db, path), data); return { id:r.key, ...data }; }
export async function fbGet(path)          { const s = await get(ref(db, path)); return s.exists() ? s.val() : null; }
export async function fbUpdate(path, data) { await update(ref(db, path), data); }
export async function fbDelete(path)       { await remove(ref(db, path)); }
export function fbListen(path, cb)         { return onValue(ref(db, path), s => cb(s.exists() ? s.val() : null)); }

// ─── ORDER HELPERS ──────────────────────────────────────────
export async function saveOrder(order) {
  await set(ref(db, 'orders/' + order.orderId), order);
  return order;
}
export async function getOrder(orderId) {
  const s = await get(ref(db, 'orders/' + orderId));
  return s.exists() ? s.val() : null;
}
export async function updateOrderStatus(orderId, status, extra={}) {
  await update(ref(db, 'orders/' + orderId), { status, [`statusLog/${status}`]: Date.now(), ...extra });
}
export function listenOrder(orderId, cb) {
  return onValue(ref(db, 'orders/' + orderId), s => cb(s.exists() ? s.val() : null));
}

// ─── PROMO CODES — Firebase only, no hardcoded bypass ──────
// Admin creates codes in admin panel → saved to Firebase promoCodes/
// validatePromo fetches ONLY from Firebase so admin changes apply instantly
export async function validatePromo(code) {
  if (!code) return null;
  try {
    const data = await fbGet('promoCodes/' + code.toUpperCase());
    if (!data) return null;
    // Check expiry
    if (data.expiry && Date.now() > data.expiry) return { expired:true, msg:'This promo code has expired' };
    // Check uses limit
    if (data.maxUses && (data.usedCount||0) >= data.maxUses) return { expired:true, msg:'Promo code usage limit reached' };
    return { discount: data.discount, label: data.label || Math.round(data.discount*100)+'% off' };
  } catch(e) {
    console.error('[TP] validatePromo error:', e);
    return null;
  }
}

// Increment promo use count after order placed
export async function recordPromoUse(code) {
  if (!code) return;
  try {
    const data = await fbGet('promoCodes/' + code.toUpperCase());
    if (data) await fbUpdate('promoCodes/' + code.toUpperCase(), { usedCount: (data.usedCount||0)+1 });
  } catch(e) {}
}

// ─── SETTINGS ───────────────────────────────────────────────
export async function loadSettings() {
  const s = await fbGet('settings');
  if (s) applySettings(s);
  return s || {};
}
export function applySettings(s) {
  if (!s) return;
  if (s.announcementBar && s.annShow) {
    const bar = document.getElementById('ann-bar');
    if (bar) { bar.textContent = s.announcementBar; bar.style.display = 'block'; }
  }
  if (s.accentColor)    document.documentElement.style.setProperty('--yellow', s.accentColor);
  if (s.bgColor)        document.documentElement.style.setProperty('--black',  s.bgColor);
  if (s.logoEmoji)      document.querySelectorAll('.tp-logo').forEach(e => e.textContent = s.logoEmoji);
  if (s.restaurantName) document.querySelectorAll('.tp-brand').forEach(e => e.textContent = s.restaurantName);
  if (s.tagline)        document.querySelectorAll('.tp-tagline').forEach(e => e.textContent = s.tagline);
}

// ─── GOOGLE AUTH ────────────────────────────────────────────
export let currentUser = null;

export function initAuth(onUser) {
  onAuthStateChanged(auth, async user => {
    currentUser = user;
    if (user) {
      // Save/update user profile in Firebase on every login
      await fbUpdate('users/' + user.uid, {
        uid:         user.uid,
        name:        user.displayName || 'Customer',
        email:       user.email       || '',
        photo:       user.photoURL    || '',
        lastLogin:   Date.now(),
      }).catch(() => {});
    }
    if (onUser) onUser(user);
  });
}

export async function signInGoogle() {
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch(e) {
    // Fallback: redirect if popup blocked
    if (e.code === 'auth/popup-blocked') {
      const { signInWithRedirect } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
      await signInWithRedirect(auth, provider);
    }
    throw e;
  }
}

export async function signOutUser() {
  await signOut(auth);
  currentUser = null;
}

// Save user location to Firebase profile
export async function saveUserLocation(uid, lat, lng) {
  if (!uid) return;
  await fbUpdate('users/' + uid, { lastLocation: { lat, lng, ts: Date.now() } }).catch(() => {});
}

// Get saved user profile from Firebase
export async function getUserProfile(uid) {
  if (!uid) return null;
  return await fbGet('users/' + uid);
}

// ─── IMGBB UPLOAD ───────────────────────────────────────────
export async function uploadToImgBB(file) {
  const fd = new FormData();
  fd.append('image', file);
  const res  = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, { method:'POST', body:fd });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message || 'Upload failed');
  return json.data.url;
}

// ─── TOAST ──────────────────────────────────────────────────
export function showToast(msg, type='success') {
  let t = document.getElementById('tp-toast');
  if (!t) { t = document.createElement('div'); t.id='tp-toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.style.background = type === 'error' ? '#ff4444' : 'var(--yellow)';
  t.style.color      = type === 'error' ? '#fff'    : 'var(--black)';
  t.style.opacity    = '1';
  t.style.transform  = 'translateX(-50%) translateY(0)';
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(20px)'; }, 3200);
}

// ─── FLY TO CART ────────────────────────────────────────────
export function flyToCart() {
  const cartIcon = document.getElementById('cart-float');
  if (!cartIcon || !window._lastClick) return;
  const dot = document.createElement('div');
  const cr  = cartIcon.getBoundingClientRect();
  dot.style.cssText = `position:fixed;left:${window._lastClick.x}px;top:${window._lastClick.y}px;width:10px;height:10px;background:var(--yellow);border-radius:50%;pointer-events:none;z-index:99999;transition:all .6s cubic-bezier(.4,0,.2,1);`;
  document.body.appendChild(dot);
  requestAnimationFrame(() => {
    dot.style.left      = (cr.left + cr.width/2)  + 'px';
    dot.style.top       = (cr.top  + cr.height/2) + 'px';
    dot.style.opacity   = '0';
    dot.style.transform = 'scale(0)';
  });
  setTimeout(() => dot.remove(), 700);
}
document.addEventListener('click', e => { window._lastClick = { x:e.clientX, y:e.clientY }; });

// ─── NAV ────────────────────────────────────────────────────
export function initNav() {
  let lastY = 0;
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 10);
    nav.classList.toggle('nav-hide', y > lastY + 5 && y > 120);
    nav.classList.toggle('nav-show', y < lastY - 5);
    lastY = y;
  }, { passive:true });
  const ham  = document.getElementById('nav-ham');
  const menu = document.getElementById('mobile-menu');
  ham?.addEventListener('click', () => { menu?.classList.toggle('open'); document.body.classList.toggle('no-scroll'); });
  window.closeMenu = () => { menu?.classList.remove('open'); document.body.classList.remove('no-scroll'); };
  document.addEventListener('keydown', e => { if (e.key==='Escape') window.closeMenu?.(); });
}

// ─── PARTICLES ──────────────────────────────────────────────
export function initParticles() {
  const wrap = document.getElementById('hero-particles'); if (!wrap) return;
  for (let i=0; i<20; i++) {
    const p = document.createElement('div'); p.className = 'hero-p';
    const s = Math.random()*4+2;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*8}s;`;
    wrap.appendChild(p);
  }
}

// ─── REVEAL ON SCROLL ───────────────────────────────────────
export function initReveal() {
  const obs = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-s').forEach(el => {
    if (!el.classList.contains('in-view')) obs.observe(el);
  });
}

// ─── PARALLAX ───────────────────────────────────────────────
export function initParallax() {
  window.addEventListener('scroll', () => {
    const bg = document.getElementById('par-bg');
    if (bg) bg.style.transform = `translateY(${window.scrollY * .18}px)`;
  }, { passive:true });
}

// ─── COUNTERS ───────────────────────────────────────────────
export function initCounters() {
  const obs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = parseInt(el.dataset.count); const suf = el.dataset.suf || '';
      if (isNaN(end)) return;
      let n = 0; const step = end / 60;
      const t = setInterval(() => { n = Math.min(n+step,end); el.textContent=Math.floor(n)+suf; if(n>=end) clearInterval(t); }, 16);
      obs.unobserve(el);
    });
  }, { threshold:.5 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

// ─── CURSOR ─────────────────────────────────────────────────
export function initCursor() {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  const cur = document.getElementById('tp-cur'); if (!cur) return;
  document.addEventListener('mousemove', e => { cur.style.opacity='1'; cur.style.left=e.clientX+'px'; cur.style.top=e.clientY+'px'; });
  document.querySelectorAll('a,button,[onclick],.menu-card,.deal-card').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hover'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hover'));
  });
  document.addEventListener('mouseleave', () => cur.style.opacity = '0');
}

// ─── TILT ───────────────────────────────────────────────────
export function initTilt() {
  document.querySelectorAll('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.transform = `perspective(600px) rotateX(${((e.clientY-r.top)/r.height-.5)*-12}deg) rotateY(${((e.clientX-r.left)/r.width-.5)*12}deg) scale(1.02)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

// ─── TYPING ANIMATION ───────────────────────────────────────
export function initTyping(el, text, speed=45) {
  if (!el) return; el.textContent = ''; let i = 0;
  const t = setInterval(() => { el.textContent += text[i++]; if (i >= text.length) clearInterval(t); }, speed);
}
window.initTyping = initTyping;

// ─── PWA ────────────────────────────────────────────────────
let _dip = null;
export function initPWA() {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault(); _dip = e;
    setTimeout(() => document.getElementById('pwa-banner')?.classList.add('show'), 3500);
  });
  document.getElementById('pwa-close')?.addEventListener('click', () => document.getElementById('pwa-banner')?.classList.remove('show'));
  document.querySelectorAll('.pwa-btn').forEach(b => b.addEventListener('click', doPWA));
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}
async function doPWA() {
  if (_dip) {
    _dip.prompt(); const { outcome } = await _dip.userChoice; _dip = null;
    if (outcome === 'accepted') {
      // 20% off only on app install for first time
      if (!localStorage.getItem('tp_app_disc')) {
        localStorage.setItem('tp_app_disc', '1');
        showToast('App installed! Use code APP20 for 20% off your first order 🎉');
      } else {
        showToast('App installed! 🎉');
      }
      document.getElementById('pwa-banner')?.classList.remove('show');
      window.closePWA?.();
    }
  } else {
    const m = document.getElementById('pwa-manual'); if (m) m.style.display = 'block';
    document.getElementById('pwa-overlay')?.classList.add('show');
  }
}
window.closePWA = () => document.getElementById('pwa-overlay')?.classList.remove('show');

// ─── RENDER MENU ────────────────────────────────────────────
export function renderMenu(cat='all') {
  const grid = document.getElementById('menu-grid'); if (!grid) return;
  const items = cat === 'all' ? MENU.filter(i => i.cat !== 'deals') : MENU.filter(i => i.cat === cat);
  grid.innerHTML = items.map((item, i) => `
    <div class="menu-card tilt reveal" style="transition-delay:${i*.04}s" onclick="window.TP.openModal('${item.id}')">
      <div class="mc-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80'"/>
        <div class="mc-overlay"></div>
        ${item.hot        ? '<span class="mc-tag hot">🔥 Hot</span>'  : ''}
        ${item.bestseller ? '<span class="mc-tag best">⭐ Best</span>' : ''}
      </div>
      <div class="mc-body">
        <div class="mc-name">${item.name}</div>
        <div class="mc-desc">${item.desc}</div>
        <div class="mc-foot">
          <div class="mc-price">Rs. ${item.price}</div>
          <button class="mc-add" onclick="event.stopPropagation();window.TP.addToCart({id:'${item.id}',name:'${item.name.replace(/'/g,"\\'")}',price:${item.price},img:'${item.img}',cat:'${item.cat}'},1)">+</button>
        </div>
      </div>
    </div>`).join('');
  initReveal(); setTimeout(initTilt, 80);
}

export function renderDeals() {
  const grid = document.getElementById('deals-grid'); if (!grid) return;
  grid.innerHTML = MENU.filter(i => i.cat === 'deals').map((d, i) => `
    <div class="deal-card reveal" style="transition-delay:${i*.06}s" onclick="window.TP.openModal('${d.id}')">
      <span class="deal-badge">🔥 DEAL</span>
      <div class="deal-img"><img src="${d.img}" alt="${d.name}" loading="lazy"/><div class="deal-img-ov"></div></div>
      <div class="deal-body">
        <div class="deal-name">${d.name}</div>
        <div class="deal-inc">${(d.includes||[]).map(x=>`<span>✦ ${x}</span>`).join('')}</div>
        <div class="deal-foot">
          <div class="deal-price">Rs. ${d.price}</div>
          <button class="btn-p" style="padding:9px 18px;font-size:13px" onclick="event.stopPropagation();window.TP.addToCart({id:'${d.id}',name:'${d.name.replace(/'/g,"\\'")}',price:${d.price},img:'${d.img}',cat:'deals'},1)">Add</button>
        </div>
      </div>
    </div>`).join('');
  initReveal();
}

export function initTabs() {
  document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const g = document.getElementById('menu-grid');
      g.style.cssText = 'opacity:0;transform:translateY(8px);transition:all .25s';
      setTimeout(() => { renderMenu(tab.dataset.cat); g.style.cssText = 'opacity:1;transform:translateY(0);transition:all .25s'; }, 240);
    });
  });
}

// ─── ITEM MODAL ─────────────────────────────────────────────
let _mi = null, _mq = 1;
export function openModal(id) {
  _mi = MENU.find(m => m.id === id); if (!_mi) return; _mq = 1;
  const modal = document.getElementById('item-modal'); if (!modal) return;
  document.getElementById('m-img').src           = _mi.img;
  document.getElementById('m-name').textContent  = _mi.name;
  document.getElementById('m-desc').textContent  = _mi.desc;
  document.getElementById('m-price').textContent = 'Rs. ' + _mi.price;
  document.getElementById('m-qty').textContent   = '1';
  const inc = document.getElementById('m-includes');
  if (inc) inc.innerHTML = (_mi.includes||[]).map(x=>`<span>✦ ${x}</span><br/>`).join('');
  modal.classList.add('show'); document.body.style.overflow = 'hidden';
}
window.openModal  = openModal;
window.closeModal = function() { document.getElementById('item-modal')?.classList.remove('show'); document.body.style.overflow = ''; };
window.mQty       = function(d) { _mq=Math.max(1,_mq+d); document.getElementById('m-qty').textContent=_mq; if(_mi) document.getElementById('m-price').textContent='Rs. '+(_mi.price*_mq); };
window.addModal   = function() { if(_mi){addToCart(_mi,_mq);window.closeModal();} };
document.addEventListener('click', e => {
  if (e.target.id==='item-modal') window.closeModal?.();
  if (e.target.id==='pwa-overlay') window.closePWA?.();
});

// ─── GLOBAL INIT ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  updateBadge();
  await loadSettings();
  initNav(); initParticles(); initReveal(); initParallax(); initCounters(); initCursor(); initPWA();
  if (document.getElementById('menu-grid'))  { renderMenu('all'); initTabs(); }
  if (document.getElementById('deals-grid')) renderDeals();
  setTimeout(initTilt, 400);
});

// ─── EXPORTS ────────────────────────────────────────────────
window.TP = {
  getCart, addToCart, removeFromCart, updateCartQty, clearCart, saveCart,
  MENU, renderMenu, renderDeals, initTabs, openModal,
  fbSave, fbPush, fbGet, fbUpdate, fbDelete, fbListen,
  saveOrder, getOrder, updateOrderStatus, listenOrder,
  currentUser: () => currentUser,
  initAuth, signInGoogle, signOutUser, saveUserLocation, getUserProfile,
  validatePromo, recordPromoUse,
  loadSettings, applySettings,
  showToast, updateBadge, uploadToImgBB, flyToCart,
  initReveal, initTilt, initCursor, initParticles, initTyping,
  WA_NUM, db, auth,
};
