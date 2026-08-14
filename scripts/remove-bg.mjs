import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, "../src/assets/andiswa.jpg");
const output = path.join(__dirname, "../src/assets/andiswa-cutout.png");

console.log("Removing background…");
const fileUrl = pathToFileURL(input).href;
const blob = await removeBackground(fileUrl, {
  output: { format: "image/png", quality: 1 },
});
const buffer = Buffer.from(await blob.arrayBuffer());
fs.writeFileSync(output, buffer);
console.log("Wrote", output, `(${buffer.length} bytes)`);
