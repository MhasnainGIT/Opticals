/**
 * INDO VISION OPTICALS — Application Engine
 * Optical Wholesaler & Retail Flagship — Dilsukhnagar, Hyderabad
 */

// Application State
const state = {
  cart: [],
  wishlist: [],
  activeCategory: 'all',
  currentSlide: 0,
  appliedCoupon: null,
  vto: {
    model: 'female',
    frame: 'assets/cat-eyeglasses.jpg',
    scale: 1,
    offsetY: 0
  }
};

// Eyewear Product Catalog
const products = [
  {
    id: 1,
    name: 'Indo Monarch Crystal Square',
    category: 'eyeglasses',
    price: 899,
    mrp: 1999,
    rating: 5.0,
    reviews: 24,
    badge: 'Bestseller',
    badgeClass: 'flag-bestseller',
    material: 'Handcrafted Acetate (Clear Grey)',
    dimensions: '52-18-142',
    image: 'assets/cat-eyeglasses.jpg',
    description: 'Ultra-lightweight crystal acetate frame engineered for daily digital screen comfort with scratch-resistant blue cut lenses.'
  },
  {
    id: 2,
    name: 'Aura Gold Polarized Aviator',
    category: 'sunglasses',
    price: 1899,
    mrp: 3999,
    rating: 5.0,
    reviews: 42,
    badge: '52% OFF',
    badgeClass: 'flag-discount',
    material: 'Monel Metal & 24K Gold Polish',
    dimensions: '58-14-140',
    image: 'assets/cat-sunglasses.jpg',
    description: 'Iconic teardrop aviator frame with UV400 polarized amber gradient lenses. Cuts blinding road glare and eye strain.'
  },
  {
    id: 3,
    name: 'Optix BlueShield Digital Specs',
    category: 'computer',
    price: 999,
    mrp: 2299,
    rating: 5.0,
    reviews: 31,
    badge: 'Screen Guard',
    badgeClass: 'flag-new',
    material: 'TR90 Swiss Memory Polymer',
    dimensions: '50-19-145',
    image: 'assets/cat-computer.jpg',
    description: 'Certified 98% blue light filtering lenses designed specifically for IT professionals, software engineers, and gamers.'
  },
  {
    id: 4,
    name: 'Indo Executive Titanium Rimless',
    category: 'eyeglasses',
    price: 2499,
    mrp: 4999,
    rating: 5.0,
    reviews: 19,
    badge: 'Luxury',
    badgeClass: 'flag-bestseller',
    material: 'Pure Grade-5 Aerospace Titanium',
    dimensions: '53-17-140',
    image: 'assets/product-glasses.jpg',
    description: 'Featherweight 8-gram rimless architectural design for business executives. Hypoallergenic and highly durable.'
  },
  {
    id: 5,
    name: 'Vogue Retro Rounded Sunnies',
    category: 'sunglasses',
    price: 1499,
    mrp: 2999,
    rating: 5.0,
    reviews: 28,
    badge: 'Trending',
    badgeClass: 'flag-new',
    material: 'Gloss Tortoiseshell Acetate',
    dimensions: '49-21-145',
    image: 'assets/product-sunglasses.jpg',
    description: 'Chic vintage round silhouette with high-contrast grey tinted lenses. A favorite fashion statement for daytime wear.'
  },
  {
    id: 6,
    name: 'Indo Pro B2B Bulk Lot (20 Frames)',
    category: 'wholesale',
    price: 5600,
    mrp: 14000,
    rating: 5.0,
    reviews: 12,
    badge: 'Wholesale Lot',
    badgeClass: 'flag-wholesale',
    material: 'Mixed TR90 & Metallic Assorted Lot',
    dimensions: 'Assorted Unisex Sizes',
    image: 'assets/cat-eyeglasses.jpg',
    description: 'Wholesale package of 20 fast-moving optical frames for retail stores and clinics. ₹280/pc net wholesale price with GST bill.'
  },
  {
    id: 7,
    name: 'Precision Reading Glasses (+1.0 to +3.5)',
    category: 'reading',
    price: 499,
    mrp: 999,
    rating: 5.0,
    reviews: 35,
    badge: '50% OFF',
    badgeClass: 'flag-discount',
    material: 'Flexible Polycarbonate Frame',
    dimensions: '51-16-138',
    image: 'assets/cat-reading.jpg',
    description: 'Crystal-clear anti-fatigue magnification lenses for effortless book reading, smartphone viewing, and close-up detail work.'
  },
  {
    id: 8,
    name: 'AquaSoft Hydrogel Monthly Contacts (6 Pack)',
    category: 'contact',
    price: 1099,
    mrp: 1899,
    rating: 5.0,
    reviews: 48,
    badge: 'Best Seller',
    badgeClass: 'flag-bestseller',
    material: '58% Water Content Bio-Silicone',
    dimensions: 'BC 8.6 / Dia 14.2mm',
    image: 'assets/cat-contact-lens.jpg',
    description: 'High-oxygen permeability contact lenses with moisture-lock matrix for 16-hour uninterrupted hydration.'
  }
];

