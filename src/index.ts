import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 5001;

app.use(cors());

app.get('/depth', async (req: Request, res: Response) => {
    try {
        const market = req.query.symbol as string;
        console.log(market);
        const response = await fetch(`https://api.backpack.exchange/api/v1/depth?symbol=${market}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/tickers', async (req: Request, res: Response) => {
    try {
        const response = await fetch('https://api.backpack.exchange/api/v1/tickers');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/kline', async (req: Request, res: Response) => {
    try {
        const market = req.query.symbol as string;
        console.log(market);
        const response = await fetch(`https://api.backpack.exchange/api/v1/klines?symbol=${market}&interval=15m&startTime=1737909000`);
        const data = await response.json();
        console.log("from kline", data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/trades', async (req: Request, res: Response) => {
    try {
        const market = req.query.symbol as string;
        console.log(market);
        const response = await fetch(`https://api.backpack.exchange/api/v1/trades?symbol=${market}&limit=50`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
