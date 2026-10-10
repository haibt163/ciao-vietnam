// More place scenes: buildings, memory and history. Each returns a complete SVG string (800x600).
import { W, H, rng, grad, radial, ridge, path, circ, ell, rect, g, mist, sky, sun, moon, cloud, birds, pine, palm, boat, reflect, water, ripples, lantern, frame } from "./lib.mjs";

const build = (s, ...parts) => frame(s.defs, s.body + parts.join(""));

/** Upturned-eave roof tier. */
const roof = (cx, y, w, h, color, trim = "#00000030") =>
  path(`M${cx - w / 2 - 16} ${y - 12}Q${cx - w / 2 + 4} ${y + 4} ${cx - w / 2 + 30} ${y - 6}L${cx - 16} ${y - h}L${cx + 16} ${y - h}L${cx + w / 2 - 30} ${y - 6}Q${cx + w / 2 - 4} ${y + 4} ${cx + w / 2 + 16} ${y - 12}Z`, color) +
  path(`M${cx - w / 2 + 30} ${y - 6}L${cx + w / 2 - 30} ${y - 6}L${cx + w / 2 - 30} ${y + 2}L${cx - w / 2 + 30} ${y + 2}Z`, trim);

const pagoda = (cx, base, s, tiers, wall, rf) => {
  let out = "";
  for (let i = 0; i < tiers; i++) {
    const w = (150 - i * 22) * s, y = base - i * 62 * s;
    out += rect(cx - w * 0.36, y - 40 * s, w * 0.72, 40 * s, wall) + rect(cx - w * 0.08, y - 36 * s, w * 0.16, 28 * s, "#3a2018") + roof(cx, y - 40 * s, w, 22 * s, rf);
  }
  return out + rect(cx - 2, base - tiers * 62 * s - 40 * s, 4, 26 * s, rf);
};

function mausoleum() {
  const s = sky([[0, "#c9e3ef"], [0.7, "#f6ead2"], [1, "#f1d9a8"]]);
  let cols = "";
  for (let i = 0; i < 9; i++) cols += rect(250 + i * 36, 300, 14, 120, "#e8e3d8") + rect(246 + i * 36, 296, 22, 8, "#cfc8b8");
  const plaza = rect(0, 440, W, 160, "#d8cdb9") + path("M0 600L260 440H540L800 600Z", "#c7bba5");
  let trees = "";
  const r = rng(5);
  for (let i = 0; i < 9; i++) trees += circ(40 + i * 92 + r() * 30, 430 + r() * 12, 34 + r() * 16, i % 2 ? "#4f8a52" : "#3b7446") + rect(36 + i * 92, 440, 8, 20, "#5b3624");
  return build(s, sun(650, 120, 28) + cloud(150, 110, 1.1) + cloud(480, 160, 0.8),
    path(ridge(2, 330, 18), "#b8ccc0"), rect(210, 250, 380, 190, "#f0ebe0"), path("M190 250L400 190L610 250Z", "#e2dccd"), rect(190, 250, 420, 18, "#9c8f78"), cols, rect(210, 420, 380, 22, "#bdb39f"),
    trees, plaza, g(rect(0, 0, 4, 80, "#5b3624") + path("M4 0H64V44H4Z", "#c4262d") + path("M34 8L38 20H50L40 27L44 39L34 31L24 39L28 27L18 20H30Z", "#ffd84a"), "translate(110 330)"), birds(520, 170, 1.1));
}

function westLake() {
  const s = sky([[0, "#f7d9b8"], [0.5, "#f1a784"], [1, "#b46a7d"]]);
  const far = path(ridge(30, 330, 10), "#7a5a6e", 'opacity="0.8"');
  const sea = water(340, "#e39a7e", "#5b3f5a", "wl");
  const pg = pagoda(560, 345, 0.62, 4, "#8a4f39", "#3a2a3e");
  let lotus = "";
  const r = rng(9);
  for (let i = 0; i < 9; i++) { const x = 80 + r() * 380, y = 450 + r() * 110; lotus += ell(x, y, 26, 10, "#4f7a58") + path(`M${f(x)} ${f(y - 4)}q-8 -22 0 -30q8 8 0 30z`, "#f4a6b8") + path(`M${f(x)} ${f(y - 4)}q-16 -12 -10 -24q10 6 10 24z`, "#f08aa0") + path(`M${f(x)} ${f(y - 4)}q16 -12 10 -24q-10 6 -10 24z`, "#f08aa0"); }
  return build(s, sun(300, 300, 44, "#fff0d0", "#ffd0a0") + cloud(160, 110, 1.2) + cloud(560, 90, 0.9) + birds(420, 150, 1), far, sea, g(reflect(pg, 345, 0.35)), pg, ripples(360, 580, "#ffe3c9", 0.3, 14, 22), lotus);
}

