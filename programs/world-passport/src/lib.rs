use anchor_lang::prelude::*;
use ephemeral_rollups_sdk::{
    anchor::{vrf, vrf_callback},
    vrf::{
        self,
        instructions::{create_request_scoped_randomness_ix, RequestRandomnessParams},
        types::SerializableAccountMeta,
    },
};

declare_id!("BHjs3ULUTBfY5LSccdUGem37MBjTVMmLoCNPYn3QV1VV");

pub const PASSPORT: &[u8] = b"passport";
pub const COUNTRY_COUNT: u16 = 195;

#[program]
pub mod world_passport {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let passport = &mut ctx.accounts.passport;
        passport.authority = ctx.accounts.payer.key();
        passport.stamps = [0u8; 25];
        passport.rip_count = 0;
        passport.unique_countries = 0;
        passport.last_country = 0;
        passport.last_randomness = [0u8; 32];
        passport.bump = ctx.bumps.passport;
        msg!("Passport initialized for {:?}", passport.authority);
        Ok(())
    }

    pub fn rip_pack(ctx: Context<RipPack>, client_seed: u8) -> Result<()> {
        require!(
            ctx.accounts.passport.authority == ctx.accounts.payer.key(),
            PassportError::NotPassportOwner
        );
        msg!("Requesting randomness with client_seed={}", client_seed);
        let ix = create_request_scoped_randomness_ix(RequestRandomnessParams {
            payer: ctx.accounts.payer.key(),
            oracle_queue: ctx.accounts.oracle_queue.key(),
            callback_program_id: ID,
            callback_discriminator: instruction::CallbackRip::DISCRIMINATOR.to_vec(),
            caller_seed: [client_seed; 32],
            accounts_metas: Some(vec![SerializableAccountMeta {
                pubkey: ctx.accounts.passport.key(),
                is_signer: false,
                is_writable: true,
            }]),
            callback_args: Some(vec![client_seed]),
            ..Default::default()
        });
        ctx.accounts
            .invoke_signed_vrf(&ctx.accounts.payer.to_account_info(), &ix)?;
        Ok(())
    }

    pub fn callback_rip(
        ctx: Context<CallbackRip>,
        randomness: [u8; 32],
        _client_seed: u8,
    ) -> Result<()> {
        // SDK has no u16 helper; derive a bias-free country from the verified bytes.
        // Rejection sampling: consume 4-byte chunks, reject values >= largest multiple of 195.
        // P(unfair draw) is under 0.000001 per chunk; with 8 chunks the bias is negligible.
        let passport = &mut ctx.accounts.passport;
        let limit: u32 = u32::MAX - (u32::MAX % (COUNTRY_COUNT as u32));
        let mut country: u16 = 0;
        for i in 0..8 {
            let chunk = u32::from_le_bytes([
                randomness[i * 4],
                randomness[i * 4 + 1],
                randomness[i * 4 + 2],
                randomness[i * 4 + 3],
            ]);
            if chunk < limit {
                country = (chunk % (COUNTRY_COUNT as u32)) as u16;
                break;
            }
        }
        let byte_idx = (country / 8) as usize;
        let bit_idx = country % 8;
        let already = (passport.stamps[byte_idx] >> bit_idx) & 1 == 1;
        if !already {
            passport.stamps[byte_idx] |= 1 << bit_idx;
            passport.unique_countries = passport.unique_countries.saturating_add(1);
        }
        passport.rip_count = passport.rip_count.saturating_add(1);
        passport.last_country = country;
        passport.last_randomness = randomness;
        msg!(
            "Stamp received: country={} new={} unique={} rip={}",
            country,
            !already,
            passport.unique_countries,
            passport.rip_count
        );
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init_if_needed,
        payer = payer,
        space = Passport::LEN,
        seeds = [PASSPORT, payer.key().to_bytes().as_slice()],
        bump
    )]
    pub passport: Account<'info, Passport>,
    pub system_program: Program<'info, System>,
}

#[vrf]
#[derive(Accounts)]
pub struct RipPack<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(seeds = [PASSPORT, payer.key().to_bytes().as_slice()], bump)]
    pub passport: Account<'info, Passport>,
    /// CHECK: MagicBlock VRF oracle queue
    #[account(
        mut,
        constraint =
            oracle_queue.key() == vrf::consts::DEFAULT_QUEUE || // Devnet
            oracle_queue.key() == vrf::consts::DEFAULT_TEST_QUEUE // Local
    )]
    pub oracle_queue: UncheckedAccount<'info>,
}

#[vrf_callback]
#[derive(Accounts)]
pub struct CallbackRip<'info> {
    #[account(mut)]
    pub passport: Account<'info, Passport>,
}

#[account]
pub struct Passport {
    pub authority: Pubkey,
    pub stamps: [u8; 25],
    pub rip_count: u32,
    pub unique_countries: u16,
    pub last_country: u16,
    pub last_randomness: [u8; 32],
    pub bump: u8,
}

impl Passport {
    const LEN: usize = 8 + 32 + 25 + 4 + 2 + 2 + 32 + 1;
}

#[error_code]
pub enum PassportError {
    #[msg("Only the passport owner can rip packs")]
    NotPassportOwner,
}