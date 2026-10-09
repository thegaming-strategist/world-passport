# World Passport 🌍

**Open a pack. Stamp the world.** A provably fair country-stamp gacha on Solana, built for [MagicBlock](https://magicblock.app) Solana Blitz v9.

Every pack rip is settled by [MagicBlock VRF](https://docs.magicblock.gg) — a verifiable randomness oracle. An independent oracle computes your random value with an on-chain verified cryptographic proof (RFC 9381). Nobody, not even this app, can pick your country. Collect all 195.

## How it works

1. **Rip** — your wallet requests randomness from the MagicBlock VRF oracle queue, mixing in your client seed.
2. **Prove** — an oracle computes the value with a cryptographic proof; the MagicBlock VRF program verifies the proof on-chain. Invalid proof → no stamp, ever.
3. **Stamp** — the callback mints a random country (0–194) into your passport PDA as a 195-bit bitmap. Every rip is auditable on Solana Explorer.

## Program

| Instruction | What it does |
|---|---|
| `initialize` | Creates your passport PDA (`[b"passport", owner]`) |
| `rip_pack` | Requests VRF randomness; country revealed only in callback |
| `callback_rip` | VRF-only entry point; consumes verified randomness, stamps the country, stores the raw randomness bytes for audit |

The callback is protected by the `#[vrf_callback]` macro — only the VRF program can invoke it, and the VRF program only signs after the proof verifies on-chain.

## Live

- dApp: `https://world-passport.vercel.app` (deployed)
- Cluster: Devnet
- Program: `BHjs3ULUTBfY5LSccdUGem37MBjTVMmLoCNPYn3QV1VV`
- Example rip (request → oracle → proof → stamp): see explorer links in the dApp

## Tech

- Anchor 1.0.2, `anchor-lang` + `ephemeral-rollups-sdk` (VRF feature)
- Vanilla JS frontend, Phantom wallet, no backend
- Flag art from flagcdn

## Run locally

```bash
avm use 1.0.2
anchor build
anchor deploy  # devnet
# serve app/ with any static server; put target/idl/world_passport.json at app/idl/
```

Built by Russ Clarke for Solana Blitz v9. Randomness that proves itself.