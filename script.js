// script.js - Baytek Collection functionality
const cartIcon = document.getElementById('cart-icon');
const cartCountSpan = document.getElementById('cart-count');
const cartDiv = document.getElementById('cart');
const cartTotalSpan = document.getElementById('cart-total');
const siteNotification = document.getElementById('site-notification');
const lastOrderPopup = document.getElementById('last-order-popup');
const reviewsPopup = document.getElementById('reviews-popup');
let cart = [];

function updateLive(){ const val = Math.floor(Math.random()*37) + 12; document.getElementById('live-count').textContent = val; const badge = document.getElementById('live-badge'); badge.style.transform = 'translateY(-2px)'; setTimeout(()=>badge.style.transform='translateY(0)',300); }
setInterval(updateLive,5000); updateLive();

const salesCountSpan = document.getElementById('sales-count');
function bumpSales(){ const cur = Number(salesCountSpan.textContent)||0; const add = Math.floor(Math.random()*3); salesCountSpan.textContent = Math.max(12, cur + add); const bar = document.getElementById('sales-bar'); bar.style.transform = 'translateY(-3px)'; setTimeout(()=>bar.style.transform='translateY(0)',250); }
setInterval(bumpSales,20000);

function formatTL(n){ return n + '₺'; }
function updateCartUI(){ const ul = cartDiv.querySelector('ul'); ul.innerHTML=''; let total=0; cart.forEach((it,idx)=>{ const li=document.createElement('li'); li.innerHTML = `${it.name} ${it.color? '('+it.color+')':''} x${it.quantity} - ${formatTL(it.price*it.quantity)} <span class="remove-item" data-index="${idx}">×</span>`; ul.appendChild(li); total += it.price*it.quantity; }); cartTotalSpan.textContent = formatTL(total); cartCountSpan.textContent = cart.reduce((a,b)=>a+b.quantity,0); ul.querySelectorAll('.remove-item').forEach(el=>{ el.addEventListener('click', ()=>{ const idx = Number(el.getAttribute('data-index')); cart.splice(idx,1); updateCartUI(); }); }); }

cartIcon.addEventListener('click', ()=>{ if(cartDiv.style.display==='block'){ cartDiv.style.display='none'; } else { cartDiv.style.display='block'; cartDiv.style.transform='translateX(0)'; }});

function playCartAnimation(){ cartIcon.classList.add('bounce'); setTimeout(()=>cartIcon.classList.remove('bounce'),400); }

function gatherCardData(card){ const name = card.getAttribute('data-name'); const price = Number(card.getAttribute('data-price')||0); const max = Number(card.getAttribute('data-max')||999); const shopier = card.getAttribute('data-shopier')||''; const colorSelect = card.querySelector('.color-select'); const color = colorSelect ? (colorSelect.value) : ''; const shipping = (card.querySelector('.shipping-select') || {value:''}).value; const qty = Number(card.querySelector('.qty-input').value || 1); return {name,price,max,shopier,color,shipping,qty,card}; }

function checkLowStockOnCard(card){ const max = Number(card.getAttribute('data-max')||999); const low = 5; const existingBadge = card.querySelector('.low-stock'); if(max <= low){ if(!existingBadge){ const badge = document.createElement('div'); badge.className='low-stock'; badge.textContent = `SON ${max} ADET`; card.appendChild(badge); } else { existingBadge.textContent = `SON ${max} ADET`; } } else { if(existingBadge) existingBadge.remove(); } }
document.querySelectorAll('.product-card').forEach(c=>checkLowStockOnCard(c));

const modalBackdrop = document.getElementById('modal-backdrop');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalQty = document.getElementById('modal-qty');
const modalAddBtn = document.getElementById('modal-add-btn');
const modalClose = document.getElementById('modal-close');
const modalStock = document.getElementById('modal-stock');

function openModalFromCard(card){ const {name,price,max} = gatherCardData(card); const img = card.querySelector('img')?.src || ''; modalImg.src = img; modalTitle.textContent = name; modalDesc.textContent = card.querySelector('p') ? card.querySelector('p').textContent : ''; modalPrice.textContent = formatTL(price); modalQty.value = 1; modalStock.textContent = max <=5 ? `Stok: ${max} adet (Hızlı tükeniyor)` : `Stok: ${max} adet`; modalBackdrop.style.display='flex'; modalBackdrop.setAttribute('aria-hidden','false'); modalAddBtn.dataset.sourceCardIndex = Array.from(document.querySelectorAll('.product-card')).indexOf(card); }
modalClose.addEventListener('click', ()=> { modalBackdrop.style.display='none'; modalBackdrop.setAttribute('aria-hidden','true'); });
modalBackdrop.addEventListener('click',(e)=>{ if(e.target===modalBackdrop){ modalBackdrop.style.display='none'; modalBackdrop.setAttribute('aria-hidden','true'); } });
document.querySelectorAll('.product-card').forEach(card=>{ card.querySelector('img')?.addEventListener('click', ()=> openModalFromCard(card)); card.querySelector('h3')?.addEventListener('click', ()=> openModalFromCard(card)); });

