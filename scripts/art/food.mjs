// Overhead food flat-lays on a linen table. Original illustrations, 800x600.
import { W, H, rng, radial, path, circ, ell, rect, g, frame } from "./lib.mjs";

const f = (n) => Number(n.toFixed(1));

function table(a, b, shadow = "#00000022") {
  const stripes = Array.from({ length: 40 }, (_, i) => rect(i * 22, 0, 10, H, b, 'opacity="0.35"')).join("");
  return { defs: `<radialGradient id="tbl" cx="0.5" cy="0.45" r="0.8"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`, body: rect(0, 0, W, H, "url(#tbl)") + stripes, shadow };
}
const shade = (inner, dx = 8, dy = 12) => g(inner, `translate(${dx} ${dy})`, 'opacity="0.22" style="filter:blur(0px)"');
const build = (t, body) => frame(t.defs, t.body + body);

function leaves(cx, cy, r, n, seed, c1 = "#4f8a52", c2 = "#7ab36a") {
  const R = rng(seed);
  let o = "";
  for (let i = 0; i < n; i++) {
    const a = R() * 6.28, d = R() * r, x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * 0.8, rot = R() * 360;
    o += `<path d="M0 0Q10 -14 0 -30Q-10 -14 0 0Z" transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(0.8)" fill="${i % 2 ? c1 : c2}"/>`;
  }
  return o;
}
const lime = (x, y, k = 1) => g(path("M-26 0A26 26 0 0 1 26 0Z", "#8fc24a") + path("M-20 0A20 20 0 0 1 20 0Z", "#d8ec9a") + [-12, 0, 12].map((d) => path(`M0 0L${d} -16`, "none", 'stroke="#8fc24a" stroke-width="2"')).join(""), `translate(${x} ${y}) rotate(-20) scale(${k})`);
const chili = (x, y, rot = 0) => g(path("M0 0Q24 -4 40 -22Q28 -2 0 8Z", "#d12a1e") + circ(0, 4, 4, "#2f6a3c"), `translate(${x} ${y}) rotate(${rot})`);
const chopsticks = (x, y, rot) => g(rect(0, 0, 360, 7, "#a8723a") + rect(0, 16, 360, 7, "#8f5e2e"), `translate(${x} ${y}) rotate(${rot})`);
const spoon = (x, y, rot) => g(ell(0, 0, 24, 15, "#f4efe6") + rect(20, -4, 120, 8, "#f4efe6"), `translate(${x} ${y}) rotate(${rot})`);

function noodleBowl({ a = "#e9d8b8", b = "#cfb78f", broth = "#c98a3a", noodle = "#fff3d6", tops = [], seed = 3, rim = "#fbf6ec", band = "#2f6aa0" }) {
  const t = table(a, b);
  const R = rng(seed);
  let swirl = "";
  for (let i = 0; i < 16; i++) {
    const rx = 70 + R() * 70, ry = 38 + R() * 60, rot = R() * 180, dash = `${f(160 + R() * 200)} ${f(30 + R() * 60)}`;
    swirl += `<ellipse cx="${f(400 + (R() - 0.5) * 24)}" cy="${f(300 + (R() - 0.5) * 24)}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="${noodle}" stroke-width="${f(9 + R() * 4)}" stroke-linecap="round" stroke-dasharray="${dash}" transform="rotate(${f(rot)} 400 300)" opacity="${f(0.8 + R() * 0.2)}"/>`;
  }
  let bits = "";
  tops.forEach((k, i) => {
    const ang = (i / Math.max(tops.length, 1)) * 6.28 + R(), x = 400 + Math.cos(ang) * 92, y = 300 + Math.sin(ang) * 80;
    if (k === "beef") bits += ell(x, y, 34, 14, "#b2554a") + ell(x, y, 28, 9, "#d77a68");
    if (k === "pork") bits += ell(x, y, 30, 18, "#e7b7a0") + ell(x, y, 20, 10, "#f3d3c2");
    if (k === "egg") bits += ell(x, y, 26, 20, "#fffdf6") + circ(x, y, 10, "#f2b225");
    if (k === "shrimp") bits += path(`M${f(x - 24)} ${f(y)}Q${f(x)} ${f(y - 30)} ${f(x + 24)} ${f(y)}Q${f(x)} ${f(y - 12)} ${f(x - 24)} ${f(y)}Z`, "#f08a6a");
    if (k === "herb") bits += leaves(x, y, 20, 6, i + 3);
    if (k === "chili") bits += [0, 1, 2].map((j) => circ(x + j * 9 - 9, y + (j % 2) * 8, 6, "#d12a1e")).join("");
    if (k === "onion") bits += [0, 1, 2, 3, 4].map((j) => circ(x + j * 8 - 16, y + (j % 2) * 7, 4, "#6fb85a")).join("");
    if (k === "peanut") bits += [0, 1, 2, 3, 4, 5].map((j) => ell(x + (j % 3) * 12 - 12, y + Math.floor(j / 3) * 12, 6, 4.5, "#c8964a")).join("");
    if (k === "crisp") bits += path(`M${f(x - 30)} ${f(y - 14)}h60v28h-60z`, "#d9a95a") + [0, 1, 2].map((j) => circ(x - 18 + j * 18, y, 6, "#b9843a")).join("");
    if (k === "sprout") bits += [0, 1, 2, 3, 4].map((j) => `<path d="M${f(x - 18 + j * 9)} ${f(y - 10)}q6 10 0 22" stroke="#f4f0dc" stroke-width="3" fill="none"/>`).join("");
    if (k === "lemongrass") bits += rect(x - 30, y - 3, 60, 6, "#d8c46a");
  });
  const body = shade(circ(400, 300, 230, "#000")) +
    circ(400, 300, 230, rim) + circ(400, 300, 212, band, 'opacity="0.9"') + circ(400, 300, 200, rim) + circ(400, 300, 168, broth) +
    `<g>${swirl}</g>` + bits + lime(560, 150, 1.1) + chopsticks(120, 480, -12) + spoon(670, 470, 20) + chili(560, 450, 10);
  return build(t, body);
}

