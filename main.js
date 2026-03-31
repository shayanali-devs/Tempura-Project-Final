// ============================================================
//  TEMPURA POTATO — main.js v4.0
//  Backend: Back4App (Parse SDK)
//  Cart: localStorage — NEVER reinitializes on page load
// ============================================================

// ─── BACK4APP CONFIG ───────────────────────────────────────
// Replace with your actual Back4App keys from dashboard
const B4A_APP_ID     = 'YOUR_BACK4APP_APP_ID';
const B4A_JS_KEY     = 'YOUR_BACK4APP_JS_KEY';
const B4A_SERVER_URL = 'https://parseapi.back4app.com/';

// IMGBB
const IMGBB_KEY = 'ab7a51eaed988c67582fc8bcc877df5a';

// ─── INIT PARSE ────────────────────────────────────────────
function initParse() {
  if (typeof Parse === 'undefined') { console.warn('Parse SDK not loaded'); return false; }
  Parse.initialize(B4A_APP_ID, B4A_JS_KEY);
  Parse.serverURL = B4A_SERVER_URL;
  return true;
}

// ─── MENU DATA ─────────────────────────────────────────────
const MENU = [
  // BURGERS
  { id:'b1', name:'Grill Burger',          cat:'burgers', price:320, img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', desc:'Flame-grilled patty, fresh veggies & signature sauce', hot:true },
  { id:'b2', name:'Zinger Burger',         cat:'burgers', price:350, img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80', desc:'Crispy zinger patty, crunchy lettuce, special sauce', hot:true, bestseller:true },
  { id:'b3', name:'Zinger Twister',        cat:'burgers', price:380, img:'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&q=80', desc:'Crispy zinger in a soft tortilla with fresh veggies' },
  { id:'b4', name:'Patty Burger',          cat:'burgers', price:300, img:'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80', desc:'Double patty with classic sauce & toppings' },
  // WRAPS & ROLLS
  { id:'w1', name:'Chicken Bhayari Roll',  cat:'wraps', price:300, img:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80', desc:'Classic chicken bhayari in soft flaky paratha' },
  { id:'w2', name:'Seekh Kabab Roll',      cat:'wraps', price:250, img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80', desc:'Juicy seekh kababs rolled in fresh paratha' },
  { id:'w3', name:'Mala Boti Wrap',        cat:'wraps', price:450, img:'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=600&q=80', desc:'Spicy mala boti with fries inside a wrap', hot:true },
  { id:'w4', name:'Zinger Wrap',           cat:'wraps', price:350, img:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80', desc:'Zinger patty with lettuce & sauce in a tortilla' },
  { id:'w5', name:'Shapath Roll',          cat:'wraps', price:390, img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', desc:'Loaded shapath in flaky paratha, street-style' },
  { id:'w6', name:'Dhamaka Roll',          cat:'wraps', price:490, img:'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80', desc:'The ultimate roll — fully loaded, fully flavoured', bestseller:true },
  { id:'w7', name:'Malai Boti Roll',       cat:'wraps', price:420, img:'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80', desc:'Creamy malai boti wrapped in hot paratha' },
  { id:'w8', name:'Chicken Shawarma',      cat:'wraps', price:280, img:'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80', desc:'Fresh grilled chicken shawarma with garlic sauce', bestseller:true },
  { id:'w9', name:'Special Shawarma',      cat:'wraps', price:380, img:'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80', desc:'Upgraded shawarma — extra toppings, extra flavour' },
  { id:'w10',name:'2 Shawarma',            cat:'wraps', price:380, img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', desc:'Two classic shawarmas — great value' },
  { id:'c1', name:'Chicken Taka Roll',     cat:'wraps', price:280, img:'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80', desc:'Taka-style spiced chicken in crispy paratha' },
  // SIDES
  { id:'c2', name:'Taka Grilled Chicken',  cat:'sides',  price:250, img:'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=600&q=80', desc:'Perfectly grilled taka-style chicken pieces' },
  { id:'s1', name:'Plane Fries',           cat:'sides',  price:120, img:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80', desc:'Classic golden crispy fries' },
  { id:'s2', name:'Loaded Fries',          cat:'sides',  price:180, img:'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&q=80', desc:'Fries loaded with cheese sauce & toppings', hot:true },
  { id:'s3', name:'Next Cola 1L',          cat:'sides',  price:120, img:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80', desc:'Chilled Next Cola 1 litre' },
  // DEALS
  { id:'d1', name:'Deal 1',                cat:'deals',  price:600,  img:'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80', desc:'2 Zinger Burgers + 2 Next Colas', includes:['2 Zinger Burgers','2 Next Colas'] },
  { id:'d2', name:'Deal 2',                cat:'deals',  price:420,  img:'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80', desc:'2 Zinger Twisters + 1 Plane Fries', includes:['2 Zinger Twisters','1 Plane Fries'] },
  { id:'d3', name:'Deal 3',                cat:'deals',  price:380,  img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', desc:'1 Zinger + 1 Fries + 1 Drink', includes:['1 Zinger Burger','1 Plane Fries','1 Drink'] },
  { id:'d4', name:'Deal 4',                cat:'deals',  price:480,  img:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80', desc:'2 Patty Burgers + 1L Cola', includes:['2 Patty Burgers','1L Next Cola'] },
  { id:'d5', name:'Deal 5',                cat:'deals',  price:550,  img:'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80', desc:'1 Zinger + 1 Shawarma + Half Drink', includes:['1 Zinger Burger','1 Shawarma','Half Drink'] },
  { id:'d6', name:'Family Deal',           cat:'deals',  price:1000, img:'https://images.unsplash.com/photo-1552895638-f7fe08d2f7d5?w=600&q=80', desc:'2 Patty + 2 Zingers + 1L Cola + Loaded Fries', includes:['2 Patty Burgers','2 Zingers','1L Cola','Loaded Fries'], bestseller:true },
  { id:'d7', name:'Mega Deal',             cat:'deals',  price:1250, img:'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=600&q=80', desc:'4 Zingers + 1L Cola + Loaded Fries', includes:['4 Zinger Burgers','1L Cola','Loaded Fries'] },
  { id:'d8', name:'Feast Deal',            cat:'deals',  price:1480, img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', desc:'5 Grill Burgers + 2 Loaded Fries + 1L Cola', includes:['5 Grill Burgers','2 Loaded Fries','1L Cola'] },
  { id:'d9', name:'Party Deal',            cat:'deals',  price:1500, img:'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80', desc:'6 Patty + 1L Cola + Loaded Fries', includes:['6 Patty Burgers','1L Cola','Loaded Fries'] },
  { id:'d10',name:'Legendary Deal',        cat:'deals',  price:2000, img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80', desc:'Ultimate party pack for a large group', includes:['2 Patty','2 Zingers','2 Grill','2 Loaded Fries','2L Cola'] },
];

// ─── CART — NEVER reinitializes on page load ───────────────
const CART_KEY = 'tp_cart_v4';
function getCart()    { try { return JSON.parse(localStorage.getItem(CART_KEY)||'[]'); } catch(e){ return []; } }
function saveCart(c)  { localStorage.setItem(CART_KEY, JSON.stringify(c)); }
function clearCart()  { localStorage.removeItem(CART_KEY); updateBadge(); }

function addToCart(item, qty) {
  qty = qty || 1;
  const cart = getCart();
  const idx  = cart.findIndex(c => c.id === item.id);
  if (idx >= 0) cart[idx].qty += qty;
  else cart.push({ id:item.id, name:item.name, price:item.price, img:item.img||'', cat:item.cat||'', qty });
  saveCart(cart);
  updateBadge();
  showToast(item.name + ' added to cart 🛒');
  flyToCart();
}

function removeFromCart(id) { saveCart(getCart().filter(c => c.id !== id)); updateBadge(); }

function updateCartQty(id, qty) {
  const cart = getCart();
  const idx  = cart.findIndex(c => c.id === id);
  if (idx >= 0) { if (qty <= 0) cart.splice(idx,1); else cart[idx].qty = qty; }
  saveCart(cart); updateBadge();
}

function updateBadge() {
  const total = getCart().reduce((s,c) => s+c.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = total);
  const f = document.getElementById('cart-float');
  if (f) f.classList.toggle('show', total > 0);
}

function flyToCart() {
  const cartIcon = document.getElementById('cart-float');
  if (!cartIcon || !window._lastClick) return;
  const dot = document.createElement('div');
  const cr  = cartIcon.getBoundingClientRect();
  dot.style.cssText = `position:fixed;width:12px;height:12px;background:var(--yellow);border-radius:50%;z-index:99999;pointer-events:none;left:${window._lastClick.x}px;top:${window._lastClick.y}px;transition:left .65s cubic-bezier(.2,1,.3,1),top .65s cubic-bezier(.2,1,.3,1),transform .65s,opacity .65s;`;
  document.body.appendChild(dot);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    dot.style.left    = (cr.left + cr.width/2)  + 'px';
    dot.style.top     = (cr.top  + cr.height/2) + 'px';
    dot.style.transform = 'scale(0)';
    dot.style.opacity   = '0';
  }));
  setTimeout(() => dot.remove(), 750);
}
document.addEventListener('click', e => { window._lastClick = { x: e.clientX, y: e.clientY }; }, true);

// ─── TOAST ─────────────────────────────────────────────────
function showToast(msg, type) {
  let t = document.getElementById('tp-toast');
  if (!t) {
    t = document.createElement('div'); t.id = 'tp-toast';
    t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%) translateY(20px);padding:12px 26px;border-radius:30px;font-weight:700;font-size:14px;z-index:999999;opacity:0;transition:all .3s;white-space:nowrap;pointer-events:none;';
    document.body.appendChild(t);
  }
  t.style.background = type==='error' ? '#ff4444' : 'var(--yellow)';
  t.style.color      = type==='error' ? '#fff'    : 'var(--black)';
  t.textContent = msg;
  t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(20px)'; }, 2600);
}

// ─── BACK4APP API HELPERS ──────────────────────────────────
async function b4aSave(className, data) {
  if (!window.Parse) return null;
  try {
    const Obj = new Parse.Object(className);
    Object.entries(data).forEach(([k,v]) => Obj.set(k,v));
    return await Obj.save();
  } catch(e) { console.warn('B4A save:', e); return null; }
}

async function b4aQuery(className, filters, limit) {
  if (!window.Parse) return [];
  try {
    const q = new Parse.Query(className);
    if (filters) Object.entries(filters).forEach(([k,v]) => q.equalTo(k,v));
    if (limit) q.limit(limit);
    q.descending('createdAt');
    return await q.find();
  } catch(e) { console.warn('B4A query:', e); return []; }
}

async function b4aUpdate(className, objectId, data) {
  if (!window.Parse) return null;
  try {
    const q = new Parse.Query(className);
    const obj = await q.get(objectId);
    Object.entries(data).forEach(([k,v]) => obj.set(k,v));
    return await obj.save();
  } catch(e) { console.warn('B4A update:', e); return null; }
}

async function b4aDelete(className, objectId) {
  if (!window.Parse) return;
  try {
    const q = new Parse.Query(className);
    const obj = await q.get(objectId);
    await obj.destroy();
  } catch(e) { console.warn('B4A delete:', e); }
}

async function b4aGoogleAuth() {
  if (!window.Parse) return null;
  try {
    const provider = new Parse.FacebookUtils;   // placeholder — use Google OAuth
    // Real Google: use Parse.User.logInWith('google', {...})
    const user = await Parse.User.logInWith('google', {
      authData: { /* Google token exchange handled by your OAuth flow */ }
    });
    return user;
  } catch(e) { console.warn('B4A auth:', e); return null; }
}

// ─── SETTINGS LOADER ───────────────────────────────────────
async function loadSettings() {
  // Try localStorage first (instant)
  const cached = localStorage.getItem('tp_settings');
  if (cached) applySettings(JSON.parse(cached));
  // Then fetch fresh from Back4App
  if (!window.Parse) return;
  try {
    const results = await b4aQuery('Settings', null, 1);
    if (results.length) {
      const s = results[0].toJSON();
      localStorage.setItem('tp_settings', JSON.stringify(s));
      applySettings(s);
    }
  } catch(e) {}
}

function applySettings(s) {
  if (!s) return;
  if (s.accentColor)    { document.documentElement.style.setProperty('--yellow', s.accentColor); }
  if (s.bgColor)        { document.documentElement.style.setProperty('--black',  s.bgColor); }
  if (s.cardRadius)     { document.documentElement.style.setProperty('--radius', s.cardRadius); }
  if (s.restaurantName) { document.querySelectorAll('.tp-brand').forEach(el => el.textContent = s.restaurantName); }
  if (s.tagline)        { document.querySelectorAll('.tp-tagline').forEach(el => el.textContent = s.tagline); }
  if (s.phone)          { document.querySelectorAll('.tp-phone').forEach(el => el.textContent = s.phone); }
  if (s.address)        { document.querySelectorAll('.tp-address').forEach(el => el.textContent = s.address); }
  if (s.logoEmoji)      { document.querySelectorAll('.tp-logo').forEach(el => el.textContent = s.logoEmoji); }
  if (s.maintenanceMode && !window.location.pathname.includes('admin')) {
    document.body.innerHTML = `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0a0a;text-align:center;padding:40px"><div><div style="font-size:64px;margin-bottom:16px">🔧</div><h1 style="font-family:sans-serif;font-size:32px;color:#f5c842;margin-bottom:12px">Under Maintenance</h1><p style="color:#888;font-size:16px">${s.maintenanceMsg||'We will be back shortly!'}</p></div></div>`;
  }
}

// ─── IMGBB UPLOAD ──────────────────────────────────────────
async function uploadToImgBB(file) {
  const fd = new FormData(); fd.append('image', file);
  const res  = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, { method:'POST', body:fd });
  const data = await res.json();
  if (data.success) return data.data.url;
  throw new Error('ImgBB failed');
}

// ─── PROMO VALIDATION ──────────────────────────────────────
async function validatePromo(code) {
  const now = Date.now();
  const builtin = { 'APP20':{ discount:.20, label:'20% App Discount' }, 'FIRSTORDER':{ discount:.20, label:'20% First Order' } };
  if (builtin[code]) return builtin[code];
  if (!window.Parse) return null;
  try {
    const q = new Parse.Query('PromoCodes'); q.equalTo('code', code);
    const r = await q.first();
    if (!r) return null;
    const d = r.toJSON();
    if (d.expiry && new Date(d.expiry).getTime() < now) return { expired:true, msg:'This promo code has expired' };
    if (d.usageLimit && (d.usageCount||0) >= d.usageLimit) return { expired:true, msg:'Usage limit reached' };
    return d;
  } catch(e) { return null; }
}

// ─── SCROLL ANIMATIONS ─────────────────────────────────────
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); }
    });
  }, { threshold:.08, rootMargin:'0px 0px -40px 0px' });
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-s').forEach(el => io.observe(el));
}

// ─── TILT ──────────────────────────────────────────────────
function initTilt() {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform=''; });
  });
}