function maiChau() {
  const s = sky([[0, "#d5e8ee"], [0.6, "#f4ead2"], [1, "#f1d9a8"]]);
  const hills = path(ridge(40, 260, 50), "#9fbfae") + mist(250, 90, "#f4ead2", 0.6) + path(ridge(41, 320, 40), "#76a07f");
  let paddy = "";
  const cols = ["#a6cf6d", "#c5df86", "#8fc060", "#b9d777"];
  for (let i = 0; i < 9; i++) paddy += path(ridge(50 + i, 390 + i * 24, 10 + i, { detail: 0.4 }), cols[i % 4]);
  const house = (x, y, k) => g(path("M-6 0L40 -30L86 0Z", "#8c4a2e") + path("M-6 0L40 -30L86 0L80 6H0Z", "#5f3320") + rect(6, 0, 68, 30, "#d6a362") + rect(34, 8, 12, 22, "#5b3624") + [0, 1, 2, 3].map((i) => rect(4 + i * 20, 30, 4, 34, "#5b3624")).join("") + rect(0, 30, 80, 5, "#5b3624"), `translate(${x} ${y}) scale(${k})`);
  return build(s, sun(640, 120, 28, "#fff6dd", "#ffe9b5") + cloud(180, 100, 1.2) + cloud(520, 150, 0.8), hills, paddy, house(130, 470, 1.15), house(470, 500, 0.9), birds(400, 190, 1));
}

function forest() {
  const s = sky([[0, "#e6f1c9"], [1, "#b9d79a"]]);
  let layers = "";
  const g1 = ["#a9cd91", "#7fb27c", "#4f9060", "#2e6f4d", "#17503a"];
  for (let i = 0; i < 5; i++) {
    const r = rng(60 + i);
    let blobs = "";
    for (let k = 0; k < 18; k++) blobs += circ(k * 48 + r() * 24 - 20, 250 + i * 60 + r() * 30, 50 + r() * 38, g1[i]);
    layers += rect(0, 300 + i * 60, W, H, g1[i]) + blobs + mist(280 + i * 60, 50, "#e6f1c9", 0.35 - i * 0.05);
  }
  const rays = `<defs>${grad("ray", [[0, "#fff6c8", 0.5], [1, "#fff6c8", 0]])}</defs>` + [180, 330, 500, 640].map((x, i) => path(`M${x} 0L${x + 60} 0L${x + 140 + i * 20} 600L${x - 60} 600Z`, "url(#ray)", 'opacity="0.55"')).join("");
  const vines = [150, 360, 580].map((x, i) => `<path d="M${x} 0Q${x + 24 - i * 12} 120 ${x - 10} 230Q${x + 14} 300 ${x + 4} 360" stroke="#1d4a33" stroke-width="5" fill="none"/>`).join("");
  const walk = path("M120 600L360 470H440L680 600Z", "#7a5a3c") + [0, 1, 2, 3].map((i) => path(`M${180 + i * 48} 580L${370 + i * 14} 480`, "none", 'stroke="#5b3f27" stroke-width="3"')).join("");
  const gibbon = g(ell(0, 0, 8, 12, "#2b2118") + circ(0, -16, 7, "#2b2118") + path("M-6 -4Q-22 -26 -10 -46M6 -4Q22 -26 12 -46", "none", 'stroke="#2b2118" stroke-width="4" fill="none" stroke-linecap="round"'), "translate(520 250)");
  return build(s, layers, rays, vines, gibbon, walk);
}

function dragonBridge() {
  const s = sky([[0, "#0e1230"], [0.55, "#3a2a5a"], [1, "#c25a6a"]]);
  const sk = [70, 130, 190, 250, 600, 660, 720].map((x, i) => rect(x, 300 - (i % 3) * 36 - 40, 44, 120 + (i % 3) * 36, "#1b1c3c") + [0, 1, 2, 3].map((k) => rect(x + 8, 300 - (i % 3) * 36 - 24 + k * 24, 6, 8, "#ffd37a", 'opacity="0.8"')).join("")).join("");
  const river = water(380, "#6a3f6e", "#161a3a", "dr");
  const arc = (c) => `<path d="M30 380C150 240 260 330 400 280C540 230 650 340 770 380" stroke="${c}" stroke-width="12" fill="none" stroke-linecap="round"/>`;
  const spikes = Array.from({ length: 14 }, (_, i) => path(`M${70 + i * 48} ${360 - Math.sin(i / 2.2) * 70 - 12}l8 -20l8 20z`, "#ffb02e")).join("");
  const head = path("M740 380C760 350 790 340 800 360L780 380Z", "#ffb02e") + circ(778, 362, 5, "#fff");
  const glow = `<defs>${radial("dg", [[0, "#ffd37a", 0.5], [1, "#ffd37a", 0]])}</defs>` + ell(400, 400, 360, 70, "url(#dg)");
  const refl = Array.from({ length: 9 }, (_, i) => rect(120 + i * 70, 410 + (i % 3) * 14, 46, 4, "#ffcf6d", 'opacity="0.6"')).join("");
  return build(s, moon(660, 110, 22) + sk, river, glow, refl, arc("#ffcf6d"), spikes, head, ripples(400, 580, "#ffd37a", 0.18, 15, 16));
}