const pho = () => noodleBowl({ broth: "#b87b36", noodle: "#fff7e2", tops: ["beef", "onion", "herb", "beef", "onion", "chili"], seed: 3 });
const bunBo = () => noodleBowl({ a: "#e8d3b0", b: "#cdb085", broth: "#c2412a", noodle: "#fff0cf", tops: ["lemongrass", "pork", "herb", "chili", "pork", "onion"], seed: 5, band: "#c4622d" });
const miQuang = () => noodleBowl({ a: "#ecd9b4", b: "#d1b684", broth: "#e0a22c", noodle: "#f6cf5a", tops: ["shrimp", "egg", "peanut", "herb", "crisp", "pork"], seed: 7, band: "#3a8a78" });
const huTieu = () => noodleBowl({ a: "#e7dcc4", b: "#c9b894", broth: "#e8c88a", noodle: "#fffaf0", tops: ["shrimp", "pork", "egg", "onion", "herb", "shrimp"], seed: 9, band: "#6a8ac4" });
const caoLau = () => noodleBowl({ a: "#e6d1ae", b: "#c9aa7c", broth: "#8a5a2a", noodle: "#e9c98a", tops: ["pork", "herb", "sprout", "crisp", "herb", "chili"], seed: 11, band: "#a8321e" });

function bunCha() {
  const t = table("#ead9ba", "#cdb48a");
  const R = rng(13);
  let nest = "";
  for (let i = 0; i < 14; i++) nest += `<ellipse cx="${f(300 + (R() - 0.5) * 20)}" cy="${f(300 + (R() - 0.5) * 20)}" rx="${f(50 + R() * 90)}" ry="${f(34 + R() * 70)}" fill="none" stroke="#fffaf0" stroke-width="${f(9 + R() * 4)}" stroke-linecap="round" stroke-dasharray="${f(150 + R() * 220)} ${f(30 + R() * 50)}" transform="rotate(${f(R() * 180)} 300 300)"/>`;
  let patties = "";
  for (let i = 0; i < 7; i++) patties += circ(520 + (i % 3) * 70 - 20, 150 + Math.floor(i / 3) * 70, 34, "#8a5030") + circ(520 + (i % 3) * 70 - 22, 150 + Math.floor(i / 3) * 70 - 4, 26, "#a8663a") + [0, 1, 2].map(() => circ(520 + (i % 3) * 70 - 20 + (R() - 0.5) * 30, 150 + Math.floor(i / 3) * 70 + (R() - 0.5) * 30, 4, "#4a2a18")).join("");
  const body = shade(circ(300, 300, 190, "#000")) + circ(300, 300, 190, "#fbf6ec") + circ(300, 300, 170, "#2f6aa0", 'opacity="0.85"') + circ(300, 300, 162, "#e6ebee") + nest +
    shade(circ(600, 220, 150, "#000"), 8, 10) + circ(600, 220, 150, "#fbf6ec") + circ(600, 220, 134, "#e8c88a") + patties + leaves(640, 340, 50, 8, 2) +
    shade(circ(630, 470, 80, "#000")) + circ(630, 470, 80, "#fbf6ec") + circ(630, 470, 66, "#d9a86a") + [0, 1, 2, 3, 4].map((i) => circ(612 + i * 12, 462 + (i % 2) * 14, 8, "#f08a2a")).join("") + circ(630, 470, 66, "none", 'stroke="#c78a46" stroke-width="2"') +
    leaves(180, 500, 50, 10, 4) + chili(120, 440, 0) + lime(260, 520, 1) + chopsticks(60, 540, -6);
  return build(t, body);
}

