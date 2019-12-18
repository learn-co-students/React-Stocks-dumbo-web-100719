import React, { Component } from "react";
import Stock from "../components/Stock";

class PortfolioContainer extends Component {
  renderStocks = () => {
    return this.props.stocks.map(stock => (
      <Stock
        key={stock.id}
        stock={stock}
        removeStockFromPortfolio={this.props.removeStockFromPortfolio}
      />
    ));
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <h2>My Portfolio</h2>
        {/* {this.props.portfolio} */}
        {this.renderStocks()}
      </div>
    );
  }
}

export default PortfolioContainer;
