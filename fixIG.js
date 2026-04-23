#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const targetDir = path.resolve(process.argv[2] || "output");
const replacementText = "HL7® FHIR® New Zealand Base Implementation Guide, published by HL7 New Zealand";
const localBuildBannerPattern = /HL7® FHIR® New Zealand Base Implementation Guide\s*-\s*Local Development build \(v[^)]+\)\.\s*See the <a href="[^"]*history\.html">Directory of published versions<\/a>/g;
const qaReportPattern = />QA Report</g;

async function main() {
  const htmlFiles = await collectHtmlFiles(targetDir);
  let updatedFiles = 0;

  for (const filePath of htmlFiles) {
    const original = await fs.readFile(filePath, "utf8");
    const updated = original
      .replace(localBuildBannerPattern, replacementText)
      .replace(qaReportPattern, ">");

    if (updated !== original) {
      await fs.writeFile(filePath, updated, "utf8");
      updatedFiles += 1;
    }
  }

  console.log(`fixIG: processed ${htmlFiles.length} HTML files in ${targetDir}; updated ${updatedFiles}.`);
}

async function collectHtmlFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const htmlFiles = [];

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      htmlFiles.push(...await collectHtmlFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(entryPath);
    }
  }

  return htmlFiles;
}

main().catch((error) => {
  console.error(`fixIG: ${error.message}`);
  process.exitCode = 1;
});
