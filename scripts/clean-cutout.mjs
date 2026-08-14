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

    // Known leftover studio colors (not white shirt / skin)
    const isStudioGray =
      r > 160 &&
      r < 230 &&
      g > 170 &&
      g < 235 &&
      b > 180 &&
      b < 240 &&
      Math.abs(r - g) < 20 &&
      Math.abs(g - b) < 20;

    const isStudioTeal =
      r > 50 &&
      r < 120 &&
      g > 80 &&
      g < 140 &&
      b > 90 &&
      b < 150 &&
      b >= g &&
      g > r;

    const nearBorder = x < 12 || x > width - 13 || y < 6 || y > height - 8;

    if (isStudioGray || isStudioTeal || (nearBorder && a < 120)) {
      a = 0;
    }

    // Soft bottom dissolve (hard crop → smoke)
    const t = y / (height - 1);
    if (t > 0.7) {
      const fade = 1 - (t - 0.7) / 0.3;
      a = Math.round(a * Math.max(0, fade) ** 1.8);
    }

    // Gentle side feather only near true edges
    const sx = Math.min(x, width - 1 - x);
    if (sx < 24) {
      a = Math.round(a * (sx / 24) ** 1.25);
    }

    if (a < 12) a = 0;
    out[i + 3] = a;
  }
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(input + ".tmp.png");
fs.renameSync(input + ".tmp.png", input);

const d = (
  await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
).data;
for (const [x, y, label] of [
  [0, 0, "tl"],
  [width - 1, height - 1, "br"],
  [Math.floor(width / 2), Math.floor(height * 0.4), "face"],
  [Math.floor(width / 2), Math.floor(height * 0.55), "shirt"],
]) {
  const i = (y * width + x) * 4;
  console.log(label, `a=${d[i + 3]} rgb=${d[i]},${d[i + 1]},${d[i + 2]}`);
}