// ─── CUSTOM CURSOR ─────────────────────────────────────────
function initCursor() {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  const el = document.createElement('div'); el.id='tp-cur';
  el.innerHTML='<div class="cur-d"></div><div class="cur-r"></div>';
  document.body.appendChild(el);
  let mx=0,my=0,cx=0,cy=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; el.style.opacity='1'; });
  (function a(){ cx+=(mx-cx)*.12; cy+=(my-cy)*.12; el.style.left=cx+'px'; el.style.top=cy+'px'; requestAnimationFrame(a); })();
  document.querySelectorAll('a,button,.menu-card,.deal-card').forEach(x => {
    x.addEventListener('mouseenter', () => el.classList.add('hover'));
    x.addEventListener('mouseleave', () => el.classList.remove('hover'));
  });
}

// ─── PARALLAX ──────────────────────────────────────────────
function initParallax() {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    document.querySelectorAll('[data-spd]').forEach(el => {
      el.style.transform = `translateY(${sy * parseFloat(el.dataset.spd)}px)`;
    });
  }, { passive:true });
  if (!window.matchMedia('(pointer:coarse)').matches) {
    document.addEventListener('mousemove', e => {
      const x=(e.clientX/window.innerWidth-.5)*2, y=(e.clientY/window.innerHeight-.5)*2;
      document.querySelectorAll('[data-mp]').forEach(el => {
        const d=parseFloat(el.dataset.mp)||.02;
        el.style.transform=`translate(${x*d*80}px,${y*d*80}px)`;
      });
    });
  }
}

