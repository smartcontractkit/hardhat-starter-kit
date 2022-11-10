const coinMarketCapCoinId = args[0];
const coinGeckoCoinId = args[1];
const coinPaprikaCoinId = args[2];
const badApiCoinId = args[3];

const scalingFactor = parseInt(args[4]);

// Use multiple APIs & aggregate the results to enhance decentralization
const coinMarketCapResponse = await OCR2DR.makeHttpRequest({
  url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?convert=USD&id=${coinMarketCapCoinId}`,
  // Get a free API key from https://coinmarketcap.com/api/
  headers: { 'X-CMC_PRO_API_KEY': secrets.apiKey }
});
const coinGeckoResponse = await OCR2DR.makeHttpRequest({
  url: `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoCoinId}&vs_currencies=usd`,
});
const coinPaprikaResponse = await OCR2DR.makeHttpRequest({
  url: `https://api.coinpaprika.com/v1/tickers/${coinPaprikaCoinId}`
});
const badApiResponse = await OCR2DR.makeHttpRequest({
  url: `https://badapi.com/price/symbol/${badApiCoinId}`
});

const prices = [];
if (!coinMarketCapResponse.error)
  prices.push(coinMarketCapResponse.data.data[coinMarketCapCoinId].quote.USD.price);
if (!coinGeckoResponse.error)
  prices.push(coinGeckoResponse.data[coinGeckoCoinId].usd);
if (!coinPaprikaResponse.error)
  prices.push(coinPaprikaResponse.data.quotes.USD.price);
// A single failed API request does not cause the whole request to fail
if (!badApiResponse.error)
  prices.push(httpResponses[3].data.price.usd);

// At least 3 prices are needed to aggregate the median price
if (prices.length < 3)
  throw Error('More than 1 API failed');

const medianPrice = prices.sort((a, b) => a - b)[Math.round(prices.length / 2)];

console.log(`Median Bitcoin price: $${medianPrice.toFixed(2)}`);

return OCR2DR.encodeUint256(Math.round(medianPrice * 100));