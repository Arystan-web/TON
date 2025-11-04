TONMiner (v0.1) - scaffold for a Telegram WebApp using TON Connect
---------------------------------------------------------------
What's included:
- Express server (server.js)
- Telegraf Telegram bot starter (uses BOT_TOKEN from .env)
- Public webapp (public/) with TON Connect integration
- Simple user DB (db/users.json)

Quick start (locally):
1. Fill .env with your BOT_TOKEN and WEB_APP_URL (e.g., https://tonminer.onrender.com)
2. npm install
3. npm start
4. In Telegram, start the bot and press the "Запустить TONMiner" button to open the WebApp.

Deploy to Render.com (summary):
1. Create a new Web Service on Render and connect your repository.
2. Set Environment variables: BOT_TOKEN, WEB_APP_URL (https://tonminer.onrender.com), PORT=3000
3. Build command: npm install
4. Start command: npm start
5. After deploy, make sure the URL matches WEB_APP_URL in .env and public/tonconnect-manifest.json