function cathedral() {
  const s = sky([[0, "#f7d6b0"], [0.55, "#f4a98a"], [1, "#9b5c7a"]]);
  const body = rect(250, 330, 300, 190, "#b4553b") + [0, 1, 2, 3, 4].map((i) => rect(262 + i * 56, 380, 22, 60, "#e8d3b4")).join("");
  const tower = (x) => rect(x, 190, 70, 330, "#b4553b") + path(`M${x - 6} 190L${x + 35} 70L${x + 76} 190Z`, "#8a3a2b") + rect(x + 28, 40, 4, 34, "#3a2a2a") + rect(x + 16, 210, 38, 54, "#e8d3b4") + rect(x + 16, 290, 38, 54, "#e8d3b4") + rect(x + 6, 188, 58, 8, "#e8d3b4");
  const rose = circ(400, 360, 34, "#e8d3b4") + circ(400, 360, 24, "#7aa3c4") + path("M400 336V384M376 360H424", "none", 'stroke="#e8d3b4" stroke-width="3"');
  const door = path("M372 520V450Q400 420 428 450V520Z", "#4a2a20");
  const plaza = rect(0, 520, W, 80, "#d9b79b") + path("M0 600L260 520H540L800 600Z", "#c9a285");
  let trees = "";
  for (let i = 0; i < 5; i++) trees += circ(60 + i * 40, 500, 30, "#4d8a52") + circ(740 - i * 40, 500, 30, "#3f7a49");
  return build(s, sun(110, 150, 30, "#fff1cf", "#ffd6a0") + cloud(540, 110, 1.1) + birds(240, 130, 1), tower(220), tower(510), body, rose, door, trees, plaza);
}

function museum() {
  const s = sky([[0, "#e7eef2"], [0.65, "#f6e8d3"], [1, "#f1d4a8"]]);
  const grid = (x, y, cols, rows) => Array.from({ length: cols * rows }, (_, i) => rect(x + (i % cols) * 40, y + Math.floor(i / cols) * 36, 26, 20, "#7aa3b8")).join("");
  const block = rect(150, 260, 380, 240, "#e8dfce") + grid(170, 290, 9, 5) + rect(150, 250, 380, 14, "#c9bda6") + rect(530, 330, 130, 170, "#d9cdb5") + grid(548, 350, 3, 4);
  const flag = g(rect(0, 0, 4, 100, "#5b3624") + path("M4 0H74V48H4Z", "#c4262d") + path("M39 8L43 21H57L46 29L50 42L39 34L28 42L32 29L21 21H35Z", "#ffd84a"), "translate(100 160)");
  const dove = g(path("M0 0Q20 -26 44 -6Q26 -8 0 0Z", "#ffffff") + path("M0 0Q-20 -26 -44 -6Q-26 -8 0 0Z", "#f2f2f2") + ell(0, 4, 11, 6, "#ffffff"), "translate(520 180) scale(1.4)");
  const ground = rect(0, 500, W, 100, "#cdbfa6") + rect(0, 500, W, 10, "#a99a80");
  let trees = "";
  for (let i = 0; i < 5; i++) trees += circ(90 + i * 160, 490, 40, i % 2 ? "#4f8a52" : "#3b7446") + rect(86 + i * 160, 490, 8, 30, "#5b3624");
  return build(s, sun(660, 110, 26) + cloud(250, 100, 1.1), block, flag, trees, ground, dove);
}

function cuChi() {
  const s = sky([[0, "#dbe8c0"], [1, "#a9c98a"]]);
  let canopy = "";
  const g1 = ["#8fb87a", "#5f9a64", "#3a7a50", "#1f5a3c"];
  for (let i = 0; i < 4; i++) {
    const r = rng(80 + i);
    let b = "";
    for (let k = 0; k < 20; k++) b += circ(k * 44 + r() * 20 - 20, 130 + i * 50 + r() * 26, 44 + r() * 30, g1[i]);
    canopy += b;
  }
  let trunks = "";
  [90, 250, 420, 590, 720].forEach((x, i) => (trunks += rect(x, 150, 14 + (i % 2) * 6, 380, "#4a3328") + rect(x + 3, 150, 4, 380, "#6b4a34", 'opacity="0.5"')));
  const floor = rect(0, 430, W, 170, "#6b5238") + path(ridge(88, 440, 10), "#7a5d41");
  let leaves = "";
  const r = rng(91);
  for (let i = 0; i < 50; i++) leaves += ell(r() * W, 450 + r() * 140, 10 + r() * 10, 4, ["#a86a2e", "#c8892f", "#8a5a2a"][i % 3], `transform="rotate(${f(r() * 180)} 0 0)" opacity="0.8"`);
  const hatch = g(path("M-90 40L-60 0H60L90 40Z", "#4a3a2a") + rect(-60, 0, 120, 18, "#2b2118") + path("M-50 4L50 4L40 20H-40Z", "#1a1410") + rect(-62, -6, 124, 8, "#8a6a46") + `<defs>${radial("hg", [[0, "#ffd37a", 0.7], [1, "#ffd37a", 0]])}</defs>` + ell(0, 12, 110, 40, "url(#hg)"), "translate(400 500)");
  const rays = `<defs>${grad("ray2", [[0, "#fff6c8", 0.4], [1, "#fff6c8", 0]])}</defs>` + [200, 460].map((x) => path(`M${x} 0L${x + 50} 0L${x + 150} 600L${x - 20} 600Z`, "url(#ray2)", 'opacity="0.5"')).join("");
  return build(s, canopy + trunks, floor, leaves, rays, hatch);
}

