// Test the page's exact browser implementations against the known-good Node versions:
// 1) crypto.subtle-based Anchor discriminator (page code, verbatim)
// 2) deterministic dupe detection via bitmap diff (page logic, verbatim)
const { createHash } = require('crypto');

async function sha256hex(text) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('');
}
async function disc(name) {
  const hex = await sha256hex(name);
  return new Uint8Array(hex.match(/.{2}/g).map(x => parseInt(x, 16)).slice(0, 8));
}

(async () => {
  // 1) disc() vs node crypto reference (the discriminators live.cjs used successfully 3x on devnet)
  const ref = (name) => Buffer.from(createHash('sha256').update(name).digest()).subarray(0, 8);
  for (const name of ['global:initialize', 'global:rip_pack']) {
    const a = await disc(name);
    const b = ref(name);
    const same = Buffer.from(a).equals(b);
    console.log(name, '->', Buffer.from(a).toString('hex'), same ? 'MATCH' : 'MISMATCH vs ' + b.toString('hex'));
    if (!same) process.exit(1);
  }

  // 2) dupe detection: page logic (verbatim inner block)
  function isNewStamp(prevStamps, newStamps, country) {
    const byte = newStamps[Math.floor(country / 8)];
    return ((byte >> (country % 8)) & 1) === 1 &&
           ((prevStamps[Math.floor(country / 8)] >> (country % 8)) & 1) === 0;
  }
  const prev = new Uint8Array(25); prev[15] = 0b01000000; // country 126 set (byte 15, bit 6)
  const dupStamps = prev.slice(); // same state, dupe of 126
  const newStamps = prev.slice(); newStamps[16] = 0b01000000; // country 134 also set (byte 16, bit 6)
  console.log('dupe 126 detected as NOT new:', isNewStamp(prev, dupStamps, 126) === false);
  console.log('new 134 detected as new:', isNewStamp(prev, newStamps, 134) === true);
  console.log('re-rip of 126 after 134 still not new:', isNewStamp(dupStamps, newStamps, 126) === false);

  // 3) clientSeed byte packing: data = disc + [seed] - matches live.cjs Buffer.concat
  const seed = 210;
  const packed = new Uint8Array([...await disc('global:rip_pack'), seed]);
  const refPacked = Buffer.concat([ref('global:rip_pack'), Buffer.from([seed])]);
  console.log('seed packing matches:', Buffer.from(packed).equals(refPacked));
})().catch(e => { console.error(e); process.exit(1); });