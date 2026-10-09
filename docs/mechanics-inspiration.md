# World Passport mechanics inspiration

World Passport should borrow proven interaction patterns without copying another product's identity.

## What to borrow

### 1. Jupiter Gacha, pre-rip confidence

Jupiter makes the pack decision legible before the wallet approval: pack selection, odds, pool contents, latest pulls, quantity, and a clear open action. World Passport has one equal-odds pool, so the equivalent is a compact "The rules" panel showing `195 countries`, `1 / 195 per country`, `MagicBlock VRF`, and `devnet` before the user connects.[1]

### 2. Collector Crypt / Magic Eden, the reveal as a moment

Pack products separate the request, waiting state, reveal, and proof receipt. World Passport should make those stages visible: `Requesting`, `VRF proving`, `Stamp revealed`, then the request and callback explorer links. The result card should feel like a collectible, not a status message.[1][5]

### 3. Worldle Passport, collection progress by region

Worldle's passport turns a large country set into understandable regional progress. World Passport should keep the 195-cell album, but add five lightweight region summaries so the collection is readable without scanning every cell: Africa, Americas, Asia, Europe, and Oceania.[3]

### 4. Stamps, a simple five-step journey

Stamps explains the product through a short sequence: discover, visit, stamp, collect, complete. World Passport can use the same low-friction explanatory rhythm, translated to `Connect`, `Rip`, `Prove`, `Reveal`, `Collect`.[2]

### 5. OpenGacha, persistent exit paths

OpenGacha keeps the pull flow focused while making the post-pull state useful: the reveal is a receipt, the collection persists, and the user can continue. World Passport should offer `Rip again`, `View proof`, and the updated passport as the immediate next actions, without adding marketplace or cash-out mechanics that the current product does not support.[4]

## Product decisions for this pass

- Keep one primary action: `Rip a pack`.
- Explain equal odds before approval. Do not pretend there are rarity tiers when there are not.
- Treat the VRF wait as a deliberate reveal sequence, not a spinner with no meaning.
- Show proof links only after the relevant signatures exist.
- Use region progress as a secondary navigation aid, not a second game loop.
- Keep the devnet state unmistakable.
- Do not add monetisation, buyback, rarity, or inventory claims until the protocol actually supports them.

## Sources

[1] https://docs.jup.ag/user-docs/trade/gacha/opening-packs
[2] https://www.collectstamps.app
[3] https://worldle.com/passport
[4] https://github.com/willmexi/opengacha
[5] https://help.magiceden.io/en/articles/12629299-rip-packs-on-magic-eden
