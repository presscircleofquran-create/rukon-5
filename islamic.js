// ============================================================
//  Islamic site — shared helpers
//  * home button (mihrab arch card)  +  plaque button (section / number)
//  * hero (animation), header, loader, ornament, floating background
//  * rich-text sanitizer (cleanHtml) — note er lekha nirapod rakhe
// ============================================================

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
export const qs = (key) => new URLSearchParams(location.search).get(key);
export const toBn = (n) => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);

/* ---------------- shapes ---------------- */
// 8-konar (khatam) tara
function starPath(cx, cy, R, n = 8) {
  const r = R * Math.cos(Math.PI / 4) / Math.cos(Math.PI / 8);
  let d = '';
  for (let k = 0; k < n * 2; k++) {
    const a = Math.PI / n * k - Math.PI / 2, rad = k % 2 ? r : R;
    d += (k ? 'L' : 'M') + (cx + rad * Math.cos(a)).toFixed(2) + ' ' + (cy + rad * Math.sin(a)).toFixed(2) + ' ';
  }
  return d + 'Z';
}

// Section / number button: kona-kata plaque, dui pashe churo (viewBox -6 -6 612 132)
const PLAQUE_D = 'M 30 8 H 570 A 22 22 0 0 0 592 30 C 592 50, 596 54, 598 60 C 596 66, 592 70, 592 90 ' +
  'A 22 22 0 0 0 570 112 H 30 A 22 22 0 0 0 8 90 C 8 70, 4 66, 2 60 C 4 54, 8 50, 8 30 A 22 22 0 0 0 30 8 Z';
// Home button: mihrab arch card (viewBox 0 0 300 196)
const ARCH_D = 'M 16 90 C 16 56, 104 50, 150 6 C 196 50, 284 56, 284 90 V 176 Q 284 188 272 188 H 28 Q 16 188 16 176 Z';

const DEFS = `
<svg id="islDefs" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="islEm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#25806F"/><stop offset=".55" stop-color="#175048"/><stop offset="1" stop-color="#0C3631"/>
    </linearGradient>
    <linearGradient id="islGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F8E8AE"/><stop offset=".35" stop-color="#D9B45B"/>
      <stop offset=".65" stop-color="#F3DFA2"/><stop offset="1" stop-color="#B58A33"/>
    </linearGradient>
    <radialGradient id="islGlow" cx="50%" cy="42%" r="62%">
      <stop offset="0" stop-color="#FFF4C8" stop-opacity=".24"/><stop offset="1" stop-color="#FFF4C8" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="islShine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <pattern id="islPat" width="22" height="22" patternUnits="userSpaceOnUse">
      <path d="${starPath(11, 11, 8)}" fill="none" stroke="#F3DFA2" stroke-opacity=".13" stroke-width=".8"/>
    </pattern>
    <path id="islPlaque" d="${PLAQUE_D}"/>
    <path id="islArch" d="${ARCH_D}"/>
    <path id="islStar" d="${starPath(0, 0, 30)}"/>
    <clipPath id="islPlaqueClip"><path d="${PLAQUE_D}"/></clipPath>
    <clipPath id="islArchClip"><path d="${ARCH_D}"/></clipPath>
  </defs>
</svg>`;

function bgHtml() {
  let h = '';
  for (let k = 0; k < 9; k++) {
    const x = (k * 11 + Math.random() * 8).toFixed(1), s = (16 + Math.random() * 28).toFixed(0);
    const t = (28 + Math.random() * 26).toFixed(1), d = (-Math.random() * 45).toFixed(1);
    h += `<b style="--x:${x}%;--s:${s}px;--t:${t}s;--d:${d}s"></b>`;
  }
  return `<div class="isl-bg" aria-hidden="true">${h}</div>`;
}

export function injectDefs() {
  if (!document.getElementById('islDefs')) document.body.insertAdjacentHTML('afterbegin', DEFS);
  if (document.body.classList.contains('isl-page') && !document.querySelector('.isl-bg')) document.body.insertAdjacentHTML('afterbegin', bgHtml());
}

