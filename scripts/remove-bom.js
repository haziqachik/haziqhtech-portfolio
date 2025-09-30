#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Simple glob for **/*.json with ignore paths
function walkDir(dir, list, ignores) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    const rel = path.relative(process.cwd(), p);
    if (ignores.some((ig) => rel === ig || rel.startsWith(ig + path.sep))) {
      continue;
    }
    if (e.isDirectory()) {
      walkDir(p, list, ignores);
    } else if (e.isFile() && e.name.toLowerCase().endsWith('.json')) {
      list.push(p);
    }
  }
}

function stripBomFromBuffer(buf) {
  if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    return buf.slice(3);
  }
  // Also handle a stray U+FEFF character
  const text = buf.toString('utf8');
  if (text.charCodeAt(0) === 0xfeff) {
    return Buffer.from(text.slice(1), 'utf8');
  }
  return null; // no change
}

function processFile(file, opts) {
  const abs = path.resolve(process.cwd(), file);
  if (!fs.existsSync(abs)) return { file, changed: false, hadBom: false };
  const buf = fs.readFileSync(abs);
  const stripped = stripBomFromBuffer(buf);
  if (stripped) {
    if (opts.fix) {
      fs.writeFileSync(abs, stripped);
      return { file, changed: true, hadBom: true };
    } else {
      return { file, changed: false, hadBom: true };
    }
  }
  return { file, changed: false, hadBom: false };
}

function main() {
  const args = process.argv.slice(2);
  const fix = args.includes('--fix') || !args.includes('--check');
  const check = args.includes('--check');

  // Collect targets: if specific paths are passed, use them; otherwise scan repo
  const targets = args.filter((a) => !a.startsWith('--'));
  let files = [];
  const ignores = ['node_modules', '.git', '.next', 'dist', 'build', 'out'];
  if (targets.length === 0) {
    walkDir(process.cwd(), files, ignores);
  } else {
    for (const t of targets) {
      const p = path.resolve(process.cwd(), t);
      if (fs.existsSync(p)) {
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
          walkDir(p, files, ignores);
        } else if (stat.isFile()) {
          files.push(p);
        }
      } else {
        console.error(`Path not found: ${t}`);
      }
    }
  }

  const results = files.map((f) => processFile(f, { fix }));
  const bomFiles = results.filter((r) => r.hadBom).map((r) => r.file);

  if (check) {
    if (bomFiles.length > 0) {
      console.error('BOM detected in files:\n' + bomFiles.map((f) => ' - ' + path.relative(process.cwd(), f)).join('\n'));
      process.exit(1);
    } else {
      console.log('No BOM detected in JSON files');
    }
  } else {
    if (bomFiles.length > 0) {
      console.log('Removed BOM from files:\n' + bomFiles.map((f) => ' - ' + path.relative(process.cwd(), f)).join('\n'));
    } else {
      console.log('No BOM detected in JSON files');
    }
  }
}

main();

