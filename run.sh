#!/usr/bin/env bash
cd frontend
pnpm build
cd ..
shuttle run --secrets backend/Secrets.toml