function floatingVillage() {
  const s = sky([[0, "#fde0b8"], [0.55, "#f5a982"], [1, "#d46a5a"]]);
  const mtn = path("M0 330C120 330 200 210 290 160C330 140 360 150 400 200C470 280 600 330 800 330V360H0Z", "#6a5a6e") + path("M290 160C330 140 360 150 400 200L340 230Z", "#8a7a84", 'opacity="0.5"');
  const pg = pagoda(300, 210, 0.3, 3, "#c4a074", "#7a3a30");
  const river = water(350, "#e29a7a", "#5a4a58", "cd");
  const house = (x, y, k, c) => g(path("M0 0L50 -30L100 0Z", c) + rect(10, 0, 80, 30, "#e8d2a8") + rect(40, 10, 18, 20, "#5b3624") + rect(-10, 30, 120, 12, "#4a6a7a") + rect(-20, 42, 140, 6, "#2e4a58"), `translate(${x} ${y}) scale(${k})`);
  const row = house(60, 470, 1.15, "#b04a38") + house(250, 500, 1.3, "#3f7a8a") + house(480, 460, 1.0, "#d08a3a") + house(620, 520, 1.2, "#b04a38");
  return build(s, sun(560, 280, 36, "#fff0d0", "#ffd0a0") + cloud(150, 110, 1.2) + birds(420, 120, 1), mtn, pg, mist(300, 50, "#f5a982", 0.5), river, g(reflect(mtn, 350, 0.25)), ripples(360, 590, "#ffe3c9", 0.3, 12, 22), row, boat(420, 560, 0.9, "#3a2c26", null));
}

function harborHill() {
  const s = sky([[0, "#f6e3cc"], [0.55, "#f2b99a"], [1, "#e9a38a"]]);
  const hill = path("M-20 400C80 330 180 260 300 250C400 245 440 320 520 360C600 400 700 380 820 400V420H-20Z", "#4f7a5c") + path("M300 250C400 245 440 320 520 360L420 360Z", "#2e5a42", 'opacity="0.4"') + g(rect(0, 0, 14, 40, "#f2e6cf") + path("M-6 0L7 -22L20 0Z", "#c4622d"), "translate(300 214)");
  const sea = water(400, "#f0b49a", "#5a7a8c", "ht");
  let houses = "";
  const r = rng(15);
  for (let i = 0; i < 9; i++) houses += rect(560 + i * 24, 360 + r() * 8, 20, 22, ["#f2e6cf", "#e8c9a0", "#c9d6d9"][i % 3]) + path(`M${556 + i * 24} 360L${570 + i * 24} 350L${584 + i * 24} 360Z`, "#b04a38");
  return build(s, sun(640, 250, 34, "#fff3d9", "#ffd6b0") + cloud(160, 120, 1.3) + cloud(500, 90, 0.9) + birds(260, 170, 1), hill, houses, sea, ripples(410, 590, "#fff0e0", 0.35, 18, 22), boat(220, 500, 1.1, "#2e3a3b", "#c4622d") + boat(520, 470, 0.8, "#2e3a3b", "#d8a253", true, true) + boat(660, 540, 0.9, "#2e3a3b", null));
}

function angkorGate() {
  const s = sky([[0, "#f6d8b0"], [0.55, "#f0aa80"], [1, "#b8605a"]]);
  const stone = "#b3a68e", dark = "#8f826c", line = "#4f4434";
  const ln = `stroke="${line}" stroke-width="4" fill="none" stroke-linecap="round"`;
  const face = (x, y, k) => g(rect(-34, -46, 68, 92, stone) + rect(-34, -46, 68, 10, dark) + path("M-22 -14Q-12 -22 -2 -14M22 -14Q12 -22 2 -14", "none", ln) + path("M0 -10V16M-10 18Q0 24 10 18", "none", ln) + path("M-18 30Q0 40 18 30", "none", ln), `translate(${x} ${y}) scale(${k})`);
  const tower = rect(300, 150, 200, 300, stone) + rect(290, 440, 220, 16, dark) + path("M296 150L400 70L504 150Z", dark) + path("M330 150L400 96L470 150Z", stone) + face(350, 250, 1.1) + face(450, 250, 1.1) + rect(300, 150, 200, 10, "#000", 'opacity="0.15"');
  const wall = rect(0, 330, 300, 126, "#a39683") + rect(500, 330, 300, 126, "#a39683") + rect(0, 326, 300, 10, dark) + rect(500, 326, 300, 10, dark);
  const gateway = path("M340 456V350Q400 290 460 350V456Z", "#241a12");
  let statues = "";
  for (let i = 0; i < 5; i++) { const x = 40 + i * 52; statues += circ(x, 470 + i * 4, 18, dark) + rect(x - 11, 480 + i * 4, 22, 46, dark) + circ(760 - i * 52, 470 + i * 4, 18, dark) + rect(749 - i * 52, 480 + i * 4, 22, 46, dark); }
  const road = path("M330 456L470 456L650 600L150 600Z", "#c9a074");
  return build(s, sun(640, 200, 34) + cloud(150, 100, 1.2) + birds(560, 110, 1), path(ridge(37, 300, 16), "#b08a7a"), wall, tower, gateway, road, statues, palm(60, 560, 1.2, 30, "#2e6f46"), palm(740, 560, 1.1, -30, "#2e6f46"));
}

