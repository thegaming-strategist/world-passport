import * as anchor from "@coral-xyz/anchor";
import { Program, web3 } from "@coral-xyz/anchor";
import { WorldPassport } from "../target/types/world_passport";
import { PublicKey } from "@solana/web3.js";
import { assert } from "chai";

// Devnet base-layer VRF queue
const DEFAULT_BASE_QUEUE = new PublicKey(
  process.env.VRF_BASE_QUEUE || "Cuj97ggrhhidhbu39TijNVqE74xvKJ69gDervRUXAxGh"
);

describe("world-passport", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider() as anchor.AnchorProvider;
  const program = anchor.workspace.WorldPassport as Program<WorldPassport>;

  const passportPda = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("passport"), provider.publicKey!.toBytes()],
    program.programId
  )[0];

  it("Initializes the passport!", async () => {
    const tx = await program.methods
      .initialize()
      .rpc({ skipPreflight: true, commitment: "confirmed" });
    console.log("initialize tx:", tx);
    const p = await program.account.passport.fetch(passportPda);
    assert.equal(p.uniqueCountries, 0);
    assert.equal(p.ripCount, 0);
  });

  it("Rips a pack and receives a VRF-verified stamp!", async function () {
    this.timeout(30_000);
    const clientSeed = Math.floor(Math.random() * 256);
    const seedTag = `client_seed=${clientSeed}`;

    let resolveSig!: (sig: string) => void;
    const sigPromise = new Promise<string>((r) => { resolveSig = r; });
    const subId = provider.connection.onLogs(
      program.programId,
      (info) => {
        if (
          !info.err &&
          info.logs.some((l) => l.includes("Stamp received")) &&
          info.logs.some((l) => l.includes(seedTag))
        ) {
          resolveSig(info.signature);
        }
      },
      "confirmed"
    );

    try {
      const before = await program.account.passport.fetch(passportPda);
      const tx = await program.methods
        .ripPack(clientSeed)
        .accounts({ oracleQueue: DEFAULT_BASE_QUEUE })
        .rpc({ skipPreflight: true, commitment: "confirmed" });
      console.log("ripPack tx:", tx);

      const sig = await Promise.race([
        sigPromise,
        new Promise<null>((r) => setTimeout(() => r(null), 20_000)),
      ]);
      if (!sig) throw new Error("callback_rip not observed within 20s.");
      console.log("callback tx:", sig);

      const after = await program.account.passport.fetch(passportPda);
      assert.equal(after.ripCount, before.ripCount + 1);
      assert.isAtLeast(after.uniqueCountries, before.uniqueCountries);
      assert.isAtMost(after.lastCountry, 194);
      console.log("stamp:", after.lastCountry, "unique:", after.uniqueCountries);
    } finally {
      await provider.connection.removeOnLogsListener(subId);
    }
  });
});