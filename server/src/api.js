import ccxt from "ccxt";
import { transaction } from "objection";
import Trades from "./models/Trades";
import { API_KEY, API_SECRET, PASSWORD } from "../credentials";
import reformatTrades from "./utils/reformatTrades";

const exchange = new ccxt.gdax({
  apiKey: API_KEY,
  secret: API_SECRET,
  password: PASSWORD
});

// use the sandbox api :)
exchange.urls["api"] = exchange.urls["test"];

export default router => {
  router.get("/api/v1/trades/:id", async (req, res) => {
    const pageNum = await parseInt(req.params.id, 10);

    // use page num query and trades
    const trades = await Trades.query()
      .page(pageNum, 4)
      .orderBy("trade_timestamp", "desc");

    if (!trades) {
      res.json({ trades: [] });
    } else {
      res.json({ trades });
    }
  });

  router.post("/api/v1/trades", async (req, res) => {
    // ordering for timestamp
    const allSavedTrades = await Trades.query().orderBy(
      "trade_timestamp",
      "desc"
    );

    const lengthOfTrades = await allSavedTrades.length;

    // if you have no trades
    if (lengthOfTrades === 0 || undefined) {
      // go get all trades
      const trades = await exchange.fetchMyTrades();
      // match my database schema
      const restructuredTrades = await reformatTrades(trades);

      // batch insert
      const batchAdding = await transaction(Trades.knex(), trx => {
        return Trades.query(trx).insert(restructuredTrades);
      });

      res.json(restructuredTrades);
    } else {
      // you have trades
      // fetch all of them
      // this could be paginated for performance
      const tradesFromApi = await exchange.fetchMyTrades();
      // gets the most recent trade
      const lastTradeInDB = await allSavedTrades[0];

      // filter out new trades
      const newTrades = await tradesFromApi.filter(
        trade => trade.timestamp > lastTradeInDB.trade_timestamp
      );

      // reformat new trades
      const restructuredTrades = await reformatTrades(newTrades);

      // batch add new trades
      const batchAdding = await transaction(Trades.knex(), trx => {
        return Trades.query(trx).insert(restructuredTrades);
      });
      res.json(restructuredTrades);
    }
  });
};
