const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const RAPID_KEY = "05f5c247dfmshe6b911ae5dfa7aap14a781jsna9ba4be68c50";
const RAPID_HOST = "bigdaddy-goagames-tiranga-91club-trx-api-with-result.p.rapidapi.com";

app.get('/api/wingo', async (req, res) => {
  try {
    const mode = req.query.mode || '1m';
    const typeId = mode === '30s' ? 2 : 1; 
    const url = `https://${RAPID_HOST}/api/v1/wingoresult/type/${typeId}`;
    const response = await fetch(url, {
      headers: { 'x-rapidapi-key': RAPID_KEY, 'x-rapidapi-host': RAPID_HOST }
    });
    const data = await response.json();
    res.json({ status: true, history: data.data || data });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});
app.listen(process.env.PORT || 3000, () => console.log("Server is running!"));