function angkorTowers() {
  const s = sky([[0, "#2a1f4a"], [0.45, "#b8506a"], [1, "#f7b37a"]]);
  const spire = (x, base, w, h, c) => path(`M${x - w / 2} ${base}V${base - h * 0.5}Q${x - w * 0.5} ${base - h * 0.75} ${x - w * 0.18} ${base - h * 0.88}Q${x} ${base - h * 1.06} ${x + w * 0.18} ${base - h * 0.88}Q${x + w * 0.5} ${base - h * 0.75} ${x + w / 2} ${base - h * 0.5}V${base}Z`, c) + [0.25, 0.5, 0.75].map((k) => rect(x - w / 2, base - h * k, w, 5, "#000", 'opacity="0.18"')).join("");
  const c = "#2a1b2a";
  const water1 = water(470, "#e49a78", "#3a2a48", "at");
  const body = rect(240, 400, 320, 70, c) + spire(400, 400, 80, 270, c) + spire(320, 410, 54, 190, c) + spire(480, 410, 54, 190, c) + spire(262, 430, 40, 120, c) + spire(538, 430, 40, 120, c) + rect(230, 462, 340, 10, c);
  let lotus = "";
  const r = rng(21);
  for (let i = 0; i < 8; i++) { const x = 60 + r() * 680, y = 520 + r() * 60; lotus += ell(x, y, 22, 8, "#243a36") + path(`M${f(x)} ${f(y - 3)}q-6 -18 0 -24q6 6 0 24z`, "#f4a6b8"); }
  return build(s, sun(400, 330, 70, "#fff0d0", "#ffc890") + cloud(130, 120, 1.2, "#ffd9c0", 0.5) + cloud(640, 90, 1, "#ffd9c0", 0.5) + birds(180, 200, 1, "#2a1b2a"), body, water1, g(reflect(body, 470, 0.4)), ripples(480, 590, "#ffd9c0", 0.25, 31, 18), lotus);
}

function chamTowers() {
  const s = sky([[0, "#f8dbb4"], [0.55, "#f2a47a"], [1, "#c4605a"]]);
  const tower = (x, base, k, c) => {
    let o = "";
    for (let i = 0; i < 5; i++) { const w = (96 - i * 14) * k, y = base - i * 46 * k; o += rect(x - w / 2, y - 46 * k, w, 46 * k, c) + path(`M${x - w / 2 - 4} ${y - 46 * k}H${x + w / 2 + 4}V${y - 40 * k}H${x - w / 2 - 4}Z`, "#000", 'opacity="0.16"') + path(`M${x - 8 * k} ${y}V${y - 26 * k}Q${x} ${y - 36 * k} ${x + 8 * k} ${y - 26 * k}V${y}Z`, "#3a1a14"); }
    return o + path(`M${x - 16 * k} ${base - 230 * k}Q${x} ${base - 270 * k} ${x + 16 * k} ${base - 230 * k}Z`, c);
  };
  const ground = path(ridge(33, 470, 14), "#6a8a50") + path(ridge(34, 510, 12), "#4f7a45");
  return build(s, sun(150, 200, 40, "#fff0d0", "#ffd0a0") + cloud(560, 100, 1.2) + birds(300, 140, 1), path(ridge(32, 400, 24), "#a6788a"), tower(520, 470, 1.3, "#b4553b") + tower(300, 480, 1.0, "#a64a35") + tower(690, 490, 0.8, "#b4553b"), ground, palm(90, 560, 1.3, 30, "#3a7a46"), palm(740, 570, 1.1, -30, "#2e6f46"));
}

function hueGate() {
  const s = sky([[0, "#cfe3ee"], [0.6, "#f6ead2"], [1, "#f3d9a8"]]);
  const base = rect(60, 340, 680, 140, "#bfae94") + rect(60, 330, 680, 14, "#a8977e") + [0, 1, 2, 3, 4].map((i) => path(`M${150 + i * 124} 480V410Q${180 + i * 124} 372 ${210 + i * 124} 410V480Z`, i === 2 ? "#2a1810" : "#6a5a46")).join("");
  const upper = rect(180, 250, 440, 84, "#e0b84a") + [0, 1, 2, 3, 4, 5, 6].map((i) => rect(204 + i * 58, 266, 26, 54, "#a8321e")).join("") + roof(400, 250, 500, 62, "#c4a03a", "#00000030") + roof(400, 196, 360, 52, "#d9b24a", "#00000030") + rect(396, 120, 8, 36, "#7a5a2a");
  const flag = g(rect(0, 0, 4, 90, "#5b3624") + path("M4 0H64V40H4Z", "#c4262d") + path("M34 6L37 17H48L39 24L42 34L34 28L26 34L29 24L20 17H31Z", "#ffd84a"), "translate(650 170)");
  const bridge = rect(0, 480, W, 120, "#c6b79b") + path("M300 480H500L580 600H220Z", "#b09f82");
  let trees = "";
  for (let i = 0; i < 5; i++) trees += circ(60 + i * 20, 500, 30, "#4f8a52") + circ(740 - i * 20, 500, 30, "#3b7446");
  return build(s, sun(110, 130, 30) + cloud(520, 90, 1.1) + cloud(260, 150, 0.8), path(ridge(36, 300, 20), "#b8ccc0"), base, upper, flag, trees, bridge, birds(620, 120, 1));
}

