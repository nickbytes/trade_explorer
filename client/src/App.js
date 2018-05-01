import React, { Component } from "react";
import "isomorphic-fetch";
import Header from "./components/Header";
import TradeTable from "./components/TradeTable";

class App extends Component {
  state = {
    trades: "",
    total: "",
    activePage: 1
  };
  componentDidMount() {
    // fetch trades when the app mounts
    this.fetchTrades();
  }

  fetchTrades = (page = 0) => {
    // Normal people don't think about things as zero-indexed lol.
    // We will allow 0 and 1 to be the same thing.
    // Not going to account for negative numbers.
    // We would use react-router and real pages + 404
    // if this was a real site.
    let pageSetter;
    if (page === 0) {
      pageSetter = 0;
    } else {
      pageSetter = page - 1;
    }
    fetch(`/api/v1/trades/${pageSetter}`)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(x => {
        this.setState({
          trades: x.trades.results,
          total: x.trades.total
        });
      });
  };

  checkGdax = () => {
    // check the server!
    fetch("/api/v1/trades", {
      method: "POST"
    })
      .then(x => x.json())
      .catch(error => console.error("Error:", error))
      .then(response => this.fetchTrades());
  };

  render() {
    return (
      <div>
        {this.state.trades &&
          console.log(
            "Hello, here is more of your trade data.",
            this.state.trades
          )}
        <Header
          fetchFn={this.checkGdax}
          currentNumber={this.state.total || 0}
        />
        <TradeTable trades={this.state.trades} />
      </div>
    );
  }
}

export default App;
