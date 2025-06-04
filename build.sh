#!/bin/bash
chmod +x ./client/node_modules/.bin/vite
npm install --prefix client
npm run build --prefix client