// ─── COUNTERS ──────────────────────────────────────────────
function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = parseInt(e.target.dataset.count), suffix = e.target.dataset.suf||'';
      let s=null;
      (function step(ts){ if(!s)s=ts; const p=Math.min((ts-s)/2000,1); e.target.textContent=Math.floor((1-Math.pow(1-p,3))*target)+suffix; if(p<1)requestAnimationFrame(step); })(performance.now());
      io.unobserve(e.target);
    });
  }, { threshold:.5 });
  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
}

// ─── RIPPLE ────────────────────────────────────────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-p,.btn-s,.menu-card-add');
  if (!btn) return;
  const ripple = document.createElement('span');
  const r=btn.getBoundingClientRect(), size=Math.max(r.width,r.height);
  ripple.style.cssText=`position:absolute;border-radius:50%;background:rgba(255,255,255,.22);width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px;transform:scale(0);animation:ripple .6s linear;pointer-events:none;`;
  btn.style.position='relative'; btn.style.overflow='hidden';
  btn.appendChild(ripple); setTimeout(()=>ripple.remove(),700);
});

// ─── TYPING ANIMATION ──────────────────────────────────────
function initTyping(el, text, speed) {
  if (!el) return;
  el.textContent = '';
  let i = 0;
  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    const t = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) clearInterval(t);
    }, speed||50);
  });
  io.observe(el);
}

