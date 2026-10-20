// Ciao Vietnam illustration toolkit: small SVG helpers used by scenes.mjs and food.mjs.
// All artwork is original and generated here; no third-party imagery.
export const W = 800;
export const H = 600;

export function rng(seed) {
  let s = (seed >>> 0) || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const f = (n) => Number(n.toFixed(1));

export function grad(id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) {
  const s = stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? "" : ` stop-opacity="${a}"`}/>`).join("");
  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${s}</linearGradient>`;
}

export function radial(id, stops) {
  const s = stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? "" : ` stop-opacity="${a}"`}/>`).join("");
  return `<radialGradient id="${id}">${s}</radialGradient>`;
}

/** Rolling ridge as a closed path to the bottom edge. */
export function ridge(seed, y, amp, { bottom = H, detail = 1 } = {}) {
  const r = rng(seed);
  const p1 = r() * 6, p2 = r() * 6, p3 = r() * 6;
  const pts = [];
  for (let x = -20; x <= W + 20; x += 16) {
    const yy = y + amp * (0.55 * Math.sin(x / 120 + p1) + 0.3 * Math.sin(x / 47 + p2) * detail + 0.15 * Math.sin(x / 21 + p3) * detail);
    pts.push(`${f(x)} ${f(yy)}`);
  }
  return `M${pts.join("L")}L${W + 20} ${bottom}L-20 ${bottom}Z`;
}

export const path = (d, fill, extra = "") => (extra.includes("fill=") ? `<path d="${d}" ${extra}/>` : `<path d="${d}" fill="${fill}" ${extra}/>`);
export const circ = (cx, cy, r, fill, extra = "") => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${fill}" ${extra}/>`;
export const ell = (cx, cy, rx, ry, fill, extra = "") => `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${fill}" ${extra}/>`;
export const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}" ${extra}/>`;
export const g = (inner, transform = "", extra = "") => `<g${transform ? ` transform="${transform}"` : ""} ${extra}>${inner}</g>`;