function banhMi() {
  const t = table("#e8d4b2", "#c8aa7a");
  const paper = rect(80, 200, 640, 220, "#f3ecd8", 'transform="rotate(-8 400 300)"') + Array.from({ length: 9 }, (_, i) => rect(110, 220 + i * 22, 580, 4, "#2a2a2a", 'opacity="0.25" transform="rotate(-8 400 300)"')).join("");
  const loaf = (cx, cy, rot) => g(path("M-250 0Q-250 -66 -170 -70H170Q250 -66 250 0Q250 66 170 70H-170Q-250 66 -250 0Z", "#d99a46") + path("M-240 -4Q-240 -52 -170 -58H170Q240 -52 240 -4Q220 -34 170 -36H-170Q-220 -34 -240 -4Z", "#f2c06a") + [-150, -70, 10, 90, 160].map((x) => path(`M${x} -50l30 10`, "none", 'stroke="#b87a30" stroke-width="5" stroke-linecap="round"')).join(""), `translate(${cx} ${cy}) rotate(${rot})`);
  const fill = g(path("M-210 -24Q0 -60 210 -24Q210 4 0 8Q-210 4 -210 -24Z", "#c9d878") + leaves(0, -22, 160, 14, 3) + [-150, -80, 0, 90, 150].map((x, i) => ell(x, -8 + (i % 2) * 6, 26, 9, i % 2 ? "#e8b78a" : "#f4d0a8")).join("") + [-120, -30, 60, 130].map((x) => ell(x, -26, 20, 7, "#f08a4a")).join("") + [-170, -40, 110].map((x) => circ(x, -18, 5, "#d12a1e")).join(""), "translate(400 300) rotate(-8)");
  return build(t, paper + shade(loaf(400, 300, -8), 10, 16) + loaf(400, 300, -8) + fill + chili(620, 470, -20) + lime(120, 480, 1) + leaves(120, 140, 40, 8, 5));
}

function comTam() {
  const t = table("#ebd7b6", "#cdb086");
  const R = rng(17);
  let grains = "";
  for (let i = 0; i < 60; i++) grains += ell(300 + (R() - 0.5) * 220, 300 + (R() - 0.5) * 180, 5, 2.5, "#ffffff", `transform="rotate(${f(R() * 180)} 300 300)" opacity="0.8"`);
  const chop = g(path("M-90 -50Q0 -70 90 -40Q110 0 80 46Q0 70 -80 46Q-110 0 -90 -50Z", "#a05a2a") + path("M-70 -36Q0 -52 70 -28Q84 0 60 34Q0 50 -60 34Q-84 0 -70 -36Z", "#c47a3a") + [-50, -20, 10, 40].map((x) => path(`M${x} -40L${x + 20} 40`, "none", 'stroke="#5a2e14" stroke-width="5" opacity="0.5"')).join(""), "translate(470 250) rotate(-12)");
  const egg = ell(560, 410, 54, 44, "#fffdf6") + circ(560, 410, 20, "#f2b225");
  const cuke = [0, 1, 2, 3].map((i) => circ(160 + i * 26, 470 + (i % 2) * 14, 18, "#b7d98a") + circ(160 + i * 26, 470 + (i % 2) * 14, 11, "#d7ecb0")).join("");
  const tom = [0, 1, 2].map((i) => circ(180 + i * 30, 120 + (i % 2) * 14, 20, "#e0432b") + circ(180 + i * 30, 120 + (i % 2) * 14, 11, "#f08a6a")).join("");
  const body = shade(circ(320, 300, 250, "#000")) + circ(320, 300, 250, "#fbf6ec") + circ(320, 300, 232, "#d9534a", 'opacity="0.55"') + circ(320, 300, 224, "#fbf6ec") +
    path("M170 330Q230 200 340 210Q430 240 440 330Q420 400 320 410Q210 410 170 330Z", "#fffdf6") + grains + chop + egg + cuke + tom +
    shade(circ(660, 150, 70, "#000")) + circ(660, 150, 70, "#fbf6ec") + circ(660, 150, 56, "#c58a3c") + [0, 1, 2].map((i) => circ(640 + i * 18, 144 + (i % 2) * 14, 6, "#d12a1e")).join("") + chili(560, 520, 6);
  return build(t, body);
}