function colonial() {
  const s = sky([[0, "#f7d9b0"], [0.6, "#f4c08a"], [1, "#ee9d78"]]);
  const body = rect(120, 230, 560, 300, "#f0c24d") + rect(120, 222, 560, 16, "#fff3d6") + rect(120, 520, 560, 12, "#d8a63a");
  let windows = "";
  for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) { const x = 156 + i * 88, y = 262 + r * 130; windows += path(`M${x} ${y + 90}V${y + 30}Q${x + 26} ${y - 10} ${x + 52} ${y + 30}V${y + 90}Z`, "#3a6a5e") + rect(x - 10, y + 40, 12, 50, "#2e5a4e") + rect(x + 50, y + 40, 12, 50, "#2e5a4e") + rect(x - 6, y + 90, 64, 6, "#fff3d6"); }
  const pediment = path("M380 224L400 170L420 224Z", "#fff3d6") + circ(400, 205, 9, "#3a6a5e");
  const street = rect(0, 532, W, 68, "#8a7a6a") + path("M0 570H800", "none", 'stroke="#f2d16b" stroke-width="4" stroke-dasharray="30 20"');
  const tree = rect(60, 380, 16, 160, "#5b3624") + circ(68, 370, 60, "#4f8a52") + circ(30, 400, 40, "#3b7446") + circ(106, 400, 40, "#3b7446");
  const biker = g(circ(-18, 0, 12, "#2b2b2b") + circ(22, 0, 12, "#2b2b2b") + path("M-18 0L2 -16L20 0M2 -16L6 -34", "none", 'stroke="#c4622d" stroke-width="6" fill="none" stroke-linecap="round"') + circ(6, -42, 8, "#3a2a2a") + path("M-2 -34L14 -34L12 -14L-2 -14Z", "#3f7a8a"), "translate(560 575) scale(1.2)");
  return build(s, sun(690, 120, 28) + cloud(300, 90, 1.1), body, windows, pediment, tree, street, biker);
}

function division() {
  const s = sky([[0, "#1e2842"], [0.5, "#5a4a5e"], [1, "#e09a70"]]);
  const left = path(ridge(41, 400, 14), "#27323a", "") + rect(0, 400, 300, 200, "#27323a");
  const right = path(ridge(42, 410, 12), "#3b2f2c") + rect(500, 410, 300, 190, "#3b2f2c");
  const river = water(420, "#b88a78", "#2a2a3e", "dv");
  const bridge = rect(280, 392, 240, 12, "#8a8a92") + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => rect(286 + i * 30, 404, 4, 40, "#6a6a72")).join("") + path("M280 392Q400 330 520 392", "none", 'stroke="#8a8a92" stroke-width="6" fill="none"');
  return build(s, moon(540, 120, 22) + cloud(180, 110, 1.2, "#cfd6e6", 0.25), left, right, river, bridge, g(reflect(bridge, 420, 0.22)), ripples(430, 580, "#ffd7b0", 0.18, 41, 14), birds(310, 220, 1, "#1a1a22"));
}

function lanternNight() {
  const s = sky([[0, "#0f1530"], [0.6, "#2c2250"], [1, "#6a3a5a"]]);
  const river = water(380, "#3a2a5a", "#0f1224", "ln");
  let lanterns = "";
  const r = rng(51);
  const cols = ["#c4262d", "#f08a2e", "#e8b83a", "#c4262d", "#d9552e"];
  for (let i = 0; i < 18; i++) lanterns += lantern(30 + i * 44, 130 + Math.sin(i * 0.9) * 26 + (i % 2) * 14, 0.9 + r() * 0.35, cols[i % 5]);
  const wire = '<path d="M0 100Q200 160 400 112T800 108" stroke="#2a2030" stroke-width="3" fill="none"/>';
  let floating = "";
  for (let i = 0; i < 12; i++) { const x = 40 + r() * 720, y = 420 + r() * 150; floating += `<defs>${radial("fl" + i, [[0, "#ffd27a", 0.7], [1, "#ffd27a", 0]])}</defs>` + circ(x, y, 26, `url(#fl${i})`) + path(`M${f(x - 14)} ${f(y)}h28l-4 -10h-20z`, "#f08a2e") + ell(x, y - 12, 4, 7, "#ffe08a"); }
  const houses = [60, 200, 340, 520, 660].map((x, i) => rect(x, 300 - (i % 2) * 16, 120, 100 + (i % 2) * 16, i % 2 ? "#3a2a48" : "#2a2038") + path(`M${x - 8} ${300 - (i % 2) * 16}L${x + 60} ${268 - (i % 2) * 16}L${x + 128} ${300 - (i % 2) * 16}Z`, "#1a1426") + rect(x + 20, 330, 22, 30, "#ffd27a", 'opacity="0.8"') + rect(x + 70, 330, 22, 30, "#ffd27a", 'opacity="0.6"')).join("");
  return build(s, moon(660, 180, 18), houses, river, ripples(390, 580, "#ffd27a", 0.16, 52, 14), wire, lanterns, floating);
}

