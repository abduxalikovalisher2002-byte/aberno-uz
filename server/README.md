# Chatni Claude'ga ulash

Saytdagi chat hozir shunday ishlaydi:

- toʻrtta tayyor savolga javob saytning oʻzida (`assets/js/chat.js`);
- boshqa savollarga — katalog boʻyicha qidiruv va savdo boʻlimi kontaktlari bilan javob beradi.

Boshqa savollarga **Claude** javob berishi uchun kichik server kerak. Sabab: sayt GitHub Pages'da turadi, u yerda API kalitini yashirib boʻlmaydi — kalit brauzerga tushsa, uni istalgan odam koʻrib, sizning hisobingizdan ishlata oladi. Shuning uchun kalit `chat-worker.js` serverida saqlanadi, sayt esa faqat shu serverga murojaat qiladi.

## Oʻrnatish (Cloudflare Workers, bepul tarif yetadi)

1. [console.anthropic.com](https://console.anthropic.com) da hisob oching, toʻlov usulini ulang va **API key** yarating.
2. [dash.cloudflare.com](https://dash.cloudflare.com) da hisob oching → **Workers & Pages** → **Create** → **Worker**. Nom bering (masalan, `aberno-chat`) va **Deploy** bosing.
3. **Edit code** ni bosing, standart kodni oʻchirib, `server/chat-worker.js` faylining toʻliq mazmunini qoʻying → **Deploy**.
4. Worker sahifasida **Settings → Variables and Secrets → Add**: turi **Secret**, nomi `ANTHROPIC_API_KEY`, qiymati — 1-qadamdagi kalit.
5. Worker manzilini nusxalang (masalan, `https://aberno-chat.SIZNING-NOM.workers.dev`).
6. `assets/js/chat.js` faylining boshidagi qatorni toʻldiring:

   ```js
   var CHAT_ENDPOINT = "https://aberno-chat.SIZNING-NOM.workers.dev";
   ```

7. Oʻzgarishni commit qilib, push qiling.

## Bilish kerak

- Har bir javob Anthropic hisobingizdan pul yechadi. Worker xabar uzunligi va javob hajmini cheklaydi, lekin chat ommaviy — Anthropic konsolida **oylik xarajat limitini** qoʻyib qoʻying.
- Worker faqat `ALLOWED_ORIGINS` roʻyxatidagi saytlardan kelgan soʻrovlarni qabul qiladi. Sayt `aberno.uz` domeniga koʻchsa, u roʻyxatda allaqachon bor.
- Claude faqat `chat-worker.js` ichidagi `SYSTEM` matnidagi maʼlumotga tayanadi. Katalog oʻzgarsa, shu matnni ham yangilang.
- Model: `claude-opus-5-5`. Arzonroq model kerak boʻlsa, `MODEL` qiymatini `claude-haiku-4-5` ga almashtiring va soʻrovdagi `fallbacks`, `output_config` qatorlarini hamda `anthropic-beta` sarlavhasini olib tashlang.
- Server javob bermasa yoki xato qaytarsa, chat avvalgidek katalog boʻyicha javob beradi — sayt ishlashdan toʻxtamaydi.
