#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/remove-bom.js <path-to-file>');
  process.exit(1);
}
const abs = path.resolve(process.cwd(), file);
let buf = fs.readFileSync(abs);
// UTF-8 BOM bytes: EF BB BF
if (buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
  buf = buf.slice(3);
  fs.writeFileSync(abs, buf);
  console.log(`Removed BOM from ${file}`);
} else {
  // Also handle a stray U+FEFF at start if written as UTF-16/UTF-8 char in text
  const text = buf.toString('utf8');
  if (text.charCodeAt(0) === 0xFEFF) {
    const without = text.slice(1);
    fs.writeFileSync(abs, without, 'utf8');
    console.log(`Removed leading U+FEFF char from ${file}`);
  } else {
    console.log(`No BOM detected in ${file}`);
  }
}