// ─── NAVBAR ────────────────────────────────────────────────
function initNav() {
  const nav=document.getElementById('navbar'); if(!nav) return;
  let ly=0;
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    nav.classList.toggle('scrolled',y>60);
    nav.classList.toggle('nav-hide',y>ly+10&&y>180);
    nav.classList.toggle('nav-show',y<ly-10);
    ly=y;
  },{passive:true});
  document.getElementById('nav-ham')?.addEventListener('click',()=>{
    document.getElementById('mobile-menu')?.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });
}
window.closeMenu=()=>{ document.getElementById('mobile-menu')?.classList.remove('open'); document.body.classList.remove('no-scroll'); };

// ─── PARTICLES ─────────────────────────────────────────────
function initParticles() {
  const c=document.getElementById('hero-particles'); if(!c) return;
  for(let i=0;i<30;i++){
    const p=document.createElement('div'); p.className='hero-p';
    p.style.cssText=`left:${Math.random()*100}%;animation-duration:${9+Math.random()*14}s;animation-delay:${Math.random()*20}s;width:${2+Math.random()*4}px;height:${2+Math.random()*4}px;`;
    c.appendChild(p);
  }
}

// ─── ITEM MODAL ────────────────────────────────────────────
let _mi=null,_mq=1;
window.openModal = function(id) {
  const item = MENU.find(m=>m.id===id); if(!item) return;
  _mi=item; _mq=1;
  document.getElementById('m-img').src   = item.img;
  document.getElementById('m-name').textContent  = item.name;
  document.getElementById('m-desc').textContent  = item.desc;
  document.getElementById('m-price').textContent = 'Rs. '+item.price;
  document.getElementById('m-qty').textContent   = 1;
  if(item.includes){ document.getElementById('m-includes').innerHTML='<strong>Includes:</strong><br/>'+item.includes.map(x=>`✦ ${x}`).join('<br/>'); document.getElementById('m-includes').style.display=''; }
  else document.getElementById('m-includes').style.display='none';
  document.getElementById('item-modal').classList.add('show');
  document.body.style.overflow='hidden';
};
window.closeModal = function() {
  document.getElementById('item-modal')?.classList.remove('show');
  document.body.style.overflow='';
};
window.mQty = function(d) {
  _mq=Math.max(1,_mq+d);
  document.getElementById('m-qty').textContent=_mq;
  if(_mi) document.getElementById('m-price').textContent='Rs. '+(_mi.price*_mq);
};
window.addModal = function() { if(_mi){ addToCart(_mi,_mq); closeModal(); } };
document.addEventListener('click', e=>{ if(e.target.id==='item-modal') closeModal(); if(e.target.id==='pwa-overlay') closePWA(); });