function seafood() {
  const t = table("#d9e4e0", "#aebfb8");
  const prawn = (x, y, rot, c) => g(path("M-60 10Q-70 -40 -20 -50Q30 -56 56 -20Q66 0 50 10Q40 -10 10 -12Q-30 -14 -40 20Z", c) + [-30, -10, 10, 30].map((px) => path(`M${px} -48V-6`, "none", 'stroke="#00000030" stroke-width="3"')).join("") + path("M54 -12Q80 -26 96 -10", "none", 'stroke="#f08a6a" stroke-width="3" fill="none"') + circ(40, -22, 3, "#2a2a2a"), `translate(${x} ${y}) rotate(${rot})`);
  const crab = g(ell(0, 0, 70, 52, "#d9482b") + ell(0, 6, 56, 38, "#e8664a") + [-1, 1].map((s) => path(`M${s * 60} -20Q${s * 120} -50 ${s * 120} -90Q${s * 90} -70 ${s * 70} -50Z`, "#d9482b")).join("") + [-40, -22, 22, 40].map((x) => path(`M${x} 40L${x * 1.5} 80`, "none", 'stroke="#d9482b" stroke-width="7" stroke-linecap="round"')).join(""), "translate(520 380)");
  const squid = [0, 1, 2, 3, 4].map((i) => circ(200 + i * 36, 440 + (i % 2) * 8, 18, "#f5e9d6") + circ(200 + i * 36, 440 + (i % 2) * 8, 9, "#d8c7aa")).join("");
  const body = shade(ell(400, 320, 330, 240, "#000")) + ell(400, 320, 330, 240, "#fbf6ec") + ell(400, 320, 308, 222, "#2f6aa0", 'opacity="0.35"') + ell(400, 320, 300, 214, "#fbf6ec") +
    prawn(220, 220, -12, "#f09a78") + prawn(360, 170, 8, "#f08a6a") + prawn(250, 330, 4, "#f4a688") + crab + squid + leaves(430, 270, 70, 10, 6) + lime(330, 480, 1.1) + lime(660, 230, 1) + chili(620, 470, -10);
  return build(t, body);
}

function fruit() {
  const t = table("#f0e0c0", "#d4b888");
  const mango = (x, y, r) => g(ell(0, 0, 70, 52, "#f2b432") + ell(-10, -8, 50, 32, "#f8d060") + path("M-62 -20Q-20 -50 40 -40", "none", 'stroke="#fff3b0" stroke-width="5" opacity="0.7"'), `translate(${x} ${y}) rotate(${r})`);
  const dragon = (x, y) => g(circ(0, 0, 62, "#d6246e") + circ(0, 0, 52, "#fff6fb") + Array.from({ length: 36 }, (_, i) => circ(Math.cos(i) * (i % 6) * 8, Math.sin(i * 1.7) * (i % 5) * 9, 2.5, "#2a1a24")).join("") + path("M-58 -26Q-70 -44 -50 -54M58 -26Q70 -44 50 -54", "none", 'stroke="#6fb85a" stroke-width="8" fill="none" stroke-linecap="round"'), `translate(${x} ${y})`);
  const ramb = (x, y) => circ(x, y, 34, "#d12a2e") + Array.from({ length: 16 }, (_, i) => path(`M${f(x + Math.cos(i * 0.4) * 30)} ${f(y + Math.sin(i * 0.4) * 30)}l${f(Math.cos(i * 0.4) * 12)} ${f(Math.sin(i * 0.4) * 12)}`, "none", 'stroke="#7ab33a" stroke-width="4" stroke-linecap="round"')).join("");
  const mang = (x, y) => circ(x, y, 34, "#6a2a58") + circ(x, y, 14, "#7ab35a") + circ(x, y, 8, "#4f8a42");
  const banana = (x, y, r) => g(path("M-90 20Q-20 80 90 -20Q60 20 -60 40Q-80 40 -90 20Z", "#f4d24a") + path("M-80 24Q-10 70 80 -12", "none", 'stroke="#d8b030" stroke-width="3" fill="none"'), `translate(${x} ${y}) rotate(${r})`);
  const body = shade(ell(400, 310, 330, 250, "#000"), 10, 14) + ell(400, 310, 330, 250, "#b9825a") + ell(400, 310, 316, 238, "#cf9a6a") + leaves(120, 130, 60, 12, 8) + leaves(690, 480, 60, 12, 9) +
    mango(240, 220, -10) + mango(300, 360, 20) + dragon(500, 210) + dragon(640, 340) + ramb(430, 400) + ramb(500, 470) + ramb(380, 470) + mang(180, 440) + mang(240, 490) + banana(420, 320, -14) + lime(600, 150, 1);
  return build(t, body);
}

