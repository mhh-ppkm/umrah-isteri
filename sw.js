/* Diari Umrah Isteriku — service worker (offline) */
const V = 'umrah-v2';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './favicon-32.png'];
const LIBS = ['cdnjs.cloudflare.com', 'www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
const TILE_MAX = 400;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== V && k !== V + '-tiles').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

function timeout(ms) { return new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms)); }

async function networkFirstPage(req) {
  const cache = await caches.open(V);
  try {
    const res = await Promise.race([fetch(req), timeout(5000)]);
    if (res && res.ok && /\/(index\.html)?$/.test(new URL(req.url).pathname)) cache.put('./index.html', res.clone());
    return res;
  } catch (e) {
    return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
  }
}
async function cacheFirst(req, name, max) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res && res.ok) {
      cache.put(req, res.clone());
      if (max) cache.keys().then(k => { if (k.length > max) cache.delete(k[0]); });
    }
    return res;
  } catch (e) { return hit || Response.error(); }
}
async function staleWhileRevalidate(req) {
  const cache = await caches.open(V);
  const hit = await cache.match(req);
  const net = fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(() => hit);
  return hit || net;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate' && url.origin === location.origin) { e.respondWith(networkFirstPage(req)); return; }
  if (url.origin === location.origin) { e.respondWith(staleWhileRevalidate(req)); return; }
  if (LIBS.includes(url.hostname) && !url.pathname.includes('/v1/') ) {
    if (url.hostname === 'www.gstatic.com' && !url.pathname.startsWith('/firebasejs/')) return;
    e.respondWith(cacheFirst(req, V)); return;
  }
  if (url.hostname.endsWith('tile.openstreetmap.org')) { e.respondWith(cacheFirst(req, V + '-tiles', TILE_MAX)); return; }
  if (url.hostname === 'drive.google.com' && url.pathname.startsWith('/thumbnail')) { e.respondWith(cacheFirst(req, V + '-tiles', TILE_MAX)); return; }
  /* Firestore, Apps Script dan Open-Meteo tidak dicache di sini (data sentiasa terkini) */
});
