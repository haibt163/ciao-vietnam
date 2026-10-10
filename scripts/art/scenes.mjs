// Place and landscape scenes. Each returns a complete SVG string (800x600).
import { W, rng, grad, ridge, path, circ, ell, rect, g, mist, sky, sun, cloud, birds, karst, pine, palm, boat, reflect, water, ripples, frame } from "./lib.mjs";

const build = (s, ...parts) => frame(s.defs + parts.filter((p) => p && p.defs).map((p) => p.defs).join(""), s.body + parts.map((p) => (typeof p === "string" ? p : p.body || "")).join(""));

function karstBoat() {
  const s = sky([[0, "#fbe3c3"], [0.55, "#f6b98c"], [1, "#e58f72"]]);
  const far = karst(150, 350, 120, 130, "#dcb9a8", "#c7b49c", "#ffffff") + karst(660, 350, 130, 150, "#d6b0a0", "#bfae96", "#ffffff") + karst(420, 350, 90, 90, "#e1c0ae", "#cdb9a0", "#ffffff");
  const mid = karst(90, 372, 170, 220, "#a58f89", "#6f8a68", "#e6c9b8") + karst(330, 372, 120, 150, "#ad968e", "#76906c", "#e6c9b8") + karst(590, 372, 150, 190, "#a08a85", "#6a8664", "#e6c9b8");
  const near = karst(40, 400, 220, 330, "#56625f", "#3c6a4b", "#9eb3a8") + karst(770, 400, 250, 300, "#505e5c", "#376448", "#9eb3a8");
  const sea = water(350, "#f0b48d", "#2c6a70");
  return build(s,
    sun(500, 318, 36) + cloud(160, 120, 1.1) + cloud(600, 90, 0.9) + birds(300, 150, 1),
    far, mist(300, 60, "#fbe3c3", 0.7), mid, mist(330, 40, "#f3c7a2", 0.5),
    sea, g(reflect(far + mid, 350, 0.28)), ripples(360, 560, "#ffe9c9", 0.3, 5, 22), near,
    boat(400, 470, 1.3, "#2e3a3b", "#c4622d"),
  );
}

function terraces() {
  const s = sky([[0, "#d6e9f0"], [0.6, "#f5ead2"], [1, "#f3d9a8"]]);
  const far = path(ridge(3, 250, 40), "#c5d6d6") + mist(240, 80, "#f5ead2", 0.7) + path(ridge(5, 300, 34), "#a9c4b8");
  const hill = "M-120 600C-100 400 140 310 400 305C660 300 880 400 920 600Z";
  const cols = ["#7fae62", "#c4d37c", "#92bb6c", "#d7dc8c", "#6f9d58", "#b7cf78", "#5f8f4f", "#a6c570"];
  let bands = "";
  for (let i = 0; i < 16; i++) {
    const k = 1 - i * 0.055, cy = 300 + i * 20;
    bands += `<ellipse cx="${400 + (i % 2 ? 8 : -8)}" cy="${cy + 190}" rx="${(760 * k).toFixed(0)}" ry="${(250 * k).toFixed(0)}" fill="${cols[i % cols.length]}"/>` +
      `<ellipse cx="${400 + (i % 2 ? 8 : -8)}" cy="${cy + 197}" rx="${(760 * k).toFixed(0)}" ry="${(250 * k).toFixed(0)}" fill="none" stroke="#2e5a3a" stroke-opacity="0.22" stroke-width="3"/>`;
  }
  const flood = `<defs>${grad("flood", [[0, "#d9eef2"], [1, "#a8cfd8"]])}</defs>`;
  let sheen = "";
  for (let i = 5; i < 16; i += 5) sheen += `<ellipse cx="${400 + (i % 2 ? 8 : -8)}" cy="${300 + i * 20 + 190}" rx="${(760 * (1 - i * 0.055)).toFixed(0)}" ry="${(250 * (1 - i * 0.055)).toFixed(0)}" fill="url(#flood)" opacity="0.55"/>`;
  const house = g(path("M0 0L30 -26L60 0Z", "#8c4a2e") + rect(6, 0, 48, 28, "#d29a52") + rect(24, 12, 12, 16, "#5b3624") + rect(-2, 28, 64, 5, "#5b3624"), "translate(560 470) scale(0.9)");
  const clip = `<defs><clipPath id="hc"><path d="${hill}"/></clipPath></defs>`;
  return build(s, cloud(150, 100, 1.2) + cloud(560, 140, 0.9) + sun(660, 120, 28, "#fff6dd", "#ffe9b5") + far + mist(300, 50, "#f1e7cf", 0.5) + clip + `<g clip-path="url(#hc)">${flood}${bands}${sheen}</g>` + house + birds(470, 190, 1.1));
}