function junkHarbor() {
  const s = sky([[0, "#f8dcb2"], [0.55, "#f2a77a"], [1, "#c9605a"]]);
  const sail = (x, y, k, c) => g(path("M0 0L70 -10L64 -150L6 -190Z", c) + [30, 60, 90, 120].map((yy) => path(`M${4} ${-yy}L${66 - yy * 0.04} ${-yy + 6}`, "none", 'stroke="#00000040" stroke-width="3"')).join("") + rect(-2, -192, 5, 196, "#3a2a22") + path("M-60 4Q0 36 90 4L84 -6H-54Z", "#3a2a22") + rect(-40, -6, 100, 8, "#6a4a32"), `translate(${x} ${y}) scale(${k})`);
  const sea = water(360, "#eca47e", "#4e3a58", "jh");
  const wharf = rect(0, 340, W, 28, "#4a3a32") + [60, 200, 340, 480, 620, 740].map((x) => rect(x, 300, 60, 40, "#7a4a38") + path(`M${x - 6} 300L${x + 30} 270L${x + 66} 300Z`, "#4a2a22")).join("");
  return build(s, sun(400, 330, 46, "#fff0d0", "#ffd0a0") + cloud(150, 110, 1.2) + cloud(620, 80, 1) + birds(480, 160, 1), wharf, sea, ripples(380, 590, "#ffe3c9", 0.3, 61, 22), sail(220, 480, 1.1, "#a8321e") + sail(560, 440, 0.8, "#d08a3a") + sail(420, 560, 0.9, "#c4622d"));
}

function cholon() {
  const s = sky([[0, "#2a1f4a"], [0.6, "#5a2f4f"], [1, "#c25a50"]]);
  const shops = [0, 1, 2, 3].map((i) => {
    const x = i * 200;
    return rect(x, 300, 190, 300, ["#b4553b", "#d8a24a", "#a8321e", "#3f7a8a"][i]) + path(`M${x - 10} 300L${x + 95} 250L${x + 200} 300Z`, "#4a2a22") + rect(x + 20, 340, 60, 70, "#ffd27a", 'opacity="0.85"') + rect(x + 110, 340, 60, 70, "#ffd27a", 'opacity="0.6"') + rect(x + 20, 430, 150, 110, "#2a1810") + rect(x + 6, 420, 178, 12, "#f0c24d");
  }).join("");
  let lanterns = "";
  const cols = ["#c4262d", "#f08a2e", "#c4262d", "#e8b83a"];
  for (let i = 0; i < 14; i++) lanterns += lantern(30 + i * 58, 110 + (i % 3) * 22 + Math.sin(i) * 12, 1.1, cols[i % 4]);
  const road = rect(0, 540, W, 60, "#3a3036") + path("M0 570H800", "none", 'stroke="#e8c27a" stroke-width="3" stroke-dasharray="26 18"');
  return build(s, moon(640, 100, 20), shops, road, '<path d="M0 90Q200 150 400 100T800 96" stroke="#2a2030" stroke-width="3" fill="none"/>', lanterns);
}

function deltaCanal() {
  const s = sky([[0, "#e2f1d4"], [0.55, "#f6efc9"], [1, "#f1d9a0"]]);
  const canal = water(340, "#b4dccf", "#3f7e6c", "dc");
  const bankL = path("M-20 600L-20 300C60 320 160 380 230 470C250 510 262 556 270 600Z", "#3f7a46") + path("M-20 600L-20 390C70 410 140 460 200 520C226 548 244 578 250 600Z", "#2f6a3c");
  const bankR = path("M820 600L820 280C740 300 660 380 600 460C575 505 560 556 552 600Z", "#4f8a4e") + path("M820 600L820 370C740 400 680 450 640 510C620 540 606 574 600 600Z", "#3a7a42");
  const glint = ripples(380, 590, "#ffffff", 0.35, 72, 18);
  return build(s, sun(400, 200, 34, "#fff6dd", "#ffedb8") + cloud(160, 110, 1.2) + cloud(560, 90, 1), path(ridge(71, 330, 20), "#9fc79a"), canal, glint, bankL, bankR, palm(70, 420, 1.5, 50, "#2e7a46") + palm(180, 470, 1.1, -40, "#3a8a50") + palm(730, 400, 1.6, -60, "#2e7a46") + palm(640, 450, 1.0, 40, "#3a8a50"), boat(410, 540, 1.15, "#4a3328", "#d8a253"), birds(330, 140, 1));
}

