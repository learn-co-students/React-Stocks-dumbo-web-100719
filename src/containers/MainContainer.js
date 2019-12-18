import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  render() {
    return (
      <div>
        <SearchBar
          handleFilter={this.props.handleFilter}
          handleAlphaSort={this.props.handleAlphaSort}
          handleNumSort={this.props.handleNumSort}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.props.stocks}
              addStockToPortfolio={this.props.addStockToPortfolio}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              stocks={this.props.portfolio}
              removeStockFromPortfolio={this.props.removeStockFromPortfolio}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