/* ---------------- buttons ---------------- */
// Home button — alada: mihrab arch card, majhkhane tara, lekha thik majhkhane
export function homeBtnHtml({ label, href = '#', i = 0 }) {
  return `
<a class="isl-home" style="--i:${i}" href="${esc(href)}">
  <span class="isl-bob">
    <svg viewBox="0 0 300 196" aria-hidden="true">
      <use href="#islArch" fill="none" stroke="#D9B45B" stroke-opacity=".38" stroke-width="9" stroke-linejoin="round"/>
      <use href="#islArch" fill="url(#islEm)"/>
      <use href="#islArch" fill="url(#islPat)"/>
      <use href="#islArch" fill="url(#islGlow)"/>
      <use href="#islArch" fill="none" stroke="url(#islGold)" stroke-width="3.2" stroke-linejoin="round"/>
      <use href="#islArch" fill="none" stroke="#F3DFA2" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round"
           transform="translate(150 110) scale(.9) translate(-150 -110)"/>
      <g transform="translate(150 50)"><g class="isl-pop"><g transform="scale(.46)"><use class="isl-spin" href="#islStar" fill="url(#islGold)"/></g></g></g>
      <g clip-path="url(#islArchClip)"><rect class="isl-shine" x="-120" y="-10" width="70" height="210" fill="url(#islShine)"/></g>
    </svg>
    <span class="isl-label"><span class="isl-text">${esc(label)}</span></span>
  </span>
</a>`;
}

// Section / number button — plaque. num dile bame number medal
export function btnHtml({ label, href = '#', num = null, i = 0 }) {
  const hasNum = num != null;
  const left = hasNum
    ? `<g transform="translate(64 60)"><g class="isl-pop"><g transform="scale(.95)">
         <use class="isl-spin" href="#islStar" fill="url(#islGold)" stroke="#8A6420" stroke-width=".7"/></g></g></g>`
    : `<g transform="translate(44 60)"><g class="isl-pop"><g transform="scale(.3)"><use class="isl-spin" href="#islStar" fill="url(#islGold)"/></g></g></g>`;
  const rx = hasNum ? 536 : 556;
  return `
<a class="isl-btn${hasNum ? ' has-num' : ''}" style="--i:${i}" href="${esc(href)}">
  <svg viewBox="-6 -6 612 132" aria-hidden="true">
    <use href="#islPlaque" fill="none" stroke="#D9B45B" stroke-opacity=".38" stroke-width="9" stroke-linejoin="round"/>
    <use href="#islPlaque" fill="url(#islEm)"/>
    <use href="#islPlaque" fill="url(#islPat)"/>
    <use href="#islPlaque" fill="url(#islGlow)"/>
    <use href="#islPlaque" fill="none" stroke="url(#islGold)" stroke-width="3.2" stroke-linejoin="round"/>
    <use href="#islPlaque" fill="none" stroke="#F3DFA2" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round"
         transform="translate(300 60) scale(.955 .78) translate(-300 -60)"/>
    ${left}
    <g transform="translate(${rx} 60)"><g class="isl-pop"><g transform="scale(.3)"><use class="isl-spin" href="#islStar" fill="url(#islGold)"/></g></g></g>
    <g clip-path="url(#islPlaqueClip)"><rect class="isl-shine" x="-120" y="-10" width="80" height="140" fill="url(#islShine)"/></g>
  </svg>
  ${hasNum ? `<span class="isl-num">${toBn(num)}</span>` : ''}
  <span class="isl-label"><span class="isl-text">${esc(label)}</span></span>
</a>`;
}