function biaHoi() {
  const t = table("#d9c49a", "#a88a58");
  const mug = (x, y) => shade(circ(x, y, 100, "#000"), 8, 14) + circ(x, y, 100, "#e8dfcc", 'opacity="0.9"') + circ(x, y, 86, "#f2b02a") + circ(x, y, 86, "none", 'stroke="#c88a1a" stroke-width="4"') + Array.from({ length: 22 }, (_, i) => circ(x + Math.cos(i * 1.1) * (i % 7) * 11, y + Math.sin(i * 1.7) * (i % 5) * 12, 6 + (i % 3) * 2, "#fff8e0")).join("") + path(`M${x + 100} ${y}q50 -4 46 30q-4 34 -50 20`, "none", 'stroke="#d8cfba" stroke-width="12" fill="none"');
  const nuts = shade(circ(200, 440, 90, "#000"), 6, 10) + circ(200, 440, 90, "#fbf6ec") + circ(200, 440, 74, "#c8964a") + Array.from({ length: 24 }, (_, i) => ell(200 + Math.cos(i) * (i % 6) * 10, 440 + Math.sin(i * 2) * (i % 5) * 10, 8, 5.5, "#e6b866")).join("");
  const body = mug(430, 250) + nuts + shade(ell(620, 450, 120, 70, "#000"), 6, 10) + ell(620, 450, 120, 70, "#fbf6ec") + [0, 1, 2, 3].map((i) => path(`M${540 + i * 40} 430q20 -20 40 0q-20 40 -40 0Z`, "#e8b87a")).join("") + lime(640, 130, 1.1) + leaves(100, 130, 40, 6, 10);
  return build(t, body);
}

function icedCoffee() {
  const t = table("#e0cdb0", "#bda27a");
  const cube = (x, y, r) => rect(-26, -26, 52, 52, "#ffffff", `transform="translate(${x} ${y}) rotate(${r})" opacity="0.5" rx="8"`);
  const glass = shade(circ(330, 300, 190, "#000"), 10, 16) + circ(330, 300, 190, "#f2eadb", 'opacity="0.85"') + circ(330, 300, 168, "#3a2214") + `<path d="M170 300C220 180 340 160 440 240C500 290 470 400 380 440C270 480 180 400 170 300Z" fill="#c89a62" opacity="0.8"/>` + `<path d="M200 330C240 230 330 210 400 260C440 290 430 360 360 390C290 410 220 380 200 330Z" fill="#f2e2c4" opacity="0.9"/>` + cube(280, 270, 12) + cube(380, 340, -18) + cube(330, 240, 30) + `<path d="M330 300L520 130" stroke="#e8e0d0" stroke-width="12" stroke-linecap="round"/>`;
  const phin = shade(circ(620, 190, 90, "#000"), 8, 12) + circ(620, 190, 90, "#c8ccd0") + circ(620, 190, 70, "#a8adb2") + circ(620, 190, 30, "#e0e3e6") + circ(620, 190, 12, "#6a6f74");
  const saucer = shade(circ(600, 450, 100, "#000"), 6, 10) + circ(600, 450, 100, "#fbf6ec") + circ(600, 450, 60, "#3a2214") + circ(600, 450, 60, "none", 'stroke="#e8dfcc" stroke-width="10"');
  return build(t, glass + phin + saucer + leaves(110, 500, 40, 6, 12));
}

function eggCoffee() {
  const t = table("#e6d2b2", "#bfa376");
  const cup = (x, y, r, foam) => shade(circ(x, y, r + 14, "#000"), 8, 14) + circ(x, y, r + 20, "#fbf6ec") + circ(x, y, r, "#e8dfcc") + circ(x, y, r - 8, foam) + `<path d="M${x - r + 30} ${y}q${r / 3} -${r / 2} ${r / 1.2} 0t${r / 1.2} 0" stroke="#a8683a" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.7"/>` + path(`M${x + r + 18} ${y - 20}q60 -8 54 28q-6 36 -56 22`, "none", 'stroke="#fbf6ec" stroke-width="14" fill="none"');
  const bath = shade(circ(570, 440, 110, "#000"), 6, 10) + circ(570, 440, 110, "#fbf6ec") + circ(570, 440, 92, "#2f6aa0", 'opacity="0.55"') + circ(570, 440, 80, "#cfe2e8") + circ(570, 440, 50, "#e8dfcc") + circ(570, 440, 38, "#f6d8a0");
  return build(t, cup(300, 270, 130, "#f6d37a") + bath + spoon(180, 520, -18) + leaves(640, 140, 50, 8, 14));
}

