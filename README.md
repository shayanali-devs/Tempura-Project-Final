# 🥔 TEMPURA POTATO — Complete Restaurant Website System
## Premium Restaurant Website + Admin Panel + Rider System + PWA

---

## 📁 FILE MAP

```
/tempura-potato
├── index.html          → Main customer-facing website
├── checkout.html       → Order & checkout page
├── tracking.html       → Live order tracking
├── rider.html          → Rider PWA app
├── admin.html          → Hidden admin dashboard
├── rebranding.html     → Full visual rebranding tool
├── style.css           → Global premium styles
├── main.js             → Shared JS: cart, Back4App, effects
├── sw.js               → Service worker (offline/PWA)
├── manifest.json       → PWA manifest (customer app)
├── manifest-rider.json → PWA manifest (rider app)
└── README.md           → This file
```

---

## 🔐 DEFAULT PASSWORDS

| Panel | Default Password |
|---|---|
| Admin Panel (`admin.html`) | `admin123` |
| Developer Settings | `devpass2026` |

**⚠️ Change these immediately** after deploying via Admin → Dev Settings.

To access Admin: go to `yoursite.com/admin.html` (hidden from navigation)

---

## 🚀 BACK4APP SETUP (Step-by-Step)

Back4App is a Backend-as-a-Service built on Parse. It replaces Firebase for this project.

### Step 1 — Create Account
1. Go to **https://www.back4app.com/**
2. Click **Sign Up** → create a free account
3. Verify your email

### Step 2 — Create New App
1. Click **Build new app**
2. Enter app name: `tempura-potato`
3. Select **Parse API** (not GraphQL)
4. Click **Create**

### Step 3 — Get Your API Keys
1. Go to your app dashboard
2. Click **App Settings** → **Security & Keys**
3. Copy:
   - **Application ID**
   - **JavaScript Key**
   - **Server URL** (should be `https://parseapi.back4app.com/`)

### Step 4 — Add Keys to Code
Open `main.js` and replace the placeholders at the top:
```javascript
const B4A_APP_ID     = 'YOUR_BACK4APP_APP_ID';   // ← paste here
const B4A_JS_KEY     = 'YOUR_BACK4APP_JS_KEY';   // ← paste here
const B4A_SERVER_URL = 'https://parseapi.back4app.com/';
```

Or in the Admin Panel → Dev Settings → Back4App Config, enter your keys there.

### Step 5 — Create Database Classes
In your Back4App dashboard, go to **Database** → **Create a Class** and create these:

| Class Name | Purpose |
|---|---|
| `Orders` | All customer orders |
| `Riders` | Registered delivery riders |
| `PromoCodes` | Discount/promo codes |
| `Settings` | Website branding & config |
| `Reviews` | Customer reviews |
| `MenuItems` | Menu overrides from admin |

For each class, Back4App will auto-create `objectId`, `createdAt`, `updatedAt` columns.

### Step 6 — Set Class Permissions
For each class, go to **Security** → **Class Level Permissions** and set:
```
Orders:     Read: Public   Write: Public  (customers need to create orders)
Riders:     Read: Public   Write: Authenticated
Settings:   Read: Public   Write: Authenticated
PromoCodes: Read: Public   Write: Authenticated
Reviews:    Read: Public   Write: Public
MenuItems:  Read: Public   Write: Authenticated
```

### Step 7 — Enable Google OAuth (for customer login)
1. Go to **App Settings** → **Authentication**
2. Enable **Google** authentication
3. Add your Google OAuth Client ID
4. Add authorized domains: `your-cloudflare-domain.pages.dev`

### Step 8 — Test Connection
Open `admin.html`, log in, go to **Orders** and check the browser console for any errors.

---

## 🌐 DEPLOYMENT ON CLOUDFLARE PAGES

