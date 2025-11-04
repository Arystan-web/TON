(function(){
  const tg = window.Telegram?.WebApp;
  if (tg) tg.expand();

  const connector = new TON_CONNECT.TonConnect({
    manifestUrl: `${window.location.origin}/tonconnect-manifest.json`
  });

  const connectBtn = document.getElementById('connect');
  const statusP = document.getElementById('status');

  async function saveUser(telegramId, tonAddress){
    try {
      const res = await fetch('/api/save-user', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ telegram_id: telegramId, ton_address: tonAddress })
      });
      return res.json();
    } catch(e){
      console.error(e);
      return { ok:false };
    }
  }

  connectBtn.addEventListener('click', async ()=>{
    statusP.innerText = 'Ожидание выбора кошелька...';
    try {
      const wallets = await connector.getWallets();
      // if wallets list is empty, open connect modal:
      if (!wallets || wallets.length === 0) {
        await connector.connect();
      } else {
        // try connect using first wallet's universal link
        await connector.connect({ universalLink: wallets[0].universalLink });
      }
    } catch(e) {
      console.error(e);
      statusP.innerText = 'Ошибка подключения кошелька';
    }
  });

  connector.onStatusChange(async (walletInfo) => {
    if (!walletInfo) return;
    const address = walletInfo.account.address;
    statusP.innerText = 'Подключено: ' + address;

    // Try to get Telegram user id from web app init data (unsafe data available)
    let telegramId = null;
    try {
      telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || null;
    } catch(e){
      telegramId = null;
    }

    // If Telegram id not available, ask user to paste it (fallback)
    if (!telegramId) {
      statusP.innerText += ' — Telegram ID не найден. Пожалуйста, вернитесь в чат и отправьте /link.';
    }

    // Save to backend if we have telegramId
    if (telegramId) {
      await saveUser(telegramId, address);
    }
  });

})();