/* ---------------- hero / header / small bits ---------------- */
// Chand: tara ke alada <g> e rakha — nahole CSS animation transform bhenge dey
const crescent = (id, cls) => `
<svg class="${cls}" viewBox="0 0 80 80" aria-hidden="true">
  <defs>
    <mask id="${id}"><rect width="80" height="80" fill="#fff"/><circle cx="53" cy="31" r="27" fill="#000"/></mask>
    <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF3C4"/><stop offset="1" stop-color="#E3C26B"/></linearGradient>
  </defs>
  <circle cx="38" cy="42" r="30" fill="url(#${id}g)" mask="url(#${id})"/>
  <g transform="translate(60 27) scale(.22)"><use class="isl-spin" href="#islStar" fill="#FFF3C4"/></g>
</svg>`;

const lantern = (cls) => `
<svg class="isl-lantern ${cls}" viewBox="0 0 60 150" aria-hidden="true">
  <line x1="30" y1="0" x2="30" y2="30" stroke="#E3C770" stroke-width="1.6"/>
  <circle cx="30" cy="31" r="3.2" fill="#E3C770"/>
  <path d="M20 38 L40 38 L44 48 L16 48 Z" fill="#E3C770"/>
  <path d="M16 48 H44 C50 62 54 74 54 88 C54 104 47 116 42 124 H18 C13 116 6 104 6 88 C6 74 10 62 16 48 Z" fill="#123F3A" stroke="#E3C770" stroke-width="2"/>
  <ellipse class="isl-flame" cx="30" cy="86" rx="12" ry="24" fill="#F7DC8A"/>
  <path d="M30 48 V124 M10 86 H50 M18 62 Q30 70 42 62 M18 110 Q30 102 42 110" stroke="#E3C770" stroke-width="1.4" fill="none" opacity=".75"/>
  <path d="M18 124 H42 L38 132 H22 Z" fill="#E3C770"/>
  <line x1="30" y1="132" x2="30" y2="146" stroke="#E3C770" stroke-width="1.6"/>
  <circle cx="30" cy="147" r="2.6" fill="#E3C770"/>
</svg>`;

function starsHtml(n = 24) {
  let h = '';
  for (let k = 0; k < n; k++) {
    const x = (Math.random() * 96 + 2).toFixed(1), y = (Math.random() * 70 + 3).toFixed(1);
    const s = (Math.random() * 9 + 5).toFixed(1), d = (Math.random() * 4).toFixed(2), t = (Math.random() * 3 + 2.4).toFixed(2);
    h += `<i style="--x:${x}%;--y:${y}%;--s:${s}px;--d:${d}s;--t:${t}s"></i>`;
  }
  return h;
}

export function orn() {
  return `<div class="isl-orn" aria-hidden="true"><span></span>
    <svg viewBox="-34 -34 68 68"><use class="isl-spin" href="#islStar" fill="#B8934A"/></svg><span></span></div>`;
}

// Home page er boro hero (animated) — mosjid nai, porishkar arch dhar
export function heroHtml({ title = '', subtitle = '' } = {}) {
  return `
<section class="isl-hero">
  <div class="isl-rays" aria-hidden="true"></div>
  <div class="isl-stars" aria-hidden="true">${starsHtml()}</div>
  ${lantern('l1')}${lantern('l2')}
  <div class="isl-hero-in">
    ${crescent('islMoonMask', 'isl-moon')}
    <div class="isl-bismillah" dir="rtl" lang="ar">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
    <h1 class="isl-title" id="islTitle">${esc(title)}</h1>
    <p class="isl-subtitle" id="islSub"${subtitle ? '' : ' hidden'}>${esc(subtitle)}</p>
    ${orn()}
  </div>
  <svg class="isl-edge" viewBox="0 0 1200 56" preserveAspectRatio="none" aria-hidden="true">
    <path class="isl-edge-fill" d="M0 56 V34 H506 C540 34 566 30 600 4 C634 30 660 34 694 34 H1200 V56 Z"/>
    <path d="M0 34 H506 C540 34 566 30 600 4 C634 30 660 34 694 34 H1200" fill="none" stroke="#D9B45B" stroke-width="2" vector-effect="non-scaling-stroke"/>
  </svg>
</section>`;
}

