exports.up = knex => {
  return knex.schema.createTable("trades", table => {
    table.increments("id").primary();
    table.string("trade_id");
    table.string("order");
    table.bigInteger("trade_timestamp");
    table.dateTime("datetime");
    table.string("symbol");
    table.string("type");
    table.string("side");
    table.float("price");
    table.float("amount");
    table.dateTime("trade_created_at");
    table.string("product_id");
    table.string("order_id");
    table.string("user_id");
    table.string("profile_id");
    table.string("liquidity");
    table.string("size");
    table.boolean("settled");
    table.string("usd_volume");
    table.float("fee_cost");
    table.string("fee_currency");
    table.float("fee_rate");
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists("trades");
};