// Document Initialization
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  renderProducts('all');
  initFilterTabs();
  initVTO();
  initWholesaleCalculator();
  initStoreStatus();
  initSearch();
  initBookingForm();
  loadCartFromStorage();
});

/* ==========================================================================
   Hero Slider Controls
   ========================================================================== */
let heroTimer = null;

function initHeroSlider() {
  setHeroSlide(0);
  startHeroTimer();

  const heroSec = document.querySelector('.hero-slider-section');
  if (heroSec) {
    heroSec.addEventListener('mouseenter', () => clearInterval(heroTimer));
    heroSec.addEventListener('mouseleave', startHeroTimer);
  }
}

function startHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(nextHeroSlide, 6000);
}

function setHeroSlide(index) {
  const slides = document.querySelectorAll('.hero-slide-pane');
  const dots = document.querySelectorAll('.hero-pagination-dot');
  if (!slides.length) return;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  state.currentSlide = index;
}

function nextHeroSlide() {
  const slides = document.querySelectorAll('.hero-slide-pane');
  if (!slides.length) return;
  const next = (state.currentSlide + 1) % slides.length;
  setHeroSlide(next);
}

function prevHeroSlide() {
  const slides = document.querySelectorAll('.hero-slide-pane');
  if (!slides.length) return;
  const prev = (state.currentSlide - 1 + slides.length) % slides.length;
  setHeroSlide(prev);
}

/* ==========================================================================
   Product Rendering & Filters
   ========================================================================== */
