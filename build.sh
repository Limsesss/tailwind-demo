#!/bin/bash
set -e

echo "Installing dependencies in client..."
npm install --prefix client

echo "Building client..."
npm run build --prefix client
