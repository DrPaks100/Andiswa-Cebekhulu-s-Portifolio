import sharp from "sharp";
import fs from "fs";

const input = "src/assets/andiswa-cutout.png";

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const out = Buffer.from(data);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    let a = out[i + 3];

    // Studio gray leftovers (the visible “box”)
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    const isFlatGray = chroma < 22 && r > 55 && r < 235;

    if (isFlatGray) {
      a = 0;
    }

    // Hard bottom crop → soft dissolve
    const t = y / (height - 1);
    if (t > 0.68) {
      const fade = 1 - (t - 0.68) / 0.32;
      a = Math.round(a * Math.max(0, fade) ** 1.6);
    }

    // Soft side falloff so file rectangle never shows
    const sx = Math.min(x, width - 1 - x) / (width * 0.5);
    if (sx < 0.12) {
      a = Math.round(a * (sx / 0.12) ** 1.4);
    }

    // Kill weak fringe
    if (a < 18) a = 0;

    out[i + 3] = a;
  }
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(input + ".tmp.png");
fs.renameSync(input + ".tmp.png", input);

// Verify corners
const check = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const d = check.data;
const samples = [
  [0, 0],
  [width - 1, 0],
  [0, height - 1],
  [width - 1, height - 1],
  [Math.floor(width / 2), Math.floor(height * 0.35)],
];
for (const [x, y] of samples) {
  const i = (y * width + x) * 4;
  console.log(`(${x},${y}) a=${d[i + 3]} rgb=${d[i]},${d[i + 1]},${d[i + 2]}`);
}