### Method A — GitHub (Recommended)
1. Create a **GitHub account** at github.com
2. Create a new repository called `tempura-potato`
3. Upload all project files to the repository
4. Go to **https://pages.cloudflare.com/**
5. Click **Create a project** → **Connect to Git** → select your repo
6. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
7. Click **Save and Deploy**
8. Your site is live at `yourproject.pages.dev`

### Method B — Direct Upload
1. Go to **Cloudflare Pages** dashboard
2. Click **Create a project** → **Direct Upload**
3. Upload all files as a ZIP or individually
4. Click **Deploy site**

### Custom Domain
1. In Cloudflare Pages → your project → **Custom Domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g. `tempurapotato.com`)
4. Follow DNS setup instructions

---

## 📲 PWA SETUP

PWA is automatic once deployed to HTTPS (Cloudflare does this automatically).

Users will see:
- **Install banner** after 3 seconds on the website
- **Install popup** after 10 seconds (first visit only)
- **Manual install guide** if auto-prompt doesn't work

Rider App PWA (`rider.html`) has its own separate manifest (`manifest-rider.json`).

---

## 🛵 RIDER SYSTEM

1. Go to **Admin Panel → Riders**
2. Fill in rider name, phone, vehicle info
3. Click **"Generate Code & Register"**
4. A **6-character code** is generated (e.g. `ABC123`)
5. Share this code with the rider via WhatsApp
6. Rider goes to `yoursite.com/rider.html`
7. Rider installs the PWA app
8. Rider enters the 6-digit code to sign in
9. Orders assigned to the rider appear in the Rider Dashboard

---

## 🛒 ORDER FLOW

```
Customer adds items
        ↓
Checkout (fills name, phone, address)
        ↓
Place Order → Back4App OR WhatsApp
        ↓
Admin Panel receives ALERT SOUND + popup
        ↓
Admin clicks Accept → status = "accepted"
        ↓
Admin clicks Preparing → status = "preparing"
        ↓
Admin assigns rider → status = "onway"
        ↓
Rider sees order in Rider App
        ↓
Rider marks delivered → status = "delivered"
        ↓
Customer tracking page updates LIVE
```

---

## 🎨 REBRANDING

### Quick Changes (Admin Panel → Branding)
- Accent color (default: yellow)
- Background color
- Restaurant name, tagline, phone
- Logo emoji
- WhatsApp number
- Hero images (via ImgBB upload)

### Full Rebranding (Admin Panel → Dev Settings → Rebranding Tool)
Or go directly to `yoursite.com/rebranding.html`
- Fonts
- Card styles
- Button shapes
- Hero content
- Custom CSS injection
- Export config as JSON

---

## 🔧 MONTHLY MAINTENANCE (Billing Guide)

These items need monthly attention — use this for maintenance billing:

| Item | Frequency | Notes |
|---|---|---|
| Promo code renewal | Monthly | Old codes expire, new ones needed |
| Menu price review | Monthly | Keep prices competitive |
| SSL certificate | Yearly | Auto-renewed by Cloudflare |
| Domain renewal | Yearly | Prevent website going offline |
| Social media update | Weekly | Instagram/Facebook posts |
| Back4App usage review | Monthly | Monitor free tier limits |
| Security audit | Monthly | Check for unauthorized access |
| Performance check | Monthly | Page speed, image optimization |

Track all of these in **Admin Panel → Maintenance**.

---

## 💰 PROMO CODE SYSTEM

Create promo codes in **Admin Panel → Promo Codes**:
- Set discount % (e.g. 20%)
- Set expiry date (auto-expires)
- Set usage limit (prevents overuse)
- Set minimum order amount

Built-in codes that always work:
- `APP20` → 20% off (for app users)
- `FIRSTORDER` → 20% off (for new customers)

---

## 📞 CONTACT INFO IN FILES

```
WhatsApp: +923044888775
Phone:    +92-3044888775  
Address:  Main Bazar Nishat Colony, Milad Chock, Lahore
```

Change these in:
1. `admin.html` → Branding → Order Settings
2. `main.js` → top of file (WA_NUM variable in checkout.html)

