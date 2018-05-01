//
// testing ccxt from commmandline
//

import ccxt from "ccxt";
import { API_KEY, API_SECRET, PASSWORD } from "../../credentials";

(async () => {
  let exchange = new ccxt.gdax({
    apiKey: API_KEY,
    secret: API_SECRET,
    password: PASSWORD
  });

  exchange.urls["api"] = exchange.urls["test"];

  try {
    let trades = await exchange.fetchMyTrades();
    console.log("trades", trades);
  } catch (e) {
    if (e instanceof ccxt.DDoSProtection || e.message.includes("ECONNRESET")) {
      console.log("[DDoS Protection] " + e.message);
    } else if (e instanceof ccxt.RequestTimeout) {
      console.log("[Request Timeout] " + e.message);
    } else if (e instanceof ccxt.AuthenticationError) {
      console.log("[Authentication Error] " + e.message);
    } else if (e instanceof ccxt.ExchangeNotAvailable) {
      console.log("[Exchange Not Available Error] " + e.message);
    } else if (e instanceof ccxt.ExchangeError) {
      console.log("[Exchange Error] " + e.message);
    } else if (e instanceof ccxt.NetworkError) {
      console.log("[Network Error] " + e.message);
    } else {
      throw e;
    }
  }
})();