function renderProducts(category = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = category === 'all' 
    ? products 
    : products.filter(p => p.category === category);

  grid.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    return `
      <div class="product-card-unit" data-id="${product.id}">
        <span class="product-badge-flag ${product.badgeClass}">${product.badge}</span>
        
        <button class="product-wishlist-toggle ${isWishlisted ? 'active' : ''}" 
                onclick="toggleWishlist(${product.id}, event)" 
                title="Save to Wishlist">
          <span class="svg-icon" style="width: 17px; height: 17px;">
            <svg viewBox="0 0 24 24" fill="${isWishlisted ? '#e11d48' : 'none'}" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </span>
        </button>

        <div class="product-display-frame" onclick="openQuickView(${product.id})">
          <img src="${product.image}" alt="${product.name}" loading="lazy"/>
          <button class="quick-preview-hover-btn">
            Quick View & Specs
          </button>
        </div>

        <div class="product-content-body">
          <div class="product-meta-header">
            <span class="product-rating-score">
              <span class="svg-icon" style="width: 11px; height: 11px; color: #f59e0b;">
                <svg viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </span>
              5.0 (${product.reviews})
            </span>
            <span>${product.dimensions}</span>
          </div>

          <h4 class="product-item-title" onclick="openQuickView(${product.id})">${product.name}</h4>
          <p class="product-material-sub">${product.material}</p>
          
          <div class="product-price-breakup">
            <span class="price-active">₹${product.price.toLocaleString('en-IN')}</span>
            <span class="price-strikethrough">₹${product.mrp.toLocaleString('en-IN')}</span>
            <span class="price-savings-chip">${Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function initFilterTabs() {
  const tabs = document.querySelectorAll('.catalog-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-filter');
      state.activeCategory = category;
      renderProducts(category);
    });
  });
}

function filterCategoryFromCard(category) {
  const tabs = document.querySelectorAll('.catalog-tab-btn');
  tabs.forEach(t => {
    if (t.getAttribute('data-filter') === category) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
  renderProducts(category);
  const target = document.getElementById('featuredCollection');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================================================
   Quick View Modal
   ========================================================================== */
function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const modalBody = document.getElementById('quickViewModalBody');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.15fr; gap: 24px; align-items: center;">
      <div style="background: #fbf9fb; border-radius: 12px; padding: 20px; text-align: center;">
        <img src="${product.image}" alt="${product.name}" style="max-height: 220px; margin: 0 auto; object-fit: contain;"/>
      </div>
      <div>
        <span class="product-badge-flag ${product.badgeClass}" style="position: static; display: inline-block; margin-bottom: 8px;">${product.badge}</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.55rem; margin-bottom: 6px; color: var(--text-main);">${product.name}</h3>
        <p style="color: #f59e0b; font-weight: 700; font-size: 0.86rem; margin-bottom: 12px;">★ 5.0 (2 Verified Reviews • Dilsukhnagar)</p>
        
        <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 14px;">
          <span style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">₹${product.price.toLocaleString('en-IN')}</span>
          <span style="color: var(--text-muted); text-decoration: line-through;">₹${product.mrp.toLocaleString('en-IN')}</span>
          <span style="color: var(--success); font-weight: 700;">Save ₹${(product.mrp - product.price).toLocaleString('en-IN')}</span>
        </div>

        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 14px; line-height: 1.5;">${product.description}</p>
        
        <div style="background: var(--primary-surface); padding: 12px 14px; border-radius: 8px; margin-bottom: 18px; font-size: 0.8rem;">
          <p><strong>Frame Material:</strong> ${product.material}</p>
          <p><strong>Dimensions:</strong> ${product.dimensions} (Medium Fit)</p>
          <p><strong>Wholesale Status:</strong> Ready Stock at Dilsukhnagar Hub</p>
        </div>
      </div>
    </div>
  `;

  openModal('quickViewModal');
}

/* ==========================================================================
   Shopping Bag & Checkout Flow
   ========================================================================== */
function addToCart(productId, event) {
  if (event) event.stopPropagation();

  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`Added "${product.name}" to your bag.`);
  openCartDrawer();
}

function updateCartQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== productId);
  }

  saveCartToStorage();
  updateCartUI();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCartToStorage();
  updateCartUI();
  showToast('Item removed from bag.');
}