modalAddBtn.addEventListener('click', ()=>{ const idx = Number(modalAddBtn.dataset.sourceCardIndex); const card = document.querySelectorAll('.product-card')[idx]; if(!card) return; const btn = card.querySelector('.add-btn'); if(btn) btn.click(); modalBackdrop.style.display='none'; });

document.querySelectorAll('.product-card').forEach(card=>{ const colorSel = card.querySelector('.color-select'); if(colorSel){ colorSel.addEventListener('change', ()=>{ const opt = colorSel.options[colorSel.selectedIndex]; const dataImg = opt.getAttribute('data-img') || opt.getAttribute('data-img-default') || card.querySelector('img').src; const imgEl = card.querySelector('img'); if(imgEl) imgEl.src = dataImg; }); } });

document.querySelectorAll('.product-card').forEach(card=>{ const ship = card.querySelector('.shipping-select'); const logo = card.querySelector('.shipping-logo'); if(ship && logo){ ship.addEventListener('change', ()=>{ const opt = ship.options[ship.selectedIndex]; const logoUrl = opt.getAttribute('data-logo') || 'https://i.imgur.com/placeholder.png'; logo.src = logoUrl; }); const initOpt = ship.options[ship.selectedIndex]; logo.src = (initOpt && initOpt.getAttribute('data-logo')) || 'https://i.imgur.com/placeholder.png'; } });

document.querySelectorAll('.product-card .add-btn').forEach(btn=>{ btn.addEventListener('click', ()=>{ const card = btn.closest('.product-card'); const {name,price,max,shopier,color,shipping,qty} = gatherCardData(card); let quantity = qty; if(quantity > max) quantity = max; const exists = cart.find(i => i.name === name && i.color === color && i.shipping === shipping); if(exists){ exists.quantity += quantity; if(exists.quantity > max) exists.quantity = max; } else { cart.push({name,price,quantity,color,shipping,shopier}); } updateCartUI(); const popup = card.querySelector('.added-popup'); if(popup){ popup.style.display = 'block'; setTimeout(()=> popup.style.display='none',1200); } playCartAnimation(); lastOrderPopup.textContent = `${name} sepete eklendi!`; lastOrderPopup.style.display = 'block'; setTimeout(()=> lastOrderPopup.style.display='none', 1800); const reviews = ["Mükemmel ürün!","Hızlı kargo, teşekkürler!","Kalitesi harika!","Tavsiye ederim.","Beklediğimden güzel çıktı!"]; reviewsPopup.textContent = `${reviews[Math.floor(Math.random()*reviews.length)]} — ${name}`; reviewsPopup.style.display = 'block'; setTimeout(()=> reviewsPopup.style.display='none',3200); if(Math.random() > 0.6){ const cur = Number(salesCountSpan.textContent)||0; salesCountSpan.textContent = cur + 1; } }); });

document.getElementById('checkout').addEventListener('click', ()=>{ if(cart.length === 0){ alert('Sepet boş!'); return; } cart.forEach(item=>{ if(item.shopier) window.open(item.shopier, '_blank'); }); siteNotification.textContent = 'Shopier ödeme sayfalarına yönlendirildiniz. Ödeme tamamlandıktan sonra WhatsApp bildirimi gelecektir.'; siteNotification.style.display = 'block'; setTimeout(()=> siteNotification.style.display = 'none', 6000); cart = []; updateCartUI(); });

function showRandomNotification(){ const name = ["Ayşe","Fatma","Elif","Merve","Zeynep","Ali","Mehmet","Kerem"][Math.floor(Math.random()*8)]; const product = ["Kartal figürlü LED ışıklı su şelalesi","Fil figürlü LED ışıklı su şelalesi","3 Bardaklı Vakumlu Termos Seti","Mobgift USB’li Işıklı Ahşap Standlı Cam Küre","3’lü Motivasyonel Su Matarası"][Math.floor(Math.random()*5)]; const quantity = Math.floor(Math.random()*3)+1; const notificationDiv = document.getElementById('site-notification'); notificationDiv.textContent = `${name} ${quantity} adet "${product}" aldı!`; notificationDiv.style.display = 'block'; notificationDiv.style.opacity = 0; let opacity = 0; const fadeIn = setInterval(()=>{ opacity += 0.1; notificationDiv.style.opacity = opacity; if(opacity >= 1) clearInterval(fadeIn); },50); setTimeout(()=>{ const fadeOut = setInterval(()=>{ opacity -= 0.1; notificationDiv.style.opacity = opacity; if(opacity <= 0){ clearInterval(fadeOut); notificationDiv.style.display='none'; } },50); },4000); }
setInterval(()=>{ showRandomNotification(); }, Math.random()*5000 + 7000);

const filSelect = document.getElementById('fil-select'); if(filSelect){ filSelect.addEventListener('change', ()=>{ const val = filSelect.value; document.getElementById('fil-img').style.display = (val === 'Fil 1') ? 'block' : 'none'; document.getElementById('fil-img2').style.display = (val === 'Fil 2') ? 'block' : 'none'; }); }

document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'){ if(modalBackdrop.style.display==='flex'){ modalBackdrop.style.display='none'; modalBackdrop.setAttribute('aria-hidden','true'); } if(cartDiv.style.display==='block'){ cartDiv.style.display='none'; } } });

updateCartUI(); updateLive(); bumpSales();
