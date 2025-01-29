import express from 'express';
import cors from 'cors';
// import fetch from 'node-fetch';

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.get('/depth', async (req, res) => {
    try {
        const market = req.query.symbol
        console.log(market)
        const response = await fetch(`https://api.backpack.exchange/api/v1/depth?symbol=${market}`);
        const data = await response.json();
        // console.log(data)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/tickers', async (req, res) => {
    try {
        const response = await fetch('https://api.backpack.exchange/api/v1/tickers');
        const data = await response.json();
        // console.log(data)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/kline', async (req, res) => {
    try {
        const response = await fetch('https://api.backpack.exchange/api/v1/klines?symbol=SOL_USDC&interval=15m&startTime=1737909000');
        const data = await response.json();
        console.log("from kline",data)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/trades', async (req, res) => {
    try {
        const response = await fetch('https://api.backpack.exchange/api/v1/trades?symbol=SOL_USDC&limit=50');
        const data = await response.json();
        // console.log(data)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = app;