// Bhitorer page er header
export function headerHtml({ title = '', sub = '', back = 'index.html' } = {}) {
  return `
<header class="isl-header">
  <a class="isl-back" href="${esc(back)}" aria-label="পেছনে">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
  </a>
  <div class="isl-htitle"><h1 id="islTitle">${esc(title)}</h1><small id="islSub"${sub ? '' : ' hidden'}>${esc(sub)}</small></div>
  <span class="isl-hmoon">${crescent('islMoonMask2', 'isl-moon-mini')}</span>
</header>`;
}

export function setHeader(title, sub) {
  const t = document.getElementById('islTitle'), s = document.getElementById('islSub');
  if (t && title != null) t.textContent = title;
  if (s) { s.textContent = sub || ''; s.hidden = !sub; }
}

export const loaderHtml = (text = 'লোড হচ্ছে...') =>
  `<div class="isl-loading"><svg viewBox="-34 -34 68 68"><use class="isl-spin fast" href="#islStar" fill="#184D47"/></svg><span>${esc(text)}</span></div>`;
export const msgHtml = (text, err = false) => `<p class="isl-msg${err ? ' err' : ''}">${esc(text)}</p>`;
export const footHtml = () => `<div class="isl-foot">${orn()}</div>`;

/* ---------------- rich text: sanitizer ---------------- */
const OK_TAGS = new Set(['P', 'DIV', 'BR', 'B', 'STRONG', 'I', 'EM', 'U', 'S', 'STRIKE', 'DEL', 'UL', 'OL', 'LI',
  'H1', 'H2', 'H3', 'H4', 'SPAN', 'BLOCKQUOTE', 'A', 'HR', 'SUB', 'SUP', 'FONT', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TD', 'TH', 'CAPTION', 'IMG', 'MARK']);
const DROP = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'LINK', 'META', 'TEMPLATE', 'NOSCRIPT', 'SVG',
  'MATH', 'FORM', 'INPUT', 'BUTTON', 'TEXTAREA', 'SELECT', 'VIDEO', 'AUDIO', 'CANVAS', 'TITLE', 'HEAD', 'FRAME', 'FRAMESET']);
