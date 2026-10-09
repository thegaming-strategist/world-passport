# Solana Blitz v9 submission copy

## Project

World Passport

## One-line pitch

A provably fair Solana country-stamp gacha where MagicBlock VRF chooses the destination and every passport stamp is auditable on-chain.

## Description

World Passport turns a pack-opening loop into a global collection. A user connects Phantom, requests a rip, waits for a MagicBlock VRF proof, and receives one of 195 country stamps. The country is selected only after the VRF callback, then stored in the user's Passport PDA as a bitmap with rip count, unique count, last country, and raw randomness receipt.

The frontend keeps the ritual compact: clear rules before the rip, request and proving states, a collectible reveal, Explorer receipts, regional progress, and a full country atlas. Duplicates are possible and are identified by comparing the on-chain bitmap before and after the callback.

## MagicBlock integration

The Anchor program uses `ephemeral-rollups-sdk` with the VRF feature. `rip_pack` requests randomness from the MagicBlock queue. The VRF callback is protected by the SDK callback macro and consumes only verified randomness. The program uses deterministic rejection sampling rather than a biased modulo mapping when converting the verified random bytes into a country index from 0 to 194.

The deployed program has completed live devnet request, proof, callback, and state-update flows. The public proof transactions are linked in [`docs/devnet-proof.md`](./devnet-proof.md).

## Links

- Live dApp: https://world-passport-tgs.vercel.app
- GitHub: https://github.com/thegaming-strategist/world-passport
- Program: https://explorer.solana.com/address/BHjs3ULUTBfY5LSccdUGem37MBjTVMmLoCNPYn3QV1VV?cluster=devnet
- Devnet proof: https://github.com/thegaming-strategist/world-passport/blob/main/docs/devnet-proof.md
- Demo video: to be recorded from [`docs/demo-script.md`](./demo-script.md)

## Technical facts

- Cluster: Solana devnet
- Program: `BHjs3ULUTBfY5LSccdUGem37MBjTVMmLoCNPYn3QV1VV`
- MagicBlock VRF program: `Vrf1RNUjXmQGjmQrQLvJHs9SNkvDJEsRVFPkfSQUwGz`
- Countries: 195
- Frontend: static vanilla JavaScript, Phantom, raw Solana instructions
- Backend: none
- Status: working devnet demo, not mainnet financial infrastructure

## Verification commands

```bash
node app/check.cjs
node app/page-logic-test.cjs
```
