import React from "react";
import { Container, Wrapper, Row, Cell, TitleCell } from "./styles";
import moment from "moment";

const TradeTable = ({ trades }) => (
  <Container>
    <Wrapper>
      {trades ? (
        <div>
          <Row>
            <TitleCell>Amount</TitleCell>
            <TitleCell>Symbol</TitleCell>
            <TitleCell>Side</TitleCell>
            <TitleCell>Trade ID</TitleCell>
            <TitleCell>Order ID</TitleCell>
            <TitleCell>Date</TitleCell>
          </Row>
          {trades.map(trade => (
            <Row key={trade.id}>
              <Cell>{trade.amount}</Cell>
              <Cell>{trade.symbol}</Cell>
              <Cell upcase>{trade.side}</Cell>
              <Cell>{trade.trade_id}</Cell>
              <Cell>{trade.order_id}</Cell>
              <Cell>{`${moment
                .unix(trade.trade_timestamp / 1000)
                .format("dddd, MMMM Do, YYYY h:mm:ss A")}`}</Cell>
            </Row>
          ))}
        </div>
      ) : (
        <div>No trades. You should go make some trades.</div>
      )}
    </Wrapper>
  </Container>
);

export default TradeTable;