function highlandCoffee() {
  const t = table("#d8c2a0", "#a88a62");
  const R = rng(19);
  let cherries = "", beans = "";
  for (let i = 0; i < 22; i++) cherries += circ(250 + (R() - 0.5) * 300, 250 + (R() - 0.5) * 220, 18, i % 3 ? "#c4262d" : "#e0501e") + circ(244 + (R() - 0.5) * 300, 244, 4, "#ffffff", 'opacity="0.35"');
  for (let i = 0; i < 18; i++) beans += g(ell(0, 0, 18, 12, "#5a3a22") + path("M-16 0Q0 -6 16 0", "none", 'stroke="#2a180c" stroke-width="3"'), `translate(${f(560 + (R() - 0.5) * 200)} ${f(400 + (R() - 0.5) * 170)}) rotate(${f(R() * 180)})`);
  const body = shade(circ(280, 270, 230, "#000"), 10, 14) + circ(280, 270, 230, "#b88a4a") + circ(280, 270, 210, "#d8aa68") + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => path(`M${f(280 + Math.cos(i) * 210)} ${f(270 + Math.sin(i) * 210)}L${f(280 + Math.cos(i + 0.6) * 210)} ${f(270 + Math.sin(i + 0.6) * 210)}`, "none", 'stroke="#a8783a" stroke-width="6"')).join("") + cherries + leaves(130, 120, 70, 10, 15, "#2e6f3a", "#4f9a50") + leaves(430, 130, 60, 8, 16, "#2e6f3a", "#4f9a50") + beans;
  return build(t, body + shade(circ(660, 160, 90, "#000"), 6, 10) + circ(660, 160, 90, "#fbf6ec") + circ(660, 160, 64, "#2a180c"));
}

function artichokeTea() {
  const t = table("#dce6d2", "#a9bd9c");
  const flower = (x, y, k) => g(Array.from({ length: 10 }, (_, i) => `<path d="M0 0Q16 -26 0 -52Q-16 -26 0 0Z" transform="rotate(${i * 36}) translate(0 -8)" fill="${i % 2 ? "#8a9a6a" : "#a8b884"}"/>`).join("") + circ(0, 0, 14, "#c8a8c8"), `translate(${x} ${y}) scale(${k})`);
  const body = shade(circ(330, 300, 200, "#000"), 10, 14) + circ(330, 300, 200, "#fbf6ec", 'opacity="0.95"') + circ(330, 300, 176, "#c98a2e") + circ(330, 300, 176, "none", 'stroke="#e8b85a" stroke-width="6" opacity="0.6"') + flower(300, 280, 1.1) + flower(380, 340, 0.9) + `<path d="M520 270q70 -10 64 36q-6 46 -66 28" stroke="#fbf6ec" stroke-width="18" fill="none"/>` +
    shade(ell(610, 470, 120, 70, "#000"), 6, 10) + ell(610, 470, 120, 70, "#fbf6ec") + flower(560, 470, 0.7) + flower(630, 480, 0.7) + flower(670, 450, 0.6) + leaves(140, 130, 70, 10, 17, "#4f8a52", "#7ab36a");
  return build(t, body);
}