// ─── PWA ───────────────────────────────────────────────────
let _dip=null;
function initPWA() {
  window.addEventListener('beforeinstallprompt', e=>{ e.preventDefault(); _dip=e;
    setTimeout(()=>document.getElementById('pwa-banner')?.classList.add('show'),3000);
    if(!localStorage.getItem('tp_pwa')){ setTimeout(()=>{ document.getElementById('pwa-overlay')?.classList.add('show'); localStorage.setItem('tp_pwa','1'); },10000); }
  });
  document.getElementById('pwa-close')?.addEventListener('click',()=>document.getElementById('pwa-banner')?.classList.remove('show'));
  document.querySelectorAll('.pwa-btn').forEach(b=>b.addEventListener('click',doPWA));
  if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
}
async function doPWA() {
  if(_dip){ _dip.prompt(); const{outcome}=await _dip.userChoice; _dip=null;
    if(outcome==='accepted'){ showToast('App installed! 20% off applied 🎉'); document.getElementById('pwa-banner')?.classList.remove('show'); closePWA(); }
  } else { const m=document.getElementById('pwa-manual'); if(m) m.style.display='block'; document.getElementById('pwa-overlay')?.classList.add('show'); }
}
window.closePWA=()=>document.getElementById('pwa-overlay')?.classList.remove('show');

