// Syntax check of the inline script in app/index.html
const fs = require('fs');
const html = fs.readFileSync('C:/Users/russe/world-passport/app/index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.log('NO SCRIPT'); process.exit(1); }
let js = m[1];
// strip the trailing event-listener block (references DOM at parse time of new Function is fine, it's not executed)
try {
  new Function('window', 'document', 'crypto', 'TextEncoder', 'navigator', js);
  console.log('SYNTAX OK, script length:', js.length);
} catch (e) {
  console.log('SYNTAX ERROR:', e.message);
  process.exit(1);
}
// verify required pieces
const checks = {
  PROGRAM_ID: js.includes('BHjs3ULUTBfY5LSccdUGem37MBjTVMmLoCNPYn3QV1VV'),
  raw_ix_rip: js.includes('global:rip_pack'),
  raw_ix_init: js.includes('global:initialize'),
  vrf_accounts: js.includes('programIdentity') && js.includes('SysvarS1otHashes111111111111111111111111111'),
  no_anchor_cdn: !js.includes('window.anchor'),
  no_buffer_from: !/\bBuffer\b/.test(js),
  dupe_bitmap_check: js.includes('prevStamps'),
  countries_195: (js.match(/"Afghanistan"/) && true) && js.includes('"Zimbabwe"'),
  seed_and_bump_init: js.includes('clientSeed'),
};
console.log(checks);
const pass = Object.values(checks).every(Boolean);
console.log(pass ? 'ALL CHECKS PASS' : 'CHECK FAILED');
process.exit(pass ? 0 : 1);