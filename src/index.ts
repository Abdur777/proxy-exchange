import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

export default async function handler(req: any, res: any) {
    if (req.url === '/depth' && req.method === 'GET') {
        try {
            const market = req.query.symbol;
            const response = await fetch(`https://api.backpack.exchange/api/v1/depth?symbol=${market}`);
            const data = await response.json();
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    }

    if (req.url === '/kline' && req.method === 'GET') {
        try {
            const response = await fetch('https://api.backpack.exchange/api/v1/klines?symbol=SOL_USDC&interval=15m&startTime=1737909000');
            const data = await response.json();
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    }

    if (req.url === '/trades' && req.method === 'GET') {
        try {
            const response = await fetch('https://api.backpack.exchange/api/v1/trades?symbol=SOL_USDC&limit=50');
            const data = await response.json();
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
    }

    return res.status(404).json({ error: 'Route not found' });
}