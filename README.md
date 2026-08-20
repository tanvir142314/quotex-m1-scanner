# Auto Scanner Pro — Real M1

## What is included
- Vercel serverless endpoint `/api/candles`
- Twelve Data 1-minute candle retrieval
- RSI(14)
- EMA(9) / EMA(21)
- Basic 3-candle fair-value-gap detection
- 8-candle liquidity sweep detection
- Weighted UP/DOWN score
- Bookmarklet overlay for use alongside a trading page

## Deploy
1. Import this folder into Vercel.
2. Add environment variable:
   `TWELVEDATA_API_KEY=YOUR_KEY`
3. Redeploy.
4. Copy the one-line contents of `bookmarklet.txt` into a browser bookmark URL.
5. Open the deployed page/trading page and launch the bookmark.

## Market-data symbol
The default is `EUR/USD`. Twelve Data supports many symbols, but availability depends on your plan/data permissions. You can enter another supported symbol when the bookmarklet starts.

## Signal logic
The score combines:
- EMA9 > EMA21 or below = trend component
- RSI14 = momentum/overbought-oversold component
- recent 8-bar liquidity sweep
- simple 3-candle FVG
- latest candle direction

The displayed percentage is a model score, NOT a win probability or guarantee.

## Important
This project does not automatically click Quotex controls or place trades. It only provides an informational signal overlay. Respect the trading platform's terms and the market-data provider's license.
