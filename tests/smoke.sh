#!/usr/bin/env bash
set -euo pipefail

node --check widget.js

if rg -n "^(<<<<<<<|=======|>>>>>>>)" widget.css widget.html widget.js >/dev/null; then
  echo "Conflict markers found" >&2
  exit 1
fi

# Verify key accessibility markers exist in widget source.
rg -n 'aria-expanded="false"' widget.js >/dev/null
rg -n 'aria-labelledby="\$\{PANEL_TITLE_ID\}"' widget.js >/dev/null
rg -n 'role="status" aria-live="polite"' widget.js >/dev/null
