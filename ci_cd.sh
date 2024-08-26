#! /usr/bin/bash

cd /var/www/app
git pull origin main --ff-only
npm install
pm2 restart indexws.js