const COLOR_RE = /^(#[0-9a-f]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+)\s*)?\)|[a-z]{3,20})$/i;
const SIZE_RE = /^(xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large|\d{1,3}(\.\d{1,2})?(px|pt|em|rem|%))$/i;
const LEN_RE = /^-?\d{1,4}(\.\d{1,2})?(px|pt|em|rem|%)?$/;
const FONT_SIZES = { 1: 'x-small', 2: 'small', 3: 'medium', 4: 'large', 5: 'x-large', 6: 'xx-large', 7: 'xxx-large' };
const CLASS_OK = new Set(['doc-sub', 'pgbreak', 'fn-ref', 'fn-list', 'toc', 'tc']);
const FONT_RE = /^[\w\s,'"\-ঀ-৿؀-ۿ]{1,120}$/;

function cleanStyle(style) {
  const out = [];
  String(style).split(';').forEach(rule => {
    const i = rule.indexOf(':'); if (i < 0) return;
    const p = rule.slice(0, i).trim().toLowerCase(), v = rule.slice(i + 1).trim();
    if (!v) return;
    if ((p === 'color' || p === 'background-color' || p === 'border-color') && COLOR_RE.test(v)) out.push(p + ':' + v);
    else if (p === 'font-size' && SIZE_RE.test(v)) out.push('font-size:' + v);
    else if (p === 'font-family' && FONT_RE.test(v) && !/url|expression/i.test(v)) out.push('font-family:' + v);
    else if (p === 'font-weight' && /^(bold|normal|[1-9]00)$/.test(v)) out.push('font-weight:' + v);
    else if (p === 'font-style' && /^(italic|normal)$/.test(v)) out.push('font-style:' + v);
    else if ((p === 'text-decoration' || p === 'text-decoration-line') && /^(underline|line-through|none)( (underline|line-through))*$/.test(v)) out.push('text-decoration:' + v);
    else if (p === 'text-align' && /^(left|right|center|justify|start|end)$/.test(v)) out.push('text-align:' + v);
    else if (p === 'direction' && /^(rtl|ltr)$/.test(v)) out.push('direction:' + v);
    else if (p === 'line-height' && /^\d{1,2}(\.\d{1,2})?(px|em|%)?$/.test(v)) out.push('line-height:' + v);
    else if (/^(margin|padding)-(top|bottom|left|right)$/.test(p) && LEN_RE.test(v)) out.push(p + ':' + v);
    else if (p === 'text-indent' && LEN_RE.test(v)) out.push('text-indent:' + v);
    else if ((p === 'width' || p === 'max-width' || p === 'height') && /^\d{1,4}(\.\d{1,2})?(px|%)$/.test(v)) out.push(p + ':' + v);
    else if (p === 'float' && /^(left|right|none)$/.test(v)) out.push('float:' + v);
    else if (p === 'display' && /^(block|inline-block|inline)$/.test(v)) out.push('display:' + v);
    else if (p === 'margin' && /^(0|\d{1,3}px)( (auto|0|\d{1,3}px)){0,3}$/.test(v)) out.push('margin:' + v);
    else if (p === 'vertical-align' && /^(super|sub|baseline|top|middle|bottom)$/.test(v)) out.push('vertical-align:' + v);
    else if (p === 'text-transform' && /^(none|uppercase|lowercase|capitalize)$/.test(v)) out.push('text-transform:' + v);
    else if (/^border(-(top|bottom|left|right))?$/.test(p) && /^(none|\d{1,2}px (solid|dashed|dotted|double) (#[0-9a-f]{3,8}|[a-z]{3,20}|rgba?\([\d\s,.]+\)))$/i.test(v)) out.push(p + ':' + v);
    else if (p === 'border-radius' && /^\d{1,3}(px|%)$/.test(v)) out.push('border-radius:' + v);
    else if (p === 'list-style-type' && /^(disc|circle|square|decimal|lower-alpha|upper-alpha|lower-roman|upper-roman|bengali|none)$/.test(v)) out.push('list-style-type:' + v);
  });
  return out.join(';');
}

// Je kono HTML ke whitelist diye porishkar kore. Script/onclick sob bad. Chobi shudhu data:image (admin editor theke).
export function cleanHtml(html) {
  const doc = new DOMParser().parseFromString('<!doctype html><body>' + String(html ?? ''), 'text/html');
  const out = document.createElement('div');
  const walk = (src, dst) => {
    src.childNodes.forEach(n => {
      if (n.nodeType === 3) { dst.appendChild(document.createTextNode(n.nodeValue)); return; }
      if (n.nodeType !== 1) return;
      const tag = n.tagName;
      if (DROP.has(tag)) return;
      if (!OK_TAGS.has(tag)) { walk(n, dst); return; }
      if (tag === 'IMG') {
        const src2 = (n.getAttribute('src') || '').trim();
        if (!/^data:image\/(png|jpe?g|gif|webp);base64,[a-z0-9+\/=]+$/i.test(src2)) return;
      }
      let outTag = tag === 'FONT' ? 'span' : (tag === 'STRIKE' || tag === 'DEL') ? 's' : tag.toLowerCase();
      const el = document.createElement(outTag);
      let style = n.getAttribute('style') ? cleanStyle(n.getAttribute('style')) : '';
      if (tag === 'FONT') {
        const c = n.getAttribute('color'), sz = n.getAttribute('size'), face = n.getAttribute('face');
        if (c && COLOR_RE.test(c.trim())) style = 'color:' + c.trim() + (style ? ';' + style : '');
        if (sz && FONT_SIZES[sz]) style = (style ? style + ';' : '') + 'font-size:' + FONT_SIZES[sz];
        if (face && FONT_RE.test(face)) style = (style ? style + ';' : '') + 'font-family:' + face;
      }
      if (style) el.setAttribute('style', style);
      const dir = n.getAttribute('dir');
      if (dir && /^(rtl|ltr|auto)$/i.test(dir)) el.setAttribute('dir', dir.toLowerCase());
      const cls = (n.getAttribute('class') || '').split(/\s+/).filter(c => CLASS_OK.has(c));
      if (cls.length) el.setAttribute('class', cls.join(' '));
      const id = n.getAttribute('id');
      if (id && /^h-\d{1,4}$/.test(id) && /^H[1-4]$/.test(tag)) el.setAttribute('id', id);
      if (tag === 'TD' || tag === 'TH') ['colspan', 'rowspan'].forEach(k => { const v = n.getAttribute(k); if (v && /^\d{1,2}$/.test(v) && +v > 1) el.setAttribute(k, v); });
      if (tag === 'TABLE' && n.getAttribute('data-b') === '0') el.setAttribute('data-b', '0');
      if (tag === 'IMG') { el.setAttribute('src', n.getAttribute('src').trim()); el.setAttribute('alt', (n.getAttribute('alt') || '').slice(0, 120)); }
      if (tag === 'A') {
        const href = (n.getAttribute('href') || '').trim();
        if (/^(https?:\/\/|mailto:|tel:)/i.test(href)) {
          el.setAttribute('href', href); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener noreferrer');
        } else if (/^#h-\d{1,4}$/.test(href)) el.setAttribute('href', href);
      }
      if (tag !== 'BR' && tag !== 'HR' && tag !== 'IMG') walk(n, el);
      dst.appendChild(el);
    });
  };
  walk(doc.body, out);
  return out.innerHTML;
}

// Puroni (plain text) note ke HTML e
export function textToHtml(text) {
  return String(text ?? '').split(/\r?\n/).map(l => l.trim() ? `<p>${esc(l)}</p>` : '<p><br></p>').join('');
}

// Arabic proodhan line hole nijei dan dik theke (RTL) kore
export function autoDir(root) {
  const BLOCKS = 'p,div,li,h1,h2,h3,h4,blockquote';
  root.querySelectorAll(BLOCKS).forEach(el => {
    if (el.hasAttribute('dir') || el.querySelector(BLOCKS)) return;
    const t = el.textContent || '';
    const ar = (t.match(/[؀-ۿݐ-ݿ]/g) || []).length;
    const all = (t.match(/\p{L}/gu) || []).length;
    if (all && ar / all > 0.5) el.setAttribute('dir', 'rtl');
  });
}

export function plainText(html) {
  const d = document.createElement('div'); d.innerHTML = cleanHtml(html);
  return (d.innerText || d.textContent || '').trim();
}

/* ---- simple note html: big title (h1), small title (h2), paragraphs, bold/italic/underline, size (1-20), colour, lists, alignment. No fonts, images, tables ---- */
export function simpleHtml(html, { paste = false, unwrapBold = false } = {}) {
  const doc = new DOMParser().parseFromString('<!doctype html><body>' + String(html ?? ''), 'text/html');
  const out = document.createElement('div');
  const SKIP = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'LINK', 'META', 'TEMPLATE', 'NOSCRIPT', 'SVG', 'IMG', 'HEAD', 'TITLE']);
  const BLOCK = new Set(['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'UL', 'OL', 'BLOCKQUOTE', 'TR', 'TABLE', 'SECTION', 'ARTICLE', 'PRE', 'FIGURE']);
  const hex = (c) => { c = String(c || '').trim().toLowerCase(); if (/^#[0-9a-f]{6}$/.test(c)) return c; const m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(c); return m ? '#' + [m[1], m[2], m[3]].map(v => Math.min(255, +v).toString(16).padStart(2, '0')).join('') : ''; };
  const alignOf = (n) => { const m = /text-align\s*:\s*(left|right|center|justify)/i.exec(n.getAttribute('style') || '') || (n.getAttribute('align') ? [0, n.getAttribute('align').toLowerCase()] : null); return m && /^(left|right|center|justify)$/.test(m[1]) ? m[1] : ''; };
  const inl = (n, dst) => {
    n.childNodes.forEach(c => {
      if (c.nodeType === 3) { dst.appendChild(document.createTextNode(c.nodeValue.replace(/ /g, ' '))); return; }
      if (c.nodeType !== 1 || SKIP.has(c.tagName)) return;
      const t = c.tagName;
      if (t === 'BR') { dst.appendChild(document.createElement('br')); return; }
      if (paste) { inl(c, dst); return; }
      let el = null;
      if (t === 'B' || t === 'STRONG') el = document.createElement('b');
      else if (t === 'I' || t === 'EM') el = document.createElement('i');
      else if (t === 'U') el = document.createElement('u');
      else if (t === 'SPAN' || t === 'FONT') {
        const sz = +(c.getAttribute('data-sz') || 0), col = hex((c.style && c.style.color) || c.getAttribute('color'));
        if ((sz >= 1 && sz <= 20) || col) { el = document.createElement('span'); if (sz >= 1 && sz <= 20) el.setAttribute('data-sz', String(sz)); if (col) el.setAttribute('style', 'color:' + col); }
      }
      if (el) { inl(c, el); if (el.textContent || el.querySelector('br')) dst.appendChild(el); } else inl(c, dst);
    });
  };
  const hasBlock = (n) => [...n.children].some(c => BLOCK.has(c.tagName));
  const mk = (tag, n) => { const e = document.createElement(tag); inl(n, e); const a = alignOf(n); if (a && a !== 'left') e.setAttribute('style', 'text-align:' + a); return e; };
  const walk = (src) => {
    src.childNodes.forEach(n => {
      if (n.nodeType === 3) { if (n.nodeValue.trim()) { const p = document.createElement('p'); p.textContent = n.nodeValue.replace(/ /g, ' ').trim(); out.appendChild(p); } return; }
      if (n.nodeType !== 1 || SKIP.has(n.tagName)) return;
      const t = n.tagName;
      if (t === 'UL' || t === 'OL') {
        const l = document.createElement(t.toLowerCase());
        n.querySelectorAll(':scope > li').forEach(li => { const e = document.createElement('li'); inl(li, e); if (e.textContent.trim()) l.appendChild(e); });
        if (l.children.length) out.appendChild(l); return;
      }
      if ((t === 'H1' || t === 'H2') && !paste) { const e = mk(t.toLowerCase(), n); const len = e.textContent.trim().length; if (len && len <= 120) out.appendChild(e); else if (len) { const p = document.createElement('p'); p.innerHTML = e.innerHTML; out.appendChild(p); } return; }
      if (/^H[1-6]$/.test(t) || t === 'P' || t === 'PRE' || t === 'BLOCKQUOTE' || t === 'LI') { if (hasBlock(n) && t !== 'P') { walk(n); return; } const e = mk('p', n); if (e.textContent.trim() || e.querySelector('br')) out.appendChild(e); return; }
      if (BLOCK.has(t) || t === 'BODY') { if (hasBlock(n)) walk(n); else { const e = mk('p', n); if (e.textContent.trim()) out.appendChild(e); } return; }
      const p = document.createElement('p'); const w = document.createElement('div'); w.appendChild(n.cloneNode(true)); inl(w, p); if (p.textContent.trim()) out.appendChild(p);
    });
  };
  walk(doc.body);
  if (unwrapBold) out.querySelectorAll('p').forEach(p => { const k = [...p.childNodes].filter(x => !(x.nodeType === 3 && !x.nodeValue.trim())); if (k.length === 1 && k[0].nodeName === 'B') { const b = k[0]; while (b.firstChild) p.insertBefore(b.firstChild, b); b.remove(); } });
  return out.innerHTML;
}
export function textToSimple(text) { return String(text || '').split(/\r?\n+/).map(s => s.trim()).filter(Boolean).map(s => '<p>' + esc(s) + '</p>').join(''); }