function updateCartUI() {
  const countBadge = document.getElementById('cartCountBadge');
  const bottomBadge = document.getElementById('bottomTabCartCount');
  const itemsContainer = document.getElementById('cartDrawerItems');
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountEl = document.getElementById('cartDiscount');
  const shippingEl = document.getElementById('cartShipping');
  const totalEl = document.getElementById('cartGrandTotal');
  const progressText = document.getElementById('shippingProgressText');
  const progressBar = document.getElementById('shippingProgressBar');

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countBadge) countBadge.textContent = totalItems;
  if (bottomBadge) bottomBadge.textContent = totalItems;

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeThreshold = 999;
  const shipping = subtotal >= freeThreshold || subtotal === 0 ? 0 : 99;

  let discount = 0;
  if (state.appliedCoupon === 'INDO50') {
    discount = Math.round(subtotal * 0.5);
  } else if (state.appliedCoupon === 'VISION100') {
    discount = Math.min(100, subtotal);
  }

  const grandTotal = Math.max(0, subtotal - discount + shipping);

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (discountEl) discountEl.textContent = `-₹${discount.toLocaleString('en-IN')}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  if (totalEl) totalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

  if (progressText && progressBar) {
    if (subtotal >= freeThreshold && subtotal > 0) {
      progressText.innerHTML = '<strong>Unlocked!</strong> You qualify for FREE Express Delivery.';
      progressBar.style.width = '100%';
    } else {
      const remaining = Math.max(0, freeThreshold - subtotal);
      const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
      progressText.innerHTML = `Add <strong>₹${remaining.toLocaleString('en-IN')}</strong> more for FREE Delivery.`;
      progressBar.style.width = `${pct}%`;
    }
  }

  if (!itemsContainer) return;

  if (state.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; color: var(--text-muted);">
        <span class="svg-icon" style="width: 44px; height: 44px; margin-bottom: 14px; color: var(--border-medium);">
          <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        </span>
        <h5 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 6px;">Your Bag is Empty</h5>
        <p style="font-size: 0.84rem; margin-bottom: 18px;">Discover our wholesale lots and designer frames.</p>
        <button class="btn btn-primary btn-sm" onclick="closeCartDrawer();">Explore Collections</button>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = state.cart.map(item => `
    <div style="display: flex; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--border-subtle);">
      <img src="${item.image}" alt="${item.name}" style="width: 68px; height: 68px; border-radius: 8px; background: #fbf9fb; object-fit: contain;"/>
      <div style="flex: 1;">
        <h5 style="font-size: 0.9rem; font-weight: 600; color: var(--text-main); margin-bottom: 2px;">${item.name}</h5>
        <p style="font-size: 0.92rem; font-weight: 700; color: var(--primary); margin-bottom: 8px;">
          ₹${item.price.toLocaleString('en-IN')}
          <span style="font-size: 0.74rem; color: var(--text-muted); text-decoration: line-through; font-weight: 400;">₹${item.mrp.toLocaleString('en-IN')}</span>
        </p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border-medium); display: flex; align-items: center; justify-content: center; font-weight: 700;" onclick="updateCartQty(${item.id}, -1)">-</button>
            <span style="font-weight: 600; font-size: 0.88rem;">${item.quantity}</span>
            <button style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border-medium); display: flex; align-items: center; justify-content: center; font-weight: 700;" onclick="updateCartQty(${item.id}, 1)">+</button>
          </div>
          <button style="color: #dc2626; font-size: 0.78rem; font-weight: 600;" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

function applyPromoCoupon() {
  const input = document.getElementById('couponCodeInput');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (code === 'INDO50') {
    state.appliedCoupon = 'INDO50';
    showToast('Promo Code INDO50 applied! 50% discount unlocked.');
    updateCartUI();
  } else if (code === 'VISION100') {
    state.appliedCoupon = 'VISION100';
    showToast('Promo Code VISION100 applied! ₹100 discount applied.');
    updateCartUI();
  } else {
    showToast('Invalid promo code. Try INDO50 or VISION100.');
  }
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.add('active');
    backdrop.classList.add('active');
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
  }
}

function triggerCheckout() {
  if (state.cart.length === 0) {
    showToast('Your bag is empty. Add products to proceed.');
    return;
  }
  closeCartDrawer();
  openModal('checkoutModal');
}

