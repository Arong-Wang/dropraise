import sharp from "sharp";
import { readdir, stat, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = path.join(__dirname, "../public/works");
const MAX_WIDTH = 1920;
const QUALITY = 82;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function formatSize(bytes) {
  return (bytes / 1024).toFixed(0) + " KB";
}

async function optimizeImage(filePath) {
  const info = await sharp(filePath).metadata();
  const beforeStat = await stat(filePath);

  // 已經夠小就跳過
  if (beforeStat.size < 400 * 1024 && (info.width ?? 0) <= MAX_WIDTH) {
    console.log(`  ⏭  跳過（已優化）  ${path.basename(filePath)}`);
    return;
  }

  const tempPath = filePath + ".tmp";
  await sharp(filePath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tempPath);

  const afterStat = await stat(tempPath);

  // 只有壓縮後更小才替換
  if (afterStat.size < beforeStat.size) {
    const { rename } = await import("fs/promises");
    await rename(tempPath, filePath);
    const saved = (((beforeStat.size - afterStat.size) / beforeStat.size) * 100).toFixed(0);
    console.log(`  ✓  ${path.basename(filePath).padEnd(24)} ${formatSize(beforeStat.size)} → ${formatSize(afterStat.size)}  (-${saved}%)`);
  } else {
    const { unlink } = await import("fs/promises");
    await unlink(tempPath);
    console.log(`  ⏭  跳過（已最佳）  ${path.basename(filePath)}`);
  }
}

async function main() {
  if (!existsSync(INPUT_DIR)) {
    console.error("找不到 public/works 資料夾");
    process.exit(1);
  }

  const files = await getFiles(INPUT_DIR);
  if (files.length === 0) {
    console.log("沒有找到需要處理的圖片");
    return;
  }

  console.log(`\n開始優化 ${files.length} 張照片（最大寬度 ${MAX_WIDTH}px，品質 ${QUALITY}）\n`);

  for (const file of files) {
    await optimizeImage(file);
  }

  console.log("\n完成！");
}

main().catch(console.error);
