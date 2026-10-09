# Devnet proof

Program: `BHjs3ULUTBfY5LSccdUGem37MBjTVMmLoCNPYn3QV1VV`

Cluster: Solana devnet

## Live dApp

`https://world-passport-tgs.vercel.app`

## Explorer links

- Program: https://explorer.solana.com/address/BHjs3ULUTBfY5LSccdUGem37MBjTVMmLoCNPYn3QV1VV?cluster=devnet
- Passport PDA: https://explorer.solana.com/address/CDTncigCDDS7FM3pr1DuzTLaxiwULyJoniBuohpCH9Po?cluster=devnet
- Rip 1 request: https://explorer.solana.com/tx/a1KHyYuPrKPQufT2kgeC7q3RZxHrnoHX6mp3QvGnW2oD4QsRVcqdQ5AQHX2hzf41XEBUa8NVtCQk44KzNoJ4EAi?cluster=devnet
- Rip 1 callback: https://explorer.solana.com/tx/TDq9xs9yKDj8PGK63S664qemoXpXmgMNucA4Kax52Pdw9LDoCq7GZfPdpyY8Yn6968BDmGcjs3w6fnU7dDW4v93?cluster=devnet
- Rip 2 request: https://explorer.solana.com/tx/3zhohHPWqbuinR3ppcdcHPR6d2oWwKe1t7ZRi95Uxuss2TLbVD3r2PWMoRP994mvWha3GG1Y93WSPb3kX5f2rw9o?cluster=devnet
- Rip 2 callback: https://explorer.solana.com/tx/39SrcFf4Wr7B5AQ8o1ZSjnJYaaLDFv46cPiFqds69YijPB2RCxY55w1hhBPN1zVBTbrft49SieoXrumbtosjMq6c?cluster=devnet


The current deployed program completed four live request to VRF callback flows with the devnet deploy wallet. The passport PDA is `CDTncigCDDS7FM3pr1DuzTLaxiwULyJoniBuohpCH9Po`.

- Rip 1: Nepal, request transaction `a1KHyYuPrKPQufT2kgeC7q3RZxHrnoHX6mp3QvGnW2oD4QsRVcqdQ5AQHX2hzf41XEBUa8NVtCQk44KzNoJ4EAi`, callback transaction `TDq9xs9yKDj8PGK63S664qemoXpXmgMNucA4Kax52Pdw9LDoCq7GZfPdpyY8Yn6968BDmGcjs3w6fnU7dDW4v93`.
- Rip 2: Yemen, request transaction `3zhohHPWqbuinR3ppcdcHPR6d2oWwKe1t7ZRi95Uxuss2TLbVD3r2PWMoRP994mvWha3GG1Y93WSPb3kX5f2rw9o`, callback transaction `39SrcFf4Wr7B5AQ8o1ZSjnJYaaLDFv46cPiFqds69YijPB2RCxY55w1hhBPN1zVBTbrft49SieoXrumbtosjMq6c`.
- Rip 3: Nigeria, request transaction `sMUvBt9mUydjRybhdX8WTXUuRTygjsJSxFhPhXuc4ywDXJ1XZYpmSS8J2P8kgaLz4ch712D6dwM6mwD7Woeitvb`, callback transaction `33xDVbrB2GyZxKRoYWMEgtGeGgroeAfZ5CHzzwEsdHzZJgy8b6P5NGDNNy8LnJrx3MPE7UkxtXQ67HUVVWFzZvXx`.
- Rip 4: Jamaica, executed through the page's browser code path with a Phantom-compatible signing harness. The request and callback proof links were rendered by the page and the passport state advanced to 4 rips and 4 unique countries.

Explorer links use the standard form:

`https://explorer.solana.com/tx/<SIGNATURE>?cluster=devnet`

The live test also verified the passport bitmap contained country indexes 126, 134, and 193 after rip 3, and the frontend account parser matched the on-chain layout.