function completeCheckoutOrder(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.customerName.value;
  const phone = form.customerPhone.value;
  const address = form.customerAddress.value;
  const payment = form.paymentMethod.value;

  const orderId = 'IVO-HYD-' + Math.floor(100000 + Math.random() * 900000);
  closeAllModals();

  const receiptBody = document.getElementById('orderReceiptBody');
  if (receiptBody) {
    receiptBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 22px;">
        <span class="svg-icon" style="width: 52px; height: 52px; color: var(--success); margin-bottom: 10px;">
          <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </span>
        <h3 style="font-family: var(--font-serif); font-size: 1.7rem; color: var(--success);">Order Confirmed</h3>
        <p style="color: var(--text-secondary); font-size: 0.88rem;">Thank you, <strong>${name}</strong>. Your order is registered with Indo Vision Opticals.</p>
        <p style="background: var(--primary-surface); padding: 8px 14px; border-radius: 6px; display: inline-block; font-weight: 700; color: var(--primary); margin-top: 10px; font-size: 0.85rem;">Order Reference: ${orderId}</p>
      </div>

      <div style="background: #fbf9fb; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; font-size: 0.85rem; margin-bottom: 18px;">
        <p><strong>Shipping Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Payment Mode:</strong> ${payment.toUpperCase()}</p>
        <p><strong>Fulfillment Hub:</strong> Dilsukhnagar Flagship Warehouse, Hyderabad</p>
      </div>

      <div style="text-align: center;">
        <a class="btn btn-primary" href="https://wa.me/918121561799?text=Hello%20Indo%20Vision%20Opticals,%20I%20placed%20order%20${orderId}%20for%20delivery%20in%20Hyderabad." target="_blank">
          Track via WhatsApp Support
        </a>
      </div>
    `;
    openModal('orderReceiptModal');
  }

  state.cart = [];
  saveCartToStorage();
  updateCartUI();
}

function saveCartToStorage() {
  localStorage.setItem('ivo_cart', JSON.stringify(state.cart));
}

function loadCartFromStorage() {
  const saved = localStorage.getItem('ivo_cart');
  if (saved) {
    try {
      state.cart = JSON.parse(saved);
      updateCartUI();
    } catch(e) {}
  }
}

/* ==========================================================================
   Wishlist
   ========================================================================== */
function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();

  const idx = state.wishlist.indexOf(productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast('Removed from wishlist.');
  } else {
    state.wishlist.push(productId);
    showToast('Saved to your wishlist.');
  }

  const badge = document.getElementById('wishlistCountBadge');
  if (badge) badge.textContent = state.wishlist.length;

  renderProducts(state.activeCategory);
}

/* ==========================================================================
   Virtual Try-On
   ========================================================================== */
function initVTO() {
  const scaleSlider = document.getElementById('vtoScale');
  const offsetSlider = document.getElementById('vtoOffset');

  if (scaleSlider) {
    scaleSlider.addEventListener('input', (e) => {
      state.vto.scale = parseFloat(e.target.value);
      applyVTOTransform();
    });
  }

  if (offsetSlider) {
    offsetSlider.addEventListener('input', (e) => {
      state.vto.offsetY = parseInt(e.target.value);
      applyVTOTransform();
    });
  }
}

function selectVTOModel(gender) {
  state.vto.model = gender;
  const img = document.getElementById('vtoFaceImg');
  const femaleBtn = document.getElementById('btnModelFemale');
  const maleBtn = document.getElementById('btnModelMale');

  if (gender === 'female') {
    if (img) img.src = 'assets/vto-model-female.jpg';
    if (femaleBtn) femaleBtn.classList.add('active');
    if (maleBtn) maleBtn.classList.remove('active');
  } else {
    if (img) img.src = 'assets/vto-model-male.jpg';
    if (maleBtn) maleBtn.classList.add('active');
    if (femaleBtn) femaleBtn.classList.remove('active');
  }
}

function selectVTOFrame(frameSrc, event) {
  state.vto.frame = frameSrc;
  const overlayImg = document.getElementById('vtoOverlayImg');
  if (overlayImg) overlayImg.src = frameSrc;

  document.querySelectorAll('.vto-frame-thumbnail-box').forEach(c => c.classList.remove('active'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
  showToast('Frame fitted on model.');
}

function tryInVTO(frameSrc) {
  selectVTOFrame(frameSrc);
  const vtoSection = document.getElementById('virtualTryOn');
  if (vtoSection) {
    vtoSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function applyVTOTransform() {
  const overlay = document.getElementById('vtoGlassesOverlay');
  if (overlay) {
    const scale = state.vto.scale;
    const topPercent = 36 + (state.vto.offsetY * 0.1);
    overlay.style.top = `${topPercent}%`;
    overlay.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
}

/* ==========================================================================
   Lens Wizard Quiz (Clean Vector Icons, No Emojis)
   ========================================================================== */
const quizState = { step: 1, answers: {} };

function openQuizModal() {
  quizState.step = 1;
  quizState.answers = {};
  renderQuizStep();
  openModal('quizModal');
}

function answerQuiz(key, value) {
  quizState.answers[key] = value;
  quizState.step += 1;
  renderQuizStep();
}

function renderQuizStep() {
  const container = document.getElementById('quizModalBody');
  if (!container) return;

  if (quizState.step === 1) {
    container.innerHTML = `
      <div style="text-align: center;">
        <span style="font-size: 0.76rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.08em;">Step 1 of 3</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.55rem; margin: 8px 0 20px;">Who are these spectacles for?</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
          <div class="category-vitrine-card" style="min-height: 180px; text-align: center; justify-content: center;" onclick="answerQuiz('user', 'Myself')">
            <span class="svg-icon" style="width: 32px; height: 32px; margin: 0 auto 10px; color: var(--primary);">
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </span>
            <h5 style="font-size: 0.95rem; font-weight: 700;">For Myself</h5>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Personal Vision</p>
          </div>
          <div class="category-vitrine-card" style="min-height: 180px; text-align: center; justify-content: center;" onclick="answerQuiz('user', 'Family')">
            <span class="svg-icon" style="width: 32px; height: 32px; margin: 0 auto 10px; color: var(--primary);">
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </span>
            <h5 style="font-size: 0.95rem; font-weight: 700;">Family Member</h5>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Child or Parent</p>
          </div>
          <div class="category-vitrine-card" style="min-height: 180px; text-align: center; justify-content: center;" onclick="answerQuiz('user', 'Wholesale')">
            <span class="svg-icon" style="width: 32px; height: 32px; margin: 0 auto 10px; color: var(--primary);">
              <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </span>
            <h5 style="font-size: 0.95rem; font-weight: 700;">Wholesale Store</h5>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Bulk Optical Lots</p>
          </div>
        </div>
      </div>
    `;
  } else if (quizState.step === 2) {
    container.innerHTML = `
      <div style="text-align: center;">
        <span style="font-size: 0.76rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.08em;">Step 2 of 3</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.55rem; margin: 8px 0 20px;">Primary Daily Activity</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
          <div class="category-vitrine-card" style="min-height: 140px; justify-content: center; text-align: center;" onclick="answerQuiz('activity', 'Digital Screens')">
            <span class="svg-icon" style="width: 28px; height: 28px; margin: 0 auto 8px; color: var(--primary);">
              <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </span>
            <h5 style="font-size: 0.95rem; font-weight: 700;">6+ Hours Screens</h5>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Mobiles & Laptops</p>
          </div>
          <div class="category-vitrine-card" style="min-height: 140px; justify-content: center; text-align: center;" onclick="answerQuiz('activity', 'Outdoor Driving')">
            <span class="svg-icon" style="width: 28px; height: 28px; margin: 0 auto 8px; color: var(--primary);">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line></svg>
            </span>
            <h5 style="font-size: 0.95rem; font-weight: 700;">Outdoors & Driving</h5>
            <p style="font-size: 0.75rem; color: var(--text-muted);">UV Anti-Glare Protection</p>
          </div>
          <div class="category-vitrine-card" style="min-height: 140px; justify-content: center; text-align: center;" onclick="answerQuiz('activity', 'Reading & Detail')">
            <span class="svg-icon" style="width: 28px; height: 28px; margin: 0 auto 8px; color: var(--primary);">
              <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </span>
            <h5 style="font-size: 0.95rem; font-weight: 700;">Reading & Detail</h5>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Close Magnification</p>
          </div>
          <div class="category-vitrine-card" style="min-height: 140px; justify-content: center; text-align: center;" onclick="answerQuiz('activity', 'All-Round Wear')">
            <span class="svg-icon" style="width: 28px; height: 28px; margin: 0 auto 8px; color: var(--primary);">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </span>
            <h5 style="font-size: 0.95rem; font-weight: 700;">All-Day General Wear</h5>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Universal Comfort</p>
          </div>
        </div>
      </div>
    `;
  } else if (quizState.step === 3) {
    container.innerHTML = `
      <div style="text-align: center;">
        <span style="font-size: 0.76rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.08em;">Step 3 of 3</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.55rem; margin: 8px 0 20px;">Do you have a power prescription?</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
          <div class="category-vitrine-card" style="min-height: 160px; justify-content: center; text-align: center;" onclick="answerQuiz('power', 'Zero Power')">
            <h5 style="font-size: 0.95rem; font-weight: 700;">Zero Power</h5>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Blue-Cut / Fashion</p>
          </div>
          <div class="category-vitrine-card" style="min-height: 160px; justify-content: center; text-align: center;" onclick="answerQuiz('power', 'Single Vision')">
            <h5 style="font-size: 0.95rem; font-weight: 700;">Single Vision</h5>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Distance or Near</p>
          </div>
          <div class="category-vitrine-card" style="min-height: 160px; justify-content: center; text-align: center;" onclick="answerQuiz('power', 'Progressive')">
            <h5 style="font-size: 0.95rem; font-weight: 700;">Progressive</h5>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Multi-Focal Vision</p>
          </div>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div style="text-align: center; padding: 18px 0;">
        <span class="svg-icon" style="width: 44px; height: 44px; color: var(--primary); margin-bottom: 12px;">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </span>
        <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--primary); margin-bottom: 6px;">Recommended For You</h3>
        <h4 style="font-size: 1.25rem; color: var(--text-main); margin-bottom: 10px;">Indo BlueShield 1.60 Hi-Index Optical Package</h4>
        <p style="max-width: 460px; margin: 0 auto 20px; color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5;">
          Optimized for <strong>${quizState.answers.activity}</strong> with <strong>${quizState.answers.power}</strong> power. Includes robotic anti-glare surfacing and certified UV400 filtration.
        </p>

        <div style="background: var(--primary-surface); padding: 14px 20px; border-radius: 10px; margin-bottom: 22px; display: inline-block;">
          <span style="font-size: 1.4rem; font-weight: 700; color: var(--primary);">Package Price: ₹1,299/-</span>
          <span style="font-size: 0.82rem; color: var(--text-muted); text-decoration: line-through; margin-left: 8px;">MRP ₹2,999</span>
        </div>

        <div>
          <button class="btn btn-primary" onclick="addToCart(3); closeAllModals();">
            Add Recommended Lens + Frame to Bag
          </button>
        </div>
      </div>
    `;
  }
}

/* ==========================================================================
   Wholesale Pricing Calculator
   ========================================================================== */
function initWholesaleCalculator() {
  const slider = document.getElementById('wholesaleQtySlider');
  if (!slider) return;

  slider.addEventListener('input', (e) => {
    updateWholesaleCalc(parseInt(e.target.value));
  });

  updateWholesaleCalc(50);
}

function updateWholesaleCalc(qty) {
  const qtyDisplay = document.getElementById('wholesaleQtyDisplay');
  const unitPriceEl = document.getElementById('calcUnitPrice');
  const totalAmountEl = document.getElementById('calcTotalAmount');
  const profitMarginEl = document.getElementById('calcProfitMargin');
  const gstEstimateEl = document.getElementById('calcGstEstimate');

  if (qtyDisplay) qtyDisplay.textContent = `${qty} Pieces`;

  let unitPrice = 350;
  let margin = '180%';

  if (qty >= 200) {
    unitPrice = 210;
    margin = '320%';
  } else if (qty >= 50) {
    unitPrice = 280;
    margin = '240%';
  }

  const subtotal = qty * unitPrice;
  const gst = Math.round(subtotal * 0.12);
  const total = subtotal + gst;

  if (unitPriceEl) unitPriceEl.textContent = `₹${unitPrice}`;
  if (totalAmountEl) totalAmountEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  if (profitMarginEl) profitMarginEl.textContent = `${margin}`;
  if (gstEstimateEl) gstEstimateEl.textContent = `₹${gst.toLocaleString('en-IN')}`;

  const whatsappBtn = document.getElementById('whatsappQuoteBtn');
  if (whatsappBtn) {
    const text = encodeURIComponent(`Hello Indo Vision Opticals wholesale desk, I am inquiring about a bulk B2B order of ${qty} frames at ₹${unitPrice}/pc (Estimated total: ₹${total} with GST). Please share the current wholesale catalog.`);
    whatsappBtn.href = `https://wa.me/918121561799?text=${text}`;
  }
}

