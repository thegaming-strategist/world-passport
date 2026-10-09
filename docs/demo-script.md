# Demo run sheet

Target length: 90 seconds.

## 0:00-0:10, premise

Open `https://world-passport-tgs.vercel.app`.

Show the hero, the `Before you rip` rules, and the five-step journey. Say:

> World Passport is a 195-country stamp collection. Each rip is settled by MagicBlock VRF, so the app cannot choose the country.

## 0:10-0:25, rules and collection

Scroll through the rules and atlas. Point out:

- 195 countries
- Equal odds, 1 / 195 per country
- MagicBlock VRF
- Devnet only
- Regional progress and the 195-cell atlas

## 0:25-0:40, connect and request

Connect Phantom on Solana devnet. Click `Rip a pack` and approve the request. Keep the reveal card visible while the UI changes from `Requesting` to `VRF proving`.

Say:

> The client submits the request. It does not generate or select the country.

## 0:40-0:58, reveal

Wait for the MagicBlock callback. Show the country stamp, region, rip number, randomness receipt, and the new or duplicate label. Open the request Explorer link.

## 0:58-1:15, proof

Open the callback Explorer link and show the program ID, the MagicBlock VRF program in the transaction accounts, and the passport PDA state. Say:

> The oracle verifies the proof on-chain, then the callback writes the country bit to the passport PDA.

## 1:15-1:30, source and close

Show the public GitHub repository:

`https://github.com/thegaming-strategist/world-passport`

Close with:

> Open a pack. Stamp the world. Every destination comes with a receipt.

## Recording notes

- Use a clean browser profile with Phantom already configured for devnet.
- Do not expose wallet secret material.
- Keep the browser at desktop width for the first pass, then show the responsive atlas briefly if time allows.
- Use the already verified devnet wallet only after confirming it has enough test SOL.
- The public proof links are in `docs/devnet-proof.md`.
