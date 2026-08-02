#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting Khoa.Vo portfolio dev server..."
exec npm run dev -- --host 0.0.0.0 --port 5173
