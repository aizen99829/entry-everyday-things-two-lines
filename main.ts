import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const firstLine =
  "The kettle hums its small morning song,";
const secondLine =
  "and my keys wait exactly where I left them — nowhere I thought to look.";

function buildEntry(): string {
  const lines = [firstLine, secondLine];
  for (const line of lines) {
    if (!line.trim()) {
      throw new Error("entry line must not be blank");
    }
  }
  if (lines.length !== 2) {
    throw new Error("entry must contain exactly two lines");
  }
  return lines.join("\n") + "\n";
}

function main(): void {
  mkdirSync(outDir, { recursive: true });
  const text = buildEntry();
  writeFileSync(outFile, text, "utf8");
  console.log(`wrote ${outFile}`);
}

main();
