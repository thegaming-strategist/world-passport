#!/usr/bin/env bash
# Build the world-passport Anchor program inside WSL
set -e
export PATH="/root/.cargo/bin:/root/.avm/bin:/root/.local/share/solana/install/active_release/bin:$PATH"
cd /root/world-passport
anchor build 2>&1
echo "BUILD_EXIT=$?"