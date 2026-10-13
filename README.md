# Indo Vision Opticals - Official Web Application

> **Haute Optique** - Inspired by Vision Express India  
> Designed & Generated using **Stitch** (`projects/18072651119797419022`) & Antigravity  

---

## 🏢 Business Information
- **Store Name:** Indo Vision Opticals (Indo Opticals)
- **Role:** Optical Wholesaler & Premium Retail Store
- **Google Rating:** ⭐ **5.0 / 5.0** (Top Rated in Dilsukhnagar, Hyderabad)
- **Timings:** Opens 10:00 AM · Closed / Open indicator dynamically synced with Hyderabad local time (10:00 AM – 9:30 PM, Monday - Sunday)
- **Address:** Shop.No 16-11-477/6/A/1, Dilsuknagar, Hyderabad, opp. Ideal Clg, Hyderabad, Telangana 500060
- **Direct Phone Numbers:** 
  - `+91 8121561799`
  - `+91 8919019679`

---

## ✨ Features & Architecture

### 1. Navigation & Header (Vision Express Signature Magenta `#8a005d`)
- **Top Announcement Bar:** Clinical Eye Test booking alert, dynamic open/closed status badge for Hyderabad, direct phone hotlines.
- **Brand Identity:** Official emblem and typography generated via **Stitch** design system.
- **Multi-Level Menus:** Dropdown menus for Eyeglasses, Sunglasses, Lenses, Wholesale Portal, Book Eye Test, and Virtual Try-On.
- **Pill Search Bar:** Real-time auto-suggest search across all eyewear categories.
- **Header Actions:** Quick Store Locator, Wishlist with live counter badge, and Shopping Cart drawer.

### 2. Hero Editorial Slider
- High fashion eyewear imagery featuring models wearing luxury frames.
- Instant CTA buttons: *Explore Eyewear*, *Try Frames Live*, *Wholesale B2B Inquiry*.

### 3. Trust & Clinical Badges Bar (Vision Express 6-Pillar Card)
- 14-Step Precision Eye Test
- Certified Optometrists
- Optical Wholesaler (Direct Factory Rates)
- 5.0 Star Rated Store
- 100% Genuine Lenses (Essilor / Crizal / IndoLab Certified)
- Same-Day Fitting & Fast Lab Glazing

### 4. Shop By Category
- Category cards matching Vision Express layout:
  - **Eyeglasses** (Starting at ₹499/-)
  - **Sunglasses** (Starting at ₹1,499/-)
  - **Computer Glasses** (Starting at ₹999/-)
  - **Contact Lenses** (Starting at ₹1,099/-)
  - **Reading Glasses** (Starting at ₹499/-)
  - **Wholesale Bulk Packs** (Starting at ₹210/pc)

### 5. Interactive 60-Second Lens Recommendation Wizard
- 3-Step quiz evaluating user lifestyle, screen time, and vision power.
- Automatic prescription lens matching (*Indo BlueShield 1.60 Hi-Index*) with 1-click add to cart.

### 6. Curated Product Catalog & Quick View
- Interactive filter tabs (All Styles, Eyeglasses, Sunglasses, Computer Glasses, Reading Specs, Wholesale Lots).
- Product cards with discount tags, frame dimensions (e.g. `52-18-142`), rating, and color materials.
- **Quick View Modal:** Full frame specifications, lens type selector, and material breakdown.

### 7. 3D Virtual Try-On (VTO) Interactive Studio
- Toggle between female and male face models.
- Choose any frame to overlay onto the model face in real time.
- Size/scale and vertical offset adjustment sliders for exact face fit preview.

### 8. B2B Wholesale Portal & Tiered Pricing Calculator
- Designed specifically for **Indo Vision Opticals** as an Optical Wholesaler supplying 200+ retailers in Telangana & Andhra Pradesh.
- Interactive quantity slider (10 to 500 pcs) with dynamic pricing calculation:
  - Tier 1 (10-49 pcs): ₹350/pc (45% discount)
  - Tier 2 (50-199 pcs): ₹280/pc (58% discount)
  - Tier 3 (200+ pcs): ₹210/pc (68% discount + Free custom clinic logo etching)
- Live calculation of GST (12%), Total Investment, and Retail Profit Margin (up to 320%).
- One-click WhatsApp B2B quotation generator direct to `+91 8121561799`.

### 9. Free 14-Step Clinical Eye Test Appointment Scheduler
- Japanese computerized autorefractor diagnostic workflow.
- In-store Dilsukhnagar clinic visit or home eye exam booking in Hyderabad.
- Instant validation and appointment confirmation modal with booking ID.

### 10. Flagship Store Locator & Google Maps
- Full address and landmark details (Opposite Ideal College, Dilsukhnagar).
- Embedded Google Map view.
- Click-to-call and Google Maps directions links.

### 11. Shopping Bag Slide-Over Drawer & Checkout Flow
- Slide-in cart drawer with free delivery progress meter (Free shipping over ₹999).
- Promo coupon code applicator (`INDO50` for 50% discount, `VISION100` for ₹100 off).
- Multi-step checkout modal with address details, payment method (UPI, COD, Card, GST B2B), and instant order receipt modal.

---

## 🚀 How to Run Locally
The site runs on any standard web server. A lightweight server is currently running on:
```
http://localhost:3000/
```

To run manually using Node.js:
```powershell
node -e "const http=require('http'),fs=require('fs'),path=require('path');const m={'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png'};http.createServer((q,s)=>{let p=q.url.split('?')[0];if(p==='/')p='/index.html';let f=path.join(process.cwd(),p);fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);return s.end('Not Found')}s.writeHead(200,{'Content-Type':m[path.extname(f)]||'text/plain'});s.end(d)})}).listen(3000,()=>console.log('http://localhost:3000'));"
```
Or open [index.html](file:///c:/Projects/IndoVisionOpticals/index.html) directly in any modern browser!