function marketPlates() {
  const t = table("#e6cfa8", "#c4a578");
  const plate = (x, y, r, rim, fill, inner) => shade(circ(x, y, r, "#000"), 6, 10) + circ(x, y, r, rim) + circ(x, y, r * 0.82, fill) + inner;
  const R = rng(23);
  const body =
    plate(230, 200, 130, "#fbf6ec", "#e8c88a", [0, 1, 2, 3, 4, 5].map((i) => ell(230 + Math.cos(i) * 56, 200 + Math.sin(i) * 44, 30, 14, i % 2 ? "#b2554a" : "#d77a68")).join("") + leaves(230, 200, 30, 6, 1)) +
    plate(520, 170, 110, "#fbf6ec", "#f3ecd8", [0, 1, 2, 3].map((i) => rect(470 + i * 22, 110, 14, 120, "#c8964a", `rx="7"`)).join("")) +
    plate(660, 340, 120, "#fbf6ec", "#fff6dc", Array.from({ length: 18 }, () => circ(660 + (R() - 0.5) * 130, 340 + (R() - 0.5) * 130, 8, "#f1d9a0")).join("") + leaves(690, 300, 36, 5, 2)) +
    plate(250, 450, 120, "#fbf6ec", "#d9a86a", [0, 1, 2, 3].map((i) => ell(210 + i * 22, 440 + (i % 2) * 24, 18, 36, "#c4622d")).join("")) +
    plate(500, 460, 100, "#fbf6ec", "#9ac26a", leaves(500, 460, 60, 14, 3, "#3f7a46", "#7ab35a")) + chopsticks(60, 560, -4) + lime(120, 330, 1);
  return build(t, body);
}

function stickyRice() {
  const t = table("#d9c9a0", "#b09a68");
  const leaf = g(path("M-170 -110Q0 -150 170 -110L190 100Q0 150 -190 100Z", "#3f7a46") + path("M-150 -90Q0 -120 150 -90L168 84Q0 126 -168 84Z", "#5f9a58") + [-100, -40, 20, 80].map((x) => path(`M${x} -110L${x + 14} 110`, "none", 'stroke="#2e6a3a" stroke-width="3" opacity="0.6"')).join(""), "translate(280 300) rotate(-8)");
  const rice = g(ell(0, 0, 130, 76, "#fffdf2") + Array.from({ length: 40 }, (_, i) => ell(Math.cos(i * 2.1) * (i % 9) * 12, Math.sin(i * 1.3) * (i % 6) * 9, 7, 3, i % 4 ? "#f4efd8" : "#fffef8", `transform="rotate(${i * 20})"`)).join("") + Array.from({ length: 14 }, (_, i) => circ(Math.cos(i * 3) * 60, Math.sin(i * 4) * 36, 2.2, "#2a2a2a")).join(""), "translate(280 300) rotate(-8)");
  const skewer = (x, y, rot) => g(rect(-150, -3, 300, 6, "#b88a4a") + [0, 1, 2, 3].map((i) => ell(-100 + i * 62, 0, 26, 22, ["#a05a2a", "#c47a3a", "#8a4a22", "#b86a30"][i])).join(""), `translate(${x} ${y}) rotate(${rot})`);
  return build(t, shade(leaf, 10, 14) + leaf + rice + skewer(580, 180, 10) + skewer(590, 260, 6) + skewer(600, 340, 12) + skewer(590, 420, 4) + chili(420, 520, 6) + lime(120, 520, 1));
}

function fishAmok() {
  const t = table("#d9c6a2", "#a8905f");
  const banana = g(path("M-150 -150Q0 -200 150 -150L200 -20Q0 -80 -200 -20Z", "#3f7a46") + rect(-140, -30, 280, 190, "#f4a52a", 'rx="46"') + rect(-120, -20, 240, 168, "#f2b84a", 'rx="40"') + `<path d="M-80 70C-40 20 40 20 80 70C40 110 -40 110 -80 70Z" fill="#fff7e0" opacity="0.9"/>` + Array.from({ length: 8 }, (_, i) => circ(Math.cos(i) * 70, 60 + Math.sin(i * 2) * 28, 6, "#d12a1e")).join("") + leaves(0, 30, 90, 8, 4, "#4f8a52", "#7ab36a"), "translate(330 280)");
  const rice = shade(circ(630, 440, 100, "#000"), 6, 10) + circ(630, 440, 100, "#fbf6ec") + circ(630, 440, 84, "#fffdf6") + Array.from({ length: 50 }, (_, i) => ell(630 + Math.cos(i * 2.3) * (i % 8) * 9, 440 + Math.sin(i * 1.7) * (i % 7) * 9, 6, 2.5, "#f2eddc", `transform="rotate(${i * 25} 630 440)"`)).join("");
  return build(t, shade(banana, 8, 14) + banana + rice + lime(560, 130, 1.1) + chili(120, 500, -10) + leaves(660, 150, 60, 8, 5));
}

