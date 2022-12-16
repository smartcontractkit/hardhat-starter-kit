const coinMarketCapCoinId = args[0];
const coinGeckoCoinId = args[1];
const coinPaprikaCoinId = args[2];
const badApiCoinId = args[3];

const scalingFactor = parseInt(args[4]);

if (!secrets.apiKey) {
  throw Error('API_KEY environment variable not set for CoinMarketCap API.  Get a free key from https://coinmarketcap.com/api/')
}

// OCR2DR.makeHttpRequest function parameters:
// - url
// - method (optional, defaults to 'GET')
// - headers: headers supplied as an object (optional)
// - params: URL query parameters supplied as an object (optional)
// - data: request body supplied as an object (optional)
// - timeout: maximum request duration in ms (optional, defaults to 10000ms)
// - responseType: expected response type (optional, defaults to 'json')

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

if (!coinMarketCapResponse.error) {
  prices.push(coinMarketCapResponse.data.data[coinMarketCapCoinId].quote.USD.price);
}
else {
  console.log('CoinMarketCap Error');
  console.log({ ...coinMarketCapResponse });
}
if (!coinGeckoResponse.error) {
  prices.push(coinGeckoResponse.data[coinGeckoCoinId].usd);
} else {
  console.log('CoinGecko Error');
  console.log({ ...coinGeckoResponse });
}
if (!coinPaprikaResponse.error) {
  prices.push(coinPaprikaResponse.data.quotes.USD.price);
} else {
  console.log('CoinPaprika Error');
  console.log({ ...coinPaprikaResponse });
}
  
// A single failed API request does not cause the whole request to fail
if (!badApiResponse.error) {
  prices.push(httpResponses[3].data.price.usd);
} else {
  console.log('Bad API request failed. (This message is expected and just for demonstration purposes.)')
}
  
// At least 2 out of 4 prices are needed to aggregate the median price
if (prices.length < 2) {
  // If an error is thrown, it will be returned back to the smart contract
  throw Error('More than 1 API failed');
}

const medianPrice = prices.sort((a, b) => a - b)[Math.round(prices.length / 2)];
console.log(`Median Bitcoin price: $${medianPrice.toFixed(2)}`);

// Use the following functions to encode a single value:
// - OCR2DR.encodeUint256
// - OCR2DR.encodeInt256
// - OCR2DR.encodeString
// Or return a Buffer for a custom byte encoding
return OCR2DR.encodeUint256(Math.round(medianPrice * 100));