// ─── RENDER MENU ───────────────────────────────────────────
function renderMenu(cat) {
  cat=cat||'all';
  const grid=document.getElementById('menu-grid'); if(!grid) return;
  const items = cat==='all' ? MENU.filter(i=>i.cat!=='deals') : MENU.filter(i=>i.cat===cat);
  grid.innerHTML = items.map((item,i)=>`
    <div class="menu-card tilt reveal" style="transition-delay:${i*.04}s" onclick="openModal('${item.id}')">
      <div class="mc-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80'"/>
        <div class="mc-overlay"></div>
        ${item.hot?'<span class="mc-tag hot">🔥 Hot</span>':''}
        ${item.bestseller?'<span class="mc-tag best">⭐ Best</span>':''}
      </div>
      <div class="mc-body">
        <div class="mc-name">${item.name}</div>
        <div class="mc-desc">${item.desc}</div>
        <div class="mc-foot">
          <div class="mc-price">Rs. ${item.price}</div>
          <button class="mc-add" onclick="event.stopPropagation();addToCart({id:'${item.id}',name:'${item.name.replace(/'/g,"\\'")}',price:${item.price},img:'${item.img}',cat:'${item.cat}'},1)">+</button>
        </div>
      </div>
    </div>`).join('');
  initReveal(); setTimeout(initTilt,80);
}

function renderDeals() {
  const grid=document.getElementById('deals-grid'); if(!grid) return;
  grid.innerHTML = MENU.filter(i=>i.cat==='deals').map((d,i)=>`
    <div class="deal-card reveal" style="transition-delay:${i*.06}s" onclick="openModal('${d.id}')">
      <span class="deal-badge">🔥 DEAL</span>
      <div class="deal-img"><img src="${d.img}" alt="${d.name}" loading="lazy"/><div class="deal-img-ov"></div></div>
      <div class="deal-body">
        <div class="deal-name">${d.name}</div>
        <div class="deal-inc">${(d.includes||[]).map(x=>`<span>✦ ${x}</span>`).join('')}</div>
        <div class="deal-foot">
          <div class="deal-price">Rs. ${d.price}</div>
          <button class="btn-p" style="padding:9px 18px;font-size:13px" onclick="event.stopPropagation();addToCart({id:'${d.id}',name:'${d.name.replace(/'/g,"\\'")}',price:${d.price},img:'${d.img}',cat:'deals'},1)">Add</button>
        </div>
      </div>
    </div>`).join('');
  initReveal();
}

function initTabs() {
  document.querySelectorAll('.menu-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.menu-tab').forEach(t=>t.classList.remove('active')); tab.classList.add('active');
      const g=document.getElementById('menu-grid');
      g.style.cssText='opacity:0;transform:translateY(8px);transition:all .25s';
      setTimeout(()=>{ renderMenu(tab.dataset.cat); g.style.cssText='opacity:1;transform:translateY(0);transition:all .25s'; },240);
    });
  });
}

// ─── GLOBAL INIT ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  initParse();
  updateBadge();
  await loadSettings();
  initNav(); initParticles(); initReveal(); initParallax();
  initCounters(); initCursor(); initPWA();
  if(document.getElementById('menu-grid')){ renderMenu('all'); initTabs(); }
  if(document.getElementById('deals-grid')) renderDeals();
  setTimeout(initTilt,400);
});

// Export
window.TP = { getCart, addToCart, removeFromCart, updateCartQty, clearCart, saveCart, MENU, showToast, updateBadge, uploadToImgBB, validatePromo, b4aSave, b4aQuery, b4aUpdate, b4aDelete, applySettings };
