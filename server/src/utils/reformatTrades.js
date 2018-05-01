//
// use my database schema
//

const reformatTrades = trades =>
  trades.map(refined => ({
    order: refined.order,
    trade_id: refined.info.trade_id,
    trade_timestamp: refined.timestamp,
    symbol: refined.symbol,
    type: refined.type,
    side: refined.side,
    price: refined.price,
    amount: refined.amount,
    trade_created_at: refined.info.created_at,
    product_id: refined.info.product_id,
    order_id: refined.info.order_id,
    user_id: refined.info.user_id,
    profile_id: refined.info.profile_id,
    liquidity: refined.info.liquidity,
    size: refined.info.size,
    settled: refined.info.settled,
    usd_volume: refined.info.usd_volume,
    fee_cost: refined.fee.cost,
    fee_currency: refined.fee.currency,
    fee_rate: refined.fee.rate
  }));

export default reformatTrades;