---

## ✅ COMPLETE FEATURE CHECKLIST

**Frontend**
- [x] Homepage with auto-sliding hero (4 images)
- [x] Parallax effects (10+ effects)
- [x] Food items scrolling in from left/right
- [x] Real food images (Unsplash CDN)
- [x] Menu with tabs (Burgers, Wraps, Sides)
- [x] Deals section with real images
- [x] Auto-scrolling reviews ticker
- [x] User-submitted reviews with star rating
- [x] Team/staff section (5 cards)
- [x] Typing animation (Our Story section)
- [x] Developer ad section (Syed Ali, 0309-6447-7921)
- [x] Stats bar with animated counters
- [x] Marquee ticker
- [x] Custom cursor (desktop)
- [x] 3D card tilt effect
- [x] Ripple click effects
- [x] Scroll reveal animations
- [x] Mouse parallax depth effect
- [x] Glassmorphism elements
- [x] SEO meta tags

**Cart & Ordering**
- [x] Persistent cart (localStorage — never resets on page load)
- [x] Cart float button with item count
- [x] Fly-to-cart animation
- [x] Item modal with quantity selector
- [x] Checkout with Google Sign-In (20% off)
- [x] Promo code system with expiry
- [x] Free delivery above Rs. 1200
- [x] Live GPS location sharing
- [x] Place Order → Back4App
- [x] WhatsApp order option (saves to Back4App too)
- [x] Live order tracking (4 stages)

**Admin Panel**
- [x] Password-protected login
- [x] Dashboard with live stats
- [x] Analytics with 4 charts (Chart.js)
- [x] Orders table with filter, export CSV
- [x] ALERT SOUND for new orders
- [x] Accept/Decline/Status update
- [x] Assign rider to order
- [x] Live location link per order
- [x] Menu manager (add/remove/edit/toggle)
- [x] Image upload via ImgBB
- [x] Promo code creator with expiry
- [x] Rider registration + 6-digit codes
- [x] Review moderation
- [x] Full branding controls
- [x] SEO settings
- [x] Opening hours
- [x] Maintenance mode toggle
- [x] Monthly maintenance tracker
- [x] Dev Settings (double password)
- [x] Full rebranding tool (separate page)
- [x] Custom CSS injection
- [x] Delivery zones
- [x] Loyalty program settings
- [x] Error console
- [x] Danger zone (clear orders/riders/settings)

**Rider System**
- [x] Rider PWA app (installable)
- [x] 6-digit code login
- [x] Online/Offline toggle
- [x] Assigned orders dashboard
- [x] LOUD alert sound for new orders
- [x] Accept/Start Delivery/Delivered buttons
- [x] Call customer button
- [x] Navigate button (Google Maps)
- [x] Manual PWA install tutorial

**PWA**
- [x] Installable on Android and iOS
- [x] Offline support (Service Worker)
- [x] Install banner (3s delay)
- [x] Install popup (10s delay, first visit)
- [x] 20% off incentive for install
- [x] App shortcuts (Order, Menu, Deals)
- [x] Push notification support
- [x] Separate rider PWA manifest

---

## 🆘 TROUBLESHOOTING

**Cart empty on checkout?**
→ Make sure you're using `main.js` v4 (CART_KEY = 'tp_cart_v4'). Old versions used different keys.

**Back4App not connecting?**
→ Check your App ID and JS Key in `main.js`. Make sure Class Permissions allow Public Write for Orders.

**PWA install not showing?**
→ The site must be on HTTPS. Cloudflare handles this automatically.

**Admin alert sound not playing?**
→ Browsers block autoplay audio. Click anywhere on the admin page first to enable audio.

**Rider not receiving orders?**
→ Make sure admin assigned the rider's code to the order in the Orders panel.

---

*Built by Syed Ali — 0309-6447-7921*
*For premium web solutions for your business, get in touch!*