function cave() {
  const s = sky([[0, "#10231f"], [1, "#1d3b36"]]);
  const arch = "M80 600V300C80 130 230 60 400 60S720 130 720 300V600Z";
  const inner = "M170 600V320C170 200 270 150 400 150S630 200 630 320V600Z";
  let stal = "";
  const r = rng(11);
  for (let i = 0; i < 12; i++) { const x = 130 + r() * 540, h = 30 + r() * 90, w = 10 + r() * 16; stal += path(`M${f(x - w)} 80L${f(x)} ${f(80 + h)}L${f(x + w)} 80Z`, "#2b4a43"); }
  const beam = `<defs>${grad("beam", [[0, "#fff1c4", 0.55], [1, "#fff1c4", 0]])}</defs>` + path("M330 150L470 150L640 600L160 600Z", "url(#beam)");
  const floor = water(400, "#4d8a86", "#173f3f", "cw");
  return build(s, path(arch, "#0d1b19"), path(inner, "#2a5a54"), mist(150, 200, "#d6f3e6", 0.25), beam, `<g>${stal}</g>`, floor, ripples(420, 580, "#e9fff4", 0.2, 9, 14),
    boat(410, 510, 1.5, "#0f1d1c", null), path("M320 600L360 400L440 400L480 600Z", "#fff6d8", 'opacity="0.1"'), rect(0, 0, W, 60, "#0b1614", 'opacity="0.0"'));
}

function coastRoad() {
  const s = sky([[0, "#bfe3ee"], [0.6, "#f9e7c9"], [1, "#f6c58f"]]);
  const sea = rect(0, 250, W, 350, "#3f9aa8") + `<defs>${grad("sea", [[0, "#8fd0d6"], [1, "#2f7f90"]])}</defs>` + rect(0, 250, W, 200, "url(#sea)");
  const hills = path(ridge(8, 270, 40), "#7aa886") + path(ridge(9, 320, 50), "#4f8a64");
  const slope = path("M-20 600L-20 330C160 330 420 380 560 470C640 520 760 560 820 600Z", "#356b4b") + path("M-20 600L-20 380C140 390 400 440 520 520C600 570 700 590 820 600Z", "#27583e");
  const road = path("M-20 600L-20 470C120 470 340 500 470 560L520 600Z", "#6b5a52") + path("M-20 540C110 540 330 560 430 600", "none", 'stroke="#f2d16b" stroke-width="5" stroke-dasharray="26 16" fill="none"');
  const biker = g(circ(-18, 0, 12, "#2b2b2b") + circ(22, 0, 12, "#2b2b2b") + path("M-18 0L2 -16L20 0M2 -16L6 -34", "none", 'stroke="#c4622d" stroke-width="6" fill="none" stroke-linecap="round"') + circ(6, -42, 8, "#3a2a2a") + path("M-2 -34L14 -34L12 -14L-2 -14Z", "#f0b24a"), "translate(250 540) scale(1.2)");
  return build(s, sun(620, 170, 30, "#fff6dd", "#ffe7b0") + cloud(180, 100, 1.2) + cloud(480, 150, 0.8), sea, ripples(260, 440, "#ffffff", 0.35, 3, 26), hills, mist(300, 60, "#f9e7c9", 0.5), slope, road, biker, birds(560, 220, 1));
}

