export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const symbol = String(req.query.symbol || "EUR/USD");
  const interval = "1min";
  const apiKey = process.env.TWELVEDATA_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Missing TWELVEDATA_API_KEY"
    });
  }

  const url = new URL("https://api.twelvedata.com/time_series");

  url.searchParams.set("symbol", symbol);
  url.searchParams.set("interval", interval);
  url.searchParams.set("outputsize", "120");
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("format", "JSON");

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.status === "error") {
      return res.status(502).json({
        error: data.message || "Market data provider error"
      });
    }

    const values = (data.values || [])
      .reverse()
      .map(candle => ({
        time: candle.datetime,
        open: Number(candle.open),
        high: Number(candle.high),
        low: Number(candle.low),
        close: Number(candle.close),
        volume:
          candle.volume == null ? null : Number(candle.volume)
      }));

    return res.status(200).json({
      symbol,
      interval,
      values
    });

  } catch (error) {
    return res.status(500).json({
      error: "Unable to fetch market data"
    });
  }
}