export function mist(y, h, color, op = 0.5) {
  const id = `m${Math.round(y)}${color.replace("#", "")}`;
  return `<defs>${grad(id, [[0, color, 0], [1, color, op]])}</defs>${rect(0, y, W, h, `url(#${id})`)}`;
}

export function sky(stops) {
  return { defs: grad("sky", stops.map(([o, c]) => [o, c])), body: rect(0, 0, W, H, "url(#sky)") };
}

export function sun(x, y, r, color = "#fff3d2", glow = "#ffe2a8") {
  return `<defs>${radial("sunglow", [[0, glow, 0.9], [0.45, glow, 0.25], [1, glow, 0]])}</defs>` +
    circ(x, y, r * 3.2, "url(#sunglow)") + circ(x, y, r, color);
}

export function moon(x, y, r) {
  return circ(x, y, r * 2.4, "#ffffff", 'opacity="0.08"') + circ(x, y, r, "#fff6dc");
}

export function cloud(x, y, s, color = "#ffffff", op = 0.55) {
  return g(
    ell(0, 0, 60, 14, color) + ell(-28, -8, 30, 14, color) + ell(18, -14, 34, 16, color),
    `translate(${x} ${y}) scale(${s})`, `opacity="${op}"`,
  );
}

export function birds(x, y, s = 1, color = "#3a2a2a") {
  const b = (dx, dy, k) => `<path d="M${dx} ${dy}q${6 * k} ${-7 * k} ${12 * k} 0q${6 * k} ${-7 * k} ${12 * k} 0" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>`;
  return g(b(0, 0, 1) + b(30, -14, 0.8) + b(58, 6, 0.9), `translate(${x} ${y}) scale(${s})`);
}

/** Karst tower: bulging limestone spire with a vegetated crown. */
export function karst(x, base, w, h, rock, leaf, lit) {
  const top = base - h;
  const d = `M${x - w / 2} ${base}C${x - w * 0.6} ${base - h * 0.45} ${x - w * 0.34} ${top + h * 0.12} ${x - w * 0.1} ${top}` +
    `C${x + w * 0.06} ${top - h * 0.04} ${x + w * 0.2} ${top + h * 0.08} ${x + w * 0.3} ${top + h * 0.3}` +
    `C${x + w * 0.5} ${base - h * 0.4} ${x + w * 0.5} ${base - h * 0.12} ${x + w / 2} ${base}Z`;
  const crown = `M${x - w * 0.34} ${top + h * 0.2}Q${x - w * 0.2} ${top - h * 0.06} ${x - w * 0.02} ${top - h * 0.03}Q${x + w * 0.22} ${top + h * 0.02} ${x + w * 0.3} ${top + h * 0.28}Q${x + w * 0.1} ${top + h * 0.16} ${x - w * 0.1} ${top + h * 0.22}Q${x - w * 0.24} ${top + h * 0.26} ${x - w * 0.34} ${top + h * 0.2}Z`;
  const shade = `M${x + w * 0.04} ${top + h * 0.05}C${x + w * 0.3} ${top + h * 0.3} ${x + w * 0.46} ${base - h * 0.3} ${x + w / 2} ${base}L${x + w * 0.1} ${base}C${x + w * 0.2} ${base - h * 0.4} ${x + w * 0.16} ${top + h * 0.3} ${x + w * 0.04} ${top + h * 0.05}Z`;
  return path(d, rock) + path(shade, "#000", 'opacity="0.14"') + path(`M${x - w * 0.3} ${base}C${x - w * 0.42} ${base - h * 0.4} ${x - w * 0.3} ${top + h * 0.3} ${x - w * 0.1} ${top + h * 0.06}C${x - w * 0.22} ${top + h * 0.4} ${x - w * 0.24} ${base - h * 0.3} ${x - w * 0.2} ${base}Z`, lit, 'opacity="0.35"') + path(crown, leaf);
}

export function pine(x, y, s, color, trunk = "#4a3328") {
  let tiers = "";
  for (let i = 0; i < 4; i++) {
    const w = (46 - i * 8) * s, top = y - (80 - i * 16) * s;
    tiers += path(`M${x - w} ${top + 34 * s}L${x} ${top - 6 * s}L${x + w} ${top + 34 * s}Z`, color);
  }
  return rect(x - 3 * s, y - 20 * s, 6 * s, 24 * s, trunk) + tiers;
}

export function palm(x, y, s, lean, color, trunk = "#6b4a34") {
  const tx = x + lean * s, ty = y - 150 * s;
  let fronds = "";
  const angs = [-160, -125, -90, -55, -20, 15, 195, 160];
  for (const a of angs) {
    const rad = (a * Math.PI) / 180;
    const ex = tx + Math.cos(rad) * 78 * s, ey = ty + Math.sin(rad) * 52 * s + 22 * s;
    const cx = tx + Math.cos(rad) * 40 * s, cy = ty + Math.sin(rad) * 52 * s - 18 * s;
    fronds += `<path d="M${f(tx)} ${f(ty)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}Q${f(cx + 4)} ${f(cy + 16 * s)} ${f(tx)} ${f(ty + 4 * s)}Z" fill="${color}"/>`;
  }
  return `<path d="M${x} ${y}Q${x + lean * 0.2 * s} ${y - 80 * s} ${tx} ${ty}" stroke="${trunk}" stroke-width="${6 * s}" fill="none" stroke-linecap="round"/>` + fronds;
}

export function boat(x, y, s, hull, canopy, hat = true, flip = false) {
  const body = path("M-70 0Q-40 22 0 22Q40 22 70 0Q40 6 0 6Q-40 6 -70 0Z", hull) +
    path("M-60 -2Q0 8 60 -2L56 -8Q0 2 -56 -8Z", "#000", 'opacity="0.18"') +
    (canopy ? path("M-24 -4Q0 -34 28 -4Z", canopy) : "");
  const person = hat
    ? circ(-44, -22, 7, "#3d2b22") + path("M-60 -22L-44 -42L-28 -22Z", "#e9c987") + path("M-52 -14L-36 -14L-34 4L-54 4Z", "#c4622d")
    : "";
  return g(body + person, `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`);
}

export function reflect(inner, y, opacity = 0.3) {
  return g(g(inner, `translate(0 ${y * 2}) scale(1 -1)`), "", `opacity="${opacity}"`);
}

export function water(y, top, bottom, id = "water") {
  return `<defs>${grad(id, [[0, top], [1, bottom]])}</defs>` + rect(0, y, W, H - y, `url(#${id})`);
}

export function ripples(y0, y1, color = "#ffffff", op = 0.18, seed = 7, n = 16) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < n; i++) {
    const x = r() * W, y = y0 + r() * (y1 - y0), w = 30 + r() * 90;
    out += `<path d="M${f(x)} ${f(y)}h${f(w)}" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="${op}"/>`;
  }
  return out;
}

export function lantern(x, y, s, color, glow = "#ffd27a") {
  return `<defs>${radial("lg" + color.slice(1), [[0, glow, 0.7], [1, glow, 0]])}</defs>` +
    circ(x, y, 30 * s, `url(#lg${color.slice(1)})`) +
    `<path d="M${x} ${y - 24 * s}v${8 * s}" stroke="#3a2a2a" stroke-width="2"/>` +
    ell(x, y, 13 * s, 17 * s, color) + rect(x - 8 * s, y - 19 * s, 16 * s, 4 * s, "#3a2a2a") + rect(x - 8 * s, y + 15 * s, 16 * s, 3 * s, "#3a2a2a") +
    `<path d="M${x} ${y + 18 * s}v${12 * s}" stroke="${glow}" stroke-width="2"/>`;
}

export function grain() {
  return `<filter id="gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 0.07"/></feComponentTransfer></filter>`;
}

export function vignette() {
  return `<defs><radialGradient id="vg" cx="0.5" cy="0.45" r="0.75"><stop offset="0.78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1b0f0a" stop-opacity="0.13"/></radialGradient></defs>` + rect(0, 0, W, H, "url(#vg)");
}

/** Wraps a composition in the shared frame: grain + vignette. */
export function frame(defs, body, { bg = "#000" } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs>${defs}${grain()}</defs>${rect(0, 0, W, H, bg)}${body}${vignette()}<rect width="${W}" height="${H}" filter="url(#gr)"/></svg>`;
}