function pines() {
  const s = sky([[0, "#cfe4e8"], [0.6, "#f6e8cf"], [1, "#f4d1a1"]]);
  let trees = "";
  const r = rng(4);
  for (let i = 0; i < 16; i++) trees += pine(30 + i * 50 + r() * 20, 400 + r() * 60, 0.9 + r() * 0.5, i % 2 ? "#3f7452" : "#2f6246");
  let far = "";
  for (let i = 0; i < 22; i++) far += pine(10 + i * 38 + r() * 16, 340 + r() * 14, 0.5, "#8fb09c", "#8fb09c");
  const lake = water(450, "#a9d0d6", "#4f8f9a", "lk");
  return build(s, sun(600, 150, 30, "#fff4d6", "#ffe3a8") + cloud(180, 110, 1.1) + cloud(480, 170, 0.8), path(ridge(6, 300, 36), "#b9d3cc"), mist(290, 70, "#f6e8cf", 0.6), far, mist(330, 50, "#f6e8cf", 0.5), path(ridge(7, 400, 24), "#4f7f5c"), trees, lake, ripples(470, 580, "#ffffff", 0.35, 6, 18),
    // pedal swan
    g(ell(0, 0, 38, 16, "#fff") + path("M20 -2C30 -26 44 -30 48 -44", "none", 'stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"') + circ(50, -46, 8, "#fff") + path("M56 -46L68 -42L56 -40Z", "#ee8d3a"), "translate(420 520)"));
}

function mekong() {
  const s = sky([[0, "#ffe6bf"], [0.5, "#f7b985"], [1, "#d6755f"]]);
  const bank = path(ridge(13, 330, 14), "#3f6b45") + path(ridge(14, 350, 10), "#2d5a3b");
  const palms = palm(80, 360, 1.2, 40, "#2f6a46") + palm(180, 366, 0.9, -30, "#3a7a50") + palm(700, 360, 1.3, -50, "#2f6a46") + palm(610, 368, 0.8, 30, "#3a7a50");
  const river = water(350, "#e9a47a", "#6e5a4f", "rv");
  return build(s, sun(430, 300, 40, "#fff1cf", "#ffd6a0") + cloud(170, 110, 1.2) + cloud(560, 80, 1) + birds(330, 170, 1), bank, palms, river, ripples(360, 580, "#ffe8c4", 0.32, 2, 26),
    boat(300, 470, 1.25, "#3a2c26", "#d8a253") + boat(560, 420, 0.8, "#3a2c26", "#c4622d", true, true) + boat(160, 540, 0.8, "#3a2c26", null));
}

function island() {
  const s = sky([[0, "#a8e0f0"], [0.6, "#e8f6ee"], [1, "#fbe8c6"]]);
  const sea = `<defs>${grad("sea2", [[0, "#9be0e0"], [0.5, "#35b5c0"], [1, "#127f93"]])}</defs>` + rect(0, 300, W, 300, "url(#sea2)");
  const sand = path("M-20 600V470C150 440 330 470 480 520C600 560 720 580 820 600Z", "#f6e3b4") + path("M-20 600V500C130 475 300 505 440 550C560 590 700 596 820 600Z", "#ecd09a");
  const surf = path("M-20 470C150 440 330 470 480 520C560 548 640 565 720 580", "none", 'stroke="#ffffff" stroke-width="7" fill="none" opacity="0.8"');
  const far = path(ridge(21, 292, 22), "#4f9a8a") + path(ridge(23, 300, 16), "#2e7d6a");
  return build(s, sun(150, 130, 34, "#fffbe6", "#fff0b8") + cloud(500, 110, 1.2) + cloud(300, 170, 0.8), sea, far, ripples(310, 470, "#ffffff", 0.3, 8, 24), sand, surf, palm(640, 570, 1.6, -60, "#2e7d4b") + palm(720, 590, 1.2, 40, "#3c9a5a") + palm(110, 560, 1.1, 50, "#2e7d4b"),
    // umbrella
    g(path("M-46 0Q0 -48 46 0Z", "#c4622d") + path("M-46 0Q-23 -10 0 0Q23 -10 46 0Z", "#f6e3b4") + rect(-1.5, 0, 3, 56, "#5b3624"), "translate(330 500) rotate(-8)"));
}

export const scenes = {
  "karst-boat": karstBoat,
  terraces,
  cave,
  "coast-road": coastRoad,
  pines,
  mekong,
  island,
};

function f(n) { return Number(n.toFixed(1)); }