function coldDrink() {
  const t = table("#e0efe8", "#a9cfc0");
  const coco = shade(circ(280, 300, 190, "#000"), 10, 14) + circ(280, 300, 190, "#7ab35a") + circ(280, 300, 170, "#a9d87a") + circ(280, 300, 130, "#f4f0d8") + circ(280, 300, 118, "#fbf8e8") + `<path d="M280 300L440 160" stroke="#c4622d" stroke-width="12" stroke-linecap="round"/>`;
  const glass = shade(circ(610, 360, 130, "#000"), 8, 12) + circ(610, 360, 130, "#e8f4ee", 'opacity="0.9"') + circ(610, 360, 112, "#b6e08a") + Array.from({ length: 6 }, (_, i) => rect(-24, -24, 48, 48, "#ffffff", `rx="8" opacity="0.5" transform="translate(${f(560 + (i % 3) * 50)} ${f(320 + Math.floor(i / 3) * 60)}) rotate(${i * 21})"`)).join("") + leaves(610, 360, 40, 6, 7, "#2e8a46", "#5fb868") + lime(540, 470, 1.1);
  return build(t, coco + glass + lime(160, 500, 1) + leaves(150, 120, 40, 6, 8, "#2e8a46", "#5fb868"));
}

function khmerMeal() {
  const t = table("#e7d3ac", "#bb9a66");
  const mat = rect(30, 40, 740, 520, "#5f8a50", 'rx="12" opacity="0.28"');
  const bowl = (x, y, r, c, inner = "") => shade(circ(x, y, r, "#000"), 6, 10) + circ(x, y, r, "#fbf6ec") + circ(x, y, r * 0.82, c) + inner;
  const body = mat + bowl(250, 300, 150, "#fffdf6", Array.from({ length: 60 }, (_, i) => ell(250 + Math.cos(i * 2.3) * (i % 9) * 11, 300 + Math.sin(i * 1.7) * (i % 7) * 11, 6, 2.5, "#f2eddc", `transform="rotate(${i * 25} 250 300)"`)).join("")) +
    bowl(560, 170, 110, "#e8a22a", leaves(560, 170, 50, 8, 2) + [0, 1, 2].map((i) => circ(530 + i * 28, 160 + (i % 2) * 24, 10, "#7ab35a")).join("")) +
    bowl(580, 440, 100, "#f2d28a", [0, 1, 2, 3, 4].map((i) => ell(540 + i * 20, 430 + (i % 2) * 18, 20, 12, "#c4622d")).join("")) +
    bowl(130, 130, 70, "#a8321e") + lime(430, 520, 1.1) + chopsticks(40, 540, -4) + leaves(420, 90, 40, 6, 3);
  return build(t, body);
}

function nightSnacks() {
  const t = table("#2a2038", "#171225");
  const glow = `<defs>${radial("ng", [[0, "#ffd27a", 0.5], [1, "#ffd27a", 0]])}</defs>` + circ(400, 300, 400, "url(#ng)");
  const bulbs = Array.from({ length: 12 }, (_, i) => circ(40 + i * 66, 40 + Math.sin(i) * 14, 8, "#ffd27a")).join("") + '<path d="M0 50Q200 90 400 50T800 50" stroke="#1a1426" stroke-width="3" fill="none"/>';
  const tray = shade(rect(100, 140, 600, 360, "#000"), 10, 14) + rect(100, 140, 600, 360, "#c8964a", 'rx="24"') + rect(116, 156, 568, 328, "#e8c27a", 'rx="18"');
  const sk = (y, c1, c2) => rect(140, y, 520, 6, "#8a5a2a") + [0, 1, 2, 3, 4, 5].map((i) => ell(180 + i * 84, y + 3, 30, 22, i % 2 ? c1 : c2)).join("");
  return build(t, glow + bulbs + tray + sk(210, "#a05a2a", "#c47a3a") + sk(290, "#d9a24a", "#b2554a") + sk(370, "#8a4a22", "#d77a68") + [0, 1, 2].map((i) => circ(220 + i * 160, 450, 18, "#ffffff", 'opacity="0.9"')).join("") + chili(620, 450, 10));
}

export const foods = {
  "food-pho": pho, "food-bun-bo": bunBo, "food-mi-quang": miQuang, "food-hu-tieu": huTieu, "food-cao-lau": caoLau,
  "food-bun-cha": bunCha, "food-banh-mi": banhMi, "food-com-tam": comTam, "food-seafood": seafood, "food-fruit": fruit,
  "food-bia-hoi": biaHoi, "food-iced-coffee": icedCoffee, "food-egg-coffee": eggCoffee, "food-highland-coffee": highlandCoffee,
  "food-artichoke-tea": artichokeTea, "food-market-plates": marketPlates, "food-sticky-rice": stickyRice, "food-fish-amok": fishAmok,
  "food-cold-drink": coldDrink, "food-khmer-meal": khmerMeal, "food-night-snacks": nightSnacks,
};