function coastHighlands() {
  const s = sky([[0, "#bfe3ee"], [0.6, "#f9e7c9"], [1, "#f6c58f"]]);
  const seaShape = "M-20 300H420C380 380 330 470 300 600H-20Z";
  const sea = `<defs>${grad("sea3", [[0, "#9bd8dc"], [1, "#2f7f90"]])}<clipPath id="seaclip"><path d="${seaShape}"/></clipPath></defs>` + `<g clip-path="url(#seaclip)">` + rect(0, 290, 440, 320, "url(#sea3)") + ripples(310, 590, "#ffffff", 0.4, 5, 22) + `</g>`;
  const hills = path(ridge(9, 280, 50), "#9fc4b4") + path(ridge(10, 340, 60), "#5f9a74") + path("M330 600C340 480 380 380 460 340C560 310 680 300 820 330V600Z", "#3f7a52");
  let pinesRow = "";
  for (let i = 0; i < 9; i++) pinesRow += pine(430 + i * 42, 470 + (i % 3) * 22, 1 + (i % 3) * 0.2, i % 2 ? "#2f6246" : "#3f7452");
  const beach = path("M-20 600V500C60 490 150 520 230 580L250 600Z", "#f1dba8") + path("M-20 600V540C60 535 130 560 190 600Z", "#e6c88e");
  return build(s, sun(400, 130, 30, "#fff6dd", "#ffe7b0") + cloud(150, 100, 1.2) + cloud(620, 150, 0.9), hills, sea, mist(330, 60, "#f9e7c9", 0.25), pinesRow, beach, palm(70, 580, 1.4, 50, "#2e7a46"), palm(170, 600, 1, -30, "#3a8a50"), birds(560, 200, 1));
}

function hoanKiem() {
  const s = sky([[0, "#f9e0c4"], [0.5, "#f2b896"], [1, "#d98a82"]]);
  const lake = water(330, "#e8a88a", "#46566e", "hk");
  const stone = "#b8ae98", dark = "#6e6552";
  let tower = "";
  [[70, 56], [54, 50], [38, 44]].forEach(([w, h], i) => {
    const y = 340 - [0, 56, 106][i];
    tower += rect(520 - w / 2, y - h, w, h, stone) + path(`M${520 - w / 2 - 4} ${y - h}H${520 + w / 2 + 4}V${y - h + 6}H${520 - w / 2 - 4}Z`, dark) + path(`M${520 - 9} ${y}V${y - 24}Q${520} ${y - 34} ${520 + 9} ${y - 24}V${y}Z`, "#3a3226");
  });
  tower += path("M492 234L520 214L548 234Z", dark) + rect(518, 200, 4, 16, dark);
  const islet = ell(520, 342, 120, 20, "#3f6b45") + ell(480, 338, 60, 12, "#4f8a52");
  const bridge = path("M40 356Q150 286 270 356", "none", 'stroke="#b8321e" stroke-width="16" fill="none" stroke-linecap="round"') + path("M40 346Q150 276 270 346", "none", 'stroke="#d9a24a" stroke-width="4" fill="none"') + [70, 110, 150, 190, 230].map((x, i) => rect(x, 320 - Math.sin((i + 0.6) * 0.62) * 40 + 10, 4, 24, "#8a2a1a")).join("");
  let willow = rect(690, 230, 12, 130, "#4a3328");
  willow += ell(696, 220, 90, 46, "#4f8a52");
  for (let i = 0; i < 16; i++) willow += `<path d="M${620 + i * 11} ${230 + (i % 3) * 8}q${i % 2 ? 6 : -6} 50 ${i % 2 ? -2 : 4} ${90 + (i % 4) * 14}" stroke="#6fa65a" stroke-width="3" fill="none" opacity="0.9"/>`;
  const body = tower + islet;
  return build(s, sun(250, 280, 40, "#fff0d0", "#ffd0a0") + cloud(150, 110, 1.2) + cloud(560, 90, 0.9) + birds(380, 150, 1), path(ridge(90, 320, 10), "#8a6a7a", 'opacity="0.6"'), lake, g(reflect(body, 340, 0.3)), body, bridge, ripples(360, 590, "#ffe3c9", 0.3, 91, 22), mist(300, 40, "#f2b896", 0.35), willow);
}

export const more = {
  mausoleum, "west-lake": westLake, "mai-chau": maiChau, forest, "dragon-bridge": dragonBridge, cathedral, museum, "cu-chi": cuChi,
  "floating-village": floatingVillage, "harbor-hill": harborHill, "angkor-gate": angkorGate, "angkor-towers": angkorTowers, "cham-towers": chamTowers,
  "hue-gate": hueGate, "hoan-kiem": hoanKiem, colonial, division, "lantern-night": lanternNight, "junk-harbor": junkHarbor, cholon, "delta-canal": deltaCanal, "coast-highlands": coastHighlands,
};

function f(n) { return Number(n.toFixed(1)); }
