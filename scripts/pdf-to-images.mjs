import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as mupdf from "mupdf";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const [, , pdfPath, outputName] = process.argv;
if (!pdfPath || !outputName) {
  console.error("用法：node scripts/pdf-to-images.mjs <PDF路徑> <輸出資料夾名稱>");
  process.exit(1);
}

const outputDir = path.join(__dirname, "../public/works", outputName);
if (!existsSync(outputDir)) await mkdir(outputDir, { recursive: true });

async function main() {
  const doc = mupdf.Document.openDocument(pdfPath, "application/pdf");
  const pageCount = doc.countPages();
  console.log(`\nPDF 共 ${pageCount} 頁，開始轉換...\n`);

  for (let i = 0; i < pageCount; i++) {
    const page = doc.loadPage(i);
    const pixmap = page.toPixmap(
      mupdf.Matrix.scale(2, 2), // 2x 解析度
      mupdf.ColorSpace.DeviceRGB,
      false
    );
    const jpeg = pixmap.asJPEG(88);
    const outPath = path.join(outputDir, `slide-${String(i + 1).padStart(2, "0")}.jpg`);
    await writeFile(outPath, jpeg);
    console.log(`  ✓ 第 ${i + 1} 頁 → ${path.basename(outPath)}`);
  }

  console.log(`\n完成！輸出至 public/works/${outputName}/`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
