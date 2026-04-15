#!/usr/bin/env bash
# Scrape all pfr-size × stack combinations in raw mode.
# Run daily — skips already-completed files, stops on first 429 quota hit.
#
# Usage:
#   bash scraper/scrape_all.sh <token>
#
# Priority order: 2.5bb first (most stacks already have processed data but
# need raw), then 2bb, 3bb, 2.25bb. Within each pfr size: 150, 200 first
# (nothing scraped yet), then 100, 40, 50, 70 (re-scraping into raw format).

TOKEN="${1}"
if [ -z "$TOKEN" ]; then
  echo "Usage: bash scraper/scrape_all.sh <token>"
  exit 1
fi

BASE="node scraper/index.js --token $TOKEN --stake nl100 --raw --skip-existing"

run() {
  local pfr=$1 stack=$2
  echo ""
  echo "══════════════════════════════════════════════"
  echo "  nl100 / ${pfr} / ${stack}bb"
  echo "══════════════════════════════════════════════"
  $BASE --pfr-size "$pfr" --stack "$stack"
  local exit_code=$?
  if [ $exit_code -ne 0 ]; then
    echo "Scraper exited with code $exit_code — stopping."
    exit $exit_code
  fi
}

# ── 2.5bb (100bb already done; still runs but skips existing files) ──────────
run 2.5bb 150
run 2.5bb 200
run 2.5bb 100
run 2.5bb 40
run 2.5bb 50
run 2.5bb 70

# ── 2bb ──────────────────────────────────────────────────────────────────────
run 2bb 150
run 2bb 200
run 2bb 100
run 2bb 40
run 2bb 50
run 2bb 70

# ── 3bb ──────────────────────────────────────────────────────────────────────
run 3bb 150
run 3bb 200
run 3bb 100
run 3bb 40
run 3bb 50
run 3bb 70

# ── 2.25bb ───────────────────────────────────────────────────────────────────
run 2.25bb 150
run 2.25bb 200
run 2.25bb 100
run 2.25bb 40
run 2.25bb 50
run 2.25bb 70

echo ""
echo "All done."