/* ==========================================================================
   Store Status Indicator
   ========================================================================== */
function initStoreStatus() {
  const statusEl = document.getElementById('liveStoreStatus');
  if (!statusEl) return;

  const now = new Date();
  const timeInMinutes = now.getHours() * 60 + now.getMinutes();

  // 10:00 AM (600 mins) to 9:30 PM (1290 mins)
  const isOpen = timeInMinutes >= 600 && timeInMinutes <= 1290;

  if (isOpen) {
    statusEl.innerHTML = '<span class="status-dot"></span> <strong>Open Now</strong> (Closes 9:30 PM)';
  } else {
    statusEl.innerHTML = '<span class="status-dot" style="background: #eab308; box-shadow: 0 0 8px #eab308;"></span> <strong>Closed · Opens 10 AM</strong>';
  }
}

/* ==========================================================================
   Book Eye Test Form
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('eyeTestBookingForm');
  if (!form) return;

  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.patientName.value;
    const phone = form.patientPhone.value;
    const date = form.testDate.value;
    const time = form.testTime.value;
    const type = form.testType.value;

    const modalBody = document.getElementById('bookingConfirmBody');
    if (modalBody) {
      modalBody.innerHTML = `
        <div style="text-align: center;">
          <span class="svg-icon" style="width: 48px; height: 48px; color: var(--success); margin-bottom: 12px;">
            <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </span>
          <h3 style="font-family: var(--font-serif); font-size: 1.7rem; color: var(--success); margin-bottom: 6px;">Slot Confirmed</h3>
          <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 18px;">
            Hello <strong>${name}</strong>, your complimentary 14-Step Digital Eye Exam is confirmed with our certified optometrist.
          </p>

          <div style="background: var(--primary-surface); padding: 16px; border-radius: 8px; font-size: 0.85rem; text-align: left; margin-bottom: 22px;">
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time Slot:</strong> ${time}</p>
            <p><strong>Mode:</strong> ${type}</p>
            <p><strong>Clinic:</strong> Shop.No 16-11-477/6/A/1, Dilsuknagar, opp. Ideal Clg, Hyderabad 500060</p>
            <p><strong>Hotline:</strong> +91 8121561799 / 8919019679</p>
          </div>

          <button class="btn btn-primary" onclick="closeAllModals();">Done</button>
        </div>
      `;
      openModal('bookingConfirmModal');
    }

    form.reset();
  });
}

/* ==========================================================================
   Search Functionality
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('siteSearchInput');
  const resultsBox = document.getElementById('searchResultsBox');

  if (!searchInput || !resultsBox) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) {
      resultsBox.classList.remove('active');
      return;
    }

    const matches = products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.material.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsBox.innerHTML = `
        <div style="padding: 12px; text-align: center; color: var(--text-muted); font-size: 0.82rem;">
          No optical items found for "${query}".
        </div>
      `;
    } else {
      resultsBox.innerHTML = matches.map(p => `
        <div style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 6px; cursor: pointer;" 
             onclick="openQuickView(${p.id}); closeSearch();"
             onmouseover="this.style.background='var(--primary-surface)'" 
             onmouseout="this.style.background='transparent'">
          <img src="${p.image}" alt="${p.name}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: contain; background: #fbf9fb;"/>
          <div>
            <h6 style="font-size: 0.86rem; font-weight: 600; color: var(--text-main); margin-bottom: 2px;">${p.name}</h6>
            <p style="font-size: 0.76rem; color: var(--primary); font-weight: 700;">₹${p.price.toLocaleString('en-IN')} • ${p.material}</p>
          </div>
        </div>
      `).join('');
    }

    resultsBox.classList.add('active');
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.classList.remove('active');
    }
  });
}

function closeSearch() {
  const resultsBox = document.getElementById('searchResultsBox');
  if (resultsBox) resultsBox.classList.remove('active');
}

/* ==========================================================================
   Mobile Nav Drawer Toggle
   ========================================================================== */
function toggleMobileNav() {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer && backdrop) {
    const isActive = drawer.classList.contains('active');
    if (isActive) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
    } else {
      closeAllModals();
      drawer.classList.add('active');
      backdrop.classList.add('active');
    }
  }
}

/* ==========================================================================
   Modal Helpers
   ========================================================================== */
function openModal(modalId) {
  closeAllModals();
  const modal = document.getElementById(modalId);
  const backdrop = document.getElementById('drawerBackdrop');
  if (modal && backdrop) {
    modal.classList.add('active');
    backdrop.classList.add('active');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-window-dialog').forEach(m => m.classList.remove('active'));
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  if (mobileDrawer) mobileDrawer.classList.remove('active');
  closeCartDrawer();
  const backdrop = document.getElementById('drawerBackdrop');
  if (backdrop) backdrop.classList.remove('active');
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-message-pill';
  toast.innerHTML = `
    <span class="svg-icon" style="width: 14px; height: 14px; color: var(--accent-gold);">
      <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    </span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}
